import { type Access } from 'payload'

export const editor: Access = ({ req: { user } }) => {
  return Boolean(user && ['admin', 'editor'].includes(user.role))
}