import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../Loader';
import Error from '../Error';


function BookingScreen() {
    const { roomid } = useParams(); 
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
        <div className='m-5'>
            {loading ? (
                <Loader />
            ) : room ? (
                <div>
                    <div className='row justify-content-center mt-5 bs'>
                        <div className='col-md-6'>
                            <h1>{room.name}</h1>
                            <img src={room.imageurls[0]} className='bigimg' alt="Room" />
                        </div>
                        <div className='col-md-6'>
                            <div style={{ textAlign: "right" }}>
                                <h1>Booking details</h1>
                                <hr />
                                <b>
                                    <p>Name: {room.name}</p>
                                    <p>From Date: {/* Add from date here */}</p>
                                    <p>To Date: {/* Add to date here */}</p>
                                    <p>Max Count: {room.maxcount}</p>
                                </b>
                            </div>

                            <div style={{ textAlign: "right" }}>
                                <b>
                                    <h1>Amount</h1>
                                    <hr />
                                    <p>Total days: {/* Calculate total days here */}</p>
                                    <p>Rent per day: {room.rentperday}</p>
                                    <p>Total Amount: {/* Calculate total amount here */}</p>
                                </b>
                            </div>
                            <div style={{float:"right"}}>
                                <button className='btn'>Pay Now</button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (<Error/>)}
        </div>
    );
}

export default BookingScreen;

