import React from 'react';
import Table from '../../components/Table';
import { useUsers } from '../../hooks/useUsers';
import { User } from '../../types/user';
import { userTableColumns } from './columns';

export const UserTable: React.FC = () => {
  const { data: users, isLoading } = useUsers();

  return (
    <div className="p-6">
      <Table<User>
        title={'Manage Users'}
        data={users || []}
        columns={userTableColumns}
        loading={isLoading}
        key={'id'}
        globalSearchFields={['name', 'origin']}
        actions={{
          header: 'Actions',
          buttons: [
            {
              icon: 'pi pi-eye',
              tooltip: 'View User',
              onClick: (rowData) => console.log('View', rowData),
            },
            {
              icon: 'pi pi-pencil',
              tooltip: 'Edit User',
              onClick: (rowData) => console.log('Edit', rowData),
            },
            {
              icon: 'pi pi-trash',
              tooltip: 'Delete User',
              onClick: (rowData) => console.log('Delete', rowData),
            },
          ],
        }}
      />
    </div>
  );
};

export default UserTable;
