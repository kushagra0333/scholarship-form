// FILE: src/components/PersonalStep.jsx
import { useState, useEffect } from 'react';
import { useForm } from '../context/FormContext';

const PersonalStep = () => {
  const { formData, updateFormData } = useForm();
  const [errors, setErrors] = useState({});

  const [personalDetails, setPersonalDetails] = useState({
    fullName: formData.personalDetails?.fullName || '',
    dob: formData.personalDetails?.dob || '',
    gender: formData.personalDetails?.gender || '',
    category: formData.personalDetails?.category || '',
    fatherName: formData.personalDetails?.fatherName || '',
    motherName: formData.personalDetails?.motherName || '',
    income: formData.personalDetails?.income || '',
    email: formData.personalDetails?.email || '',
    mobile: formData.personalDetails?.mobile || '',
    address: formData.personalDetails?.address || '',
  });

  useEffect(() => {
    updateFormData({ personalDetails });
  }, [personalDetails, updateFormData]);

  const validateField = (name, value) => {
    const newErrors = { ...errors };
    
    switch (name) {
      case 'fullName':
        if (!value.trim()) newErrors.fullName = 'Full name is required';
        else if (value.trim().length < 3) newErrors.fullName = 'Name must be at least 3 characters';
        else delete newErrors.fullName;
        break;
        
      case 'email':
        if (!value.trim()) newErrors.email = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) newErrors.email = 'Invalid email format';
        else delete newErrors.email;
        break;
        
      case 'mobile':
        if (!value.trim()) newErrors.mobile = 'Mobile number is required';
        else if (!/^[6-9]\d{9}$/.test(value)) newErrors.mobile = 'Invalid Indian mobile number';
        else delete newErrors.mobile;
        break;
        
      case 'dob':
        if (!value) newErrors.dob = 'Date of birth is required';
        else {
          const birthDate = new Date(value);
          const today = new Date();
          const age = today.getFullYear() - birthDate.getFullYear();
          if (age < 15 || age > 30) newErrors.dob = 'Age must be between 15 and 30 years';
          else delete newErrors.dob;
        }
        break;
        
      case 'income':
        if (!value.trim()) newErrors.income = 'Annual income is required';
        else if (isNaN(value) || parseFloat(value) < 0) newErrors.income = 'Invalid income amount';
        else delete newErrors.income;
        break;
        
      default:
        if (!value.trim()) newErrors[name] = 'This field is required';
        else delete newErrors[name];
    }
    
    setErrors(newErrors);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPersonalDetails(prev => ({
      ...prev,
      [name]: value
    }));
    validateField(name, value);
  };

  const categories = ['General', 'OBC', 'SC', 'ST', 'EWS'];
  const genders = ['Male', 'Female', 'Other'];

  return (
    <div className="personal-step">
      <h2 className="text-center mb-3">Personal Details</h2>
      
      <div className="row" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        <div className="form-group" style={{ flex: '1 1 300px' }}>
          <label htmlFor="fullName" className="form-label">
            Full Name *
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={personalDetails.fullName}
            onChange={handleChange}
            className={`form-control ${errors.fullName ? 'error' : ''}`}
            placeholder="Enter your full name"
            required
          />
          {errors.fullName && <div className="error-message">{errors.fullName}</div>}
        </div>

        <div className="form-group" style={{ flex: '1 1 300px' }}>
          <label htmlFor="dob" className="form-label">
            Date of Birth *
          </label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={personalDetails.dob}
            onChange={handleChange}
            className={`form-control ${errors.dob ? 'error' : ''}`}
            required
            max={new Date().toISOString().split('T')[0]}
          />
          {errors.dob && <div className="error-message">{errors.dob}</div>}
        </div>

        <div className="form-group" style={{ flex: '1 1 300px' }}>
          <label htmlFor="gender" className="form-label">
            Gender *
          </label>
          <select
            id="gender"
            name="gender"
            value={personalDetails.gender}
            onChange={handleChange}
            className={`form-control ${errors.gender ? 'error' : ''}`}
            required
          >
            <option value="">Select Gender</option>
            {genders.map(gender => (
              <option key={gender} value={gender.toLowerCase()}>
                {gender}
              </option>
            ))}
          </select>
          {errors.gender && <div className="error-message">{errors.gender}</div>}
        </div>

        <div className="form-group" style={{ flex: '1 1 300px' }}>
          <label htmlFor="category" className="form-label">
            Category *
          </label>
          <select
            id="category"
            name="category"
            value={personalDetails.category}
            onChange={handleChange}
            className={`form-control ${errors.category ? 'error' : ''}`}
            required
          >
            <option value="">Select Category</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errors.category && <div className="error-message">{errors.category}</div>}
        </div>

        <div className="form-group" style={{ flex: '1 1 300px' }}>
          <label htmlFor="fatherName" className="form-label">
            Father's Name *
          </label>
          <input
            type="text"
            id="fatherName"
            name="fatherName"
            value={personalDetails.fatherName}
            onChange={handleChange}
            className={`form-control ${errors.fatherName ? 'error' : ''}`}
            placeholder="Enter father's name"
            required
          />
          {errors.fatherName && <div className="error-message">{errors.fatherName}</div>}
        </div>

        <div className="form-group" style={{ flex: '1 1 300px' }}>
          <label htmlFor="motherName" className="form-label">
            Mother's Name *
          </label>
          <input
            type="text"
            id="motherName"
            name="motherName"
            value={personalDetails.motherName}
            onChange={handleChange}
            className={`form-control ${errors.motherName ? 'error' : ''}`}
            placeholder="Enter mother's name"
            required
          />
          {errors.motherName && <div className="error-message">{errors.motherName}</div>}
        </div>

        <div className="form-group" style={{ flex: '1 1 300px' }}>
          <label htmlFor="income" className="form-label">
            Annual Family Income (₹) *
          </label>
          <input
            type="number"
            id="income"
            name="income"
            value={personalDetails.income}
            onChange={handleChange}
            className={`form-control ${errors.income ? 'error' : ''}`}
            placeholder="Enter annual income"
            min="0"
            step="1000"
            required
          />
          {errors.income && <div className="error-message">{errors.income}</div>}
        </div>

        <div className="form-group" style={{ flex: '1 1 300px' }}>
          <label htmlFor="email" className="form-label">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={personalDetails.email}
            onChange={handleChange}
            className={`form-control ${errors.email ? 'error' : ''}`}
            placeholder="Enter email address"
            required
          />
          {errors.email && <div className="error-message">{errors.email}</div>}
        </div>

        <div className="form-group" style={{ flex: '1 1 300px' }}>
          <label htmlFor="mobile" className="form-label">
            Mobile Number *
          </label>
          <input
            type="tel"
            id="mobile"
            name="mobile"
            value={personalDetails.mobile}
            onChange={handleChange}
            className={`form-control ${errors.mobile ? 'error' : ''}`}
            placeholder="Enter 10-digit mobile number"
            pattern="[6-9]{1}[0-9]{9}"
            maxLength="10"
            required
          />
          {errors.mobile && <div className="error-message">{errors.mobile}</div>}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="address" className="form-label">
          Permanent Address *
        </label>
        <textarea
          id="address"
          name="address"
          value={personalDetails.address}
          onChange={handleChange}
          className={`form-control ${errors.address ? 'error' : ''}`}
          placeholder="Enter your complete address"
          rows="4"
          required
        />
        {errors.address && <div className="error-message">{errors.address}</div>}
      </div>

      <div className="alert alert-info mt-3">
        <strong>Note:</strong> All fields marked with * are mandatory. 
        Please ensure all information is accurate as per your official documents.
      </div>
    </div>
  );
};

export default PersonalStep;