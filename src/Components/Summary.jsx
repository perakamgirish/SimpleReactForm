import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Summary = ({ handleUpdateFormData }) => {
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!state?.data) {
      navigate("/");
    }
  }, [state, navigate]);

  const storedData = () => {
    localStorage.setItem("formUserDetails", JSON.stringify(state.formData));
    navigate("/");
  };

  return (
    state && (
      <div className="summary--div">
        <h1>Summary</h1>
        <hr />
        <div className="userdetails--div">
          <h3>User Details</h3>
          <ul>
            <li>
              <strong>First Name : </strong>
              {state.data && state.data.firstname}
            </li>

            <li>
              <strong>Last Name : </strong>
              {state.data && state.data.lastname}
            </li>

            <li>
              <strong>Password : </strong>
              {state.data && state.data.password}
            </li>

            <li>
              <strong>Email : </strong>
              {state.data && state.data.email}
            </li>

            <li>
              <strong>Address : </strong>
              {state.data && state.data.address}
            </li>

            <li>
              <strong>Primary Phone Number : </strong>
              {state.data && state.data.PhoneNumber}
            </li>

            <li>
              <strong>Secondary Phone Number : </strong>
              {state.data && state.data.altPhoneNumber}
            </li>
          </ul>

          <button onClick={() => navigate("/Form")}>Cancel</button>
          <button onClick={storedData}>Submit</button>
        </div>
      </div>
    )
  );
};

export default Summary;
