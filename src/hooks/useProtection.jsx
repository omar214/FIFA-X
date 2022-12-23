import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const useProtection = ({ isAdmin = false }) => {
	const { currentUser } = useSelector((state) => state.user);
	const navigate = useNavigate();
	if (isAdmin === undefined || isAdmin === null) isAdmin = false;

	useEffect(() => {
		if (!currentUser) navigate('/');

		if (isAdmin && !currentUser.isAdmin) navigate('/');
	}, [currentUser, navigate, isAdmin]);
};

export default useProtection;
