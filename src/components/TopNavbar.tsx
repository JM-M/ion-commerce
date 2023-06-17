import { useState } from 'react';
import { IonHeader, IonToolbar, IonTitle } from '@ionic/react';
import { IconContext } from 'react-icons';
import { TbMenu } from 'react-icons/tb';
import { CiSearch, CiUser } from 'react-icons/ci';
import TopNavSearchbar from './TopNavSearchbar';

const TopNavbar = () => {
  const [showSearchbar, setShowSearchbar] = useState(false);

  return (
    <IonHeader>
      <IonToolbar>
        <IonTitle>CubeJKiddies</IonTitle>
      </IonToolbar>
    </IonHeader>
  );

  return (
    <IconContext.Provider value={{ size: '20' }}>
      <nav className='relative container h-[50px] flex justify-between items-center'>
        <div className='h-fit flex items-center gap-[10px]'>
          <TbMenu />
          <h1>CubeJKiddies</h1>
        </div>
        <div className='h-fit flex items-center gap-[10px]'>
          {!showSearchbar && (
            <CiSearch onClick={() => setShowSearchbar(true)} />
          )}
          <CiUser />
        </div>
        {showSearchbar && (
          <TopNavSearchbar close={() => setShowSearchbar(false)} />
        )}
      </nav>
    </IconContext.Provider>
  );
};

export default TopNavbar;
