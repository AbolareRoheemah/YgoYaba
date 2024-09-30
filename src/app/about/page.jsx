import React from 'react'
import Link from 'next/link';
export default function Landing() {

  return (
    <div className='flex flex-col items-center justify-start gap-2 pt-2 px-20 pb-20 h-screen relative'>
        <div className='absolute inset-0 bg-[#0a0a0a] opacity-80'></div>
        <div className="flex flex-col items-center justify-center my-12 relative z-10">
            <div className="w-6 h-10 border-2 border-[#6df2db] rounded-full shadow-lg flex items-start justify-center cursor-pointer">
            <div className='w-[0.5vw] h-[0.5vw] mt-2 rounded-full bg-[#6df2db]'></div>
            </div>
            <div className="w-px h-10 border-l-2 border-dashed border-white-400 mt-2"></div>
            <div className='w-[0.5vw] h-[0.5vw] mt-2 rounded-full bg-white'></div>
        </div>
        <div className='flex flex-col items-center justify-start gap-2 text-center relative z-10'>
            <div className="relative inline-block">
              <p className='text-[36px] font-medium text-[#6df2db]'>About Us</p>
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#6df2db] rounded-full">
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-1 h-1 bg-[#6df2db] rounded-full"></div>
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 w-1 h-1 bg-[#6df2db] rounded-full"></div>
              </div>
            </div>
            <p className='text-[16px] text-[#a9acae]'>Welcome to YgoYaba. Get rewarded for giving your used items</p>
            <div className='flex items-start justify-start gap-10 border-y-2 border-[#696E71] py-10 mt-6'>
                <div className='text-left'>
                    <h3 className='text-[34px] text-[#6df2db]'>What is YgoYaba?</h3>
                    <p className='text-md text-[#8b9093] mb-8 leading-[30px]'>YgoYaba is a unique platform that allows users to easily sell or donate their second-hand clothes and books. With a user-friendly interface and a wide range of features, YgoYaba makes it simple for anyone to list their items and connect with potential buyers or charitable organizations. Whether you are looking to make some extra cash or give back to the community, YgoYaba has you covered. And if you are here to shop, be sure that you will find something you love at a cheap price or even free</p>
                    <h3 className='text-[34px] text-[#6df2db] py-6'>Why Use YgoYaba?</h3>
                    <ul className='text-md text-[#8b9093] mb-8 list-disc pl-5 text-left'>
                        <li className='py-2'>Convenient and user-friendly interface for easy listing</li>
                        <li className='py-2'>Wide range of categories for selling and donating second-hand items</li>
                        <li className='py-2'>Opportunity to connect with potential buyers and charitable organizations</li>
                        <li className='py-2'>Competitive pricing for buyers and a chance to give back to the community</li>
                        <li className='py-2'>Experience the security and decentralization of the blockchain</li>
                        <li className='py-2'>Reward tokens for users that list their items for charity</li>
                    </ul>
                    <div className='flex items-center justify-start'>
                        <p className='text-md text-[#6AECD9]'>Ready to dive in? connect your wallet below</p>
                        <img src="/readmore.svg" alt="" className='w-6 h-4 transform rotate-90' />
                    </div>
                </div>
            </div>
        <div className='flex items-center justify-between gap-4 bg-[#6ff6d7] py-4 px-8 text-[#000] rounded-full font-medium mt-10 cursor-pointer'>
            <p>Connect Wallet</p>
            <img src="/view.svg" alt="" width={24} height={24} />
        </div>
        </div>

    </div>
  )
}