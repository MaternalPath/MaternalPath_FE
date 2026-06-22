// import { useEffect, useState } from "react";
// import "./ModalCard.css";

// const validateField = (field, value) => {
//   const num = parseFloat(value);
//   if (field === "savingsGoal") {
//     if (value === "" || value === null || value === undefined)
//       return "Savings goal is required";
//     if (Number.isNaN(num)) return "Enter a valid number";
//     if (num < 1000) return "Savings goal must be at least ₦1,000";
//     if (num > 100000000) return "Savings goal cannot exceed ₦100,000,000";
//     return "";
//   }
//   if (field === "weeklyContribution") {
//     if (value === "" || value === null || value === undefined)
//       return "Weekly contribution is required";
//     if (Number.isNaN(num)) return "Enter a valid number";
//     if (num < 100) return "Weekly contribution must be at least ₦100";
//     if (num > 1000000) return "Weekly contribution cannot exceed ₦1,000,000";
//     return "";
//   }
//   return "";
// };

// const getWeeksUntilDueDate = (dueDate) => {
//   if (!dueDate) return null;
//   const selected = new Date(dueDate);
//   if (Number.isNaN(selected.getTime())) return null;
//   const today = new Date();
//   today.setHours(0, 0, 0, 0);
//   selected.setHours(0, 0, 0, 0);
//   const diffDays = Math.ceil((selected - today) / (1000 * 60 * 60 * 24));
//   return diffDays >= 0 ? Math.ceil(diffDays / 7) : null;
// };

// const getSavingsDateMismatchMessage = (
//   dueDate,
//   weeklyContribution,
//   savingsGoal,
// ) => {
//   const weeksRemaining = getWeeksUntilDueDate(dueDate);
//   const weeklyAmount = parseFloat(weeklyContribution);
//   const goalAmount = parseFloat(savingsGoal);
//   if (
//     weeksRemaining === null ||
//     Number.isNaN(weeklyAmount) ||
//     Number.isNaN(goalAmount) ||
//     weeklyAmount <= 0 ||
//     goalAmount <= 0
//   ) {
//     return "";
//   }

//   const weeksToGoal = Math.ceil(goalAmount / weeklyAmount);
//   if (weeksToGoal > weeksRemaining) {
//     return `This weekly contribution would take ${weeksToGoal} weeks, but your due date is only ${weeksRemaining} weeks away. Please use the dates you entered earlier to keep your savings plan aligned with your due date.`;
//   }
//   return "";
// };

// const EmergencyWalletModal = ({
//   isOpen,
//   onClose,
//   onSubmit,
//   onPrevious,
//   data,
//   saved,
//   updateFields,
//   isSaving = false,
// }) => {
//   const [formData, setFormData] = useState({
//     savingsGoal: data?.savingsGoalAmount || "",
//     weeklyContribution: data?.weeklyContribution || "",
//   });
//   const [errors, setErrors] = useState({});

//   useEffect(() => {
//     if (isOpen) {
//       setFormData({
//         savingsGoal: data?.savingsGoalAmount || "",
//         weeklyContribution: data?.weeklyContribution || "",
//       });
//       setErrors({});
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [isOpen]);

//   if (!isOpen) return null;

//   const REQUIRED = ["savingsGoal", "weeklyContribution"];

//   const handleChange = (field, value) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//     if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
//   };

//   const handleBlur = (field, value) => {
//     setErrors((prev) => ({ ...prev, [field]: validateField(field, value) }));
//   };

//   const isValid = REQUIRED.every((f) => !validateField(f, formData[f]));

//   const handleFormSubmit = (e) => {
//     e.preventDefault();
//     const newErrors = {};
//     REQUIRED.forEach((f) => {
//       const err = validateField(f, formData[f]);
//       if (err) newErrors[f] = err;
//     });
//     setErrors(newErrors);
//     if (Object.keys(newErrors).length > 0) return;

//     updateFields({
//       savingsGoalAmount: parseFloat(formData.savingsGoal) || 0,
//       weeklyContribution: parseFloat(formData.weeklyContribution) || 0,
//     });
//     onSubmit();
//   };

//   const currentBalance = 0;
//   const goalAmount =
//     parseFloat(formData.savingsGoal) || Number(saved?.savingsGoalAmount) || 0;
//   const weeklyAmount =
//     parseFloat(formData.weeklyContribution) ||
//     Number(saved?.weeklyContribution) ||
//     0;
//   const hospitalCost = Number(saved?.estimatedDeliveryCost) || 0;
//   const hospitalMismatchMessage =
//     goalAmount > 0 && hospitalCost > 0 && goalAmount < hospitalCost
//       ? `Savings goal must be at least the hospital's estimated cost (₦${hospitalCost.toLocaleString()}).`
//       : "";
//   const remaining = goalAmount - currentBalance;
//   const weeksToGoal =
//     weeklyAmount > 0 ? Math.ceil(remaining / weeklyAmount) : 0;
//   const dueDate = data?.estimatedDueDate || saved?.estimatedDueDate || "";
//   const dueDateWeeksRemaining = getWeeksUntilDueDate(dueDate);
//   const savingsDateMismatchMessage = getSavingsDateMismatchMessage(
//     dueDate,
//     formData.weeklyContribution,
//     formData.savingsGoal,
//   );

//   return (
//     <div className="modals-overlay">
//       <div className="modals-container">
//         <div className="modal-header">
//           <h2>Edit Savings Goal</h2>
//           <button className="close-btn" onClick={onClose} aria-label="Close">
//             <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//               <line x1="18" y1="6" x2="6" y2="18" />
//               <line x1="6" y1="6" x2="18" y2="18" />
//             </svg>
//           </button>
//         </div>

//         <form className="modal-form" onSubmit={handleFormSubmit}>
//           <div className="form-group">
//             <label htmlFor="savingsGoal">Savings Goal</label>
//             <input
//               type="number"
//               id="savingsGoal"
//               value={formData.savingsGoal}
//               onChange={(e) => handleChange("savingsGoal", e.target.value)}
//               onBlur={(e) => handleBlur("savingsGoal", e.target.value)}
//               className={`numeric-input-style ${errors.savingsGoal ? "input-error" : ""}`}
//               min="0"
//               step="1000"
//               placeholder="Enter savings goal amount"
//             />
//             {errors.savingsGoal && (
//               <span className="error-message">{errors.savingsGoal}</span>
//             )}
//           </div>

//           <div className="form-group">
//             <label htmlFor="weeklyContribution">Weekly Contribution</label>
//             <input
//               type="number"
//               id="weeklyContribution"
//               value={formData.weeklyContribution}
//               onChange={(e) =>
//                 handleChange("weeklyContribution", e.target.value)
//               }
//               onBlur={(e) => handleBlur("weeklyContribution", e.target.value)}
//               className={`numeric-input-style ${errors.weeklyContribution ? "input-error" : ""}`}
//               min="0"
//               step="100"
//               placeholder="Enter weekly contribution amount"
//             />
//             {errors.weeklyContribution && (
//               <span className="error-message">{errors.weeklyContribution}</span>
//             )}
//           </div>

//           <div className="savings-summary-box">
//             <h3>Savings Summary</h3>
//             <div className="summary-row">
//               <span className="summary-label">Current Balance</span>
//               <span className="summary-value emphasis-teal">
//                 ₦{currentBalance.toLocaleString()}
//               </span>
//             </div>
//             <div className="summary-row">
//               <span className="summary-label">New Goal</span>
//               <span className="summary-value emphasis-teal">
//                 ₦{goalAmount.toLocaleString()}
//               </span>
//             </div>
//             <div className="summary-row">
//               <span className="summary-label">Remaining</span>
//               <span className="summary-value emphasis-orange">
//                 ₦{remaining.toLocaleString()}
//               </span>
//             </div>
//             <div className="summary-divider"></div>
//             <div className="summary-row base-metric-row">
//               <span className="summary-label">Weeks to Goal</span>
//               <span className="summary-value emphasis-teal">
//                 {weeksToGoal} weeks
//               </span>
//             </div>
//             {savingsDateMismatchMessage && (
//               <div className="form-group">
//                 <span className="error-message">{savingsDateMismatchMessage}</span>
//               </div>
//             )}
//             {hospitalMismatchMessage && (
//               <div className="form-group">
//                 <span className="error-message">{hospitalMismatchMessage}</span>
//               </div>
//             )}
//           </div>

//           <div className="dual-btn-container">
//             <button
//               type="button"
//               className="previous-btn"
//               onClick={onPrevious}
//               disabled={isSaving}
//             >
//               Previous
//             </button>
//             <button
//               type="submit"
//               className="submit-btn"
//               disabled={
//                 isSaving || !isValid || !!savingsDateMismatchMessage || !!hospitalMismatchMessage
//               }
//             >
//               {isSaving ? "Saving..." : "Submit"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };


// export default EmergencyWalletModal;

import { useEffect, useState } from "react";
import "./ModalCard.css";

const validateField = (field, value, minimumSavingsGoal = 1000) => {
  const num = parseFloat(value);
  if (field === "savingsGoal") {
    if (value === "" || value === null || value === undefined)
      return "Savings goal is required";
    if (Number.isNaN(num)) return "Enter a valid number";
    const minGoal =
      Number.isFinite(minimumSavingsGoal) && minimumSavingsGoal > 0
        ? minimumSavingsGoal
        : 1000;
    if (num < minGoal)
      return `Savings goal must be at least ₦${minGoal.toLocaleString()}`;
    if (num > 100000000) return "Savings goal cannot exceed ₦100,000,000";
    return "";
  }
  if (field === "weeklyContribution") {
    if (value === "" || value === null || value === undefined)
      return "Weekly contribution is required";
    if (Number.isNaN(num)) return "Enter a valid number";
    if (num < 100) return "Weekly contribution must be at least ₦100";
    if (num > 1000000) return "Weekly contribution cannot exceed ₦1,000,000";
    return "";
  }
  return "";
};

const getWeeksUntilDueDate = (dueDate) => {
  if (!dueDate) return null;
  const selected = new Date(dueDate);
  if (Number.isNaN(selected.getTime())) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  selected.setHours(0, 0, 0, 0);
  const diffDays = Math.ceil((selected - today) / (1000 * 60 * 60 * 24));
  return diffDays >= 0 ? Math.ceil(diffDays / 7) : null;
};

const getSavingsDateMismatchMessage = (
  dueDate,
  weeklyContribution,
  savingsGoal,
) => {
  const weeksRemaining = getWeeksUntilDueDate(dueDate);
  const weeklyAmount = parseFloat(weeklyContribution);
  const goalAmount = parseFloat(savingsGoal);
  if (
    weeksRemaining === null ||
    Number.isNaN(weeklyAmount) ||
    Number.isNaN(goalAmount) ||
    weeklyAmount <= 0 ||
    goalAmount <= 0
  ) {
    return "";
  }

  const weeksToGoal = Math.ceil(goalAmount / weeklyAmount);
  if (weeksToGoal > weeksRemaining) {
    return `This weekly contribution would take ${weeksToGoal} weeks, but your due date is only ${weeksRemaining} weeks away. Please use the dates you entered earlier to keep your savings plan aligned with your due date.`;
  }
  return "";
};

const EmergencyWalletModal = ({
  isOpen,
  onClose,
  onSubmit,
  onPrevious,
  data,
  saved,
  updateFields,
  isSaving = false,
}) => {
  const minimumSavingsGoal =
    Number(data?.estimatedDeliveryCost) ||
    Number(saved?.estimatedDeliveryCost) ||
    0;

  const [formData, setFormData] = useState({
    savingsGoal: data?.savingsGoalAmount || "",
    weeklyContribution: data?.weeklyContribution || "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      Promise.resolve().then(() => {
        setFormData({
          savingsGoal: data?.savingsGoalAmount
            ? String(data.savingsGoalAmount)
            : "",
          weeklyContribution: data?.weeklyContribution
            ? String(data.weeklyContribution)
            : "",
        });
        setErrors({});
      });
    }
  }, [isOpen, data]);

  if (!isOpen) return null;

  const REQUIRED = ["savingsGoal", "weeklyContribution"];

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleBlur = (field, value) => {
    setErrors((prev) => ({
      ...prev,
      [field]: validateField(field, value, minimumSavingsGoal),
    }));
  };

  const isValid = REQUIRED.every(
    (f) => !validateField(f, formData[f], minimumSavingsGoal),
  );

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    REQUIRED.forEach((f) => {
      const err = validateField(f, formData[f], minimumSavingsGoal);
      if (err) newErrors[f] = err;
    });
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const savingsGoalValue = parseFloat(formData.savingsGoal);
    const weeklyContributionValue = parseFloat(formData.weeklyContribution);

    updateFields({
      savingsGoalAmount: Number.isFinite(savingsGoalValue)
        ? savingsGoalValue
        : 0,
      weeklyContribution: Number.isFinite(weeklyContributionValue)
        ? weeklyContributionValue
        : 0,
    });
    onSubmit();
  };

  const currentBalance = 0;
  const goalAmount =
    parseFloat(formData.savingsGoal) || Number(saved?.savingsGoalAmount) || 0;
  const weeklyAmount =
    parseFloat(formData.weeklyContribution) ||
    Number(saved?.weeklyContribution) ||
    0;
  const hospitalCost = Number(saved?.estimatedDeliveryCost) || 0;
  const hospitalMismatchMessage =
    goalAmount > 0 && hospitalCost > 0 && goalAmount < hospitalCost
      ? `Savings goal must be at least the hospital's estimated cost (₦${hospitalCost.toLocaleString()}).`
      : "";
  const remaining = goalAmount - currentBalance;
  const weeksToGoal =
    weeklyAmount > 0 ? Math.ceil(remaining / weeklyAmount) : 0;
  const dueDate = data?.estimatedDueDate || saved?.estimatedDueDate || "";
  const savingsDateMismatchMessage = getSavingsDateMismatchMessage(
    dueDate,
    formData.weeklyContribution,
    formData.savingsGoal,
  );

  return (
    <div className="modals-overlay">
      <div className="modals-container">
        <div className="modal-header">
          <h2>Edit Savings Goal</h2>
          <button className="close-btn" onClick={onClose} aria-label="Close">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <form className="modal-form" onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label htmlFor="savingsGoal">Savings Goal</label>
            <input
              type="number"
              id="savingsGoal"
              value={formData.savingsGoal}
              onChange={(e) => handleChange("savingsGoal", e.target.value)}
              onBlur={(e) => handleBlur("savingsGoal", e.target.value)}
              className={`numeric-input-style ${errors.savingsGoal ? "input-error" : ""}`}
              min="0"
              step="1000"
              placeholder="Enter savings goal amount"
            />
            {errors.savingsGoal && (
              <span className="error-message">{errors.savingsGoal}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="weeklyContribution">Weekly Contribution</label>
            <input
              type="number"
              id="weeklyContribution"
              value={formData.weeklyContribution}
              onChange={(e) =>
                handleChange("weeklyContribution", e.target.value)
              }
              onBlur={(e) => handleBlur("weeklyContribution", e.target.value)}
              className={`numeric-input-style ${errors.weeklyContribution ? "input-error" : ""}`}
              min="0"
              step="100"
              placeholder="Enter weekly contribution amount"
            />
            {errors.weeklyContribution && (
              <span className="error-message">{errors.weeklyContribution}</span>
            )}
          </div>

          <div className="savings-summary-box">
            <h3>Savings Summary</h3>
            <div className="summary-row">
              <span className="summary-label">Current Balance</span>
              <span className="summary-value emphasis-teal">
                ₦{currentBalance.toLocaleString()}
              </span>
            </div>
            <div className="summary-row">
              <span className="summary-label">New Goal</span>
              <span className="summary-value emphasis-teal">
                ₦{goalAmount.toLocaleString()}
              </span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Remaining</span>
              <span className="summary-value emphasis-orange">
                ₦{remaining.toLocaleString()}
              </span>
            </div>
            <div className="summary-divider"></div>
            <div className="summary-row base-metric-row">
              <span className="summary-label">Weeks to Goal</span>
              <span className="summary-value emphasis-teal">
                {weeksToGoal} weeks
              </span>
            </div>
            {savingsDateMismatchMessage && (
              <div className="form-group">
                <span className="error-message">
                  {savingsDateMismatchMessage}
                </span>
              </div>
            )}
            {hospitalMismatchMessage && (
              <div className="form-group">
                <span className="error-message">{hospitalMismatchMessage}</span>
              </div>
            )}
          </div>

          <div className="dual-btn-container">
            <button
              type="button"
              className="previous-btn"
              onClick={onPrevious}
              disabled={isSaving}
            >
              Previous
            </button>
            <button
              type="submit"
              className="submit-btn"
              disabled={
                isSaving ||
                !isValid ||
                !!savingsDateMismatchMessage ||
                !!hospitalMismatchMessage
              }
            >
              {isSaving ? "Saving..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmergencyWalletModal;
