export interface User {
	avatar: string;
	discriminator: string;
	email: string;
	flags: number;
	id: string;
	locale: string;
	mfa_enabled: boolean;
	public_flags: number;
	username: string;
	verified: boolean;
}
