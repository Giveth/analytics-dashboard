export const isDevelopment = process.env.NEXT_PUBLIC_ENV === 'development';

const BASE_ROUTE = isDevelopment
	? 'https://impact-graph.serve.giveth.io'
	: 'https://mainnet.serve.giveth.io';

const config = {
	BACKEND_LINK: `${BASE_ROUTE}/graphql`,
	SWIE_AUTH_MICROSERVICE_URL: 'https://mainnet.serve.giveth.io',
};

export default config;
