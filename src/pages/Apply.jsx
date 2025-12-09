// FILE: src/pages/Apply.jsx
import StepWizard from '../components/StepWizard';
import { FormProvider } from '../context/FormContext';

const Apply = () => {
  return (
    <FormProvider>
      <div className="apply-page">
        <div className="text-center mb-4">
          <h1>Scholarship Application</h1>
          <p className="text-muted">
            Complete the following steps to apply for the scholarship.
            Your progress will be saved automatically.
          </p>
        </div>

        <StepWizard />

        <div className="card mt-4">
          <h4>Important Information</h4>
          <ul>
            <li>Application fee: ₹100 (non-refundable)</li>
            <li>Application deadline: 31st March 2024</li>
            <li>All documents must be clear and legible</li>
            <li>False information will lead to disqualification</li>
            <li>Keep your Application ID for future reference</li>
          </ul>
          <p className="mb-0">
            <strong>Need help?</strong> Contact support: scholarship.support@gov.in
          </p>
        </div>
      </div>
    </FormProvider>
  );
};

export default Apply;
