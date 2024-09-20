{
    // Generics - 泛型
    
    // 泛型的简单示例
    function createArray<T>(length: number, value: T): Array<T> {
        let result: T[] = [];
        for (let i = 0; i < length; i++) {
            result[i] = value;
        }
        return result;
    }

    let a = createArray<string>(3, 'x');
    console.log(a); // ['x', 'x', 'x']

    // 可以省略 <string> 因为 TypeScript 可以根据传入的参数推导出类型
    let b = createArray(3, 'x');
    console.log(b); // ['x', 'x', 'x']
}

{
    // 可以定义多个不同的泛型类型
    function swap<T, U>(tuple: [T, U]): [U, T] {
        return [tuple[1], tuple[0]];
    }
    
    let a = swap<number, string>([7, 'seven']);
    console.log(a); // ['seven', 7]

    // 可以省略 <number, string> 因为 TypeScript 可以根据传入的参数推导出类型
    let b = swap([7, 'seven']);
    console.log(b); // ['seven', 7]
}

{
    // 泛型约束，用于约束泛型必须继承自某个类或某些接口

    interface Interface1 {
        name: string;
    }
    interface Interface2 {
        age: number;
    }
    class Class1 implements Interface1, Interface2 {
        constructor(public name: string, public age: number) {
        }
    }

    // 泛型 T 必须继承自 Interface1 和 Interface2
    function hello<T extends Interface1 & Interface2>(p: T): string {
        return `${p.name} ${p.age}`;
    }

    let a = new Class1('webabcd', 44);
    console.log(hello(a)); // webabcd 44
}

{
    // 通过接口定义泛型
    interface CreateArray<T> {
        (length: number, value: T): Array<T>;
    }
    
    let createArray: CreateArray<string> = function<T>(length: number, value: T): Array<T> {
        let result: T[] = [];
        for (let i = 0; i < length; i++) {
            result[i] = value;
        }
        return result;
    }

    let a = createArray(3, 'x');
    console.log(a); // ['x', 'x', 'x']
}

{
    // 泛型类
    class Class1<T> {
        salt?: T;
        add?: (x: T, y: T) => T;
    }
    
    let a = new Class1<number>();
    a.salt = 10;
    a.add = function(x, y) { 
        return (x + y) * this.salt!; 
    };

    console.log(a.add(2, 3)); // 50
}