"use client"
import React from 'react'
import { useAppContext } from '@/context/context'
import { IoCartOutline } from "react-icons/io5";
export const Cart = () => {
    const {cart} = useAppContext()


  return (



  
  
       <div className='relative  items-center justify-center flex h-9 w-9'>
        <IoCartOutline style={{}} className='w-full h-full'></IoCartOutline>
        <span className='absolute  px-1 right-0 text-[0.8rem] text-orange-800 top-0 bg-white   rounded-lg'>
        {cart.length}

        </span>
        </div>
   
   
  )
}
