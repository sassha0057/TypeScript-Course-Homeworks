interface A {
    [key: string]: number | string;
}

interface B {
    [key: string]: Function;
}

interface C {
    [key: number]: string;
    length: number
}

interface D {
    name: string;
    [key: string]: string;
}

interface E {
    [key: string]: number;
}

interface F extends E{
    age: number;
}

type value = { [key: string]: any }

function isCorrectValue<T>(obj: value, cbFn: (value: any) => value is T): obj is { [key: string]: T } {
    return Object.keys(obj).every((key) => cbFn(obj[key]));
}

const a: value = {
    a: 5,
    b: 's'
}

function valueIsNumber(value: any): value is number {
    return typeof value === 'number';
}

if(isCorrectValue(a, valueIsNumber)) {
    console.log('values are correct')
} else {
    console.log('values arent correct')
}










