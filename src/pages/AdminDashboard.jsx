// FILE: src/pages/AdminDashboard.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const AdminDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    loadApplications();
  }, []);

  useEffect(() => {
    filterApplications();
  }, [searchTerm, statusFilter, applications]);

  const loadApplications = () => {
    setLoading(true);
    // Simulate loading
    setTimeout(() => {
      const savedApplications = JSON.parse(localStorage.getItem('applications') || '[]');
      setApplications(savedApplications);
      setFilteredApplications(savedApplications);
      setLoading(false);
    }, 500);
  };

  const filterApplications = () => {
    let filtered = [...applications];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(app => 
        app.id.toLowerCase().includes(term) ||
        app.personalDetails?.fullName?.toLowerCase().includes(term) ||
        app.personalDetails?.email?.toLowerCase().includes(term) ||
        app.academicDetails?.rollNo?.toLowerCase().includes(term)
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(app => app.status === statusFilter);
    }

    setFilteredApplications(filtered);
  };

  const getStatusBadge = (status) => {
    const styles = {
      submitted: { backgroundColor: '#e3f2fd', color: '#1976d2' },
      reviewed: { backgroundColor: '#fff3e0', color: '#f57c00' },
      approved: { backgroundColor: '#e8f5e9', color: '#2e7d32' },
      rejected: { backgroundColor: '#ffebee', color: '#d32f2f' },
      pending: { backgroundColor: '#f5f5f5', color: '#616161' }
    };

    return (
      <span 
        style={{
          padding: '0.25rem 0.75rem',
          borderRadius: '12px',
          fontSize: '0.875rem',
          fontWeight: '500',
          ...styles[status] || styles.pending
        }}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const exportToCSV = () => {
    const headers = [
      'Application ID',
      'Name',
      'Email',
      'Mobile',
      'Category',
      'Class',
      'Institution',
      'Previous %',
      'Status',
      'Submitted Date'
    ];

    const csvData = filteredApplications.map(app => [
      app.id,
      app.personalDetails?.fullName || '',
      app.personalDetails?.email || '',
      app.personalDetails?.mobile || '',
      app.personalDetails?.category || '',
      app.academicDetails?.className || '',
      app.academicDetails?.schoolName || '',
      app.academicDetails?.previousPercentage || '',
      app.status,
      format(new Date(app.submittedAt), 'dd/MM/yyyy')
    ]);

    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `scholarship-applications-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="text-center" style={{ padding: '4rem 0' }}>
        <div className="spinner" style={{ margin: '0 auto 2rem' }} />
        <h3>Loading applications...</h3>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Admin Dashboard</h1>
        <div className="d-flex gap-2">
          <button
            type="button"
            onClick={exportToCSV}
            className="btn btn-secondary"
          >
            Export CSV
          </button>
          <button
            type="button"
            onClick={loadApplications}
            className="btn"
          >
            Refresh
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row mb-4" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        <div className="card" style={{ flex: '1 1 200px' }}>
          <h3 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>
            {applications.length}
          </h3>
          <p className="text-muted mb-0">Total Applications</p>
        </div>
        <div className="card" style={{ flex: '1 1 200px' }}>
          <h3 style={{ color: 'var(--secondary)', marginBottom: '0.5rem' }}>
            {applications.filter(a => a.status === 'approved').length}
          </h3>
          <p className="text-muted mb-0">Approved</p>
        </div>
        <div className="card" style={{ flex: '1 1 200px' }}>
          <h3 style={{ color: '#f57c00', marginBottom: '0.5rem' }}>
            {applications.filter(a => a.status === 'reviewed').length}
          </h3>
          <p className="text-muted mb-0">Under Review</p>
        </div>
        <div className="card" style={{ flex: '1 1 200px' }}>
          <h3 style={{ color: 'var(--danger)', marginBottom: '0.5rem' }}>
            {applications.filter(a => a.status === 'rejected').length}
          </h3>
          <p className="text-muted mb-0">Rejected</p>
        </div>
      </div>

      {/* Filters */}
      <div className="card mb-4">
        <div className="row" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'flex-end' }}>
          <div style={{ flex: '1 1 300px' }}>
            <label className="form-label">Search Applications</label>
            <input
              type="text"
              className="form-control"
              placeholder="Search by ID, Name, Email, or Roll No"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div style={{ flex: '1 1 200px' }}>
            <label className="form-label">Filter by Status</label>
            <select
              className="form-control"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="submitted">Submitted</option>
              <option value="reviewed">Under Review</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Applications Table */}
      <div className="card">
        <div className="table-container">
          {filteredApplications.length === 0 ? (
            <div className="text-center py-5">
              <p className="text-muted">No applications found</p>
            </div>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Application ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th>Class</th>
                  <th>Status</th>
                  <th>Submitted Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredApplications.map((application) => (
                  <tr key={application.id}>
                    <td>
                      <strong>{application.id}</strong>
                    </td>
                    <td>{application.personalDetails?.fullName}</td>
                    <td>{application.personalDetails?.email}</td>
                    <td>{application.personalDetails?.mobile}</td>
                    <td>{application.academicDetails?.className}</td>
                    <td>{getStatusBadge(application.status)}</td>
                    <td>
                      {format(new Date(application.submittedAt), 'dd MMM yyyy')}
                    </td>
                    <td>
                      <div className="d-flex gap-1">
                        <Link
                          to={`/success/${application.id}`}
                          className="btn btn-sm"
                          target="_blank"
                        >
                          View
                        </Link>
                        <button
                          type="button"
                          className="btn btn-secondary btn-sm"
                          onClick={() => {
                            const blob = new Blob(
                              [JSON.stringify(application, null, 2)],
                              { type: 'application/json' }
                            );
                            const url = window.URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = `${application.id}.json`;
                            a.click();
                            window.URL.revokeObjectURL(url);
                          }}
                        >
                          Download
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {filteredApplications.length > 0 && (
          <div className="d-flex justify-content-between align-items-center mt-3">
            <p className="text-muted mb-0">
              Showing {filteredApplications.length} of {applications.length} applications
            </p>
            <button
              type="button"
              onClick={exportToCSV}
              className="btn btn-secondary"
            >
              Export All to CSV
            </button>
          </div>
        )}
      </div>

      <div className="card mt-4">
        <h4>Quick Actions</h4>
        <div className="d-flex gap-2 flex-wrap">
          <button
            type="button"
            className="btn"
            onClick={() => {
              // Simulate approving all submitted applications
              const updated = applications.map(app => 
                app.status === 'submitted' ? { ...app, status: 'reviewed' } : app
              );
              setApplications(updated);
              localStorage.setItem('applications', JSON.stringify(updated));
              filterApplications();
            }}
          >
            Mark Submitted as Reviewed
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => {
              if (window.confirm('Clear all applications? This cannot be undone.')) {
                localStorage.removeItem('applications');
                setApplications([]);
                setFilteredApplications([]);
              }
            }}
          >
            Clear All Data
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              localStorage.removeItem('adminLoggedIn');
              window.location.href = '/admin/login';
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;