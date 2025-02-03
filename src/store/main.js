import {create} from "zustand";

const useStore = create((set) => ({
    error: null,
    users: null,
    userConnected: null,


    updateError: (newError) => set({error: newError}),
    updateUsers: (newUsers) => set({users: newUsers}),
    updateUserConnected: (user) => set({userConnected: user})
}))

export default useStore;