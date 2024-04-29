import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './query.css';

export default function Query() {
  const [rows, setRows] = useState(6);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 586) {
        setRows(4);
      } else {
        setRows(6);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8082/submit-feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: e.target.elements['first-name'].value, // Add the username field
          email: e.target.elements['e-mail'].value,
          message: e.target.elements['message'].value,
        }),
      });
      const data = await response.json();
      if (data.success) {
        toast.success('Feedback submitted successfully');
        // Optionally, reset the form or clear input fields
      } else {
        toast.error('Failed to submit feedback');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast.error('Failed to submit feedback');
    }
  };

  return (
    <div className='query-form-container'>
      <div className='query-form'>
        <h2 className='aboutushead'>Feedback</h2>
        <form onSubmit={handleSubmit} className='query-input-container'>
          <div className='query-input'>
            <input type='text' name="first-name" id="first-name" autoComplete='off' placeholder='Enter your Username' required />
          </div>
          <div className='query-input'>
            <input type='email' name="e-mail" id="e-mail" autoComplete='off' placeholder='Enter your Email' required />
          </div>
          <div className='query-input'>
            <textarea rows={rows} name="message" id="message" placeholder="Enter your message" autoComplete='off' required ></textarea>
          </div>
          <div className='query-btn'>
            <input type='submit' value="Submit" />
          </div>
        </form>
      </div>
      <div className='map-container'>
        <div className="mapouter">
          <div className="gmap_canvas">
            <iframe
              width="100%"
              height="100%"
              id="gmap_canvas"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3912.8261113349427!2d77.60446317452322!3d11.274189549816288!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba96d7810fe32d5%3A0x85cf49c5b26fb72e!2sKongu%20Engineering%20College!5e0!3m2!1sen!2sin!4v1712943920875!5m2!1sen!2sin"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="map"
            >
            </iframe>
            <a href="https://2yu.co">2yu</a><br />
            <a href="https://embedgooglemap.2yu.co/">html embed google map</a>
          </div>
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}
