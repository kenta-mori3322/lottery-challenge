package keeper

import (
	"context"
	"strconv"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/tokenism30924/lottery/x/lottery/types"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (k Keeper) LotteryAll(c context.Context, req *types.QueryAllLotteryRequest) (*types.QueryAllLotteryResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}
	//Context
	ctx := sdk.UnwrapSDKContext(c)

	// Get all lotteries
	lotterys := k.GetAllLottery(ctx)

	return &types.QueryAllLotteryResponse{Lottery: lotterys}, nil
}

func (k Keeper) Lottery(c context.Context, req *types.QueryGetLotteryRequest) (*types.QueryGetLotteryResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}
	ctx := sdk.UnwrapSDKContext(c)

	n, _ := strconv.ParseUint(req.Index, 10, 64)
	val, found, _ := k.GetLottery(
		ctx,
		n,
	)
	if !found {
		return nil, status.Error(codes.InvalidArgument, "not found")
	}

	return &types.QueryGetLotteryResponse{Lottery: val}, nil
}
