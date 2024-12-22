import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar.jsx';
import Spinner from './components/Spinner.jsx';
import Home from './components/Home.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import NurseDashboard from './pages/NurseDashboard.jsx';
import Footer from './components/Footer.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Forgot from './pages/Forgot.jsx';
import ResetPassword from './pages/ResetPassword.jsx';
import VeterinarianDashboard from './pages/VeterinarianDashboard.jsx';
import ReceptionistDashboard from './pages/ReceptionistDashboard.jsx';


function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const isLoginOrRegisterPage =
    window.location.pathname === '/login' || window.location.pathname === '/signup' || window.location.pathname === '/vdash'
    || window.location.pathname === '/nurse' || window.location.pathname === '/Receptionist' || window.location.pathname === '/admin';

  return (
    <Router>
      <div className="App">
        {loading ? (
          <Spinner />
        ) : (
          <>
            {/* Conditionally render Navbar and Footer */}
            {!isLoginOrRegisterPage && <Navbar />}
            <div className="content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Register />} />

                <Route path="/forgot" element={<Forgot />} />
                <Route path="/reset" element={<ResetPassword />} />

                <Route path="/vdash" element={<VeterinarianDashboard />} />

                <Route path="/nurse" element={<NurseDashboard />} />

                <Route path="/Receptionist" element={<ReceptionistDashboard />} />

                <Route path="/admin" element={<AdminDashboard />} />

                {/*
                <Route path="/garrely" element={<GarrelyB />} />
                <Route path="/contact" element={<ContactB />} />
                <Route path="/bookings" element={<BookingB />} /> */}
              </Routes>
            </div>
            {!isLoginOrRegisterPage && <Footer />}
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
