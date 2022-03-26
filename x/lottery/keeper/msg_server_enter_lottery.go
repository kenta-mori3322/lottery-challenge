package keeper

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/tokenism30924/lottery/x/lottery/types"
)

func (k msgServer) EnterLottery(goCtx context.Context, msg *types.MsgEnterLottery) (*types.MsgEnterLotteryResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// TODO: Handling the message
	_ = ctx

	return &types.MsgEnterLotteryResponse{}, nil
}
