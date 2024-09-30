'use client'
import React from 'react'
import { useRouter } from 'next/navigation';

export default function Works() {
    const router = useRouter();

  return (
    <div className='works-bg flex flex-col items-center justify-start gap-2 pt-2 px-20 pb-20 h-screen relative'>
        <div className='flex flex-col items-center justify-start gap-2 text-center relative z-10'>
            <div className="relative inline-block mt-8">
              <p className='text-[36px] font-medium text-[#6df2db]'>Welcome! Please Select an Option</p>
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#6df2db] rounded-full">
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-1 h-1 bg-[#6df2db] rounded-full"></div>
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 w-1 h-1 bg-[#6df2db] rounded-full"></div>
              </div>
            </div>
            <p className='text-[16px] text-[#a9acae]'>Thanks for coming this far. You are a step closer to the market without even moving an inch!</p>
            <div className='flex items-center justify-center gap-20 mt-10 mb-14'>
                <div className="relative">
                <div className="py-8 px-10 border-2 flex flex-col items-left justify-start bg-[#0D1117] rounded-md relative z-10 w-[400px]">
                    <div className='flex flex-col items-center justify-start'>
                        <div className="w-full h-[250px] rounded-md bg-cover bg-center bg-no-repeat border-2 border-[#6EF4E6]" style={{backgroundImage: "url('/clothes.jpg')", backgroundSize: 'cover', backgroundPosition: 'top'}}>
                        </div>
                    </div>
                    <div className='mt-6 text-[#9B9EA1]'>
                        <div className='flex items-start justify-start mb-4 w-full  gap-2'>
                            <p><img src="/job.svg" alt="" /></p>
                            <p className='text-[#6df2db] text-[26px] font-bold'>Clothes</p>
                        </div>
                        <div className='flex items-start justify-start gap-4 my-4'>
                            {/* <button className='border-[#6EF4E6] border-2 px-6 py-2'>Sell</button> */}
                            <button className='border-[#6EF4E6] border-2 px-6 py-2' onClick={() => {router.push("/addItem")}}>Add Item</button>
                        </div>
                    </div>
                </div>
                </div>
                <div className="relative">
                <div className="py-8 px-10 border-2 flex flex-col items-left justify-start bg-[#0D1117] rounded-md relative z-10 w-[400px]">
                    <div className='flex flex-col items-center justify-start'>
                        <div className="w-full h-[250px] rounded-md bg-cover bg-center bg-no-repeat border-2 border-[#6EF4E6]" style={{backgroundImage: "url('/books.jpg')", backgroundSize: 'cover', backgroundPosition: 'center'}}>
                        </div>
                    </div>
                    <div className='mt-6 text-[#9B9EA1]'>
                        <div className='flex items-start justify-start mb-4 gap-2'> 
                            <p><img src="/job.svg" alt="" /></p>
                            <p className='text-[#6df2db] text-[26px] font-bold'>Books</p>
                        </div>
                        <div className='flex items-start justify-start gap-4 my-4'>
                            {/* <button className='border-[#6EF4E6] border-2 px-6 py-2'>Sell</button> */}
                            <button className='border-[#6EF4E6] border-2 px-6 py-2' onClick={() => {router.push("/addItem")}}>Add Item</button>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>

    </div>
  )
}
