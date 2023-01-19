import React, { useEffect, useState } from "react";
import './profile.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';





const Dashboard = ({ setAuth }) => {
    const [name, setName] = useState("");
    
    const getProfile = async () => {
        try {
            //fetch api that uses the GET method
            const response = await fetch(
                "http://localhost:8000/profile",
                {
                    method: "GET",
                    //retrieving the token and putting it in the Auth header
                    headers: { Authorization:localStorage.getItem('token') }
                })
            //parsing the json back to a JS object
            const parseRes = await response.json();
            setName(parseRes.user_name);

        } catch (error) {
            console.log(error.message)
        }
    }


const logout = async (e) => {
    e.preventDefault()
    try {
        //removing the token from localstorage
        localStorage.removeItem('token')
        setAuth(false)
    } catch (error) {
        console.log(error.message)
    }
}


useEffect(() => {
    getProfile();
   
    
}, [])



return (

    <>
    
    <div className="card" style={{ width: 20 + 'rem' }}>
        
   
        <div className="pic-container">
            
        <img src="https://media.licdn.com/dms/image/C5103AQFcpNGDcSRcDA/profile-displayphoto-shrink_800_800/0/1553566992650?e=1678320000&v=beta&t=LNED6pgc7gH5PC2i-U3DQlfLSa29Sbv_iOJgoNHuBH8" className="card-img-top" alt="..." />
        <h1 class="text-center">{name}</h1>
                <h2 class="text-center">FARM OWNER</h2>
            </div>
        <div class="btn-group" role="group" aria-label="Basic mixed styles example">
            {/* <button type="button" class="btn btn-danger">Set Status</button>
            <button type="button" class="btn btn-warning">Edit Profile</button>
            <button type="button" class="btn btn-success">More</button> */}
</div>
            {/* <div>
                <h1>{name}</h1>
                <h2>FARM OWNER</h2>
            </div>
            <div>
                <button>set status</button>
                <button>edit profile</button>
                <button>more</button>
            </div> */}
        </div>


        
        {/* <br></br>
        <br></br> */}
    <div class="col-md-12 text-center">
    <button onClick={logout} className="btn btn-primary btn-block mb-4" >Sign Out</button> 
    
            
        </div>
    </>
   

)}

export default Dashboard;
