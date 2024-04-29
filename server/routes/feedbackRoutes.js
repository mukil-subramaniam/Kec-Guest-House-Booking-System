// routes/feedbackRoutes.js

const express = require('express');
const router = express.Router();
const Feedback = require('../pages/Feedback.js');

// Route to handle feedback form submission
router.post('/', async (req, res) => {
  try {
    const { username, email, message } = req.body;

    // Create a new feedback object
    const newFeedback = new Feedback({
    username,
      email,
      message
    });

    // Save the feedback to the database
    await newFeedback.save();

    // Return success response
    return res.status(200).json({ success: true, message: 'Feedback submitted successfully' });
  } catch (error) {
    // Return error response if something goes wrong
    console.error(error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

module.exports = router;
