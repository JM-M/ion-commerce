import { useRef } from 'react';
import { IonSearchbar } from '@ionic/react';
import { searchOutline } from 'ionicons/icons';

import useOnClickOutside from '../hooks/useOnClickOutside';

const TopHeaderSearchbar: React.FC<{ close: Function }> = ({ close }) => {
  const containerRef = useRef(null);
  useOnClickOutside({ ref: containerRef, handler: close });

  return (
    <div ref={containerRef}>
      <IonSearchbar
        searchIcon={searchOutline}
        slot='end'
        placeholder='Search products'
        className='text-left'
        animated
        autoFocus
      />
    </div>
  );
};

export default TopHeaderSearchbar;
