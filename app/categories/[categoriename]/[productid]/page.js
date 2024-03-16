import { usePathname } from "next/navigation";
import React from 'react';
import Image from "next/image";
import Addcart from "@/components/addcart";
import fs from 'fs/promises';
import path from 'path';
import { headers } from 'next/headers';

async function getData() {
  const headersList = headers();  
  const hg= headersList.get('host');
  const filePath = await fetch(`http://${hg}/api`,{cache:"no-store"}) 
  const res = await filePath.json();
  return JSON.parse(res);
}

const Product = async ({ params }) => {
  const categories = await getData();
  const filteredproducts = categories.filter((item) => item.slug === params.categoriename)[0];
  const product = filteredproducts.products.filter((item) => item.id === parseInt(params.productid))[0];

  return (
    <div className="flex relative flex-col bg-white sm:flex-row h-screen pt-20 ">
      <div className="flex-1 flex-col md:flex-row  relative h-full flex  items-center ">
        <div className="flex w-full items-center flex-col sm:flex-row justify-evenly h-full border-0 gap-5 px-5 ">
        <span className=" flex sm:absolute  top-2 justify-center  text-orange-800  border-0 border-orange-800 rounded-lg text-3xl items-center font-medium  w-full  p-1  ">
          {product.name}
        </span>
        <div className="relative sm:flex-1 max-w-md sm:max-w-full w-full aspect-[10/7]  sm:mt-9 rounded-md overflow-hidden hover:shadow-xl transition duration-300 ease-in-out">
       
          <Image
            className="object-cover border-2 border-orange-200 rounded-2xl"
            src={product.imageUrl}
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            fill
            alt={product.name}
          />
        </div>
        
        
        <div className="sm:flex-1 border-0 border-black sm:py-14 w-full sm:h-full flex flex-col justify-between items-center">
        <p className="text-center text-xl items-end text-orange-800">{product.description}</p>
        <div className="sm:flex-row flex-col w-full flex justify-between items-center gap-0">
          <span className="flex w-full text-nowrap justify-center text-orange-800  text-lg items-center px-3 sm:py-1 py-4 rounded-lg">{`${product.price} ₺`}</span>
          <div className="flex flex-row justify-center items-center w-full">
            <Addcart category={filteredproducts.slug} id={product.id} product={product}>
              Sepete Ekle
            </Addcart>
          </div>
          <div className="flex w-full"></div>
        </div>
      </div>
        </div>
        
      </div>
    
    </div>
  );
};

export default Product;
