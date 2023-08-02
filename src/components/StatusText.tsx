import { IonText } from "@ionic/react";

const StatusText = ({ status }: { status: string }) => {
  let color = "primary";
  if (status === "en-route") color = "warning";
  if (status === "delivered") color = "success";
  if (status === "cancelled") color = "danger";

  return <IonText color={color}>{status}</IonText>;
};

export default StatusText;
