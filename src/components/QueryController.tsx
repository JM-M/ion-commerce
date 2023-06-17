import { HiOutlineArrowsUpDown } from 'react-icons/hi2';
import { CiFilter } from 'react-icons/ci';

const QueryController = () => {
    return (
        <div className="flex items-center gap-[10px]">
            <span className="flex items-center gap-[5px]">
                <HiOutlineArrowsUpDown /> Sort
            </span>
            <span className="flex items-center gap-[5px]">
                <CiFilter /> Filter
            </span>
        </div>
    );
};

export default QueryController;
