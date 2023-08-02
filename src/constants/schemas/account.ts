import { object, string, ref, InferType } from "yup";

const passwordSchema = string()
  .min(6, "Password must be at least 6 characters")
  .required("Password is required");

export const accountNameSchema = object({
  firstName: string().required("First name is required"),
  lastName: string(),
});

export const accountEmailSchema = object({
  email: string().email("Not a valid email").required("Email is required"),
});

export const accountPasswordSchema = object({
  password: passwordSchema,
  confirmPassword: string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required")
    .oneOf([ref("password")], "Passwords must match"),
});

export type AccountName = InferType<typeof accountNameSchema>;
export type AccountEmail = InferType<typeof accountEmailSchema>;
export type AccountPassword = InferType<typeof accountPasswordSchema>;
