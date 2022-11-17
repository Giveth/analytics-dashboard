export const isSSR = () => {
	return typeof window === 'undefined';
};

export const formatDateToISO = (time: Date) => {
	const offset = time.getTimezoneOffset();
	const newDate = new Date(time.getTime() - offset * 60 * 1000);
	return newDate.toISOString().split('T')[0];
};

export const nowMinusOneMonth = () => {
	const now = new Date();
	return new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
};
