export interface DataProps {
	client_id: string;
	client_secret: string;
	grant_type: string;
	redirect_uri: string;
	code: string | string[];
	scope: string;
}

export interface ReturnTokens {
	access_token: string;
	expires_in: number;
	refresh_token: string;
	scope: string;
	token_type: string;
}

export interface ReturnUser {
	id: string;
	username: string;
	avatar: string;
	discriminator: string;
	public_flags: number;
	flags: number;
	locale: string;
	mfa_enabled: boolean;
}

export enum URLS {
	BASE = 'https://discord.com/api/oauth2/authorize',
	TOKEN = 'https://discord.com/api/oauth2/token',
	REVOKE = 'https://discord.com/api/oauth2/token/revoke',
	USER = 'https://discord.com/api/users/@me',
	GUILDS = 'https://discord.com/api/users/@me/guilds',
}

export const scopes: Array<string> = [
	'identify',
	'email',
	'connections',
	'guilds',
];
