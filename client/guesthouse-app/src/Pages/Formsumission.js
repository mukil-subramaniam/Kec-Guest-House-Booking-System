import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import Bookingpage from '../components/Bookingpage';
import Detailspage from '../components/Detailspage';

export default function FormSubmission({ accomodation }) {
  const navigate = useNavigate();
  const [cookies] = useCookies(['access_token']);
  useEffect(() => {
    if (!cookies.access_token) {
      navigate('/');
    }
  });

  const savedCheckin = sessionStorage.getItem('checkin');
  const savedCheckout = sessionStorage.getItem('checkout');

  const [page, setPage] = useState(0);
  const [errf, setDispErrf] = useState(false);
  const [maxLim, setMaxLim] = useState(false);

  const [details, setDetails] = useState({
    Firstname: '',
    Lastname: '',
    Email: '',
    Phonenumber: '',
    Purpose: '',
    Address: '',
    Specialrequest: '',
    Adults: '1',
    Meals: 'Room Only',
    Rooms: [],
    Roomstype: [],
    Fromdate: savedCheckin,
    Enddate: savedCheckout
  });

  const getForm = () => {
    if (page === 0) {
      return <Detailspage accomodation={accomodation} details={details} setdetails={setDetails} />;
    } else {
      return <Bookingpage details={details} setdetails={setDetails} />;
    }
  };

  const submitHandle = async (e) => {
    e.preventDefault();

    if (parseInt(details.Adults) < details.Rooms.length) {
      setMaxLim(true);
      return;
    } else {
      setMaxLim(false);
    }

    if (
      details.Firstname === '' ||
      details.Lastname === '' ||
      details.Address === '' ||
      details.Email === '' ||
      details.Phonenumber === '' ||
      details.Purpose === '' ||
      details.Rooms.length === 0
    ) {
      setDispErrf(true);
      return;
    } else {
      setDispErrf(false);
    }

    if (accomodation === 0) {
      details.Roomstype = ['Double'];
    } else if (accomodation === 1) {
      details.Roomstype = ['Single'];
    } else if (accomodation === 2) {
      details.Roomstype = ['Deluxe'];
    }

    try {
      const result = await axios.post(
        'https://kec-guest-house-booking-system.onrender.com/bookings/book',
        { details },
        {
          headers: {
            'x-token': cookies.access_token
          }
        }
      );
      navigate('/Bookings');
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className='searchresultcont'>
      <div>
        <p className='avaibile'>Check Availability!</p>
      </div>
      <div className='searchresultsinfo'>
        <p>Checkin: {savedCheckin}</p>
        <p>Checkout: {savedCheckout}</p>
        <button onClick={() => navigate('/booknow')}>Change Search</button>
      </div>
      <div className='searchresultsdesc'>
        {getForm()}
        <div>
          <p style={{ color: 'red', display: errf ? 'block' : 'none', marginBottom: '20px' }}>
            Please fill all the required(*) details!
          </p>
          <p style={{ color: 'red', display: maxLim ? 'block' : 'none', marginBottom: '20px' }}>
            Number of Adults cannot exceed the number of rooms chosen!
          </p>
          <button onClick={() => (page !== 0 ? setPage((currPage) => currPage - 1) : navigate('/booknow/rooms'))} className='acbtn' id='prev'>
            Previous
          </button>
          <button style={{ display: page === 1 ? 'none' : 'inline-block' }} onClick={() => setPage((currPage) => currPage + 1)} className='acbtn'>
            Next
          </button>
          <button style={{ display: page !== 1 ? 'none' : 'inline-block' }} onClick={submitHandle} className='acbtn'>
            Book Now!
          </button>
        </div>
      </div>
    </div>
  );
}
