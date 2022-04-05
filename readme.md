# lottery
**lottery** is a blockchain built using Cosmos SDK and Tendermint and created with [Starport](https://starport.com).

## Rules of the lotter

Anyone can enter the lottery as long as they have enough funds
A winner is chosen if the current block has 4 or more valid enter lottery transactions
Once a winner is chosen, a payout is sent and the next lottery cycle begins

## Enter Lottery transaction
```Valid only when sender has enough funds to cover lottery fee + minimal bet
Only 1 enter lottery transaction is valid per user per block
Transaction Fields:
Lottery Fee (in tokens, e.g. 5token )
Bet Size (in tokens, e.g. 100token )
User can only bet between 1 to 100 tokens
User is charged the lottery fee and a minimal bet and money is saved in the lottery
pool
Lottery fee is 5token , minimal bet is 1token```

## How to run

```
mkdir -p ~/.LotteryApp/upgrade_manager/genesis/bin
mkdir -p ~/.LotteryApp/upgrade_manager/upgrades

cp $(which lotteryd) ~/.LotteryApp/upgrade_manager/genesis/bin
sudo cp $(which lotteryd-manager) /usr/bin

lotteryd init --chain-id test validator

echo "pet apart myth reflect stuff force attract taste caught fit exact ice slide sheriff state since unusual gaze practice course mesh magnet ozone purchase" | lotteryd keys add validator --keyring-backend test --recover

echo "bottom soccer blue sniff use improve rough use amateur senior transfer quarter" | lotteryd keys add validator1 --keyring-backend test --recover

echo "wreck layer draw very fame person frown essence approve lyrics sustain spoon" | lotteryd keys add validator2 --keyring-backend test --recover

echo "exotic merit wrestle sad bundle age purity ability collect immense place tone" | lotteryd keys add validator3 --keyring-backend test --recover

echo "faculty head please solid picnic benefit hurt gloom flag transfer thrive zebra" | lotteryd keys add validator4 --keyring-backend test --recover


lotteryd add-genesis-account $(lotteryd keys show validator -a --keyring-backend test) 100000000000000token,300000000000000stake
lotteryd add-genesis-account $(lotteryd keys show validator1 -a --keyring-backend test) 110000000000000token,300000000000000stake
lotteryd add-genesis-account $(lotteryd keys show validator2 -a --keyring-backend test) 120000000000000token,300000000000000stake
lotteryd add-genesis-account $(lotteryd keys show validator3 -a --keyring-backend test) 130000000000000token,300000000000000stake
lotteryd add-genesis-account $(lotteryd keys show validator4 -a --keyring-backend test) 140000000000000token,300000000000000stake

lotteryd gentx validator 9000000000000stake --keyring-backend test --chain-id test


sudo vim /etc/systemd/system/lottery.service

lotteryd collect-gentxs
```
