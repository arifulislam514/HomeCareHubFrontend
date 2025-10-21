import React from 'react';
import HeroSection from '../components/Home/HeroSection';
import AboutSection from '../components/Home/AboutSection';
import ReviewSection from '../components/Home/ReviewSection';
import HowItWorksSection from '../components/Home/HowItWorksSection';
import ExcellentService from '../components/Products/ExcellentService';

const Home = () => {
    return (
        <div>
            <HeroSection />
            <AboutSection />
            <ExcellentService />
            <HowItWorksSection />
            <ReviewSection />
            
        </div>
    );
};

export default Home;