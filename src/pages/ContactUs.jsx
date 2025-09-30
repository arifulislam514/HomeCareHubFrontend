import React from 'react';
import ContactSection from '../components/Contact/ContactSection';
import PageBanner from '../layouts/PageBanner';

const ContactUs = () => {
    return (
        <div>
            <PageBanner title="Contact us" breadcrumb="HOME // contact" />
            <ContactSection />
        </div>
    );
};

export default ContactUs;