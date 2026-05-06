import React from "react";

/**
 * ValueCard — wallet-style circle-overlay hover card for "Our Values" section.
 * Keeps the same layout/alignment as the original grid; only the card visuals change.
 */
const ValueCard = ({ icon: Icon, title, description }) => {
  return (
    <div className="value-card-wrapper">
      <div className="value-card">
        {/* Expanding overlay blob */}
        <div className="value-card-overlay" />

        {/* Icon circle */}
        <div className="value-card-circle">
          <div className="value-card-circle-inner" />
          {Icon && <Icon className="value-card-icon" />}
        </div>

        {/* Title */}
        <p className="value-card-label">{title}</p>

        {/* Description — fades in on hover */}
        <p className="value-card-desc">{description}</p>
      </div>
    </div>
  );
};

export default ValueCard;
