import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Summary = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (!state?.data) {
      navigate("/");
    }
  }, [state, navigate]);

  // const storedData = () => {
  //   localStorage.setItem("formUserDetails", JSON.stringify(state.formData));
  //   navigate("/");

  const handleSubmit = async () => {
    if (state.data.formDataToEdit && state.data.formDataToEdit._id) {
      // Update existing user
      await updateUser();
      navigate("/");
    } else {
      // Add new user
      await addUser();
      navigate("/");
    }
  };

  const addUser = async () => {
    try {
      const response = await fetch("http://localhost:2000/api/Add-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(state.data),
      });
      if (response.ok) {
        // User added successfully
        console.log("User added successfully");
      } else {
        // Handle error
        console.error("Failed to add user");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const updateUser = async () => {
    try {
      const userId = state.data.formDataToEdit._id; // Get _id from the request body
      const response = await fetch("http://localhost:2000/api/update-user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...state.data, _id: userId }), // Include _id in the request body
      });
      if (response.ok) {
        // User updated successfully
        console.log("User updated successfully");
      } else {
        // Handle error
        console.error("Failed to update user");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const handleCancel = () => {
    navigate("/Form", { state: state.data });
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
              {state.data && state.data.firstName}
            </li>

            <li>
              <strong>Last Name : </strong>
              {state.data && state.data.lastName}
            </li>

            <li>
              <strong>Password : </strong>
              <span
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {hovered ? state.data && state.data.password : "********"}
              </span>
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
              {state.data && state.data.primaryPhoneNumber}
            </li>

            <li>
              <strong>Secondary Phone Number : </strong>
              {state.data && state.data.secondaryPhoneNumber}
            </li>
          </ul>

          <button onClick={handleCancel}>Cancel</button>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    )
  );
};

export default Summary;
