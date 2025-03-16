const express = require('express');
const router = express.Router();
const roommodel = require('../pages/roommodel');
const usersmodel = require('../pages/usersmodel');
const bookingsmodel = require('../pages/bookingmodel');
const middleware = require('../middleware');
const nodemailer = require('nodemailer');
const adminmodel = require('../pages/adminmodel');

// Create a transporter using Gmail's SMTP server
const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true, 
    auth: {
        user: "kecguesthouse3@gmail.com",
        pass: "csnchbhvifneterw",
    },
});

router.get('/', (req, res) => res.send('Hello'));

router.get('/bookings', middleware, async (req, res) => {
    let exist = await adminmodel.findById(req.userid);
    if (!exist) {
        return res.status(400).send('Admin not found');
    }
    const bookings = await bookingsmodel.find({});
    const changeroomsbynumber = async (item) => {
        const roomNumbers = [];
        for (const roomId of item.rooms) {
            const room = await roommodel.findById(roomId);
            roomNumbers.push(room.roomnumber);
        }
        item.rooms = roomNumbers;
    };

    try {
        await Promise.all(bookings.map(changeroomsbynumber));
        res.status(200).json({
            "Bookings": bookings
        });
    } catch (error) {
        res.status(500).json({ 'error': error });
    }
});

router.put('/approve', async (req, res) => {
    try {
        const booking = await bookingsmodel.findByIdAndUpdate(req.body.id, { status: "Approved" }, { new: true });
        const user = await usersmodel.findById(booking.userid.toString());
        const updateRoomsByNumber = async (booking) => {
            const roomNumbers = [];
            for (const roomId of booking.rooms) {
                const room = await roommodel.findById(roomId);
                roomNumbers.push(parseInt(room.roomnumber));
            }
            roomNumbers.sort();
            booking.rooms = roomNumbers;
        };
        await updateRoomsByNumber(booking);
        var mailOptions = {
            from: 'kecguesthouse3@gmail.com',
            to: booking.email,
            subject: `Regarding your booking status id: ${booking._id}`,
            text: `Congratulations!Your booking(id:${booking._id}) is approved and below is the summary of your booking.Hope you will have a good stay.
                Booken on:${booking.bookedon}
                First Name:${booking.firstname}
                Last Name:${booking.lastname}
                Email:${booking.email}
                Number of person:${booking.person}
                Address:${booking.address}
                Checkin:${booking.fromdate}
                Checkout:${booking.enddate}
                Rooms Allocated:${booking.rooms}
                Rooms Type:${booking.roomstype}
                Meal Plan:${booking.meals}
                Special Request:${booking.specialrequest}`
        };
        console.log(mailOptions);
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent Sucuessfull: ' + info.response);
            }
        });
        return res.status(200).json({ "Bookingdetail": booking });

    } catch (err) {
        res.status(400).json(err);
    }
});

router.put('/reject', async (req, res) => {
    try {
        const booking = await bookingsmodel.findByIdAndUpdate(req.body.id, { status: "Rejected" }, { new: true });
        const user = await usersmodel.findById(booking.userid.toString());
        var mailOptions = {
            from: 'kecguesthouse3@gmail.com',
            to: user.email,
            subject: `Regarding your booking status id: ${booking._id}`,
            text: `We are sorry for the inconvenience. Your booking(id:${booking._id}) booked on ${booking.bookedon} is rejected by the admin. You can try booking again or you can reach us.`
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        return res.status(200).json({ "Bookingdetail": booking });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/newbook', middleware, async (req, res) => {
    let exist = await adminmodel.findById(req.userid);
    if (!exist) {
        return res.status(400).send('Admin not found');
    }
    const { fname, lname, email, phonenumber, address, fromdate, enddate, person, rooms, roomstype, specialrequest, meal } = req.body;
    const room = await roommodel.find({ _id: { $in: rooms } });
    try {
        const booked = await new bookingsmodel({
            "firstname": fname,
            "lastname": lname,
            "email": email,
            "phonenumber": phonenumber,
            "fromdate": fromdate,
            "enddate": enddate,
            "person": person,
            "address": address,
            "rooms": rooms,
            "roomstype": roomstype,
            "specialrequest": specialrequest,
            "meals": meal,
            "status": "Approved"
        });
        const result = await booked.save();
        const bookingtopush = {
            _id: result._id
        };
        const pushbooking = async (item) => {
            item.booking.push(bookingtopush);
            await item.save();
        };
        room.forEach(pushbooking);
        return res.status(200).json({ message: "Booking created Successfully!" });
    } catch (err) {
        return res.status(500).json(err);
    }
});

module.exports = router;
