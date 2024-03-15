// components/Header.js
"use client"
import Link from 'next/link';
import { Cart } from './cart';
import { usePathname,useRouter,useSearchParams } from 'next/navigation'

const Header = ({ categories,category,setcategory }) => {
    const path=usePathname()
    let showheader=true
    
  
    
 if(showheader){

 
  return (
    <header className='flex fixed top-0 w-full right-0 left-0 z-10 items-center bg-gray-900 border-b-2 border-gray-950 h-20 '>
    <nav className='flex justify-between  w-full font-medium text-md h-full items-center '>
      <span className='flex px-1'>
        <Link href="/">
          <span className='text-white cursor-pointer hover:text-gray-300'>turkergercik</span>
        </Link>
      </span>
     <div className='flex   h-full overflow-x-auto'>
      <ul className='flex h-full items-center justify-center'>
        {categories.map(categorye => (
          <div key={categorye.id} className='whitespace-nowrap text-xl w-full  transform hover:scale-105 transition-transform duration-300 ease-in-out'>
            <Link href="/dashboard">
              <span
                onClick={() => { setcategory(categorye.slug) }}
                className={category === categorye.slug ? "border-2 p-2 rounded-lg text-white cursor-pointer hover:bg-gray-700 " : "p-2 text-white cursor-pointer hover:bg-gray-700 rounded-lg"}>
                {categorye.name}
              </span>
            </Link>
          </div>
        ))}
      </ul>
      </div>
      <div className=''>

      </div>
    </nav>
  </header>
  




  );
}
};

export default Header;
