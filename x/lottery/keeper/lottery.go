package keeper

import (
	"bytes"
	"crypto/sha256"
	"encoding/binary"
	"fmt"
	"strconv"
	"time"

	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/tokenism30924/lottery/x/lottery/types"
)

// GetAllLottery returns all lottery
func (k Keeper) GetAllLottery(ctx sdk.Context) (list []types.Lottery) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.LotteryStoreKeyPrefix)
	// iterator := sdk.KVStorePrefixIterator(store, []byte{})
	iterator := store.Iterator(nil, nil)

	defer iterator.Close()

	for ; iterator.Valid(); iterator.Next() {
		var val types.Lottery
		k.cdc.MustUnmarshal(iterator.Value(), &val)
		list = append(list, val)
	}

	return list
}

func (k Keeper) AddBet(ctx sdk.Context, playerName string, playerAddr sdk.AccAddress, amount string) (uint64, error) {
	// Get current lottery id
	lotteryID := k.GetLotteryCount(ctx)

	// If there isn't any lottery created
	if lotteryID == 0 {
		return 0, sdkerrors.Wrapf(sdkerrors.ErrLogic, "There are %d lotteries available", lotteryID)
	}

	// Get current lottery
	lottery, _, err := k.GetLottery(ctx, lotteryID)
	if err != nil {
		return 0, err
	}

	// If lottery was closed, then can't add bet
	if lottery.Status == 0 {
		return 0, sdkerrors.Wrapf(sdkerrors.ErrLogic, "lottery %d was closed", lotteryID)
	}

	// if the lottery proposer tries to bet, then stop him doing it
	if bytes.Equal(lottery.Proposer, playerAddr) {
		return 0, sdkerrors.Wrapf(sdkerrors.ErrLogic, "Sorry, lottery %d is created by you, so you are prohibited to bet", lotteryID)
	}

	// Check if the player is already bet on the current lottery
	iterator := k.GetBetsIterator(ctx)

	// Iterate all bets
	for ; iterator.Valid(); iterator.Next() {
		var bet types.BetData
		k.cdc.MustUnmarshal(iterator.Value(), &bet)

		// skip bet that is not on the current lottery
		if bet.LotteryId != lotteryID {
			continue
		}

		// if the player is already bet on current lottery,
		if bet.Name == playerName {
			return 0, sdkerrors.Wrapf(sdkerrors.ErrLogic, "This player already have bet on %d lottery", lotteryID)
		}
	}

	// Generate a new bet ID
	betID := k.GetNextBetCount(ctx)

	// Create a new instance of Bet
	newBet := types.BetData{
		Index:     fmt.Sprintf("%d", betID),
		Name:      playerName,
		Player:    playerAddr,
		LotteryId: lotteryID,
		Amount:    amount,
	}

	// Convert price and bid strings to sdk.Coins
	betAmount, err := sdk.ParseCoinsNormalized(amount)
	if err != nil {
		return 0, sdkerrors.Wrapf(sdkerrors.ErrInvalidCoins, "invalid coins (%s)", err)
	}

	// Accumulate the bet amount to the current lottery
	lottery.AccumulatedAmount = lottery.AccumulatedAmount.Add(betAmount...)
	lottery.BetCount++

	// Update the store of lottery
	k.SetLottery(ctx, lotteryID, lottery)

	// Save bet to store
	k.SetBet(ctx, betID, newBet)

	return betID, nil
}

func (k Keeper) CreateLottery(ctx sdk.Context, proposer sdk.AccAddress, status uint64, amount sdk.Coins) (uint64, error) {
	// Generates a new lottery ID
	lotteryID := k.GetNextLotteryCount(ctx)

	// Minimum prices for bet
	MinimumPrice := sdk.Coins{sdk.NewInt64Coin("token", 1)}

	// Create a new lottery block/instance
	newLottery := types.Lottery{
		Index:             fmt.Sprintf("%d", lotteryID),
		Status:            status,
		Price:             MinimumPrice,
		WinningNumber:     uint64(10000),
		WinnerName:        "",
		WinnerAddress:     nil,
		Proposer:          proposer,
		AccumulatedAmount: amount,
		BetCount:          uint64(0),
	}

	// Store the created lottery
	k.SetLottery(ctx, lotteryID, newLottery)

	// Store the latest lottery created time
	k.SetlastLotteryBlockCreationTime(ctx, time.Now())

	return lotteryID, nil
}

// Store lottery
func (k Keeper) SetLottery(ctx sdk.Context, id uint64, lottery types.Lottery) {
	store := ctx.KVStore(k.storeKey)
	store.Set(types.LotteryStoreKey(id), k.cdc.MustMarshal(&lottery))
}

// GetLottery gets the given Lottery from the store
func (k Keeper) GetLottery(ctx sdk.Context, id uint64) (types.Lottery, bool, error) {
	store := ctx.KVStore(k.storeKey)
	if !store.Has(types.LotteryStoreKey(id)) {
		return types.Lottery{}, false, sdkerrors.Wrapf(sdkerrors.ErrKeyNotFound, "lottery %d not found", id)
	}
	bz := store.Get(types.LotteryStoreKey(id))
	var lottery types.Lottery
	k.cdc.MustUnmarshal(bz, &lottery)
	return lottery, true, nil
}

// Get current lottery
func (k Keeper) GetCurrentLottery(ctx sdk.Context) (bool, types.Lottery) {
	// Get current lottery id
	lotteryID := k.GetLotteryCount(ctx)

	// If there isn't any lottery created
	if lotteryID == 0 {
		return false, types.Lottery{}
	}

	// Get current lottery
	lottery, _, err := k.GetLottery(ctx, lotteryID)
	if err != nil {
		return false, types.Lottery{}
	}

	return true, lottery
}

// Get an iterator over all bets
func (k Keeper) GetBetsIterator(ctx sdk.Context) sdk.Iterator {
	store := ctx.KVStore(k.storeKey)
	betStore := prefix.NewStore(store, types.BetStoreKeyPrefix)
	// return sdk.KVStorePrefixIterator(store, types.BetStoreKeyPrefix)

	return betStore.Iterator(nil, nil)
}

// Determines the winner of a lottery
func (k Keeper) DetermineWinner(ctx sdk.Context, lottery types.Lottery) (bool, error) {
	lotteryID, _ := strconv.ParseUint(lottery.Index, 10, 64)

	// Bet array for current lottery block
	bets := make([]types.BetData, 10)

	// Gets iterator for bets
	iterator := k.GetBetsIterator(ctx)

	// number of the bets in the current lottery
	numberOfBets := 0

	defer iterator.Close()

	// Iterate bets
	for ; iterator.Valid(); iterator.Next() {
		var bet types.BetData
		k.cdc.MustUnmarshal(iterator.Value(), &bet)

		// Ignore bets that are not belong to current lottery
		if bet.LotteryId != lotteryID {
			continue
		}

		// Get the bets in the current lottery
		// bets = append(bets, bet)
		bets[numberOfBets] = bet
		numberOfBets++
	}

	// Log number of bets
	fmt.Println("numberOfBets", numberOfBets)

	// Generates the hash for tendermint transactions

	transactionHash := sha256.Sum256(ctx.TxBytes())
	b := make([]byte, 16)

	// transactionHash ^ 0xFFFF
	for i := 0; i < 16; i++ {
		b[i] = transactionHash[i+16]
	}

	// winner_index = (hash_result ^ 0xFFFF) % number_of_transactions_in_block
	winner_index := binary.BigEndian.Uint64(b) % uint64(numberOfBets)

	// Log winner index
	fmt.Println("Winner_index", winner_index)

	// Check if the winner is highest or lowest bet
	nBigCount := 0
	nSmallCount := 0

	// bet for winner
	betWinner := bets[winner_index]

	// bet amount for the winner
	// Convert price and bid strings to sdk.Coins
	betAmount, err := sdk.ParseCoinsNormalized(betWinner.Amount)
	if err != nil {
		return false, sdkerrors.Wrapf(sdkerrors.ErrInvalidCoins, "invalid coins (%s)", err)
	}

	amount := betAmount.AmountOf("token")

	// Loop and check if he is the highest or lowest bet
	for i, bet := range bets {
		// skip the winner index
		if i == int(winner_index) {
			continue
		}

		betAmt, err := sdk.ParseCoinsNormalized(bet.Amount)
		if err != nil {
			continue
		}

		// if the winner bet amount is greater than
		if amount.GT(betAmt.AmountOf("token")) {
			nBigCount++
		}

		// if the winner bet amount is lower than
		if amount.LT(betAmt.AmountOf("token")) {
			nSmallCount++
		}
	}

	// varialbles for max, min
	isMax := false
	isMin := false

	// Determine the result for highest or lowest
	if nBigCount == numberOfBets-1 {
		isMax = true
	} else if nSmallCount == numberOfBets-1 {
		isMin = true
	}

	// Accumulate the whole lottery pool amount
	wholeLotteryPoolAmount := sdk.Coins{sdk.NewInt64Coin("token", 0)}
	allLotteries := k.GetAllLottery(ctx)
	for _, l := range allLotteries {
		// if it is closed lottery, skip
		if l.Status == 0 {
			continue
		}

		// accumulates the bet amount of the whole pending lotteries
		wholeLotteryPoolAmount = wholeLotteryPoolAmount.Add(l.AccumulatedAmount...)
	}

	// if he is winner & highest bet
	if isMax {
		// send tokens from the lottery pool buyer's account to the module's account (as a payment for the name)
		k.bankKeeper.SendCoinsFromModuleToAccount(ctx, types.ModuleName, betWinner.Player, wholeLotteryPoolAmount)
	} else if isMin {
		// no reward but just the amount he has bet
		k.bankKeeper.SendCoinsFromModuleToAccount(ctx, types.ModuleName, betWinner.Player, betAmount)
	} else {
		// send amount of current lottery block
		k.bankKeeper.SendCoinsFromModuleToAccount(ctx, types.ModuleName, betWinner.Player, lottery.AccumulatedAmount)
	}

	// is Max, has to change the open lottery status to be closed
	if isMax {
		for _, lot := range allLotteries {
			// if it is closed lottery, skip
			if lot.Status == 0 || lot.Status == 2 {
				continue
			}

			// Update lottery status as closed
			lotID, _ := strconv.ParseUint(lot.Index, 10, 64)
			lot.Status = 2 // closed without choosing winner
			k.SetLottery(ctx, lotID, lot)
		}
	}

	// Update the current lottery status
	lottery.WinnerAddress = betWinner.Player
	lottery.WinnerName = betWinner.Name
	lottery.WinningNumber = winner_index + 1
	lottery.Status = 0 // closed by selecting winner
	k.SetLottery(ctx, lotteryID, lottery)

	return true, nil
}

//close lottery
func (k Keeper) CloseLottery(ctx sdk.Context) bool {
	lotteries := k.GetAllLottery(ctx)

	succeed := false
	for i, lot := range lotteries {
		// if he is not opened lottery, skip
		if lot.Status != 1 {
			continue
		}

		// if there is not enough bets in the current lottery, then skip over it
		if lot.BetCount < 4 {
			continue
		}

		// determin the winner in the current lottery
		succeed, _ = k.DetermineWinner(ctx, lot)

		// if it is not successful
		if !succeed {
			fmt.Println("Internal error while determining the winner")
		} else {
			fmt.Println("Successfully closed", i, "lottery block")
		}
	}

	return succeed
}
