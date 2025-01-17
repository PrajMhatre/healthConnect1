// src/components/Home/HomePage.js

import React from 'react';
import Navbar from '../Common/Navbar';
import Footer from '../Common/Footer';
import HeaderBar from '../Common/HeaderBar';
import HeroSection from './HeroSection'; // Importing HeroSection
import WhyChooseUs from './WhyChooseUs';
import Introduction from './Introduction'; // Importing Features

import './HomePage.css';

const HomePage = () => {
    return (
        <div className="home-page">
            <HeaderBar />
            <Navbar />
            {/* Hero Section */}
            <HeroSection />
            {/* Why Choose Us Section */}
            <WhyChooseUs />
            {/* Introduction Section */}
            <Introduction />

            <Footer />
        </div>
    );
};

export default HomePage;
