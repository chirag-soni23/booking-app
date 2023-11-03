import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../Loader";
import Error from "../Error";
import moment from "moment";
import StripeCheckout from "react-stripe-checkout";

function BookingScreen() {
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
        setLoading(false);
      } catch (err) {
        setError(true);
        console.log(err);
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

  async function onToken(token) {
    const bookingDetails = {
      room,
      userid: JSON.parse(localStorage.getItem("currentUser"))._id,
      fromdate,
      todate,
      totalamount: totalAmount,
      totaldays: totalDays,
      token,
    };
    try {
      const result = await axios.post(
        'http://localhost:5000/api/bookings/bookroom',
        bookingDetails
      );
      // Handle the response if needed
    } catch (error) {
      console.error(error);
      // Handle the error if needed
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
                  <p>Rent per day:₹ {rentPerDay}</p>
                  <p>Total Amount:₹ {totalAmount}</p>
                </b>
              </div>
              <div style={{ float: "right" }}>
                <StripeCheckout
                  token={onToken}
                  amount={totalAmount * 100} // Convert amount to cents
                  currency="INR"
                  stripeKey="pk_test_51O8DSuSDHnOivO9dw4d5CZqJqDdc1lnVPkOKQmdYJLOT82aXVdiCpRZ2A91pZn6rgsE6e6lqBcXWbgYIGwuv1ijp00vL2YMevH"
                >
                  <button className="btn">Pay Now</button>
                </StripeCheckout>
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
