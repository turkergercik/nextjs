"use client"
import React,{useEffect,useState} from 'react'
import Link from 'next/link';
import Image from 'next/image';
export const Scroll = ({children,products}) => {
    const [allproducts, setallproducts] = useState(products.products);
    const [loading, setloading] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            const d = document.getElementById("4")
         
            
             

                let scrollY = d.scrollHeight - d.scrollTop;
                let height = d.offsetHeight;
                let offset = height - scrollY;
                
                offset = Math.abs(offset)
                if (offset<1 && loading===false) {
                    setloading(true)
                    fetch(`/api`).then((e)=>{
                        e.json().then((a)=>{
                          const res= JSON.parse(a)
                          const filter = res.filter((item)=>item.slug===products.slug)[0]
                         
                            
                              setloading(false)
                              setallproducts((b)=>[...b,...filter.products])
                        
                          
                     })
                   })
                  }
        };

        document.getElementById("4").addEventListener('scroll', handleScroll);

        return () => {
            document.getElementById("4")?.removeEventListener('scroll', handleScroll);
        };
    }, []);
  return (
    <div className="h-screen flex w-full pt-20 ">
  <div id='4' className={`bg-white text-gray-800 h-full w-full flex flex-col items-center p-2  overflow-y-auto`}>
    <span className="p-2 text-2xl font-bold flex text-orange-900">{products.name}</span>
    <div className="grid relative grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 pt-2 w-full ">
      {allproducts.map((product, index) => (
        <Link
          key={index}
          href={`/categories/${products.slug}/${product.id}`}
          className="bg-orange-100 flex border-2 border-orange-300 h-full w-full flex-col justify-between items-center rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
        >
          <div className="relative h-32 sm:h-36 md:h-40 lg:h-44 xl:h-48 w-full rounded-md overflow-hidden">
            <Image
              className="rounded-md object-cover w-full h-full"
              src={product.imageUrl}
              alt={product.name}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              fill
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
    {
       loading && 
       <div className=' w-full flex pl-4 p-5 border-0 mt-2 justify-center items-center'>
        
       <svg className=" animate-spin -ml-1 mr-3 h-10 w-10 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    </div>

      }
  </div>

  

</div>
  )
}

