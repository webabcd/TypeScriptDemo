{
    // 定义函数时要指定参数的类型和返回值的类型，无返回值时可以用 void 表示
    function f1(x:number, y:number):number {
        return x + y;
    }
    function f2(x:string, y:string):void {
        
    }
    // 返回值的类型也可以推导出来
    function f3(x:number, y:number) {
        return x * y
    }


    // 参数默认值
    function a(p1:string, p2:string="webabcd"):string {
        return `${p1} ${p2}`;
    }
    console.log(`${a("hello", "wanglei")}, ${a("hello")}`);
    // hello wanglei, hello webabcd


    // 可选参数
    function b(p1:string, p2?:string):string {
        return `${p1} ${p2}`;
    }
    console.log(`${b("hello", "wanglei")}, ${b("hello")}`);
    // hello wanglei, hello undefined


    // 通过 ... 定义剩余参数，用于接收指定类型的可变数量的参数
    function c(p1:string, ...values:string[]) {
        let result = "";
        for (let i = 0; i < values.length; i++) {
            result += values[i];
        }
        return `${p1} ${result}`;
    }
    console.log(`${c("1", "2", "3", "4", "5")}`);
    // 1 2345
}

{
    // 箭头函数（lambda 表达式）
    let a = ():string => "hello"; // 无参数，通过一行表达式实现返回值
    let b = (p1:string, p2:string):string => `${p1} ${p2}`; // 多个参数，通过一行表达式实现返回值
    let c = (p1:string, p2:string):string => { // 通过多行表达式实现返回值（加上大括号即可）
        let result = `${p1} ${p2}`;
        return result;
    };
    let d = function (p1:string, p2:string):string { // 经典的 function 方式
        let result = `${p1} ${p2}`;
        return result;
    };
    console.log(`${a()}, ${b("hello", "webabcd")}, ${c("hello", "webabcd")}, ${d("hello", "webabcd")}`);
    // hello, hello webabcd, hello webabcd, hello webabcd
}

{
    // 通过函数声明（Function Declaration）的方式定义函数
    function f1(x: number, y: number): number {
        return x + y;
    }

    // 通过函数表达式（Function Expression）的方式定义函数
    let f2 = function (x: number, y: number): number {
        return x + y;
    };

    // 上面的函数 f2 的类型是推导出来的，如果写全的话就像下面这样
    // 这里的 => 不是 es6 中的箭头函数
    // 这里的 => 是用来定义函数类型的，左边是输入类型，需要用括号括起来，右边是输出类型
    let f3: (x: number, y: number) => number = function (x: number, y: number): number {
        return x + y;
    };
}

{
    // 通过接口定义函数的形状
    interface MyInterface {
        (p1: string, p2: string): string;
    }
    let a: MyInterface = function(p1: string, p2: string) {
        return `${p1} ${p2}`;
    }
    console.log(a("hello", "webabcd")); // hello webabcd
}

{
    // es6 是不支持函数重载的
    // typescript 可以通过如下方式支持函数重载
    function myFunc(x: number): number;
    function myFunc(x: string): string;
    function myFunc(x: number | string): number | string | void {
        if (typeof x === 'number') {
            return x * 2;
        } else if (typeof x === 'string') {
            return `hello ${x}`;
        } else {
            // void
        }
    }
    console.log(myFunc(100), myFunc("webabcd")); // 200 hello webabcd
}