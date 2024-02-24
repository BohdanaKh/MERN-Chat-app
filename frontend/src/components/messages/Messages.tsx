import {FC, useEffect, useRef} from 'react';
import useGetMessages from "../../hooks/useGetMessages.ts";
import {MessageSkeleton} from "../skeletons/MessageSkeleton.tsx";
import {Message} from "./Message.tsx";
import useListenMessages from "../../hooks/useListenMessages.ts";


const Messages: FC = () => {
const {messages, loading} = useGetMessages();
const lastMessageRef:  React.MutableRefObject<HTMLDivElement> = useRef();
useListenMessages();

    useEffect(() => {
        setTimeout(() => {
        lastMessageRef.current?.scrollIntoView({ behavior: "smooth"})
        }, 100)
    }, [messages]);

    return (
        <div className='px-4 flex-1 overflow-auto'>

            {!loading && messages.length > 0 && messages.map((message) => (
                <div key={message._id} ref={lastMessageRef}>

                <Message message={message}/>
                </div>
            ))}


            {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx}/>)}

            {!loading && messages.length === 0 && (
                <p className='text-center'>Send a message to start the conversation</p>
            )}


        </div>
    );
};

export {Messages};
