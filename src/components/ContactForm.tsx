import {
  IonButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
} from "@ionic/react";
import { callOutline, logoWhatsapp, sendOutline } from "ionicons/icons";

const ContactForm = () => {
  return (
    <>
      <div className="flex items-center gap-3">
        <a
          href={`https://wa.me/+2348115058726`}
          target="_blank"
          className="flex-1 block"
        >
          <IonButton fill="outline" color="success" className="w-full">
            <IonIcon icon={logoWhatsapp} slot="start" />
            Whatsapp
          </IonButton>
        </a>
        <a href={`tel:2348115058726`} target="_blank" className="flex-1 block">
          <IonButton fill="outline" className="w-full">
            <IonIcon icon={callOutline} slot="start" />
            Call
          </IonButton>
        </a>
      </div>
      <div className="my-5 text-xs text-[var(--ion-color-medium)] text-center">
        Or with email or phone number
      </div>
      <form onSubmit={(e) => e.preventDefault()}>
        <IonItem>
          <IonLabel position="floating">Email</IonLabel>
          <IonInput type="email" aria-label="Email" />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Phone number</IonLabel>
          <IonInput label="+234" type="number" className="h-[65px]" />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Message</IonLabel>
          <IonTextarea aria-label="Message" />
        </IonItem>
        <IonButton
          id="checkoutFormButton"
          className="h-[50px] mt-[30px]"
          type="submit"
          expand="block"
        >
          <span className="mr-auto">Send</span>
          <IonIcon icon={sendOutline} slot="end" />
        </IonButton>
      </form>
    </>
  );
};

export default ContactForm;
