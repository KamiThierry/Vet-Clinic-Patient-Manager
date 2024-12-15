import React, { useState } from 'react';
import '../css/loginOut.css';
import logo from '../assets/images/logov.png';

const Register = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const validateForm = () => {
        const errors = {};
        let isValid = true;

        if (!fullName.trim() || fullName.trim().length < 2) {
            errors.fullName = 'Full name must be at least 2 characters';
            isValid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.trim() || !emailRegex.test(email.trim())) {
            errors.email = 'Please enter a valid email address';
            isValid = false;
        }

        if (!password || password.length < 6) {
            errors.password = 'Password must be at least 6 characters';
            isValid = false;
        }

        if (!role) {
            errors.role = 'Please select a role';
            isValid = false;
        }

        if (!termsAccepted) {
            errors.terms = 'You must agree to the terms and conditions';
            isValid = false;
        }

        setErrors(errors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        if (!validateForm()) return;

        setLoading(true);

        try {
            const registrationData = {
                username: fullName.trim(),
                email: email.trim(),
                password: password,
                role: role,
            };

            const response = await fetch('Endpoint_goes_here!!', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(registrationData),
            });

            const responseText = await response.text();

            let data;
            try {
                data = JSON.parse(responseText);
            } catch (parseError) {
                throw new Error(responseText || 'Invalid server response');
            }

            if (!response.ok) {
                throw new Error(data.message || 'Registration failed');
            }

            setSuccessMessage(data.message || 'Registration successful!');
            setTimeout(() => {
                window.location.href = '/';
            }, 2000);
        } catch (error) {
            console.error('Registration error:', error);
            setErrorMessage(error.message || 'An error occurred during registration');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-6 col-md-6 form-container">
                    <div className="col-lg-8 col-md-12 col-sm-9 form-box text-center">
                        <div className="logo mt-5 mb-3">
                            <a href="/">
                                <img src={logo} width="150px" alt="Logo" />
                            </a>
                        </div>
                        <h4>Create an account</h4>
                        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                        {successMessage && <div className="alert alert-success">{successMessage}</div>}
                        <form onSubmit={handleSubmit}>
                            <div className="form-input">
                                <input
                                    type="text"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    placeholder="Full Name"
                                    required
                                />
                                {errors.fullName && <div className="error-message">{errors.fullName}</div>}
                            </div>
                            <div className="form-input">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email Address"
                                    required
                                />
                                {errors.email && <div className="error-message">{errors.email}</div>}
                            </div>
                            <div className="form-input">
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Password"
                                    required
                                />
                                {errors.password && <div className="error-message">{errors.password}</div>}
                            </div>
                            <div className="form-input">
                                <select
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    required
                                >
                                    <option value="">Select Role</option>
                                    <option value="Veterinarian">Veterinarian</option>
                                    <option value="Nurse">Nurse</option>
                                    <option value="Receptionist">Receptionist</option>
                                </select>
                                {errors.role && <div className="error-message">{errors.role}</div>}
                            </div>
                            <div className="form-check mb-3">
                                <input
                                    type="checkbox"
                                    checked={termsAccepted}
                                    onChange={() => setTermsAccepted(!termsAccepted)}
                                    required
                                />
                                <label>
                                    I agree to the terms & conditions
                                </label>
                                {errors.terms && <div className="error-message">{errors.terms}</div>}
                            </div>
                            <button type="submit" className="btn btn-primary" disabled={loading}>
                                {loading ? 'Registering...' : 'Register'}
                            </button>
                            <p style={{ color: 'white' }}>Already have an account? <a href="/login" style={{ color: 'white' }}>Login here</a></p>
                        </form>
                    </div>
                </div>
                <div className="col-lg-6 col-md-6 d-none d-md-block image-container"></div>
            </div>
        </div>
    );
};

export default Register;
