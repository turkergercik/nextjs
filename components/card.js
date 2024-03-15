import React from 'react'
import Image from 'next/image'
const Card = ({selected,categoryItem}) => {
  return (
    <>
    {selected.map((categoryItem, categoryIndex,price,setprice) => (
        <>
        <div className='fixed left-1/2 transform -translate-x-1/2 bg-green-800 top-20 w-full  text-center z-10 p-1 '>
        <div className='flex flex-row justify-between'>
         <span>{categoryItem.name}</span>
        <button onClick={()=>{
           update()
        }} className=' bg-blue-500 border-2 '>onayla</button>
        </div>
        </div>
          
        <div key={categoryIndex} className='flex flex-col flex-1 bg-red-500 pt-10'>
          <div className='grid h-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 justify-center items-center m-1 gap-2'>
            {categoryItem.products.map((product, productIndex) => (
              <div key={productIndex} className='flex flex-col flex-1'>
                <div className='aspect-w-1 aspect-h-1'>
                  <Image className='object-contain h-full w-full' alt={product.name} src={product.imageUrl} width={500} height={500}/>
                </div>
                <span className='flex flex-1'>{product.name}</span>
                <div className='flex flex-1 flex-row w-full p-1'>
                  <div className='flex flex-1'>{product.price}</div>
                  {price}
                  <input className='flex flex-1 border-2 border-blue-500 w-full p-1' placeholder='Price'  onChange={(e)=>setprice(e.target.value)} />
                </div>
                <div className='flex flex-1 flex-row w-full p-1'>
                  <div className='flex flex-1'>{product.stock}</div>
                  <input className='flex flex-1 border-2 border-blue-500 w-full p-1' placeholder='Quantity' />
                </div>
              </div>
            ))}
          </div>
        </div>
        </> ))}
        </>
  )
}

export default Card