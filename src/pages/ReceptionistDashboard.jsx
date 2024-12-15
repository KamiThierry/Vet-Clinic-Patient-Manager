import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ReceptionistDashboard = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [newPatient, setNewPatient] = useState({
        name: '',
        contact: '',
        reason: '',
        doctor: ''
    });

    const overviewCards = [
        { title: "Today's Appointments", value: 42, color: "primary" },
        { title: "Check-Ins Pending", value: 12, color: "warning" },
        { title: "New Registrations", value: 7, color: "success" },
        { title: "Messages", value: 5, color: "info" },
    ];

    const handleNewPatientChange = (e) => {
        const { name, value } = e.target;
        setNewPatient((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleNewPatientSubmit = (e) => {
        e.preventDefault();
        console.log('New Patient Registration:', newPatient);
        setNewPatient({
            name: '',
            contact: '',
            reason: '',
            doctor: ''
        });
    };

    return (
        <div className="d-flex vh-100 bg-light">
            {/* Sidebar */}
            <div className="bg-white border-end" style={{ width: '250px' }}>
                <div className="text-center py-4 border-bottom">
                    <h1 className="h4">HealthDesk</h1>
                </div>
                <nav className="nav flex-column p-3">
                    {['Dashboard', 'Appointments', 'Patient Registration', 'Call Logs', 'Messages', 'Support'].map((label, index) => (
                        <button
                            key={index}
                            className={`btn text-start mb-2 w-100 ${activeTab === label.toLowerCase() ? 'btn-primary' : 'btn-light'}`}
                            onClick={() => setActiveTab(label.toLowerCase())}
                        >
                            {label}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-grow-1 overflow-auto">
                <header className="d-flex justify-content-between align-items-center p-3 bg-white border-bottom">
                    <h2 className="h5">Receptionist Dashboard</h2>
                </header>

                <main className="p-4">
                    {/* Overview Cards */}
                    <div className="row g-3">
                        {overviewCards.map((card, index) => (
                            <div className="col-md-3" key={index}>
                                <div className={`card border-${card.color} text-${card.color} h-100`}>
                                    <div className="card-body">
                                        <h5 className="card-title">{card.title}</h5>
                                        <p className="card-text display-6">{card.value}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Quick Registration */}
                    <div className="mt-4">
                        <div className="card">
                            <div className="card-header">Quick Patient Registration</div>
                            <div className="card-body">
                                <form onSubmit={handleNewPatientSubmit}>
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="name"
                                            placeholder="Patient Name"
                                            value={newPatient.name}
                                            onChange={handleNewPatientChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            type="tel"
                                            className="form-control"
                                            name="contact"
                                            placeholder="Contact Number"
                                            value={newPatient.contact}
                                            onChange={handleNewPatientChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="reason"
                                            placeholder="Reason for Visit"
                                            value={newPatient.reason}
                                            onChange={handleNewPatientChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="doctor"
                                            placeholder="Preferred Doctor"
                                            value={newPatient.doctor}
                                            onChange={handleNewPatientChange}
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary w-100">Register Patient</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ReceptionistDashboard;
