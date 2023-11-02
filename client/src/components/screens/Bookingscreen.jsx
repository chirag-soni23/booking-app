import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../Loader";
import Error from "../Error";
import moment from "moment";

function BookingScreen(props) {
  const { roomid, fromdate, todate } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [room, setRoom] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.post(
          `http://localhost:5000/api/rooms/getroombyid`,
          { roomid: roomid }
        );
        const data = response.data;
        setRoom(data);
      } catch (err) {
        setError(true);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [roomid]);

  const fromDateObj = moment(fromdate, "DD-MM-YYYY");
  const toDateObj = moment(todate, "DD-MM-YYYY");
  const totalDays = toDateObj.diff(fromDateObj, "days");
  const rentPerDay = room ? room.rentperday : 0;
  const totalAmount = totalDays * rentPerDay;

  async function bookRoom() {
    try {
      const bookingDetails = {
        room,
        userid: JSON.parse(localStorage.getItem("currentUser"))._id,
        fromdate,
        todate,
        totalamount: totalAmount,
        totaldays: totalDays,
      };

      const result = await axios.post(
        'http://localhost:5000/api/bookings/bookroom',
        bookingDetails
      );
      
      // Check the response for success and handle it if needed
      if (result.data.success) {
        // Payment was successful, you can navigate to a success page or show a message
        alert("Payment was successful. Redirecting to success page...");
        // Redirect to a success page or do something else here
      } else {
        // Payment was not successful, handle the error
        alert("Payment failed. Please try again.");
      }
    } catch (error) {
      console.error(error);
      // Handle the error if needed
      alert("An error occurred while processing your payment.");
    }
  }

  return (
    <div className="m-5">
      {loading ? (
        <Loader />
      ) : room ? (
        <div>
          <div className="row justify-content-center mt-5 bs">
            <div className="col-md-6">
              <h1>{room.name}</h1>
              <img src={room.imageurls[0]} className="bigimg" alt="Room" />
            </div>
            <div className="col-md-6">
              <div style={{ textAlign: "right" }}>
                <h1>Booking details</h1>
                <hr />
                <b>
                  <p>Name: {JSON.parse(localStorage.getItem("currentUser")).name}</p>
                  <p>From Date: {fromDateObj.format("DD-MM-YYYY")}</p>
                  <p>To Date: {toDateObj.format("DD-MM-YYYY")}</p>
                  <p>Max Count: {room.maxcount}</p>
                </b>
              </div>

              <div style={{ textAlign: "right" }}>
                <b>
                  <h1>Amount</h1>
                  <hr />
                  <p>Total days: {totalDays}</p>
                  <p>Rent per day: {rentPerDay}</p>
                  <p>Total Amount: {totalAmount}</p>
                </b>
              </div>
              <div style={{ float: "right" }}>
                <button className="btn" onClick={bookRoom}>
                  Pay Now
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Error />
      )}
    </div>
  );
}

export default BookingScreen;
