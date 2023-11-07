import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
const { TabPane } = Tabs;
import Loader from "../Loader";
import Error from "../Error";
import axios from "axios";
import moment from "moment";

function Profilescreen() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  useEffect(() => {
    if (!user) {
      window.location.href = "/login";
    }
  }, []);
  return (
    <div className="ml-3 mt-3">
      <Tabs defaultActiveKey="1">
        <TabPane tab="Profile" key="1">
          <h1>My Profile</h1>
          <br />
          <h1>Name : {user.name}</h1>
          <h1>Email : {user.email}</h1>
          <h1>isAdmin: {user.isAdmin ? "Yes" : "No"}</h1>
        </TabPane>
        <TabPane tab="Bookings" key="2">
          <MyBooking />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Profilescreen;
const user = JSON.parse(localStorage.getItem("currentUser"));

export function MyBooking() {
  const [bookings, setbookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchUserBookings = async () => {
      try {
        setLoading(true);
        const response = await axios.post(
          "http://localhost:5000/api/bookings/getbookingsbyuserid",
          {
            userid: user._id,
          }
        );
        const data = response.data;
        // console.log(data);
        setbookings(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(error);
      }
    };

    fetchUserBookings();
  }, []);
  return (
    <div>
      <div className="row">
        <div className="col-md-6">
          {loading && <Loader />}
          {bookings &&
            bookings.map((booking) => {
              return (
                <div className="bs">
                  <h1>{booking.room}</h1>
                  <p>
                    <b>Booking</b> : {booking._id}
                  </p>
                  <p>
                    <b>Check In</b> :{" "}
                    {moment(booking.fromdate).format("DD-MM-YYYY")}
                  </p>
                  <p>
                    <b>Check Out</b> :{" "}
                    {moment(booking.todate).format("DD-MM-YYYY")}
                  </p>
                  <p>
                    <b>Amount</b> : {booking.totalamount}
                  </p>
                  <p>
                    <b>Status</b> :{" "}
                    {booking.status === "booked" ? "CONFIRMED" : "CANCELED"}
                  </p>
                  <div className="text-right">
                    <button className="btn">CANCEL BOOKING</button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
