'use client'
import React, { useState, useRef, useContext } from 'react'
import "react-datepicker/dist/react-datepicker.css";

import { useReadContract, useBalance, useAccount, useWriteContract } from 'wagmi'
// import useIntegrate from '../hooks/useIntegrate';
import useWagmi from '../hooks/useWagmi';
import { useRouter } from 'next/navigation';
import { GlobalStateContext } from '../context/GlobalStateContext';
import useStorage from "../hooks/useStorage"
import { Web3ReactProvider } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'

export default function Createitem() {
  const router = useRouter();
  // const { account, hash, setHash } = useContext(GlobalStateContext);

  const { address } = useAccount();
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState({
    itemName: '',
    itemImage: '',
    description: '',
    userName: '',
    email: '',
    phone: '',
    location: '',
    listingType: '',
    price: '',
  });

  const fileInputRef = useRef(null);
  const { listItem, isPending } = useWagmi();
  const { uploadJson } = useStorage();

  function getLibrary(provider) {
    return new Web3Provider(provider)
  }

  const handleImageUpload = (item) => {
    const file = item.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result);
        setItem({...item, itemImage: e.target?.result});
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLocationChange = (e) => {
    const newLocation = e.target.value;
    setItem({...item, location: newLocation});
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true); 
    if (!address) {
      setLoading(false)
      alert("Please connect your wallet to submit the item.");
      return;
    }
    if (item.listingType === "for sale" && item.price) {
      await listItem(item.itemName, item.price, item.itemImage);
      setLoading(false)
      router.push("/allItems")
    } else {
      await listItem(item.itemName, 0, item.itemImage)
      setLoading(false)
      router.push("/allItems")
    }
    // const ipfshash = await uploadJson(item)
    // setHash([...hash, ipfshash])
    // console.log("here", item)
    // setLoading(false);
    // router.push("/allItems")
  };

  return (
    // <Web3ReactProvider getLibrary={getLibrary}>
    <div className='min-h-screen flex flex-col py-8 px-40 items-center justify-start'>
        <div className="relative inline-block mb-6">
              <p className='text-[36px] font-medium text-[#6df2db]'>Lets Spice Things Up</p>
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#6df2db] rounded-full">
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-1 h-1 bg-[#6df2db] rounded-full"></div>
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 w-1 h-1 bg-[#6df2db] rounded-full"></div>
              </div>
            </div>
      <div className='flex flex-col items-start justify-start border-[2px] border-[#6EF4E6] rounded-md py-8 px-4 w-full form-item text-left w-[60%]'>
        {selectedImage ? (
            <div className='relative w-full mb-4'>
            <img 
                src={selectedImage} 
                alt="Selected item Banner" 
                className='w-full h-[180px] object-cover'
            />
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
            />
            <button 
                className='mt-2 bg-[#6EF4E6] text-[#000] py-2 px-4 rounded'
                onClick={() => fileInputRef.current.click()}
            >
                Change Image
            </button>
            </div>
        ) : (
            <div className='flex flex-col items-center justify-center border-[1px] border-[#6EF4E6] rounded-md p-2 w-full form-item'>
            <div className='flex items-center justify-between gap-4 border-[2px] border-dashed border-[#E3E8EF] rounded-md p-2 w-full'>
                <p className='text-[#4B5565] text-[16px] font-normal'>Upload Item Image</p>
                <label htmlFor="browse" className="bg-[#6EF4E6] rounded py-2 px-8 text-[#000] text-[16px] font-normal cursor-pointer inline-block form-item">
                Browse Files
                <input type="file" name="browse" id="browse" className="hidden" accept="image/*" onChange={handleImageUpload} />
                </label>
            </div>
            </div>
        )}
        <div className='flex flex-col items-start justify-start w-full mt-4'>
          <label htmlFor="itemName" className='text-[#4B5565] text-[16px] font-normal mb-2'>Item Name/Type:</label>
          <input 
            type="text" 
            name="itemName" 
            id="itemName" 
            className='border-[1px] border-[#6EF4E6] rounded-md py-2 px-4 outline-none w-full bg-transparent'
            placeholder='E.g Maxi Skirt, Male Shirt'
            value={item.itemName}
            onChange={(e) => setItem({...item, itemName: e.target.value})}
          />
        </div>
        <div className='flex flex-col items-start justify-start w-full mt-4'>
          <label htmlFor="Description" className='text-[#4B5565] text-[16px] font-normal mb-2'>Description:</label>
        <textarea 
          name="description" 
          id="description" 
          className='border-[1px] border-[#6EF4E6] rounded-md py-2 px-4 outline-none w-full bg-transparent' 
          placeholder='Add Brief Description. State Any Faults Present in Item'
          value={item.description}
          onChange={(e) => setItem({...item, description: e.target.value})}
        ></textarea>
        </div>
        <div className='flex flex-col items-start justify-start w-full mt-4'>
          <label htmlFor="phone" className='text-[#4B5565] text-[16px] font-normal mb-2'>Phone Number:</label>
          <input 
            type="tel" 
            name="phone" 
            id="phone" 
            className='border-[1px] border-[#6EF4E6] rounded-md py-2 px-4 outline-none w-full bg-transparent'
            placeholder='Enter Your Phone Number'
            value={item.phone}
            onChange={(e) => setItem({...item, phone: e.target.value})}
          />
        </div>
        <div className='flex flex-col items-start justify-start w-full mt-4'>
            <label htmlFor="phone" className='text-[#4B5565] text-[16px] font-normal mb-2'>Location:</label>
            <div className='relative w-full'>
            <img src="/map-pin.svg" alt="location icon" className='absolute left-3 top-1/2 transform -translate-y-1/2' />
            <input
                type="text"
                name="location"
                id="location"
                className='border-[1px] border-[#6EF4E6] rounded-md py-2 pl-10 pr-4 outline-none w-full bg-transparent'
                placeholder='Enter your Location'
                value={item.location}
                onChange={handleLocationChange}
            />
            </div>
        </div>
        <div className='flex flex-col items-start justify-start w-full mt-4'>
          <label htmlFor="listingType" className='text-[#4B5565] text-[16px] font-normal mb-2'>Listing Type:</label>
          <select 
            name="listingType" 
            id="listingType" 
            className='border-[1px] border-[#6EF4E6] rounded-md py-2 px-4 outline-none w-full bg-transparent'
            value={item.listingType}
            onChange={(e) => setItem({...item, listingType: e.target.value})}
          >
            <option value="free">Free</option>
            <option value="for sale">For Sale</option>
          </select>
        </div>
        {item.listingType === "for sale" && (
          <div className='flex flex-col items-start justify-start w-full mt-4'>
            <label htmlFor="price" className='text-[#4B5565] text-[16px] font-normal mb-2'>Price:</label>
            <input 
              type="number" 
              name="price" 
              id="price" 
              className='border-[1px] border-[#6EF4E6] rounded-md py-2 px-4 outline-none w-full bg-transparent'
              placeholder='Enter Price'
              value={item.price}
              onChange={(e) => setItem({...item, price: e.target.value})}
            />
          </div>
        )}
        <div className='flex items-center justify-center w-full mt-6'>
            <button className='text-[#000] text-[16px] font-normal py-4 px-4 rounded-md w-full bg-[#6EF4E6]' onClick={(e) => handleSubmit(e)}>
              {!isPending ? (<span>Add Item</span>):
              <p>Loading...</p>}
            </button>

        </div>
      </div>
    </div>
  )
}
