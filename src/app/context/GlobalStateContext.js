'use client'
import React, { createContext, useState, useEffect } from 'react';
import { ethers, JsonRpcProvider } from "ethers"

export const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ children }) => {
    const [account, setAccount] = useState("")
    const [chainId, setChainId] = useState("")
    const [balance, setBalance] = useState(null);
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [items, setItems] = useState(null);
    const [hash, setHash] = useState([]);
    
    const SCROLL_SEPOLIA_CHAIN_ID = '0x5'; // Chain ID for Scroll Sepolia

    const handleWalletConnect = async() => {
        const ethereum = window.ethereum;
        const alchemyProvider = "https://scroll-sepolia.g.alchemy.com/v2/yGouDJNdYc-mbzx5nfkfr6a_tF8X9U1M";
        if(ethereum) {
            try {
                const accounts = await ethereum.request({
                    method: "eth_requestAccounts"
                })
                setAccount(accounts[0])
                localStorage.setItem('connectedAccount', accounts[0]);
                let signer = null;

                let provider;
                provider = new ethers.BrowserProvider(window.ethereum)
                setProvider(provider)
                signer = await provider.getSigner();
                setSigner(signer)

                const accountBalance = await ethereum.request({
                    method: "eth_getBalance",
                    params: [accounts[0], 'latest'],
                })
                setBalance(parseFloat(accountBalance) / 10 ** 18)

                const chainId = await ethereum.request({
                    method: "eth_chainId"
                })
                setChainId(chainId);

                // Check if the connected chain is Scroll Sepolia
                if (chainId !== SCROLL_SEPOLIA_CHAIN_ID) {
                    alert('Please connect to the Scroll Sepolia network!');
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

    useEffect(() => {
        const savedAccount = localStorage.getItem('connectedAccount');
        if (savedAccount) {
          setAccount(savedAccount);
          console.log("context", savedAccount)
        }
    }, []);

    return (
        <GlobalStateContext.Provider value={{ account, setAccount, balance, setBalance, handleWalletConnect, handleDisconnect, hash, setHash, items, setItems, provider, setProvider, signer, setSigner }}>
            {children}
        </GlobalStateContext.Provider>
    );
};