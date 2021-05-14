export interface Guild {
	features: Array<string>;
    id: string;
    name: string;
	icon: string | null;
	owner: boolean;
	permissions: number;
	permissions_new: string;
}
