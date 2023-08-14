import {
  IonPopover,
  IonContent,
  IonIcon,
  IonButton,
  IonSpinner,
} from "@ionic/react";
import { logOutOutline, personCircleOutline } from "ionicons/icons";
import useAuthModal from "../hooks/useAuthModal";
import useAuth from "../hooks/useAuth";

const CartIcon = () => {
  const { openAuthModal } = useAuthModal();
  const { isLoggedIn, user, logOut, logOutMutation } = useAuth();

  const loggingOut = logOutMutation.isLoading;

  if (!user) return null;

  return (
    <span className="relative inline-block h-[24px] w-[24px] ml-2" slot="end">
      {isLoggedIn && user ? (
        <>
          <IonButton
            fill="clear"
            color="dark"
            className="relative bottom-1 h-[24px] w-[24px] ion-no-padding ion-no-margin"
            id="logout-popover-click-trigger"
          >
            <span
              onClick={(e) => e.preventDefault()}
              className="inline-flex justify-center items-center h-[24px] w-[24px] text-xs font-medium border border-[var(--ionic-color-medium)] text-center rounded-[50%]"
            >
              {user.firstName[0]}
              {user.lastName[0]}
            </span>
          </IonButton>
          <IonPopover
            trigger="logout-popover-click-trigger"
            triggerAction="click"
            showBackdrop={false}
            className="ion-no-shadow"
          >
            <IonContent class="ion-padding">
              {loggingOut ? (
                <span>
                  <IonSpinner name="dots" className="inline-block mr-3" />
                  Logging out
                </span>
              ) : (
                <IonButton fill="clear" color="dark" onClick={() => logOut()}>
                  <IonIcon slot="start" icon={logOutOutline} />{" "}
                  <span>Log out</span>
                </IonButton>
              )}
            </IonContent>
          </IonPopover>
        </>
      ) : (
        <IonIcon
          icon={personCircleOutline}
          className="relative top-0 left-0 h-[24px] w-[24px]"
          onClick={() => openAuthModal("login")}
        />
      )}
    </span>
  );
};

export default CartIcon;
