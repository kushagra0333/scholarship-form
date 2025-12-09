// FILE: src/components/AcademicStep.jsx
import { useState, useEffect } from 'react';
import { useForm } from '../context/FormContext';

const AcademicStep = () => {
  const { formData, updateFormData } = useForm();
  const [errors, setErrors] = useState({});

  const [academicDetails, setAcademicDetails] = useState({
    className: formData.academicDetails?.className || '',
    schoolName: formData.academicDetails?.schoolName || '',
    board: formData.academicDetails?.board || '',
    rollNo: formData.academicDetails?.rollNo || '',
    previousPercentage: formData.academicDetails?.previousPercentage || '',
  });

  useEffect(() => {
    updateFormData({ academicDetails });
  }, [academicDetails, updateFormData]);

  const validateField = (name, value) => {
    const newErrors = { ...errors };
    
    switch (name) {
      case 'className':
        if (!value.trim()) newErrors.className = 'Class/Course is required';
        else delete newErrors.className;
        break;
        
      case 'schoolName':
        if (!value.trim()) newErrors.schoolName = 'School/College name is required';
        else if (value.trim().length < 3) newErrors.schoolName = 'Enter valid institution name';
        else delete newErrors.schoolName;
        break;
        
      case 'board':
        if (!value.trim()) newErrors.board = 'Board/University is required';
        else delete newErrors.board;
        break;
        
      case 'rollNo':
        if (!value.trim()) newErrors.rollNo = 'Roll number is required';
        else delete newErrors.rollNo;
        break;
        
      case 'previousPercentage':
        if (!value.trim()) newErrors.previousPercentage = 'Percentage/CGPA is required';
        else {
          const num = parseFloat(value);
          if (isNaN(num) || num < 0 || num > 100) {
            newErrors.previousPercentage = 'Enter valid percentage (0-100) or CGPA';
          } else if (num < 60) {
            newErrors.previousPercentage = 'Minimum 60% required for scholarship';
          } else {
            delete newErrors.previousPercentage;
          }
        }
        break;
        
      default:
        if (!value.trim()) newErrors[name] = 'This field is required';
        else delete newErrors[name];
    }
    
    setErrors(newErrors);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAcademicDetails(prev => ({
      ...prev,
      [name]: value
    }));
    validateField(name, value);
  };

  const classes = [
    '10th Standard',
    '12th Standard',
    'Diploma 1st Year',
    'Diploma 2nd Year',
    'Diploma 3rd Year',
    'B.Tech 1st Year',
    'B.Tech 2nd Year',
    'B.Tech 3rd Year',
    'B.Tech 4th Year',
    'B.Sc 1st Year',
    'B.Sc 2nd Year',
    'B.Sc 3rd Year',
    'BA 1st Year',
    'BA 2nd Year',
    'BA 3rd Year',
    'MBA 1st Year',
    'MBA 2nd Year',
    'M.Tech 1st Year',
    'M.Tech 2nd Year',
  ];

  const boards = [
    'CBSE',
    'ICSE',
    'State Board',
    'University',
    'IGNOU',
    'Other'
  ];

  return (
    <div className="academic-step">
      <h2 className="text-center mb-3">Academic Details</h2>
      
      <div className="row" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        <div className="form-group" style={{ flex: '1 1 300px' }}>
          <label htmlFor="className" className="form-label">
            Class/Course *
          </label>
          <select
            id="className"
            name="className"
            value={academicDetails.className}
            onChange={handleChange}
            className={`form-control ${errors.className ? 'error' : ''}`}
            required
          >
            <option value="">Select Class/Course</option>
            {classes.map(cls => (
              <option key={cls} value={cls}>
                {cls}
              </option>
            ))}
          </select>
          {errors.className && <div className="error-message">{errors.className}</div>}
        </div>

        <div className="form-group" style={{ flex: '1 1 300px' }}>
          <label htmlFor="schoolName" className="form-label">
            School/College Name *
          </label>
          <input
            type="text"
            id="schoolName"
            name="schoolName"
            value={academicDetails.schoolName}
            onChange={handleChange}
            className={`form-control ${errors.schoolName ? 'error' : ''}`}
            placeholder="Enter institution name"
            required
          />
          {errors.schoolName && <div className="error-message">{errors.schoolName}</div>}
        </div>

        <div className="form-group" style={{ flex: '1 1 300px' }}>
          <label htmlFor="board" className="form-label">
            Board/University *
          </label>
          <select
            id="board"
            name="board"
            value={academicDetails.board}
            onChange={handleChange}
            className={`form-control ${errors.board ? 'error' : ''}`}
            required
          >
            <option value="">Select Board/University</option>
            {boards.map(board => (
              <option key={board} value={board}>
                {board}
              </option>
            ))}
          </select>
          {errors.board && <div className="error-message">{errors.board}</div>}
        </div>

        <div className="form-group" style={{ flex: '1 1 300px' }}>
          <label htmlFor="rollNo" className="form-label">
            Roll Number *
          </label>
          <input
            type="text"
            id="rollNo"
            name="rollNo"
            value={academicDetails.rollNo}
            onChange={handleChange}
            className={`form-control ${errors.rollNo ? 'error' : ''}`}
            placeholder="Enter roll number"
            required
          />
          {errors.rollNo && <div className="error-message">{errors.rollNo}</div>}
        </div>

        <div className="form-group" style={{ flex: '1 1 300px' }}>
          <label htmlFor="previousPercentage" className="form-label">
            Previous Year Percentage/CGPA *
          </label>
          <input
            type="number"
            id="previousPercentage"
            name="previousPercentage"
            value={academicDetails.previousPercentage}
            onChange={handleChange}
            className={`form-control ${errors.previousPercentage ? 'error' : ''}`}
            placeholder="Enter percentage or CGPA"
            min="0"
            max="100"
            step="0.01"
            required
          />
          {errors.previousPercentage && (
            <div className="error-message">{errors.previousPercentage}</div>
          )}
          <small className="text-muted">
            For CGPA, convert to percentage (CGPA * 9.5)
          </small>
        </div>
      </div>

      <div className="alert alert-info mt-3">
        <strong>Note:</strong> 
        <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
          <li>Minimum 60% in previous examination is required for scholarship eligibility</li>
          <li>Provide accurate roll number as per your institution records</li>
          <li>Upload relevant mark sheets in the next step for verification</li>
        </ul>
      </div>

      <div className="card mt-3">
        <h4>Eligibility Criteria</h4>
        <ul>
          <li>Minimum 60% marks in previous qualifying examination</li>
          <li>Regular attendance record (minimum 75%)</li>
          <li>No disciplinary actions pending</li>
          <li>Valid admission in recognized institution</li>
          <li>Family income below ₹8,00,000 per annum</li>
        </ul>
      </div>
    </div>
  );
};

export default AcademicStep;