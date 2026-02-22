function filterArray<T>(arr: T[], condition: (item: T) => boolean): T[] {
    return arr.filter(condition);
}

const x1 = filterArray([1, 2, 3, 4, 0], (n) => n === 4);

console.log(x1)


type validItem<T> = {
    [key: string]: T;
} 

class Dictionary<T>{
    public item: validItem<T> = {};

    setItem(key: string, value: T): void {
        this.item[key] = value;
    }

    hasItem(key: string): boolean {
        return key in this.item;
    }

    getItem(key: string): T {
        return this.item[key]
    }
}

const x2 = new Dictionary<number>();
x2.setItem('x1', 23);
console.log(x2)
console.log(x2.hasItem('x1'))
console.log(x2.getItem('x1'))