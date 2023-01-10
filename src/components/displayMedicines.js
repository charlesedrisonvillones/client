import React, { useEffect, useState } from "react";
import './displayMedicines.css';



const DisplayMedicines = () => {
    const [medicines, setMedicines] = useState ([])
    const [inputs, setInputs] = useState({
        medicine: ""
        

    });
    const onChange = e => {    
        setInputs({ ...inputs, [e.target.name]: e.target.value })
    };
    const {medicine} = inputs
    const getMedicines = async () => {
        try { 
            const response = await fetch(
                "http://localhost:8000/medicines",{
                    method: "GET",
                    headers: { Authorization:localStorage.getItem('token') }
                }
           
            )
            const parseRes = await response.json();
            console.log(parseRes)
            setMedicines(parseRes)
            
        } catch (error) {
            console.log(error)
        }
    }

    const addMedicines = async (e) => {
        e.preventDefault()
        try {

            const body = { medicine }
            console.log(body)
            const response = await fetch(
                "http://localhost:8000/medicines",{
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
        getMedicines();
    },[])
    return (
        <div className="display2">
            HELLO MEDICINES
           
            <form onSubmit={addMedicines}>
                <input  type="text" 
                        placeholder="medicine"
                        name="medicine" 
                        value={medicine} 
                        onChange={e => onChange(e)} />
               

                
                <button type="submit">add</button>
            </form>
            <div>{medicines.map(medicine => {
            return <li><h1>{medicine.name}</h1></li>

        } )}</div>
        </div>
    )
}



export default DisplayMedicines;