import React, { useEffect, useState } from "react";
import './displayFeeds.css';
import Feed from "./Feed";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const DisplayFeeds = () => {
    // const [stock, setStocks] = useState([])
    const [feeds, setFeeds] = useState ([])
    const [inputs, setInputs] = useState({
        name: "",
        stock: 0
    });
    const[editable, setEditable] = useState([])
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
        
   


    const onChange = e => {
        setInputs({ ...inputs, [e.target.name]: e.target.value})
    };

    const getFeeds = async () => {
        try {
            const response = await fetch (
                "http://localhost:8000/feeds",{
                    method: "GET",
                    headers: { Authorization:localStorage.getItem('token') }
                }
            )
            const parseRes = await response.json();
            const feedsLength = parseRes.length;
            const feedEditable = new Array(feedsLength).fill("false");
            setEditable(feedEditable);
            console.log(parseRes)
            setFeeds(parseRes)
        } catch (error) {
            console.log(error)
        }
    }

    const addFeeds = async (e) => {
        e.preventDefault()
        try {

            const body = { name: inputs.name, stocks: inputs.stock }
            console.log(body)
            const response = await fetch (
                "http://localhost:8000/feeds",{
                    method: "POST",
                    headers: {"Content-type": "application/json",
                     Authorization:localStorage.getItem('token') },
                    body: JSON.stringify(body)
                }
            )
            const parseRes = await response.json()
            setFeeds(curFeeds => [...curFeeds, { name: inputs.name, stocks: inputs.stock }])
            console.log(parseRes)
        
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getFeeds();
    },[])

  
    const fn = index => {
        let newEditable = editable.slice();
        console.log(index); 
        newEditable[index] = "true";
        console.log(editable);
        setEditable(newEditable);
        console.log(editable);
    };

    return (
        <> <Button variant="primary" onClick={handleShow}>
        Add Feeds
       </Button>
      
           
            <div>

            {/* <div className="feed-container">
                {feeds.map((feed, index) => {
                 return (
                    <div className="feed-item"> 
                        <Feed id={feed.name_id} stocks={feed.stocks} name={feed.name}/>
                    </div>
                 )
                } )}
            </div> */}
        </div>
        <table style={{background:"white"}} class="table">
  <thead class="thead-dark">
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Name</th>
      <th scope="col">Stock</th>
     
    </tr>
  </thead>
  <tbody>
    {feeds.map(feed => {
        return(<tr>
            <th scope="row">{feed.name_id}</th>
            <td>{feed.name}</td>
            <td>{feed.stocks}</td>
            
           
          </tr>
          )

    })}
    
      
  </tbody>
</table>
<Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body><form onSubmit={addFeeds}>
        <input type="text"
                       placeholder="feed name"
                       name="name"
                       value={inputs.name}
                       onChange={e => onChange(e)} />

                <input type="integer"
                       placeholder="stock"
                       name="stock"
                       value={inputs.stock}
                       onChange={e => onChange(e)} />
                
               

                
                
            </form></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={addFeeds}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>



        </>
    )

}


export default DisplayFeeds;