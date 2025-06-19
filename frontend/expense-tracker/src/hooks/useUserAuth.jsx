import { UserContext } from "../context/UserContext";
import { useContext } from "react";
import React from 'react'
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";
import { useEffect } from "react";

const useUserAuth = () => {

    const {user, updateUser, clearUser} = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if(user) return;

        let isMounted = true;

        const fetchUserInfo = async() => {
            try{
                const response = await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO);
                if(isMounted && response.data){
                    updateUser(response.data);
                }

            }
            catch(error){
                console.error("Failed to fetch user info", error);
                if(isMounted){
                    clearUser();
                    navigate("/login");
                }

            }
        };
        fetchUserInfo();
    }, [updateUser, clearUser, navigate, user]);

}

export default useUserAuth;
