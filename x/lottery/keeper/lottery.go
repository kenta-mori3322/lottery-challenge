package keeper

import (
	"fmt"

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

	// Get current lottery
	lottery, _, err := k.GetLottery(ctx, lotteryID)
	if err != nil {
		return 0, err
	}

	// if lottery was closed, then can't add bet
	if lottery.Status == 0 {
		return 0, sdkerrors.Wrapf(sdkerrors.ErrLogic, "lottery %d was closed", lotteryID)
	}

	// Check if the player is already bet on the current lottery
	iterator := k.GetBetsIterator(ctx)

	// iterator all bets
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

	// Save to store
	k.SetBet(ctx, betID, newBet)

	return betID, nil
}

func (k Keeper) CreateLottery(ctx sdk.Context, status uint64, amount sdk.Coins) (uint64, error) {
	lotteryID := k.GetNextLotteryCount(ctx)
	MinimumPrice := sdk.Coins{sdk.NewInt64Coin("token", 1)}
	MaxNumber := uint64(1000)

	newLottery := types.Lottery{
		Index:             string(lotteryID),
		Status:            status,
		Price:             MinimumPrice,
		MaxNumber:         MaxNumber,
		AccumulatedAmount: amount,
	}

	k.SetLottery(ctx, lotteryID, newLottery)

	return lotteryID, nil
}

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

func (k Keeper) GetWinners(ctx sdk.Context, winningNumber uint64) ([]sdk.AccAddress, error) {
	result := make([]sdk.AccAddress, 1)
	//bets := make([]types.Bet, 1)

	//result = append(s, "d")
	// loteryId := k.GetLotteryCount(ctx)

	//store := ctx.KVStore(k.storeKey)
	//if !store.Has(types.BetStoreKey(loterryId,loterryId)) {
	//	return nil, sdkerrors.Wrapf(sdkerrors.ErrKeyNotFound, "winners %d not found, check errors", loterryId)
	//}

	//TODo: ccheck an efficient way to get the bets of open lottery
	//bz := store.Get(types.BetStoreKey(loterryId,loterryId))

	iterator := k.GetBetsIterator(ctx)

	for ; iterator.Valid(); iterator.Next() {
		var bet types.Bet
		k.cdc.MustUnmarshal(iterator.Value(), &bet)
		//bet := types.Bet(iterator.Value())

		// if bet.LotteryNumber == winningNumber && loteryId == bet.Lottery.Id {
		// 	result = append(result, bet.Player)
		// }

		//bets = append(bets, types.Bet(iterator.Value()))
	}
	//k.GetBetsIterator(ctx)
	//var bets []types.Bet
	//k.cdc.MustUnmarshalBinaryBare(bz, &bets)

	//for _, bet := range bets {
	//  if bet.LotteryNumber == winningNumber {
	//     result = append(result, bet.Player)
	//}
	//}

	return result, nil

}

//close lottery
func (k Keeper) CloseLottery(ctx sdk.Context) {
	lotteryId := k.GetLotteryCount(ctx)
	lottery, _, err := k.GetLottery(ctx, lotteryId)
	if err != nil {
		panic("error closing lottery")
	}
	lottery.Status = 0

	k.SetLottery(ctx, lotteryId, lottery)
}
