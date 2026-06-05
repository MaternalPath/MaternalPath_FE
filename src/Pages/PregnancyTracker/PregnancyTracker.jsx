import React from 'react'
import "../../Components/NotifyComponent/Css/NotifHeader.css"
import PregnancyHeroCard from '../../Components/DashboardHomeComponent/PregnancyHeroCard'

const PregnamcyTracker = () => {
  const userData = {
    name: "Adaeze Nnamdi",
    week: 24,
    trimester: "Second Trimester",
    dueDate: "September 18, 2026",
    daysUntilDue: 128,
    hospital: "Lagos General Hospital",
    pregnancyProgress: 60,
    walletBalance: 285000,
    savingsGoal: 400000,
    savingsProgress: 71,
    readinessStatus: "Moderate Preparedness",
  };
  return (
    <>
    <div className="notif-header">
      <h1>Pregnancy Tracker</h1>
      <p className="desktop-notify">Follow your Pregnancy journey week by week.</p>
      <p className="mobile-notify">Stay updated with your pregnancy journey, savings progress, and health reminders</p>
    </div>
    <PregnancyHeroCard data={userData}/>
    </>
  )
}

export default PregnamcyTracker
