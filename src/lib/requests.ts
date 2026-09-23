import { isSSR } from './helpers';
import storageLabel from './localStorage';
import config from '../configuration';

// A server that accepts the connection but never answers would otherwise
// leave a chart spinning until the browser gives up, with a bare "Failed to
// fetch". Generous by default: some v5 stats queries take close to 30s.
const REQUEST_TIMEOUT_MS = 60_000;
// v6 answers every stats query in well under a second.
const V6_REQUEST_TIMEOUT_MS = 20_000;

export function sendRequest(
	url: string,
	method: 'POST' | 'GET' | 'PUT',
	authorization: boolean = false,
	body?: {},
	query?: {},
	additionalHeaders: HeadersInit = {},
	additionalOptions: RequestInit = {},
	timeoutMs: number = REQUEST_TIMEOUT_MS,
) {
	const token = !isSSR() ? localStorage.getItem(storageLabel.TOKEN) : null;
	const Authorization =
		authorization && token ? `Bearer ${token}` : undefined;
	const defaultHeaders = {
		'Content-Type': 'application/json',
		...additionalHeaders,
	};
	const headers = Authorization
		? {
				...defaultHeaders,
				Authorization,
				authVersion: '2',
		  }
		: { ...defaultHeaders };
	const controller = new AbortController();
	const timeout = setTimeout(() => controller.abort(), timeoutMs);
	try {
		return fetch(url + '?' + new URLSearchParams(query), {
			method,
			headers,
			body: JSON.stringify(body),
			signal: controller.signal,
			...additionalOptions,
		})
			.then(async response => {
				if (response.ok) {
					return await response.json();
				} else {
					const errorObject = await response.json();
					const errorMessage =
						(errorObject.message ||
							errorObject?.errors[0]?.message) ??
						'An error occurred';
					return Promise.reject(new Error(errorMessage));
				}
			})
			.catch(error =>
				Promise.reject(
					error?.name === 'AbortError'
						? new Error(
								`${new URL(url).host} did not respond within ${
									timeoutMs / 1000
								}s`,
						  )
						: error,
				),
			)
			.finally(() => clearTimeout(timeout));
	} catch (error) {
		clearTimeout(timeout);
		return Promise.reject(error);
	}
}

export function getRequest(
	url: string,
	authorization: boolean = false,
	query: {} = {},
	additionalHeaders: HeadersInit = {},
	additionalOptions: RequestInit = {},
) {
	return sendRequest(
		url,
		'GET',
		authorization,
		undefined,
		query,
		additionalHeaders,
		additionalOptions,
	);
}

export function postRequest(
	url: string,
	authorization: boolean = false,
	body: {} = {},
	additionalHeaders: HeadersInit = {},
	additionalOptions: RequestInit = {},
	timeoutMs?: number,
) {
	return sendRequest(
		url,
		'POST',
		authorization,
		body,
		undefined,
		additionalHeaders,
		additionalOptions,
		timeoutMs,
	);
}

export function putRequest(
	url: string,
	authorization: boolean = false,
	body: {} = {},
	additionalHeaders: HeadersInit = {},
	additionalOptions: RequestInit = {},
) {
	return sendRequest(
		url,
		'PUT',
		authorization,
		body,
		undefined,
		additionalHeaders,
		additionalOptions,
	);
}

export function gqlRequest(
	url: string,
	authorization: boolean = false,
	query: string,
	variables: {} = {},
	additionalHeaders: HeadersInit = {},
	additionalOptions: RequestInit = {},
) {
	return postRequest(
		url,
		authorization,
		{
			query,
			variables,
		},
		additionalHeaders,
		additionalOptions,
	);
}

export function backendGQLRequest(
	query: string,
	variables: {} = {},
	additionalHeaders: HeadersInit = {},
	additionalOptions: RequestInit = {},
) {
	return postRequest(
		config.BACKEND_LINK,
		true,
		{ query, variables },
		additionalHeaders,
		additionalOptions,
	);
}

export function v6BackendGQLRequest(
	query: string,
	variables: {} = {},
	additionalHeaders: HeadersInit = {},
	additionalOptions: RequestInit = {},
) {
	// The stats queries are public, and a v5 login token means nothing to v6.
	return postRequest(
		config.V6_BACKEND_LINK,
		false,
		{ query, variables },
		additionalHeaders,
		additionalOptions,
		V6_REQUEST_TIMEOUT_MS,
	);
}

export type BackendVersion = 'v5' | 'v6';

// giveth-v6-core serves the same stats queries as impact-graph (v5), with the
// same names and arguments, except that it types `networkId` as Int where v5
// uses Float. So one query text serves both once that variable is retyped.
const toV6Query = (query: string) =>
	query.replace(/\$networkId: Float/g, '$networkId: Int');

export function statsGQLRequest(
	version: BackendVersion,
	query: string,
	variables: {} = {},
) {
	return version === 'v6'
		? v6BackendGQLRequest(toV6Query(query), variables)
		: backendGQLRequest(query, variables);
}

export function deVouchGQLRequest(
	query: string,
	variables: {} = {},
	additionalHeaders: HeadersInit = {},
	additionalOptions: RequestInit = {},
) {
	return postRequest(
		config.DEVOUCH_BACKEND_URL,
		true,
		{ query, variables },
		additionalHeaders,
		additionalOptions,
	);
}
