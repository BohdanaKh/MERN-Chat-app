import {FC} from 'react';
import {Conversation} from "./Conversation.tsx";
import useGetConversations from "../../../hooks/useGetConversations.ts";
import {getRandomEmoji} from "../../../utils/emoji.ts";



const Conversations: FC = () => {
const { loading, conversations} = useGetConversations();
    return (
        <div className='py-2 flex flex-col overflow-auto'>
            {conversations.map((conversation, idx) => (
                <Conversation key={conversation._id} conversation={conversation} emoji={getRandomEmoji()} lastIdx={idx=== conversations.length - 1} />
            ))}
            {loading ? <span className='loading loading-spinner'></span> : null}
        </div>
    );
};

export {Conversations};
