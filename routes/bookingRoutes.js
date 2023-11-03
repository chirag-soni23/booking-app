const express = require('express');
const router = express.Router();
const Booking = require('../models/booking.js');
const Room = require("../models/room.js")
const moment = require('moment')
const { v4: uuidv4 } = require('uuid');
const stripe = require('stripe')("sk_test_51O8DSuSDHnOivO9dhP6QxxwYJQWF1j6k47ssLhknIidgkwsHf0ANnASXcc2v2TsbnoExHNlhTxXwHa4THQFMxamz00bA2EJyZV")

router.post('/bookroom', async (req, res) => {
    const {
        room,
        userid,
        fromdate,
        todate,
        totalamount,
        totaldays,
        token
    } = req.body;
    try {
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id
        })
        const payment = await stripe.charges.create({
            amount: totalamount * 100,
            customer: customer.id,
            currency: "inr",
            receipt_email: token.email


        }, {
            idempotencyKey: uuidv4()
        }
        )
        if(payment) {
            try {
                const newbooking = new Booking({
                    room: room.name,
                    roomid: room._id,
                    userid,
                    fromdate: moment(fromdate, "DD-MM-YYYY"),
                    todate: moment(todate, "DD-MM-YYYY"),
                    totalamount,
                    totaldays,
                    transactionid: '1234',
                });

                const booking = await newbooking.save();

                // Respond with a success message or the booking data
                const roomtemp = await Room.findOne({ _id: room._id })
                roomtemp.currentbookings.push({ bookingid: booking._id, fromdate: moment(fromdate, "DD-MM-YYYY"), todate: moment(todate, "DD-MM-YYYY"), userid: userid, status: booking.status })
                await roomtemp.save()
                // res.status(200).send({ message: 'Booking successful' });
            } catch (error) {
                console.error(error);
                // Handle the error and respond with an error message
                res.status(500).json({ error: 'An error occurred while booking the room' });
            }

        }
        res.send("Payment Successfull,Your Room is booked")

    } catch (error) {
        return res.status(400).json({ error })

    }




    // try {
    //     const newbooking = new Booking({
    //         room: room.name,
    //         roomid: room._id,
    //         userid,
    //         fromdate: moment(fromdate, "DD-MM-YYYY"),
    //         todate: moment(todate, "DD-MM-YYYY"),
    //         totalamount,
    //         totaldays,
    //         transactionid: '1234',
    //     });

    //     const booking = await newbooking.save();

    //     // Respond with a success message or the booking data
    //     const roomtemp = await Room.findOne({ _id: room._id })
    //     roomtemp.currentbookings.push({ bookingid: booking._id, fromdate: moment(fromdate, "DD-MM-YYYY"), todate: moment(todate, "DD-MM-YYYY"), userid: userid, status: booking.status })
    //     await roomtemp.save()
    //     res.status(200).send({ message: 'Booking successful' });
    // } catch (error) {
    //     console.error(error);
    //     // Handle the error and respond with an error message
    //     res.status(500).json({ error: 'An error occurred while booking the room' });
    // }
});

module.exports = router;
