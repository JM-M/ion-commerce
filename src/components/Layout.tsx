import { PropsWithChildren } from 'react';
import TopNavbar from './TopNavbar';
import BottomNavbar from './BottomNavbar';

const Layout = ({ children = null }: PropsWithChildren) => {
    return (
        <>
            <TopNavbar />
            <main className="pb-[100px]">{children}</main>
            <BottomNavbar />
        </>
    );
};

export default Layout;
