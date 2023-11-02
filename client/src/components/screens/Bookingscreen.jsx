import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../Loader';

function BookingScreen() {
    const { roomid } = useParams(); // useParams hook ka istemal karke 'roomid' ko match karenge
    const [loading, setLoading] = useState(false); // Initialize loading state with false
    const [error, setError] = useState(false); // Initialize error state with false
    const [room, setRoom] = useState(null); // Initialize room state with null

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true); // Set loading state to true
                const response = await axios.post(`http://localhost:5000/api/rooms/getroombyid`, { roomid: roomid });
                const data = response.data; // Extract data from the response

                setRoom(data); // Update room state with the data
                setLoading(false); // Set loading state to false
            } catch (err) {
                setError(true); // Set error state to true
                console.log(err); // Log the error
                setLoading(false); // Set loading state to false
            }
        };

        fetchData(); // Call the async function to fetch data

    }, [roomid]); // Adding roomid as a dependency to the useEffect

    return (
        <div>
            <h1>Booking Screen</h1>
            <h1>Room id = {roomid}</h1>
            {loading ? <p><Loader/></p> : null}
            {error ? <p>Error occurred while fetching data.</p> : null}
            {room && (
                <div>
                    <p>Room Name: {room.name}</p>
                    <p>Room Type: {room.type}</p>
                    {/* Add more room information here */}
                </div>
            )}
        </div>
    );
}

export default BookingScreen;
