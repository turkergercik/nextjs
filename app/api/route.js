import { NextResponse } from "next/server";
import fs from 'fs/promises';
import path from 'path';
// To handle a GET request to /api
export async function GET(request) {
    const filePath = path.join(process.cwd(), '', 'data2/data.json');
    const fileContent = await fs.readFile(filePath, 'utf-8')
  
  return NextResponse.json(fileContent, { status: 200 });
}

// To handle a POST request to /api
export async function POST(request) {
    const x= await request.json()
    const {searchParams} = new URL(request.url);
    const param = searchParams.get("id");
    const filePath = path.join(process.cwd(), '', 'data2/data.json');
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const file = JSON.parse(fileContent)
    file[param]=x[0]

  // Convert the object back to JSON string
  const updatedFileContent = JSON.stringify(file, null, 2);

  // Write the updated content back to the file
  await fs.writeFile(filePath, updatedFileContent, 'utf-8');
  return NextResponse.json(updatedFileContent, { status: 200 });
}
