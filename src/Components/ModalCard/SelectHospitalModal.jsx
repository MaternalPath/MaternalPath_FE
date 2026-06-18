import React, { useState } from 'react';
import './ModalCard.css';
import "./SelectModal.css"

const SelectHospitalModal = ({ isOpen, onClose, onNext, onPrevious, data, updateFields }) => {
  // Local state to manage which hospital card is selected
  
  if (!isOpen) return null;
  
  const hospitals = [
      {
          id: 1,
          name: "Lagos General Hospital",
          address: "Broad Street, Marina, Lagos",
          phone: "+234 1 234 5678",
          cost: "₦400,000"
        },
        {
            id: 2,
            name: "Augusta Memorial Hospital",
            address: "Central Business District, Apapa Lagos",
            phone: "+234 9 461 2345",
            cost: "₦450,000"
        },
        {
            id: 3,
            name: "Goldencross Specialist Hospital",
            address: "23 Rd Festac Town Lagos",
            phone: "+234 2 241 0088",
            cost: "₦380,000"
        }
    ];
    
    const [selectedHospitalId, setSelectedHospitalId] = useState(
      data.preferredHospital ? 
        hospitals.find(h => h.name === data.preferredHospital)?.id || 3 
        : 3
    );
  const handleNext = () => {
    const selectedHospital = hospitals.find(h => h.id === selectedHospitalId);
    if (selectedHospital) {
      updateFields({
        preferredHospital: selectedHospital.name,
        hospitalAddress: selectedHospital.address,
        hospitalContact: selectedHospital.phone,
        estimatedDeliveryCost: parseInt(selectedHospital.cost.replace(/[₦,]/g, '')) || 0
      });
    }
    onNext();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container scrollable-modal">
        
        {/* Header - Fixed */}
        <div className="modal-header">
          <h2>Select Hospital</h2>
          <button className="close-btn" onClick={onClose} aria-label="Close modal">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Search Field Area - Fixed */}
        <div className="search-container">
          <input 
            type="text" 
            placeholder="Search hospitals..." 
            className="hospital-search-input"
          />
        </div>

        {/* Scrollable Hospital List Wrapper */}
        <div className="modal-body hospital-list">
          {hospitals.map((hospital) => {
            const isSelected = selectedHospitalId === hospital.id;
            return (
              <div 
                key={hospital.id}
                className={`hospital-card ${isSelected ? 'active-hospital' : ''}`}
                onClick={() => setSelectedHospitalId(hospital.id)}
              >
                <div className="hospital-card-header">
                  <h3>{hospital.name}</h3>
                  <div className={`check-circle ${isSelected ? 'checked' : ''}`}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                </div>
                
                <p className="hospital-detail">{hospital.address}</p>
                <p className="hospital-detail">{hospital.phone}</p>
                
                <div className="hospital-card-divider"></div>
                
                <div className="hospital-cost-row">
                  <span className="cost-label">Estimated Cost</span>
                  <span className="cost-amount">{hospital.cost}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Buttons Layer - Fixed */}
        <div className="dual-btn-container">
          <button type="button" className="previous-btn" onClick={onPrevious}>Previous</button>
          <button type="button" className="submit-btn" onClick={handleNext}>Next</button>
        </div>

      </div>
    </div>
  );
};

export default SelectHospitalModal;