import { createContext, FC, ReactElement, useContext, useState} from "react";
import {IUser} from "../interfaces/user.interface.ts";

type AuthUserType = IUser | null;
interface IProps {
    children: ReactElement
}

export const AuthContext = createContext(null);

export const useAuthContext = () => {
    return useContext(AuthContext);
}



export const AuthContextProvider: FC<IProps> = ({children}) => {
    const [authUser, setAuthUser] = useState<AuthUserType>(JSON.parse(localStorage.getItem("chat-user")) ?? null);


    return <AuthContext.Provider value={{authUser, setAuthUser}}>
        {children}
    </AuthContext.Provider>
    
}