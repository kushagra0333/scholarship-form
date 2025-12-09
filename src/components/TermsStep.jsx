// FILE: src/components/TermsStep.jsx
import { useState, useEffect } from 'react';
import { useForm } from '../context/FormContext';

const TermsStep = () => {
  const { formData, updateFormData } = useForm();
  const [accepted, setAccepted] = useState(formData.termsAccepted || false);

  useEffect(() => {
    updateFormData({ termsAccepted: accepted });
  }, [accepted, updateFormData]);

  const handleAccept = () => {
    setAccepted(true);
  };

  const handleDecline = () => {
    setAccepted(false);
  };

  return (
    <div className="terms-step">
      <h2 className="text-center mb-3">Terms & Conditions</h2>
      
      <div className="card mb-3">
        <div className="terms-content" style={{ maxHeight: '400px', overflowY: 'auto', padding: '1rem' }}>
          <h3>Scholarship Application Terms</h3>
          
          <h4>Eligibility Criteria</h4>
          <p>
            1. Applicant must be a citizen of India.<br />
            2. Must be enrolled in a recognized educational institution.<br />
            3. Family annual income should be below ₹8,00,000.<br />
            4. Minimum academic performance: 60% in previous examination.<br />
            5. Age limit: 18-25 years for undergraduate programs.
          </p>

          <h4>Application Process</h4>
          <p>
            1. Complete all required fields accurately.<br />
            2. Upload clear scanned copies of required documents.<br />
            3. Pay the non-refundable application fee of ₹100.<br />
            4. Application submission deadline: 31st March 2024.<br />
            5. Incomplete applications will be rejected.
          </p>

          <h4>Document Requirements</h4>
          <p>
            1. Recent passport-size photograph<br />
            2. Identity proof (Aadhaar Card/Passport)<br />
            3. Income certificate<br />
            4. Previous year mark sheet<br />
            5. Bank account details<br />
            6. Category certificate (if applicable)
          </p>

          <h4>Important Notes</h4>
          <p>
            • All information provided must be genuine and verifiable.<br />
            • Providing false information will lead to disqualification and legal action.<br />
            • Scholarship amount will be disbursed directly to the beneficiary's bank account.<br />
            • Renewal of scholarship is subject to satisfactory academic performance.<br />
            • The decision of the scholarship committee will be final.
          </p>

          <h4>Privacy Policy</h4>
          <p>
            We respect your privacy and are committed to protecting your personal data. 
            The information collected will be used solely for scholarship processing purposes 
            and will not be shared with third parties without your consent, except as required by law.
          </p>
        </div>
      </div>

      <div className="alert alert-info">
        <strong>Note:</strong> Please read all terms carefully before proceeding. 
        You must accept the terms to continue with the application.
      </div>

      <div className="form-group">
        <div className="d-flex gap-2 align-items-center mb-2">
          <input
            type="checkbox"
            id="termsAccepted"
            checked={accepted}
            onChange={(e) => setAccepted(e.target.checked)}
            className="form-control"
            style={{ width: '20px', height: '20px' }}
          />
          <label htmlFor="termsAccepted" className="form-label mb-0">
            I have read, understood, and agree to all the terms and conditions mentioned above.
          </label>
        </div>
        
        {!accepted && (
          <p className="error-message">
            You must accept the terms and conditions to proceed
          </p>
        )}
      </div>

      
    </div>
  );
};

export default TermsStep;