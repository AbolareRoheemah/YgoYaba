import React, { useEffect, useState, useContext } from 'react'
import { ethers } from 'ethers';
import { JsonRpcProvider } from 'ethers';
import { getContract } from '../../../utils/contract'
import { GlobalStateContext } from '../context/GlobalStateContext';

export default function useIntegrate() {
    const { items, setItems, signer } = useContext(GlobalStateContext);
    const contractAddy = "0x70Af6C11d00dDf021b67d7A84687Bc654c7Ec18E";
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

    // Create a provider using Alchemy RPC for Scroll Sepolia
    const alchemyProvider = new JsonRpcProvider("https://scroll-sepolia.g.alchemy.com/v2/yGouDJNdYc-mbzx5nfkfr6a_tF8X9U1M");

    useEffect(() => {
        
    }, []);

    const listItem = async (name, price, image) => {
        console.log("in inter");
        try {
            // Create contract instance with signer
            const contract = new ethers.Contract(contractAddy, abi, signer);

            const tx = await contract.listItem(name, price, image);
            await tx.wait();

            console.log("Transaction receipt:", tx);
            return tx;
        } catch (error) {
            console.error("Error listing item:", error);
        }
    }

    async function getAllItems() {
        const contract = getContract(signer) // Use signer directly instead of library.getSigner()
        const allItems = await contract.getAllItems()
        setItems(allItems)
    }

    return {
        listItem,
        // buyItem,
        getAllItems
    };
}