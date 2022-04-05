# lottery
**lottery** is a blockchain built using Cosmos SDK and Tendermint and created with [Starport](https://starport.com).

# Rules of the lottery

Anyone can enter the lottery as long as they have enough funds
A winner is chosen if the current block has 4 or more valid enter lottery transactions
Once a winner is chosen, a payout is sent and the next lottery cycle begins

## Lottery Blocks
```
- a block cant contain less than 4 lottery transactions (0 is acceptable)
- the chosen block proposer can't have any lottery transactions with itself as a sender
```

## Enter Lottery transaction
```Valid only when sender has enough funds to cover lottery fee + minimal bet
-Only 1 enter lottery transaction is valid per user per block
-Transaction Fields:
-Lottery Fee (in tokens, e.g. 5token )
-Bet Size (in tokens, e.g. 100token )
-User can only bet between 1 to 100 tokens
-User is charged the lottery fee and a minimal bet and money is saved in the lottery
pool
-Lottery fee is 5token , minimal bet is 1token
```

## Choosing a winner
```
- Every block that contains 4 or more lottery transactions is a lottery block
- At the end of the lottery block, hash the data of the transactions (retaining their order)
- Take the lowest 16 bits of the resulting hash and do a modulo on the number of lottery transactions in the block to determine the winner!
```

# Environment Setup
```
Recommended configuration:

Number of CPUs: 2

Memory: 8GB

OS: Ubuntu 18.04, 20.04 LTS

Allow all incoming connections from TCP port 26656 and 26657
```

## Prerequisites
```
sudo apt update
sudo apt upgrade -y
sudo apt install build-essential jq -y
```

## Install Golang
```
# Install latest go version https://golang.org/doc/install
wget -q -O - https://raw.githubusercontent.com/canha/golang-tools-install-script/master/goinstall.sh | bash -s -- --version 1.18
source ~/.profile

# to verify that Golang installed
go version
# Should return go version go1.18 linux/amd64
```

## How to run

```
cd lottery-challenge folder
make install

rm -r ~/.LotteryApp
mkdir -p ~/.LotteryApp/upgrade_manager/genesis/bin
mkdir -p ~/.LotteryApp/upgrade_manager/upgrades

cp $(which lotteryd) ~/.LotteryApp/upgrade_manager/genesis/bin
sudo cp $(which lotteryd-manager) /usr/bin

lotteryd init --chain-id test validator

echo "pet apart myth reflect stuff force attract taste caught fit exact ice slide sheriff state since unusual gaze practice course mesh magnet ozone purchase" | lotteryd keys add validator --keyring-backend test --recover

echo "bottom soccer blue sniff use improve rough use amateur senior transfer quarter" | lotteryd keys add test1 --keyring-backend test --recover

echo "wreck layer draw very fame person frown essence approve lyrics sustain spoon" | lotteryd keys add test2 --keyring-backend test --recover

echo "exotic merit wrestle sad bundle age purity ability collect immense place tone" | lotteryd keys add test3 --keyring-backend test --recover

echo "faculty head please solid picnic benefit hurt gloom flag transfer thrive zebra" | lotteryd keys add test4 --keyring-backend test --recover


lotteryd add-genesis-account $(lotteryd keys show validator -a --keyring-backend test) 100000000000000token,300000000000000stake
lotteryd add-genesis-account $(lotteryd keys show test1 -a --keyring-backend test) 110000000000000token,300000000000000stake
lotteryd add-genesis-account $(lotteryd keys show test2 -a --keyring-backend test) 120000000000000token,300000000000000stake
lotteryd add-genesis-account $(lotteryd keys show test3 -a --keyring-backend test) 130000000000000token,300000000000000stake
lotteryd add-genesis-account $(lotteryd keys show test4 -a --keyring-backend test) 140000000000000token,300000000000000stake

lotteryd gentx validator 9000000000000stake --keyring-backend test --chain-id test

lotteryd collect-gentxs

```
## How to config tendermint configuration
```
sudo vi ~/.LotteryApp/config/config.toml

**RPC server configuration option**
timeout_broadcast_tx_commit="300s"

**Consensus configuration option**
timeout_commit="300s"
create_empty_block_interval="300s"

```

## How to configure the service
sudo vim /etc/systemd/system/lotteryd.service
```
[Unit]
Description=lotteryd
Requires=network-online.target
After=network-online.target

[Service]
Restart=on-failure
RestartSec=3
User=venus
Group=venus
Environment=DAEMON_NAME=lotteryd
Environment=DAEMON_HOME=/home/venus/.lotteryd
Environment=DAEMON_ALLOW_DOWNLOAD_BINARIES=on
Environment=DAEMON_RESTART_AFTER_UPGRADE=on
PermissionsStartOnly=true
ExecStart=/usr/bin/lotteryd-manager start --pruning="nothing" --rpc.laddr "tcp://0.0.0.0:26657"
StandardOutput=file:/var/log/lotteryd/lotteryd.log
StandardError=file:/var/log/lotteryd/lotteryd_error.log
ExecReload=/bin/kill -HUP $MAINPID
KillSignal=SIGTERM
LimitNOFILE=4096

[Install]
WantedBy=multi-user.target
```
Should confirm if the user & group names are matched.

## Enable the lotteryd service
sudo systemctl enable lotteryd

## Start the node
sudo systemctl start lotteryd

## Collect genesis transactions
lotteryd collect-gentxs

## How to enter lottery
```
lotteryd tx lottery enter-lottery 100token --from validator1 --chain-id test -y
```
## How to query lotteries
```
lotteryd q lottery list-lottery
```
## Obstacles
Currently, the above tendermint configuration doens't allow blockchain to generate any block. I should make them less than 5s in oder to generate blocks. But in the assignment, it is mentioned to generate lottery block every 5 mins. Among those that have more than 4 enter-lottery transactions are considered as valid lottery block.
