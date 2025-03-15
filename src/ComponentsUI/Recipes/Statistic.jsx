import React from 'react';

const Statistic = ({ title, value, prefix, suffix }) => {
  return (
    <div className="statistic">
      <div className="statistic-title">{prefix} {title}</div>
      <div className="statistic-content">
        <span className="statistic-value">{value}</span>
        {suffix && <span className="statistic-suffix">{suffix}</span>}
      </div>
    </div>
  );
};

export default Statistic;