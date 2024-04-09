import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    const storedData =
      JSON.parse(localStorage.getItem("formUserDetails")) || [];
    setFormData(storedData);
  }, []);

  const handleDelete = (index) => {
    const updatedData = [...formData];
    updatedData.splice(index, 1);
    localStorage.setItem("formUserDetails", JSON.stringify(updatedData));
    setFormData(updatedData);
  };

  const handleEditForm = (index) => {
    const formDataToEdit = formData[index];
    navigate("/form", { state: { formDataToEdit, index } });
  };

  const handleUpdateFormData = (updatedFormData) => {
    localStorage.setItem("formUserDetails", JSON.stringify(updatedFormData));
    setFormData(updatedFormData);
  };

  return (
    <div>
      <div className="home-header">
        <h1>Hey Welcome, newcomers!</h1>
        <h4>
          " Hit that <i>'Create Form'</i> button and let's kickstart to fill
          your detail !"
        </h4>
        <button onClick={() => navigate("/form", { state: { formData } })}>
          {" "}
          Create Form
        </button>
        <hr />
      </div>
      <div className="home--div">
        <h3>
          Overview of Details
          <hr />
        </h3>

        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Primary Phone Number</th>
              <th>Secondary Phone Number</th>
              <th>Password</th>
              <th>Address</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {formData.map((item, index) => (
              <tr key={index}>
                <td>{item.firstname}</td>
                <td>{item.lastname}</td>
                <td>{item.email}</td>
                <td>{item.PhoneNumber}</td>
                <td>{item.altPhoneNumber ? item.altPhoneNumber : "---"}</td>
                <td>{"*".repeat(item.password.length)}</td>
                <td>{item.address}</td>
                <td>
                  <button onClick={() => handleEditForm(index)}>Edit</button>
                  <button onClick={() => handleDelete(index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
