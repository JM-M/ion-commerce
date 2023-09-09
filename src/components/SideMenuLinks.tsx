import { Link } from 'react-router-dom';
import { IonMenuToggle } from '@ionic/react';
import cx from 'classnames';

const LINKS: { display: string; path: string }[] = [
  { display: 'cart', path: '/store/checkout' },
  { display: 'Wishlist', path: '/wishlist' },
  { display: 'About', path: '/about' },
  { display: 'Contact', path: '/contact' },
];

interface Props {
  pathname: string;
}

const SideMenuLinks: React.FC<Props> = ({ pathname }) => {
  return (
    <ul>
      {LINKS.map((link) => {
        const { display, path } = link;
        const active = pathname.startsWith(`${path}`);
        return (
          <li key={path}>
            <IonMenuToggle>
              <Link
                to={path}
                className={cx(
                  'side-menu-link flex items-center h-10 pl-5 mb-1 rounded-l-full capitalize',
                  { 'bg-white dark:bg-neutral-800': active }
                )}
              >
                {display}
                {active && (
                  <>
                    <span className='side-menu-link-curve top'></span>
                    <span className='side-menu-link-curve bottom'></span>
                  </>
                )}
              </Link>
            </IonMenuToggle>
          </li>
        );
      })}
    </ul>
  );
};

export default SideMenuLinks;
