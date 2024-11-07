import React from 'react';
import './SplitScreen.scss';

const SplitScreen = ({ children }) => {
  const [left, right] = children;

  return (
    <div className="container">
      <div className="left-panel">{left}</div>
      <div className="right-panel">{right}</div>
    </div>
  );
};

export default SplitScreen;