// FILE: src/components/Success.jsx
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { format } from 'date-fns';

const Success = () => {
  const { applicationId } = useParams();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      const applications = JSON.parse(localStorage.getItem('applications') || '[]');
      const foundApp = applications.find(app => app.id === applicationId);
      setApplication(foundApp);
      setLoading(false);
    }, 1000);
  }, [applicationId]);

  if (loading) {
    return (
      <div className="text-center" style={{ padding: '4rem 0' }}>
        <div className="spinner" style={{ margin: '0 auto 2rem' }} />
        <h3>Loading application details...</h3>
      </div>
    );
  }

  if (!application) {
    return (
      <div className="text-center" style={{ padding: '4rem 0' }}>
        <h2>Application Not Found</h2>
        <p className="mb-3">The requested application could not be found.</p>
        <Link to="/apply" className="btn">
          Start New Application
        </Link>
      </div>
    );
  }

  return (
    <div className="success-page">
      <div className="text-center mb-4">
        <div 
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            backgroundColor: 'var(--secondary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 2rem',
            fontSize: '36px',
            color: 'white'
          }}
        >
          ✓
        </div>
        
        <h1>Application Submitted Successfully!</h1>
        <p className="text-muted">
          Your scholarship application has been submitted and is under review.
        </p>
      </div>

      <div className="card mb-4">
        <div className="text-center">
          <h3 className="mb-2">Application ID</h3>
          <div 
            style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: 'var(--primary)',
              backgroundColor: 'var(--primary-light)',
              padding: '1rem',
              borderRadius: '8px',
              marginBottom: '1rem',
              display: 'inline-block'
            }}
          >
            {applicationId}
          </div>
          <p className="text-muted">
            Please save this ID for future reference and tracking
          </p>
        </div>
      </div>

      <div className="card mb-4">
        <h3>Application Details</h3>
        
        <div className="row" style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
          <div style={{ flex: '1 1 300px' }}>
            <h4>Personal Information</h4>
            <table style={{ width: '100%' }}>
              <tbody>
                <tr>
                  <td style={{ padding: '0.5rem 0', fontWeight: '500' }}>Full Name:</td>
                  <td style={{ padding: '0.5rem 0' }}>{application.personalDetails.fullName}</td>
                </tr>
                <tr>
                  <td style={{ padding: '0.5rem 0', fontWeight: '500' }}>Date of Birth:</td>
                  <td style={{ padding: '0.5rem 0' }}>
                    {format(new Date(application.personalDetails.dob), 'dd MMM yyyy')}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: '0.5rem 0', fontWeight: '500' }}>Category:</td>
                  <td style={{ padding: '0.5rem 0' }}>{application.personalDetails.category}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style={{ flex: '1 1 300px' }}>
            <h4>Academic Information</h4>
            <table style={{ width: '100%' }}>
              <tbody>
                <tr>
                  <td style={{ padding: '0.5rem 0', fontWeight: '500' }}>Class/Course:</td>
                  <td style={{ padding: '0.5rem 0' }}>{application.academicDetails.className}</td>
                </tr>
                <tr>
                  <td style={{ padding: '0.5rem 0', fontWeight: '500' }}>Institution:</td>
                  <td style={{ padding: '0.5rem 0' }}>{application.academicDetails.schoolName}</td>
                </tr>
                <tr>
                  <td style={{ padding: '0.5rem 0', fontWeight: '500' }}>Previous %:</td>
                  <td style={{ padding: '0.5rem 0' }}>{application.academicDetails.previousPercentage}%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-3">
          <h4>Status & Timeline</h4>
          <div className="timeline">
            <div className="timeline-step completed">
              <div className="timeline-step-dot" />
              <div className="timeline-step-content">
                <strong>Application Submitted</strong>
                <p>{format(new Date(application.submittedAt), 'dd MMM yyyy, hh:mm a')}</p>
              </div>
            </div>
            <div className="timeline-step">
              <div className="timeline-step-dot" />
              <div className="timeline-step-content">
                <strong>Under Review</strong>
                <p>Expected: 7-10 working days</p>
              </div>
            </div>
            <div className="timeline-step">
              <div className="timeline-step-dot" />
              <div className="timeline-step-content">
                <strong>Approval</strong>
                <p>If eligible, within 15 days</p>
              </div>
            </div>
            <div className="timeline-step">
              <div className="timeline-step-dot" />
              <div className="timeline-step-content">
                <strong>Disbursement</strong>
                <p>Within 30 days of approval</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card mb-4">
        <h3>What's Next?</h3>
        <ul>
          <li>You will receive an email confirmation shortly</li>
          <li>Application will be reviewed within 7-10 working days</li>
          <li>Check your email regularly for updates</li>
          <li>You can track your application status using your Application ID</li>
          <li>Keep your documents ready for verification if required</li>
        </ul>
      </div>

      <div className="text-center">
        <div className="d-flex gap-2 justify-content-center flex-wrap">
          <Link to="/" className="btn">
            Return to Home
          </Link>
          <button
            type="button"
            onClick={() => window.print()}
            className="btn btn-secondary"
          >
            Print Application
          </button>
          <a
            href={`data:text/plain;charset=utf-8,${encodeURIComponent(
              JSON.stringify(application, null, 2)
            )}`}
            download={`application-${applicationId}.json`}
            className="btn btn-secondary"
          >
            Download Details
          </a>
        </div>
        
        <p className="text-muted mt-3">
          For any queries, please contact: scholarship.support@gov.in
        </p>
      </div>
    </div>
  );
};

export default Success;