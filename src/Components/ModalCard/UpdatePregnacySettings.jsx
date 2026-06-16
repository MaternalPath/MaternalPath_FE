import React, { useState } from 'react';
import './ModalCard.css'; 
import { IoPersonCircleOutline } from "react-icons/io5";

const UpdatePregnancyModal = ({ isOpen, onClose, onNext, onPrevious, initialData = {} }) => {
  const [formData, setFormData] = useState({
    dueDate: initialData.dueDate || "2026-09-18",
    currentWeek: initialData.currentWeek || 24,
    trimester: initialData.trimester || "Second Trimester",
    emergencyName: initialData.emergencyName || "Chidi Nnamdi",
    emergencyContact: initialData.emergencyContact || "08012345678",
    bloodType: initialData.bloodType || "O+",
    allergies: initialData.allergies || "None",
    conditions: initialData.conditions || "No known allergies",
  });

  if (!isOpen) return null;

  const handleChange = (field, value) => {
    setFormData(prev => ({...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext(formData); // pass data to next step
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
                />
              </div>
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
                placeholder="e.g. 24"
              />
            </div>

            {/* Current Trimester - Editable */}
            <div className="form-group">
              <label htmlFor="trimester">Current Trimester</label>
              <select 
                id="trimester" 
                value={formData.trimester}
                onChange={(e) => handleChange("trimester", e.target.value)}
              >
                <option value="First Trimester">First Trimester</option>
                <option value="Second Trimester">Second Trimester</option>
                <option value="Third Trimester">Third Trimester</option>
              </select>
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
                  placeholder="Enter emergency contact name"
                />
              </div>
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
                  placeholder="08012345678"
                />
              </div>
            </div>

            {/* Blood Type - Editable */}
            <div className="form-group">
              <label htmlFor="bloodType">Blood Type</label>
              <select 
                id="bloodType" 
                value={formData.bloodType}
                onChange={(e) => handleChange("bloodType", e.target.value)}
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