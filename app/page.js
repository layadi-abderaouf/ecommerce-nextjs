//components
import Navbar from './components/Navbar'
import Featured from './components/Featured'
import LatestProducts from './components/LatestProducts'

export default function Home() {
  
  return (
   <div className=''>
    <Navbar></Navbar>
    <Featured  ></Featured>
    <LatestProducts></LatestProducts>
   </div>
  )
}
