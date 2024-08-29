import { type Role } from '@prisma/client';

import { tokenDecode } from './jwt.utils';

export const getRoleFromToken = (token: string) => {
  const payload = tokenDecode(token);

  return payload.role as Role;
};

export const getIdFromToken = (token: string) => {
  const payload = tokenDecode(token);

  return payload.user_id;
};
