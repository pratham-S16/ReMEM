import React,{useContext} from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import {createPortal} from 'react-dom'
import { Context } from '../context/Context'

const Modals = ({children}) => {
    const {isOpen, onClose} = useContext(Context);



  return createPortal (
   <>
   {isOpen && 
   <>
   <div className='min-h-[200px] max-w-[80%] m-auto z-50  relative bg-amber-50'>
    <div className='flex justify-end p-4'>
    <AiOutlineClose onClick={onClose} className='text-2xl cursor-pointer'/>
    </div>
    <div>{children}</div>
    </div>
    
    <div onClick={onClose} className='h-screen w-screen backdrop-blur absolute top-0 z-40'/>

   </>}
   </>,
    document.getElementById('modal-root')
  )
}

export default Modals