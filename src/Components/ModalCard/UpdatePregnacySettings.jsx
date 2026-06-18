import React, { useState } from 'react';
import './ModalCard.css'; 
import { IoPersonCircleOutline } from "react-icons/io5";

const UpdatePregnancyModal = ({ isOpen, onClose, onNext, onPrevious, data, updateFields }) => {
  const [formData, setFormData] = useState({
    dueDate: data?.estimatedDueDate || "2026-09-18",
    currentWeek: data?.currentPregnancyWeek || 24,
    trimester: typeof data?.trimester === 'number' ? data.trimester : data?.trimester || 2,
    emergencyName: data?.emergencyContactName || "Chidi Nnamdi",
    emergencyContact: data?.emergencyContact || "08012345678",
    bloodType: data?.bloodType || "O+",
    allergies: data?.allergies || "None",
    conditions: data?.existingHealthConditions || "No known allergies",
  });

  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const validateField = (field, value) => {
    let error = '';

    if (field === 'dueDate') {
      if (!value) {
        error = 'Due date is required';
      } else {
        const selectedDate = new Date(value);
        const today = new Date();
        const maxDate = new Date();
        maxDate.setMonth(maxDate.getMonth() + 9);
        
        if (selectedDate < today) {
          error = 'Due date cannot be in the past';
        } else if (selectedDate > maxDate) {
          error = 'Due date cannot be more than 9 months from now';
        }
      }
    }

    if (field === 'currentWeek') {
      const numValue = parseInt(value);
      if (!value || value === '') {
        error = 'Current week is required';
      } else if (isNaN(numValue)) {
        error = 'Please enter a valid number';
      } else if (numValue < 1) {
        error = 'Week must be at least 1';
      } else if (numValue > 42) {
        error = 'Week cannot exceed 42';
      }
    }

    if (field === 'trimester') {
      const trimesterValue = Number(value);
      if (!value) {
        error = 'Trimester is required';
      } else if (![1, 2, 3].includes(trimesterValue)) {
        error = 'Trimester must be 1, 2 or 3';
      }
    }

    if (field === 'emergencyName') {
      if (!value || value.trim() === '') {
        error = 'Emergency contact name is required';
      } else if (value.trim().length < 2) {
        error = 'Name must be at least 2 characters';
      }
    }

    if (field === 'emergencyContact') {
      if (!value || value.trim() === '') {
        error = 'Emergency contact number is required';
      } else if (!/^[0-9]{10,15}$/.test(value.replace(/[\s\-()+]/g, ''))) {
        error = 'Please enter a valid phone number (10-15 digits)';
      }
    }

    if (field === 'bloodType') {
      if (!value) {
        error = 'Blood type is required';
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

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate all fields
    const dueDateError = validateField('dueDate', formData.dueDate);
    const weekError = validateField('currentWeek', formData.currentWeek);
    const trimesterError = validateField('trimester', formData.trimester);
    const nameError = validateField('emergencyName', formData.emergencyName);
    const contactError = validateField('emergencyContact', formData.emergencyContact);
    const bloodError = validateField('bloodType', formData.bloodType);
    
    const newErrors = {
      dueDate: dueDateError,
      currentWeek: weekError,
      trimester: trimesterError,
      emergencyName: nameError,
      emergencyContact: contactError,
      bloodType: bloodError,
    };
    
    setErrors(newErrors);
    
    // Check if there are any errors
    if (dueDateError || weekError || trimesterError || nameError || contactError || bloodError) {
      return;
    }
    
    // Map form data to match the parent state structure
    updateFields({
      estimatedDueDate: formData.dueDate,
      currentPregnancyWeek: parseInt(formData.currentWeek, 10) || 0,
      trimester: Number(formData.trimester),
      emergencyContactName: formData.emergencyName,
      emergencyContact: formData.emergencyContact,
      bloodType: formData.bloodType,
      allergies: formData.allergies,
      existingHealthConditions: formData.conditions,
    });
    onNext();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container scrollable-modal">
        
        {/* Header */}
        <div className="modal-header">
          <h2>Update Pregnancy Information</h2>
          <button className="close-btn" onClick={onClose} aria-label="Close modal">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Form Container */}
        <form className="modal-form" onSubmit={handleSubmit}>
          
          <div className="modal-body">
            
            {/* Estimated Due Date - Editable */}
            <div className="form-group">
              <label htmlFor="dueDate">Estimated Due Date</label>
              <div className="input-with-icon">
                <svg className="field-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a0abaa" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                <input 
                  type="date" 
                  id="dueDate" 
                  value={formData.dueDate}
                  onChange={(e) => handleChange("dueDate", e.target.value)}
                  onBlur={(e) => handleBlur("dueDate", e.target.value)}
                  className={errors.dueDate ? 'input-error' : ''}
                />
              </div>
              {errors.dueDate && <span className="error-message">{errors.dueDate}</span>}
            </div>

            {/* Current Week - Editable */}
            <div className="form-group">
              <label htmlFor="currentWeek">Current Week</label>
              <input 
                type="number" 
                id="currentWeek" 
                min="1"
                max="42"
                value={formData.currentWeek}
                onChange={(e) => handleChange("currentWeek", e.target.value)}
                onBlur={(e) => handleBlur("currentWeek", e.target.value)}
                className={errors.currentWeek ? 'input-error' : ''}
                placeholder="e.g. 24"
              />
              {errors.currentWeek && <span className="error-message">{errors.currentWeek}</span>}
            </div>

            {/* Current Trimester - Editable */}
            <div className="form-group">
              <label htmlFor="trimester">Current Trimester</label>
              <select 
                id="trimester" 
                value={formData.trimester}
                onChange={(e) => handleChange("trimester", e.target.value)}
                onBlur={(e) => handleBlur("trimester", e.target.value)}
                className={errors.trimester ? 'input-error' : ''}
              >
                <option value={1}>First Trimester</option>
                <option value={2}>Second Trimester</option>
                <option value={3}>Third Trimester</option>
              </select>
              {errors.trimester && <span className="error-message">{errors.trimester}</span>}
            </div>

            {/* Emergency Name - Editable */}
            <div className="form-group">
              <label htmlFor="emergencyName">Emergency Name</label>
              <div className="input-with-icon">
                <IoPersonCircleOutline className="field-icon" size={20} color="#a0abaa" />
                <input 
                  type="text" 
                  id="emergencyName" 
                  value={formData.emergencyName}
                  onChange={(e) => handleChange("emergencyName", e.target.value)}
                  onBlur={(e) => handleBlur("emergencyName", e.target.value)}
                  className={errors.emergencyName ? 'input-error' : ''}
                  placeholder="Enter emergency contact name"
                />
              </div>
              {errors.emergencyName && <span className="error-message">{errors.emergencyName}</span>}
            </div>

            {/* Emergency Contact - Editable */}
            <div className="form-group">
              <label htmlFor="emergencyContact">Emergency Contact</label>
              <div className="input-with-icon">
                <svg className="field-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a0abaa" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0.7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <input 
                  type="tel" 
                  id="emergencyContact" 
                  value={formData.emergencyContact}
                  onChange={(e) => handleChange("emergencyContact", e.target.value)}
                  onBlur={(e) => handleBlur("emergencyContact", e.target.value)}
                  className={errors.emergencyContact ? 'input-error' : ''}
                  placeholder="08012345678"
                />
              </div>
              {errors.emergencyContact && <span className="error-message">{errors.emergencyContact}</span>}
            </div>

            {/* Blood Type - Editable */}
            <div className="form-group">
              <label htmlFor="bloodType">Blood Type</label>
              <select 
                id="bloodType" 
                value={formData.bloodType}
                onChange={(e) => handleChange("bloodType", e.target.value)}
                onBlur={(e) => handleBlur("bloodType", e.target.value)}
                className={errors.bloodType ? 'input-error' : ''}
              >
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
              {errors.bloodType && <span className="error-message">{errors.bloodType}</span>}
            </div>

            {/* Known Allergies - Editable */}
            <div className="form-group">
              <label htmlFor="allergies">Known Allergies</label>
              <input 
                type="text" 
                id="allergies" 
                value={formData.allergies}
                onChange={(e) => handleChange("allergies", e.target.value)}
                placeholder="e.g. Penicillin, None"
              />
            </div>

            {/* Existing Health Conditions - Editable */}
            <div className="form-group">
              <label htmlFor="conditions">Existing Health Conditions</label>
              <textarea 
                id="conditions" 
                value={formData.conditions}
                onChange={(e) => handleChange("conditions", e.target.value)}
                rows="3"
                placeholder="List any existing conditions"
              />
            </div>
            
          </div>

          {/* Action Buttons */}
          <div className="dual-btn-container">
            <button type="button" className="previous-btn" onClick={onPrevious}>Prev</button>
            <button type="submit" className="submit-btn">Next</button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default UpdatePregnancyModal;