import React from 'react';
const BuilderNav = ({pageComplete,goToPrevStep,goToNextStep}) => {
  var buttonClass;
  if (pageComplete) {
    buttonClass = "btn btn-success"
  } else {
    buttonClass = "btn btn-success disabled"
  }
  return (
    <nav className="builder-nav">
      <a onClick={goToNextStep} className={buttonClass}>Continue</a>
    </nav>
  );
}

export default BuilderNav
