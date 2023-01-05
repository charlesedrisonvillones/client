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
            } else {
                setAuth(false)
                console.log("Something wrong")
            }

        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <div className="cover">
            <h1>Register</h1>
            <form onSubmit={onSubmitForm}>
            <input 
                    type="text" 
                    name="name" 
                    value={name} 
                    onChange={e => onChange(e)} />
          <input 
                    type="text" 
                    name="password" 
                    value={password} 
                    onChange={e => onChange(e)} />

<input 
                    type="text" 
                    name="email" 
                    value={email} 
                    onChange={e => onChange(e)} />
                    <button type="submit" className="login-btn" onClick={popup}>Register</button>

                    
            </form>
              

            <p className="text">OR LOGIN USING</p>

            <div className="alt-login">
                <div className="facebook"></div>
                <div className="google"></div>

            </div>

            <div className={popupStyle}>
                <h3>Login Succesfull</h3>
                <p>Congrats</p>
            </div>

        </div>
    )
}

export default RegistrationForm