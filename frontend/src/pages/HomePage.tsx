import {FC} from 'react';
import {Sidebar} from "../components/sidebar/Sidebar.tsx";
import {MessageContainer} from "../components/messages/MessageContainer.tsx";

interface IProps {

}

const HomePage: FC<IProps> = () => {

    return (
        <div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
          <Sidebar/>
<MessageContainer/>
        </div>
    );
};

export {HomePage};
