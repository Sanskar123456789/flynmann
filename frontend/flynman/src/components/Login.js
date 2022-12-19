/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useDispatch, useSelector } from 'react-redux';
import {newUser,login} from '../features/user'
import { useNavigate } from 'react-router-dom';
// ---------------------------Imports -----------------------

export default function Login() {
    const [user,setuser] = useState(); //contains existing user value
    const [name,setName] = useState(); // contains name 
    const [phone,setPhone] = useState();// contains phone
    const [email,setEmail] = useState();// contains email

    const [exist,setExist] = useState(true); // toggle for new user and existing one
    const dispatch = useDispatch(); // call reducers

    const navigate = useNavigate(); // navigate through routes

    let error = useSelector((state)=>state.user.error) // check for error
    let message = useSelector((state)=>state.user.message) // check message

    useEffect(()=>{
        if(error){
            alert(message);
        }
    },[error])// if any error is encountered this function will fires
    
    const submitNewUser = () => {
        const data = {
            name,
            email,
            phone
        } // new user data
        dispatch(newUser(data)) // new user api
    }

    const submitLogin = () => {
        dispatch(login(user)) // login api
        navigate('/dashboard'); // navigate to dashboard
    }
  return (
    <div className='m-2'>
        <Card>
            {
            exist 
                ?<div>
                    {/* email id of user */}
                    <span className="p-float-label">
                        <InputText id="in" onChange={(e) => setuser(e.target.value)} />
                        <label htmlFor="in">Username</label>
                    </span>
                    <br/>
                    <br/>
                    {/* Submit button */}
                    <Button label="Submit" icon="pi pi-check"  onClick={
                        ()=>{
                            submitLogin();
                        }
                        } />
                    <br/>
                </div>
                :<div>
                    {/* new user name */}
                    <span className="p-float-label">
                        <InputText id="in" onChange={(e) => setName(e.target.value)} />
                        <label htmlFor="in">User Name</label>
                    </span>
                    <br/>
                    {/* new user phone */}
                    <span className="p-float-label">
                        <InputText id="in" onChange={(e) => setPhone(e.target.value)} />
                        <label htmlFor="in">Phone Number</label>
                    </span>
                    
                    <br/>
                    {/* new user email */}
                    <span className="p-float-label">
                        <InputText id="in" onChange={(e) => setEmail(e.target.value)} />
                        <label htmlFor="in">Email</label>

                    </span>
                    <br/>
                    <br/>
                    {/* Submit button for new user */}
                    <Button label="Submit" icon="pi pi-check" onClick={
                        ()=>{
                            submitNewUser();
                        }
                        } />
                    <br/>
                </div>
            }
            <br/>
            {/* New user and existing user  buttons*/}
            <Button label="New User" className="p-button-link" onClick={()=>setExist(false)} disabled={!exist} />
            <Button label="Existing User" className="p-button-link" onClick={()=>setExist(true)} disabled={exist} />
        </Card>
    </div>
  )
}
