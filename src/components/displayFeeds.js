import React, { useEffect, useState } from "react";
import './displayFeeds.css';

const DisplayFeeds = () => {
    const [feeds, setFeeds] = useState ([])
    const [inputs, setInputs] = useState({
        feed: ""
    });

    const onChange = e => {
        setInputs({ ...inputs, [e.target.name]: e.target.value})
    };

    const {feed} = inputs
    const getFeeds = async () => {
        try {
            const response = await fetch (
                "http://localhost:8000/feeds",{
                    method: "GET",
                    headers: { Authorization:localStorage.getItem('token') }
                }
            )
            const parseRes = await response.json();
            console.log(parseRes)
            setFeeds(parseRes)
        } catch (error) {
            console.log(error)
        }
    }

    const addFeeds = async (e) => {
        e.preventDefault()
        try {

            const body = { feed }
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
            console.log(parseRes)
        
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getFeeds();
    },[])

    return (
        <div className ="display1">
            HELLO FEEDS

            <form onSubmit={addFeeds}>
                <input type="text"
                       placeholder="feed"
                       name="feed"
                       value={feed}
                       onChange={e => onChange(e)} />

                <button type="submit">add</button>
            </form>
            <div>{feeds.map(feed => {
                return <li><h1>{feed.name}</h1></li>

            } )}</div>
            </div>
    )

}


export default DisplayFeeds;