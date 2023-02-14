import React, { useEffect, useState } from "react";
import './displayFeeds.css';
import Feed from "./Feed";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const initialState = {
  name: "",
  stocks: 0
};

const DisplayFeeds = () => {
    // const [stock, setStocks] = useState([])
    const [feeds, setFeeds] = useState ([])
    const [inputs, setInputs] = useState(initialState)
    const[editable, setEditable] = useState([])
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [showUpdate, setShowUpdate] = useState(false);

    const handleCloseUpdate = () => setShowUpdate(false);
    const handleShowUpdate = () => setShowUpdate(true);
        
   


    const onChange = e => {
        setInputs({ ...inputs, [e.target.name]: e.target.value})
    };

    const getFeeds = async () => {
        try {
            const response = await fetch (
                "http://localhost:8000/api/feeds",{
                    method: "GET",
                    headers: { Authorization:localStorage.getItem('token') }
                }
            )
            const parseRes = await response.json();
            const feedsLength = parseRes.length;
            const feedEditable = new Array(feedsLength).fill("false");
            // setEditable(feedEditable);
            console.log(parseRes)
            const newData = parseRes.sort((a,b) => a.name_id - b.name_id)
            setFeeds(newData)
        } catch (error) {
            console.log(error)
        }
    }

    const addFeeds = async (e) => {
        e.preventDefault()
        try {

            const body = { name: inputs.name, stocks: inputs.stocks }
            console.log(body)
            const response = await fetch (
                "http://localhost:8000/api/feeds",{
                    method: "POST",
                    headers: {"Content-type": "application/json",
                     Authorization:localStorage.getItem('token') },
                    body: JSON.stringify(body)
                }
            )
            const parseRes = await response.json()
            getFeeds()
            setInputs(initialState)
            handleClose()
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

    const updateFeed = (name_id) => {
        
        const data = feeds.find(feed => feed.name_id === name_id )
        console.log(data)
        setInputs(data)
        setShowUpdate(true)
    }

    const update = async (e) => {
        e.preventDefault()
        try {

            const body = { name_id: inputs.name_id, stocks: inputs.stocks }
            console.log(body)
            const response = await fetch (
                "http://localhost:8000/api/editFeeds",{
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

    const deleteFeed = async (name_id) => {
       
        try {
                const response = await fetch (
                `http://localhost:8000/api/feeds/${name_id}`,{
                    method: "DELETE",
                    headers: {"Content-type": "application/json",
                     Authorization:localStorage.getItem('token') },
                    
                }
            )
            
           getFeeds()
        
        } catch (error) {
            console.log(error)
        }
    }

  

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
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
    {feeds.map(feed => {
        return(<tr>
            <th scope="row">{feed.name_id}</th>
            <td>{feed.name}</td>
            <td>{feed.stocks}</td>
            <td> <Button variant="success" onClick={()=> updateFeed(feed.name_id)}>Update</Button><Button variant="danger" onClick={()=> deleteFeed(feed.name_id)}>Delete</Button></td>

            
           
          </tr>
          )

    })}
    
      
  </tbody>
</table>
<Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>ADD FEED</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text"
                       placeholder="feed name"
                       name="name"
                       value={inputs.name}
                       onChange={e => onChange(e)} />
        
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Stocks</Form.Label>
        <Form.Control type="integer"
                       placeholder="stocks"
                       name="stocks"
                       value={inputs.stocks}
                       onChange={e => onChange(e)}  />
      </Form.Group>

      
      
        
     
    </Form>
            {/* <form onSubmit={addFeeds}>
        <input type="text"
                       placeholder="feed name"
                       name="name"
                       value={inputs.name}
                       onChange={e => onChange(e)} />

                <input type="integer"
                       placeholder="stocks"
                       name="stocks"
                       value={inputs.stocks}
                       onChange={e => onChange(e)} />
                
               

                
                
            </form> */}
            </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={addFeeds}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showUpdate} onHide={handleCloseUpdate}>
        <Modal.Header closeButton>
          <Modal.Title>UPDATE FEED</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <input type="text"
                       placeholder="feed name"
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




        </>
    )

}


export default DisplayFeeds;