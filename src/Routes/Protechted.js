import React from "react";

const Protechted = (props) => {
  const { Component } = props;
  const navigate = useNavigate();
  useEffect(() => {
    let userData = localStorage.getItem("formData");
    if (!formData) {
      navigate("/");
    }
  });
  return (
    <div>
      <Component />
    </div>
  );
};

export default Protechted;
