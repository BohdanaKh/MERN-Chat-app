import { useEffect, useState} from 'react';
import toast from "react-hot-toast";
import {IUser} from "../interfaces/user.interface.ts";



const useGetConversations = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [conversations, setConversations] = useState<IUser[]>([]);

    useEffect(() => {
        const getConversations = async () => {
            setLoading(true);
            try {
              const res = await fetch("/api/users");
              const data = await res.json();
              if (data.error) {
                  throw new Error(data.error)
              }
              setConversations(data)
            } catch (e) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
               // @ts-expect-error
                toast.error(e.message)
            }finally {
                setLoading(false)
            }
        }
            getConversations();
    }, []);





    return {loading, conversations }
};

export default useGetConversations;
