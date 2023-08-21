import { Link } from "react-router-dom";
import {
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonMenuToggle,
  useIonRouter,
} from "@ionic/react";
import cx from "classnames";

const links: { display: string; path: string }[] = [
  { display: "cart", path: "/store/checkout" },
  { display: "Wishlist", path: "/wishlist" },
  { display: "About", path: "/about" },
  { display: "Contact", path: "/contact" },
];

const SideMenu = () => {
  const {
    routeInfo: { pathname },
  } = useIonRouter();

  return (
    <IonMenu
      type="push"
      contentId="main-content"
      className="dark:text-neutral-300"
    >
      <IonHeader className="container ion-no-border bg-gray-200 dark:bg-neutral-900">
        <IonToolbar color="transparent">
          <IonTitle className="ion-no-padding bg-transparent">
            CubeJKiddies
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="container !pr-0 h-full flex flex-col justify-end pb-20 bg-gray-200 dark:bg-neutral-900">
          <ul>
            {links.map((link) => {
              const { display, path } = link;
              const active = pathname.startsWith(`${path}`);
              return (
                <li key={path}>
                  <IonMenuToggle>
                    <Link
                      to={path}
                      className={cx(
                        "side-menu-link flex items-center h-10 pl-5 ml-5 mb-2 rounded-l-full capitalize",
                        { "bg-white dark:bg-neutral-800": active }
                      )}
                    >
                      {display}
                      {active && (
                        <>
                          <span className="side-menu-link-curve top"></span>
                          <span className="side-menu-link-curve bottom"></span>
                        </>
                      )}
                    </Link>
                  </IonMenuToggle>
                </li>
              );
            })}
          </ul>
        </div>
      </IonContent>
    </IonMenu>
  );
};

export default SideMenu;
