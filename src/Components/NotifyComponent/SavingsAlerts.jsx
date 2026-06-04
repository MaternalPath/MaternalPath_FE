import React from 'react';
import { FiHome, FiCheckCircle, FiClock, FiTrendingUp } from 'react-icons/fi';import './Css/SavingsAlerts.css';

const SavingsAlerts = ({ isMobile }) => {
  const alerts = [
    { icon: <FiTrendingUp size={20} />, title: 'Savings Milestone Reached', desc: '70% of delivery fund goal achieved', time: '1 day ago' },
    { icon: <FiClock size={20} />, title: 'Weekly Contribution Due', desc: '₦10,000 contribution due in 2 days', time: '2 days ago' }
  ];

  return (
    <div className="card">
      <h3 className="section-title">
        {!isMobile && <FiHome size={18} />} Savings & Wallet Alerts
      </h3>
      <div className={isMobile ? "savings-scroll" : "grid-2"}>
        {alerts.map((alert, idx) => (
          <div key={idx} className="mini-card">
            <div className="mini-icon">{alert.icon}</div>
            <div>
              <h4>{alert.title}</h4>
              <p>{alert.desc}</p>
              <div className="notif-meta">
                <FiClock size={12} /> {alert.time}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavingsAlerts;