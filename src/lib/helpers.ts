export const isSSR = () => {
	return typeof window === 'undefined';
};

export const formatDateToISO = (time: Date) => {
	const offset = time.getTimezoneOffset();
	const newDate = new Date(time.getTime() - offset * 60 * 1000);
	return newDate.toISOString().split('T')[0];
};

export const firstOfThisYear = () => {
	const now = new Date();
	return new Date(now.getFullYear(), 0, 1);
};

export const firstOfNextMonth = () => {
	const now = new Date();
	return new Date(now.getFullYear(), now.getMonth() + 1, 1);
};

export const thousandsSeparator = (x?: string | number) => {
	return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
