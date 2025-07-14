import React from 'react';
import Logo from '../images/logo.jpg';
import './footer.css';
export default function Footer() {
  return (
    <div className='footert'>
      <div class='footer_about'>
            <img class="logof" src={Logo} alt="Logo"/>
            <h1 class='footn'>KONGU ENGINEERING COLLEGE</h1>
      </div>
      <div class='footer'>
            <div class='footlinks'>
                  <p class='heading_footer'>Get in Touch with us</p>
                  <ul>
                     <li class='lilist'><a href="#">0794725358</a></li>
                     <li class='lilist'><a href="#"><ion-icon name="mail-outline" class="footicons"></ion-icon>Kongu@ac.in</a></li>
                     <li class='lilist'><a href="#"><ion-icon name="location-outline" class="footicons"></ion-icon>
                     Kongu Engineering College Playground, Thoppupalayam, Perundurai - 638052
                     </a></li>
                  </ul>
             </div>

            <div class='footlinks'>
                <p class='heading_footer'>Quick Links</p>
                <ul class='ulist'>
                    <li class='lilist'><a href="/home">Home</a></li>
                    <li class='lilist'><a href="#contact">Contact us</a></li>
                    <li class='lilist'><a href="/Bookings">Bookings</a></li>
                    <li class='lilist'><a href="https://www.kongu.ac.in/">Official Website</a></li>
                </ul>
            </div>
                        
            <div clase='footlinks'>
                <p class='heading_footer'>Social Links</p>
                <ul>
                    <li class='lilist'><a href="#">Facebook</a></li>
                    <li class='lilist'><a href="#">Instagram</a></li>
                    <li class='lilist'><a href="#">Twitter</a></li>
                    <li class='lilist'><a href="#">Youtube</a></li>
                </ul>
            </div>
        </div>
    </div>
    
  )
}
