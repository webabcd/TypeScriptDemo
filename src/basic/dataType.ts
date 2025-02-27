{
    // 基本数据类型 boolean, number, string, symbol
    let a: boolean = true;
    let b: number = 10;
    let c: string = "abc";
    let d: symbol = Symbol();

    // 对象数据类型，即通过 new 出来的对象
    let e: Date = new Date();

    // 定义为 Object 类型，则可以赋值为任意基本类型或任意对象（不可以赋值为 null 和 undefined）
    let f1: Object = new Date();

    // 定义为 object 类型，则可以赋值为任意对象（不可以赋值为基本数据类型，以及 null 和 undefined）
    let f2: object = new Date();

    // 定义为 any 类型，则可以赋值为任意基本类型或任意对象
    let g: any = "xyz";
    g = new Date();

    // 定义为 unknown 类型，则可以赋值为任意基本类型或任意对象
    let h: unknown = "xyz";
    h = new Date();

    // any 和 unknown 的区别
    // console.log(g.toUpperCase()); // 运行时报错（any 不做类型检查，所以编译时不会报错）
    // console.log(h.toUpperCase()); // 编译时报错（unknown 做类型检查，所以编译时会报错）

    // 通过 typeof 或 as 后才能调用 unknown 的属性或方法
    let i: unknown = "abc";
    if (typeof i === "string") {
        console.log(i.toUpperCase()); // ABC
    }
    let j = i as string;
    console.log(j.toUpperCase()); // ABC
}

{
    // 定义变量的时候如果没有指定数据类型，但是赋值了，则 TypeScript 会自动推导出变量的数据类型
    let a = 10;
    console.log(typeof a); // number

    // 定义变量的时候如果没有指定数据类型，也没有赋值，则 TypeScript 会认为变量的数据类型是 any
    let b;
    console.log(typeof b); // undefined
    b = 10;
    console.log(typeof b); // number
    b = "abc";
    console.log(typeof b); // string
}

{
    let a = 10;
    let b = new Date()

    // 通过 typeof 判断数据类型，可以判断基本类型
    console.log(typeof a == 'number'); // true

    // 通过 typeof 判断数据类型，如果是对象类型，则获取到的一律是 object，无法获取到具体的对象类型
    console.log(typeof b == 'object'); // true

    // 通过 typeof 也可以判断是否是 function
    console.log(typeof b.getDate == 'function'); // true

    // 如果是对象类型，则需要通过 instanceof 判断具体的对象类型
    console.log(b instanceof Date); // true
}

{
    // 联合类型，可以定义变量为多个数据类型中的一个
    let a: number | string;
    a = 10;
    console.log(typeof a); // number
    a = "abc";
    console.log(typeof a); // string
}

{
    // 注：请注意区分类似如下的情况
    // 比如 new Number() 和 Number(), 前者是是一个类的构造函数用于实例化对象，后者是全局函数返回的是一个基本类型
    let a = new Number("10");
    let b = Number("10");
    console.log(typeof a, typeof b); // object number
}

{
    // 通过 interface 声明一个自定义的数据类型
    interface MyInterface {
        key: string;
        value: string;
    }
    let a: MyInterface = {key: "key", value: "value"};
    console.log(a.key, a.value); // key value
    
    // 也可以这么声明自定义的数据类型
    let b: {key: string, value: string} = {key: "key", value: "value"};
    console.log(b.key, b.value); // key value
}

{
    // 支持隐式转换
    let a: number = 100;
    let b = a + "abc" 
    console.log(b); // 100abc

    // if 会将 0, "", null, undefined, NaN 隐式地转换为布尔值 false
    if (!0 && !"" && !null && !undefined && !NaN) {
        console.log("if 条件的隐式转换");
    }
}

{
    // 通过 type 指定类型别名
    type Name = string;
    type NameMethod = () => string;
    type NameOrMethod = Name | NameMethod;
    function getName(p: NameOrMethod): Name {
        if (typeof p === 'string') {
            return p;
        } else {
            return p();
        }
    }

    console.log(getName("webabcd")); // webabcd
    console.log(getName(() => "webabcd")); // webabcd
}

{
    class Animal {
        constructor(public name: string) { 
        }
    }
    class Dog extends Animal {
        run() {
            console.log("run");
        }
    }

    function f1(animal: Animal)
    {
        // 通过 instanceof 判断一个基类对象是否是某个子类对象
        if (animal instanceof Dog) 
        {
            // 通过 as 将基类对象转换为子类对象（这里的 as 被称为类型断言 Type Assertions）
            let dog = animal as Dog;
            dog.run();
        }
    }
    f1(new Dog("dog"));
}