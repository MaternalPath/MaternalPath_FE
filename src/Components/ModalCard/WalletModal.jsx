import React, { useState } from 'react';
import './ModalCard.css';

const EmergencyWalletModal = ({ isOpen, onClose, onSubmit, onPrevious, data, updateFields }) => {
  const [formData, setFormData] = useState({
    savingsGoal: data?.savingsGoalAmount || 0,
    weeklyContribution: data?.weeklyContribution || 0,
  });

  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const validateField = (field, value) => {
    const numValue = parseFloat(value);
    let error = '';

    if (field === 'savingsGoal') {
      if (!value || value === '') {
        error = 'Savings goal is required';
      } else if (isNaN(numValue)) {
        error = 'Please enter a valid number';
      } else if (numValue < 1000) {
        error = 'Savings goal must be at least ₦1,000';
      } else if (numValue > 100000000) {
        error = 'Savings goal cannot exceed ₦100,000,000';
      }
    }

    if (field === 'weeklyContribution') {
      if (!value || value === '') {
        error = 'Weekly contribution is required';
      } else if (isNaN(numValue)) {
        error = 'Please enter a valid number';
      } else if (numValue < 100) {
        error = 'Weekly contribution must be at least ₦100';
      } else if (numValue > 1000000) {
        error = 'Weekly contribution cannot exceed ₦1,000,000';
      }
    }

    return error;
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({...prev, [field]: '' }));
    }
  };

  const handleBlur = (field, value) => {
    const error = validateField(field, value);
    setErrors(prev => ({...prev, [field]: error }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    // Validate all fields
    const savingsGoalError = validateField('savingsGoal', formData.savingsGoal);
    const weeklyError = validateField('weeklyContribution', formData.weeklyContribution);
    
    const newErrors = {
      savingsGoal: savingsGoalError,
      weeklyContribution: weeklyError,
    };
    
    setErrors(newErrors);
    
    // Check if there are any errors
    if (savingsGoalError || weeklyError) {
      return;
    }
    
    // Update parent state with wallet data
    updateFields({
      savingsGoalAmount: parseFloat(formData.savingsGoal) || 0,
      weeklyContribution: parseFloat(formData.weeklyContribution) || 0,
    });
    onSubmit();
  };

  // Calculate derived values for summary
  const currentBalance = 0; // This could come from API in the future
  const goalAmount = parseFloat(formData.savingsGoal) || 0;
  const weeklyAmount = parseFloat(formData.weeklyContribution) || 0;
  const remaining = goalAmount - currentBalance;
  const weeksToGoal = weeklyAmount > 0 ? Math.ceil(remaining / weeklyAmount) : 0;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        
        {/* Header - Matching Savings Goal Modal (2).png */}
        <div className="modal-header">
          <h2>Edit Savings Goal</h2>
          <button className="close-btn" onClick={onClose} aria-label="Close modal">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Form Content */}
        <form className="modal-form" onSubmit={handleFormSubmit}>
          
          {/* Savings Goal Input */}
          <div className="form-group">
            <label htmlFor="savingsGoal">Savings Goal</label>
            <input 
              type="number" 
              id="savingsGoal" 
              value={formData.savingsGoal}
              onChange={(e) => handleChange("savingsGoal", e.target.value)}
              onBlur={(e) => handleBlur("savingsGoal", e.target.value)}
              className={`numeric-input-style ${errors.savingsGoal ? 'input-error' : ''}`}
              min="0"
              step="1000"
              placeholder="Enter savings goal amount"
            />
            {errors.savingsGoal && <span className="error-message">{errors.savingsGoal}</span>}
          </div>

          {/* Weekly Contribution Input */}
          <div className="form-group">
            <label htmlFor="weeklyContribution">Weekly Contribution</label>
            <input 
              type="number" 
              id="weeklyContribution" 
              value={formData.weeklyContribution}
              onChange={(e) => handleChange("weeklyContribution", e.target.value)}
              onBlur={(e) => handleBlur("weeklyContribution", e.target.value)}
              className={`numeric-input-style ${errors.weeklyContribution ? 'input-error' : ''}`}
              min="0"
              step="100"
              placeholder="Enter weekly contribution amount"
            />
            {errors.weeklyContribution && <span className="error-message">{errors.weeklyContribution}</span>}
          </div>

          {/* Savings Summary Container Box */}
          <div className="savings-summary-box">
            <h3>Savings Summary</h3>
            
            <div className="summary-row">
              <span className="summary-label">Current Balance</span>
              <span className="summary-value emphasis-teal">₦{currentBalance.toLocaleString()}</span>
            </div>
            
            <div className="summary-row">
              <span className="summary-label">New Goal</span>
              <span className="summary-value emphasis-teal">₦{goalAmount.toLocaleString()}</span>
            </div>
            
            <div className="summary-row">
              <span className="summary-label">Remaining</span>
              <span className="summary-value emphasis-orange">₦{remaining.toLocaleString()}</span>
            </div>
            
            <div className="summary-divider"></div>
            
            <div className="summary-row base-metric-row">
              <span className="summary-label">Weeks to Goal</span>
              <span className="summary-value emphasis-teal">{weeksToGoal} weeks</span>
            </div>
          </div>

          {/* Action Footer Buttons Layer */}
          <div className="dual-btn-container">
            <button type="button" className="previous-btn" onClick={onPrevious}>Previous</button>
            <button type="submit" className="submit-btn">Submit</button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default EmergencyWalletModal;