import React, { useEffect, useState } from "react";
import './displayPigs.css';



const DisplayPigs = () => {
    const [pigs, setPigs] = useState ([])
    const [inputs, setInputs] = useState({
        pig: ""
        

    });
    const onChange = e => {    
        setInputs({ ...inputs, [e.target.name]: e.target.value })
    };
    const {pig} = inputs
    const getPigs = async () => {
        try { 
            const response = await fetch(
                "http://localhost:8000/pigs",{
                    method: "GET",
                    headers: { Authorization:localStorage.getItem('token') }
                }
           
            )
            const parseRes = await response.json();
            console.log(parseRes)
            setPigs(parseRes)
            
        } catch (error) {
            console.log(error)
        }
    }

    const addPigs = async (e) => {
        e.preventDefault()
        try {

            const body = { pig }
            console.log(body)
            const response = await fetch(
                "http://localhost:8000/pigs",{
                    method: "POST",
                    headers: {"Content-type": "application/json",
                     Authorization:localStorage.getItem('token') },
                    body: JSON.stringify(body)
                }
                

            )
            const parseRes= await response.json()
            console.log(parseRes)
            
           
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getPigs();
    },[])
    return (
        <div className="display">
            HELLO PIGS
           
            <form onSubmit={addPigs}>
                <input  type="text" 
                        placeholder="pig"
                        name="pig" 
                        value={pig} 
                        onChange={e => onChange(e)} />
               

                
                <button type="submit">add</button>
            </form>
            <div>{pigs.map(pig => {
            return <li><h1>{pig.name}</h1></li>

        } )}</div>
        </div>
    )
}



export default DisplayPigs;