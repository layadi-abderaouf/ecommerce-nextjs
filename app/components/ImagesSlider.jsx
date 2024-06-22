import React,{useState} from 'react'
import { SimpleGrid,Box } from '@chakra-ui/react'

function ImagesSlider({images}) {
  const [img_index, setimg_index] = useState(0)
  return (
    <div className='p-4 pt-1' >
        <div className='m-1 p-2 rounded-lg   bg-yellow-600'>
        <img className='w-full rounded-lg h-80' src={images?.[img_index]} alt="" />
        </div>
    
     <SimpleGrid marginTop={1}  columns={images?.length} spacing={1}>
        {images?.length >1 && images?.map((i,index)=>(
            <button key={index} onClick={()=>setimg_index(index)} className={ index == img_index ? 'bg-yellow-600  m-1 p-2 rounded-lg':'bg-gray-200 m-1 p-2 rounded-lg'}>
                <img className='w-full h-20 rounded-lg' src={i} alt="" />
            </button>
        ))}
       
      </SimpleGrid>
   
    </div>
  )
}

export default ImagesSlider