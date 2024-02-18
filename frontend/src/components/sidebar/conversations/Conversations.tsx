import {FC} from 'react';
import {Conversation} from "./Conversation.tsx";

interface IProps {

}

const Conversations: FC<IProps> = () => {

    return (
        <div className='py-2 flex flex-col overflow-auto'>
            <Conversation/>
            <Conversation/>
            <Conversation/>
            <Conversation/>
            <Conversation/>
            <Conversation/>
        </div>
    );
};

export {Conversations};
