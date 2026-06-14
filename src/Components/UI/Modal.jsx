import React from 'react';
import './Modal.css';

const Modal = ({ open, onClose, title, children }) => {
  if (!open) return null;
  return (
    <div className="mp-modal-backdrop" onClick={onClose}>
      <div className="mp-modal" onClick={(e) => e.stopPropagation()}>
        <div className="mp-modal-header">
          <h3>{title}</h3>
        </div>
        <div className="mp-modal-body">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
