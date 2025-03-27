import {create} from "zustand";

const useStore = create((set) => ({
    userConnected: null,
    favorites: null,
    setUserConnected: (user) => set({userConnected: user}),
    setFavorites: (mess) => set({favorites: mess}),

    // single user page
    userData: null,
    userPosts: null,
    setUserData: (x) => set({userData: x}),
    setUserPosts: (x) => set({userPosts: x}),

    selected:null,
    messages:null,
    setSelected: (x) => set({selected: x}),
    setMessages: (x) => set({messages: x}),

    post:null,
    setPost: (x) => set({post: x}),
}))

export default useStore;