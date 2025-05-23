export const isDevelopment = process.env.NEXT_PUBLIC_ENV === 'development';

const BASE_ROUTE = isDevelopment
	? 'https://impact-graph.serve.giveth.io'
	: 'https://mainnet.serve.giveth.io';

const SWIE_AUTH_ROUTE = isDevelopment
	? 'https://auth.serve.giveth.io'
	: 'https://auth.giveth.io';

const DEVOUCH_BACKEND_URL = isDevelopment
	? 'https://backend.devouch.xyz/graphql'
	: 'https://optimism.backend.devouch.xyz/graphql';

const config = {
	BACKEND_LINK: `${BASE_ROUTE}/graphql`,
	SWIE_AUTH_MICROSERVICE_URL: SWIE_AUTH_ROUTE,
	DEVOUCH_BACKEND_URL: DEVOUCH_BACKEND_URL,
};

export default config;
