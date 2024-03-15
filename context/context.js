// contexts/AppContext.js
"use client"
import { createContext, useState, useContext,useEffect } from 'react';
import categories  from '@/data/categories';
const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [allcategories, setallCategories] = useState([]);
  const [category,setcategory]=useState(null)
  const [categories, setcategories] = useState([])
  const [cart, setcart] = useState([]);
  useEffect(()=>{
    fetch(`/api`,{
      next:{revalidate:5},
      method: "GET", // *GET, POST, PUT, DELETE, etc.
    
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
        
      },
    }).then((e)=>{
      e.json().then((a)=>{
       setallCategories(JSON.parse(a))
       setcategory(JSON.parse(a)[0].slug)
      })
    })
    //localStorage.clear()
    const cart= localStorage.getItem("cart")
    if(cart){
      setcart(JSON.parse(cart))
    }else{
      localStorage.setItem("cart",JSON.stringify([]))
    }

  },[])
  // You can add more state variables and functions here

  const values = {
    allcategories,
    setallCategories,
    cart, setcart,
    category,
    setcategory,
    categories,
    setcategories
    // Add more values based on your needs
  };

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
