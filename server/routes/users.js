const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const usersmodel = require('../pages/usersmodel');
const adminsmodel = require('../pages/adminmodel');
const middleware = require('../middleware');
const nodemailer = require('nodemailer');

const otpmodel = require('../pages/otpmodel');
require("dotenv").config();

router.get('/test', (req, res) => res.send('book route testing!'));

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'mukil4058@gmail.com',
        pass: 'MUKIL@984'
    }
});

router.post('/register', async (req, res) => {
    const { username, email, password, confirmpassword } = req.body;
    const user = await usersmodel.findOne({ username });
    if (user) {
        return res.status(400).json({ message: "Username already exists" });
    }

    const isEmailDomainAllowed = (email) => {
        const allowedDomains = ['kongu.ac.in'];
        const domain = email.split('@')[1];
        return allowedDomains.includes(domain);
    };

    if (!isEmailDomainAllowed(email)) {
        return res.status(400).json({ message: "Email domain is not allowed" });
    }

    const userwithemail = await usersmodel.findOne({ email });
    if (userwithemail) {
        return res.status(400).json({ message: "Email already exists" });
    }

    if (password != confirmpassword) {
        return res.status(400).json({ message: "Passwords doesn't match" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new usersmodel({ username, email, password: hashedPassword });
    await newUser.save();

    return res.status(200).json({ message: "User registered Successfully" });
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    let user;

    // Check if email is provided
    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }

    // Find the user by email
    user = await usersmodel.findOne({ email });

    // If no user is found by email, return an error
    if (!user) {
        return res.status(400).json({ message: "No Existing User Found!" });
    }

    // Compare the provided password with the user's hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // If the password is invalid, return an error
    if (!isPasswordValid) {
        return res.status(400).json({ message: 'Email or Password is incorrect!' });
    }

    // If the credentials are valid, generate a token and return it
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: 36000000 });
    return res.status(200).json({ token });
});


router.post('/adminlogin', async (req, res) => {
    const { username, password } = req.body;
    const user = await adminsmodel.findOne({ username });
    if (!user) {
        return res.status(400).json({ message: "No Existing Admin Found!" });
    }
    const isPasswordValid = await adminsmodel.findOne({ password });
    if (!isPasswordValid) {
        return res.status(400).json({ message: 'Password is incorrect' });
    }
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: 36000000 });
    return res.status(200).json({ token });
});

router.post('/newadmin', middleware, async (req, res) => {
    let exist = await adminsmodel.findById(req.userid);
    if (!exist) {
        res.status(400).send('Admin not found');
    }
    const { username, password } = req.body;    
    try {
        const user = await adminsmodel.findOne({ username });
        if (!user) {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newAdmin = new adminsmodel({ username, password: hashedPassword });
            await newAdmin.save();
            return res.status(200).json({ message: "Admin added Successfully!" });
        }
        return res.status(400).json({ message: "Admin already exists!" });
    } catch (err) {
        return res.status(500).json({ "error": err });
    }
});
module.exports = router;
