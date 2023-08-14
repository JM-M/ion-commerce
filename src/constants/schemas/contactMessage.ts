import { object, string, InferType } from "yup";

const contactMessageSchema = object({
  message: string().required("Message is required"),
  user: object({
    email: string().email("Not a valid email"),
    firstName: string(),
    lastName: string(),
    uid: string(),
  }),
});

export type ContactMessage = InferType<typeof contactMessageSchema>;

export default contactMessageSchema;
