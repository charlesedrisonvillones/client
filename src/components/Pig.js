import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./Pig.css";

const Pig = (props) => {
  const [inputs, setInputs] = useState({
    weight: props.weight,
  });
  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
  const editPigs = async (e) => {
    e.preventDefault();
    try {
      const body = { id: props.id, weight: inputs.weight };
      console.log(body);
      const response = await fetch("http://localhost:8000/api/editPigs", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify(body),
      });
      const parseRes = await response.json();

      console.log(parseRes);
    } catch (error) {
      console.log(error);
    }
  };

const deletePigs  = async (e) => {
  e.preventDefault()
  try {
  const response = await fetch (
      `http://localhost:8000/api/pigs/${props.id}`,{
          method: "DELETE",
          headers: {"Content-type": "application/json",
          Authorization:localStorage.getItem('token') },
          
        }
    )
    const parseRes = await response.json()
    
    console.log(parseRes)

} catch (error) {
    console.log(error)
}
        
   
};

  return (
    <div className="pig-card card">
      <img
        src="https://cdn3.iconfinder.com/data/icons/avatars-9/145/Avatar_Pig-512.png"
        className="card-img-top"
        alt="pig icon"
      />
      <div className="card-body">
        <h5 className="card-title">{props.name}</h5>
        <p className="card-text">{props.sow ? "sow" : "hog"}</p>

        <form className="add-pigs" onSubmit={editPigs}>
          <div className="input-group">
            <input
              type="number"
              className="form-control"
              placeholder="weight"
              aria-label="pigs weight"
              name="weight"
              value={inputs.weight}
              onChange={e => onChange(e)}
              aria-describedby="basic-addon2"
            />
            <div className="input-group-append mt-3"  >
              <span className="input-group-text p-3" id="basic-addon2">
               kg
              </span>
            </div>
          </div>
          <button type="submit">save</button>
          <button onClick={e => deletePigs(e)}>delete</button>
        </form>
      </div>
    </div>
  );
};

export default Pig;
