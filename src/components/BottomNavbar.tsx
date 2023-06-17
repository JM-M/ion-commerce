import { IconContext } from 'react-icons';
import { TfiHelpAlt } from 'react-icons/tfi';
import { CiCircleList } from 'react-icons/ci';
import { BsClockHistory } from 'react-icons/bs';
import CartIcon from './CartIcon';

const BottomNavbar = () => {
    return (
        <IconContext.Provider value={{ size: '20' }}>
            <nav className="fixed left-0 bottom-0 w-screen flex items-center justify-center container h-[70px] bg-white">
                <ul className="w-full flex items-center justify-between">
                    <li className="flex flex-col items-center justify-center gap-[5px]">
                        <TfiHelpAlt />
                        <span>Contact</span>
                    </li>
                    <li className="flex flex-col items-center justify-center gap-[5px]">
                        <CiCircleList />
                        <span>Wishlist</span>
                    </li>
                    <li className="flex flex-col items-center justify-center gap-[5px]">
                        <CartIcon />
                        <span>Cart</span>
                    </li>
                    <li className="flex flex-col items-center justify-center gap-[5px]">
                        <BsClockHistory />
                        <span>Orders</span>
                    </li>
                </ul>
            </nav>
        </IconContext.Provider>
    );
};

export default BottomNavbar;
