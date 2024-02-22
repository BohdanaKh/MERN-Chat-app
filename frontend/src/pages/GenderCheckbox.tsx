import {FC} from 'react';
import {EGender} from "../interfaces/user.interface.ts";


interface IProps {
    onCheckboxChange:  never,
    selectedGender: string,
}

const GenderCheckbox: FC<IProps> = ({onCheckboxChange, selectedGender}) => {
    return(
    <div className='flex'>
        <div className='form-control'>
            <label className={`label gap-2 cursor-pointer ${selectedGender === EGender.male ? "selected" : ""}`}>
                <span className='label-text'>Male</span>
                <input
                    type='checkbox'
                    className='checkbox border-slate-900'
                checked={selectedGender === EGender.male}
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
                    onChange={() => onCheckboxChange(EGender.male)}
                />
            </label>
        </div>
        <div className='form-control'>
            <label className={`label gap-2 cursor-pointer ${selectedGender === EGender.female ? "selected" : ""}`}>
                <span className='label-text'>Female</span>
                <input
                    type='checkbox'
                    className='checkbox border-slate-900'
                    checked={selectedGender === EGender.female}
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                    onChange={() => onCheckboxChange(EGender.female)}
                />
            </label>
        </div>
    </div>
);
};

export {GenderCheckbox};
