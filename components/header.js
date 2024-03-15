// components/Header.js
"use client"
import Link from 'next/link';
import { Cart } from './cart';
import { useEffect,useState } from 'react';
import { IoCartOutline } from "react-icons/io5";
import { useRouter,usePathname } from 'next/navigation';
import { useAppContext } from '@/context/context';
const Header =({params,statusCode}) => {
  const {allcategories, setcategories} = useAppContext()

  
    /* useEffect(() => {
      
      fetch(`/api`).then((e)=>{
        e.json().then((a)=>{
          
        setcategories(JSON.parse(a))
        })
      
        })
     
    }, []) */
    
    
   
    const path=usePathname()
    let showheader=true
    
    if(path.includes("dashboard")){
      
      showheader=false
    }
    
 if(showheader){

 
  return (
    <header className="flex fixed top-0 text-white text-md font-medium  border-gray-950 right-0 left-0 z-10 items-center bg-orange-600 h-20">
    <nav className="flex w-full h-full justify-between items-center px-2">
      <span className="flex ">
        <Link href="/" className="flex items-center transform hover:scale-105 transition-transform duration-300 ease-in-out ">
          <span>turkergercik</span>
        </Link>
      </span>
  
      <ul className="flex overflow-x-auto h-full items-center px-2">
        {allcategories.map((category) => (
          <li key={category.id} className="whitespace-nowrap text-xl transform hover:scale-105 transition-transform duration-300 ease-in-out  ">
            <Link href={`/categories/${category.slug}`} className={path.includes(category.slug) ? "rounded-lg p-2 border-2 border-white hover:bg-orange-800" : "p-2 rounded-lg hover:bg-orange-800"}>
              {category.name}
            </Link>
          </li>
        ))}
        <li className="whitespace-nowrap px-4">
          <Link href="/dashboard" className="hover:scale-105">
            Dashboard
          </Link>
        </li>
      </ul>
  
      <span className="flex  justify-center ">
        <Link href="/cart" className="transform   hover:scale-105 transition-transform duration-300 ease-in-out ">
          <Cart />
        </Link>
      </span>
    </nav>
  </header>
  

  );
}
};

export default Header;
