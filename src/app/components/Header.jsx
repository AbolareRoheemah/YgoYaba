'use client'
import React, {useContext,useState,useEffect} from 'react'
import { GlobalStateContext } from '../context/GlobalStateContext';
import '@rainbow-me/rainbowkit/styles.css';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';

export default function Header() {
    // const [account, setAccount] = useState("")
    // const [chainId, setChainId] = useState("")
    // const [balance, setBalance] = useState(null);
    const { setAccount, balance, handleWalletConnect, handleDisconnect } = useContext(GlobalStateContext);
    const {address} = useAccount()
    
    useEffect(() => {
        const savedAccount = localStorage.getItem('connectedAccount');
        if (savedAccount) {
          setAccount(savedAccount);
        }
      }, []);
  return (
    <div className='flex items-center justify-end gap-6 p-6'>
        <ConnectButton />
    </div>
  )
}
