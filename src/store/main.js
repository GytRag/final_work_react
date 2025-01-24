import {create} from "zustand";

const useStore = create((set) => ({
    users: [],
    connected: false,
    loggedInUser: {},
    posts: [],
    currentPost: 0,
    conversation: [],
    haveCon: null,


    updateUsers: (newUser) => set({users: newUser}),
    updateConnected: (newConn) => set({connected: newConn}),
    updateLoggedInUser: (logged) => set({loggedInUser: logged}),
    updatePosts: (newPost) => set({posts: newPost}),
    updateCurrentPost: (newCurrPost) => set({currentPost: newCurrPost}),
    updateConversation: (newConversation) => set({conversation: newConversation}),
    updateHaveCon: (newCon) => set({haveCon: newCon})
}))

export default useStore;