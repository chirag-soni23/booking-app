import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import Rooms from "../Rooms";
import Loader from "../Loader";
import Error from "../Error";
import { DatePicker, Input } from "antd";

const { RangePicker } = DatePicker;
const { Search } = Input;

function Homescreen() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [fromdate, setFromdate] = useState(null);
  const [todate, setTodate] = useState(null);
  const [duplicaterooms, setDuplicatrooms] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const currentDate = moment().format("DD-MM-YYYY");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = (
          await axios.get("http://localhost:5000/api/rooms/getallrooms")
        ).data;
        setRooms(data);
        setDuplicatrooms(data);
        setLoading(false);
      } catch (err) {
        setError(true);
        console.log(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  function filterByDate(dates, dateStrings) {
    if (dateStrings && dateStrings.length === 2) {
      setFromdate(dateStrings[0]);
      setTodate(dateStrings[1]);
    } else {
      setFromdate(null);
      setTodate(null);
    }
  }

  function handleSearch(value) {
    setSearchQuery(value);
  }

  const filteredRooms = rooms.filter((room) => {
    return (
      (room.name && room.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (room.description && room.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-md-3">
          <RangePicker format="DD-MM-YYYY" onChange={filterByDate} />
        </div>
        <div className="col-md-3">
          <Search
            placeholder="Search rooms"
            onSearch={(value) => handleSearch(value)}
          />
        </div>
      </div>

      <div className="row justify-content-center mt-2">
        {loading ? (
          <Loader />
        ) : filteredRooms.length > 0 ? (
          filteredRooms.map((room) => (
            <div key={room._id} className="col-md-9 mt-4">
              <Rooms
                rooms={room}
                fromdate={fromdate}
                todate={todate}
                currentDate={currentDate}
              />
            </div>
          ))
        ) : (
          <p>No matching rooms found.</p>
        )}
      </div>
    </div>
  );
}

export default Homescreen;
