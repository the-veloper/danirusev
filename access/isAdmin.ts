import type { Access } from 'payload'

interface User {
  role?: string
}

export const isAdmin: Access = ({ req }) => {
  // Return true if user has admin role
  const user = req.user as User | undefined
  return Boolean(user?.role === 'admin')
} 