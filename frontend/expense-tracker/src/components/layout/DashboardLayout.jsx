import React from 'react'
import { UserContext } from '../../context/UserContext';
import Navbar from './Navbar';
import SideMenu from './SideMenu';      
// Importing necessary components and context for the dashboard layout


const DashboardLayout = ({children, activeMenu}) => {       // DashboardLayout component to structure the dashboard with a navbar and side menu
    // activeMenu prop is used to highlight the current active menu item
  // children prop is used to render the content of the page within the layout
  const { user, isLoadingUser } = React.useContext(UserContext); // assuming you add isLoadingUser in context

  if (isLoadingUser) {
  return <div className="h-screen flex items-center justify-center">Loading…</div>;
}

if (!user) {
  return <div className="h-screen flex items-center justify-center">Please log in.</div>;
}


  return (
    <div className=''>
        <Navbar activeMenu={activeMenu} />     {/* Navbar component to display the top navigation bar with the active menu highlighted */} 
        {/* If user is authenticated, display the side menu and children content */}
       
            <div className='flex'>
                <div className='max-[1080px]:hidden'>
                    <SideMenu activeMenu={activeMenu} />         {/* SideMenu component to display the side navigation menu with the active menu highlighted */}
                </div>
                <div className='grow mx-5'>{children}</div>
            </div>
        
      
    </div>
  )
}



export default DashboardLayout
