interface URLS {
	base?: string;
	token?: string;
	revoked?: string;
}

export const auths: URLS = {
	base: 'https://discord.com/api/oauth2/authorize',
	token: 'https://discord.com/api/oauth2/token',
	revoked: 'https://discord.com/api/oauth2/token/revoke',
};

export type scopes = Array<string>;