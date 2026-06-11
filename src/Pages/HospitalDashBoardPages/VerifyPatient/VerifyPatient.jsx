import React, { useState } from 'react';
import { Search, FileCheck, CheckCircle2, Clock, Shield, Lock, BadgeCheck } from 'lucide-react';
import './VerifyPatient.css';
import BabyIcon from "../../../assets/babyhead.png"
import SearchIcon from "../../../assets/searchIcon.png"

const VerifyPatient = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const patients = [
    {
      id: 1,
      name: 'Chidinma Okonkwo',
      week: 'Week 24',
      dueDate: 'Oct 12, 2026',
      hospital: 'Lagos University Hospital',
      balance: '₦285,000',
      goal: 71,
      status: 'Approved'
    },
    {
      id: 2,
      name: 'Ngozi Adebayo',
      week: 'Week 32',
      dueDate: 'Aug 24, 2026',
      hospital: 'General Hospital Ikeja',
      balance: '₦380,000',
      goal: 84,
      status: 'Pending'
    },
    {
      id: 3,
      name: 'Amaka Nnamdi',
      week: 'Week 28',
      dueDate: 'Sep 18, 2026',
      hospital: 'St. Nicholas Hospital',
      balance: '₦380,000',
      goal: 84,
      status: 'Pending'
    }
  ];

  const recentActivity = [
    { status: 'Approved', name: 'Chidinma O.', time: '2 hours ago' },
    { status: 'Pending Review', name: 'Ngozi A.', time: '5 hours ago' },
    { status: 'Approved', name: 'Amaka N.', time: '1 day ago' }
  ];

  const readinessData = [
    { label: 'Fully Prepared', value: 68, color: '#b0d571' },
    { label: 'Nearly Ready', value: 22, color: '#f1c880' },
    { label: 'Just Started', value: 10, color: '#ec9d9d' }
  ];

  const securityItems = [
    { icon: <Shield size={18} />, label: 'Secure Records' },
    { icon: <Lock size={18} />, label: 'Encrypted Verification' },
    { icon: <BadgeCheck size={18} />, label: 'Authorized Access' }
  ];

  return (
    <main className="verify-fund-page">
      <section className="page-headers">
        <div className="header-text">
          <h1>Verify Patient Fund</h1>
          <p>Review patient savings readiness and approve maternal healthcare verification.</p>
        </div>
        <button className="start-verification-btn">
          <FileCheck size={19} />
          Start Verification
        </button>
      </section>

      <div className="search-bar">
        <Search size={15} />
        <input
          type="text"
          placeholder="Search by patient name, ID, or hospital..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <button className="start-verification-btn-mobile">
          <FileCheck size={19} />
          Start Verification
        </button>

      {/* Desktop Table View */}
      <div className="patient-table">
        <div className="table-header">
          <span>PATIENT NAME</span>
          <span>WEEK</span>
          <span>DUE DATE</span>
          <span>HOSPITAL</span>
          <span>WALLET BALANCE</span>
          <span>GOAL</span>
          <span>STATUS</span>
        </div>
        {patients.map((patient) => (
          <div className="table-row" key={patient.id}>
            <div className="patient-info">
              <div className="avatar">
                <img src={BabyIcon} alt="baby-icon" />
              </div>
              <span>{patient.name}</span>
            </div>
            <span>{patient.week}</span>
            <span>{patient.dueDate}</span>
            <span>{patient.hospital}</span>
            <span className="balance">{patient.balance}</span>
            <div className="goal-cell">
              <span>{patient.goal}%</span>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${patient.goal}%` }}
                ></div>
              </div>
            </div>
            <span className={`status-badge ${patient.status.toLowerCase()}`}>
              {patient.status}
            </span>
          </div>
        ))}
      </div>

      {/* Mobile Card View */}
      <div className="mobile-cards">
        <div className="active-header">
          <span>ACTIVE VERIFICATIONS</span>
          <span className="pending-count">3 Pending</span>
        </div>
        {patients.map((patient) => (
          <div className="patient-card" key={patient.id}>
            <div className="card-header">
              <div className="card-user">
                  <img src={SearchIcon} alt="baby-icon" />
                <div>
                  <h4>{patient.name}</h4>
                  <p>{patient.week} • EDD: {patient.dueDate}</p>
                </div>
              </div>
              <span className={`status-badge ${patient.status.toLowerCase()}`}>
                {patient.status}
              </span>
            </div>
            <div className="card-details">
              <div>
                <span className="label">PREFERRED HOSPITAL</span>
                <p>{patient.hospital}</p>
              </div>
              <div className="text-right">
                <span className="label">BALANCE</span>
                <p className="balance">{patient.balance}</p>
              </div>
            </div>
            <div className="card-progress">
              <span className="label">Savings Readiness</span>
              <div className="progress-row">
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${patient.goal}%` }}
                  ></div>
                </div>
                <span>{patient.goal}%</span>
              </div>
            </div>
            <div className="card-footer">
              <button>View Full Profile &gt;</button>
              <button className="more-btn">⋮</button>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-grid">
        <div className="card">
          <h3>Recent Activity</h3>
          <div className="activity-list">
            {recentActivity.map((item, idx) => (
              <div className="activity-item" key={idx}>
                <div className="activity-icon">
                  {item.status === 'Approved' ? 
                    <CheckCircle2 size={18} color="#10B981" /> : 
                    <Clock size={18} color="#F59E0B" />
                  }
                </div>
                <div className="activity-info">
                  <strong>{item.status}</strong>
                  <p>{item.name}</p>
                </div>
                <span className="activity-time">{item.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3>Readiness Overview</h3>
          <div className="readiness-list">
            {readinessData.map((item, idx) => (
              <div className="readiness-item" key={idx}>
                <div className="readiness-header">
                  <span>{item.label}</span>
                  <span className="percent" style={{ color: item.color }}>
                    {item.value}%
                  </span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${item.value}%`, backgroundColor: item.color }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3>Security & Compliance</h3>
          <div className="security-list">
            {securityItems.map((item, idx) => (
              <div className="security-item" key={idx}>
                <div className="security-icon">{item.icon}</div>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="secure-banner mobile-only">
        <Shield size={24} />
        <div>
          <strong>Secure Platform</strong>
          <p>Protected maternal records & authorized hospital access powered by MaternalPath.</p>
        </div>
      </div>
    </main>
  );
};

export default VerifyPatient;
