import { Image } from 'primereact/image';
import { DataTableColumn } from '../../types/datatable';
import { User } from '../../types/user';

// Avatar column template
const avatarTemplate = (user: User) => {
  return (
    <div className="my-1 flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gray-100">
      <Image src={user.avatar} alt={user.name} width="48" height="48" preview />
    </div>
  );
};

// User table column definitions
export const userTableColumns: DataTableColumn<User>[] = [
  {
    field: 'name',
    header: 'Name',
    sortable: true,
    style: { minWidth: '150px' },
  },
  {
    field: 'origin',
    header: 'Origin',
    sortable: true,
    style: { minWidth: '150px' },
  },
  {
    field: 'avatar',
    header: 'Avatar',
    body: avatarTemplate,
    style: { minWidth: '150px' },
  },
  {
    field: 'createdAt',
    header: 'Created Date',
    sortable: true,
    style: { minWidth: '180px' },
  },
];

// Global filter fields for user table
export const userGlobalFilters: string[] = ['name', 'origin'];
