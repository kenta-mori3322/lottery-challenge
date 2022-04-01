VERSION := 0.0.1
COMMIT := $(shell git log -1 --format='%H')

ldflags = -X github.com/cosmos/cosmos-sdk/version.Name=LotteryApp \
	-X github.com/cosmos/cosmos-sdk/version.ServerName=lotteryd \
	-X github.com/cosmos/cosmos-sdk/version.Version=$(VERSION) \
	-X github.com/cosmos/cosmos-sdk/version.Commit=$(COMMIT)

BUILD_FLAGS := -ldflags '$(ldflags)'
DOCKER := $(shell which docker)
DOCKER_BUF := $(DOCKER) run --rm -v $(CURDIR):/workspace --workdir /workspace bufbuild/buf
PROJECT_NAME = $(shell git remote get-url origin | xargs basename -s .git)

all: install

install: go.sum
	go install -mod=readonly $(BUILD_FLAGS) ./cmd/lotteryd

build: go.sum clean
	go build -mod=mod $(BUILD_FLAGS) -o build/lotteryd ./cmd/lotteryd

build-linux:
	GOOS=linux GOARCH=amd64 $(MAKE) build

go.sum: go.mod
	@echo "--> Ensure dependencies have not been modified"
	GO111MODULE=on go mod verify

# look into .golangci.yml for enabling / disabling linters
lint:
	@echo "--> Running linter"
	@golangci-lint run
	@go mod verify

# devnet

devnet: clean install devnet-prepare devnet-start

devnet-prepare:
	./scripts/prepare-devnet.sh

devnet-start:
	DAEMON_NAME=meled DAEMON_HOME=~/.meled DAEMON_ALLOW_DOWNLOAD_BINARIES=true DAEMON_RESTART_AFTER_UPGRADE=true \
    meled-manager start --pruning="nothing" --inv-check-period 5

# Clean up the build directory
clean:
	rm -rf build/

# Create log files
log-files:
	sudo mkdir -p /var/log/meled && sudo touch /var/log/meled/meled.log && sudo touch /var/log/meled/meled_error.log
