import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { Home, Users, Calendar, Stethoscope, Bell, LogOut, Search } from 'lucide-react';
import axios from 'axios';
import logo from '../assets/images/logov.png';

const VeterinarianDashboard = () => {
    const [activePage, setActivePage] = useState('Dashboard');
    const [searchTerm, setSearchTerm] = useState('');
    const [inventoryItems, setInventoryItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Check for auth token on component mount
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            navigate('/login'); // Redirect to login if token is not found
        }
    }, [navigate]);

    const overviewCards = [
        { title: "Today's Appointments", value: 12, icon: <Calendar className="text-primary" /> },
        { title: "Pending Lab Results", value: 5, icon: <Stethoscope className="text-success" /> },
        { title: "New Patient Requests", value: 3, icon: <Users className="text-info" /> },
        { title: "Inventory Alerts", value: 2, icon: <Bell className="text-danger" /> }
    ];

    // Fetch inventory data from API
    useEffect(() => {
        if (activePage === 'Inventory') {
            setLoading(true);
            axios
                .get('http://localhost:8080/api/inventory', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('authToken')}` // Include token in request
                    }
                })
                .then((response) => {
                    setInventoryItems(response.data);
                    setLoading(false);
                })
                .catch((error) => {
                    setError('Failed to load inventory data');
                    setLoading(false);
                });
        }
    }, [activePage]);

    const handleLogout = () => {
        localStorage.removeItem('authToken'); // Clear the token
        navigate('/login'); // Redirect to login page
    };

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
                                <button
                                    className={`btn btn-light d-flex align-items-center w-100 ${activePage === item.label ? 'active' : ''}`}
                                    onClick={() => setActivePage(item.label)}
                                >
                                    <span className="me-2">{item.icon}</span>
                                    {item.label}
                                </button>
                            </li>
                        ))}
                        <li>
                            <button
                                className="btn btn-danger d-flex align-items-center w-100 mt-3"
                                onClick={handleLogout}
                            >
                                <span className="me-2"><LogOut /></span>Logout
                            </button>
                        </li>
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
                        </div>
                    </div>
                </header>

                <main className="p-4">
                    {activePage === 'Dashboard' && (
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
                    )}

                    {activePage === 'Inventory' && (
                        <div>
                            <h3>Inventory</h3>
                            {loading && <p>Loading inventory...</p>}
                            {error && <p className="text-danger">{error}</p>}
                            {!loading && !error && (
                                <div className="table-responsive">
                                    <table className="table table-bordered table-striped">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Item Name</th>
                                                <th>Category</th>
                                                <th>Stock</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {inventoryItems.map((item) => (
                                                <tr key={item.inventoryId}>
                                                    <td>{item.inventoryId}</td>
                                                    <td>{item.itemName}</td>
                                                    <td>{item.category}</td>
                                                    <td>{item.availableStock}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default VeterinarianDashboard;
