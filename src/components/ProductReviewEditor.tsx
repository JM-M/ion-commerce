import { useEffect, useRef } from "react";
import { useParams } from "react-router";
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonContent,
  IonItem,
  IonTextarea,
  IonLabel,
  IonText,
} from "@ionic/react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import cx from "classnames";
import Rating from "./Rating";
import Button from "./Button";
import reviewSchema, { Review } from "../constants/schemas/review";
import useProducts from "../hooks/useProducts";
import useAuth from "../hooks/useAuth";

interface Props {
  close: Function;
  review: Review;
}

const ProductReviewEditor = ({ close = () => null, review }: Props) => {
  const { uid, isLoggedIn, user } = useAuth();

  const submitButtonRef = useRef();

  const params: any = useParams();
  const { productId = "" } = params;

  const { addReview, reviewMutation } = useProducts({
    productId,
    onCreateReview: close,
  });

  const {
    handleSubmit,
    control,
    register,
    formState: { errors, touchedFields },
    setValue,
  } = useForm({
    resolver: yupResolver(reviewSchema),
  });

  useEffect(() => {
    if (Object.keys(touchedFields).length) return;
    const { rating = 0, content = "" } = review || {};
    setValue("rating", rating);
    setValue("content", content);
  }, [touchedFields, review]);

  const submit = (values: Review) => {
    if (!isLoggedIn) return;
    const { firstName, lastName } = user;
    addReview({ ...values, firstName, lastName, userId: uid! });
  };

  return (
    <>
      <IonHeader className="px-2 ion-no-border">
        <IonToolbar>
          <IonButtons slot="end">
            <IonButton onClick={() => close()} className="text-pri">
              Close
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <form
          className="px-5"
          onClick={handleSubmit((values, event) => {
            if (event?.target === submitButtonRef.current) submit(values);
          })}
        >
          <Controller
            control={control}
            name="rating"
            render={({ field, fieldState }) => {
              const { name } = field;
              return (
                <>
                  <IonItem
                    className={cx({
                      "ion-invalid": !!errors?.rating?.message,
                      "ion-valid": !errors?.rating?.message,
                    })}
                  >
                    <IonLabel className="block">Rating</IonLabel>
                    <Rating
                      max={5}
                      value={field.value}
                      setValue={(value: number) =>
                        setValue(name, value, { shouldTouch: true })
                      }
                    />
                  </IonItem>
                  {errors?.rating?.message && (
                    <IonText
                      color="danger"
                      className="block w-fit ml-auto pr-3 text-xs"
                    >
                      {errors?.rating?.message}
                    </IonText>
                  )}
                </>
              );
            }}
          />
          <IonItem
            className={cx({
              "ion-invalid": !!errors?.content?.message,
              "ion-valid": !errors?.content?.message,
            })}
          >
            <IonTextarea
              label="Your review"
              aria-label="Your review"
              labelPlacement="floating"
              {...register("content")}
              errorText={(errors?.content?.message || "") as string}
              autoGrow
            />
          </IonItem>
          <Button
            ref={submitButtonRef}
            className="block w-fit my-5 ml-auto"
            loading={reviewMutation.isLoading}
          >
            {!!review ? "Edit" : "Add"} review
          </Button>
        </form>
      </IonContent>
    </>
  );
};

export default ProductReviewEditor;
