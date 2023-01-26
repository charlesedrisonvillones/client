import React, { useEffect, useState } from "react";
import './displayPigs.css';
import Pig from "./Pig";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';



const DisplayPigs = () => {
    const [pigs, setPigs] = useState ([])
    
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [inputs, setInputs] = useState({
        name: "",
        sow : false,
        weight: 0.0,
        type: ""
        

    });
    const onChange = e => {  
        console.log(e)  
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
            const{name, sow, weight, type}=inputs
            const body = { name, sow, weight, type }
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
            getPigs()
            handleClose()
            console.log(parseRes)
            
           
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getPigs();
    },[])
    return (<>
        <Button variant="primary" onClick={handleShow}>
       Add Pigs
      </Button>
        <div className="display">
            HELLO PIGS
           
            {/* <form onSubmit={addPigs}>
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
                <label for="pigs">Choose type:</label>

                    <select  onChange={e => onChange(e)} name="type" id="pigs">
                    <option value="sow">Sow</option>
                    <option value="hog">Hog</option>
                    <option value="boar">Boar</option>


  
                    </select>

                <input  type="number" 
                        placeholder="weight"
                        name="weight" 
                        value={inputs.weight} 
                        onChange={e => onChange(e)} />
               

                
                <button type="submit">add</button>
            </form>
             */}
            {/* <div className="pig-list">{pigs.map(pig => {
            return < Pig name= {pig.name} sow= {pig.sow} weight= {pig.weight} id= {pig.id}/>


        } )}</div> */}
        <div style={{width:"1000px", backgroundColor:"white", justifyContent:"center", display:"flex"}} className="Dashboard-container">
            {/* <DisplayPigs></DisplayPigs>
            <DisplayMedicines></DisplayMedicines>
            <DisplayFeeds></DisplayFeeds> */}
            <table class="table">
  <thead class="thead-dark">
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Type of Pigs</th>
      <th scope="col">Weight</th>
     
    </tr>
  </thead>
  <tbody>
    {pigs.map(pig => {
        return(<tr>
            <th scope="row">{pig.name}</th>
            <td>{pig.type}</td>
            <td>{pig.weight}</td>
           
          </tr>
          )

    })}
    
      
  </tbody>
</table>


        </div>
        </div>
        

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body><form onSubmit={addPigs}>
                <input  type="text" 
                        placeholder="name"
                        name="name" 
                        value={inputs.name} 
                        onChange={e => onChange(e)} />
                
                {/* <input  type="text" 
                        placeholder="sow"
                        name="sow" 
                        value={inputs.sow} 
                        onChange={e => onChange(e)} /> */}
                <label for="pigs">Choose type:</label>

                    <select  onChange={e => onChange(e)} name="type" id="pigs">
                    <option value="sow">Sow</option>
                    <option value="hog">Hog</option>
                    <option value="boar">Boar</option>


  
                    </select>

                <input  type="number" 
                        placeholder="weight"
                        name="weight" 
                        value={inputs.weight} 
                        onChange={e => onChange(e)} />
               

                
                
            </form></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={addPigs}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>



</>)
}



export default DisplayPigs;