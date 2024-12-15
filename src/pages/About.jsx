import React from 'react';
import bg from '../assets/images/bg-vet.jpeg';
import '../css/style.css';

const About = () => {
    return (
        <div className="container-fluid about py-5">
            <div className="container py-5">
                <div className="row g-5 align-items-center">
                    {/* Left Image Section */}
                    <div className="col-lg-5">
                        <div
                            className="h-100"
                            style={{
                                border: '50px solid',
                                borderColor: 'transparent #27AE60 transparent #27AE60',
                            }}
                        >
                            <img
                                src={bg}
                                className="img-fluid w-100 h-100"
                                alt="About Section"
                            />
                        </div>
                    </div>

                    {/* Right Content Section */}
                    <div
                        className="col-lg-7"
                        style={{
                            background:
                                'linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), url(img/vet-bg.png)',
                        }}
                    >
                        <h5 className="section-about-title pe-3">About Us</h5>
                        <h1 className="mb-4">
                            Welcome to <span className="text-primary">VetCarePro</span>
                        </h1>
                        <p className="mb-4">
                            VetCarePro is your trusted partner in veterinary management, dedicated to ensuring
                            exceptional care for animals. We provide advanced tools to simplify operations,
                            enhance communication, and prioritize pet health.
                        </p>
                        <p className="mb-4">
                            Our platform streamlines appointment scheduling, health records management,
                            and diagnostics, empowering veterinarians to focus on delivering top-notch
                            care. Discover a comprehensive solution tailored for the well-being of pets
                            and their owners.
                        </p>
                        <div className="row gy-2 gx-4 mb-4">
                            <div className="col-sm-6">
                                <p className="mb-0">
                                    <i className="fa fa-arrow-right text-primary me-2"></i>
                                    Health Records Management
                                </p>
                            </div>
                            <div className="col-sm-6">
                                <p className="mb-0">
                                    <i className="fa fa-arrow-right text-primary me-2"></i>
                                    Appointment Scheduling
                                </p>
                            </div>
                            <div className="col-sm-6">
                                <p className="mb-0">
                                    <i className="fa fa-arrow-right text-primary me-2"></i>
                                    Telemedicine Support
                                </p>
                            </div>
                            <div className="col-sm-6">
                                <p className="mb-0">
                                    <i className="fa fa-arrow-right text-primary me-2"></i>
                                    Pet Wellness Tracking
                                </p>
                            </div>
                            <div className="col-sm-6">
                                <p className="mb-0">
                                    <i className="fa fa-arrow-right text-primary me-2"></i>
                                    Emergency Care Coordination
                                </p>
                            </div>
                        </div>
                        <a className="btn btn-primary rounded-pill py-3 px-5 mt-2" href="">
                            Read More
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
