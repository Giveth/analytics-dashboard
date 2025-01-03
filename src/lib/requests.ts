import { isSSR } from './helpers';
import storageLabel from './localStorage';
import config from '../configuration';

export function sendRequest(
	url: string,
	method: 'POST' | 'GET' | 'PUT',
	authorization: boolean = false,
	body?: {},
	query?: {},
	additionalHeaders: HeadersInit = {},
	additionalOptions: RequestInit = {},
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
	try {
		return fetch(url + '?' + new URLSearchParams(query), {
			method,
			headers,
			body: JSON.stringify(body),
			...additionalOptions,
		}).then(async response => {
			if (response.ok) {
				return await response.json();
			} else {
				const errorObject = await response.json();
				const errorMessage =
					(errorObject.message || errorObject?.errors[0]?.message) ??
					'An error occurred';
				return Promise.reject(new Error(errorMessage));
			}
		});
	} catch (error) {
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
) {
	return sendRequest(
		url,
		'POST',
		authorization,
		body,
		undefined,
		additionalHeaders,
		additionalOptions,
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
