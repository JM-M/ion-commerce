import { object, number, string, InferType } from 'yup';

const reviewSchema = object({
  firstName: string(),
  lastName: string(),
  userId: string(),
  rating: number().required('Rating is required'),
  content: string().required('Review is required'),
});

export type Review = InferType<typeof reviewSchema>;

export default reviewSchema;
