import {FC} from 'react';
import {Message} from "./Message.tsx";

interface IProps {

}

const Messages: FC<IProps> = () => {

    return (
        <div className='px-4 flex-1 overflow-auto'>
            <Message/>
            <Message/>
            <Message/>
            <Message/>
            <Message/>
            <Message/>
            <Message/>
            <Message/>
            <Message/>
            <Message/>
            <Message/>
            <Message/>
        </div>
    );
};

export {Messages};
