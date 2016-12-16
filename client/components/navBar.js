import React from 'react';
const Nabvar = ({pageComplete,goToNextStep}) => {
  var buttonClass;
  if (pageComplete) {
    buttonClass = "btn btn-success"
  } else {
    buttonClass = "btn btn-success disabled"
  }
  return (
    <nav className="navbar navbar-dark bg-info">
      <div className="container">
        <div className="row">
          <a className="navbar-brand" href="#">Acrostix</a>
          <a onClick={goToNextStep} className={buttonClass}>Continue</a>
        </div>
      </div>
    </nav>
  );
}

export default Nabvar
