import {create} from 'zustand';

export const useAuthStore = create( (set) => ({
    authUser :{
        name : "john" ,
        _id : 123 ,
        age : 23 , 
    },
    isLoggedIn : false ,

    login : () => {
        console.log("login method called in store")
        set({isLoggedIn : true}) ; 
    },
}))