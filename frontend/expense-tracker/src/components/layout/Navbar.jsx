import React,{useState} from 'react'
import {HiOutlineMenu, HiOutlineX} from 'react-icons/hi' // Importing icons for the menu toggle
import SideMenu from './SideMenu';  // Importing the SideMenu component to display the side menu

const Navbar = ({activeMenu}) => {
    const [openSideMenu, setOpenSideMenu] = useState(false); // State to manage the visibility of the side menu
  return (
    <div className='flex gap-5 bg-white border border-b border-gray-200/50 backdrop-blur-[2pxl] py-4 px-7 sticky top-0 z-30'>
        <button 
            className='block lg:hidden text-black'      
             onClick={() => setOpenSideMenu(!openSideMenu)}>

            {openSideMenu ? 
            <HiOutlineX className='text-2xl' /> : <HiOutlineMenu className='text-2xl' />} 

        </button>
        <h1 className='text-xl font-bold text-gray-800'>Expense Tracker</h1> 

        {openSideMenu && (          // Conditionally render the SideMenu based on the openSideMenu state
            <div className='fixed top-[61px] -ml-4 bg-white'>
                <SideMenu activeMenu={activeMenu} />
            </div>
        )}
    </div>
  );
}

export default Navbar
