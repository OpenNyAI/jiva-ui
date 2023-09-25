import {type ActMetaData, type DocumentMetaData} from '@opennyai/jiva-user-api';
import {userService} from './Services';

const replaceUrlWithParams = (url: string, pathParams: Record<string, string>) => {
	let replacedUrl = url;
	for (const key in pathParams) {
		if (Object.prototype.hasOwnProperty.call(pathParams, key)) {
			const value = pathParams[key];
			replacedUrl = replacedUrl.replace(key, value);
		}
	}

	return replacedUrl;
};

const getWithParams = async (url: string, pathParams: Record<string, string>, accessToken: string) => {
	const replacedUrl = replaceUrlWithParams(url, pathParams);

	const response = await fetch(replacedUrl,
		{
			method: 'GET',
			headers: {
				accept: 'application/json',
				Authorization: `Bearer ${accessToken}`,
			},
		});
	return response.json();
};

const get = async (url: string, accessToken: string) => {
	const response = await fetch(`${url}`, {
		method: 'GET',
		headers: {
			accept: 'application/json',
			Authorization: `Bearer ${accessToken}`,
		},
	});
	return response.json();
};

const postWithAuthWithQuery = async (url: string, queryParams: Record<string, any>, accessToken: string) => {
	const query = Object.keys(queryParams)
		.map(
			k => `${encodeURIComponent(k)}=${encodeURIComponent(queryParams[k] as string | number | boolean)}`,
		)
		.join('&');
	const response = await fetch(`${url}?${query}`, {
		method: 'POST',
		headers: {'Content-Type': 'application/json',
			Authorization: `Bearer ${accessToken}`},
	});
	return response.json();
};

const postWithoutAuthWithQuery = async (url: string, queryParams: Record<string, any>) => {
	const query = Object.keys(queryParams)
		.map(
			k => `${encodeURIComponent(k)}=${encodeURIComponent(queryParams[k] as string | number | boolean)}`,
		)
		.join('&');
	const response = await fetch(`${url}?${query}`, {
		method: 'POST',
		headers: {'Content-Type': 'application/json'},
	});
	return response.json();
};

const postWithoutAuthWithBody = async (url: string, details: string) => {
	const response = await fetch(`${url}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: details,
	});
	return response.json();
};

const postWithAuthWithBody = async (url: string, bodyString: string, accessToken: string) => {
	const response = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${accessToken}`,
		},
		body: bodyString,
	});
	return response.json();
};

const putWithAuthWithBody = async (url: string, bodyString: string, accessToken: string) => {
	const response = await fetch(url, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${accessToken}`,
		},
		body: bodyString,
	});
	return response.json();
};

const deleteWithAuthWithParams = async (url: string, pathParams: Record<string, string>, accessToken: string) => {
	const replacedUrl = replaceUrlWithParams(url, pathParams);
	const response = await fetch(replacedUrl, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${accessToken}`,
		},
	});
	return response.json();
};

const getDocumentInformation = async (documentId: string, accessToken: string) => {
	try {
		const response: DocumentMetaData = await userService(accessToken).document.getDocumentInfo(documentId);

		return response;
	} catch (error) {

	}
};

const getActInformation = async (actId: string, accessToken: string) => {
	if (actId !== undefined) {
		try {
			const response: ActMetaData = await userService(accessToken).act.getActInfo(actId);
			return response;
		} catch (error) {
		}
	}
};

export default {
	getWithParams,
	get,
	postWithAuthWithQuery,
	getActInformation,
	getDocumentInformation,
	postWithoutAuthWithBody,
	postWithoutAuthWithQuery,
	postWithAuthWithBody,
	putWithAuthWithBody,
	deleteWithAuthWithParams};

