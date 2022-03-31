package keeper

import (
	"bytes"
	"crypto/sha256"
	"fmt"

	"unsafe"

	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/tokenism30924/lottery/x/lottery/types"
)

// GetAllLottery returns all lottery
func (k Keeper) GetAllLottery(ctx sdk.Context) (list []types.Lottery) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(string(types.LotteryStoreKeyPrefix)))
	iterator := sdk.KVStorePrefixIterator(store, []byte{})

	defer iterator.Close()

	for ; iterator.Valid(); iterator.Next() {
		var val types.Lottery
		k.cdc.MustUnmarshal(iterator.Value(), &val)
		list = append(list, val)
	}

	return
}

func (k Keeper) AddBet(ctx sdk.Context, playerName string, playerAddr sdk.AccAddress, amount sdk.Coins) (uint64, error) {
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
	if bytes.Compare(lottery.Proposer, playerAddr) == 0 {
		return 0, sdkerrors.Wrapf(sdkerrors.ErrLogic, "Sorry, lottery %d is created by you, so you are prohibited to bet", lotteryID)
	}

	// Check if the player is already bet on the current lottery
	iterator := k.GetBetsIterator(ctx)

	// Iterate all bets
	for ; iterator.Valid(); iterator.Next() {
		var bet types.Bet
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
	newBet := types.Bet{
		Index:     fmt.Sprintf("%d", betID),
		Name:      playerName,
		Player:    playerAddr,
		LotteryId: lotteryID,
		Amount:    amount,
	}

	// Accumulate the bet amount to the current lottery
	lottery.AccumulatedAmount.Add(amount...)

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

// Get an iterator over all bets
func (k Keeper) GetBetsIterator(ctx sdk.Context) sdk.Iterator {
	store := ctx.KVStore(k.storeKey)
	return sdk.KVStorePrefixIterator(store, []byte{})
}

// Convert byte array to uint64
func ByteArrayToInt(arr []byte) uint64 {
	val := uint64(0)
	size := len(arr)
	for i := 0; i < size; i++ {
		*(*uint8)(unsafe.Pointer(uintptr(unsafe.Pointer(&val)) + uintptr(i))) = arr[i]
	}
	return val
}

func (k Keeper) DetermineWinner(ctx sdk.Context, lotteryID uint64) (bool, error) {
	// Get current lottery block
	lottery, _, err := k.GetLottery(ctx, lotteryID)
	if err != nil {
		panic("error closing lottery")
	}

	// Bet array for current lottery block
	bets := make([]types.Bet, 1)

	// Gets iterator for bets
	iterator := k.GetBetsIterator(ctx)

	// number of the bets in the current lottery
	numberOfBets := 0

	// Iterate bets
	for ; iterator.Valid(); iterator.Next() {
		var bet types.Bet
		k.cdc.MustUnmarshal(iterator.Value(), &bet)

		// Ignore bets that are not belong to current lottery
		if bet.LotteryId != lotteryID {
			continue
		}

		// Get the bets in the current lottery
		bets = append(bets, bet)
	}

	// Generates the hash for tendermint transactions
	transactionHash := sha256.Sum256(ctx.TxBytes())
	b := make([]byte, 16)

	// transactionHash ^ 0xFFFF
	for i := 0; i < 16; i++ {
		b[i] = transactionHash[i+16]
	}

	// Get the count of bets
	numberOfBets = len(bets)

	// winner_index = (hash_result ^ 0xFFFF) % number_of_transactions_in_block
	winner_index := ByteArrayToInt(b) % uint64(numberOfBets)

	// Check if the winner is highest or lowest bet
	nBigCount := 0
	nSmallCount := 0

	// bet amount for the winner
	amount := bets[winner_index].Amount.AmountOf("token")
	for i, bet := range bets {
		// skip the winner index
		if i == int(winner_index) {
			continue
		}

		// if the winner bet amount is greater than
		if amount.GT(bet.Amount.AmountOf("token")) {
			nBigCount++
		}

		// if the winner bet amount is lower than
		if amount.LT(bet.Amount.AmountOf("token")) {
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
		wholeLotteryPoolAmount.Add(l.AccumulatedAmount...)
	}

	// bet for winner
	betWinner := bets[winner_index]

	// if he is winner & highest bet
	if isMax {
		// send tokens from the lottery pool buyer's account to the module's account (as a payment for the name)
		k.bankKeeper.SendCoinsFromModuleToAccount(ctx, types.ModuleName, betWinner.Player, wholeLotteryPoolAmount)
	} else if isMin {
		// no reward but just the amount he has bet
		k.bankKeeper.SendCoinsFromModuleToAccount(ctx, types.ModuleName, betWinner.Player, betWinner.Amount)
	} else {
		// send amount of current lottery block
		k.bankKeeper.SendCoinsFromModuleToAccount(ctx, types.ModuleName, betWinner.Player, lottery.AccumulatedAmount)
	}

	return true, nil
}

//close lottery
func (k Keeper) CloseLottery(ctx sdk.Context) {
	lotteryId := k.GetLotteryCount(ctx)
	lottery, _, err := k.GetLottery(ctx, lotteryId)
	if err != nil {
		panic("error closing lottery")
	}

	// if there is not enough bets in the current lottery, then skip over it
	if lottery.BetCount < 4 {
		panic("There should be at least 4 enter lottery transactions per lottery")
	}

	// determin the winner in the current lottery
	succeed, _ := k.DetermineWinner(ctx, lotteryId)

	// if it is not successful
	if !succeed {
		panic("error while determining the winner")
	}

	// Logs
	fmt.Println("Successfully closed lottery block")
}
