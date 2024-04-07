import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";

const Forms = () => {
  const navigate = useNavigate();
  const form = useForm();
  const location = useLocation();
  // const history = useHistory();

  const { register, handleSubmit, watch, formState, reset, setValue } = form;
  const {
    errors,
    isDirty,
    dirtyFields,
    isValid,
    isSubmitting,
    isSubmitSuccessful,
  } = formState;

  /*const onSubmit = (data) => {
    console.log(data);
    navigate("/Summary", { state: { data } });
  };*/

  const formDataToEdit = location.state ? location.state.formDataToEdit : null;

  const onSubmit = (data) => {
    console.log("Form submitted with data:", data); // Add debugging statement
    const formData = JSON.parse(localStorage.getItem("formUserDetails")) || [];

    if (formDataToEdit) {
      const index = formData.findIndex((item) => item.id === formDataToEdit.id);
      if (index !== -1) {
        formData[index] = data;
      }
    } else {
      // If formDataToEdit is not available, generate a unique ID for the new data
      data.id = Date.now();
      formData.push(data);
    }

    localStorage.setItem("formUserDetails", JSON.stringify(formData));

    console.log("Navigating to Summary page..."); // Add debugging statement
    navigate("/Summary"); // Check if navigation is being called
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <div className="form--div">
      <h1>Form Page</h1>
      <hr />
      <form
        className="form--div-form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <label htmlFor="firstname">First Name</label>
        <input
          type="text"
          defaultValue={formDataToEdit ? formDataToEdit.firstname : ""}
          placeholder="First Name"
          id="firstname"
          {...register("firstname", {
            required: "First Name is required",
            minLength: {
              value: 2,
              message: "First Name must be at least 2 characters long",
            },
            pattern: {
              value: /^[A-Za-z]+$/,
              message: "First Name must contain only alphabets",
            },
          })}
        />
        <p className="errors--style">{errors.firstname?.message}</p>

        <label htmlFor="lastname">Last Name</label>
        <input
          defaultValue={formDataToEdit ? formDataToEdit.lastname : ""}
          type="text"
          placeholder="Last Name"
          id="lastname"
          {...register("lastname", {
            required: "Last Name is required",
            minLength: {
              value: 2,
              message: "Last Name must be at least 2 characters long",
            },
            pattern: {
              value: /^[A-Za-z]+$/,
              message: "Last Name must contain only alphabets",
            },
          })}
        />
        <p className="errors--style">{errors.firstname?.message}</p>

        <label htmlFor="email">Email</label>
        <input
          defaultValue={formDataToEdit ? formDataToEdit.email : ""}
          type="email"
          placeholder="Email"
          id="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid Email format",
            },
          })}
        />

        <p className="errors--style">{errors.email?.message}</p>

        <label htmlFor="phoneNumber">Primary Phone Number</label>
        <input
          defaultValue={formDataToEdit ? formDataToEdit.PhoneNumber : ""}
          type="text"
          placeholder="Primary Phone Number"
          id="PhoneNumber"
          {...register("PhoneNumber", {
            required: "Phone Number is required",
            pattern: {
              value: /^[+]?[\d\-().\s]{6,15}[\d]$/,
              message: "Invalid phone number format",
            },
          })}
        />
        <p className="errors--style">{errors.PhoneNumber?.message}</p>

        <label htmlFor="altPhoneNumber"> Secondary Phone Number</label>
        <input
          defaultValue={formDataToEdit ? formDataToEdit.altPhoneNumber : ""}
          type="text"
          placeholder="Secondary Phone Number"
          id="altPhoneNumber"
          {...register("altPhoneNumber", {
            pattern: {
              value: /^[+]?[\d\-().\s]{6,15}[\d]$/,
              message: "Invalid phone number format",
            },
          })}
        />

        <label htmlFor="password">Password</label>
        <input
          defaultValue={formDataToEdit ? formDataToEdit.password : ""}
          type="password"
          placeholder="Password"
          id="password"
          {...register("password", {
            required: "Password is required",
            pattern: {
              value:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              message:
                "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character",
            },
          })}
        />

        <p className="errors--style">{errors.password?.message}</p>

        <input
          defaultValue={formDataToEdit ? formDataToEdit.recheckpassword : ""}
          type="password"
          placeholder="Re-Check Password"
          id="recheckpassword"
          {...register("recheckpassword", {
            validate: (value) =>
              value === watch("password") || "Passwords do not match",
          })}
        />

        <p className="errors--style">{errors.recheckpassword?.message}</p>
        <label htmlFor="address">Address</label>
        <br />
        <textarea
          defaultValue={formDataToEdit ? formDataToEdit.address : ""}
          className="address--textarea"
          name="address"
          rows={3}
          cols={40}
          placeholder="Address"
          id="address"
          {...register("address", {
            required: {
              value: true,
              message: "Address is required",
            },
          })}
        />
        <p className="errors--style">{errors.address?.message}</p>
        <p>
          --To confirm the deatils kick the <b>confirm Button</b>
        </p>
        <button className="form--btn" onClick={() => navigate("/")}>
          Cancel
        </button>

        <button  type="Submit" className="form--btn" onClick={handleSubmit(onSubmit)}>
          Confirm
        </button>
      </form>
    </div>
  );
};

export default Forms;
