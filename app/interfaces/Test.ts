export interface PersonInfo<T> {
	name: string;
	age: number;
	external?: T;
}

export interface P {
	info: PersonInfo<string>;
}

type Person = Map<string, P>;
