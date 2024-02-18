import {FC} from 'react';
import {SearchInput} from "./SearchInput.tsx";
import {Conversations} from "./conversations/Conversations.tsx";
import {LogoutButton} from "./LogoutButton.tsx";
interface IProps {

}

const Sidebar: FC<IProps> = () => {

    return (
        <div className='border-r border-slate-500 p-4 flex flex-col'>


            <SearchInput/>
            <div className='divider px-3'></div>
            <Conversations/>
            <LogoutButton/>
        </div>
    );
};

export {Sidebar};
