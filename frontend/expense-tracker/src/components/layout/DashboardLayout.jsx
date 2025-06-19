import React from 'react'
import { UserContext } from '../../context/UserContext';
import Navbar from './Navbar';
import SideMenu from './SideMenu';      
// Importing necessary components and context for the dashboard layout


const DashboardLayout = ({children, activeMenu}) => {       // DashboardLayout component to structure the dashboard with a navbar and side menu
    // activeMenu prop is used to highlight the current active menu item
  // children prop is used to render the content of the page within the layout

    const{ user } = React.useContext(UserContext);      // Using UserContext to access the current user information
  return (
    <div className=''>
        <Navbar activeMenu={activeMenu} />     {/* Navbar component to display the top navigation bar with the active menu highlighted */} 

        {/* Conditional rendering of the side menu and children content based on user authentication */}
        {/* If user is authenticated, display the side menu and children content */}
        {user && (
            <div className='flex'>
                <div className='max-[1080px]:hidden'>
                    <SideMenu activeMenu={activeMenu} />         {/* SideMenu component to display the side navigation menu with the active menu highlighted */}
                </div>
                <div className='grow mx-5'>{children}</div>
            </div>
        )}
      
    </div>
  )
}



export default DashboardLayout
