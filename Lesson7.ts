function filterArray<T>(arr: T[], condition: (item: T) => boolean): T[] {
    const result: T[] = [];

    for (let i = 0; i < arr.length; i++) {
        const currentItem = arr[i];

        if (condition(currentItem)) {
            result.push(currentItem)
        }
    }

    return result;
}

const x1 = filterArray<number>([1, 2, 3, 4, 0], (n) => n === 4);

console.log(x1)


class Dictionary<T>{
    public item = new Map<string, T>();

    setItem(key: string, value: T): void {
        this.item.set(key, value);
    }

    hasItem(key: string): boolean {
        return this.item.has(key);
    }

    getItem(key: string): T | undefined {
        return this.item.get(key);
    }
}

const x2 = new Dictionary<number>();
x2.setItem('x1', 23);
console.log(x2)
console.log(x2.hasItem('x1'))
console.log(x2.getItem('x1'))

class Stack<T> {
    public tasks: T[] = [];

    push(item: T): void {
        this.tasks.push(item);
    }

    pop(): T | undefined {
        return this.tasks.pop();
    }

    peak(): T | undefined {
        return this.tasks[this.tasks.length - 1];
    }
}

const b = new Stack<number>();

b.push(1);
b.push(2);
b.push(3);
b.push(4);

console.log(b.peak());
console.log(b.pop());
console.log(b.peak());


