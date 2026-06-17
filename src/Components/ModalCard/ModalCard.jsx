import React, { useState } from 'react';
import './ModalCard.css';

const EditProfileModal = ({ isOpen, onClose, onNext, data, updateFields }) => {
  const [profileImage, setProfileImage] = useState(data?.profilePicture || null);
  const [imageFile, setImageFile] = useState(null);
  const [imageError, setImageError] = useState('');

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { id, value } = e.target;
    updateFields({ [id]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    
    if (!file) return;
    
    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setImageError('Please upload a valid image (JPEG, PNG, JPG, GIF, or WEBP)');
      return;
    }
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setImageError('Image size must be less than 5MB');
      return;
    }
    
    setImageError('');
    
    // Store the file
    setImageFile(file);
    
    // Create preview using a local file URL
    const previewUrl = URL.createObjectURL(file);
    setProfileImage(previewUrl);
    updateFields({ 
      imageFile: file,
      profilePicture: previewUrl,
    });
  };

  const triggerFileUpload = () => {
    document.getElementById('profileImageInput').click();
  };

  const handleNext = () => {
    onNext();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        
        {/* Header */}
        <div className="modal-header">
          <h2>Edit Profile</h2>
          <button className="close-btn" onClick={onClose} aria-label="Close modal">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Profile Image Section */}
        <div className="avatar-container">
          <div className="avatar-circle">
            {profileImage ? (
              <img src={profileImage} alt="Profile" className="avatar-image" />
            ) : (
              <svg className="avatar-icon" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#7a8b8b" strokeWidth="1.5">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            )}
            <button 
              type="button"
              className="edit-avatar-btn" 
              onClick={triggerFileUpload}
              aria-label="Edit photo"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
            </button>
            <input
              type="file"
              id="profileImageInput"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: 'none' }}
            />
          </div>
          {imageError && <span className="error-message">{imageError}</span>}
          <p className="upload-hint">Click the camera icon to upload a profile picture</p>
        </div>

        {/* Form Fields */}
        <form className="modal-form" onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input 
              type="text" 
              id="firstName" 
              value={data.firstName || ''}
              onChange={handleChange}
              placeholder="Enter first name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input 
              type="text" 
              id="lastName" 
              value={data.lastName || ''}
              onChange={handleChange}
              placeholder="Enter last name"
            />
          </div>

          {/* Action Button */}
          <button type="button" className="submit-btn" onClick={handleNext}>Next</button>
        </form>

      </div>
    </div>
  );
};

export default EditProfileModal;