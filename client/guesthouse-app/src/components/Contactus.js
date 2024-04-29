import LocationOnIcon from '@mui/icons-material/LocationOn';
import MailIcon from '@mui/icons-material/Mail';
import PhoneIcon from '@mui/icons-material/Phone';
import { Box } from '@mui/material';
import React from 'react';
import Contactcomponent from './Contactcomponent';
import './contactus.css';

export default function Contactus() {
  return (
    <div id='contact'>
      <Box className='contact-details'>
        <Contactcomponent
          heading={"Address"}
          data={"Thoppupalayam, Kumaran Nagar, Perundurai, Tamil Nadu 638060 Kongu Engineering College, address"}
          className='hover-contact'
          sx={{ cursor: 'pointer', '&:hover': { transform: 'scale(1.05)' } }}
          icon={<LocationOnIcon sx={{ fontSize: '40px', fill: '#778075' }} />}
        />
        <Contactcomponent 
          heading={"Phone Number"} 
          data={"9965277765"} 
          icon={<PhoneIcon sx={{ fontSize: '40px', fill: '#778075' }} />}
        />
        <Contactcomponent 
          heading={"Email"} 
          data={"konguguesthouse.ac.in"}
          icon={<MailIcon sx={{ fontSize: '40px', fill: '#778075' }} />}
        />
      </Box>
    </div>
  );
}
