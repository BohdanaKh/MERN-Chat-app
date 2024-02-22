import {useState} from 'react';
import {IUser} from "../interfaces/user.interface.ts";
import toast from "react-hot-toast";
import {useAuthContext} from "../context/AuthContext.tsx";

const useSignUp = () => {
    const [loading, setLoading] = useState<boolean>(false)
const { setAuthUser } = useAuthContext();
   const signup = async (user: IUser) => {
        const success = handleInputErrors(user);
        if (!success) return;
        
        setLoading(true);
        try {
         const res = await fetch("/api/auth/signup", {
             method: "POST",
             headers: {"Content-Type": "application/json"},
             body: JSON.stringify(user),
         });
           
         const data = await res.json();
         if (data.error) {
             throw new Error(data.error);
         }
         localStorage.setItem("chat-user", JSON.stringify(data));
         setAuthUser(data);
            
        }catch (e) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            toast.error(e.message)
        } finally {
            setLoading(false)
        }

    };

    return { loading, signup};
};

export default useSignUp;

function handleInputErrors(user: IUser) {
 if (!user.fullName || !user.username || !user.password || !user.confirmPassword || !user.gender) {
     toast.error('Please fill in all fields');
     return false;
 }   
 if (user.password!== user.confirmPassword) {
     toast.error('Passwords do not match');
     return false;
 }
 if (user.password.length < 6) {
     toast.error('Password must consist of at least 6 characters');
     return false;
 }
 return true;
}



