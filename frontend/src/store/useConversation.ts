import { create } from "zustand";
import {IMessage} from "../interfaces/message.interface.ts";
import {IUser} from "../interfaces/user.interface.ts";

interface ConversationState {
    selectedConversation: IUser
    setSelectedConversation: (selectedConversation: IUser) => void
    messages: IMessage[]
    setMessages: (messages: IMessage[]) => void
}

const useConversation = create<ConversationState>()((set) => ({
    selectedConversation: null,
    setSelectedConversation: (selectedConversation) => set({selectedConversation}),
    messages: [],
    setMessages: (messages) => set({messages}),
}));

export default useConversation;