export const isProduction = process.env.NEXT_PUBLIC_ENV === 'production';

const BASE_ROUTE = isProduction
	? 'https://mainnet.serve.giveth.io'
	: 'https://impact-graph.serve.giveth.io';

const config = {
	BACKEND_LINK: `${BASE_ROUTE}/graphql`,
};

export default config;
