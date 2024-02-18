import {FC} from 'react';
import {BiLogOut} from "react-icons/bi";


const LogoutButton: FC = () => {

    return (
        <div className='mt-auto'>
<BiLogOut className='w-6 h-6 text-white cursor-pointer'/>
        </div>
    );
};

export {LogoutButton};
