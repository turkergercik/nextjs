"use client"

import Header from '@/components/adminheader';
import React,{useEffect,useState,useRef} from 'react';
import Image from 'next/image';
import { useAppContext } from '@/context/context';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; 
const Page = () => {
  const router =useRouter()
  const {category,setcategory,setallCategories}=useAppContext()
  const [price,setprice]=useState([])
  const [stock,setstock]=useState([])
  const [selected,setselected]=useState([])
  const [allp,setallp]=useState([])
  const [categories, setcategories] = useState([])

    useEffect(() => {
      
      fetch(`/api`).then((e)=>{
        e.json().then((a)=>{
          
        setcategories(JSON.parse(a))
        })
      
        })
     
    }, [])
  
  function update(){
  let cat1=[...categories]
   const index= cat1.findIndex((item)=>item.slug===category)
   cat1[index].products=allp
   setselected(JSON.parse(JSON.stringify([cat1[index]])))
   fetch(`/api?id=${index}`,{
    method: "POST", // *GET, POST, PUT, DELETE, etc.
  
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
 
    body: JSON.stringify([cat1[index]]), // body data type must match "Content-Type" header
  }).then(async(e)=>{
    const res = await e.json()
    if(res){
      setallCategories(JSON.parse(res))
      router.refresh()
    }
    //setproduct(newproduct)
    
  })
   
  }
  useEffect(()=>{
    if(category!=null && categories.length!==0){
     let cat1 =[...categories]
     const filter = cat1.filter((item)=>item.slug===category)
     setselected(filter)
     setallp(JSON.parse(JSON.stringify(filter[0].products)))
     
    }

  //allcat()


  },[category,categories])
  const handleInputChange = (e,s) => {
    let newValue = e.target.value.replace(/^0/,"");
//console.log(newValue)
    // Handle dot at the beginning
    if (newValue.length === 1 && newValue === '0') {
      s(''); // Reset to empty string
      return; // Exit early
    }

    s(newValue); // Update input value
  };

  return (

<div className='flex flex-1 h-screen bg-gray-800 flex-col w-full pt-20 pr-1'>
  <Header categories={categories} setcategory={setcategory} category={category} />
  {selected.map((categoryItem, categoryIndex) => (
    <div key={categoryIndex} className='overflow-y-auto '>
    <div className='fixed left-1/2 transform -translate-x-1/2 bg-gray-800 top-20 w-full items-center h-10 flex z-10 p-1  '>
    <div className='flex flex-row w-full items-center justify-between'>
     <span className='flex text-white font-medium text-xl '>{categoryItem.name}</span>
    <button onClick={()=>{
       update()
    }} className=' bg-gray-900 rounded-lg p-1 px-2 text-white'>Apply changes</button>
    </div>
    </div>
      
    <div key={categoryIndex} className='flex flex-col flex-1 bg-gray-900 pt-12'>
      <div className='grid h-full grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 justify-center items-center m-1 gap-2'>
        {categoryItem.products.map((product, productIndex) => (
          <div key={productIndex} className='flex flex-col flex-1 bg-gray-800 border-2 border-gray-700 rounded-lg transition-transform hover:scale-105'>
            <Link href={`/dashboard/${product.id}?category=${categoryItem.slug}`}>
            <div className='aspect-w-1 bg-gray-900 rounded-lg aspect-h-1'>
              <Image className='object-cover h-full w-full rounded-t-md' alt={product.name} src={product.imageUrl} width={500} height={500} priority/>
            </div>
            <span className='flex flex-1 justify-center text-nowrap text-white bg-gray-900 rounded-b-lg'>{product.name}</span>
              </Link>
            <div className='flex relative flex-1 flex-row w-full p-1'>
              <div className='flex flex-1 justify-center items-center text-white'>{`${product.price} ₺`}</div>
              
              <input type='number' className='flex rounded-lg outline-none focus:border-gray-200 flex-1 border-2 border-gray-950 w-full p-1 bg-gray-800 text-white' placeholder='Price' value={allp[productIndex].price}
              onKeyDown={(e)=>{
                if(allp[productIndex].price){
                 

                }else{
                  if((e.key==="0" || e.key==="," || e.key===".")){
                    e.preventDefault()
                 }
 
                }
                
              }}
              onChange={(e)=>{
                  let newprice =  e.target.value.replace(/[^0-9]/g, '').replace(/^0+/, '')
                  let bok = newprice
                   if(newprice){
                    let price = [...allp]
                    price[productIndex].price=newprice
                    //console.log(selected[0].products[productIndex].price)
           setallp(price)
                   }else{
                    let price = [...allp]
                    price[productIndex].price=null
                    //console.log(selected[0].products[productIndex].price)
           setallp(price)

                   }
                }} />
            </div>
            <div className='flex flex-1 flex-row w-full p-1'>
              <div className='flex flex-1 justify-center items-center text-white'>{product.stock} pcs</div>
              <input type='number' className='flex flex-1 border-2 rounded-lg focus:border-gray-200 outline-none border-gray-950 w-full p-1 bg-gray-800 text-white' value={allp[productIndex].stock}
              onKeyDown={(e)=>{
                if(allp[productIndex].stock){
                  if((e.key==="," || e.key===".")){
                    e.preventDefault()
                 }

                }else{
                  if((e.key==="0" || e.key==="," || e.key===".")){
                    e.preventDefault()
                 }
 
                }
                
              }}
              onChange={(e)=>{
 let newprice =  e.target.value.replace(/[^0-9]/g, '').replace(/^0+/, '')
 let bok = newprice
  if(newprice){
   let price = [...allp]
   price[productIndex].stock=newprice
   //console.log(selected[0].products[productIndex].stock)
setallp(price)
  }else{
   let price = [...allp]
   price[productIndex].stock=null
   //console.log(selected[0].products[productIndex].price)
setallp(price)

  }

              }} placeholder='Quantity' />

            </div>
            
          </div>
        ))}
      </div>
    </div>
    </div> ))}
</div>



  )
}

export default Page