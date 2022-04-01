package cli

import (
	"strconv"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/client/tx"
	"github.com/spf13/cobra"
	"github.com/tokenism30924/lottery/x/lottery/types"
)

var _ = strconv.Itoa(0)

func CmdEnterLottery() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "enter-lottery [from-account] [bet-amount]",
		Short: "Broadcast message enter-lottery",
		Args:  cobra.ExactArgs(2),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			argFromAccount := args[0]
			argBetAmount := args[1]
			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgEnterLottery(
				argFromAccount,
				argBetAmount,
			)
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}
