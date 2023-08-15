import { IonSpinner } from "@ionic/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "./Input";
import Button from "./Button";
import { forgotPassword, ForgotPassword } from "../constants/schemas/auth";
import useAuth from "../hooks/useAuth";
import useFirebaseErrorMessage from "../hooks/useFirebaseErrorMessage";
import ErrorText from "./ErrorText";

const ForgotPasswordForm = () => {
  const { sendPasswordResetEmail, sendPasswordResetEmailMutation } = useAuth();
  const errorMessage = useFirebaseErrorMessage(
    (sendPasswordResetEmailMutation.error as any)?.code
  );

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(forgotPassword) });

  const submit = ({ email }: ForgotPassword) => {
    sendPasswordResetEmail(email);
  };

  return (
    <div className="flex flex-col justify-center min-h-[calc(100vh_-_56px)] py-10">
      <form onSubmit={handleSubmit(submit)}>
        <h2 className="mb-10 font-medium text-lg text-center">
          Reset your password
        </h2>
        <Input
          label="Email"
          labelPlacement="floating"
          {...register("email")}
          errorText={errors.email?.message}
        />
        <Button
          id="checkoutFormButton"
          className="h-[50px] mt-[30px]"
          type="submit"
          expand="block"
          loading={sendPasswordResetEmailMutation.isLoading}
        >
          Send reset email
        </Button>
        {errorMessage && (
          <div className="my-5 text-center">
            <ErrorText text={errorMessage} hideHorizontalBar />
          </div>
        )}
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
