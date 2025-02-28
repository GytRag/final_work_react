import {create} from "zustand";

const useStore = create((set) => ({
    user: null,
    allUsers: null,
    pokes: null,
    chatWindow: null,

    setUser: (newUser) => set({user: newUser}),
    setAllUsers: (users) => set({allUsers: users}),
    setPokes: (poke) => set({pokes: poke}),
    setChatWindow: (win) => set({chatWindow: win}),


}))

export default useStore;