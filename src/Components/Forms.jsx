import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";

const Forms = () => {
  const navigate = useNavigate();
  const form = useForm();
  const location = useLocation();
  const { register, handleSubmit, watch, formState, reset, setValue } = form;

  const {
    errors,
    isDirty,
    dirtyFields,
    isValid,
    isSubmitting,
    isSubmitSuccessful,
  } = formState;

  const formDataToEdit = location.state ? location.state.formDataToEdit : null;
  const formDataFromSummary = location.state ? location.state : null;

  // const onSubmit = (data) => {
  //   const formData = JSON.parse(localStorage.getItem("formUserDetails")) || [];

  //   if (formDataToEdit) {
  //     const index = formData.findIndex((item) => item.id === formDataToEdit.id);
  //     if (index !== -1) {
  //       formData[index] = data;
  //     }
  //   } else {
  //     data.id = Date.now();
  //     formData.push(data);
  //   }
  //   //navigate("/Summary", { state: { formData, data } });
  //   console.log(formData);
  //   console.log(data)
  // };

  const onSubmit = (data) => {
    // Navigate to the Summary page and pass the form data
    // navigate("/Summary", { state: { data } });
    console.log({ state: { data } });
    navigate("/Summary", { state: { formDataToEdit, data } });
  };

  useEffect(() => {
    if (formDataFromSummary) {
      Object.entries(formDataFromSummary).forEach(([key, value]) => {
        setValue(key, value);
      });
    }
  }, [formDataFromSummary, setValue]);

  useEffect(() => {
    // Reset form after successful submission
    if (formState.isSubmitSuccessful) {
      reset();
    }
  }, [formState.isSubmitSuccessful]); //

  return (
    <div className="form--div">
      <h1>Form Page</h1>
      <hr />
      <form
        className="form--div-form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          defaultValue={formDataToEdit ? formDataToEdit.firstName : ""}
          placeholder="First Name"
          id="firstName"
          {...register("firstName", {
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

        <label htmlFor="lastName">Last Name</label>
        <input
          defaultValue={formDataToEdit ? formDataToEdit.lastName : ""}
          type="text"
          placeholder="Last Name"
          id="lastName"
          {...register("lastName", {
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
        <p className="errors--style">{errors.lastname?.message}</p>

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

        <label htmlFor="primaryPhoneNumber">Primary Phone Number</label>
        <input
          defaultValue={formDataToEdit ? formDataToEdit.primaryPhoneNumber : ""}
          type="text"
          placeholder="Primary Phone Number"
          id="primaryPhoneNumber"
          {...register("primaryPhoneNumber", {
            required: "Phone Number is required",
            pattern: {
              value: /^[+]?[\d\-().\s]{6,15}[\d]$/,
              message: "Invalid phone number format",
            },
          })}
        />
        <p className="errors--style">{errors.PhoneNumber?.message}</p>

        <label htmlFor="secondaryPhoneNumber"> Secondary Phone Number</label>
        <input
          defaultValue={
            formDataToEdit ? formDataToEdit.secondaryPhoneNumber : ""
          }
          type="text"
          placeholder="Secondary Phone Number"
          id="secondaryPhoneNumber"
          {...register("secondaryPhoneNumber", {
            pattern: {
              value: /^[+]?[\d\-().\s]{6,15}[\d]$/,
              message: "Invalid phone number format",
            },
          })}
        />

        {!formDataToEdit && (
          <>
            <label htmlFor="password">Password</label>
            <input
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
            <p className="errors--style">{errors.password?.message} </p>

            <input
              type="password"
              placeholder="Re-Check Password"
              id="recheckpassword"
              {...register("recheckpassword", {
                required: "Re-Check Password is required",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
            />
            <p className="errors--style">{errors.recheckpassword?.message}</p>
          </>
        )}

        {formDataToEdit && (
          <>
            <input
              type="hidden"
              value={formDataToEdit.password}
              {...register("password", { required: false })}
            />
            <input
              type="hidden"
              value={formDataToEdit.recheckpassword}
              {...register("recheckpassword", { required: false })}
            />
            <div>
              <p>Password </p>
              <p className="errors--style">
                {formDataToEdit.firstName} {formDataToEdit.lastName} you can't
                Edit the password in the EDIT FORM PAGE.
              </p>
            </div>
          </>
        )}

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

        <button type="Submit" className="form--btn">
          Confirm
        </button>
      </form>
    </div>
  );
};

export default Forms;
