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
    newMessages:[],
    convers:null,
    setSelected: (x) => set({selected: x}),
    setNewMessages: (x) => set({newMessages: x}),
    setConvers: (x) => set({convers: x}),

    posts:null,
    setPosts: (x) => set({posts: x}),

    post:null,
    setPost: (x) => set({post: x}),

    select:"Home",
    setSelectPage: (x) => set({select: x}),

    mainLink: "/crud"

}))

export default useStore;