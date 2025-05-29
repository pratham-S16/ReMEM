import { createContext, useState,useEffect, use} from "react";
import {collection,getDocs} from 'firebase/firestore'
import { db } from "../config/firebase";

export const Context=createContext();

const ContextProvider=(props)=>{


  const [contacts,setContacts]=useState([]);
  const [isOpen,setOpen]=useState(false);
  const [update,setUpdate]=useState(false);
  const [updContact,setUpdContact]=useState({
    Name:"",
    Email:"",
    id:"",
  });

  const onOpen=()=>{
    setOpen(true);
  }
  const onClose=()=>{
    setOpen(false);
  } 

  const getContacts=async()=>{
      try {
        const contactsRef=collection(db, "contacts");
        const contactsSnapshot=await getDocs(contactsRef);
        const contactsList=contactsSnapshot.docs.map((doc)=>{
          return {
          id: doc.id,
          ...doc.data()
        }
        });
        setContacts(contactsList);
        console.log(contactsList);
      } catch (error) {
        console.log("Error fetching contacts: ", error);
      }
    }

  useEffect(()=>{
    getContacts();

  }, [])



    const contextValue={
        contacts,
        setContacts,
        onOpen,
        onClose,
        getContacts,
        isOpen,
        update,
        setUpdate,
        updContact,
        setUpdContact,

}     



    return(
    <Context.Provider value={contextValue}>
        {props.children}    
    </Context.Provider>
)
}





export default ContextProvider;