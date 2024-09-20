{
    // 接口用于定义对象的形状，这个是 TypeScript 的功能（JavaScript 中没有）
    interface Person {
        readonly id: number; // 只读属性
        name: string;
        age: number;
        hello(name: string): string; // 方法
    };
    
    // 变量的形状必须和接口的形状保持一致（也就是说属性名和类型必须与接口一样，且每个属性都必须要定义，且不能定义接口未定义的属性）
    let webabcd: Person = {
        id: 1234,
        name: 'webabcd',
        age: 44,
        hello(name: string): string {
            return 'hello: '+ name;
        }
    };

    webabcd.name = 'wanglei';
    console.log(webabcd, webabcd.hello('xxx')); // {id: 1234, name: 'wanglei', age: 44, hello: ƒ} hello: xxx
}

{
    interface Person {
        name: string;
        age?: number; // 通过 ? 定义可选属性
    };
    
    // 变量的形状必须和接口的形状保持一致，且可选属性可以不定义
    let webabcd1: Person = {
        name: 'webabcd',
    };
    let webabcd2: Person = {
        name: 'webabcd',
        age: 44
    };
}

{
    interface Person {
        name: string;
        [propName: string]: string | number; // 允许定义任意属性，并指定允许的属性的类型（注：接口中已定义的属性的类型也必须要符合此处指定的类型）
    };
    
    // 变量的形状必须和接口的形状保持一致，且可以新增其他任意属性（注：新增的属性的类型必须是接口中定义的类型）
    let webabcd: Person = {
        name: 'webabcd',
        age: 44,
        gender: 'male',
    };
}

{
    // 通过接口定义数组
    interface NumberArray {
        [index: number]: number;
    }
    let a: NumberArray = [1, 2, 3];    
    console.log(a); // [1, 2, 3]
}