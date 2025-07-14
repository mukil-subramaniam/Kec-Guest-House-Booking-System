import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './bookingpage.css';
export default function Bookingpage({ details, setdetails, cookies }) {
    const [currentPage, setCurrentPage] = useState(0); // Current page index
    const [formDataList, setFormDataList] = useState([]); // Array to store form data
    const navigate = useNavigate();
    const handleNextPage = () => {
        setFormDataList((prevFormDataList) => [...prevFormDataList, details]);
        setdetails({
            Firstname: '',
            Lastname: '',
            Email: '',
            Phonenumber: '',
            Purpose: '',
            Address: '',
            Specialrequest: ''
        });
        setCurrentPage(currentPage + 1);
    };

    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
            setdetails(formDataList[currentPage - 1]);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setdetails((prevDetails) => ({
            ...prevDetails,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        try {
            setFormDataList((prevFormDataList) => [...prevFormDataList, details]);
            await axios.post('https://kec-guest-house-booking-system.onrender.com/bookings/book', formDataList, {
                headers: {
                    'x-token': cookies.access_token
                }
            });
            navigate('/success');
        } catch (error) {
            console.error('Error submitting form data:', error);
        }
    };

    return (
        <div>
            <div className='details_name'>Enter your details</div>
            <div className='form_submit_details'>
                <div className='formgrp'>
                    <label htmlFor='fn' style={{ color: '#1e1e1e' }}>First name<span style={{ color: 'red' }}>*</span></label>
                    <input id='fn' type="text" name='Firstname' value={details.Firstname} onChange={handleChange} required />
                </div>
                <div className='formgrp'>
                    <label htmlFor='ln' style={{ color: '#1e1e1e' }}>Last name<span style={{ color: 'red' }}>*</span></label>
                    <input id='ln' type="text" name='Lastname' value={details.Lastname} onChange={handleChange} required />
                </div>
                <div className='formgrp'>
                    <label htmlFor='em' style={{ color: '#1e1e1e' }}>Email<span style={{ color: 'red' }}>*</span></label>
                    <input id='em' type="text" name='Email' value={details.Email} onChange={handleChange} required />
                </div>
                <div className='formgrp'>
                    <label htmlFor='pn' style={{ color: '#1e1e1e' }}>Phone number<span style={{ color: 'red' }}>*</span></label>
                    <input id='pn' type="text" name='Phonenumber' value={details.Phonenumber} onChange={handleChange} required />
                </div>
                <div className='formgrp'>
                    <label htmlFor='pr' style={{ color: '#1e1e1e' }}>Purpose<span style={{ color: 'red' }}>*</span></label>
                    <input id='pr' type="text" name='Purpose' value={details.Purpose} onChange={handleChange} required />
                </div>
                <div className='formgrp'>
                    <label htmlFor='ad' style={{ color: '#1e1e1e' }}>Address<span style={{ color: 'red' }}>*</span></label>
                    <input id='ad' type="text" name='Address' value={details.Address} onChange={handleChange} required />
                </div>
                <div className='formgrp another'>
                    <label htmlFor='tr' style={{ color: '#1e1e1e' }}>Special request</label>
                    <textarea id="tr" name='Specialrequest' value={details.Specialrequest} onChange={handleChange}></textarea>
                </div>
            </div>
            {currentPage > 0 && <button className="new" onClick={handlePrevPage}>Previous</button>}
           
        </div>
    );
}
