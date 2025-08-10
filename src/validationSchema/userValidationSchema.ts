import { UserSubmissionValues } from '@/types/user';
import * as yup from 'yup';

export const userValidationSchema = yup.object<UserSubmissionValues>().shape({
  name: yup.string().required('Name is required').max(50, 'Name cannot exceed 50 characters'),
  origin: yup.string().required('Origin is required').max(50, 'Origin cannot exceed 50 characters'),
});
