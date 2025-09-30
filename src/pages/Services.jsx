import React from 'react';
import ExcellentService from '../components/Products/ExcellentService';
import BookingSection from '../components/Products/BookingSection';
import FaqSection from '../components/Products/FaqSection';
import PartnersSection from '../components/Products/PartnersSection';
import PageBanner from '../layouts/PageBanner';


const Services = () => {
    return (
        <div>
            <PageBanner title="Services" breadcrumb="HOME // Services" />
            <ExcellentService />
            <BookingSection />
            <FaqSection />
            <PartnersSection />
        </div>
    );
};

export default Services;