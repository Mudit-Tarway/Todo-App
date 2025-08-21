import React from 'react'
import './signup.css'
import SHeadingComp from './SHeadingComp'
import { useState } from 'react'
import axios from 'axios'
import {useNavigate} from "react-router-dom";

const SignUp = () => {
    const history = useNavigate();
   const [inputs , setInputs] = useState ( {
    email : "",
    username : "",
    password : "",
    })

    const change = (e) => {
        const {name , value } = e.target 
        setInputs({...inputs , [name] : value})
    }

    const submit = async (e) => {
        e.preventDefault();
        try{
            await axios.post("http://localhost:5000/api/auth/signup" , inputs)
            .then((response => {
                    alert(response.data.message);
                    setInputs({
                        email : "",
                        username : "",
                        password : "",
                    });
                    history("/signin");
        }));
        }catch(error){
            if (error.response && error.response.status === 400) {
                alert(error.response.data.message);
                  setInputs({
                        email : "",
                        username : "",
                        password : "",
                    });
            } else {
                alert("Something went wrong, please try again.");
                  setInputs({
                        email : "",
                        username : "",
                        password : "",
                    });
             }

        }
    }

  return (
    <div className='Signup'>
        <div className="container">
            <div className="row">
                <div className="col-lg-8 column d-flex jsutify-content-center align-items-center">
                    <div className='d-flex flex-column w-100 p-5'>
                        <input 
                              type="email" 
                              name = "email"
                              placeholder='Enter your Email' 
                              className = "p-2 my-3 "
                              onChange = {change}
                              value = {inputs.email}
                        />
                        <input 
                                type="username" 
                                name = "username"
                                placeholder='Enter your Username' 
                                className = "p-2 my-3"
                                onChange = {change}
                                value = {inputs.username}
                        />
                        <input 
                              type="password" 
                              name = "password"
                              placeholder='Enter your Password' 
                              className = "p-2 my-3"
                              onChange = {change}
                              value = {inputs.password}
                        />
                        <button className="signup-btn py-2" onClick = {submit}>Signup</button>
                    </div>
                </div>
                <div className="col-lg-4 column col-left d-flex jsutify-content-center align-items-center">
                    <SHeadingComp first="Sign" second = "Up"/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SignUp