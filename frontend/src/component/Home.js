import React from 'react'
import img from "../images/railway.jpeg"
import Login from './Login';
const Home = () => {
    const backgroundStyle = {
        backgroundImage: `url(${img})`,
        backgroundSize: 'cover', // Ensures the image covers the entire background
        backgroundPosition: 'center', // Centers the image
        backgroundRepeat: 'no-repeat', // Prevents the image from repeating
        width: '100%',
        height: '100vh', // Makes the background cover the full viewport height
        position: 'relative',
        overflow: 'hidden',
    };

    const overlayStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.7 )', // Black color with 50% opacity
    };

    const contentStyle = {
        position: 'relative',
        color: 'white',
        width: '100%',
        height: '100%',
        paddingTop: '50px',
        zIndex: 2, // Ensures content is above the overlay
    };

    return (
        <div style={backgroundStyle}>
            <div style={overlayStyle}></div>
            <div className='d-flex align-item-center justify-content-center' style={contentStyle}>
                <Login/>
            </div>
        </div>
    );
};

export default Home;