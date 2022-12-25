import { toast } from 'react-toastify';

export const isAdmin = (currentUser) => {
	return currentUser?.roles.find((item) => item.role === 'Admin');
};
export const isManager = (currentUser) => {
	return currentUser?.roles.find((item) => item.role === 'Manager');
};

export const updateToaster = (toastId, message, type) => {
	toast.update(toastId, {
		render: message,
		type: type,
		isLoading: false,
		closeButton: true,
		autoClose: null, // to inherit the default value

		className: 'rotateY animated',
	});
};
