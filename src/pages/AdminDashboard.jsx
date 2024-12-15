import React, { useState } from 'react';
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
import logo from '../assets/images/logov.png'

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  const navItems = [
    { icon: Home, label: 'Dashboard Overview', key: 'dashboard' },
    { icon: Calendar, label: 'Appointments Management', key: 'appointments' },
    { icon: Users, label: 'Staff Management', key: 'staff' },
    { icon: FileText, label: 'Patient Records', key: 'patients' },
    { icon: DollarSign, label: 'Financial Reports', key: 'financials' },
    { icon: Package, label: 'Inventory', key: 'inventory' },
    { icon: Settings, label: 'System Settings', key: 'settings' },
    { icon: HelpCircle, label: 'Support Center', key: 'support' },
  ];

  const overviewCards = [
    { 
      title: 'Total Revenue', 
      value: '$75,430', 
      subtext: 'This Month' 
    },
    { 
      title: 'Staff Count', 
      value: '42', 
      subtext: 'Active Employees' 
    },
    { 
      title: 'Active Patients', 
      value: '328', 
      subtext: 'Currently Receiving Care' 
    },
    { 
      title: 'Appointments Today', 
      value: '24', 
      subtext: 'Scheduled' 
    }
  ];

  return (
    <div className="d-flex vh-100 bg-light">
      {/* Sidebar */}
      <div className="col-2 bg-white shadow">
        <div className="p-4 border-bottom d-flex align-items-center">
          <img 
            src={logo} 
            alt="Clinic Logo" 
            className="me-3" 
            style={{height: '50px'}}
          />
          <h1 className="fs-4 fw-bold">Veterinarian-Admin</h1>
        </div>
        
        <nav className="mt-4">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveSection(item.key)}
              className={`
                w-100 text-start p-3 d-flex align-items-center 
                btn btn-${activeSection === item.key ? 'primary' : 'light'}
              `}
            >
              <item.icon className="me-3" size={20} />
              {item.label}
            </button>
          ))}
          
          <button
            className="w-100 text-start p-3 d-flex align-items-center btn btn-light text-danger mt-4"
          >
            <LogOut className="me-3" size={20} />
            Logout
          </button>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="col-10 d-flex flex-column">
        {/* Header */}
        <header className="bg-white shadow-sm p-4 d-flex justify-content-between align-items-center">
          <div className="position-relative flex-grow-1 me-4 mw-50">
            <input 
              type="text" 
              placeholder="Search records, analytics..." 
              className="form-control ps-4"
            />
            <Search 
              className="position-absolute text-secondary" 
              size={18} 
              style={{top: '10px', left: '10px'}}
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
                style={{width: '40px', height: '40px'}}
              />
              <span>Levis</span>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-4 bg-light flex-grow-1 overflow-auto">
          {/* Overview Cards */}
          <div className="row g-4 mb-4">
            {overviewCards.map((card, index) => (
              <div key={index} className="col-3">
                <div className="card h-100">
                  <div className="card-body">
                    <h3 className="card-subtitle mb-2 text-muted">{card.title}</h3>
                    <div className="h4 card-title">{card.value}</div>
                    <div className="small text-secondary">{card.subtext}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Placeholder for other dashboard sections */}
          <div className="card">
            <div className="card-body">
              {activeSection === 'dashboard' && (
                <div>
                  <h2 className="card-title h4 mb-4">
                    Dashboard Overview
                  </h2>
                  {/* Placeholder for charts and analytics */}
                  <div className="row">
                    <div className="col-6">
                      <div className="bg-light p-4 rounded">
                        Financial Performance Chart Placeholder
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="bg-light p-4 rounded">
                        Appointment Trends Chart Placeholder
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;