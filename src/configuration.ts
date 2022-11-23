export const isDevelopment = process.env.NEXT_PUBLIC_ENV === 'development';

const BASE_ROUTE = !isDevelopment
	? 'https://serve.giveth.io'
	: 'https://mainnet.serve.giveth.io';

const config = {
	BACKEND_LINK: `${BASE_ROUTE}/graphql`,
};

export default config;
