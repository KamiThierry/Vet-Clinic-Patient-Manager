import React, { useState, useEffect } from 'react';
import {
  Home,
  Calendar,
  Users,
  FileText,
  DollarSign,
  Package,
  Settings,
  HelpCircle,
  LogOut,
  Bell,
  MessageCircle,
  Search
} from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../assets/images/logov.png';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [appointments, setAppointments] = useState([]);
  const [staff, setStaff] = useState([]);
  const [error, setError] = useState(null);
  const [inventory, setInventory] = useState([]);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    itemName: "",
    category: "",
    initialStock: 0,
    availableStock: 0,
  });
  const [successMessage, setSuccessMessage] = useState("");

  // Fetch Inventory
  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/inventory");
      const data = await response.json();
      setInventory(data);
    } catch (err) {
      setError("Failed to fetch inventory data.");
    }
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/login'); // Redirect to login if token is not found
    }
  }, [navigate]);
  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Clear the token
    navigate('/login'); // Redirect to login page
  };

  // Add Inventory
  const handleAddInventory = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/inventory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!response.ok) {
        throw new Error("Failed to add inventory");
      }
      const newItem = await response.json();
      setInventory((prev) => [...prev, newItem]);
      setForm({ itemName: "", category: "", initialStock: 0, availableStock: 0 });
      setSuccessMessage("Inventory item added successfully!");
    } catch (err) {
      setError(err.message);
    }
  };

  const navItems = [
    { icon: Home, label: 'Dashboard Overview', key: 'dashboard' },
    { icon: Calendar, label: 'Appointments Management', key: 'appointments' },
    { icon: Users, label: 'Staff Management', key: 'staff' },
    { icon: FileText, label: 'Patient Records', key: 'patients' },
    { icon: Package, label: 'Inventory', key: 'inventory' },
    { icon: Settings, label: 'System Settings', key: 'settings' },
  ];
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const handleDelete = async (email) => {
    try {
      const response = await fetch(`http://localhost:8080/api/users/delete/${email}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete staff member');
      }
      setStaff((prevStaff) => prevStaff.filter((member) => member.email !== email));
    } catch (err) {
      setError(err.message);
    }
  };
  // Fetch Appointments
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/appointments');
        if (!response.ok) {
          throw new Error('Failed to fetch appointments');
        }
        const data = await response.json();
        setAppointments(data);
      } catch (err) {
        setError(err.message);
      }
    };

    if (activeSection === 'appointments') {
      fetchAppointments();
    }
  }, [activeSection]);

  // Fetch Staff Data
  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/users/all');
        if (!response.ok) {
          throw new Error('Failed to fetch staff data');
        }
        const data = await response.json();
        setStaff(data);
      } catch (err) {
        setError(err.message);
      }
    };

    if (activeSection === 'staff') {
      fetchStaff();
    }
  }, [activeSection]);
  const handleDeleteInventory = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/inventory/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete inventory item');
      }
      setInventory((prevInventory) =>
        prevInventory.filter((item) => item.inventoryId !== id)
      );
    } catch (err) {
      setInventoryError(err.message);
    }
  };


  // Paginate staff data
  const paginatedStaff = staff.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <div>
            <h2>Dashboard Overview</h2>
            <p>Welcome to the Dashboard!</p>
          </div>
        );
      case 'appointments':
        return (
          <div>
            <h2>Appointments Management</h2>
            {error ? (
              <p className="text-danger">{error}</p>
            ) : (
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Patient</th>
                      <th>Date</th>
                      <th>Reason</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.length > 0 ? (
                      appointments.map((appointment) => (
                        <tr key={appointment.id}>
                          <td>{appointment.id}</td>
                          <td>{appointment.petName}</td>
                          <td>{appointment.appointmentDate}</td>
                          <td>{appointment.reason}</td>
                          <td>{appointment.status}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center">
                          No appointments available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        );
      case 'staff':
        return (
          <div>
            <h2>Staff Management</h2>
            {error ? (
              <p className="text-danger">{error}</p>
            ) : (
              <div>
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Email</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedStaff.length > 0 ? (
                        paginatedStaff.map((member) => (
                          <tr key={member.id}>
                            <td>{member.username}</td>
                            <td>{member.role}</td>
                            <td>{member.email}</td>
                            <td>
                              <button
                                className="btn btn-danger btn-sm"
                                onClick={() => handleDelete(member.email)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="text-center">
                            No staff members available
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-3">
                  {/* Previous Button */}
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    style={{ width: '45%' }}
                  >
                    Previous
                  </button>

                  {/* Current Page Indicator */}
                  <span className="fw-bold">
                    Page {currentPage} of {Math.ceil(staff.length / itemsPerPage)}
                  </span>

                  {/* Next Button */}
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    disabled={currentPage * itemsPerPage >= staff.length}
                    style={{ width: '45%' }}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        );


      case 'patients':
        return <h2>Patient Records</h2>;
      case 'inventory':
        return (
          <div className="container">
            <h2>Inventory Management</h2>
            {/* Add Inventory Form */}
            <div className="mb-4">
              <h4>Add New Inventory Item</h4>
              <form onSubmit={handleAddInventory}>
                <div className="mb-3">
                  <label htmlFor="itemName" className="form-label">
                    Item Name
                  </label>
                  <input
                    type="text"
                    id="itemName"
                    name="itemName"
                    value={form.itemName}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="category" className="form-label">
                    Category
                  </label>
                  <input
                    type="text"
                    id="category"
                    name="category"
                    value={form.category}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="initialStock" className="form-label">
                    Initial Stock
                  </label>
                  <input
                    type="number"
                    id="initialStock"
                    name="initialStock"
                    value={form.initialStock}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="availableStock" className="form-label">
                    Available Stock
                  </label>
                  <input
                    type="number"
                    id="availableStock"
                    name="availableStock"
                    value={form.availableStock}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Add Inventory
                </button>
              </form>
              {successMessage && <p className="text-success mt-3">{successMessage}</p>}
              {error && <p className="text-danger mt-3">{error}</p>}
            </div>

            {/* Inventory Table */}
            <div>
              <h4>Existing Inventory</h4>
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Item Name</th>
                      <th>Category</th>
                      <th>Initial Stock</th>
                      <th>Available Stock</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inventory.length > 0 ? (
                      inventory.map((item) => (
                        <tr key={item.inventoryId}>
                          <td>{item.inventoryId}</td>
                          <td>{item.itemName}</td>
                          <td>{item.category}</td>
                          <td>{item.initialStock}</td>
                          <td>{item.availableStock}</td>
                          <td>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() =>
                                handleDeleteInventory(item.inventoryId)
                              }
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center">
                          No inventory items available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'settings':
        return <h2>System Settings</h2>;
      case 'support':
        return <h2>Support Center</h2>;
      default:
        return <h2>Welcome to the Admin Dashboard</h2>;
    }
  };

  return (
    <div className="d-flex vh-100 bg-light">
      {/* Sidebar */}
      <div className="col-2 bg-white shadow">
        <div className="p-4 border-bottom d-flex align-items-center">
          <img
            src={logo}
            alt="Clinic Logo"
            className="me-3"
            style={{ height: '50px' }}
          />
          <h1 className="fs-5 fw-bold">Vet-Admin</h1>
        </div>

        <nav className="mt-4">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveSection(item.key)}
              className={`w-100 text-start p-3 d-flex align-items-center btn btn-${activeSection === item.key ? 'primary' : 'light'
                }`}
            >
              <item.icon className="me-3" size={20} />
              {item.label}
            </button>
          ))}

          <button
            className="btn btn-danger d-flex align-items-center w-100 mt-3"
            onClick={handleLogout}
          >
            <span className="me-2"><LogOut /></span>Logout
          </button>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="col-10 d-flex flex-column">
        {/* Header */}
        <header className="bg-white shadow-sm p-4 d-flex justify-content-between align-items-center">
          <div className="position-relative flex-grow-1 me-4">
            <input
              type="text"
              placeholder="Search records, analytics..."
              className="form-control ps-4"
            />
            <Search
              className="position-absolute text-secondary"
              size={18}
              style={{ top: '10px', left: '10px' }}
            />
          </div>

          <div className="d-flex align-items-center gap-3">
            <button className="btn btn-light position-relative">
              <Bell size={20} />
              <span className="position-absolute top-0 start-100 translate-middle badge bg-danger">
                3
              </span>
            </button>

            <button className="btn btn-light">
              <MessageCircle size={20} />
            </button>

            <div className="d-flex align-items-center">
              <img
                src={logo}
                alt="Profile"
                className="rounded-circle me-2"
                style={{ width: '40px', height: '40px' }}
              />
              <span>Levis</span>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-4 bg-light flex-grow-1 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
