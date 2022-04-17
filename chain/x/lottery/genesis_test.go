package lottery_test

import (
	"testing"

	"github.com/stretchr/testify/require"
	keepertest "github.com/tokenism30924/lottery/testutil/keeper"
	"github.com/tokenism30924/lottery/testutil/nullify"
	"github.com/tokenism30924/lottery/x/lottery"
	"github.com/tokenism30924/lottery/x/lottery/types"
)

func TestGenesis(t *testing.T) {
	genesisState := types.GenesisState{
		Params: types.DefaultParams(),

		LotteryList: []types.Lottery{
			{
				Index: "0",
			},
			{
				Index: "1",
			},
		},
		BetDataList: []types.BetData{
			{
				Index: "0",
			},
			{
				Index: "1",
			},
		},
		// this line is used by starport scaffolding # genesis/test/state
	}

	k, ctx := keepertest.LotteryKeeper(t)
	lottery.InitGenesis(ctx, *k, genesisState)
	got := lottery.ExportGenesis(ctx, *k)
	require.NotNil(t, got)

	nullify.Fill(&genesisState)
	nullify.Fill(got)

	require.ElementsMatch(t, genesisState.LotteryList, got.LotteryList)
	require.ElementsMatch(t, genesisState.BetDataList, got.BetDataList)
	// this line is used by starport scaffolding # genesis/test/assert
}
