package lottery

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/tokenism30924/lottery/x/lottery/keeper"
	"github.com/tokenism30924/lottery/x/lottery/types"
)

// InitGenesis initializes the capability module's state from a provided genesis
// state.
func InitGenesis(ctx sdk.Context, k keeper.Keeper, genState types.GenesisState) {
	// Set all the lottery
	for _, elem := range genState.LotteryList {
		k.SetLottery(ctx, elem)
	}
	// this line is used by starport scaffolding # genesis/module/init
	k.SetParams(ctx, genState.Params)
}

// ExportGenesis returns the capability module's exported genesis.
func ExportGenesis(ctx sdk.Context, k keeper.Keeper) *types.GenesisState {
	genesis := types.DefaultGenesis()
	genesis.Params = k.GetParams(ctx)

	genesis.LotteryList = k.GetAllLottery(ctx)
	// this line is used by starport scaffolding # genesis/module/export

	return genesis
}
