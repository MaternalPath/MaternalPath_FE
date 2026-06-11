import React from 'react';
import { 
  FiRefreshCw, 
  FiPaperclip, 
  FiTrendingUp, 
  FiCalendar, 
  FiCheckCircle, 
  FiHeart, 
  FiCreditCard, 
  FiActivity 
} from 'react-icons/fi';
import NotificationItem from './NotificationItem/NotificationItem';
import '../Css/NotificationList.css';

const NotificationList = ({ isMobile }) => {
  const notifications = [
    { id: 1, icon: <FiRefreshCw size={20} />, title: 'You are now in Week 24 of your pregnancy', desc: isMobile ? "Your baby is growing beautifully. Check your weekly milestones and health guidance." : "Your baby is growing beautifully. Check your Pregnancy Tracker for this week's development updates.", time: '2 hours ago', tag: isMobile ? 'Pregnancy Update' : 'Pregnancy Updates', unread: true },
    { id: 2, icon: <FiActivity size={20} />, title: 'Daily prenatal vitamin reminder', desc: "Remember to take your daily prenatal vitamin with breakfast for optimal absorption.", time: '5 hours ago', tag: 'Health Reminder', unread: true },
    { id: 3, icon: <FiTrendingUp size={20} />, title: 'Savings milestone reached!', desc: "Congratulations! You've reached 70% of your emergency delivery fund goal.", time: '1 day ago', tag: 'Wallet Achievement', unread: false },
    { id: 4, icon: <FiCalendar size={20} />, title: 'Upcoming antenatal appointment tomorrow', desc: 'Checkup with Dr. Okonkwo at 10:00 AM on May 14, 2026 at Lagos General Hospital.', time: '1 day ago', tag: 'Health Reminders', unread: true },
    { id: 5, icon: <FiCheckCircle size={20} />, title: 'Hospital verification request completed', desc: 'Your emergency wallet has been verified for Lagos General Hospital admission.', time: '2 days ago', tag: 'Hospital Notifications', unread: false },
    { id: 6, icon: <FiCheckCircle size={20} />, title: isMobile ? 'Hydration checkpoint' : 'Hydration reminder', desc: isMobile ? 'Stay hydrated! Aim to drink 8 glasses of water today for you and your baby\'s health.' : 'Remember to drink 8-10 glasses of water today for you and your baby\'s health.', time: '2 days ago', tag: 'Health Reminders', unread: false },
    { id: 7, icon: <FiHeart size={20} />, title: 'Second trimester milestone reached', desc: 'Congratulations! You\'ve completed week 13 and entered your second trimester.', time: '3 days ago', tag: 'Pregnancy Updates', unread: false },
    { id: 8, icon: <FiCreditCard size={20} />, title: isMobile ? 'Weekly contribution due' : 'Weekly contribution reminder', desc: isMobile ? 'Your weekly savings contribution of ₦7,500 is due. Keep up your great progress!' : 'Your weekly savings contribution of ₦10,000 is due in 2 days.', time: '3 days ago', tag: isMobile ? 'Wallet Reminder' : 'Wallet Alerts', unread: false },
    { id: 9, icon: <FiHeart size={20} />, title: 'Second trimester progressing well', desc: 'You\'re doing wonderfully! Your wellness status shows excellent health progress.', time: '4 days ago', tag: 'Pregnancy Update', unread: false },
    { id: 10, icon: <FiActivity size={20} />, title: 'Safe exercise recommended this week', desc: 'Light walking and prenatal yoga are great for your current pregnancy stage.', time: '4 days ago', tag: 'Health Reminders', unread: false },
    { id: 11, icon: <FiActivity size={20} />, title: 'Hospital readiness status update', desc: 'Your delivery preparedness is at 71% based on your emergency wallet balance.', time: '5 days ago', tag: 'Hospital Notifications', unread: false }
  ];

  return (
    <div className="card">
      <h3 className="section-title">
        {isMobile ? 'Recent Updates' : 'All Notifications'}
      </h3>
      <div className="notif-list">
        {notifications.map(notif => (
          <NotificationItem key={notif.id} {...notif} isMobile={isMobile} />
        ))}
      </div>
      <button className="load-more">Load More Notifications</button>
    </div>
  );
};

export default NotificationList;