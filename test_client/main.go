package main

import (
	"bytes"
	"fmt"
	"log"
	"os/exec"
	"strconv"
	"strings"
	"time"
)

// extract balance from a string
func getBalance(s string) (uint64, bool) {
	index1 := strings.Index(s, "denom: stake")
	index2 := strings.Index(s, "denom: token")

	if index1+24 >= index2-4 {
		return 0, false
	}

	substr := s[index1+24 : index2-4]
	n, err := strconv.ParseUint(substr, 10, 64)
	if err != nil {
		return 0, false
	}

	return n, true
}

func main() {
	nMaxLoop := 2     //100
	nCntClients := 20 // 20
	nCurrentLoop := 0
	app := "lotteryd"

	balances := make([]uint64, 20)
	for i := range balances {
		balances[i] = 500
	}

	var clients = [...]string{
		"lottery17zc58s96rxj79jtqqsnzt3wtx3tern6ae9uds3",
		"lottery14u53eghrurpeyx5cm47vm3qwugtmhcpn2hf7yj",
		"lottery1y95lvkndyxd99keazuzudq5xyzuvhvwsk3090r",
		"lottery1cr00glwjvf7fzv72tfdj4x3ctusq6uu3c4pta6",
		"lottery1nknm73uvfjwslmnwayh7n2c0fv9vwujn4s398z",
		"lottery1usp92wpm4er4tsgg2ecjk0ken6h0g3q7ghxhlv",
		"lottery158j7wt0s0yw2vrhcm59x46pnzyu3hk04ca3yre",
		"lottery1cveuyezr6swsxldcq0rv57susrs4ymff94qjpz",
		"lottery10eh8s8vfj27angu4p3m66c78a8gjj4l4pht4q0",
		"lottery1795n7gcq37jxg8xww2l5cat2mvp94rg7negy34",
		"lottery1v3ura6deu3t74gmcn50ra4zn245pl2wwj062cx",
		"lottery1quza8xqp5vujjzfghhanmsygepc453m4s9fyqr",
		"lottery1mse8nwecey6sj5qr6nq0lqhtvaa6rfm82xpp02",
		"lottery1n4p2zj8qyjqffn6lx7cewe0mde7nrmm4ma3jgl",
		"lottery177f8xxcsts8m6g9aduvhp6xwrpvmny46thvq82",
		"lottery1rs6cxkupcc5x9pp06rcuj8mmc0ehmvdlapcuuk",
		"lottery1njuvacs3wmd5c4r4j3p055lk8lnrzkfyp7juqv",
		"lottery148rhlt94pgu3letg8tfxs8z0khmtze3ndx4cew",
		"lottery1y98ndhhm6fzx8eeft8stffachzt0lnsv4spwrv",
		"lottery15tqk3t67cmfrhdtjl5y7fp4zlq0f4sn32w3mpp",
		"lottery1a36nty5kganzgq3qzue25y3pf3cyd62qfr3s3h",
	}

	for nCurrentLoop < nMaxLoop {
		nAttendBet := 0
		for i := 0; i < nCntClients; i++ {
			// 5 token is bet fee, i+1 is the amount bet token of client i
			if balances[i] < uint64(5+(i+1)) {
				continue
			}

			// args := fmt.Sprintf("tx lottery enter-lottery %dtoken --from validator%d --chain-id test -y", i+1, i+1)
			tokens := fmt.Sprintf("%dtoken", i+1)
			client := fmt.Sprintf("client%d", i+1)
			cmd := exec.Command(app, "tx", "lottery", "enter-lottery", tokens, "--from", client, "--chain-id", "test", "-y")
			err := cmd.Run()

			if err != nil {
				log.Fatal(err)
			}

			nAttendBet++
			fmt.Printf("client%d has put bet with amount %dtoken\n", i+1, i+1)
		}

		// minimum bet counts per lottery is 4, so n more available bet client, so exit loop
		if nAttendBet < 4 {
			break
		}

		// Update balances of each client
		for i := 0; i < nCntClients; i++ {
			// lotteryd q bank balances lottery14u53eghrurpeyx5cm47vm3qwugtmhcpn2hf7yj
			cmd := exec.Command(app, "q", "bank", "balances", clients[i+1])
			var out bytes.Buffer
			cmd.Stdout = &out
			err := cmd.Run()

			if err != nil {
				log.Fatal(err)
			}

			s := out.String()
			// update balances
			balances[i], _ = getBalance(s)
		}

		time.Sleep(1 * time.Second)
		nCurrentLoop++

		fmt.Printf("step: %d passed\n", nCurrentLoop)
	}

	// Dispay balances of each client
	for i := 0; i < nCntClients; i++ {
		fmt.Printf("Client%d, balances: %dtoken\n", i+1, balances[i])
	}

	// finished
	fmt.Printf("finished\n")
}
