package lottery

import (
	"strconv"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/tokenism30924/lottery/x/lottery/keeper"
	"github.com/tokenism30924/lottery/x/lottery/types"
)

// InitGenesis initializes the capability module's state from a provided genesis
// state.
func InitGenesis(ctx sdk.Context, k keeper.Keeper, genState types.GenesisState) {
	// Set all the lottery
	for _, elem := range genState.LotteryList {
		n, _ := strconv.ParseUint(elem.Index, 10, 64)
		k.SetLottery(ctx, n, elem)
	}

	// Set all the bet
	for i, elem := range genState.BetList {

		k.SetBet(ctx, uint64(i), elem)
	}
	// this line is used by starport scaffolding # genesis/module/init
	k.SetParams(ctx, genState.Params)
}

// ExportGenesis returns the capability module's exported genesis.
func ExportGenesis(ctx sdk.Context, k keeper.Keeper) *types.GenesisState {
	genesis := types.DefaultGenesis()
	genesis.Params = k.GetParams(ctx)

	genesis.LotteryList = k.GetAllLottery(ctx)

	genesis.BetList = k.GetAllBet(ctx)
	// this line is used by starport scaffolding # genesis/module/export

	return genesis
}
