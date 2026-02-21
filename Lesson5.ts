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

function isCorrectValue(obj: { [key: string]: any }): obj is correctValue {
    return Object.values(obj).every((value) => typeof value === 'number');
}

function foo(obj: { [key: string]: any }): void {
    if(isCorrectValue(obj)) {
        console.log('All values are numabers');
    } else {
        console.log('Incorrect values');
    }
}








