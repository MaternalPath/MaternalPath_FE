import React from 'react';
import { FiActivity, FiClock } from 'react-icons/fi';
import './Css/HealthReminders.css';

const HealthReminders = ({ isMobile }) => {
  const reminders = isMobile ? [
    { icon: '🍎', title: 'Prenatal Vitamins', desc: 'Take with breakfast', color: 'blue-light' },
    { icon: '💧', title: 'Hydration', desc: '8 glasses daily', color: 'blue-light' }
  ] : [
    { icon: <FiClock size={20} />, title: 'Prenatal Vitamins', desc: 'Take your daily supplement', time: 'Morning', color: 'green' },
    { icon: <FiActivity size={20} />, title: 'Hydration Goal', desc: '8-10 glasses of water today', time: 'Throughout day', color: 'blue' },
    { icon: <FiActivity size={20} />, title: 'Gentle Exercise', desc: '20-minute walk recommended', time: 'Afternoon', color: 'blue' }
  ];

  return (
    <div className="card">
      <h3 className="section-title">
        {!isMobile && <FiActivity size={18} />} Health & Wellness Reminders
      </h3>
      <div className={isMobile ? "health-scroll" : "grid-3"}>
        {reminders.map((reminder, idx) => (
          <div key={idx} className={`health-card ${reminder.color}`}>
            <div className="health-icon">{reminder.icon}</div>
            <h4>{reminder.title}</h4>
            <p>{reminder.desc}</p>
            {!isMobile && (
              <div className="health-time">
                <FiClock size={12} /> {reminder.time}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HealthReminders;