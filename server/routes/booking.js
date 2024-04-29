const express = require('express');
const router = express.Router();
const roommodel=require('../pages/roommodel');
const usersmodel = require('../pages/usersmodel');
const bookingsmodel=require('../pages/bookingmodel');
const middleware=require('../middleware')
var nodemailer = require('nodemailer');

router.get('/', (req, res) => res.send('/book/:userId--->all bookings and status'));
router.post('/book',middleware,async (req,res)=>{
  let exist=await usersmodel.findById(req.userid);
    if(!exist){
      return res.status(400).send('User not found')
    }
    const {details}=req.body;
    const rooms= await roommodel.find({_id:{$in :details.Rooms}})
    const user=await usersmodel.findById(req.userid)
    const booking=new bookingsmodel({
        'userid':user._id,
        "firstname":details.Firstname,
        "lastname":details.Lastname,
        "email":details.Email,
        "phonenumber":details.Phonenumber,
        "person":details.Adults,
        "address":details.Address,
        "fromdate":details.Fromdate,
        "enddate":details.Enddate,
        "rooms":details.Rooms,
        "roomstype":details.Roomstype,
        "specialrequest":details.Specialrequest,
        "meals":details.Meals,
    })
    const result=await booking.save()
    // console.log(result)
    const bookingtopush={
       _id:result._id
    }
    // console.log(bookingtopush)
    try{
        user.bookings.push(bookingtopush);
        await user.save()
        // console.log(rooms)
        
        const pushbooking =async(item,index)=>{
            item.booking.push(bookingtopush)
            await item.save();
        }
        rooms.forEach(pushbooking)
        return res.status(200).json({"BookingSummary":result})
    }
    catch(err){
        console.log(err)
        return res.status(400).json({"message":err})
    }
})
router.get('/book',middleware,async (req,res)=>{
    let exist=await usersmodel.findById(req.userid);
    if(!exist){
      return res.status(400).send('User not found')
    }
    const user=await usersmodel.findById(req.userid)
    const bookings = await bookingsmodel.find({ _id: { $in: user.bookings } });

    const changeroomsbynumber = async (item) => {
      const roomNumbers = [];
      for (const roomId of item.rooms) {
        const room = await roommodel.findById(roomId);
        roomNumbers.push(parseInt(room.roomnumber));
      }
      roomNumbers.sort()
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
})
router.get('/:room',middleware,async(req,res)=>{
    let exist=await usersmodel.findById(req.userid);
    if(!exist){
      return res.status(400).send('User not found')
    }
    const booking=await bookingsmodel.findById(req.params.room);
    try{
        res.status(200).json({"bookingdetail":booking})
    }
    catch(err){
        res.status(400).json(err)
    }
})

module.exports=router;