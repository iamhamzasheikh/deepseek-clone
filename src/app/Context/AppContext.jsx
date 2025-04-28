// 'use client'

// import { useUser } from "@clerk/nextjs";
// import { createContext, useContext } from "react"

// export const AppContext = createContext();

// export const useAppContext = () => {
//     return useContext(AppContext)
// }

// export const AppContextProvider = ({ Children }) => {
//     const { user } = useUser()

//     const value = {
//         user
//     }

//     return <AppContext.Provider value={value}>{Children}</AppContext.Provider>
// }

'use client'

import { useAuth, useUser } from "@clerk/nextjs";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const AppContext = createContext();

export const useAppContext = () => {
    return useContext(AppContext);
}

export const AppContextProvider = ({ children }) => {
    const { user } = useUser();
    const { getToken } = useAuth();

    const [chats, setChats] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);

    const createNewChat = async () => {

        try {

            if (!user) return null;

            const token = await getToken();

            await axios.post('/api/chat/create', {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })


            fetchUsersChats();

        } catch (error) {
            toast.error(error.message);
        }

    }

    const fetchUsersChats = async () => {
        try {

            const { getToken } = useAuth();
            const { data } = await axios.get('/api/chat/get', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (data.success) {
                console.log(data.data);
                setChats(data.data);

                // if user has no chats create one

                if (data.data.length === 0) {
                    await createNewChat();
                    return fetchUsersChats();
                } else {
                    // short chats by date
                    data.data.sort((a, b) => newData(b.updatedAt) - new Date(a.updatedAt));

                    // set recently updated chats as selected chats
                    setSelectedChat(data.data[0]);
                    console.log(data.data[0])
                }


            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {

        if (user) {
            fetchUsersChats();
        }

    }, [user])

    const value = {
        user,
        chats, setChats,
        selectedChat, setSelectedChat,
        fetchUsersChats,
        createNewChat,

    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
