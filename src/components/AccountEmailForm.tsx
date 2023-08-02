import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "./Input";
import Button from "./Button";
import { accountEmailSchema, AccountEmail } from "../constants/schemas/account";
import useAuth from "../hooks/useAuth";
import useAccount from "../hooks/useAccount";
import useAuthModal from "../hooks/useAuthModal";

const AccountEmailForm = () => {
  const { user } = useAuth();
  const { updateAccountEmail, emailUpdateMutation } = useAccount();
  const { openAuthModal } = useAuthModal();

  useEffect(() => {
    openAuthModal("re-authenticate");
  }, []);

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(accountEmailSchema),
  });

  useEffect(() => {
    if (!user) return;
    const { email } = user;
    setValue("email", email);
  }, [user]);

  const submit = (values: AccountEmail) => {
    updateAccountEmail(values);
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Input
        label="First name"
        labelPlacement="floating"
        {...register("email")}
        errorText={errors.email?.message}
      />
      <Button
        id="checkoutFormButton"
        className="h-[50px] mt-[30px]"
        type="submit"
        expand="block"
        loading={emailUpdateMutation.isLoading}
      >
        Update email
      </Button>
    </form>
  );
};

export default AccountEmailForm;
