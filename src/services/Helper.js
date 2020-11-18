import { ADMINS } from './Constants';

export const getAllowAdminsRoles = () => {
	return Object.entries(ADMINS).map(([k, v]) => v);
}
