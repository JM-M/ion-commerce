import { ReactElement } from "react";
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonBackButton,
  IonButtons,
} from "@ionic/react";

interface Props {
  children: ReactElement | string;
  backHref?: string;
}

const PageHeader: React.FC<Props> = ({ children, backHref = "" }) => {
  return (
    <IonHeader className="container ion-no-border">
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton
            defaultHref={backHref || "/"}
            className="ion-no-padding h-[20px] w-[20px]"
          />
        </IonButtons>
        <IonTitle slot="start">{children}</IonTitle>
      </IonToolbar>
    </IonHeader>
  );
};

export default PageHeader;
