import React, { useState } from 'react';
import { Home, Users, Calendar, Stethoscope, Bell, LogOut, Search } from 'lucide-react';
import logo from '../assets/images/logov.png'

const VeterinarianDashboard = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const overviewCards = [
        { title: "Today's Appointments", value: 12, icon: <Calendar className="text-primary" /> },
        { title: "Pending Lab Results", value: 5, icon: <Stethoscope className="text-success" /> },
        { title: "New Patient Requests", value: 3, icon: <Users className="text-info" /> },
        { title: "Inventory Alerts", value: 2, icon: <Bell className="text-danger" /> }
    ];

    const appointments = [
        { time: "9:00 AM", patientName: "Max (Golden Retriever)", reason: "Annual Checkup", status: "Pending" },
        { time: "10:30 AM", patientName: "Whiskers (Siamese Cat)", reason: "Vaccination", status: "Completed" },
        { time: "11:45 AM", patientName: "Buddy (Labrador)", reason: "Injury Check", status: "Pending" }
    ];

    const patients = [
        { name: "Max", species: "Dog", breed: "Golden Retriever" },
        { name: "Whiskers", species: "Cat", breed: "Siamese" },
        { name: "Buddy", species: "Dog", breed: "Labrador" }
    ];

    return (
        <div className="d-flex vh-100">
            {/* Sidebar */}
            <div className="bg-light border-end" style={{ width: '250px' }}>
                <div className="p-4 border-bottom">
                    <h1 className="h4">VetCare</h1>
                </div>
                <nav className="p-3">
                    <ul className="list-unstyled">
                        {[
                            { icon: <Home />, label: "Dashboard" },
                            { icon: <Calendar />, label: "Appointments" },
                            { icon: <Users />, label: "Patient Records" },
                            { icon: <Stethoscope />, label: "Inventory" }
                        ].map((item, index) => (
                            <li key={index} className="mb-2">
                                <button className="btn btn-light d-flex align-items-center w-100">
                                    <span className="me-2">{item.icon}</span>
                                    {item.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-grow-1">
                <header className="d-flex justify-content-between align-items-center p-3 bg-white border-bottom">
                    <div className="d-flex align-items-center">
                        <Search className="me-2 text-muted" />
                        <input
                            type="text"
                            placeholder="Search"
                            className="form-control"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div>
                        <div className="d-flex align-items-center">
                            <img
                                src={logo}
                                alt="Profile"
                                className="rounded-circle me-2"
                                style={{ width: '40px', height: '40px' }}
                            />
                            <span>Dr. Levis</span>
                            <button className="btn btn-link text-decoration-none">
                                <LogOut className="ms-2 text-danger" />
                            </button>
                        </div>
                    </div>
                </header>

                <main className="p-4">
                    {/* Overview Cards */}
                    <div className="row">
                        {overviewCards.map((card, index) => (
                            <div className="col-md-3 mb-4" key={index}>
                                <div className="card p-3 text-center">
                                    <div>{card.icon}</div>
                                    <h5 className="card-title">{card.title}</h5>
                                    <p className="fs-2 fw-bold">{card.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Appointments */}
                    <div className="row">
                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-header">Today's Appointments</div>
                                <div className="card-body">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Time</th>
                                                <th>Patient</th>
                                                <th>Reason</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {appointments.map((appointment, index) => (
                                                <tr key={index}>
                                                    <td>{appointment.time}</td>
                                                    <td>{appointment.patientName}</td>
                                                    <td>{appointment.reason}</td>
                                                    <td>
                                                        <span className={`badge ${appointment.status === 'Pending' ? 'bg-warning' : 'bg-success'}`}>
                                                            {appointment.status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* Patient Quick Access */}
                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-header">Patient Quick Access</div>
                                <div className="card-body">
                                    {patients
                                        .filter(patient =>
                                            patient.name.toLowerCase().includes(searchTerm.toLowerCase())
                                        )
                                        .map((patient, index) => (
                                            <div key={index} className="d-flex justify-content-between mb-3">
                                                <div>
                                                    <h6 className="mb-1">{patient.name}</h6>
                                                    <p className="text-muted small">
                                                        {patient.species} - {patient.breed}
                                                    </p>
                                                </div>
                                                <button className="btn btn-outline-primary btn-sm">View</button>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default VeterinarianDashboard;
