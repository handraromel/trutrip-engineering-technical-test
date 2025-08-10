import { Modal } from '@/components/Modal';
import { useGetUser } from '@/hooks';
import { formatDateDisplay } from '@/utils/dateUtils';

import React from 'react';

type DetailsModalProps = {
  userId: string;
  isOpen: boolean;
  onClose: () => void;
};

const UserDetails: React.FC<DetailsModalProps> = ({ userId, isOpen, onClose }) => {
  const { data: user } = useGetUser(userId, isOpen);

  return (
    <div>
      <Modal header="User Details" visible={isOpen} onClose={onClose}>
        {user ? (
          <div className="space-y-6">
            {/* User Information */}
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Full Name</p>
                <p className="font-semibold text-gray-900">{user.name}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500">Origin</p>
                <p className="font-semibold text-gray-900">{user.origin}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500">Member Since</p>
                <p className="font-semibold text-gray-900">{formatDateDisplay(user.createdAt)}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-4 py-8">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-teal-200 border-t-teal-600"></div>
            <p className="font-medium text-gray-500">Loading user details...</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default UserDetails;
