import { jwtDecode } from "jwt-decode";
import axios from "axios";

const isAuthenticated = async () => {
  let token = localStorage.getItem("token");
  const refreshToken = localStorage.getItem("refreshtoken");
  console.log(token, " token is this");
  try {
    let decodedToken;
    let currentTime;

    // Attempt to decode the token if it exists
    if (token) {
      try {
        decodedToken = jwtDecode(token);
        currentTime = Date.now() / 1000;
      } catch (error) {
        console.error("Invalid token format, attempting refresh:", error);
        // Skip to the refresh token logic below
      }
    }

    // If no token or token is expired/invalid, try to refresh the token
    if (!token || !decodedToken ||  decodedToken.exp < currentTime) {
      try {
        const response = await axios.post(

          'https://baymaxbackend.vercel.app/api/auth/refresh',

          { refreshToken }
        );

        // Update the token in localStorage and return true
        token = response.data.token;
        localStorage.setItem("token", token);
        return true;
      } catch (error) {
        console.error("Error refreshing token:", error);
        localStorage.clear(); // Clear localStorage if refresh token fails
        return false;
      }
    }

    return true;
  } catch (error) {
    console.error("Error verifying token:", error);
    return false;
  }
};

export default isAuthenticated;
