import React, { useState } from 'react';
import {
    Home,
    Users,
    Clipboard,
    MessageCircle,
    Clock,
    Settings,
    LogOut,
    Bell,
    Stethoscope,
    Activity,
    Pill,
    Calendar
} from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';

const NurseDashboard = () => {
    const [activeTab, setActiveTab] = useState('dashboard');

    const overviewCards = [
        { title: "Patients Assigned", value: 15, icon: <Users className="text-primary" /> },
        { title: "Medications", value: 42, icon: <Pill className="text-success" /> },
        { title: "Pending Tasks", value: 7, icon: <Clipboard className="text-warning" /> },
        { title: "Shift Hours", value: "8:00 AM - 4:00 PM", icon: <Clock className="text-info" /> }
    ];

    const taskList = [
        { name: "Patient Rounds", assignedTime: "8:30 AM", status: "In Progress", priority: "high" },
        { name: "Medication Administration", assignedTime: "9:15 AM", status: "Pending", priority: "high" },
        { name: "Patient Vitals Check", assignedTime: "10:00 AM", status: "Completed", priority: "medium" }
    ];

    const patientVitals = [
        { name: "John Doe", bloodPressure: "120/80", pulse: "72 bpm", temperature: "98.6°F", status: "Stable" },
        { name: "Jane Smith", bloodPressure: "140/90", pulse: "85 bpm", temperature: "99.2°F", status: "Critical" }
    ];

    const medicationSchedule = [
        { patientName: "John Doe", medication: "Antibiotics", dosage: "500mg", time: "9:00 AM", status: "Pending" },
        { patientName: "Jane Smith", medication: "Pain Relief", dosage: "250mg", time: "10:30 AM", status: "Administered" }
    ];

    return (
        <div className="d-flex vh-100 bg-light">
            {/* Sidebar */}
            <div className="bg-white border-end" style={{ width: '250px' }}>
                <div className="p-4 border-bottom d-flex align-items-center">
                    <Stethoscope className="me-2 text-primary" />
                    <h1 className="h4 text-dark">NurseConnect</h1>
                </div>
                <nav className="p-3">
                    <ul className="list-unstyled">
                        {[
                            { icon: <Home />, label: "Dashboard", key: "dashboard" },
                            { icon: <Users />, label: "Patient Management", key: "patients" },
                            { icon: <Pill />, label: "Medication Schedule", key: "medications" },
                            { icon: <Clipboard />, label: "Task List", key: "tasks" },
                            { icon: <MessageCircle />, label: "Messages", key: "messages" },
                            { icon: <Calendar />, label: "Shift Planner", key: "shifts" }
                        ].map((item) => (
                            <li key={item.key} className={`p-2 rounded ${activeTab === item.key ? 'bg-primary text-white' : ''}`}>
                                <button
                                    className="btn btn-link text-start w-100 text-decoration-none text-dark"
                                    onClick={() => setActiveTab(item.key)}
                                >
                                    <span className="me-2">{item.icon}</span>
                                    {item.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-grow-1 p-4">
                {/* Header */}
                <header className="bg-white p-3 shadow-sm mb-4 d-flex justify-content-between align-items-center">
                    <h2 className="h5 text-dark">Nurse Dashboard</h2>
                    <div className="d-flex align-items-center">
                        <Bell className="me-4 text-secondary" />
                        <div className="dropdown">
                            <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                                Sarah Williams, RN
                            </button>
                            <ul className="dropdown-menu">
                                <li><button className="dropdown-item"><Settings className="me-2" />Profile Settings</button></li>
                                <li><button className="dropdown-item"><LogOut className="me-2" />Logout</button></li>
                            </ul>
                        </div>
                    </div>
                </header>

                {/* Dashboard Content */}
                <div className="row">
                    {overviewCards.map((card, index) => (
                        <div key={index} className="col-md-3">
                            <div className="card shadow-sm mb-4">
                                <div className="card-body d-flex align-items-center">
                                    <div className="me-3">{card.icon}</div>
                                    <div>
                                        <h6 className="card-title text-secondary">{card.title}</h6>
                                        <h4 className="mb-0">{card.value}</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {/* Further components like task lists, patient vitals, etc., can be styled similarly */}
            </div>
        </div>
    );
};

export default NurseDashboard;
