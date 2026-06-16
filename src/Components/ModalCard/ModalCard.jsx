import React from 'react';
import './ModalCard.css';

const EditProfileModal = ({ isOpen, onClose, onNext }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        
        {/* Header */}
        <div className="modal-header">
          <h2>Edit Profile</h2>
          <button className="close-btn" onClick={onClose} aria-label="Close modal">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Profile Image Section */}
        <div className="avatar-container">
          <div className="avatar-circle">
            <svg className="avatar-icon" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#7a8b8b" strokeWidth="1.5">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <button className="edit-avatar-btn" aria-label="Edit photo">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Form Fields */}
        <form className="modal-form" onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input 
              type="text" 
              id="firstName" 
              defaultValue="Adeaze" 
              readOnly 
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input 
              type="text" 
              id="lastName" 
              defaultValue=" Nnamdi" 
              readOnly 
            />
          </div>

          {/* Action Button */}
          <button type="submit" className="submit-btn" onClick={onNext}>Next</button>
        </form>

      </div>
    </div>
  );
};

export default EditProfileModal;