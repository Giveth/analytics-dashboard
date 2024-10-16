import { gToast, ToastType } from '../components/Toast';

export const isSSR = () => {
	return typeof window === 'undefined';
};

export const formatDateToISO = (time: Date) => {
	const offset = time.getTimezoneOffset();
	const newDate = new Date(time.getTime() - offset * 60 * 1000);
	return newDate.toISOString().split('T')[0];
};

export const firstOfGiveth = () => {
	return new Date('2016/01/01');
};

export const firstOfThisMonth = () => {
	const now = new Date();
	return new Date(now.getFullYear(), now.getMonth(), 1);
};

export const firstOfNextMonth = () => {
	const now = new Date();
	return new Date(now.getFullYear(), now.getMonth() + 1, 1);
};

export const thousandsSeparator = (x?: string | number) => {
	return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const showToastError = (err: any) => {
	let errorMessage =
		typeof err === 'string' ? err : JSON.stringify(err.message || err);
	if (errorMessage.startsWith('"') && errorMessage.endsWith('"')) {
		errorMessage = errorMessage.slice(1, -1);
	}
	gToast(errorMessage, {
		type: ToastType.DANGER,
		position: 'top-center',
	});
	console.log({ err });
};

export const formatAmount = (number: number) => {
	if (typeof number !== 'number') {
		return '---';
	}
	return number.toLocaleString('en-US');
};
