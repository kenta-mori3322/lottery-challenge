package keeper_test

import (
	"strconv"
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/stretchr/testify/require"
	keepertest "github.com/tokenism30924/lottery/testutil/keeper"
	"github.com/tokenism30924/lottery/testutil/nullify"
	"github.com/tokenism30924/lottery/x/lottery/keeper"
	"github.com/tokenism30924/lottery/x/lottery/types"
)

// Prevent strconv unused error
var _ = strconv.IntSize

func createNBet(keeper *keeper.Keeper, ctx sdk.Context, n int) []types.BetData {
	items := make([]types.BetData, n)
	for i := range items {
		items[i].Index = strconv.Itoa(i)

		keeper.SetBet(ctx, uint64(i), items[i])
	}
	return items
}

func TestBetGet(t *testing.T) {
	keeper, ctx := keepertest.LotteryKeeper(t)
	items := createNBet(keeper, ctx, 10)
	for _, item := range items {
		rst, found := keeper.GetBet(ctx,
			item.Index,
		)
		require.True(t, found)
		require.Equal(t,
			nullify.Fill(&item),
			nullify.Fill(&rst),
		)
	}
}
func TestBetRemove(t *testing.T) {
	keeper, ctx := keepertest.LotteryKeeper(t)
	items := createNBet(keeper, ctx, 10)
	for _, item := range items {
		keeper.RemoveBet(ctx,
			item.Index,
		)
		_, found := keeper.GetBet(ctx,
			item.Index,
		)
		require.False(t, found)
	}
}

func TestBetGetAll(t *testing.T) {
	keeper, ctx := keepertest.LotteryKeeper(t)
	items := createNBet(keeper, ctx, 10)
	require.ElementsMatch(t,
		nullify.Fill(items),
		nullify.Fill(keeper.GetAllBet(ctx)),
	)
}
