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

type correctValue = { [key: string]: number };
type value = { [key: string]: any }

function isCorrectValue(obj: value): obj is correctValue {
    return Object.values(obj).every((value) => typeof value === 'number');
}

function foo(obj: value): void {
    if(isCorrectValue(obj)) {
        console.log('All values are numabers');
    } else {
        console.log('Incorrect values');
    }
}








