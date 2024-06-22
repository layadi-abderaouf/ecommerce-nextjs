import NextAuth, { getServerSession } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "../../../lib/mongodb"


const adminemails = ['layadiraouf26@gmail.com']

export const authOptions = {
  providers: [
    // OAuth authentication providers...
    
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
   
  ],
  adapter: MongoDBAdapter(clientPromise),
  callbacks:{
    session:({session,token,user})=>{
      if(adminemails.includes(session?.user?.email)){
        return session;
      }else{
        return false;
      }
      
    }
  }
} 

const handler = NextAuth(authOptions)

export async function isAdmin(){
   const session = await getServerSession(authOptions);
   if(!adminemails.includes(session?.user?.email)){
    throw 'you are not admin'
  }
  

}

export { handler as GET, handler as POST }
