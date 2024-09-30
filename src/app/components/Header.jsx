'use client'
import React, {useContext,useState,useEffect} from 'react'
import { GlobalStateContext } from '../context/GlobalStateContext';

export default function Header() {
    // const [account, setAccount] = useState("")
    // const [chainId, setChainId] = useState("")
    // const [balance, setBalance] = useState(null);
    const { account, setAccount, balance, handleWalletConnect, handleDisconnect } = useContext(GlobalStateContext);
    
    useEffect(() => {
        const savedAccount = localStorage.getItem('connectedAccount');
        if (savedAccount) {
          setAccount(savedAccount);
          console.log("header", savedAccount)
        }
      }, []);
  return (
    <div className='flex items-center justify-between gap-6 p-6'>
        <div className='flex items-center justify-end'>
            {account ? (
                <div>
                    <div>Connected Account: {account}</div>
                    <div>Balance: {balance}</div>
                </div>
            ): null}
        </div>
        <div className='flex items-center justify-end gap-6'>
        {account ? <button className='flex items-center justify-between gap-4 bg-[red] py-4 px-8 text-[#000] rounded-full' onClick={handleDisconnect}>Disconnect</button>
        :
        <div className='flex items-center justify-between gap-4 bg-[#6ff6d7] py-4 px-8 text-[#000] rounded-full font-medium cursor-pointer' onClick={handleWalletConnect}>
            <p>Connect Wallet</p>
            <img src="/view.svg" alt="" width={24} height={24} />
        </div>}
        </div>
    </div>
  )
}
