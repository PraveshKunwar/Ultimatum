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

export enum auths {
	base = 'https://discord.com/api/oauth2/authorize',
	token = 'https://discord.com/api/oauth2/token',
	revoked = 'https://discord.com/api/oauth2/token/revoke',
}

export type scopes = Array<string>;
