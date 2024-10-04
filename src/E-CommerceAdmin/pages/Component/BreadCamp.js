/** @format */

import React from "react";
import { Link } from "react-router-dom";

const BreadCamp = ({name}) => {
  return (
    <p className="headP">
      {" "}
      <Link to="/dashboard">Dashboard</Link> / {name}
    </p>
  );
};

export default BreadCamp;
