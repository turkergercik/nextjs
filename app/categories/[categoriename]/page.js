import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { headers } from 'next/headers';
import fs from 'fs/promises';
import path from 'path';
import { NextRequest } from 'next/server';
import categories from '@/data/categories';

async function getData() {
  const headersList = headers();
  const hg = headersList.get('host');
  const filePath = await fetch(`http://${hg}/api`, { cache: 'no-store' });
  const res = await filePath.json();
  return JSON.parse(res);
}

const Page = async ({ params, searchParams }) => {
  const t = await getData();
  const qw = t;
  const category = qw.filter((item) => item.slug === params.categoriename)[0];
  const products = category;

  return (
<div className="h-screen flex w-full pt-20 ">
  <div className="bg-white text-gray-800 h-full w-full flex flex-col items-center p-2 overflow-y-auto">
    <span className="p-2 text-2xl font-bold flex text-orange-900">{products.name}</span>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 pt-2 w-full ">
      {products.products.map((product, index) => (
        <Link
          key={index}
          href={`/categories/${products.slug}/${product.id}`}
          className="bg-orange-100 flex border-2 border-orange-300 h-full w-full flex-col justify-between items-center rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
        >
          <div className="relative h-32 sm:h-36 md:h-40 lg:h-44 xl:h-48 w-full rounded-md overflow-hidden">
            <Image
              className="rounded-md w-full h-full"
              src={product.imageUrl}
              alt={product.name}
              layout="fill"
              objectFit="cover"
              priority
            />
            <div className="absolute inset-0 bg-black opacity-10 transition-opacity duration-300 ease-in-out "></div>
          </div>
          <span className="text-sm font-bold py-2 flex flex-row text-center items-center justify-around w-full text-orange-900">{product.name}
          <span className='text-nowrap text-xs'>{product.price} ₺</span>
          </span>
          
        </Link>
      ))}
    </div>
  </div>
</div>





  );
};

export default Page;
