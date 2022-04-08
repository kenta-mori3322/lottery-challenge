package keeper

import (
	"strconv"

	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/tokenism30924/lottery/x/lottery/types"
)

// SetBet saves the given Bet to the open lottery to the store without performing any validation.
func (k Keeper) SetBet(ctx sdk.Context, id uint64, bet types.BetData) {
	store := ctx.KVStore(k.storeKey)
	store.Set(types.BetStoreKey(id), k.cdc.MustMarshal(&bet))
}

// GetBet returns a bet from its index
func (k Keeper) GetBet(
	ctx sdk.Context,
	index string,

) (val types.BetData, found bool) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(string(types.BetStoreKeyPrefix)))

	n, _ := strconv.ParseUint(index, 10, 64)
	b := store.Get(types.BetStoreKey(
		n,
	))
	if b == nil {
		return val, false
	}

	k.cdc.MustUnmarshal(b, &val)
	return val, true
}

// RemoveBet removes a bet from the store
func (k Keeper) RemoveBet(
	ctx sdk.Context,
	index string,
) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(string(types.BetStoreKeyPrefix)))

	n, _ := strconv.ParseUint(index, 10, 64)
	store.Delete(types.BetStoreKey(
		n,
	))
}

// GetAllBet returns all bet
func (k Keeper) GetAllBet(ctx sdk.Context) (list []types.BetData) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(string(types.BetStoreKeyPrefix)))
	iterator := sdk.KVStorePrefixIterator(store, []byte{})
	// iterator := store.Iterator(nil, nil)

	defer iterator.Close()

	for ; iterator.Valid(); iterator.Next() {
		var val types.BetData
		k.cdc.MustUnmarshal(iterator.Value(), &val)
		list = append(list, val)
	}

	return list
}
