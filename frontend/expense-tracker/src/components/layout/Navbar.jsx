import React, { useState } from 'react'
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi'
import SideMenu from './SideMenu'

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false)

  return (
    <nav className="flex items-center justify-between px-6 py-3 sticky top-0 z-50 backdrop-blur-xs bg-white/50 border-b border-gray-200 shadow-sm">
      {/* Left side: Menu button & logo */}
      <div className="flex items-center gap-4">
        <button
          className="lg:hidden text-black p-2 hover:bg-gray-100 rounded-full transition"
          onClick={() => setOpenSideMenu(!openSideMenu)}
          aria-label="Toggle Sidebar"
        >
          {openSideMenu ? (
            <HiOutlineX className="text-2xl" />
          ) : (
            <HiOutlineMenu className="text-2xl" />
          )}
        </button>

        <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight font-sans">
          Expenzy
        </h1>
      </div>

      {/* Mobile side menu */}
      {openSideMenu && (
        <div className="fixed top-[61px] left-0 w-64 bg-white shadow-xl border-r border-gray-200">
          <SideMenu activeMenu={activeMenu} />
        </div>
      )}
    </nav>
  )
}

export default Navbar
