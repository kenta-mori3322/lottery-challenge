package types

import (
	"fmt"
	"strconv"
)

// DefaultIndex is the default capability global index
const DefaultIndex uint64 = 1

// DefaultGenesis returns the default Capability genesis state
func DefaultGenesis() *GenesisState {
	return &GenesisState{
		LotteryList: []Lottery{},
		BetList:     []Bet{},
		// this line is used by starport scaffolding # genesis/types/default
		Params: DefaultParams(),
	}
}

// Validate performs basic genesis state validation returning an error upon any
// failure.
func (gs GenesisState) Validate() error {
	// Check for duplicated index in lottery
	lotteryIndexMap := make(map[string]struct{})

	for _, elem := range gs.LotteryList {
		n, _ := strconv.ParseUint(elem.Index, 10, 64)
		index := string(LotteryStoreKey(n))
		if _, ok := lotteryIndexMap[index]; ok {
			return fmt.Errorf("duplicated index for lottery")
		}
		lotteryIndexMap[index] = struct{}{}
	}

	// Check for duplicated index in bet
	betIndexMap := make(map[string]struct{})

	for _, elem := range gs.BetList {
		n, _ := strconv.ParseUint(elem.Index, 10, 64)
		index := string(BetStoreKey(n))
		if _, ok := betIndexMap[index]; ok {
			return fmt.Errorf("duplicated index for bet")
		}
		betIndexMap[index] = struct{}{}
	}
	// this line is used by starport scaffolding # genesis/types/validate

	return gs.Params.Validate()
}
