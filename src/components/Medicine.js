import React, { useEffect, useState } from "react";
import './displayMedicines.css';

const Medicine = (props) => {
    const [inputs, setInputs] = useState({
        
        stock: 0
    });
    const onChange = e => {
        setInputs({ ...inputs, [e.target.name]: e.target.value})
    };
    const editMedicines = async (e) => {
        e.preventDefault()
        try {

            const body = { name_id:props.id, stocks: inputs.stock }
            console.log(body)
            const response = await fetch (
                "http://localhost:8000/editMedicines",{
                    method: "POST",
                    headers: {"Content-type": "application/json",
                     Authorization:localStorage.getItem('token') },
                    body: JSON.stringify(body)
                }
            )
            const parseRes = await response.json()
            
            console.log(parseRes)
        
        } catch (error) {
            console.log(error)
        }
    }



  
  return (<div>
    <h1>{props.name}</h1>
    <h1>{props.stocks}</h1>
    <form className="add-medicines" onSubmit={editMedicines}>
                

                <input type="integer"
                       placeholder="stock"
                       name="stock"
                       value={inputs.stock}
                       onChange={e => onChange(e)} />
                <button type="submit">save</button>

            </form>
  </div>)

    };

export default Medicine;