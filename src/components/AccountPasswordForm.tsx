import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "./Input";
import Button from "./Button";
import {
  accountPasswordSchema,
  AccountPassword,
} from "../constants/schemas/account";
import useAuth from "../hooks/useAuth";
import useAuthModal from "../hooks/useAuthModal";

const AccountPasswordForm = () => {
  const { updatePassword, updatePasswordMutation, reAuthenticated } = useAuth();
  const { openAuthModal } = useAuthModal();

  useEffect(() => {
    if (!reAuthenticated) openAuthModal("re-authenticate");
  }, [reAuthenticated]);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(accountPasswordSchema),
  });

  const submit = ({ password }: AccountPassword) => {
    updatePassword(password);
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Input
        type="password"
        label="Password"
        labelPlacement="floating"
        {...register("password")}
        errorText={errors.password?.message}
      />
      <Input
        type="password"
        label="Confirm password"
        labelPlacement="floating"
        {...register("confirmPassword")}
        errorText={errors.confirmPassword?.message}
      />
      <Button
        id="checkoutFormButton"
        className="h-[50px] mt-[30px]"
        type="submit"
        expand="block"
        loading={updatePasswordMutation.isLoading}
      >
        Update password
      </Button>
    </form>
  );
};

export default AccountPasswordForm;
