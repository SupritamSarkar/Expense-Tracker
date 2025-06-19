import {
    LuLayoutDashboard,
    LuHandCoins,
    LuWalletMinimal,
    LuLogOut,
} from "react-icons/lu";        // Importing icons from react-icons library

export const SIDE_MENU_DATA = [               // Array of objects representing the side menu items
    // Each object contains an id, label, icon, and path for the menu item
    {
        id : "01",                                    
        label: "Dashboard",
        icon : LuLayoutDashboard,
        path : "/dashboard",
    },
    {
        id : "02",
        label: "Income",
        icon : LuWalletMinimal,
        path : "/income",
    },
    {
        id : "03",
        label: "Expense",
        icon : LuHandCoins,
        path : "/expense",
    },
    {
        id : "04",
        label: "Logout",
        icon : LuLogOut,
        path : "/logout",
    }   
];