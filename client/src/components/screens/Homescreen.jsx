import React, { useEffect, useState } from 'react';
import axios from "axios";
import moment from 'moment';
import Rooms from '../Rooms';
import Loader from '../Loader';
import Error from '../Error';
import { DatePicker } from 'antd';

const { RangePicker } = DatePicker;

function Homescreen() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [rooms, setRooms] = useState([]);
    const [fromdate, setFromdate] = useState(); // Initialize with null
    const [todate, setTodate] = useState(); // Initialize with null
    const [duplicaterooms ,setDuplicatrooms] = useState([])
    const currentDate = moment().format("DD-MM-YYYY"); // Get current date and format it

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const data = (await axios.get('http://localhost:5000/api/rooms/getallrooms')).data;
                setRooms(data);
                setDuplicatrooms(data)
                setLoading(false);
            } catch (err) {
                setError(true);
                console.log(err);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    function filterByDate(dates) {
        setFromdate(moment(dates[0]).format("DD-MM-YYYY"));
        setTodate(moment(dates[1]).format("DD-MM-YYYY"));
    }

    return (
        <div className='container'>
            <div className='row mt-5'>
                <div className="col-md-3">
                    <RangePicker format="DD-MM-YYYY" onChange={filterByDate} />
                </div>
            </div>

            <div className='row justify-content-center mt-2'>
                {loading ? (
                    <Loader />
                ) : rooms.length > 0 ? (
                    rooms.map((room) => (
                        <div key={room._id} className="col-md-9 mt-4">
                            <Rooms rooms={room} fromdate={fromdate} todate={todate} currentDate={currentDate} />
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
