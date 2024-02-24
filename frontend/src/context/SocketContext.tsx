import {createContext, FC, ReactElement, useContext, useEffect, useState} from 'react';
import {useAuthContext} from "./AuthContext.tsx";
import {io} from "socket.io-client";

interface IProps {
children: ReactElement;
}

const SocketContext = createContext(null);


export const useSocketContext = () => {
    return useContext(SocketContext);
}

export  const SocketContextProvider: FC<IProps> = ({children}) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const { authUser } = useAuthContext();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    useEffect(() => {
        if (authUser){
            const socket = io("http://localhost:5042", {
                query: {
                    userId: authUser._id
                }
            });
        setSocket(socket);

        socket.on("getOnlineUsers", (users) => {
            setOnlineUsers(users);
        })

        return () => socket.close();
        } else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }


    }, [authUser]);

    return (
        <SocketContext.Provider value={{socket, onlineUsers}}>
            {children}
        </SocketContext.Provider>
    );
};


