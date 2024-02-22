import { useState} from 'react';
import {useAuthContext} from "../context/AuthContext.tsx";
import toast from "react-hot-toast";


const useLogin = () => {
    const [loading, setLoading] = useState<boolean>(false)
   const {setAuthUser} = useAuthContext();
     const login = async (username: string, password: string) => {
         const success = handleInputErrors(username, password);
         if (!success) return;
       setLoading(true);
       try {
const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({username, password})
})
           const data = await res.json();
if (data.error) {
    throw new Error(data.error)
}
    localStorage.setItem("chat-user", JSON.stringify(data))
           setAuthUser(data)



       } catch (e) {
           // eslint-disable-next-line @typescript-eslint/ban-ts-comment
         // @ts-expect-error
           toast.error(e.message)
       } finally {
           setLoading(false)
       }



     }





    return { loading, login}
};

export default useLogin;

function handleInputErrors(username: string, password: string) {
    if (!username || !password) {
        toast.error('Please fill in all fields');
        return false;
    }
    return true;
}
