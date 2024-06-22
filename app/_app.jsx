"use client"
import { SessionProvider } from "next-auth/react"
import {CartContextProvider} from './components/CartContext'
export default function App({
 children,session
}) {
  return (
    <SessionProvider session={session}>
      <CartContextProvider>
      {children}
      </CartContextProvider>
    </SessionProvider>
  )
}
