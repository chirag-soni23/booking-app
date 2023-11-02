import React, { useEffect, useState } from 'react';
import axios from "axios";
import Rooms from '../Rooms';
import Loader from '../Loader';
import Error from '../Error';

function Homescreen() {
    const [loading, setLoading] = useState(false); // Initialize loading state with false
    const [error, setError] = useState(false); // Initialize error state with false
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true); // Set loading state to true
                const data = (await axios.get('http://localhost:5000/api/rooms/getallrooms')).data; // Fetch data

                setRooms(data); // Update rooms state with the data
            
                setLoading(false); // Set loading state to false
            } catch (err) {
                setError(true); // Set error state to true
                console.log(err); // Log the error
                setLoading(false); // Set loading state to false
            }
        };

        fetchData(); // Call the async function to fetch data

    }, []);

    return (
        <div className='containser'>
        <div className='row justify-content-center mt-2 '>
            {loading ? (<h1><Loader/></h1>) : rooms.length>1 ?  (
                rooms.map((room) => {
                 return  <div className="col-md-9 mt-4">
                    <Rooms rooms ={room}/>
                   </div>
})
                ):(
                <Error/>
)}
        </div>
        </div>
    );
}

export default Homescreen;
