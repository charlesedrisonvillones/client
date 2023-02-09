import React, { useEffect, useState } from "react";
import './displayPigs.css';
import Pig from "./Pig";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';




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
    const [showUpdate, setShowUpdate] = useState(false);

    const handleCloseUpdate = () => setShowUpdate(false);
    const handleShowUpdate = () => setShowUpdate(true);
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
    const update = async (e) => {
      e.preventDefault()
      try {
  
          const body = { id: inputs.id, sow: inputs.sow, weight: inputs.weight, type: inputs.type }
          console.log(body)
          const response = await fetch (
              "http://localhost:8000/editPigs",{
                  method: "POST",
                  headers: {"Content-type": "application/json",
                   Authorization:localStorage.getItem('token') },
                  body: JSON.stringify(body)
              }
          )
          const parseRes = await response.json()
         getPigs()
          console.log(parseRes)
          setShowUpdate(false)
      
      } catch (error) {
          console.log(error)
      }
  }
  
  const deletePigs = async (id) => {
     
      try {
              const response = await fetch (
              `http://localhost:8000/pigs/${id}`,{
                  method: "DELETE",
                  headers: {"Content-type": "application/json",
                   Authorization:localStorage.getItem('token') },
                  
              }
          )
          
         getPigs()
      
      } catch (error) {
          console.log(error)
      }
  }
  
  const updatePigs = (pigs) => {
          
    
   
    setInputs(pigs)
    setShowUpdate(true)
  }
    return (<>
        <Button variant="primary" onClick={handleShow}>
       Add Pigs
      </Button>
        <div className="display">
          
           
            
            <table class="table" style={{background:"white"}}>
  <thead class="thead-dark">
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Type of Pigs</th>
      <th scope="col">Weight</th>
      <th scope="col">Action</th>
     
    </tr>
  </thead>
  <tbody>
    {pigs.map(pig => {
        return(<tr>
            <th scope="row">{pig.name}</th>
            <td>{pig.type}</td>
            <td>{pig.weight}</td>
            <td> <Button variant="success" onClick={()=> updatePigs(pig)}>Update</Button><Button variant="danger" onClick={()=> deletePigs(pig.id)}>Delete</Button></td>
           
          </tr>
          )

    })}
    
      
  </tbody>
</table>


        </div>
      
        

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Pigs</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" 
                        placeholder="name"
                        name="name" 
                        value={inputs.name} 
                        onChange={e => onChange(e)}/>
        
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Type of Pigs</Form.Label>
        <Form.Select size="lg" onChange={e => onChange(e)} name="type" id="pigs">
        <option> select</option>
        <option value="sow">Sow</option>
<option value="hog">Hog</option>
<option value="boar">Boar</option>

      </Form.Select>
        {/* <Form.Control 
                        type="text" 
                        placeholder="sow"
                        name="sow" 
                        value={inputs.sow} 
                        onChange={e => onChange(e)} />
                        <label for="pigs">Choose type:</label>

                        

<select  onChange={e => onChange(e)} name="type" id="pigs">
<option value="sow">Sow</option>
<option value="hog">Hog</option>
<option value="boar">Boar</option>



</select> */}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Weight</Form.Label>
        <Form.Control type="number" 
                        placeholder="weight"
                        name="weight" 
                        value={inputs.weight} 
                        onChange={e => onChange(e)} /> 
      </Form.Group>
      
      
        
     
    </Form>
                {/* <input  type="text" 
                        placeholder="name"
                        name="name" 
                        value={inputs.name} 
                        onChange={e => onChange(e)} /> */}
                
                {/* <input  type="text" 
                        placeholder="sow"
                        name="sow" 
                        value={inputs.sow} 
                        onChange={e => onChange(e)} /> */}
                {/* <label for="pigs">Choose type:</label>

                    <select  onChange={e => onChange(e)} name="type" id="pigs">
                    <option value="sow">Sow</option>
                    <option value="hog">Hog</option>
                    <option value="boar">Boar</option>


  
                    </select> */}

                {/* <input  type="number" 
                        placeholder="weight"
                        name="weight" 
                        value={inputs.weight} 
                        onChange={e => onChange(e)} /> */}
               

                
                
           </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={addPigs}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showUpdate} onHide={handleCloseUpdate}>
        <Modal.Header closeButton>
          <Modal.Title>UPDATE PIGS</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Stocks</Form.Label>
        <Form.Control type="text" 
                        placeholder="name"
                        name="name" 
                        value={inputs.name} 
                        onChange={e => onChange(e)} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Type of Pigs</Form.Label>
        <Form.Select size="lg" onChange={e => onChange(e)} name="type" id="pigs">
        <option> select</option>
        <option value="sow">Sow</option>
<option value="hog">Hog</option>
<option value="boar">Boar</option>

      </Form.Select>
      
      </Form.Group>
        
                
                {/* <input  type="text" 
                        placeholder="sow"
                        name="sow" 
                        value={inputs.sow} 
                        onChange={e => onChange(e)} /> */}
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Weight</Form.Label>
        <Form.Control type="number" 
                        placeholder="weight"
                        name="weight" 
                        value={inputs.weight} 
                        onChange={e => onChange(e)} /> 
      </Form.Group>
                
                

                
               

                
                
           </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseUpdate}>
            Close
          </Button>
          <Button variant="primary" onClick={update}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>



</>)
}



export default DisplayPigs;