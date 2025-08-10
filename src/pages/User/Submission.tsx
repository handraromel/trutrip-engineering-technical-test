import { InputField } from '@/components/Inputs';
import { Modal } from '@/components/Modal';
import useToast from '@/context/Toast';
import { useCreateUser, useUpdateUser } from '@/hooks/queries/useUsers';
import { User, UserSubmissionValues } from '@/types';
import { userValidationSchema } from '@/validationSchema/userValidationSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';
import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

interface UserSubmission {
  visible: boolean;
  onHide: () => void;
  user?: User | null;
}

const defaultValues: UserSubmissionValues = {
  name: '',
  origin: '',
};

const Submission: React.FC<UserSubmission> = ({ visible, onHide, user }) => {
  const { showSuccess, showError } = useToast();
  const { mutateAsync: createUser, isPending: isCreating } = useCreateUser();
  const { mutateAsync: updateUser, isPending: isUpdating } = useUpdateUser();

  const extractUserValues = (user: User | null): UserSubmissionValues => {
    if (!user) return defaultValues;

    return {
      name: user.name,
      origin: user.origin,
    };
  };

  const submissionForm = useForm<UserSubmissionValues>({
    resolver: yupResolver(userValidationSchema),
    mode: 'onBlur',
    defaultValues,
  });

  useEffect(() => {
    if (visible) {
      submissionForm.reset(user ? extractUserValues(user) : defaultValues);
    }
  }, [visible, user, submissionForm]);

  const { isValid, isDirty, isSubmitting } = submissionForm.formState;

  const handleSubmit = async (values: UserSubmissionValues) => {
    try {
      if (user) {
        await updateUser({ userId: user.id, data: values });
        showSuccess('User record updated successfully');
      } else {
        await createUser(values);
        showSuccess('User record created successfully');
      }
      onHide();
      submissionForm.reset(defaultValues);
    } catch {
      showError('Submission failed');
    }
  };

  const handleReset = () => {
    submissionForm.reset(user ? extractUserValues(user) : defaultValues);
  };

  const handleClose = () => {
    onHide();
    submissionForm.reset(defaultValues);
  };

  const modalIcons = (
    <>
      <Tooltip target=".resetIcon" position="top" content="Reset form" />
      <div
        onClick={handleReset}
        className="resetIcon group relative h-8 w-8 cursor-pointer rounded-full text-center text-gray-400 transition-all hover:bg-gray-500/7 hover:text-gray-700 dark:hover:bg-gray-100/3 dark:hover:text-gray-100"
        aria-label="Reset form"
      >
        <i className="pi pi-refresh mt-[7px]" />
      </div>
    </>
  );

  return (
    <Modal
      visible={visible}
      onHide={handleClose}
      header={user ? 'Edit Sale Record' : 'Add Sale Record'}
      className="w-[600px]"
      onClose={handleReset}
      icons={modalIcons}
      blockOutsideClick
    >
      <div className="p-4">
        <FormProvider {...submissionForm}>
          <form onSubmit={submissionForm.handleSubmit(handleSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <InputField id="name" name="name" type="text" label="Name" placeholder="Enter name" />
              <InputField
                id="origin"
                name="origin"
                type="text"
                label="Original Region"
                placeholder="Enter original region"
              />
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button
                type="button"
                label="Cancel"
                severity="secondary"
                outlined
                size="small"
                onClick={handleClose}
              />
              <Button
                type="submit"
                label={user ? 'Update' : 'Submit'}
                size="small"
                loading={isSubmitting || isCreating || isUpdating}
                disabled={!isValid || !isDirty || isSubmitting || isCreating || isUpdating}
              />
            </div>
          </form>
        </FormProvider>
      </div>
    </Modal>
  );
};

export default Submission;
