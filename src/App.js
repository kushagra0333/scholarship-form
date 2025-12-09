// FILE: src/App.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Apply from './pages/Apply';
import Success from './components/Success';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const adminLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';
    setIsAuthenticated(adminLoggedIn);
  }, []);

  useEffect(() => {
    const seeded = localStorage.getItem('dataSeeded');
    if (!seeded) {
      seedSampleData();
      localStorage.setItem('dataSeeded', 'true');
    }
  }, []);

  const seedSampleData = () => {
    const sampleApplications = [
      {
        id: 'SCH-20231215-0001',
        status: 'submitted',
        submittedAt: new Date('2023-12-15').toISOString(),
        personalDetails: {
          fullName: 'Rahul Sharma',
          dob: '2002-05-15',
          gender: 'male',
          category: 'General',
          fatherName: 'Rajesh Sharma',
          motherName: 'Priya Sharma',
          income: '450000',
          email: 'rahul.sharma@example.com',
          mobile: '9876543210',
          address: '123 Main Street, New Delhi'
        },
        academicDetails: {
          className: 'B.Tech 3rd Year',
          schoolName: 'Delhi Technological University',
          board: 'University',
          rollNo: 'DTU20200123',
          previousPercentage: '85.5'
        },
        documents: [],
        payment: { amount: 100, status: 'paid' }
      },
      {
        id: 'SCH-20231218-0002',
        status: 'submitted',
        submittedAt: new Date('2023-12-18').toISOString(),
        personalDetails: {
          fullName: 'Priya Patel',
          dob: '2003-08-22',
          gender: 'female',
          category: 'OBC',
          fatherName: 'Amit Patel',
          motherName: 'Sunita Patel',
          income: '350000',
          email: 'priya.patel@example.com',
          mobile: '8765432109',
          address: '456 Park Avenue, Mumbai'
        },
        academicDetails: {
          className: '12th Standard',
          schoolName: "St. Xavier's College",
          board: 'CBSE',
          rollNo: 'SXC20231234',
          previousPercentage: '92.3'
        },
        documents: [],
        payment: { amount: 100, status: 'paid' }
      }
    ];

    localStorage.setItem('applications', JSON.stringify(sampleApplications));
  };

  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/apply" element={<Apply />} />
            <Route path="/success/:applicationId" element={<Success />} />

            <Route
              path="/admin/login"
              element={
                isAuthenticated
                  ? <Navigate to="/admin/dashboard" />
                  : <AdminLogin setIsAuthenticated={setIsAuthenticated} />
              }
            />

            <Route
              path="/admin/dashboard"
              element={
                isAuthenticated
                  ? <AdminDashboard />
                  : <Navigate to="/admin/login" />
              }
            />
          </Routes>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
