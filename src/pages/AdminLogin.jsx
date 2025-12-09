// FILE: src/pages/AdminLogin.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = ({ setIsAuthenticated }) => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Simple validation for demo
    if (credentials.email === 'admin@scholarship.gov' && credentials.password === 'admin123') {
      // Store authentication state
      localStorage.setItem('adminLoggedIn', 'true');
      setIsAuthenticated(true);
      navigate('/admin/dashboard');
    } else {
      setError('Invalid email or password');
    }

    setLoading(false);
  };

  return (
    <div className="admin-login">
      <div className="card" style={{ maxWidth: '400px', margin: '0 auto' }}>
        <div className="text-center mb-4">
          <h2>Admin Login</h2>
          <p className="text-muted">
            Access the administration dashboard
          </p>
        </div>

        {error && (
          <div className="alert alert-danger">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter admin email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter password"
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-block"
            disabled={loading}
            style={{ width: '100%' }}
          >
            {loading ? (
              <>
                <span className="spinner" style={{ marginRight: '8px' }} />
                Logging in...
              </>
            ) : (
              'Login'
            )}
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-muted">
            <small>
              Demo Credentials:<br />
              Email: admin@scholarship.gov<br />
              Password: admin123
            </small>
          </p>
        </div>
      </div>

      <div className="card mt-4" style={{ maxWidth: '400px', margin: '0 auto' }}>
        <h4 className="mb-3">Admin Dashboard Features</h4>
        <ul>
          <li>View all submitted applications</li>
          <li>Track application status</li>
          <li>Download application data</li>
          <li>Manage scholarship schemes</li>
          <li>Generate reports</li>
        </ul>
      </div>
    </div>
  );
};

export default AdminLogin;