export const isDevelopment = process.env.NEXT_PUBLIC_ENV === 'development';

const BASE_ROUTE = isDevelopment
	? 'http://localhost:4000'
	: 'http://localhost:4000';

const SWIE_AUTH_ROUTE = isDevelopment
	? 'https://auth.serve.giveth.io'
	: 'https://auth.giveth.io';

const config = {
	BACKEND_LINK: `${BASE_ROUTE}/graphql`,
	SWIE_AUTH_MICROSERVICE_URL: SWIE_AUTH_ROUTE,
};

export default config;
