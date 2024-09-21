/* eslint-disable react/prop-types */
import { useContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { authContext } from "../context/AuthContext";
import isAuthenticated from "./isAuthenticated";
const ProtectedRoute = ({ children, allowedRoles }) => {
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  // const { token, role } = useContext(authContext);

  const role = localStorage.getItem("role");

  // const isAllowed = true;
  const isAllowed = allowedRoles.includes(role);
  useEffect(() => {
    const checkAuth = async () => {
      const authStatus = await isAuthenticated();
      setAuth(authStatus); // Set authStatus to true or false
      setLoading(false);
    };
    checkAuth();
  }, []);
  if (loading) {
    return <div>Loading...</div>; // Replace with your loader/spinner if you have one
  }
  if (auth && isAllowed) {
    console.log("you are authenticated");
    return children;
  }

  return <Navigate to="/login" replace={true} />;
};
export default ProtectedRoute;