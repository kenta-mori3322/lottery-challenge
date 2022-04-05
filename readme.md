# lottery
**lottery** is a blockchain built using Cosmos SDK and Tendermint and created with [Starport](https://starport.com).

## Rules of the lotter

Anyone can enter the lottery as long as they have enough funds
A winner is chosen if the current block has 4 or more valid enter lottery transactions
Once a winner is chosen, a payout is sent and the next lottery cycle begins

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
```
# How to configure the service
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

# Enable the lotteryd service
sudo systemctl enable lotteryd

# Start the node
sudo systemctl start lotteryd

# Collect genesis transactions
lotteryd collect-gentxs

# How to enter lottery
```
lotteryd tx lottery enter-lottery 100token --from validator1 --chain-id test -y
```
# How to query lotteries
```
lotteryd q lottery list-lottery
```

