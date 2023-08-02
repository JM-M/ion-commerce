import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "./Input";
import Button from "./Button";
import { accountNameSchema, AccountName } from "../constants/schemas/account";
import useAuth from "../hooks/useAuth";
import useAccount from "../hooks/useAccount";

const AccountNameForm = () => {
  const { user } = useAuth();
  const { updateAccountName, nameUpdateMutation } = useAccount();

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(accountNameSchema),
  });

  useEffect(() => {
    if (!user) return;
    const { firstName = "", lastName = "" } = user;
    setValue("firstName", firstName);
    setValue("lastName", lastName);
  }, [user]);

  const submit = (values: AccountName) => {
    updateAccountName(values);
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Input
        label="First name"
        labelPlacement="floating"
        {...register("firstName")}
        errorText={errors.firstName?.message}
      />
      <Input
        label="Last name"
        labelPlacement="floating"
        {...register("lastName")}
        errorText={errors.lastName?.message}
      />
      <Button
        id="checkoutFormButton"
        className="h-[50px] mt-[30px]"
        type="submit"
        expand="block"
        loading={nameUpdateMutation.isLoading}
      >
        Submit
      </Button>
    </form>
  );
};

export default AccountNameForm;
