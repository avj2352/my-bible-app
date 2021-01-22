export interface IRecipe {
	id?: string;
    title: string;
    link: string;
	isPrivate: boolean;
	content: string;
	html: string;
	group: any | null;
	createdBy? : any;
	created?: string;
	tags?: any[];
	items?: any[];
	timers?: any[];
}