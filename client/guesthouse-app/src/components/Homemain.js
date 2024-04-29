import React, { useEffect, useRef, useState } from 'react';
import { FaLongArrowAltRight } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import './homemain.css';

export default function Homemain() {
    const imageUrls = [
        `url('https://timess3spore.s3.amazonaws.com/ndata/media/Counsellor/CollegeImage/2023/04/23/1682252086.jpg')`,
        `url('https://www.kongu.ac.in/facilities/accommodation/guesthouse.jpg')`,
        `url('https://images.shiksha.com/mediadata/images/1520420083phpyKP3vR.jpeg')`,
        // Add more image URLs as needed
    ];
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const navigate = useNavigate();
    const iframeRef = useRef(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === imageUrls.length - 1 ? 0 : prevIndex + 1
            );
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    const currentImageUrl = imageUrls[currentImageIndex];

    const handleTakeTour = () => {
        const tourWindow = window.open("https://mukil-subramaniam.github.io/360-Degree-Image-Viewer/", "_blank");
        if (tourWindow) {
            // Render an exit button in the new tab's content
            tourWindow.document.body.innerHTML = `
                <div style="background-color: rgba(0, 0, 0, 0.3); height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; color: #fff;">
                    <h1>Welcome to KONGU ENGINEERING COLLEGE</h1>
                    <h2>Have a nice Stay!</h2>
                    <button style="margin-top: 20px; padding: 10px 20px; background-color: #f66524; color: #fff; border: none; border-radius: 5px; font-size: 20px; cursor: pointer;" onclick="window.close()">Exit</button>
                </div>
            `;
        }
    };

    return (
        <div className='main_img' style={{ backgroundImage: currentImageUrl }}>
            <div className='overlay'>
                <h1>Welcome to <span className='nameres'>KONGU ENGINEERING COLLEGE</span></h1>
                <h2>Have a nice Stay!</h2>
                <div>
                    <button className='overlay_btn book-now-btn' onClick={() => { window.scrollTo(0, 0); navigate('/booknow') }}>
                        Book Now
                        <span>
                            <FaLongArrowAltRight className='arrow' />
                        </span>
                    </button>
                    <button className='overlay_btn take-tour-btn' onClick={handleTakeTour}>
                        Take a tour
                        <span>
                            <FaLongArrowAltRight className='arrow' />
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
}
