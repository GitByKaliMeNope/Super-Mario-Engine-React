import React from 'react';

const Mario = ({ position }) => {
  return (
    <div className="mario" style={{ left: position.left, bottom: position.bottom }}></div>
  );
};

export default Mario;
