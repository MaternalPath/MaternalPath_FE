import React from 'react';
import { FiAlertCircle, FiCalendar } from 'react-icons/fi';import './Css/PriorityAlert.css';

const PriorityAlert = ({ isMobile }) => {
  return (
    <div className="card">
      {!isMobile && <h3 className="section-title">Priority Alerts</h3>}
      <div className="priority-alert">
        <div className="alert-icon">
          <FiAlertCircle size={24} />
        </div>
        <div className="alert-content">
          <h4>Due Date in 128 Days</h4>
          <p>
            {isMobile 
              ? "Your estimated delivery date is September 18, 2026. Continue your prenatal care and savings progress."
              : "Continue your weekly savings to reach your delivery goal."
            }
          </p>
          {isMobile && (
            <button className="timeline-link">
              <FiCalendar size={14} /> View Pregnancy Timeline
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PriorityAlert;