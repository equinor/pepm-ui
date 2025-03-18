import { useMsal } from '@azure/msal-react';
import { usePepmContextStore } from '../stores/GlobalStore';

export const useIsOwnerOrAdmin = () => {
  const { analogueModel } = usePepmContextStore();
  const { accounts } = useMsal();
  const roles = accounts[0].idTokenClaims?.roles;

  if (roles === undefined) return false;
  if (roles.includes('PEPM.Admin')) return true;
  if (roles.includes('PEPM.User')) {
    if (analogueModel.createdBy) {
      if (accounts[0].username === analogueModel.createdBy) return true;
      return false;
    }
    return true;
  }

  return false;
};
