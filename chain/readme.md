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

**Initialize chain, moniker name is validator**
lotteryd init --chain-id test validator

echo "pet apart myth reflect stuff force attract taste caught fit exact ice slide sheriff state since unusual gaze practice course mesh magnet ozone purchase" | lotteryd keys add validator --keyring-backend test --recover

echo "bottom soccer blue sniff use improve rough use amateur senior transfer quarter" | lotteryd keys add client1 --keyring-backend test --recover

echo "wreck layer draw very fame person frown essence approve lyrics sustain spoon" | lotteryd keys add client2 --keyring-backend test --recover

echo "exotic merit wrestle sad bundle age purity ability collect immense place tone" | lotteryd keys add client3 --keyring-backend test --recover

echo "faculty head please solid picnic benefit hurt gloom flag transfer thrive zebra" | lotteryd keys add client4 --keyring-backend test --recover

echo "relax swallow movie myself ill injury demand scrub rapid broken name spread mad entire spin then roast law winner box luxury sister suggest picture" | lotteryd keys add client5 --keyring-backend test --recover

echo "kiss cup monster core family describe debris flame adult demand plug machine shock young abandon jewel matter page museum grunt stereo return august dinosaur" | lotteryd keys add client6 --keyring-backend test --recover

echo "satisfy current crowd mixed usage state wool oppose rebel wolf double element fence course route flavor fortune merry this group forget that brave chuckle" | lotteryd keys add client7 --keyring-backend test --recover

echo "soul shine either hurry fabric case tuna topple review excess quiz blush gift ridge oil discover exercise control warm antique neglect casual choice giggle" | lotteryd keys add client8 --keyring-backend test --recover

echo "crew cruise anger turkey proud penalty unknown polar weird excess domain believe horse subject peasant economy share captain tissue window egg umbrella diet total" | lotteryd keys add client9 --keyring-backend test --recover

echo "nerve sunset spoil very tumble liberty pipe need country engage shrug maze mail differ box win mean slogan end obtain foil open rent book" | lotteryd keys add client10 --keyring-backend test --recover

echo "milk detect problem forward moral grass oxygen fever aim invite awful write crazy baby want access soda dial census chaos whisper club dirt scatter" | lotteryd keys add client11 --keyring-backend test --recover

echo "off bamboo remember wink zero crazy senior black soccer good swarm enough hidden step hazard nation gasp priority scene supply into bean prepare casual" | lotteryd keys add client12 --keyring-backend test --recover

echo "liar course come fame tilt cattle text pond torch eager subject daughter seminar popular odor frost scatter push shallow liberty armor merit move burger" | lotteryd keys add client13 --keyring-backend test --recover

echo "inner deposit gain cushion smooth warm muffin simple earth stamp chair zero chronic decide magic hip car submit install lonely embody earn olympic fat" | lotteryd keys add client14 --keyring-backend test --recover

echo "indoor knee spider action shed east diet rose subject bomb avoid local magnet symbol note medal bean shuffle caught climb goose fox ensure switch" | lotteryd keys add client15 --keyring-backend test --recover

echo "gloom plug zero artist swear inform uniform cream faculty cover input eight wire brass copper stick hybrid erosion country more neutral lonely mention history" | lotteryd keys add client16 --keyring-backend test --recover

echo "business twist situate identify wing cool kick liar sort struggle token yard car cake mention hole strong success slice mean knee gift milk flat" | lotteryd keys add client17 --keyring-backend test --recover

echo "table erupt income essay simple harbor subway priority exhibit ceiling vendor maple card become permit journey visual blind trophy spread vault empower fat advice" | lotteryd keys add client18 --keyring-backend test --recover

echo "debris apart size shy era wrestle jazz aware fatigue sight suggest normal public glory age ticket episode sister august portion unveil entry transfer cupboard" | lotteryd keys add client19 --keyring-backend test --recover

echo "palm drastic present entry citizen noise plug outside toss eager retreat roof tilt own good girl embody first body purpose ivory loop guitar hurt" | lotteryd keys add client20 --keyring-backend test --recover

**Add genesis accounts**
lotteryd add-genesis-account $(lotteryd keys show validator -a --keyring-backend test) 1000token,30000000000000stake
lotteryd add-genesis-account $(lotteryd keys show client1 -a --keyring-backend test) 500token,30000stake
lotteryd add-genesis-account $(lotteryd keys show client2 -a --keyring-backend test) 500token,30000stake
lotteryd add-genesis-account $(lotteryd keys show client3 -a --keyring-backend test) 500token,30000stake
lotteryd add-genesis-account $(lotteryd keys show client4 -a --keyring-backend test) 500token,30000stake
lotteryd add-genesis-account $(lotteryd keys show client5 -a --keyring-backend test) 500token,30000stake
lotteryd add-genesis-account $(lotteryd keys show client6 -a --keyring-backend test) 500token,30000stake
lotteryd add-genesis-account $(lotteryd keys show client7 -a --keyring-backend test) 500token,30000stake
lotteryd add-genesis-account $(lotteryd keys show client8 -a --keyring-backend test) 500token,30000stake
lotteryd add-genesis-account $(lotteryd keys show client9 -a --keyring-backend test) 500token,30000stake
lotteryd add-genesis-account $(lotteryd keys show client10 -a --keyring-backend test) 500token,30000stake
lotteryd add-genesis-account $(lotteryd keys show client11 -a --keyring-backend test) 500token,30000stake
lotteryd add-genesis-account $(lotteryd keys show client12 -a --keyring-backend test) 500token,30000stake
lotteryd add-genesis-account $(lotteryd keys show client13 -a --keyring-backend test) 500token,30000stake
lotteryd add-genesis-account $(lotteryd keys show client14 -a --keyring-backend test) 500token,30000stake
lotteryd add-genesis-account $(lotteryd keys show client15 -a --keyring-backend test) 500token,30000stake
lotteryd add-genesis-account $(lotteryd keys show client16 -a --keyring-backend test) 500token,30000stake
lotteryd add-genesis-account $(lotteryd keys show client17 -a --keyring-backend test) 500token,30000stake
lotteryd add-genesis-account $(lotteryd keys show client18 -a --keyring-backend test) 500token,30000stake
lotteryd add-genesis-account $(lotteryd keys show client19 -a --keyring-backend test) 500token,30000stake
lotteryd add-genesis-account $(lotteryd keys show client20 -a --keyring-backend test) 500token,30000stake

**Add a genesis validator by staking "stake" tokens**
lotteryd gentx validator 9000000000000stake --keyring-backend test --chain-id test

**Collect genesis transactions**
lotteryd collect-gentxs

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

## How to enter lottery
```
lotteryd tx lottery enter-lottery 100token --from validator1 --chain-id test -y
```
## How to query lotteries
```
lotteryd q lottery list-lottery
```
## How to query bets
```
lotteryd q lottery list-bet-data
```
## How to query balance
```
lotteryd q bank balances <account_addr>
ex; lotteryd q bank balances lottery14u53eghrurpeyx5cm47vm3qwugtmhcpn2hf7yj
```
