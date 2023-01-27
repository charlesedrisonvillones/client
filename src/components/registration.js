import React, { useState } from "react";
import "./registrationform.css";
import { Link } from "react-router-dom";


const RegistrationForm = ({ setAuth }) => {

    const [popupStyle, showPopup ] = useState("hide");
    const [inputs, setInputs] = useState({
        name: "",
        password: "",
        email: ""

    });
    const onChange = e => {    
        setInputs({ ...inputs, [e.target.name]: e.target.value })
    };
    const { name, password, email } = inputs
    const popup = () => {
        showPopup("login-popup")
        setTimeout(() => showPopup("hide"), 3000)
    }

    const onSubmitForm = async (e) => {
        e.preventDefault()
        try {

            //making a body object from the values of username and password
            const body = { name, password, email }

            //fetch api for POST method
            const response = await fetch(
                "http://localhost:8000/register",
                {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(body)
                }
            )

            const parseRes = await response.json()

            if (parseRes.token) {
                //localstorage
                localStorage.setItem("token", parseRes.token)
                setAuth(true)
                console.log("registration")
            } else {
                setAuth(false)
                console.log("Something wrong")
            }

        } catch (error) {
            console.log(error.message)
        }
    }

    

    return (
        <div className="page">
            <div className="cover">
                <h1>Register</h1>
                <form onSubmit={onSubmitForm}>
                <input 
                        type="text" 
                        placeholder="name"
                        name="name" 
                        value={name} 
                        onChange={e => onChange(e)} />
            <input 
                        type="text" 
                        placeholder="email"
                        name="email" 
                        value={email} 
                        onChange={e => onChange(e)} />
                        
                        

                <input 
                        type="password" 
                        placeholder="enter your password"
                        name="password" 
                        value={password} 
                        onChange={e => onChange(e)} />
                        <button type="submit" className="login-btn" onClick={popup}>Register</button>

                        
                </form>

            

                

                <div className={popupStyle}>
                    <h3>Login Succesfull</h3>
                    <p>Congrats</p>
                </div>

            </div>
        </div>
    )
}

export default RegistrationForm