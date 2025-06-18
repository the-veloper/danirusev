import { Access } from 'payload/types';

export const isAdmin: Access = ({ req: { user } }) => {
  // Return true if user has admin role
  return Boolean(user?.role === 'admin');
}; 