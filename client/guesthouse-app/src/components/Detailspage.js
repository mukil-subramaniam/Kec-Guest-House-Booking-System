import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import './detailspage.css';

export default function Detailspage({ accomodation, details, setdetails }) {
  const navigate = useNavigate();
  const [cookies] = useCookies(['access_token']);
  const [roomstoselect, setRoomstoselect] = useState([]);
  const savedCheckin = sessionStorage.getItem('checkin');
  const savedCheckout = sessionStorage.getItem('checkout');

  useEffect(() => {
    if (!cookies.access_token) {
      navigate('/');
    }
  }, [cookies.access_token, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allrooms = await axios.get("https://kec-guest-house-booking-system.onrender.com/rooms/allrooms", {
          headers: {
            'x-token': cookies.access_token
          }
        });

        const filterroom = async (room) => {
          // Retrieve room availability logic here
          try {
            // Assuming room.booking is an array of booking details
            for (const booking of room.booking) {
              const fromdate = new Date(booking.fromdate);
              const enddate = new Date(booking.enddate);
              const savedCheckinObj = new Date(savedCheckin);
              const savedCheckoutObj = new Date(savedCheckout);
        
              if (
                (fromdate <= savedCheckoutObj && fromdate >= savedCheckinObj) ||
                (enddate >= savedCheckinObj && enddate <= savedCheckoutObj) ||
                (savedCheckinObj <= enddate && savedCheckinObj >= fromdate) ||
                (savedCheckoutObj >= fromdate && savedCheckoutObj <= enddate)
              ) {
                if (booking.status === "Approved" || booking.status === "Pending") {
                  return true; // Room is available
                } else {
                  return false; // Room is booked or cancelled
                }
              }
            }
            // If no overlapping bookings found, room is available
            return true;
          } catch (error) {
            console.error("Error filtering room availability:", error);
            return false; // Assume room is unavailable in case of error
          }
        };
        

        const filterRoomsWithAvailability = async (rooms) => {
          const roomsWithAvailability = await Promise.all(
            rooms.map(async (room) => {
              const isValid = await filterroom(room);
              if (isValid) {
                return room;
              }
              return null;
            })
          );
          return roomsWithAvailability.filter(Boolean);
        };

        const newdeluxerooms = await filterRoomsWithAvailability(allrooms.data.alldeluxerooms);
        const newsinglerooms = await filterRoomsWithAvailability(allrooms.data.allsinglerooms);
        const newdoublerooms = await filterRoomsWithAvailability(allrooms.data.alldoublerooms);

        // Set roomstoselect based on the accomodation type
        if (accomodation === 0) {
          setRoomstoselect(newdoublerooms);
        } else if (accomodation === 1) {
          setRoomstoselect(newsinglerooms);
        } else if (accomodation === 2) {
          setRoomstoselect(newdeluxerooms);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        // Handle error fetching data
      }
    };

    fetchData();
  }, [accomodation, cookies.access_token, navigate]);

  const handleChange = (event) => {
    setdetails({ ...details, [event.target.name]: event.target.value });
  };

  const handleRoomSelection = (event) => {
    const roomId = event.target.value;
    setdetails((prevDetails) => {
      const updatedRooms = prevDetails.Rooms.includes(roomId)
        ? prevDetails.Rooms.filter((room) => room !== roomId)
        : [...prevDetails.Rooms, roomId];
      return { ...prevDetails, Rooms: updatedRooms };
    });
  };

  return (
    <div>
      <div className='details_name'>Enter the details</div>
      <div className='adults'>
        <label htmlFor="adults">Number of Person:<span style={{ color: 'red' }}>*</span> :</label>
        <select id="adults" name="Adults" value={details.Adults} onChange={handleChange}>
          {[1, 2, 3, 4, 5].map((count) => (
            <option key={count} value={count}>{count}</option>
          ))}
        </select>
      </div>
      <div className='selectrooms'>
        <p className='chrm'>Choose rooms from below<span style={{ color: 'red' }}>*</span> :</p>
        <div>
          {roomstoselect.length ? (
            roomstoselect.map((room) => (
              <div className='checkbox' key={room._id}>
                <input
                  type="checkbox"
                  id={room._id}
                  name='Rooms'
                  value={room._id}
                  onChange={handleRoomSelection}
                  checked={details.Rooms.includes(room._id)}
                />
                <label htmlFor={room._id}>{room.roomnumber}</label><br />
              </div>
            ))
          ) : (
            <div className='loading'><div className="loader"></div>Loading...</div>
          )}
        </div>
      </div>
      <div className='radio_btns'>
        <p className='plan'>Your Meal Plan<span style={{ color: 'red' }}>*</span></p>
        {['Room Only', 'Breakfast', 'Brunch (Breakfast and Lunch)', 'Three square meals'].map((meal) => (
          <div key={meal}>
            <input
              type="radio"
              name="Meals"
              value={meal}
              checked={details.Meals === meal}
              onChange={handleChange}
            />
            {meal}<br />
          </div>
        ))}
      </div>
    </div>
  );
}
