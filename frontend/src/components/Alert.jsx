import React from "react";

const Alert = ({ display, msg }) => {
  return (
    <div
      className="alert alert-warning  fade show"
      role="alert"
      style={{ display: display }}
    >
      <strong>Done !</strong> {msg}
      <button
        className="close"
        data-dismiss="alert"
        aria-label="Close"
        onClick={() => {
          window.location.reload();
        }}
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
};

export default Alert;
