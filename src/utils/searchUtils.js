export const getSearchParams = (search) => {
	const sp = new URLSearchParams(search); // /search?category=Shirts
	const category = sp.get('category') || 'all';
	const query = sp.get('query') || 'all';
	const price = sp.get('price') || 'all';
	const rating = sp.get('rating') || 'all';
	const order = sp.get('order') || 'newest';
	const page = sp.get('page') || 1;

	return {
		sp,
		category,
		query,
		price,
		rating,
		order,
		page,
	};
};
