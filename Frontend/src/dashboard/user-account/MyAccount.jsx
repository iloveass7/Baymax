import { useContext, useEffect, useState } from "react";
import { authContext } from "./../../context/AuthContext";
import MyBookings from "./MyBookings";
import Profile from "./Profile";
import useGetProfile from "../../hooks/useFetchData";
import { BASE_URL } from "../../config";
import Loading from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";
import { useNavigate } from "react-router-dom";

const MyAccount = () => {
<<<<<<< HEAD
  const { user, token, dispatch } = useContext(authContext);
=======
  const navigate = useNavigate();
  const { token, dispatch } = useContext(authContext);
>>>>>>> 9df1485b3b2f21af563536c1e086bf476f7c97e7
  const [tab, setTab] = useState("bookings");
  const [loadedOnce, setLoadedOnce] = useState(false);

  const { data: userData, loading, error, refetch } = useGetProfile(`${BASE_URL}/users/profile/me`);

  useEffect(() => {
    if (loadedOnce && error === "Unauthorized Failed") {
      refetch();
    }
  }, [loadedOnce, error, refetch]);

  useEffect(() => {
    if (!loading && !error) {
      setLoadedOnce(true);
    }
  }, [loading, error]);

  const handleLogout = () => {
    navigate('/login');
    dispatch({ type: "LOGOUT" });
  };

  const handleDelete = async () => {
    console.log('Delete button clicked!');
    
    if (!user || !token) {
        console.error('User or token is missing!');
        return;
    }

    try {
        const userId = user._id;  // Get the user ID from the context
        
        const response = await fetch(`https://baymax-1.onrender.com/api/users/${userId}`, { // ekhane localhost er jaigai jaigar link dite hobe https://baymax-1.onrender.com/api
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Use token from context
            },
        });

        if (response.ok) {
            console.log('User deleted successfully');
            dispatch({ type: 'LOGOUT' });
            navigate('/');
        } else {
            const data = await response.json();
            console.error('Failed to delete user:', data.message);
        }
    } catch (error) {
        console.error('Error deleting account:', error);
    }
};

  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto">
        {loading && !error && <Loading />}
        {error && !loading && <Error errMessage={error} />}

        {!loading && !error && (
          <div className="grid md:grid-cols-3 gap-10">
            <div className="pb-[50px] px-[30px] rounded-md">
              <div className="flex items-center justify-center">
                <figure className="w-[100px] h-[100px] rounded-full border-2 border-solid border-primaryColor">
                  <img src={userData.photo} alt="" className="w-full h-full rounded-full" />
                </figure>
              </div>

              <div className="text-center mt-4">
                <h3 className="text-[18px] leading-[30px] text-headingColor font-bold">
                  {userData.name}
                </h3>
                <p className="text-textColor text-[15px] leading-6 font-medium">{userData.email}</p>
                <p className="text-textColor text-[15px] leading-6 font-medium">
                  Blood Type:
                  <span className="ml-2 text-headingColor text-[15px] leading-8">{userData.bloodType}</span>
                </p>
              </div>

              <div className="mt-[50px] md:mt-[100px]">
                <button onClick={handleLogout} className="w-full bg-[#181A1E] p-3 text-[16px] leading-7 rounded-md text-white">
                  Logout
                </button>
                <button onClick={handleDelete} className="mt-4 w-full bg-red-600 p-3 text-[16px] leading-7 rounded-md text-white">Delete Account</button>
              </div>
            </div>

            <div className="md:col-span-2 md:px-[30px]">
              <div>
                <button
                  onClick={() => setTab("bookings")}
                  className={`${tab === "bookings" && "bg-primaryColor text-white font-normal"}  p-2 mr-5 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor`}
                >
                  My Bookings
                </button>
                <button
                  onClick={() => setTab("settings")}
                  className={`${tab === "settings" && "bg-primaryColor text-white font-normal"}  p-2 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor`}
                >
                  Profile Settings
                </button>
              </div>

              {tab === "bookings" && <MyBookings />}
              {tab === "settings" && <Profile user={userData} />}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MyAccount;
