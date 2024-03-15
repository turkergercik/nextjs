"use client"
import React,{useState,useEffect, useRef} from 'react'
import Header from '@/components/adminheader'
import { useAppContext } from '@/context/context'
import { usePathname,useSearchParams ,useRouter} from 'next/navigation'
import Image from 'next/image'
import { revalidatePath } from 'next/cache'
const Page = ({params}) => {
  const router= useRouter()
    const [product,setproduct]=useState(null)
    const [name,setname]=useState("")
    const [price,setprice]=useState("")
    const [quantity,setquantity]=useState("")
    const [imageurl,setimageurl]=useState("")
    const [image,setimage]=useState(false)
    const categoryid= useRef(null)
    const productid = useRef(null)
    const [description,setdescription]=useState("")
    const {category,setcategory,setallCategories,allcategories}=useAppContext()
    const path=useSearchParams()
    useEffect(()=>{
      if(allcategories.length!==0){
        const categoryName = path.get("category");
        setcategory(categoryName)
      const id= allcategories.filter((item)=>item.slug===categoryName)[0]
      categoryid.current=id.id
      const pt= id.products.filter((item)=>item.id===parseInt(params.productid))[0]
      productid.current=pt.id
      console.log(categoryid.current,productid.current)
     setproduct(pt)
     setname(pt.name)
     setprice(pt.price)
     setimageurl(pt.imageUrl)
     setdescription(pt.description)
     setquantity(pt.stock)

    }

    },[allcategories])
    function applyChanges(){
      const newproduct= {...product}
      newproduct.name=name
      newproduct.price=price
      newproduct.imageUrl=imageurl
      newproduct.stock=quantity
      newproduct.description=description
      console.log(category,categoryid.current,productid.current)

      fetch(`/api/${category}?categoryid=${categoryid.current}&productid=${productid.current}`,{
        method: "POST", // *GET, POST, PUT, DELETE, etc.
      
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
     
        body: JSON.stringify(newproduct), // body data type must match "Content-Type" header
      }).then(async(e)=>{
        const res = await e.json()
        if(res){
          setallCategories(JSON.parse(res))
          router.refresh()
        }
        //setproduct(newproduct)
        
      })

    }

    const handleInputChange = (e,s) => {
      let newValue = e.target.value.replace(/[^0-9]/g, '').replace(/^0+/, '')
  console.log(newValue)
      // Handle dot at the beginning
      if (newValue.length === 1 && newValue === '0') {
        s(''); // Reset to empty string
        return; // Exit early
      }
  
      s(newValue); // Update input value
    };
  return (
    <div className='flex flex-col  h-screen bg-gray-900 pt-20 overflow-y-auto shadow-lg'>
    <Header categories={allcategories} category={category} setcategory={setcategory}>
    </Header>
    <button className='whitespace-nowrap bg-gray-800 p-2 fixed w-full z-10  text-white'>
      <span className='bg-gray-900 p-1.5 px-2 rounded-lg'>
      Apply Changes

      </span>
    </button>
    <div className='flex flex-col p-1 sm:flex-row bg-gray-900 sm:h-full w-full items-center justify-center text-center pt-10'>
      <div className='h-full  px-1 gap-2 items-center w-full flex flex-col justify-between text-3xl'>
        <span className=' border-0 text-white my-1 p-1 rounded-lg text-nowrap w-full'>
          {product?.name}
        </span>
        <div className='relative max-w-md sm:max-w-sm h-full sm:w-max   w-full aspect-[10/7]'>
          {product &&
            <Image className='rounded-lg' src={imageurl}
              style={{ objectFit: "cover" }}
              fill
              alt={""}
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          }
        </div>
        <div className="flex items-center justify-center w-full ">
          <input
            className="focus:border-white outline-none bg-gray-900 text-white border-gray-950 border-2 rounded-lg p-1 w-full text-center text-lg"
            type="text"
            placeholder="Enter new name"
            value={name}
            onChange={(e) => setname(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-center w-full pb-1">
          <input
            className="outline-none border-2  focus:border-white  bg-gray-900 text-white border-gray-950 rounded-lg p-1 w-full text-center text-lg"
            type="text"
            placeholder="Enter new image url"
            value={imageurl}
            onChange={(e) => {
              const img = e.target.value.replace(/^https:\/\/(?:www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\/[^\s]*)?$/, "")
              if (img) {
                setimage(true)
                setimageurl(img)
              } else {
                setimageurl(null)
              }
            }}
          />
        </div>
      </div>
      <div className='flex flex-col w-full px-1 h-full gap-2'>
        <span className='h-full w-full flex justify-center items-center text-center text-white'>
          <p className="w-full">
            {product?.description}
          </p>
        </span>
        <textarea placeholder='New description' className='h-full border-2 focus:border-white rounded-lg border-gray-800 outline-none w-full p-2' value={description} onChange={(e) => setdescription(e.target.value)} />
        <div className='flex justify-center items-center '>
          <span className='w-full text-white'>
            {`${product?.price} ₺`}
          </span>
          <div className="flex items-center justify-center w-full">
            <input
              className="border-2 focus:border-white outline-none bg-gray-900 text-white border-gray-950 rounded-lg p-1 w-full text-center text-lg"
              type="number"
              placeholder="Enter new price"
              value={price}
              onKeyDown={(e) => {
                if (price.length === 0 && (e.key === "0" || e.key === "," || e.key === ".")) {
                  e.preventDefault()
                }
                if (e.key === ",") {
                  e.preventDefault()
                }
              }}
              onChange={(e) => handleInputChange(e, setprice)}
            />
          </div>
        </div>
        <div className='flex justify-center items-center pb-1'>
          <span className='w-full text-white'>
            {product?.stock} pcs
          </span>
          <div className="flex items-center justify-center w-full">
            <input
              className=" focus:border-white outline-none bg-gray-900 text-white border-gray-950 border-2  rounded-lg p-1 w-full text-center text-lg"
              type="number"
              placeholder="Enter new stock"
              value={quantity}
              onKeyDown={(e) => {
                if ((e.key === "," || e.key === ".")) {
                  e.preventDefault()
                }
              }}
              onChange={(e) => {
                handleInputChange(e, setquantity)
              }}
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  

  )
}

export default Page
