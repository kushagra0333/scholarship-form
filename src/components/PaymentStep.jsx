// FILE: src/components/PaymentStep.jsx
import { useState, useEffect } from 'react';
import { useForm } from '../context/FormContext';

const PaymentStep = () => {
  const { formData, updateFormData } = useForm();
  const [paymentStatus, setPaymentStatus] = useState(formData.payment?.status || 'pending');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    updateFormData({ 
      payment: { 
        amount: 100, 
        status: paymentStatus,
        transactionId: paymentStatus === 'paid' ? `TXN${Date.now()}` : null
      } 
    });
  }, [paymentStatus, updateFormData]);

  const simulatePayment = () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setPaymentStatus('paid');
      setIsProcessing(false);
      setShowModal(true);
      
      // Auto-close modal after 3 seconds
      setTimeout(() => {
        setShowModal(false);
      }, 3000);
    }, 2000);
  };

  const paymentMethods = [
    { id: 'upi', name: 'UPI', icon: '💳' },
    { id: 'card', name: 'Credit/Debit Card', icon: '🏦' },
    { id: 'netbanking', name: 'Net Banking', icon: '🌐' },
    { id: 'wallet', name: 'Wallet', icon: '📱' },
  ];

  return (
    <div className="payment-step">
      <h2 className="text-center mb-3">Payment</h2>
      
      <div className="card mb-3">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 className="mb-0">Application Fee</h3>
          <span className="text-danger" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
            ₹100
          </span>
        </div>
        
        <p className="text-muted mb-3">
          Non-refundable application fee for scholarship processing.
        </p>
        
        <div className="alert alert-info">
          <strong>Note:</strong> This fee is mandatory for all applications. 
          Payment confirmation is required to complete the submission.
        </div>
      </div>

      {paymentStatus === 'pending' && (
        <div className="card mb-3">
          <h4 className="mb-3">Select Payment Method</h4>
          
          <div className="payment-methods">
            {paymentMethods.map(method => (
              <label 
                key={method.id}
                className="payment-method-card"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '1rem',
                  border: '2px solid var(--border)',
                  borderRadius: '8px',
                  marginBottom: '0.75rem',
                  cursor: 'pointer',
                  transition: 'all var(--transition-normal) var(--easing)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--primary)';
                  e.currentTarget.style.backgroundColor = 'var(--primary-light)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border)';
                  e.currentTarget.style.backgroundColor = 'var(--bg-white)';
                }}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value={method.id}
                  defaultChecked={method.id === 'upi'}
                  style={{ marginRight: '1rem' }}
                />
                <span style={{ fontSize: '1.5rem', marginRight: '1rem' }}>
                  {method.icon}
                </span>
                <span style={{ fontWeight: '500' }}>{method.name}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      <div className="card mb-3">
        <h4 className="mb-3">Payment Summary</h4>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <tbody>
            <tr>
              <td style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--border)' }}>
                Application Fee
              </td>
              <td style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--border)', textAlign: 'right' }}>
                ₹100
              </td>
            </tr>
            <tr>
              <td style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--border)' }}>
                Processing Fee
              </td>
              <td style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--border)', textAlign: 'right' }}>
                ₹0
              </td>
            </tr>
            <tr>
              <td style={{ padding: '0.5rem 0', fontWeight: 'bold' }}>
                Total Amount
              </td>
              <td style={{ padding: '0.5rem 0', fontWeight: 'bold', textAlign: 'right' }}>
                ₹100
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {paymentStatus === 'pending' ? (
        <div className="text-center">
          <button
            type="button"
            onClick={simulatePayment}
            className="btn btn-success"
            disabled={isProcessing}
            style={{ minWidth: '200px', padding: '1rem 2rem', fontSize: '1.1rem' }}
          >
            {isProcessing ? (
              <>
                <span className="spinner" style={{ marginRight: '8px' }} />
                Processing Payment...
              </>
            ) : (
              'Pay ₹100 (Simulate)'
            )}
          </button>
          
          <p className="text-muted mt-2">
            Click to simulate payment. No actual payment will be processed.
          </p>
        </div>
      ) : (
        <div className="alert alert-success text-center">
          <h4>✅ Payment Successful!</h4>
          <p className="mb-2">
            Your payment of ₹100 has been processed successfully.
          </p>
          <p className="mb-0">
            Transaction ID: <strong>{formData.payment?.transactionId}</strong>
          </p>
        </div>
      )}

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="text-center">
              <div style={{ fontSize: '48px', color: 'var(--secondary)', marginBottom: '1rem' }}>
                ✅
              </div>
              <h3>Payment Successful!</h3>
              <p className="mb-3">
                Your payment has been processed successfully.
              </p>
              <p className="mb-3">
                Transaction ID: <strong>{formData.payment?.transactionId}</strong>
              </p>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="btn"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="alert alert-info mt-3">
        <strong>Security:</strong> This is a demonstration. No real payment processing occurs. 
        In the actual portal, you would be redirected to a secure payment gateway.
      </div>
    </div>
  );
};

export default PaymentStep;