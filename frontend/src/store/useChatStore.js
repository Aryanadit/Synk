import {create} from 'zustand'
import {axiosInstance} from '../lib/axios.js'
import { toast } from 'react-hot-toast'

export const useChatStore = create( (set ,get) => ({
    allContacts : [],
    chats : [] , 
    messages : [],
    activeTab : [] , 
    selectedUser : null , 
    isUsersLoading : false , 
    isMessagesLoading : false , 
    isSoundEnabled : localStorage.getItem( "isSoundEnabled")  === "true",

    toggleSound: () => {
        const newValue = !get().isSoundEnabled
        localStorage.setItem("isSoundEnabled", newValue.toString())
        set({ isSoundEnabled: newValue })
    }, 
    setActiveTab : (tab) => { set({activeTab : tab }) },
    setSelectedUser : (user) => { set({selectedUser : user})} ,
    getAllContacts: async () => {
        set({ isUsersLoading: true })
        try {
            const res = await axiosInstance.get('/messages/contacts')
            set({ allContacts: res.data.data })
        } catch (err) {
            toast.error(err.response?.data?.message)
        } finally {
            set({ isUsersLoading: false })
        }
    },
    getMyChatPartners: async () => {
        set({ isUsersLoading: true })
        try {
            const res = await axiosInstance.get('/messages/partners')
            set({ chats: res.data.data })
        } catch (err) {
            toast.error(err.response?.data?.message)
        } finally {
            set({ isUsersLoading: false })
        }
        }
    }));