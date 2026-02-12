abstract class Figure {
    protected abstract name: string;
    protected abstract color: string;
    protected abstract formula: string;

    public abstract calculateArea(): number;
    public print(): string {
        return this.formula;
    };
}

class Circle extends Figure {
    protected name: string;
    protected color: string;
    protected radius: number;
    protected diameter: number;
    protected formula: string;

    public calculateArea(): number {
        return Math.PI * (this.radius * this.radius);
    }

    public calculateAreaDiameter(): number {
        return (Math.PI * (this.diameter * this.diameter)) / 4;
    }

    constructor(name: string, color: string, radius: number) {
        super();

        this.name = name;
        this.color = color;
        this.radius = radius;
        this.diameter = this.radius * 2;
        this.formula = `Find area: pi * r^2,  pi * (d^2)/4`;
    }        
}

class Rectangle extends Figure {
    protected name: string;
    protected color: string;
    protected width: number;
    protected length: number;
    protected formula: string;

    public calculateArea(): number {
        return this.length * this.width;
    }

    constructor(name: string, color: string, width: number, length: number) {
        super();

        this.name = name;
        this.color = color;
        this.width = width;
        this.length = length;
        this.formula = `Find area: a * b`;
    }
}

class Square extends Figure{
    protected name: string;
    protected color: string;
    protected sideA: number;
    protected formula: string;

    public calculateArea(): number {
        return this.sideA * this.sideA;
    }

    constructor(name: string, color: string, sideA: number) {
        super();

        this.name = name;
        this.color = color;
        this.sideA = sideA;
        this.formula = `Find area: a^2`;
    }
}

class Triangle extends Figure{
    protected name: string;
    protected color: string;
    protected height: number;
    protected sideA: number;
    protected sideB: number;
    protected sideC: number;
    protected perimeter: number;
    protected halfPerimeter: number;
    protected formula: string;

    public calculateArea(): number {
        return (this.sideA * this.height) / 2;
    }

    public calculateAreaHeron(): number {
        return Math.sqrt(this.halfPerimeter * (this.halfPerimeter - this.sideA) * (this.halfPerimeter - this.sideB)
         * (this.halfPerimeter - this.sideC));
    }

    constructor(name: string, color: string, height: number, sideA: number, sideB: number, sideC: number) {
        super();

        this.name = name;
        this.color = color;
        this.height = height;
        this.sideA = sideA;
        this.sideB = sideB;
        this.sideC = sideC;
        this.perimeter = this.sideA + this.sideB + this.sideC;
        this.halfPerimeter = this.perimeter / 2;
        this.formula = `Find area: (a * h)/2,  sqrt(p*(p-a)*(p-b)*(p-c))`;
    }
}

const x1 = new Circle('Сircle', 'Blue', 20);

console.log(x1);
console.log(x1.print());
console.log(x1.calculateArea().toFixed(1));
console.log(x1.calculateAreaDiameter().toFixed(1));

const x2 = new Rectangle('Rectangle', 'Green', 20, 40);

console.log(x2);
console.log(x2.print());
console.log(x2.calculateArea());

const x3 = new Triangle('Triangle', 'Red', 4, 10, 8, 3);

console.log(x3);
console.log(x3.print());
console.log(x3.calculateArea().toFixed(1));
console.log(x3.calculateAreaHeron().toFixed(1));

const x4 = new Square('Square', 'Black', 5);

console.log(x4);
console.log(x4.print());
console.log(x4.calculateArea());