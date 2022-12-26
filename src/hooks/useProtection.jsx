import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { isAdmin } from '../utils/index.js';

const useProtection = (props) => {
	const { currentUser } = useSelector((state) => state.user);
	const navigate = useNavigate();

	const admin = props?.admin || false;

	useEffect(() => {
		if (!currentUser) navigate('/');

		if (admin && !isAdmin(currentUser)) navigate('/');
	}, [currentUser, navigate, admin]);
	// return <></>;
};

export default useProtection;
