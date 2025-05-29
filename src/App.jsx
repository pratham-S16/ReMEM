import { useContext, useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import {IoSearch} from "react-icons/io5";
import { CiCirclePlus } from "react-icons/ci";

 import { ToastContainer } from 'react-toastify';
import Contact from "./components/Contact";
import Modals from "./components/Modals";
import AddandUpdate from "./components/AddandUpdate";
import { Context } from "./context/Context";

function App() {

  const {contacts,setContacts,onOpen, onClose,setUpdate,getContacts}=useContext(Context);
  
  const filterContact= (e)=>{
    const searchTerm = e.target.value.toLowerCase();
    const filteredContacts = contacts.filter(contact => 
      contact.Name.toLowerCase().includes(searchTerm) || 
      contact.Email.toLowerCase().includes(searchTerm)
    );
    setContacts(filteredContacts);
    if (searchTerm === "")
    getContacts();
  }

  return (
    <>
    <div className="mx-auto max-w-[370px]  px-4 ">
    <Navbar/>
    <div className="flex flex-grow flex-row bg-amber-950 rounded-lg pt-2 pb-2  gap-2 items-center justify-center  ">

      <div className="flex  bg-transparent border-white border-3 rounded-lg items-center pl-2">
      <IoSearch className=" text-2xl text-white"/>
      <input onChange={filterContact} type="text" className=" flex-grow  outline-none  p-4 text-white h-10 " placeholder="Search"/>
      </div>
      
      
      <CiCirclePlus onClick={()=>{onOpen();setUpdate(false)}} className="text-5xl cursor-pointer text-white"/>
    </div>
    
    <div className=" h-full p-2">
      {
         contacts.length>0?contacts.map((contact)=>{
          return(
          <Contact contact={contact} />
          )
        }) : <div className="text-white text-xl flex justify-center m-4">No Contacts</div>
      }
      
    </div>
    </div>
    <AddandUpdate  />
     <ToastContainer />
    </>
  );
}

export default App;
