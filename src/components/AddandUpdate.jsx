import React,{useContext} from "react";
import Modals from "./Modals";
import {Formik,Field, Form, ErrorMessage} from 'formik';
import { db } from "../config/firebase";
import { addDoc,collection, updateDoc, doc } from "firebase/firestore";
import { Context } from "../context/Context";
import { toast } from 'react-toastify';
import * as Yup from 'yup';  

const contactSchemaValidation=Yup.object().shape({
    Name: Yup.string().required("Name is Required"),
    Email: Yup.string().email("Invalid Email").required("Email is required")


})

const AddandUpdate = () => {

    const {onClose,contacts,getContacts,update,setUpdate,updContact,setUpdContact}=useContext(Context);

    const addContact=async(contact)=>{
        try {
            const contactRef=collection(db,"contacts");
            await addDoc(contactRef, contact);
            toast.success("Contact added successfully");
        } catch (error) {
            console.log("Error adding contact: ", error);
        }
    }

      const updateContact=async(contact,id)=>{
        try {
          const contactRef=doc(db,"contacts",id);
          await updateDoc(contactRef, contact);
          // onClose();
          setUpdate(false);
        toast.success("Contact updated successfully");
          getContacts();
        } catch (error) {
          console.log("Error updating contact: ", error);
        }
      }



  return (
    <div>
      <Modals >
        <Formik
        validationSchema={contactSchemaValidation}
        initialValues={update? {
            Name: updContact.Name,
            Email: updContact.Email, 
        }:{
            Name: "",
            Email: "",
        }}
        onSubmit={(values)=>{
            console.log(values);
            update? updateContact(values,updContact.id):addContact(values);
            onClose();
            getContacts();
        }}
        >
        <Form className="flex flex-col gap-4 p-4">
            <div className="flex flex-col gap-1">
                <label htmlFor="Name'">Name</label>
                <Field className="h-8 border-1" name='Name'/>
                <div className="text-red-500">
                  <ErrorMessage name="Name" />
                </div>
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="Email'">Email</label>
                <Field className="border-1 h-8" type="email" name='Email'/>
                <div className="text-red-500">
                  <ErrorMessage name="Email" />
                </div>
            </div>

            <div>
                <button type="submit" className="bg-amber-950 rounded-md text-white p-2 self-end cursor-pointer">{update? `Update Contact`:`Add Contact`}</button>
            </div>
            
        </Form>
        </Formik>
      </Modals>
    </div>
  );
};

export default AddandUpdate;
