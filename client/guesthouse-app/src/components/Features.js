import React from 'react';
import './features.css';

export default function Features() {
  return (
    <div id='about' className='Container-features'>
      <div className='about'>
        <div className='about_img'>
          <img src='https://www.kongu.ac.in/images/aboutkec.jpg' alt="Guest house" />
        </div>
        <div className='about_desc'>
          <div className="card">
            <h2 className='aboutushead'>ABOUT US</h2>
            <p className='textabout'>Kongu Engineering College (KEC) is an autonomous engineering college in Erode, Tamil Nadu, India, that was established in 1983.</p>
            <p className='textabout'>Kongu Engineering College establishes Center of Excellence (CoE) to enhance the skills and knowledge of students and faculty in various emerging technologies</p>
            <p className='textabout'>It offers full-time undergraduate, postgraduate, and doctorate programs. KEC is affiliated with Anna University and has an "A++" grade from the National Assessment and Accreditation Council. It's also recognized internationally for its professional and career-oriented education that combines theory and practice</p>
          </div>
        </div>
      </div>
      <div className='features'>
        <div><h2 className='aboutushead'>Facilities</h2></div>
        <div className='facilities'>
          <div>
            <ul>
              <li>AC Rooms</li>
              <li>Dining Hall</li>
              <li>Free High Speed Wi-fi Internet</li>
              <li>Work desk</li>
              <li>24 X 7 Medical Facility</li>
              <li>Hygienic Washroom</li>
            </ul>
          </div>
          <div>
            <ul>
              <li>24 X 7 CC TV Surveillance</li>
              <li>Restaurant</li>
              <li>Breakfast, Lunch, Dinner</li>
              <li>Mineral Water</li>
              <li>Dataport</li>
              <li>Water Purification System</li>
            </ul>
          </div>
          <div>
            <ul>
              <li>Car Parking</li>
              <li>Lush Green Campus</li>
              <li>24 X 7 Security service</li>
              <li>Telephone service</li>
              <li>Laundry service</li>
              <li>Tea making (in Room) facilities</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
