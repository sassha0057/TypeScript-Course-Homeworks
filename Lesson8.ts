type DeepReadonly<T> = T extends Record<string, unknown>
    ? { +readonly [K in keyof T]: DeepReadonly<T[K]>}
    : T;

interface IUser {
    name?: string;
    age: number;
    courses: {
        courseName: string;
        grades: number[];
    }
}

const user1: DeepReadonly<IUser> = {
    name: 'Sasha',
    age: 20,
    courses: {
        courseName: 'TypeScript',
        grades: [1, 2, 3, 4],
    }
}

type DeepRequireReadonly<T> = T extends Record<string, unknown>
    ? { +readonly [K in keyof T]-?: DeepReadonly<T[K]> }
    : T;

const user2: DeepRequireReadonly<IUser> = {
    name: 'Sasha',
    age: 20,
    courses: {
        courseName: 'TypeScript',
        grades: [1, 2, 3, 4],
    }
}

type UpperCaseKeys<T> = { 
    [K in keyof T as Uppercase<K & string>]: T[K];
} 


declare const user3: UpperCaseKeys<IUser>;


type ObjectToPropertyDescriptor<T> = {
    [K in keyof T]: TypedPropertyDescriptor<T[K]>;
}

declare const user4: ObjectToPropertyDescriptor<IUser>;
