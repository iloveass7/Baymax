import React, { useContext } from 'react';
import { BiMenu } from 'react-icons/bi';
import { authContext } from '../../context/AuthContext';
import { useNavigate } from "react-router-dom";

const Tabs = ({ tab, setTab }) => {
    const { user, token, dispatch } = useContext(authContext); // Assuming authContext provides a dispatch function
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch({ type: 'LOGOUT' }); // Example action type for logout
        navigate('/'); // Redirect to home page after logout
    };


    const handleDelete = async () => {
        console.log('Delete button clicked!');
        
        if (!user || !token) {
            console.error('User or token is missing!');
            return;
        }

        try {
            const userId = user._id;  // Get the user ID from the context
            
            const response = await fetch(`https://baymax-1.onrender.com/api/doctors/${userId}`, { // ekhane localhost er jaigai jaigar link dite hobe https://baymax-1.onrender.com/api
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
        <div>
            <span className="lg:hidden">
                <BiMenu className="w-6 h-6 cursor-pointer" />
            </span>
            <div className="hidden lg:flex flex-col p-3 bg-white shadow-panelShadow items-center h-max rounded-md">
                <button onClick={() => setTab('overview')} className={`${tab === "overview" ? "bg-indigo-100 text-primaryColor" : "bg-transparent text-headingColor"} w-full btn mt-0 rounded-md`}>Overview</button>
                <button onClick={() => setTab('appointments')} className={`${tab === "appointments" ? "bg-indigo-100 text-primaryColor" : "bg-transparent text-headingColor"} w-full btn mt-0 rounded-md`}>Appointments</button>
                <button onClick={() => setTab('settings')} className={`${tab === "settings" ? "bg-indigo-100 text-primaryColor" : "bg-transparent text-headingColor"} w-full btn mt-0 rounded-md`}>Profile</button>

                <div className="mt-4 w-full">
                    <button onClick={handleLogout} className="w-full bg-[#181A1E] py-3 px-4 text-[16px] leading-7 rounded-md text-white">
                        Logout
                    </button>
                    <button onClick={handleDelete} className="mt-4 w-full bg-red-600 py-3 px-4 text-[16px] leading-7 rounded-md text-white">
                        Delete Account
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Tabs;
