import { useIonRouter } from "@ionic/react";
import PageHeader from "../components/PageHeader";

const PasswordResetEmailSent = () => {
  const ionRouter = useIonRouter();
  const email = new URLSearchParams(ionRouter.routeInfo.search).get("email");

  return (
    <div className="h-full flex flex-col">
      <PageHeader backHref="/account">Edit email</PageHeader>
      <div className="container my-auto text-center">
        <span>
          An email has been sent to <span className="font-medium">{email}</span>
        </span>
      </div>
    </div>
  );
};

export default PasswordResetEmailSent;
