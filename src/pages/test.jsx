import React, { useState, useEffect } from "react";
import { Home, CheckCircle, Plus, Users, Clipboard, MessageCircle, Calendar, Bell, Stethoscope, Settings, LogOut, Edit, Trash, Search } from "lucide-react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const NurseDashboard = ({ username }) => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("dashboard");
    const [patients, setPatients] = useState([]);
    const [globalSearch, setGlobalSearch] = useState("");
    const [patientSearch, setPatientSearch] = useState("");
    const [filteredPatients, setFilteredPatients] = useState([]);
    const [newPatient, setNewPatient] = useState({
        petName: "",
        species: "",
        ownerName: "",
        ownerContact: "",
    });
    const [editingPatient, setEditingPatient] = useState(null);

    const API_URL = "http://localhost:8080/api/patients";
    const API_URL_PATIENTS = "http://localhost:8080/api/patients";
    const API_URL_ASSIGNMENTS = "http://localhost:8080/api/assignments";

    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [selectedPatient, setSelectedPatient] = useState("");
    const [selectedVet, setSelectedVet] = useState("");
    const [veterinarians, setVeterinarians] = useState([]);
    const [taskAssignments, setTaskAssignments] = useState([]);
    const [messages, setMessages] = useState([]);
    const menuItems = [
        { icon: <Home />, label: "Dashboard", key: "dashboard" },
        { icon: <Users />, label: "Patient Management", key: "patients" },
        { icon: <Clipboard />, label: "Task List", key: "tasks" },
        { icon: <MessageCircle />, label: "Messages", key: "messages" },
        {
            icon: <LogOut />,
            label: "Logout",
            key: "logout",
            action: handleLogout,
        },
    ];

    // Handle global search on keyup
    const handleGlobalSearch = (e) => {
        const searchValue = e.target.value.toLowerCase();
        setGlobalSearch(searchValue);

        // Filter patients based on search
        const searchedPatients = patients.filter(patient =>
            patient.petName?.toLowerCase().includes(searchValue) ||
            patient.species?.toLowerCase().includes(searchValue) ||
            patient.ownerName?.toLowerCase().includes(searchValue) ||
            patient.ownerContact?.toLowerCase().includes(searchValue)
        );
        setFilteredPatients(searchedPatients);
    };

    // Handle patient management search on keyup
    const handlePatientSearch = (e) => {
        const searchValue = e.target.value.toLowerCase();
        setPatientSearch(searchValue);

        const searchedPatients = patients.filter(patient =>
            patient.petName?.toLowerCase().includes(searchValue) ||
            patient.species?.toLowerCase().includes(searchValue) ||
            patient.ownerName?.toLowerCase().includes(searchValue) ||
            patient.ownerContact?.toLowerCase().includes(searchValue)
        );
        setFilteredPatients(searchedPatients);
    };

    useEffect(() => {
        setFilteredPatients(patients);
    }, [patients]);

    // ... (keep all existing useEffects and handlers)

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate('/login');
    };

    // ... (keep all other existing functions)

    const renderPatientManagement = () => (
        <div>
            <h4 className="mb-4">Patient Management</h4>
            <div className="mb-4">
                <form onSubmit={editingPatient ? handleSaveEdit : handleAddPatient}>
                    <div className="row g-3">
                        <div className="col-md-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Pet Name"
                                name="petName"
                                value={editingPatient ? editingPatient.petName : newPatient.petName}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        {/* ... (keep other form inputs) ... */}
                    </div>
                </form>
            </div>
            {/* Patient Management Search */}
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search patients..."
                    onKeyUp={handlePatientSearch}
                />
            </div>
            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Pet Name</th>
                            <th>Species</th>
                            <th>Owner Name</th>
                            <th>Owner Contact</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(activeTab === "patients" ? filteredPatients : patients).map((patient) => (
                            <tr key={patient.id}>
                                <td>{patient.id}</td>
                                <td>{patient.petName}</td>
                                <td>{patient.species}</td>
                                <td>{patient.ownerName}</td>
                                <td>{patient.ownerContact}</td>
                                <td>
                                    <button
                                        className="btn btn-warning btn-sm me-2"
                                        onClick={() => handleEditPatient(patient)}
                                    >
                                        <Edit size={16} />
                                    </button>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDeletePatient(patient.id)}
                                    >
                                        <Trash size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const renderContent = () => {
        switch (activeTab) {
            case "dashboard":
                return (
                    <div>
                        {/* Global Search for Dashboard */}
                        <div className="mb-4">
                            <div className="input-group">
                                <span className="input-group-text">
                                    <Search size={18} />
                                </span>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search across dashboard..."
                                    onKeyUp={handleGlobalSearch}
                                />
                            </div>
                        </div>
                        <div className="row">
                            {overviewCards.map((card, index) => (
                                <div key={index} className="col-lg-3 col-md-6 mb-4">
                                    <div className="card shadow-sm h-100 border-0">
                                        <div className="card-body text-center">
                                            <h6 className="text-secondary">{card.title}</h6>
                                            <h4 className="fw-bold">{card.value}</h4>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {globalSearch && (
                            <div className="mt-4">
                                <h5>Search Results</h5>
                                <div className="table-responsive">
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Pet Name</th>
                                                <th>Species</th>
                                                <th>Owner Name</th>
                                                <th>Owner Contact</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredPatients.map((patient) => (
                                                <tr key={patient.id}>
                                                    <td>{patient.id}</td>
                                                    <td>{patient.petName}</td>
                                                    <td>{patient.species}</td>
                                                    <td>{patient.ownerName}</td>
                                                    <td>{patient.ownerContact}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>
                );
            case "patients":
                return renderPatientManagement();
            case "tasks":
                return (
                    <div>
                        <h4 className="mb-4">Assign Tasks to Veterinarians</h4>
                        <form onSubmit={handleAssignTask} className="mb-4">
                            <div className="row g-3">
                                <div className="col-md-4">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Task Description"
                                        value={newTask}
                                        onChange={(e) => setNewTask(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="col-md-4">
                                    <select
                                        className="form-select"
                                        value={selectedPatient}
                                        onChange={(e) => setSelectedPatient(e.target.value)}
                                        required
                                    >
                                        <option value="">Select Patient</option>
                                        {patients.map((patient) => (
                                            <option key={patient.id} value={patient.id}>
                                                {patient.petName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-md-4">
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={selectedVet}
                                        onChange={(e) => setSelectedVet(e.target.value)}
                                        placeholder="Enter Veterinarian Name"
                                        required
                                    />

                                </div>
                                <div className="col-md-12">
                                    <button type="submit" className="btn btn-primary w-100">
                                        Assign Task
                                    </button>
                                </div>
                            </div>
                        </form>
                        <h5 className="mb-3">Assigned Tasks</h5>
                        <ul className="list-group">
                            {taskAssignments.map((assignment, index) => (
                                <li key={index} className="list-group-item">

                                </li>
                            ))}
                        </ul>
                    </div>
                );
            case "messages":
                return (
                    <div className="container-fluid messages bg-light py-5">
                        <div className="container py-5">
                            <div className="mx-auto text-center mb-5" style={{ maxWidth: "900px" }}>
                                <h5 className="section-title px-3">User Messages</h5>
                                <h1 className="mb-0">Manage and Reply to Messages</h1>
                            </div>
                            <div className="row g-4">
                                {messages.length > 0 ? (
                                    messages.map((message, index) => (
                                        <div className="col-md-6 col-lg-4" key={index}>
                                            <div className="card border-0 shadow-sm">
                                                <div className="card-header bg-primary text-white">
                                                    <h5 className="mb-0">{message.subject}</h5>
                                                </div>
                                                <div className="card-body">
                                                    <p><strong>Name:</strong> {message.name}</p>
                                                    <p><strong>Email:</strong> {message.email}</p>
                                                    <p><strong>Message:</strong> {message.message}</p>
                                                </div>
                                                <div className="card-footer text-end">
                                                    <button
                                                        className="btn btn-primary btn-sm"
                                                        onClick={() => handleReply(message)}
                                                    >
                                                        Reply
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center">
                                        <p className="text-muted">No messages available.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                );
            case "logout":
                handleLogout();
            default:
                return <h4>Dashboard</h4>;
        }
    };

    return (
        <div className="d-flex flex-column flex-md-row vh-100 bg-light">
            <div className="bg-white shadow-sm border-end p-3" style={{ minWidth: "250px" }}>
                <div className="d-flex align-items-center border-bottom pb-3 mb-4">
                    <Stethoscope className="me-2 text-primary fs-4" />
                    <h4 className="text-primary m-0">NurseConnect</h4>
                </div>
                <nav>
                    <ul className="list-unstyled">
                        {menuItems.map((item) => (
                            <li key={item.key} className={`mb-2 ${activeTab === item.key ? "bg-primary text-white rounded" : ""}`}>
                                <button
                                    className={`btn w-100 text-start ${activeTab === item.key ? "text-white" : "text-dark"}`}
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
            <div className="flex-grow-1 p-4">
                {renderContent()}
            </div>
        </div>
    );
};

export default NurseDashboard;