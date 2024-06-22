"use client"
import Link from "next/link"
import { Flex, Spacer } from '@chakra-ui/react'
import { useContext,useRef } from "react"
import { CartContext } from "./CartContext"
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,Input,Button
} from '@chakra-ui/react'



function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef()
  const {cartproducts} = useContext(CartContext)
  return (
    <header className="fixed z-50 w-full flex p-4 bg-yellow-700 text-white" >
        <Button display={{base:"flex",md:"none"}} ref={btnRef} background={"yellow.700"} colorScheme={"white"} onClick={onOpen} className="mt-1 mr-4 " >
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
             <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
           </svg>
        </Button>
        <Link className="font-lato ml-4 text-4xl" href="/" >ecommerce</Link>
        
        <Flex display={{base:"none",md:"flex"}} className="ml-4 mt-2 w-full gap-2">
          <div>
           <Link className="p-2 m-1 text-xl" href="/" >home</Link>
           <Link className="p-2 m-1 text-xl" href="/product" >all products</Link>
           <Link className="p-2 m-1 text-xl" href="/" >categories</Link>
          </div>
          <Spacer />
          <div className="flex" >
           <Link className="px-2 text-xl" href="/" >account</Link>
           <Link className="px-2 text-xl flex" href="/cart" >Cart
            ({cartproducts.length})</Link>
          </div>
        </Flex>
        <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
        size={"full"}
        
      >
        <DrawerOverlay />
        <DrawerContent background={"yellow.600"} >
          <DrawerCloseButton />
          <DrawerHeader>
          <Link className="font-lato text-white ml-4 text-4xl" href="/" >ecommerce</Link>
          </DrawerHeader>

          <DrawerBody>
         
           <h1 className="ml-3 p-2 text-white m-1 text-2xl"  >
            <a href="/">home</a>
            </h1>
            <h1 className="ml-3 p-2 text-white m-1 text-2xl"  >
            <a href="/products">products</a>
            </h1>
            <h1 className="ml-3 p-2 text-white m-1 text-2xl"  >
            <a href="/">account</a>
            </h1>
            <h1 className="ml-3 p-2 text-white m-1 text-2xl"  >
            <a href="/cart">Cart({cartproducts.length})</a>
            </h1>
          
        
          </DrawerBody>

         
        </DrawerContent>
      </Drawer>
      
    </header>
  )
}

export default Navbar