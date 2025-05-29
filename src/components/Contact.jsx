import React, { useContext } from 'react'
import {IoMdTrash} from "react-icons/io";
import { TiEdit } from "react-icons/ti";
import { FaCircleUser } from "react-icons/fa6";
import { collection, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Context } from '../context/Context';
import { toast } from 'react-toastify';

const Contact = ({contact}) => {

  const {getContacts,onClose,onOpen,update,setUpdate,updContact,setUpdContact}=useContext(Context);
 
  const deleteContact= async(id)=>{
    try {
      await deleteDoc(doc(db, "contacts", id));
      getContacts();
      toast.success("Contact deleted successfully");
    } catch (error) {
      console.log("Error deleting contact: ", error);
    }
  }




  return (
    <div key={contact.id} className="bg-[#FFFAE5] m-2 mt-3  p-2 flex items-center  rounded-3xl justify-between">
            <FaCircleUser className=" text-[#56382D] cursor-pointer text-4xl"/>
            <div className="flex flex-col  ">
              <h1 className=" text-lg  font-medium">{contact.Name}</h1>
              <p className=" text-sm">{contact.Email}</p>
            </div>
            <div className="flex gap-2" >
            <TiEdit onClick={()=>{onOpen();setUpdate(true);
             setUpdContact({Name: contact.Name, Email: contact.Email, id: contact.id})
            }} className="text-[#56382D] cursor-pointer text-3xl"/>
            <IoMdTrash onClick={()=>{deleteContact(contact.id)}} className="text-[#56382D] cursor-pointer text-3xl"/>
            </div>
          </div>
  )
}

export default Contact