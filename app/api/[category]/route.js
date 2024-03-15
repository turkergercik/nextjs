import { NextResponse } from "next/server";
import fs from 'fs/promises';
import path from 'path';
import { revalidatePath } from "next/cache";
export async function POST(request) {
    const x= await request.json()
    //console.log(x,78)
    const {searchParams} = new URL(request.url);
    const categoryid = searchParams.get("categoryid");
    const productid = searchParams.get("productid");
    console.log(categoryid,productid)
    const filePath = path.join(process.cwd(), '', 'data2/data.json');
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const file = JSON.parse(fileContent)
    let categoryIndex=null
    let productIndex=null
    const category = file.filter((item,index)=>{
        if(item.id===parseInt(categoryid)){
             categoryIndex=index
             return item
        }
        
    })[0]
    const product =category.products.filter((item,index)=>{
        if(item.id===parseInt(productid)){
            productIndex=index
            return item
        }
       
    
    })

    file[categoryIndex].products[productIndex]=x
 console.log(categoryIndex,productIndex)
  // Convert the object back to JSON string
  const updatedFileContent = JSON.stringify(file, null, 2);

  // Write the updated content back to the file
  await fs.writeFile(filePath, updatedFileContent, 'utf-8');
  revalidatePath("http://localhost:3000/dashboard")
  return NextResponse.json( updatedFileContent , { status: 200 });
}