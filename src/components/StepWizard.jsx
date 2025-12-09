// FILE: src/components/StepWizard.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TermsStep from './TermsStep';
import PersonalStep from './PersonalStep';
import AcademicStep from './AcademicStep';
import DocumentsStep from './DocumentsStep';
import PaymentStep from './PaymentStep';
import { useForm } from '../context/FormContext';

const StepWizard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { formData, updateFormData, validateStep, resetForm } = useForm();
  const navigate = useNavigate();

  const steps = [
    { id: 1, label: 'Terms', component: TermsStep },
    { id: 2, label: 'Personal Details', component: PersonalStep },
    { id: 3, label: 'Academic Details', component: AcademicStep },
    { id: 4, label: 'Documents', component: DocumentsStep },
    { id: 5, label: 'Payment', component: PaymentStep },
  ];

  useEffect(() => {
    // Load current step from localStorage
    const savedStep = localStorage.getItem('currentStep');
    if (savedStep) {
      setCurrentStep(parseInt(savedStep));
    }
  }, []);

  const saveStep = (step) => {
    localStorage.setItem('currentStep', step.toString());
  };

  const handleNext = async () => {
    if (!validateStep(currentStep)) {
      return;
    }
    
    if (currentStep < steps.length) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      saveStep(nextStep);
      window.scrollTo(0, 0);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      saveStep(prevStep);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Generate application ID
    const applicationId = generateApplicationId();
    
    // Save application to localStorage
    const applications = JSON.parse(localStorage.getItem('applications') || '[]');
    const newApplication = {
      ...formData,
      id: applicationId,
      status: 'submitted',
      submittedAt: new Date().toISOString(),
    };
    
    applications.push(newApplication);
    localStorage.setItem('applications', JSON.stringify(applications));
    
    // Reset form
    resetForm();
    localStorage.removeItem('currentStep');
    localStorage.removeItem('scholarshipFormData');
    
    setIsSubmitting(false);
    
    // Navigate to success page
    navigate(`/success/${applicationId}`);
  };

  const CurrentComponent = steps.find(step => step.id === currentStep)?.component;

  return (
    <div className="step-wizard">
      {/* Progress Indicator */}
      <div className="steps-container">
        {steps.map((step) => (
          <div
            key={step.id}
            className={`step ${currentStep === step.id ? 'active' : ''} ${
              currentStep > step.id ? 'completed' : ''
            }`}
          >
            <div className="step-number">{step.id}</div>
            <div className="step-label">{step.label}</div>
          </div>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
        />
      </div>

      {/* Current Step Content */}
      <div className="form-step fade-in">
        {CurrentComponent && <CurrentComponent />}
        
        {/* Navigation Buttons */}
        <div className="step-actions">
          <button
            type="button"
            onClick={handlePrev}
            className="btn"
            disabled={currentStep === 1 || isSubmitting}
          >
            Previous
          </button>
          
          <div className="d-flex gap-2">
            {currentStep === steps.length ? (
              <button
                type="button"
                onClick={handleSubmit}
                className="btn btn-success"
                disabled={isSubmitting || !validateStep(currentStep)}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner" style={{ marginRight: '8px' }} />
                    Submitting...
                  </>
                ) : (
                  'Submit Application'
                )}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNext}
                className="btn"
                disabled={!validateStep(currentStep)}
              >
                Next Step
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to generate application ID
const generateApplicationId = () => {
  const now = new Date();
  const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '');
  const randomStr = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `SCH-${dateStr}-${randomStr}`;
};

export default StepWizard;