package keeper

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/tokenism30924/lottery/x/lottery/types"
)

func (k msgServer) EnterLottery(goCtx context.Context, msg *types.MsgEnterLottery) (*types.MsgEnterLotteryResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// lottery Transaction fee
	lotteryFee := sdk.Coins{sdk.NewInt64Coin("token", 5)}

	// minimum betting amount
	minBetAmount := sdk.Coins{sdk.NewInt64Coin("token", 1)}

	// maximum betting amount
	maxBetAmount := sdk.Coins{sdk.NewInt64Coin("token", 100)}

	// Convert price and bid strings to sdk.Coins
	betAmount, err := sdk.ParseCoinsNormalized(msg.BetAmount)
	if err != nil {
		return nil, sdkerrors.Wrapf(sdkerrors.ErrInvalidCoins, "invalid coins (%s)", err)
	}

	// if the bet amount is exceeding the min & max range
	if betAmount.AmountOf("token").LT(minBetAmount.AmountOf("token")) || betAmount.AmountOf("token").GT(maxBetAmount.AmountOf("token")) {
		return nil, sdkerrors.Wrapf(sdkerrors.ErrInvalidCoins, "invalid bet amount range")
	}

	// Convert player address strings to sdk.AccAddress
	player, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return nil, sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}

	// Get the balance of the player
	balancePlayer := k.bankKeeper.GetBalance(ctx, player, "token")

	// Calculate necessary fee for entering lotterying transaction
	// fee := betAmount.AmountOf("token").Add(lotteryFee.AmountOf("token"))
	fee := betAmount.Add(lotteryFee...)

	// check if the palyer has engough fund for betting
	if balancePlayer.Amount.LT(fee.AmountOf("token")) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInsufficientFunds, "Player doens't have enough balance")
	}

	// Now put this bet on blockchain at certain lottery
	_, err = k.Keeper.AddBet(ctx, msg.Creator, player, msg.BetAmount)

	if err == nil {
		// send tokens from the buyer's account to the module's account (as a payment for the name)
		k.bankKeeper.SendCoinsFromAccountToModule(ctx, player, types.ModuleName, fee)
		return &types.MsgEnterLotteryResponse{Code: "200", Msg: "Successfully bet on current lottery"}, nil
	}

	return &types.MsgEnterLotteryResponse{Code: "501", Msg: "Internal error"}, nil
}
