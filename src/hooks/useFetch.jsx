import { useState, useEffect } from 'react';
import API from '../api/api.js';

const useFetch = (url) => {
	const [data, setData] = useState({});
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const { data: res } = await API.get(url);
				setData();
				setLoading(true);
			} catch (error) {
				setError(error.message);
			}
		};
		fetchData();
	}, [url]);

	return {
		data,
		error,
		loading,
	};
};

export default useFetch;
