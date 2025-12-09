// FILE: src/utils/generateApplicationId.js
import { format } from 'date-fns';

/**
 * Generates a unique application ID in the format: SCH-YYYYMMDD-XXXX
 * where XXXX is a random 4-character alphanumeric string
 */
export const generateApplicationId = () => {
  const dateStr = format(new Date(), 'yyyyMMdd');
  const randomStr = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `SCH-${dateStr}-${randomStr}`;
};

/**
 * Generates a transaction ID for payments
 */
export const generateTransactionId = () => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000);
  return `TXN${timestamp}${random.toString().padStart(4, '0')}`;
};

/**
 * Seeds sample applications for demo purposes
 */
export const seedSampleApplications = () => {
  const applications = [
    {
      id: generateApplicationId(),
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
      payment: { 
        amount: 100, 
        status: 'paid',
        transactionId: generateTransactionId()
      }
    },
    {
      id: generateApplicationId(),
      status: 'approved',
      submittedAt: new Date('2023-12-10').toISOString(),
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
        schoolName: 'St. Xavier\'s College',
        board: 'CBSE',
        rollNo: 'SXC20231234',
        previousPercentage: '92.3'
      },
      documents: [],
      payment: { 
        amount: 100, 
        status: 'paid',
        transactionId: generateTransactionId()
      }
    }
  ];

  localStorage.setItem('applications', JSON.stringify(applications));
  return applications;
};
