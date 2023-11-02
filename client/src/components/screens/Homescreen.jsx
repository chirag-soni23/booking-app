import React, { useEffect, useState } from 'react';
import axios from "axios";
import Rooms from '../Rooms';
import Loader from '../Loader';
import Error from '../Error';

function Homescreen() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const data = (await axios.get('http://localhost:5000/api/rooms/getallrooms')).data;
                setRooms(data);
                setLoading(false);
            } catch (err) {
                setError(true);
                console.log(err);
                setLoading(false);
            }
        };

        fetchData();

    }, []);

    return (
        <div className='container'>
            <div className='row justify-content-center mt-2'>
                {loading ? (
                    <Loader />
                ) : rooms.length > 0 ? (
                    rooms.map((room) => (
                        <div key={room._id} className="col-md-9 mt-4"> {/* Add a key to the div */}
                            <Rooms rooms={room} />
                        </div>
                    ))
                ) : (
                    <Error />
                )}
            </div>
        </div>
    );
}

export default Homescreen;
