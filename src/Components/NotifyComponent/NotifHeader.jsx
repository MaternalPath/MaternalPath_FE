import React from 'react';
import './Css/NotifHeader.css';

const NotifHeader = () => {
  return (
    <div className="notif-header">
      <h1>Notifications</h1>
      <p className="desktop-notify">Stay updated with your pregnancy journey and delivery preparation.</p>
      <p className="mobile-notify">Stay updated with your pregnancy journey, savings progress, and health reminders</p>
    </div>
  );
};

export default NotifHeader;