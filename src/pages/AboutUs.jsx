import React from 'react';
import PageBanner from '../layouts/PageBanner';
import AboutAgencySection from '../components/AboutUs/AboutAgencySection';
import ServiceandPartnersSection from '../components/AboutUs/ServiceandPartnersSection';
import TeamSection from '../components/AboutUs/TeamSection';

const AboutUs = () => {
    return (
        <div>
            <PageBanner title="About us" breadcrumb="HOME // About" />
            <AboutAgencySection />
            <ServiceandPartnersSection />
            <TeamSection />
        </div>
    );
};

export default AboutUs;