import React, { useEffect, useState } from "react";
import './displayFeeds.css';
import Feed from "./Feed";

const DisplayFeeds = () => {
    // const [stock, setStocks] = useState([])
    const [feeds, setFeeds] = useState ([])
    const [inputs, setInputs] = useState({
        name: "",
        stock: 0
    });
    const[editable, setEditable] = useState([])
        
   


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
        <div className ="display1">
            HELLO FEEDS

            <form className="add-feeds" onSubmit={addFeeds}>
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
                <button type="submit">add</button>

            </form>

            <div className="feed-container">
                {feeds.map((feed, index) => {
                 return (
                    <div className="feed-item"> 
                        <Feed id={feed.name_id} stocks={feed.stocks} name={feed.name}/>
                    </div>
                 )
                } )}
            </div>
        </div>
    )

}


export default DisplayFeeds;