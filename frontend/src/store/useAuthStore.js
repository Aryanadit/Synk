import {create} from 'zustand';

import {axiosInstance} from '../lib/axios.js'

import toast from "react-hot-toast";

export const useAuthStore = create( (set) => ({
    authUser : null , 
    isCheckingAuth : true , 
    isSigningUp : false ,
    isLoggingIn : false , 
    checkAuth : async () => {
        set({ isCheckingAuth : true})
        try{
            const res = await axiosInstance.get("/auth/check")
            set({authUser : res.data.data})
        }
        catch(err){
            set({authUser : null })
        }
        finally{
        set({ isCheckingAuth : false})
        }
    },
    signup : async( data ) => {
        set({ isSigningUp : true })
        try{
            const res = await axiosInstance.post('/auth/signup' , data ) ; 
            set({ authUser: res.data.data });
            toast.success("Account created");
        }
        catch(err){
            console.error("Error while signup in AuthStore : " , err )
            const message = err.response?.data?.message || "Signup failed";
            toast.error(message);
        }
        finally{
            set({ isSigningUp : false })
        }
    },
    login : async( data ) => {
        set({ isLoggingIn : true })
        try{
            const res = await axiosInstance.post('/auth/login' , data ) ; 
            set({ authUser: res.data.data });
            toast.success("Logged In");
        }
        catch(err){
            console.error("Error while Login in AuthStore : " , err )
            const message = err.response?.data?.message || "Login failed";
            toast.error(message);
        }
        finally{
            set({ isLoggingIn : false })
        }
    },
    logout : async (date) => {
        try{
            const res = await axiosInstance.post("/auth/logout") ; 
            set({authUser : null})
            toast.success("Logged out successfully")
        }
        catch(err){
            toast.error("Error Logging Out ")
            console.log("Logout Error : " , err )
        }
    }
}))