export interface Author {
	id: number;
	firstName: string;
	lastName: string;
}

export interface Book {
	id: number;
	title: string;
	authorId: number | null;
}
