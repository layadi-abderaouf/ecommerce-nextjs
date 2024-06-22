import { NextResponse } from "next/server";
import multiparty from "multiparty";
import { IncomingForm } from "formidable";
import { writeFile } from 'fs/promises'
import {isAdmin} from '../auth/[...nextauth]/route'

export async function POST(request){
  //await isAdmin()
  const data = await request.formData()
  const file = data.get('file') 
  
  if (!file) {
    return NextResponse.json({ success: false })
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
  const name = Date.now() +"-" + Math.random().toString(16).slice(2)+ file.name
  // With the file data in the buffer, you can do whatever you want with it.
  // For this, we'll just write it to the filesystem in a new location
  const path = `public/product/${name}`
  await writeFile(path, buffer)
  console.log(`open ${path} to see the uploaded file`)

  return NextResponse.json({ success: true,path :  name})
}

export const config = {
    api : {bodyParser : false}
}