import React, { useEffect, useState, } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

const ReceptionistDashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('dashboard');
    const [newPatient, setNewPatient] = useState({
        name: '',
        contact: '',
        reason: '',
        doctor: ''
    });
    const [appointment, setAppointment] = useState({
        petName: '',
        ownerName: '',
        appointmentDate: '',
        reason: '',
    });
    const [newPatientt, setNewPatientt] = useState({
        petName: '',
        species: '',
        ownerName: '',
        ownerContact: '',
    });

    const handleNewPatientChangee = (event) => {
        const { name, value } = event.target;
        setNewPatient((prevPatient) => ({
            ...prevPatient,
            [name]: value,
        }));
    };
    const handleNewPatientSubmiting = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/api/patients', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newPatient),
            });

            if (response.ok) {
                const data = await response.json();
                alert(`Patient registered successfully! ID: ${data.id}`);
                // Reset the form
                setNewPatient({
                    petName: '',
                    species: '',
                    ownerName: '',
                    ownerContact: '',
                });
            } else {
                const errorData = await response.json();
                alert(`Failed to register patient: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Error registering patient:', error);
            alert('An error occurred while registering the patient. Please try again.');
        }
    };
    const [message, setMessage] = useState(null);
    const [messages, setMessages] = useState([]);



    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/contact");
                if (!response.ok) {
                    throw new Error("Failed to fetch messages");
                }
                const data = await response.json();
                setMessages(data); // Assuming the API returns an array of messages
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchMessages();
    }, []);

    const overviewCards = [
        { title: "Today's Appointments", value: appointment.length, color: "primary" },
        { title: "Check-Ins Pending", value: 12, color: "warning" },
        { title: "New Registrations", value: 7, color: "success" },
        { title: "Messages", value: 5, color: "info" },
    ];
    const get_app = "http://localhost:8080/api/appointments";

    useEffect(() => {
        axios.get(get_app)
            .then((response) => setAppointment(response.data))
            .catch((error) => console.error("Error fetching patients:", error));
    }, []);

    const handleNewPatientChange = (e) => {
        const { name, value } = e.target;
        setNewPatient((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            navigate('/login'); // Redirect to login if no token is found
        }
    }, [navigate]);

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

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setAppointment((prev) => ({
            ...prev,
            [id]: value,
        }));
    };
    const handleLogout = () => {
        localStorage.removeItem('authToken'); // Clear the token from localStorage
        navigate('/login'); // Redirect to the login page
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/api/appointments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(appointment),
            });

            if (response.ok) {
                setMessage({ type: 'success', text: 'Appointment booked successfully!' });
                setAppointment({
                    petName: '',
                    ownerName: '',
                    appointmentDate: '',
                    reason: '',
                });
            } else {
                setMessage({ type: 'error', text: 'Failed to book the appointment. Please try again.' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'An error occurred while booking the appointment.' });
        }
    };


    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard':
                return (
                    <>
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
                    </>
                );
            case 'appointments':
                return (
                    <div className="card">
                        <div className="card-header">Appointments</div>
                        <div className="card-body">
                            {message && (
                                <div
                                    className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-danger'} alert-dismissible fade show`}
                                    role="alert"
                                >
                                    {message.text}
                                    <button
                                        type="button"
                                        className="btn-close"
                                        aria-label="Close"
                                        onClick={() => setMessage(null)}
                                    ></button>
                                </div>
                            )}
                            <p>Here you can manage and view all appointments.</p>
                            <form onSubmit={handleFormSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="petName" className="form-label">Pet Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="petName"
                                        placeholder="Enter your pet's name"
                                        value={appointment.petName}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="ownerName" className="form-label">Owner Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="ownerName"
                                        placeholder="Enter owner's name"
                                        value={appointment.ownerName}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="appointmentDate" className="form-label">Appointment Date</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="appointmentDate"
                                        value={appointment.appointmentDate}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="reason" className="form-label">Reason for Visit</label>
                                    <textarea
                                        className="form-control"
                                        id="reason"
                                        rows="3"
                                        placeholder="Briefly describe the reason for the visit"
                                        value={appointment.reason}
                                        onChange={handleInputChange}
                                        required
                                    ></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary">Book Appointment</button>
                            </form>
                        </div>
                    </div>
                );
            case 'patient registration':
                return (
                    <div className="card">
                        <div className="card-header">Pet Registration</div>
                        <div className="card-body">
                            <form onSubmit={handleNewPatientSubmiting}>
                                <div className="mb-3">
                                    <label htmlFor="petName" className="form-label">Pet Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="petName"
                                        name="petName"
                                        placeholder="Enter pet's name"
                                        value={newPatient.petName}
                                        onChange={handleNewPatientChangee}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="species" className="form-label">Species</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="species"
                                        name="species"
                                        placeholder="e.g., Dog, Cat"
                                        value={newPatient.species}
                                        onChange={handleNewPatientChangee}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="ownerName" className="form-label">Owner Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="ownerName"
                                        name="ownerName"
                                        placeholder="Enter owner's name"
                                        value={newPatient.ownerName}
                                        onChange={handleNewPatientChangee}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="ownerContact" className="form-label">Owner Contact</label>
                                    <input
                                        type="tel"
                                        className="form-control"
                                        id="ownerContact"
                                        name="ownerContact"
                                        placeholder="Enter owner's contact number"
                                        value={newPatient.ownerContact}
                                        onChange={handleNewPatientChangee}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary w-100">Register Pet</button>
                            </form>
                        </div>
                    </div>
                );

            case 'call logs':
                return (
                    <div className="card">
                        <div className="card-header">Call Logs</div>
                        <div className="card-body">
                            <p>View recent call logs here.</p>
                        </div>
                    </div>
                );
            case 'messages':
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
            case 'logout':
                handleLogout();
                break;
            default:
                return <p>Select a menu to view its content.</p>;
        }
    };

    return (
        <div className="d-flex vh-100 bg-light">
            {/* Sidebar */}
            <div className="bg-white border-end" style={{ width: '250px' }}>
                <div className="text-center py-4 border-bottom">
                    <h1 className="h4">HealthDesk</h1>
                </div>
                <nav className="nav flex-column p-3">
                    {['Dashboard', 'Appointments', 'Patient Registration', 'Messages', 'Logout'].map((label, index) => (
                        <button
                            key={index}
                            className={`btn text-start mb-2 w-100 ${activeTab === label.toLowerCase() ? 'btn-primary' : 'btn-light'}`}
                            onClick={() => {
                                if (label.toLowerCase() === 'logout') {
                                    handleLogout(); // Trigger logout on Logout button
                                } else {
                                    setActiveTab(label.toLowerCase());
                                }
                            }}
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
                    {renderContent()}
                </main>
            </div>
        </div>
    );
};

export default ReceptionistDashboard;
