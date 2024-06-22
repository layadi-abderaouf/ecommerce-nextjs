import { NextResponse } from "next/server";
import multiparty from "multiparty";
import { IncomingForm } from "formidable";
import { writeFile } from 'fs/promises'
import { isAdmin } from "../../auth/[...nextauth]/route";
var fs = require('fs');

export async function POST(request){
  //await isAdmin()
  const {img} = await request.json();
  try {
    fs.unlinkSync('public/product/'+img);
    return NextResponse.json({ success: true})
  } catch (error) {
    return NextResponse.json({ success: false})
  }

  return NextResponse.json({ success: true,path :  name})
}

