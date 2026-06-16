import React from 'react';
import './ModalCard.css';

const EmergencyWalletModal = ({ isOpen, onClose, onSubmit, onPrevious }) => {
  if (!isOpen) return null;

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
        <form className="modal-form" onSubmit={(e) => e.preventDefault()}>
          
          {/* Savings Goal Input */}
          <div className="form-group">
            <label htmlFor="savingsGoal">Savings Goal</label>
            <input 
              type="text" 
              id="savingsGoal" 
              defaultValue="400000" 
              className="numeric-input-style" 
            />
          </div>

          {/* Weekly Contribution Input */}
          <div className="form-group">
            <label htmlFor="weeklyContribution">Weekly Contribution</label>
            <input 
              type="text" 
              id="weeklyContribution" 
              defaultValue="7500" 
              className="numeric-input-style" 
            />
          </div>

          {/* Savings Summary Container Box */}
          <div className="savings-summary-box">
            <h3>Savings Summary</h3>
            
            <div className="summary-row">
              <span className="summary-label">Current Balance</span>
              <span className="summary-value emphasis-teal">₦285,000</span>
            </div>
            
            <div className="summary-row">
              <span className="summary-label">New Goal</span>
              <span className="summary-value emphasis-teal">₦400,000</span>
            </div>
            
            <div className="summary-row">
              <span className="summary-label">Remaining</span>
              <span className="summary-value emphasis-orange">₦115,000</span>
            </div>
            
            <div className="summary-divider"></div>
            
            <div className="summary-row base-metric-row">
              <span className="summary-label">Weeks to Goal</span>
              <span className="summary-value emphasis-teal">16 weeks</span>
            </div>
          </div>

          {/* Action Footer Buttons Layer */}
          <div className="dual-btn-container">
            <button type="button" className="previous-btn" onClick={onPrevious}>Previous</button>
            <button type="button" className="submit-btn" onClick={onSubmit}>Submit</button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default EmergencyWalletModal;