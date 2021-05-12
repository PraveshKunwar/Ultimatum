export const encode = (obj: { [key: string]: unknown }) => {
	let string = '';
	for (const [K, V] of Object.entries(obj)) {
		if (!V) continue;
		string += `&${encodeURIComponent(K)}=${encodeURIComponent(`${V}`)}`;
	}
	return string.substring(1);
};

export interface TokenData {
	access_token: string;
	expires_in: number;
	refresh_token: string;
	scope: string;
	token_type: string;
}
