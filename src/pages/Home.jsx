import React from 'react';
import HeroSection from '../components/Home/HeroSection';
import AboutSection from '../components/Home/AboutSection';
import ServicesSection from '../components/Home/ServicesSection';
import ReviewSection from '../components/Home/ReviewSection';
import HowItWorksSection from '../components/Home/HowItWorksSection';

const Home = () => {
    return (
        <div>
            <HeroSection />
            <AboutSection />
            <ServicesSection />
            <HowItWorksSection />
            <ReviewSection />
            
        </div>
    );
};

export default Home;