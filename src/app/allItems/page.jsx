'use client'
import React, { useEffect, useState, useContext } from 'react'
import { useRouter } from 'next/navigation';
import useStorage from "../hooks/useStorage"
import useIntegrate from '../hooks/useIntegrate';
import useWagmi from '../hooks/useWagmi';
import { GlobalStateContext } from '../context/GlobalStateContext';
import Modal from "../components/Modal"
import { Dialog} from '@headlessui/react';

export default function Works() {
    const [openModal, setopenModal] = useState(false);
    const [items, setItems] = useState(false);
    const router = useRouter();
    const { getUploadedFile } = useStorage();
    const [activeTab, setActiveTab] = useState('cloths');
    const { hash } = useContext(GlobalStateContext);
    // const { buyItem, getAllItems } = useIntegrate();
    const { buyItem, isPending, allItems } = useWagmi();
    const [clothes, setClothes] = useState([
        {
            id: 1,
            img: "/shirt.jpg",
            type: "Male Shirt",
            price: "5"
        },
        {
            id: 2,
            img: "/trouser.jpg",
            type: "Male Trouser",
            price: "Free"
        },
        {
            id: 3,
            img: "/dress.jpg",
            type: "Gown",
            price: "2"
        },
        {
            id: 4,
            img: "/dress1.jpg",
            type: "Single Top",
            price: "Free"
        },
        {
            id: 5,
            img: "/gown.jpg",
            type: "Gown",
            price: "5"
        },
        {
            id: 6,
            img: "/top1.jpg",
            type: "Female Shirt",
            price: "3"
        },
    ])
    const [books, setBooks] = useState([
        {
            id: 1,
            img: "/novel.jpg",
            type: "Fiction Novel",
            price: "5"
        },
        {
            id: 2,
            img: "/storybook.jpg",
            type: "Economics Textbook",
            price: "Free"
        },
        {
            id: 3,
            img: "/justbook.jpg",
            type: "Dictionary",
            price: "2"
        },
        {
            id: 4,
            img: "/novel1.jpg",
            type: "Novel",
            price: "Free"
        },
        {
            id: 5,
            img: "/books.jpg",
            type: "Magazine",
            price: "5"
        },
        {
            id: 6,
            img: "/books.jpg",
            type: "Story Book",
            price: "5"
        },
    ])

    const handleGetItem = async (event, item) => {
        event.preventDefault();
        await buyItem(item.id);

        setopenModal(true)
    }

    const handleGetAllItems = async () => {
        const items = await allItems;
        if (items && items.length) {
            setItems([...items, items])
        }
        // for (let index = 0; index < hash.length; index++) {
        //     console.log("get inn")
        //     const file = await getUploadedFile(hash[index])
        //     console.log("get all", file)
        //     setClothes([...clothes, file])
        // }
    }

    const handleopenModal = () => {
        setopenModal(false)
    }

    useEffect(() => {
        handleGetAllItems()
    }, [])

  return (
    <div className='works-bg flex flex-col items-center justify-start gap-2 pt-2 px-20 pb-20 h-screen relative'>
        <div className='flex flex-col items-center justify-start gap-2 text-center relative z-10'>
            <div className="relative inline-block mt-8">
              <p className='text-[36px] font-medium text-[#6df2db]' onClick={handleGetAllItems}>Happy Shopping</p>
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#6df2db] rounded-full">
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-1 h-1 bg-[#6df2db] rounded-full"></div>
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 w-1 h-1 bg-[#6df2db] rounded-full"></div>
              </div>
            </div>
            <p className='text-[16px] text-[#a9acae]'>Thanks for being here. You are a now in the market. We hope that you enjoy your Shopping. To ensure the good stuff goes round, each user is only allowed to pick 2 free items and 4 paid ones.</p>
            <div className="flex items-center gap-4 mt-8 transition-all duration-300 ease-in-out">
                <button 
                    className={`px-4 py-2 ${activeTab === 'cloths' ? 'border-b-2 border-[#6df2db] text-[#6df2db] scale-110' : 'scale-100'} transition-transform`} 
                    onClick={() => setActiveTab('cloths')}
                >
                    <p className='text-white text-[20px]'>Cloths</p>
                </button>
                <button 
                    className={`px-4 py-2 ${activeTab === 'books' ? 'border-b-2 border-[#6df2db] text-[#6df2db] scale-110' : 'scale-100'} transition-transform`} 
                    onClick={() => setActiveTab('books')}
                >
                    <p className='text-white text-[20px]'>Books</p>
                </button>
            </div>
            <div className='mt-10 mb-14'>
                {activeTab === 'cloths' && (
                    <div className="relative flex flex-wrap justify-center gap-2">
                    {clothes.map((cloth, index) => (
                        <div key={index} className="p-8 border-2 flex flex-col items-left justify-start bg-[#0D1117] rounded-md relative z-10 basis-3/12 m-4">
                            <div className='flex flex-col items-center justify-start'>
                                <div className="w-full h-[250px] rounded-md bg-cover bg-center bg-no-repeat border-2 border-[#6EF4E6]" style={{backgroundImage: `url(${cloth.img})`, backgroundSize: 'cover', backgroundPosition: 'top'}}>
                                </div>
                            </div>
                            <div className='mt-6 text-[#9B9EA1]'>
                                <div className='flex items-start justify-start mb-4 w-full gap-2'>
                                    <p><img src="/job.svg" alt="" /></p>
                                    <p className='text-[#6df2db] text-[26px] font-bold'>{cloth.type}</p>
                                </div>
                                <p className='text-white text-[16px] text-left'>Price in YGY: {cloth.price}</p>
                                <div className='flex items-start justify-start gap-4 my-4'>
                                    <button className='border-[#6EF4E6] border-2 px-6 py-2' onClick={(e) => handleGetItem(e,cloth)}>{!isPending ? (<span>Get Item</span>):
              <p>Loading...</p>}</button>
                                </div>
                            </div>
                        </div>
                    ))}
                    </div>
                )}
                {activeTab === 'books' && (
                    <div className="relative flex flex-wrap justify-center gap-2">
                    {books.map((book, index) => (
                        <div key={index} className="p-8 border-2 flex flex-col items-left justify-start bg-[#0D1117] rounded-md relative z-10 basis-3/12 m-4">
                            <div className='flex flex-col items-center justify-start'>
                                <div className="w-full h-[250px] rounded-md bg-cover bg-center bg-no-repeat border-2 border-[#6EF4E6]" style={{backgroundImage: `url(${book.img})`, backgroundSize: 'cover', backgroundPosition: 'top'}}>
                                </div>
                            </div>
                            <div className='mt-6 text-[#9B9EA1]'>
                                <div className='flex items-start justify-start mb-4 w-full gap-2'>
                                    <p><img src="/job.svg" alt="" /></p>
                                    <p className='text-[#6df2db] text-[20px] font-medium'>{book.type}</p>
                                </div>
                                <p className='text-white text-[16px] text-left'>Price in YGY: {book.price}</p>
                                <div className='flex items-start justify-start gap-4 my-4'>
                                    <button className='border-[#6EF4E6] border-2 px-6 py-2' onClick={(e) => handleGetItem(e,book)}>Get Item</button>
                                </div>
                            </div>
                        </div>
                    ))}
                    </div>
                )}
            </div>
        </div>
        {openModal && 
        <Dialog open={openModal} onClose={handleopenModal}><Modal onClose={handleopenModal} btnText="Close" successMsg="You have successfully purchased an item! Feel free to keep shopping. Happy Shopping" /></Dialog>
        }

    </div>
  )
}
