import {useSocketContext} from "../context/SocketContext.tsx";
import useConversation from "../store/useConversation.ts";
import {useEffect} from "react";
import {IMessage} from "../interfaces/message.interface.ts";
import notificationSound from "../assets/sounds/notification.mp3";

const useListenMessages = () => {
    const { socket } = useSocketContext();
    const { messages, setMessages } = useConversation();

    useEffect(() => {
        socket?.on("newMessage", (newMessage: IMessage) => {
            newMessage.shouldShake = true;
            const sound = new Audio(notificationSound);
            sound.play();
            setMessages([...messages, newMessage])
        })

        return ()=> socket?.off("newMessage");
    }, [socket, setMessages,messages]);
}

export default useListenMessages;