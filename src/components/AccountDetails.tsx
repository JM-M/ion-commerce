import Button from "./Button";
import { IonIcon } from "@ionic/react";
import { pencilOutline } from "ionicons/icons";
import useAuth from "../hooks/useAuth";
import PageLoader from "./PageLoader";
import useAuthModal from "../hooks/useAuthModal";

const AccountDetails = () => {
  const { user, isLoggedIn } = useAuth();
  const { openAuthModal } = useAuthModal();

  if (!isLoggedIn || !user)
    return (
      <div className="container my-auto text-center">
        <h2 className="mb-3 text-lg">You are not logged in</h2>
        <p>
          Please{" "}
          <span
            className="text-[var(--ion-color-primary)]"
            onClick={() => openAuthModal("login")}
          >
            log in
          </span>{" "}
          or{" "}
          <span
            className="text-[var(--ion-color-primary)]"
            onClick={() => openAuthModal("sign-up")}
          >
            create an account
          </span>
        </p>
      </div>
    );

  const { email, firstName, lastName } = user;
  return (
    <div>
      <div className="mb-5">
        <div>Name</div>
        <div className="flex justify-between items-center font-medium">
          <span>
            {firstName} {lastName}
          </span>
          <Button
            routerLink="/account/edit/name"
            fill="outline"
            className="block w-fit ml-auto"
          >
            <IonIcon
              slot="start"
              icon={pencilOutline}
              className="inline-block h-[18px] w-[18px]"
            />{" "}
            Edit
          </Button>
        </div>
      </div>
      <div className="mb-5">
        <div>Email</div>
        <div className="flex justify-between items-center font-medium">
          <span>{email}</span>
          <Button
            routerLink="/account/edit/email"
            fill="outline"
            className="block w-fit ml-auto"
          >
            <IonIcon
              slot="start"
              icon={pencilOutline}
              className="inline-block h-[18px] w-[18px]"
            />{" "}
            Edit
          </Button>
        </div>
      </div>
      <Button
        routerLink="/account/edit/password"
        fill="outline"
        className="block w-fit ml-auto mt-10"
      >
        Change password
      </Button>
    </div>
  );
};

export default AccountDetails;
