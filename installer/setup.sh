#!/bin/bash

INSTALLER_PATH=$(pwd)
CLIENT_DIR="$INSTALLER_PATH/client"
LOGS_PATH="$INSTALLER_PATH/network/logs.txt"


# Utils
red='\033[0;31m'
green='\033[0;32m'
reset='\033[0m'

# Define options and default selected option
selected=0

# Function to print the menu
print_menu() {
    local message=$1
    local question=$2
    shift 2
    local options=("${@}")

    while true; do
        clear
        echo -e "\n\n${message}"
        echo -e "${question}\n"
        for i in "${!options[@]}"; do
            if [ $i -eq $selected ]; then
                echo -e "${red}>  ${options[$i]}${reset}"
            else
                echo -e "${green}   ${options[$i]}${reset}"
            fi
        done

        # Loop for user input
        read -sn1 input
        case $input in
            A) # Up arrow
                selected=$((selected-1))
                if [ $selected -lt 0 ]; then
                    selected=$((${#options[@]}-1))
                fi
                ;;
            B) # Down arrow
                selected=$((selected+1))
                if [ $selected -ge ${#options[@]} ]; then
                    selected=0
                fi
                ;;
            "") # Enter key
                clear
                if [ "${options[$selected]}" = "Quit" ]; then
                    echo -e "\nSee you soon!"
                    exit
                else
                    echo -e "\nYou selected ${options[$selected]}\n"
                fi
                break
                ;;
        esac
    done
}

getClient() {
    if sudo docker ps -a | grep geth > /dev/null
	then
		node_docker="geth"
    elif sudo docker ps -a | grep taiko > /dev/null
	then
		node_docker="taiko"
    elif sudo docker ps -a | grep celo > /dev/null
	then
		node_docker="celo"
	else
		node_docker="null"
	fi
}

menu_installer() {
    reset
    clear
    options=("Restart" "Stop" "Delete" "Quit")
    choice=("Yes" "No" "Quit")
    selected=0 # Initialize the selected variable
    print_menu "Welcome back to node installer!" "A client has been detected on this machine. Please chose your option!" "${options[@]}"

    if [ "${options[$selected]}" = "Restart" ]; then
        clear
        sudo docker start ${node_docker} > /dev/null
        echo -e "\nNode started.\n"
        exit
    fi
    if [ "${options[$selected]}" = "Stop" ]; then
        clear
        sudo docker stop ${node_docker} > /dev/null
        echo -e "\nNode stoped.\n"
        exit
    fi
    if [ "${options[$selected]}" = "Delete" ]; then
        clear
        echo -e "\nNode deleted.\n"
        refreshClient
        exit
    fi
}

menu_running() {
    clear
    options=("Ethereum" "Taiko" "Celo" "Quit")
    choice=("Yes" "No" "Quit")
    selected=0 # Initialize the selected variable
    print_menu "Welcome to node installer!" "Please select the blockchain that you would like to setup" "${options[@]}"

    if [ "${options[$selected]}" = "Taiko" ]; then
        installTools
        installTaiko
    elif [ "${options[$selected]}" = "Ethereum" ]; then
        menu_ethereum
    elif [ "${options[$selected]}" = "Celo" ]; then
        installTools
        installCelo
    fi
}

menu_ethereum() {
    clear
    options=("Geth - Ethereum" "Nethermind - Nethermind" "Besu - Hyperledger" "Erigon - Ledgerstack" "Quit")
    choice=("Yes" "No" "Quit")
    selected=0 # Initialize the selected variable
    print_menu "You selected Ethereum" "Please chose the execution client you'd like to install (currently using Lodestar concensus client)" "${options[@]}"

    echo -e -n "${green}> Enter a name for your node:${reset} "
    read node_name

    # Create a JSON object and store it in config.json
    if [ "${options[$selected]}" = "Geth - Ethereum" ]; then
        client="geth"
        installTools
        installGeth
    elif [ "${options[$selected]}" = "Nethermind - Nethermind" ]; then
        client="nethermind"
        installTools
        installGeth
    elif [ "${options[$selected]}" = "Besu - Hyperl" ]; then
        client="besu"
        installTools
        installGeth
    elif [ "${options[$selected]}" = "Erigon - Ledgerwatch" ]; then
        client="erigon"
        installTools
        installGeth
    fi
    echo "{\"name\": \"${node_name}\", \"client\": \"${client}\", \"rpc_key\": \"${rpc_key}\"}" > config.json    
}

main(){
    getClient
    if [ "${node_docker}" = "null" ]; then
        menu_running
    else
        menu_installer
    fi
}

installGeth() {
    clear
    echo -e "\n\033[34mCloning and running docker... \033[m"
    sleep 1
    refreshClient
    git clone https://github.com/ChainSafe/lodestar-quickstart $CLIENT_DIR
    cd $CLIENT_DIR
    sed -i 's|LODESTAR_EXTRA_ARGS="--network mainnet $LODESTAR_FIXED_VARS"|LODESTAR_EXTRA_ARGS="--checkpointSyncUrl https://beaconstate-mainnet.chainsafe.io --network mainnet $LODESTAR_FIXED_VARS"|g' ./mainnet.vars
    ./setup.sh --dataDir goerli-data --elClient geth --network mainnet --detached --dockerWithSudo
    # Wait for the Geth client to start
    clear
    echo -e "\n\033[34mWaiting for Geth container to be in a running state... \033[m"
    while [[ "$(sudo docker inspect -f '{{.State.Status}}' mainnet-geth)" != "running" ]]; do sleep 1; done
    clear
    echo -e "\n\033[34mWaiting for Geth client to start... \033[m"
    sudo docker logs mainnet-geth
    while ! sudo docker exec mainnet-geth grep Ethereum > /dev/null; do sleep 1; done
    echo "{\"name\": \"${node_name}\", \"client\": \"${client}\", \"rpc_key\": \"${rpc_key}\"}" > config.json
    go build
    echo -e "\n\033[32m$name full node is running correctly using Geth client!\033[m"
    exit
}

installTaiko() {
    clear
    echo -e "\n\033[34mCloning Taiko node... \033[m"
    sleep 1
    refreshClient
    git clone https://github.com/taikoxyz/simple-taiko-node.git $CLIENT_DIR
    cd $CLIENT_DIR
    clear
    echo -e "\n\033[34mConfiguring Taiko node... \033[m"
    sleep 1
    cp .env.sample .env
    sed -i 's/L1_ENDPOINT_HTTP=.*/L1_ENDPOINT_HTTP=https:\/\/l1rpc.a2.taiko.xyz/g' .env
    sed -i 's/L1_ENDPOINT_WS=.*/L1_ENDPOINT_WS=wss:\/\/l1ws.a2.taiko.xyz/g' .env
    sed -i 's/\(- --ws.origins.*\)/\0\n  - --p2p.syncTimeout\n  - "600"/' docker-compose.yml
    clear
    echo -e "\n\033[34mStarting Taiko node... \033[m"
    sleep 1
    sudo docker compose up -d
    echo -e "\n\033[34mExposing RPC endpoint...\033[m"
    sudo ufw enable
    sudo ufw allow 8545
    PUBLIC_IP=$(curl -s ifconfig.me)
    echo -e "\n\033[32mCelo full node RPC is exposed correctly at: http://$PUBLIC_IP:8545\033[m"
}

installCelo() {
    clear
    echo -e "\n\033[34mSetting up Celo full node... \033[m"
    sleep 1
    refreshClient

    # Set up the environment variable
    export CELO_IMAGE=us.gcr.io/celo-org/geth:mainnet

    # Pull the Celo Docker image
    sudo docker pull $CELO_IMAGE

    # Set up the data directory
    mkdir -p $HOME/client
    CELO_DATA_DIR=$HOME/client/celo-data-dir
    mkdir -p $CELO_DATA_DIR
    chmod 777 $CELO_DATA_DIR

    # Create an account and get its address
    sudo docker run -v $CELO_DATA_DIR:/root/.celo --rm -it $CELO_IMAGE account new
    echo "Please copy and paste your Celo public key and press Enter:"
    read CELO_ACCOUNT_ADDRESS

    echo "Celo account address: $CELO_ACCOUNT_ADDRESS"
    # Start the Celo full node
    sudo docker run --name celo -d --restart unless-stopped --stop-timeout 300 -p 127.0.0.1:8545:8545 -p 127.0.0.1:8546:8546 -p 30303:30303 -p 30303:30303/udp -v $PWD:/root/.celo $CELO_IMAGE --verbosity 3 --syncmode full --http --http.addr 0.0.0.0 --http.api eth,net,web3,debug,admin,personal --light.serve 90 --light.maxpeers 1000 --maxpeers 1100 --etherbase $CELO_ACCOUNT_ADDRESS --datadir /root/.celo

    clear
    echo -e "\n\033[34mWaiting for Celo full node to start... \033[m"
   	while ! sudo docker logs celo > /dev/null; do sleep 1; done
    echo -e "\n\033[32mCelo full node is running correctly!\033[m"
    echo -e "\n\033[34mExposing RPC endpoint...\033[m"
    sudo ufw enable
    sudo ufw allow 8545
    PUBLIC_IP=$(curl -s ifconfig.me)
    echo -e "\n\033[32mCelo full node RPC is exposed correctly at: http://$PUBLIC_IP:8545\033[m"
    exit
}



installTools() {
    clear
    echo -e "\n\033[34mInstalling tools pre-requisites... \033[m\n"
    sleep 1
    while read -r p ; do sudo apt install -y $p ; done < <(cat << "EOF"
        build-essential
        libncurses5-dev
        libpcap-dev
        git
        jq
EOF
)
    clear
    echo -e "\n\033[34mInstalling tools... \033[m\n"
    if ! command -v docker &> /dev/null; then
        sudo apt-get update
        sudo apt-get install -y \
            apt-transport-https \
            ca-certificates \
            curl \
            gnupg \
            lsb-release
        curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
        echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list
        sudo apt-get update
        sudo apt-get install -y \
            docker-ce \
            docker-ce-cli \
            containerd.io
    fi
    if ! command go version >/dev/null; then
        echo "Installing go language package version 1.20.2"
        curl https://storage.googleapis.com/golang/go1.20.2.linux-amd64.tar.gz | sudo tar -C /usr/local -xzf -
        echo 'export PATH=$PATH:/usr/local/go/bin' | sudo tee -a /etc/environment > /dev/null
        sudo chmod 0644 /etc/environment
        source /etc/environment
    fi
    while read -r p ; do sudo apt install -y $p ; done < <(cat << "EOF"
        sysstat
        bc
EOF
)

}

refreshClient()
{
    if sudo docker ps -a | grep mainnet-geth > /dev/null
	then
		sudo docker rm -f mainnet-geth > /dev/null
		sudo docker rm -f mainnet-lodestar > /dev/null
        rm -rf ./nohup.out > /dev/null
		rm -f $LOGS_PATH > /dev/null
	fi
    if sudo docker ps -a | grep taiko > /dev/null
	then
		sudo docker rm -f taiko-client > /dev/null
		sudo docker rm -f client-grafana-1 > /dev/null
		sudo docker rm -f client-prometheus-1 > /dev/null
		sudo docker rm -f client-taiko_client_prover_relayer-1 > /dev/null
		sudo docker rm -f client-taiko_client_driver-1 > /dev/null
		sudo docker rm -f client-l2_execution_engine-1 > /dev/null
        rm -rf ./nohup.out > /dev/null
		rm -f $LOGS_PATH > /dev/null
	fi
    if sudo docker ps -a | grep celo > /dev/null
	then
		sudo docker rm -f celo > /dev/null
        rm -rf ./nohup.out > /dev/null
		rm -f $LOGS_PATH > /dev/null
	fi
	if [ -d $CLIENT_DIR ]
	then
		sudo rm -rf $CLIENT_DIR
	fi
}
main "$@"