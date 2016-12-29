import React from 'react';
const BuilderNav = ({pageComplete,goToNextStep,buttonContent}) => {
  var buttonClass;
  if (pageComplete) {
    buttonClass = "btn btn-success"
  } else {
    buttonClass = "btn btn-success disabled"
  }
  return (
    <nav className="builder-nav">
      <a onClick={goToNextStep} className={buttonClass}>{buttonContent}</a>
    </nav>
  );
}

export default BuilderNav
