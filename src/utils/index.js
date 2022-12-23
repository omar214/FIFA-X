export const isAdmin = (currentUser) => {
	return currentUser?.roles.find((item) => item.role === 'Admin');
};
export const isManager = (currentUser) => {
	return currentUser?.roles.find((item) => item.role === 'Admin');
};
