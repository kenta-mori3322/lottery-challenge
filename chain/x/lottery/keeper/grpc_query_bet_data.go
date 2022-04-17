package keeper

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/tokenism30924/lottery/x/lottery/types"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (k Keeper) BetDataAll(c context.Context, req *types.QueryAllBetDataRequest) (*types.QueryAllBetDataResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	// Context
	ctx := sdk.UnwrapSDKContext(c)

	// Get all lotteries
	bets := k.GetAllBet(ctx)

	return &types.QueryAllBetDataResponse{BetData: bets}, nil
}

//Qeury for getting bet data
func (k Keeper) BetData(c context.Context, req *types.QueryGetBetDataRequest) (*types.QueryGetBetDataResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}
	ctx := sdk.UnwrapSDKContext(c)

	val, found := k.GetBet(
		ctx,
		req.Index,
	)
	if !found {
		return nil, status.Error(codes.InvalidArgument, "not found")
	}

	return &types.QueryGetBetDataResponse{BetData: val}, nil
}
