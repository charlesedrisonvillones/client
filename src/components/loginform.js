import React, { useState } from "react";
import "./loginform.css";
import { Link } from "react-router-dom";


const LoginForm = ({ setAuth }) => {

    const [popupStyle, showPopup ] = useState("hide");
    const [inputs, setInputs] = useState({
        email: "",
        password: ""

    });
    const onChange = e => {    
        setInputs({ ...inputs, [e.target.name]: e.target.value })
    };
    const { email, password } = inputs
    const popup = () => {
        showPopup("login-popup")
        setTimeout(() => showPopup("hide"), 3000)
    }

    const onSubmitForm = async (e) => {
        e.preventDefault()
        try {

            //making a body object from the values of username and password
            const body = { email, password }

            //fetch api for POST method
            const response = await fetch(
                "http://localhost:8000/login",
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
                console.log("login")
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
                <h1>Login</h1>
            
                <form onSubmit={onSubmitForm}>
                
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
                        <button type="submit" className="login-btn" onClick={popup}>LOGIN</button>
                </form>
                

                {/* <p className="text">OR LOGIN USING</p> */}

                {/* <div className="alt-login">
                    <div className="facebook"></div>
                    <div className="google"></div>

                </div> */}

            {/* div className={popupStyle}>
                    <h3>Login Failed</h3>
                    <p> <Username or password incorrect</p>
                </div> */}

            </div>
        </div>
    )
}

 export default LoginForm