import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState([]);

  // useEffect(() => {
  //   const storedData =
  //     JSON.parse(localStorage.getItem("formUserDetails")) || [];
  //   setFormData(storedData);
  // }, []);

  useEffect(() => {
    fetch("http://localhost:2000/api/All-users")
      .then((response) => {
        if (!response.ok) {
          // checking the network response
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setFormData(data); // Update the state with fetched data
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // const handleDelete = (index) => {
  //   const updatedData = [...formData];
  //   updatedData.splice(index, 1);
  //   localStorage.setItem("formUserDetails", JSON.stringify(updatedData));
  //   setFormData(updatedData);
  // };

  const handleDelete = (_id, index) => {
    fetch(`http://localhost:2000/api/delete/${_id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const updatedData = [...formData];
        updatedData.splice(index, 1);
        setFormData(updatedData);
        return response
      })
      .catch((error) => console.error("Error deleting data:", error));
  };
  
  // const handleEditForm = (index) => {
  //   const formDataToEdit = formData[index];
  //   navigate("/form", { state: { formDataToEdit, index } });
  // };

  const handleEditForm = (_id) => {
    fetch(`http://localhost:2000/api/User/${_id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((userData) => {
        navigate("/form", { state: { formDataToEdit: userData } });
      })
      .catch((error) => console.error("Error fetching user data:", error));
  };

  return (
    <div>
      <div className="home-header">
        <h1>Hey Welcome, newcomers!</h1>
        <h4>
          " Hit the <i>'Create Form'</i> button and kickstart to fill your
          details !"
        </h4>

        <button onClick={() => navigate("/form")}> Create Form</button>
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
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.email}</td>
                <td>{item.primaryPhoneNumber}</td>
                <td>
                  {item.secondaryPhoneNumber
                    ? item.secondaryPhoneNumber
                    : "---"}
                </td>
                <td>{"*".repeat(item.password.length)}</td>
                <td>{item.address}</td>
                <td>
                  {/* <button onClick={() => handleEditForm(index)}>Edit</button>
                  <button onClick={() => handleDelete(index)}>Delete</button> */}

                  <button onClick={() => handleEditForm(item._id)}>Edit</button>
                  <button onClick={() => handleDelete(item._id, index)}>
                    Delete
                  </button>
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
