import React, { useState } from "react";
import "../css/style.css";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8080/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setSuccessMessage("Your message has been sent successfully!");
                setFormData({ name: "", email: "", subject: "", message: "" });
                setErrorMessage("");
            } else {
                setErrorMessage("Failed to send your message. Please try again.");
                setSuccessMessage("");
            }
        } catch (error) {
            setErrorMessage("An error occurred. Please try again later.");
            setSuccessMessage("");
        }
    };

    return (
        <div className="container-fluid contact bg-light py-5">
            <div className="container py-5">
                <div className="mx-auto text-center mb-5" style={{ maxWidth: "900px" }}>
                    <h5 className="section-title px-3">Contact Us</h5>
                    <h1 className="mb-0">Contact For any feedback</h1>
                </div>
                <div className="row g-5 align-items-center">
                    <div className="col-lg-4">
                        <div className="bg-white rounded p-4">
                            <div className="text-center mb-4">
                                <i className="fas fa-map-marker-alt fa-3x text-primary"></i>
                                <h4 className="text-primary">Address</h4>
                                <p className="mb-0">Kigali City, Rwanda</p>
                            </div>
                            <div className="text-center mb-4">
                                <i className="fas fa-phone-alt fa-3x text-primary mb-3"></i>
                                <h4 className="text-primary">Mobile</h4>
                                <p className="mb-0">+250785206973</p>
                            </div>
                            <div className="text-center">
                                <i className="fa fa-envelope-open fa-3x text-primary mb-3"></i>
                                <h4 className="text-primary">Email</h4>
                                <p className="mb-0">Levis@gmail.com</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <h3 className="mb-2">Send us a message</h3>
                        <p className="mb-4">
                            Fill in the form below to share your feedback. We value your thoughts!
                        </p>
                        <form onSubmit={handleSubmit}>
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <div className="form-floating">
                                        <input
                                            type="text"
                                            className="form-control border-0"
                                            id="name"
                                            name="name"
                                            placeholder="Your Name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                        />
                                        <label htmlFor="name">Your Name</label>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-floating">
                                        <input
                                            type="email"
                                            className="form-control border-0"
                                            id="email"
                                            name="email"
                                            placeholder="Your Email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                        <label htmlFor="email">Your Email</label>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-floating">
                                        <input
                                            type="text"
                                            className="form-control border-0"
                                            id="subject"
                                            name="subject"
                                            placeholder="Subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            required
                                        />
                                        <label htmlFor="subject">Subject</label>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-floating">
                                        <textarea
                                            className="form-control border-0"
                                            id="message"
                                            name="message"
                                            placeholder="Leave a message here"
                                            style={{ height: "160px" }}
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                        ></textarea>
                                        <label htmlFor="message">Message</label>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <button className="btn btn-primary w-100 py-3" type="submit">
                                        Send Message
                                    </button>
                                </div>
                            </div>
                        </form>
                        {successMessage && (
                            <div className="alert alert-success mt-4">{successMessage}</div>
                        )}
                        {errorMessage && (
                            <div className="alert alert-danger mt-4">{errorMessage}</div>
                        )}
                    </div>
                    <div className="col-12">
                        <div className="rounded">
                            <iframe
                                className="rounded w-100"
                                style={{ height: "450px" }}
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15950.145836841859!2d30.07844745!3d-1.93787775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca6a40203f041%3A0x5f8434259d8c4393!2sKacyiru%2C%20Kigali!5e0!3m2!1sen!2srw!4v1722271949214!5m2!1sen!2srw"
                                width="400"
                                height="300"
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
