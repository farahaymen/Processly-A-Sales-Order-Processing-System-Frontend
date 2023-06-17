import React from "react";

const Forbidden = (props) => {
  return (
    <div className="forbidden">
      <h1 className="forbidden">Forbidden 403</h1>
      <h2 className="forbidden">
        Must be {props.role === "" ? "logged in" : "a customer"} to view this
        page
      </h2>
    </div>
  );
};

export default Forbidden;
