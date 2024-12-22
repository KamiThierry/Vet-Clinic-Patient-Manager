import React from 'react';
import '../css/style.css';

const Services = () => {
    return (
        <div className="container-fluid bg-light service py-5">
            <div className="container py-5">
                {/* Section Title */}
                <div
                    className="mx-auto text-center mb-5"
                    style={{ maxWidth: '900px' }}
                >
                    <h5 className="section-title px-3">Services</h5>
                    <h1 className="mb-0">Our Veterinary Services</h1>
                </div>

                {/* Services Content */}
                <div className="row g-4">
                    {/* Left Column */}
                    <div className="col-lg-6">
                        <div className="row g-4">
                            {/* Service 1 */}
                            <div className="col-12">
                                <div className="service-content-inner d-flex align-items-center bg-white border border-primary rounded p-4 pe-0">
                                    <div className="service-content text-end">
                                        <h5 className="mb-4">Pet Health Checkups</h5>
                                        <p className="mb-0">
                                            Comprehensive health checkups to monitor your pet's overall
                                            well-being, detect potential issues early, and ensure they
                                            live a healthy and happy life.
                                        </p>
                                    </div>
                                    <div className="service-icon p-4">
                                        <i className="fa fa-heartbeat fa-4x text-primary"></i>
                                    </div>
                                </div>
                            </div>

                            {/* Service 2 */}
                            <div className="col-12">
                                <div className="service-content-inner d-flex align-items-center bg-white border border-primary rounded p-4 pe-0">
                                    <div className="service-content text-end">
                                        <h5 className="mb-4">Vaccination Services</h5>
                                        <p className="mb-0">
                                            Protect your pets from diseases with timely and effective
                                            vaccinations tailored to their specific needs and age.
                                        </p>
                                    </div>
                                    <div className="service-icon p-4">
                                        <i className="fa fa-syringe fa-4x text-primary"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="col-lg-6">
                        <div className="row g-4">
                            {/* Service 3 */}
                            <div className="col-12">
                                <div className="service-content-inner d-flex align-items-center bg-white border border-primary rounded p-4 ps-0">
                                    <div className="service-icon p-4">
                                        <i className="fa fa-paw fa-4x text-primary"></i>
                                    </div>
                                    <div className="service-content">
                                        <h5 className="mb-4">Surgery & Emergency Care</h5>
                                        <p className="mb-0">
                                            From routine surgeries to emergency care, our veterinary
                                            experts provide precise and compassionate treatment for
                                            your pets.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Service 4 */}
                            <div className="col-12">
                                <div className="service-content-inner d-flex align-items-center bg-white border border-primary rounded p-4 ps-0">
                                    <div className="service-icon p-4">
                                        <i className="fa fa-stethoscope fa-4x text-primary"></i>
                                    </div>
                                    <div className="service-content">
                                        <h5 className="mb-4">Dental Care</h5>
                                        <p className="mb-0">
                                            Ensure your pets maintain optimal oral health with our
                                            specialized dental care services, including cleaning and
                                            treatment of dental issues.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Button */}
                    <div className="col-12">
                        <div className="text-center">
                            <a className="btn btn-primary rounded-pill py-3 px-5 mt-2" href="">
                                Learn More
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Services;
