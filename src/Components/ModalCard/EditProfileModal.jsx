import React from 'react';
import './ModalCard.css';
import { IoPersonCircleOutline } from "react-icons/io5";

const EditPersonalInformationModal = ({ isOpen, onClose, onNext, onPrevious, data, updateFields }) => {
  if (!isOpen) return null;

  const handleChange = (e) => {
    const { id, value } = e.target;
    updateFields({ [id]: value });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container scrollable-modal">
        
        {/* Header */}
        <div className="modal-header">
          <h2>Edit Personal Information</h2>
          <button className="close-btn" onClick={onClose} aria-label="Close modal">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Form Container */}
        <form className="modal-form" onSubmit={(e) => e.preventDefault()}>
          
          {/* CRITICAL: THIS WAS MISSING. The dedicated scroll area wrapper */}
          <div className="modal-body">
            
            {/* First Name - Read Only */}
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input 
                type="text" 
                id="firstName" 
                value={data.firstName || 'Adeaze'}
                onChange={handleChange}
                className="readonly-input"
              />
            </div>

            {/* Last Name - Read Only */}
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input 
                type="text" 
                id="lastName" 
                value={data.lastName || 'Nnamdi'}
                onChange={handleChange}
                className="readonly-input"
              />
            </div>

            {/* Email Address - Read Only */}
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-with-icon">
                <svg className="field-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a0abaa" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <input 
                  type="email" 
                  id="email" 
                  value={data.email || 'adeaze.nnamdi@email.com'}
                  onChange={handleChange}
                  className="readonly-input"
                />
              </div>
            </div>

            {/* Phone Number - Editable */}
            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <div className="input-with-icon">
                <svg className="field-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a0abaa" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <input 
                  type="text" 
                  id="phoneNumber" 
                  value={data.phoneNumber || '08012345678'}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Date of Birth - Editable */}
            <div className="form-group">
              <label htmlFor="dateOfBirth">Date of Birth</label>
              <div className="input-with-icon">
                <svg className="field-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a0abaa" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                <input 
                  type="date" 
                  id="dateOfBirth" 
                  value={data.dateOfBirth || '1995-03-15'}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Location - Editable */}
            <div className="form-group">
              <label htmlFor="address">Location</label>
              <div className="input-with-icon">
                <svg className="field-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a0abaa" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <input 
                  type="text" 
                  id="address" 
                  value={data.address || 'Lagos, Nigeria'}
                  onChange={handleChange}
                />
              </div>
            </div>

          </div> {/* END OF SCROLL Area */}

          {/* Action Buttons - Keeps buttons locked below scroll area */}
          <div className="dual-btn-container">
            <button type="button" className="previous-btn" onClick={onPrevious}>Previous</button>
            <button type="button" className="submit-btn" onClick={onNext}>Next</button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default EditPersonalInformationModal;