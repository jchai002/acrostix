import React from 'react';
const BuilderNav = ({pageComplete,goToNextStep,goToPrevStep,nextButtonContent,prevButtonContent}) => {
  var nextButtonClass,navClass,nextButton,prevButton;
  if (pageComplete) {
    nextButtonClass = "btn btn-success"
  } else {
    nextButtonClass = "btn btn-success disabled"
  }

  if (nextButtonContent) {
    nextButton = <a onClick={goToNextStep} className={nextButtonClass}>{nextButtonContent}</a>
  }

  if (prevButtonContent) {
    prevButton = <a onClick={goToPrevStep} className="btn btn-warning">{prevButtonContent}</a>
  }

  if (prevButtonContent && nextButtonContent) {
    navClass = "builder-nav space-between"
  } else {
    navClass = "builder-nav flex-end"
  }
  return (
    <nav className={navClass}>
      {prevButton}
      {nextButton}
    </nav>
  );
}

export default BuilderNav
