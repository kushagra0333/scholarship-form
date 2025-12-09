// FILE: src/context/FormContext.jsx
import { createContext, useState, useContext, useEffect, useCallback } from 'react';

const FormContext = createContext();

const initialFormData = {
  termsAccepted: false,
  personalDetails: {
    fullName: '',
    dob: '',
    gender: '',
    category: '',
    fatherName: '',
    motherName: '',
    income: '',
    email: '',
    mobile: '',
    address: '',
  },
  academicDetails: {
    className: '',
    schoolName: '',
    board: '',
    rollNo: '',
    previousPercentage: '',
  },
  documents: [],
  payment: {
    amount: 100,
    status: 'pending',
    transactionId: null,
  },
};

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem('scholarshipFormData');
    return savedData ? JSON.parse(savedData) : initialFormData;
  });

  // Auto-save to localStorage
  useEffect(() => {
    localStorage.setItem('scholarshipFormData', JSON.stringify(formData));
  }, [formData]);

  const updateFormData = useCallback((updates) => {
    setFormData(prev => ({
      ...prev,
      ...updates,
    }));
  }, []);

  const validateStep = useCallback((step) => {
    switch (step) {
      case 1:
        return formData.termsAccepted === true;

      case 2:
        const personal = formData.personalDetails;
        return (
          personal.fullName?.trim() &&
          personal.dob &&
          personal.gender &&
          personal.category &&
          personal.fatherName?.trim() &&
          personal.motherName?.trim() &&
          personal.income &&
          personal.email?.trim() &&
          personal.mobile?.trim() &&
          personal.address?.trim() &&
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personal.email) &&
          /^[6-9]\d{9}$/.test(personal.mobile)
        );

      case 3:
        const academic = formData.academicDetails;
        return (
          academic.className?.trim() &&
          academic.schoolName?.trim() &&
          academic.board?.trim() &&
          academic.rollNo?.trim() &&
          academic.previousPercentage &&
          parseFloat(academic.previousPercentage) >= 60 &&
          parseFloat(academic.previousPercentage) <= 100
        );

      case 4:
        // For demo, require at least 2 documents
        return formData.documents.length >= 2;

      case 5:
        return formData.payment?.status === 'paid';

      default:
        return false;
    }
  }, [formData]);

  const resetForm = useCallback(() => {
    setFormData(initialFormData);
    localStorage.removeItem('scholarshipFormData');
  }, []);

  return (
    <FormContext.Provider value={{
      formData,
      updateFormData,
      validateStep,
      resetForm,
    }}>
      {children}
    </FormContext.Provider>
  );
};

export const useForm = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useForm must be used within FormProvider');
  }
  return context;
};