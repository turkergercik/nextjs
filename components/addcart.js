"use client"
import React,{useEffect,useState} from 'react'
import { useAppContext } from '@/context/context'
import { IoAddCircleOutline } from "react-icons/io5";
import { IoRemoveCircleOutline } from "react-icons/io5";
const Addcart = ({category,id,product}) => {
    
    const {setcart,cart}=useAppContext()
    const [incart,setincart]=useState(false)
    const [total,settotal]=useState(0)
    const additem=()=>{
     const filtered = cart.filter((item)=>item.id===product.id)[0]
     /* if(filtered){
      if(filtered.quantity){
        product.quantity +=1
        
      }else{
        product.quantity=2
     
      }
     } */
        let newproduct={
            category:category,
            ...product
        }
        setcart(e=>{
        const newcart=[...e,newproduct]
        localStorage.setItem("cart",JSON.stringify(newcart))
         return newcart
        })

    }
    const removeItem=()=>{
      const filtered = cart.findIndex((cartitem,index)=>cartitem.id===id)
      //console.log(filtered)
      const mycart=[...cart]
      mycart.splice(filtered,1)
      localStorage.setItem("cart",JSON.stringify(mycart))

      setcart(mycart)
    
         
     }
    useEffect(()=>{
      const filtered = cart.filter((item)=>item.id===id)
      settotal(filtered.length)

    },[cart])
    
  return (
    <>
    
    {
      total!==0 && <IoRemoveCircleOutline className=' p-1 my-1 w-12 h-12 text-orange-800 hover:text-red-500' onClick={() => {
        //console.log("1")
        removeItem()
      } }>çıkar</IoRemoveCircleOutline>
    }
    {
      total!==0 && <span className=' w-12 h-8 bg-orange-200 text-lg   flex justify-center text-orange-800 rounded-full items-center  '>

 
      <span className=''>
      {total}
      </span>
      </span>
    }
    <IoAddCircleOutline className=' p-1 my-1 h-12 w-12 text-orange-800 hover:text-green-500' onClick={() => {
      //console.log("1")
      additem()
    } }>ekle</IoAddCircleOutline>
    
    </>
  )
}

export default Addcart