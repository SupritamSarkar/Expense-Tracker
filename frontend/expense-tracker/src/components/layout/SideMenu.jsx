import React from 'react'
import { UserContext } from '../../context/UserContext'; // Importing UserContext to access user information
import { SIDE_MENU_DATA } from '../../utils/data'
import { useNavigate } from 'react-router-dom'; // Importing useNavigate hook for navigation

const SideMenu = ({activeMenu}) => {
    const {user, clearUser} = React.useContext(UserContext); // Accessing user context to get user information and clearUser function
    const navigate = useNavigate(); // Using useNavigate hook to programmatically navigate

    const handleClick = (route) => {
        if (route === '/logout') {
            clearUser(); // Clear user information on logout
            localStorage.removeItem('token'); // Remove token from local storage
            navigate('/login'); // Navigate to login page
        } else {
            navigate(route); // Navigate to the specified route
        }
    }


  return (
    <div className='w-64 h-[calc(100vh-64px)] bg-white border-r border-gray-200/50 p-5 sticky top-16 z-20'>
        
        <div>
            <h5 className='text-center text-2xl font-bold mb-5'>     
                {user?.fullName || ""}
            </h5>                   
        </div>


        {SIDE_MENU_DATA.map((item, index) => (
            <button
                key={`menu_${index}`}
                className={`w-full flex items-center gap-4 text-[15px] ${
                    activeMenu == item.label ? "text-white bg-blue-900":""}     
                    py-3 px-6 rounded-lg mb-3`}
                    onClick={() => handleClick(item.path)}
                    >
                        <item.icon className='text-xl' />
                        {item.label}
                    </button>
        ))}
    </div>
                
                )}
export default SideMenu
