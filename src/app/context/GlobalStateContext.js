'use client'
import React, { createContext, useState, useEffect } from 'react';
import { ethers, JsonRpcProvider, Contract } from "ethers"
const { Alchemy, Network, Wallet, Utils } = require("alchemy-sdk");
const dotenv = require("dotenv");

dotenv.config();
const { API_KEY, PRIVATE_KEY } = process.env;

export const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ children }) => {
    const [account, setAccount] = useState("")
    const [chainId, setChainId] = useState("")
    const [balance, setBalance] = useState(null);
    const [contract, setContract] = useState(null);
    const [inprovider, setInProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [items, setItems] = useState(null);
    const [hash, setHash] = useState([]);
    
    const SCROLL_SEPOLIA_CHAIN_ID = '0x5';
    const network = "scroll-sepolia";
    const settings = {
        apiKey: API_KEY,
        network: Network.SCROLL_SEPOLIA,
     }

     const alchemy = new Alchemy(settings);

    //  let wallet = new Wallet(PRIVATE_KEY);
     const contractAddy = "0x70Af6C11d00dDf021b67d7A84687Bc654c7Ec18E";// 0x70Af6C11d00dDf021b67d7A84687Bc654c7Ec18E
    const abi = [
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "tokenAddress",
              "type": "address"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "itemId",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "buyer",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "price",
              "type": "uint256"
            },
            {
              "indexed": true,
              "internalType": "string",
              "name": "_itemName",
              "type": "string"
            },
            {
              "indexed": false,
              "internalType": "string",
              "name": "_itemImage",
              "type": "string"
            }
          ],
          "name": "ItemBought",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "itemId",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "seller",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "price",
              "type": "uint256"
            },
            {
              "indexed": true,
              "internalType": "string",
              "name": "_itemName",
              "type": "string"
            },
            {
              "indexed": false,
              "internalType": "string",
              "name": "_itemImage",
              "type": "string"
            }
          ],
          "name": "ItemListed",
          "type": "event"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "name": "allItems",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "itemName",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "itemImage",
              "type": "string"
            },
            {
              "internalType": "address payable",
              "name": "seller",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "price",
              "type": "uint256"
            },
            {
              "internalType": "bool",
              "name": "isFree",
              "type": "bool"
            },
            {
              "internalType": "bool",
              "name": "sold",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_itemId",
              "type": "uint256"
            }
          ],
          "name": "buyItem",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_itemId",
              "type": "uint256"
            }
          ],
          "name": "claimRewards",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "name": "claimedReward",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "freeListingReward",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "name": "freePurchases",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "getAllItems",
          "outputs": [
            {
              "components": [
                {
                  "internalType": "uint256",
                  "name": "id",
                  "type": "uint256"
                },
                {
                  "internalType": "string",
                  "name": "itemName",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "itemImage",
                  "type": "string"
                },
                {
                  "internalType": "address payable",
                  "name": "seller",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "price",
                  "type": "uint256"
                },
                {
                  "internalType": "bool",
                  "name": "isFree",
                  "type": "bool"
                },
                {
                  "internalType": "bool",
                  "name": "sold",
                  "type": "bool"
                }
              ],
              "internalType": "struct YgoYabaContract.Item[]",
              "name": "",
              "type": "tuple[]"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "itemCount",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "name": "items",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "itemName",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "itemImage",
              "type": "string"
            },
            {
              "internalType": "address payable",
              "name": "seller",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "price",
              "type": "uint256"
            },
            {
              "internalType": "bool",
              "name": "isFree",
              "type": "bool"
            },
            {
              "internalType": "bool",
              "name": "sold",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "_itemName",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "_price",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "_itemImage",
              "type": "string"
            }
          ],
          "name": "listItem",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "maxFreePurchases",
          "outputs": [
            {
              "internalType": "uint8",
              "name": "",
              "type": "uint8"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "maxPaidPurchases",
          "outputs": [
            {
              "internalType": "uint8",
              "name": "",
              "type": "uint8"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "name": "paidPurchases",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "platformToken",
          "outputs": [
            {
              "internalType": "contract IERC20",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_itemId",
              "type": "uint256"
            }
          ],
          "name": "withdrawFunds",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        }
      ]

    const handleWalletConnect = async() => {
        const ethereum = window.ethereum;
        if(ethereum) {
            try {
                const accounts = await ethereum.request({
                    method: "eth_requestAccounts"
                })
                setAccount(accounts[0])
                localStorage.setItem('connectedAccount', accounts[0]);

                const alchemyProvider = new JsonRpcProvider("https://scroll-sepolia.g.alchemy.com/v2/yGouDJNdYc-mbzx5nfkfr6a_tF8X9U1M");
                const alchemysigner = alchemyProvider.getSigner();
                //   const provider = new ethers.providers.AlchemyProvider(settings.network, alchemy.apiKey);

                // const contract = alchemy.createContract(abi, contractAddy);
                const contract = new Contract(contractAddy, abi, alchemysigner)

                setContract(contract)
                // let signer = null;
                const latestBlock = await alchemy.core.getBlockNumber();

                const accountBalance = await ethereum.request({
                    method: "eth_getBalance",
                    params: [accounts[0], 'latest'],
                })
                setBalance(ethers.parseEther(accountBalance))

                const currentChainId = await ethereum.request({
                    method: "eth_chainId"
                });
                setChainId(currentChainId);

                // Check if the connected chain is Scroll Sepolia
                if (currentChainId !== SCROLL_SEPOLIA_CHAIN_ID) {
                    alert('Please connect to the Scroll Sepolia network!');
                    try {
                        await ethereum.request({
                            method: 'wallet_switchEthereumChain',
                            params: [{ chainId: SCROLL_SEPOLIA_CHAIN_ID }],
                        });
                    } catch (switchError) {
                        console.error('Failed to switch network:', switchError);
                    }
                }
            } catch (error) {
                console.error('Error connecting to wallet:', error);
            }
        } else {
            alert('Please install MetaMask or another Ethereum wallet!');
        }
    }
    
    const handleDisconnect = () => {
        setAccount('')
        localStorage.removeItem('connectedAccount');
    }

    async function handleListItem(itemName, price, itemImage) {
        try {
          const tx = await contract.listItem(itemName, price, itemImage);
          await tx.wait();
          console.log('Item listed successfully!');
        } catch (error) {
          console.error('Error listing item:', error);
        }
    }

    useEffect(() => {
        const savedAccount = localStorage.getItem('connectedAccount');
        if (savedAccount) {
          setAccount(savedAccount);
          handleListItem("Cool T-Shirt", 1, "https://example.com/image.png")
        }
    }, []);

    return (
        <GlobalStateContext.Provider value={{ account, setAccount, balance, setBalance, handleWalletConnect, handleDisconnect, hash, setHash, items, setItems, inprovider, setInProvider, signer, setSigner }}>
            {children}
        </GlobalStateContext.Provider>
    );
};