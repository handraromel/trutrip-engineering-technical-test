import { ConfirmationDialog } from '@/components';
import Table from '@/components/Table';
import { useDeleteUser, useGetUsers, useModal } from '@/hooks';
import { User } from '@/types/user';
import { sortUsersByLatest } from '@/utils';
import React, { useState } from 'react';
import userTableColumns from './Columns';
import UserDetails from './Details';
import Submission from './Submission';

export const UserTable: React.FC = () => {
  const { data: users, isLoading } = useGetUsers();
  const { mutateAsync: deleteUser, isPending: isDeleting } = useDeleteUser();
  const detailModal = useModal();
  const submissionModal = useModal();
  const deleteConfirmationModal = useModal();
  const [singleUser, setSingleUser] = useState<User | null>(null);

  const handleViewUser = (user: User) => {
    detailModal.open();
    setSingleUser(user);
  };

  const handleOpenSubmission = (user: User | null) => {
    submissionModal.open();
    setSingleUser(user);
  };

  const handleDeleteUser = async () => {
    await deleteUser(singleUser?.id || '');
    deleteConfirmationModal.close();
    setSingleUser(null);
  };

  const handleOpenDeleteConfirmation = (user: User | null) => {
    deleteConfirmationModal.open();
    setSingleUser(user);
  };

  return (
    <>
      <Table
        title={'Manage Users'}
        data={sortUsersByLatest(users || [])}
        columns={userTableColumns}
        mainActions={[
          {
            icon: 'pi pi-plus',
            label: 'Add User',
            tooltip: 'Add a new user',
            severity: 'success',
            onClick: () => handleOpenSubmission(null),
          },
        ]}
        loading={isLoading}
        key={'id'}
        globalSearchFields={['name', 'origin']}
        actions={{
          header: 'Actions',
          buttons: [
            {
              icon: 'pi pi-eye',
              tooltip: 'View User',
              severity: 'info',
              onClick: (rowData) => handleViewUser(rowData),
            },
            {
              icon: 'pi pi-pencil',
              tooltip: 'Edit User',
              severity: 'help',
              onClick: (rowData) => handleOpenSubmission(rowData),
            },
            {
              icon: 'pi pi-trash',
              tooltip: 'Delete User',
              severity: 'danger',
              onClick: (rowData) => handleOpenDeleteConfirmation(rowData),
            },
          ],
        }}
      />
      <UserDetails
        userId={singleUser?.id || ''}
        isOpen={detailModal.isOpen}
        onClose={detailModal.close}
      />
      <Submission
        visible={submissionModal.isOpen}
        onHide={submissionModal.close}
        user={singleUser}
      />
      <ConfirmationDialog
        visible={deleteConfirmationModal.isOpen}
        onHide={deleteConfirmationModal.close}
        onConfirm={handleDeleteUser}
        message={`Are you sure you want to delete this user?`}
        header="Delete User"
        acceptLabel="Delete"
        rejectLabel="Cancel"
        disabled={isDeleting}
        loading={isDeleting}
      />
    </>
  );
};

export default UserTable;
