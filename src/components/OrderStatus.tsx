import { IonIcon } from "@ionic/react";
import { checkmark } from "ionicons/icons";
import { formatDistance } from "date-fns";
import cx from "classnames";
import { StatusEvent } from "../hooks/useOrders";
import ORDER_STATUSES from "../constants/orderStatuses";

interface Props {
  events: StatusEvent[];
}

const OrderStatus = ({ events = [] }: Props) => {
  const hasCancelledEvent = events
    .map((event) => event.status)
    .includes("cancelled");
  return (
    <div>
      <ul className="flex flex-col gap-5">
        {ORDER_STATUSES.map((status, i) => {
          const event = events.find((event) => event.status === status);
          const checked = !!event;
          const isCancelled = status === "cancelled";
          if (!checked && (hasCancelledEvent || isCancelled)) return null;
          return (
            <li key={i}>
              <div className="flex items-center gap-3">
                <span
                  className={cx(
                    "h-[30px] w-[30px] flex items-center justify-center rounded-lg",
                    {
                      "bg-[var(--ion-color-primary)]": checked && !isCancelled,
                      "bg-[var(--ion-color-danger)]": checked && isCancelled,
                      "bg-gray-200": !checked,
                    }
                  )}
                >
                  {checked && <IonIcon icon={checkmark} color="light" />}
                </span>
                <div>
                  <span
                    className={cx("capitalize", { "opacity-50": !checked })}
                  >
                    {status.replaceAll("-", " ")}
                  </span>
                  {checked && (
                    <span className="block text-[var(--ion-color-medium)]">
                      {formatDistance(event.time.toDate(), new Date(), {
                        addSuffix: true,
                      })}
                    </span>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default OrderStatus;
