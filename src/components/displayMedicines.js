import React, { useEffect, useState } from "react";
// import './displayMedicines.css';
import Medicine from "./Medicine";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const DisplayMedicines = () => {
  const [medicines, setMedicines] = useState([]);
  const [inputs, setInputs] = useState({
    name: "",
    stocks: 0,
    expiration_date: new Date(),
  });

  const [editable, setEditable] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showUpdate, setShowUpdate] = useState(false);

    const handleCloseUpdate = () => setShowUpdate(false);
    const handleShowUpdate = () => setShowUpdate(true);

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
  const { medicine } = inputs;
  const getMedicines = async () => {
    try {
      const response = await fetch("http://localhost:8000/medicines", {
        method: "GET",
        headers: { Authorization: localStorage.getItem("token") },
      });
      const parseRes = await response.json();
      const medicinesLength = parseRes.length;
      const medicineEditable = new Array(medicinesLength).fill("false");
      setEditable(medicineEditable);
      console.log(parseRes);
      setMedicines(parseRes);
    } catch (error) {
      console.log(error);
    }
  };

  const addMedicines = async (e) => {
    e.preventDefault();
    try {
      const body = { name: inputs.name, stocks: inputs.stocks, expiration_date: inputs.expiration_date };
      console.log(body);
      const response = await fetch("http://localhost:8000/medicines", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify(body),
      });
      const parseRes = await response.json();
      getMedicines()
      setShow(false)
      console.log(parseRes);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMedicines();
  }, []);

  const fn = (index) => {
    let newEditable = editable.slice();
    console.log(index);
    newEditable[index] = "true";
    console.log(editable);
    setEditable(newEditable);
    console.log(editable);
  };
  const update = async (e) => {
    e.preventDefault()
    try {

        const body = { name_id: inputs.name_id, stocks: inputs.stocks, expiration_date: inputs.expiration_date }
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
       getMedicines()
        console.log(parseRes)
    
    } catch (error) {
        console.log(error)
    }
}

const deleteMedicine = async (name_id) => {
   
    try {
            const response = await fetch (
            `http://localhost:8000/medicines/${name_id}`,{
                method: "DELETE",
                headers: {"Content-type": "application/json",
                 Authorization:localStorage.getItem('token') },
                
            }
        )
        
       getMedicines()
    
    } catch (error) {
        console.log(error)
    }
}

const updateMedicines = (medicine) => {
        
  
 
  setInputs(medicine)
  setShowUpdate(true)
}
  return (
    <div className="display2">
      <Button variant="primary" onClick={handleShow}>
        Add Medicines
      </Button>
      HELLO MEDICINES
      <table style={{ background: "white" }} class="table">
        <thead class="thead-dark">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Stock</th>
            <th scope="col">expiration_date</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {medicines.map((medicine) => {
            return (
              <tr>
                <th scope="row">{medicine.name_id}</th>
                <td>{medicine.name}</td>
                <td>{medicine.stocks}</td>
                <td>{medicine.expiration_date}</td>
                <td> <Button variant="success" onClick={()=> updateMedicines(medicine)}>Update</Button><Button variant="danger" onClick={()=> deleteMedicine(medicine.name_id)}>Delete</Button></td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Medicine</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="add-medicine" onSubmit={addMedicines}>
            <input
              type="text"
              placeholder="medicine name"
              name="name"
              value={inputs.name}
              onChange={(e) => onChange(e)}
            />

            <input
              type="integer"
              placeholder="stock"
              name="stocks"
              value={inputs.stocks}
              onChange={(e) => onChange(e)}
            />

            <input
              type="date"
              placeholder="expiration date"
              name="expiration_date"
              value={inputs.expiration_date}
              onChange={(e) =>  onChange(e)}
              
            />
            
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={addMedicines}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showUpdate} onHide={handleCloseUpdate}>
        <Modal.Header closeButton>
          <Modal.Title>UPDATE MEDICINES</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <input type="text"
                       placeholder="medicine name"
                       name="name"
                       value={inputs.name}
                       onChange={e => onChange(e)} />

                <input type="integer"
                       placeholder="stocks"
                       name="stocks"
                       value={inputs.stocks}
                       onChange={e => onChange(e)} />

       
              
         
                
               

                
                
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
    </div>
  );
};


export default DisplayMedicines;
