import { useEffect, useState, useContext } from "react";
import { authContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const useFetchData = (url) => {
  const { token } = useContext(authContext); // Get token from context
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    
    setLoading(true);
    try {
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const result = await res.json();

      // if (!res.ok) {
      //   //throw new Error(result.message + " Failed");
      //   //localStorage.clear();
      //   //navigate("/login");
      //   window.location.reload();
      // }
      setData(result.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, loading, error, refetch: fetchData };
};

export default useFetchData;
