import { useEffect, useMemo, useState } from "react";
import "./ModalCard.css";
import "./SelectModal.css";

const formatNaira = (value) => {
  const num = Number(value);
  if (!Number.isFinite(num) || num <= 0) return "Not specified";
  return `₦${num.toLocaleString()}`;
};

const SelectHospitalModal = ({
  isOpen,
  onClose,
  onNext,
  onPrevious,
  data,
  hospitals = [],
  updateFields,
}) => {
  const [selectedId, setSelectedId] = useState(data?.hospitalId || "");
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (isOpen) {
      setSelectedId(data?.hospitalId || "");
      setQuery("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return hospitals;
    return hospitals.filter((h) => {
      const name = (h.hospitalName || h.name || "").toLowerCase();
      const address = (h.address || "").toLowerCase();
      return name.includes(q) || address.includes(q);
    });
  }, [hospitals, query]);

  if (!isOpen) return null;

  const handleNext = () => {
    if (!selectedId) return;
    const hospital = hospitals.find((h) => h.id === selectedId);
    if (hospital) {
      updateFields({
        hospitalId: hospital.id,
        preferredHospital: hospital.hospitalName || hospital.name || "",
        hospitalAddress: hospital.address || "",
        hospitalContact: hospital.phoneNumber || hospital.phone || "",
        estimatedDeliveryCost:
          Number(hospital.deliveryFee || hospital.cost || 0) || 0,
      });
    }
    onNext();
  };

  return (
    <div className="modals-overlay">
      <div className="modals-container scrollable-modal">
        <div className="modal-header">
          <h2>Select Hospital</h2>
          <button className="close-btn" onClick={onClose} aria-label="Close">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search hospitals by name or address"
            className="hospital-search-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="modal-body hospital-list">
          {filtered.length === 0 ? (
            <p className="hospital-empty-state">
              {hospitals.length === 0
                ? "No hospitals available right now."
                : "No hospitals match your search."}
            </p>
          ) : (
            filtered.map((hospital) => {
              const isSelected = selectedId === hospital.id;
              const name = hospital.hospitalName || hospital.name || "Unnamed";
              const phone = hospital.phoneNumber || hospital.phone || "";
              const cost = hospital.deliveryFee || hospital.cost || 0;

              return (
                <div
                  key={hospital.id}
                  className={`hospital-card ${isSelected ? "active-hospital" : ""}`}
                  onClick={() => setSelectedId(hospital.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setSelectedId(hospital.id);
                    }
                  }}
                >
                  <div className="hospital-card-header">
                    <h3>{name}</h3>
                    <div className={`check-circle ${isSelected ? "checked" : ""}`}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                  </div>

                  {hospital.address && (
                    <p className="hospital-detail">{hospital.address}</p>
                  )}
                  {phone && <p className="hospital-detail">{phone}</p>}

                  <div className="hospital-card-divider" />

                  <div className="hospital-cost-row">
                    <span className="cost-label">Estimated Cost</span>
                    <span className="cost-amount">{formatNaira(cost)}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="dual-btn-container">
          <button type="button" className="previous-btn" onClick={onPrevious}>
            Previous
          </button>
          <button
            type="button"
            className="submit-btn"
            onClick={handleNext}
            disabled={!selectedId}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectHospitalModal;
