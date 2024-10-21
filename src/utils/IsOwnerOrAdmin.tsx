import { useMsal } from '@azure/msal-react';

export const isOwnerOrAdmin = (createdBy?: string | null | undefined) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { accounts } = useMsal();
  const roles = accounts[0].idTokenClaims?.roles;

  if (roles === undefined) return false;
  if (roles.includes('PEPM.Admin')) return true;
  if (roles.includes('PEPM.User')) {
    if (createdBy) {
      if (accounts[0].username === createdBy) return true;
      return false;
    }
    return true;
  }

  return false;
};
