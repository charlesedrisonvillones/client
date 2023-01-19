import React, { useEffect, useState } from "react";
import './displayPigs.css';
import Pig from "./Pig";



const DisplayPigs = () => {
    const [pigs, setPigs] = useState ([])
    const [inputs, setInputs] = useState({
        name: "",
        sow : false,
        weight: 0.0
        

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
            const result = await response.json();
            console.log(result)
            setPigs(result)
            
        } catch (error) {
            console.log(error)
        }
    }

    const addPigs = async (e) => {
        e.preventDefault()
        try {
            const{name, sow, weight}=inputs
            const body = { name, sow, weight }
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
    return (<>

        <div className="display">
            HELLO PIGS
           
            <form onSubmit={addPigs}>
                <input  type="text" 
                        placeholder="name"
                        name="name" 
                        value={inputs.name} 
                        onChange={e => onChange(e)} />
                
                <input  type="text" 
                        placeholder="sow"
                        name="sow" 
                        value={inputs.sow} 
                        onChange={e => onChange(e)} />

                <input  type="number" 
                        placeholder="weight"
                        name="weight" 
                        value={inputs.weight} 
                        onChange={e => onChange(e)} />
               

                
                <button type="submit">add</button>
            </form>
            
            <div className="pig-list">{pigs.map(pig => {
            return < Pig name= {pig.name} sow= {pig.sow} weight= {pig.weight} id= {pig.id}/>


        } )}</div>
        </div>



</>)
}



export default DisplayPigs;