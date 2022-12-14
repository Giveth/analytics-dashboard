const getLocalTokenLabel = (): string => {
	return getLocalUserLabel() + '_token';
};

const getLocalUserLabel = (): string => {
	return process.env.NEXT_PUBLIC_LOCAL_USER_LABEL
		? process.env.NEXT_PUBLIC_LOCAL_USER_LABEL +
				'_' +
				process.env.NEXT_PUBLIC_ENV
		: 'nextUser' + '_' + process.env.NEXT_PUBLIC_ENV;
};

const storageLabel = {
	WALLET: 'selectedWallet',
	USER: getLocalUserLabel(),
	TOKEN: getLocalTokenLabel(),
};

export default storageLabel;
