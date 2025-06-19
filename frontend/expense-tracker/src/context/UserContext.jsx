import React, {useState} from 'react'

export const UserContext = React.createContext();      // Create a UserContext to manage user state across the application

const UserProvider = ({children}) => {          // UserProvider component to provide user state and functions to its children

    const [user, setUser] = useState(null);

    //function to update user data
    const updateUser = (userData) => {
        setUser(userData);
    };

    //function to clear user data
    const clearUser = () => {
        setUser(null);
        localStorage.removeItem('token'); // Clear token from localStorage
        localStorage.removeItem('user'); // Clear user info from localStorage
    };



    
  return (                                                                      
    <UserContext.Provider value={{ user, updateUser, clearUser }}>          
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider;
