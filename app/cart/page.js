"use client"
import React, { useEffect,useState,useRef } from 'react'
import { useAppContext } from '@/context/context'
import Image from 'next/image'
import { IoAddCircleOutline } from "react-icons/io5";
import { IoRemoveCircleOutline } from "react-icons/io5";
const Cart = () => {
  const {cart,setcart,allcategories,setallCategories} = useAppContext()
  const [total,settotal] =useState(0)
  const [filteredcart,setfilteredcart] =useState([])
  const tot = useRef(0)
  const calculate=()=>{
    tot.current=0
    if(cart.length===0){
     
      settotal(0)
    }else{
      cart.map((item,index)=>{
        tot.current = tot.current+parseFloat(item.price)
        
       
        console.log(tot.current)
          settotal(tot.current)
          
      })
    }

    
  }
  const filternew = ()=>{
    
 

    let filtered1 = [];

    cart.map((mainitem) => {
      const index = filtered1.findIndex((item) => item.id === mainitem.id);
    
      if (index === -1) {
        // Item not found, add it to the filtered1 array
        filtered1.push({ ...mainitem, quantity: 1 });
      } else {
        // Item found, increment the quantity
        filtered1[index].quantity += 1;
      }
    });
    
    console.log(filtered1);
    

    setfilteredcart(filtered1)
   
   /* const filtered= cart.filter((item,index)=> cart.indexOf(item)===index)
   setfilteredcart(filtered) */

  }
  const [jsonObject, setJsonObject] = useState(null);
function updatecart(){
  let mycart=[]
  fetch(`/api`).then((e)=>{
    e.json().then((a)=>{
      const res= JSON.parse(a)
      const cart1= localStorage.getItem("cart")
  if(cart1.length!==0 && res.length!==0){
    const allp=JSON.parse(cart1)
    allp.map((items,index)=>{
      const filter= res.filter((item)=>item.slug===items.category)[0]
      const pt = filter.products.filter((item)=>parseInt(item.id)===parseInt(items.id))[0]
      const newp = {category:items.category,...pt}
      mycart.push(newp)

    })
    setcart(mycart)
    localStorage.setItem("cart",JSON.stringify(mycart))
  
  
  }
      
  setallCategories(res)
    })
  
    })
  

}
 
   useEffect(()=>{
    updatecart()
   },[])
  useEffect(()=>{
   
   calculate()
   filternew()
   

  },[cart])

  return (
    <div className="flex flex-1 flex-col h-screen items-center gap-2 py-1 pb-20 pt-20 bg-white">
      <div className="flex w-full h-full flex-col gap-2 overflow-y-auto  p-1 items-center">
        {filteredcart.map((item, index) => (
          <div key={index} className="flex w-full md:w-4/5 h-24  bg-orange-100 border-2 border-orange-300 items-center justify-between rounded-xl hover:shadow-lg">
            <div className="relative h-24 min-w-24">
              <Image className="rounded-xl p-1 py-[0.3rem]" src={item.imageUrl} sizes="100vw" style={{ objectFit: 'cover' }} fill alt={item.name} />
            </div>
            <span className="font-bold h-full w-full overflow-hidden flex justify-center items-center text-center break-all text-orange-800">{item.name}</span>
            <span className="p-2 w-1/4 flex justify-center items-center text-nowrap text-orange-800">{`${item.price} ₺`}</span>
            <div className="h-full justify-between flex border-black items-center">
              <IoRemoveCircleOutline className="w-10 h-10 text-orange-800 cursor-pointer hover:text-red-500"
              onClick={()=>{
         
          
         const filtered= filteredcart.findIndex((cartitem,index)=>cartitem.id===item.id)
         const filtercart = cart.findLastIndex((cartitem,index)=>cartitem.id===item.id)
         let ar=[]
         const mycart=JSON.parse(JSON.stringify(cart))
         console.log(mycart)
         const myfilteredcart=JSON.parse(JSON.stringify(filteredcart))
         if(myfilteredcart[filtered]){
          const myitem = myfilteredcart[filtered]
          if(myitem.quantity){
            if(myitem.quantity!==1){
              myitem.quantity-=1
              
            }else{
              //myfilteredcart.splice(filtered,1)
            }
            
           }else{
            //myfilteredcart.splice(filtered,1)
           }
         }
         mycart.splice(filtercart,1)
         setcart(mycart)
         console.log(mycart)
         //setfilteredcart(mycart)
         localStorage.setItem("cart",JSON.stringify(mycart))
          /* if(cartitem.id === item.id){
            if(cartitem.quantity){
              if(cartitem.quantity!==1){
                cartitem.quantity-=1
                return {...cartitem} 
              }else{
                return null
              }
              
             }else{
               return null
             }
          } */
          //const filtered1= filtered.filter((obj)=>obj!==null)
          console.log(filtered)
          //setfilteredcart(filtered1)
        
         //setcart(filtered)
              
         }}

 />
              <span className="p-2 max-w-10 min-w-10 flex justify-center items-center text-orange-800">{item.quantity}</span>
              <IoAddCircleOutline className="w-10 h-10 text-orange-800 cursor-pointer hover:text-green-500" 
              onClick={()=>{
          const index = cart.findIndex((cartitem,index)=> cartitem.id===item.id)
          const filtereditem = cart.find((cartitem)=>cartitem.id===item.id)
          /* let arry= [...cart]
          arry.splice(index,0,filtereditem) */
          setcart((e)=>{
            let newcart=[...e,filtereditem]
            localStorage.setItem("cart",JSON.stringify(newcart))
            return newcart
            
          
          })
         /* const filtered= cart.filter((cartitem,index)=>cartitem.id!==item.id)
         setcart(filtered) */
              
         }} />
            </div>
          </div>
        ))}
        <div className="flex fixed bottom-0 right-0 left-0 w-full bg-orange-600 h-20 justify-center items-center">
          <span className="text-white text-xl">{`Total ${total.toFixed(2)} ₺`}</span>
        </div>
      </div>
    </div>
  )
}

export default Cart