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

func createNLottery(keeper *keeper.Keeper, ctx sdk.Context, n int) []types.Lottery {
	items := make([]types.Lottery, n)
	for i := range items {
		items[i].Index = strconv.Itoa(i)
		n, _ := strconv.ParseUint(items[i].Index, 10, 64)
		keeper.SetLottery(ctx, n, items[i])
	}
	return items
}

func TestLotteryGet(t *testing.T) {
	keeper, ctx := keepertest.LotteryKeeper(t)
	items := createNLottery(keeper, ctx, 10)
	for _, item := range items {
		n, _ := strconv.ParseUint(item.Index, 10, 64)
		rst, found, _ := keeper.GetLottery(ctx,
			n,
		)
		require.True(t, found)
		require.Equal(t,
			nullify.Fill(&item),
			nullify.Fill(&rst),
		)
	}
}

func TestLotteryGetAll(t *testing.T) {
	keeper, ctx := keepertest.LotteryKeeper(t)
	items := createNLottery(keeper, ctx, 10)
	require.ElementsMatch(t,
		nullify.Fill(items),
		nullify.Fill(keeper.GetAllLottery(ctx)),
	)
}
