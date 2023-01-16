import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import "./Pig.css"


const Pig = (props) => {
    console.log(props.sow)
    return (
        <div className="pig-card card" >
        <img src="https://cdn3.iconfinder.com/data/icons/avatars-9/145/Avatar_Pig-512.png" className="card-img-top" alt="pig icon"/>
        <div className="card-body">
        <h5 className="card-title">{props.name}</h5>
        <p className="card-text">{props.sow ? "sow": "hog"}</p>
        <a href="#" className="btn btn-primary">Go somewhere</a>
  </div>
</div>
    )
   
}

export default Pig;