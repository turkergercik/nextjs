// components/Slider.js
"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import Image from 'next/image';
import 'swiper/swiper-bundle.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useAppContext } from '@/context/context';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export const Myswiper = () => {
  const router = useRouter();
  const { allcategories } = useAppContext();

  return (
    <Swiper
      className='bg-orange-50 '
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
      spaceBetween={10}
      autoplay={{delay:3000}}
      slidesPerView={1}
      
    >
      {allcategories.map((c, i) => (
        <SwiperSlide key={i}>
          <div id='a4' className="bg-orange-50 text-orange-800 h-full w-full flex flex-col items-center p-2 overflow-y-auto  border-0 border-red-500">
            <span className="p-2 text-2xl font-bold">{c.name}</span>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6  gap-2  pt-2 w-full">
              {c.products.map((product, index) => (
                <div
                  key={index}
                  onClick={() => {
                    router.push(`/categories/${c.slug}/${product.id}`);
                  }}
                  className="bg-orange-200  flex border-2 border-orange-500 h-full w-full flex-col justify-between items-center rounded-lg transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg cursor-pointer"
                >
                  <div className="relative h-32 sm:h-36 md:h-40 lg:h-44 xl:h-48 w-full rounded-lg">
                    <Image
                      className="rounded-md w-full h-full object-cover"
                      src={product.imageUrl}
                      alt={product.name}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      fill
                      priority
                    />
                    <div className="absolute inset-0  bg-black opacity-10 rounded-md"></div>
                  </div>
                  <span className="text-sm font-bold text-center px-1 flex flex-row justify-around w-full items-center py-2">
                    {product.name}
                    <span className='text-nowrap text-xs px-2'>
                      {product.price} ₺
                    </span>
                    </span>
                    
                </div>
              ))}
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};


