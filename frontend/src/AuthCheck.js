import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthCheck = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const expirationTime = localStorage.getItem("expirationTime");

    if (expirationTime && new Date().getTime() > expirationTime) {
      alert("Session expired. Please log in again.");
      localStorage.clear();
      navigate("/login");
    }
  }, [navigate]);

  return null;
};

export default AuthCheck;
