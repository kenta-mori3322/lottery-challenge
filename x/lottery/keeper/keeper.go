package keeper

import (
	"encoding/binary"
	"fmt"

	"github.com/tendermint/tendermint/libs/log"

	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"
	paramtypes "github.com/cosmos/cosmos-sdk/x/params/types"
	"github.com/tokenism30924/lottery/x/lottery/types"
)

type (
	Keeper struct {
		cdc        codec.BinaryCodec
		storeKey   sdk.StoreKey
		memKey     sdk.StoreKey
		paramstore paramtypes.Subspace

		bankKeeper types.BankKeeper
	}
)

func NewKeeper(
	cdc codec.BinaryCodec,
	storeKey,
	memKey sdk.StoreKey,
	ps paramtypes.Subspace,

	bankKeeper types.BankKeeper,
) *Keeper {
	// set KeyTable if it has not already been set
	if !ps.HasKeyTable() {
		ps = ps.WithKeyTable(types.ParamKeyTable())
	}

	return &Keeper{

		cdc:        cdc,
		storeKey:   storeKey,
		memKey:     memKey,
		paramstore: ps,
		bankKeeper: bankKeeper,
	}
}

func (k Keeper) Logger(ctx sdk.Context) log.Logger {
	return ctx.Logger().With("module", fmt.Sprintf("x/%s", types.ModuleName))
}

// GetOrderCount returns the current number of all orders ever exist.
func (k Keeper) GetBetCount(ctx sdk.Context) uint64 {
	store := ctx.KVStore(k.storeKey)
	bz := store.Get(types.BetsCountStoreKey)
	if bz == nil {
		return 0
	}
	return binary.BigEndian.Uint64(bz)
}

// GetOrderCount returns the current number of all orders ever exist.
func (k Keeper) GetLotteryCount(ctx sdk.Context) uint64 {
	store := ctx.KVStore(k.storeKey)
	bz := store.Get(types.LotteryCountStoreKey)
	if bz == nil {
		return 0
	}
	return binary.BigEndian.Uint64(bz)
}

// GetNextBetCount increments and returns the current number of bets.
// If the global bet  count is not set, it initializes it with value 0.
func (k Keeper) GetNextBetCount(ctx sdk.Context) uint64 {
	betCount := k.GetBetCount(ctx)
	store := ctx.KVStore(k.storeKey)
	bz := sdk.Uint64ToBigEndian(betCount + 1)
	store.Set(types.BetsCountStoreKey, bz)
	return betCount + 1
}

// GetNextLotteryCount increments and returns the current number of lotteries.
// If the global lottery count is not set, it initializes it with value 0.
func (k Keeper) GetNextLotteryCount(ctx sdk.Context) uint64 {
	lotteryCount := k.GetLotteryCount(ctx)
	store := ctx.KVStore(k.storeKey)
	bz := sdk.Uint64ToBigEndian(lotteryCount + 1)
	store.Set(types.LotteryCountStoreKey, bz)
	return lotteryCount + 1
}
