import React from 'react';
import { FiClock, FiTrash2 } from 'react-icons/fi';
import './NotificationItem.css';

const NotificationItem = ({ icon, title, desc, time, tag, unread, isMobile }) => {
  return (
    <div className={`notif-item ${isMobile ? 'mobile-card' : ''} ${unread ? 'unread' : ''}`}>
      <div className="notif-icon">{icon}</div>
      <div className="notif-content">
        <h4>{title}</h4>
        <p>{desc}</p>
        {isMobile ? (
          <div className="notif-meta-mobile">
            <span className="tag-pill">{tag}</span>
            <div className="meta-right">
              <FiClock size={12} />
              <span>{time}</span>
              <button className="delete-btn">
                <FiTrash2 size={14} />
              </button>
            </div>
          </div>
        ) : (
          <div className="notif-meta">
            <FiClock size={12} />
            <span>{time}</span>
            <span className="dot">•</span>
            <span>{tag}</span>
          </div>
        )}
      </div>
      {unread && <div className={isMobile ? "unread-dot-mobile" : "unread-dot"}></div>}
    </div>
  );
};

export default NotificationItem;