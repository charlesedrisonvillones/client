import React, { useEffect, useState } from "react";
import './displayMedicines.css';



const DisplayMedicines = () => {
    const [medicines, setMedicines] = useState ([])
    const [inputs, setInputs] = useState({
        name: "",
        stock: 0
        

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

            const body = { name: inputs.name, stocks: inputs.stock }
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
            setMedicines(curMedicines => [...curMedicines, {name: inputs.name, stocks: inputs.stock}])
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
           
            <form className="add-medicine" onSubmit={addMedicines}>
                <input type="text"
                       placeholder="medicine name"
                       name="name"
                       value={inputs.name}
                       onChange={e => onChange(e)} />

                <input type="integer"
                       placeholder="stock"
                       name="stock"
                       value={inputs.stock}
                       onChange={e => onChange(e)} />
                <button type="submit">add</button>

            </form>
            <div className="medicine-container">
                {medicines.map(medicine => {
                 return (
                    <div className="medicine-item"> 
                        <h4 className="medicine-name">{medicine.name}</h4>
                        <div className="medicine-stocks">{medicine.stocks}</div>
                        <button className="editbtn" type="submit">edit</button> 
                    </div>
                 )
                } )}
            </div>
            
            
        </div>
    )
}



export default DisplayMedicines;