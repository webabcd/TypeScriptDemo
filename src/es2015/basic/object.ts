{
    // 定义对象时省略属性名
    const name = "webabcd";
    const age = 40;
    const a = {name, age}; // 定义对象时省略属性名（其属性名默认为变量名称）
    const b = {name: name, age: age}; // 这是 es5 写法，等价于上面的
    console.log(`${JSON.stringify(a)}, ${JSON.stringify(b)}`);
    // {"name":"webabcd","age":40}, {"name":"webabcd","age":40}


    // 定义对象的方法时，可以省略 function 关键字或者使用 lambda 表达式
    const c = {
        helloOld:function() { // 这是 es5 写法，等价于下面的
            return "hello";
        },
        helloNew() { // 定义对象的方法时，可以省略 function 关键字
            return "hello";
        },
        helloLambda: () => { // 定义对象的方法时，可以使用 lambda 表达式
            return "hello";
        }
    }
    console.log(`${c.helloOld()}, ${c.helloNew()}, ${c.helloLambda()}`);
    // hello, hello, hello


    // 对象的 getter 和 setter
    const d = {
        _name: "webabcd",
        get name() { // getter 和 setter 的写法
            return this._name;
        },
        set name(val) {
            this._name = val;
        },
    }
    d.name = "wanglei";
    console.log(d.name);
    // wanglei


    // 使用表达式来定义属性名或方法名
    let stringHello = "hello";
    const e = {
        [stringHello + "2"]() { // 使用表达式定义方法名
            return "hello";
        }
    }
    const f = { // 使用表达式定义属性名
        [stringHello + "2"]: "hello"
    };
    console.log(`${e.hello2()}, ${f.hello2}`);
    // hello, hello


    // 合并对象（重名的后面会覆盖前面）
    let o1 = {k1: "aaa", k2: "bbb"};
    let o2 = {k2: "ddd", k4: "eee"};
    let g = {...o1, k3: "ccc", ...o2};
    console.log(`${JSON.stringify(g)}`);
    // {"k1":"aaa","k2":"ddd","k3":"ccc","k4":"eee"}


    // 通过 Object.assign(target, source_1, source_2, ...) 合并对象（重名的后面会覆盖前面）
    // 为指定的类添加指定的方法，请参看 /es6/class/main.js 中的 Object.assign 部分
    let h = {k1: "aaa", k2: "bbb"};
    let o3 = {k3: "ccc"};
    let o4 = {k2: "ddd", k4: "eee"};
    Object.assign(h, o3, o4);
    console.log(`${JSON.stringify(h)}`);
    // {"k1":"aaa","k2":"ddd","k3":"ccc","k4":"eee"}


    // Object.is(value1, value2) 判断两个值是否相等
    console.log(`${Object.is({}, {})}, ${-0 === +0}, ${Object.is(-0, +0)}, ${Object.is(0, 0)}, ${Object.is(NaN, NaN)}`);
    // false, true, false, true, true


    // 定义对象，设置或获取 key/value
    // "xxx" in obj - 判断 obj 里是否有名为 xxx 的 key
    let o5 = {k1: "aaa", k2: "bbb"};
    o5["k1"] = "ddd";
    // Object.defineProperty()/Object.defineProperties() - 扩展对象的属性
    Object.defineProperty(o5, "p1", {
        value: "v1",
        writable: true, // 可写（默认值为 false）
        enumerable: true // 可枚举（默认值为 false）
    });
    Object.defineProperties(o5, {
        'p2': {
            value: "v2",
            writable: true, // 可写（默认值为 false）
            enumerable: false // 可枚举（默认值为 false）
        },
        'p3': {
            value: "v3",
            writable: true, // 可写（默认值为 false）
            enumerable: false // 可枚举（默认值为 false）
        }
    });
    // Object.keys() - 遍历指定对象的 key（只能遍历可枚举的）
    let keys = Object.keys(o5);

    // Object.getOwnPropertyNames() - 遍历对象的属性名（无论是否可枚举，均可遍历）
    let names = Object.getOwnPropertyNames(o5);
    console.log(keys); // ['k1', 'k2', 'p1']
    console.log(names); //  ['k1', 'k2', 'p1', 'p2', 'p3']
    console.log(o5.k1, "k1" in o5, "p9" in o5); // aaa true false


    // 说说 call(), apply(), bind() - 均用于调用的时候修改 this 的指向
    let o6 = {
        name: "webabcd",
        age: 40,
        hello(p1:string, p2:string) {
            console.log(`name:${this.name}, age:${this.age}, p1:${p1}, p2:${p2}`);
        }
    };
    o6.name = "wanglei";
    // hello() 中的 this 指向的是 o6
    o6.hello("a", "b"); // name:wanglei, age:40, p1:a, p2:b
    let o7 = {
        name: "wanglei",
        age: 20,
    };
    // call(thisObj,arg1,arg2,arg3,……) - hello() 中的 this 指向的是 call() 的第 1 个参数
    o6.hello.call(o7, "x", "y"); // name:wanglei, age:20, p1:x, p2:y
    // apply(thisObj,argArr) - hello() 中的 this 指向的是 apply() 的第 1 个参数
    o6.hello.apply(o7, ["x", "y"]); // name:wanglei, age:20, p1:x, p2:y
    // bind(thisObj,arg1,arg2,arg3,……) - hello() 中的 this 指向的是 bind() 的第 1 个参数（bind() 返回的是一个函数，要拿到结果需要再“()”一下，其他与 call() 一样）
    o6.hello.bind(o7, "x", "y")(); // name:wanglei, age:20, p1:x, p2:y


    // preventExtensions() - 禁止指定对象添加新属性
    // Object.preventExtensions(o8);

    // isExtensible() - 是否可为指定对象添加新属性，默认为 true，如果调用了 preventExtensions() 则此值为 false
    // Object.isExtensible(o8);

    // Object.seal() - 先调用 preventExtensions()，再将对象的所有属性标记为 configurable:false
    // Object.seal(o8);

    // Object.freeze() - 先调用 seal()，再将对象的所有属性标记为 writable:false
    // Object.freeze(o8);

    // 注：能用 Reflect 的方法就用 Reflect 的，而不要再用 Object 的了




    // 对象的解构赋值（destructuring）
    // 将值赋给同属性名指向的变量
    let {a: x1, b: x2} = {a: "aaa", b: "bbb"};
    console.log(x1, x2); // aaa bbb
    // 下面这句是简写，写全了就是 let {x3: x3, x4: x4} = {x3: "aaa", x4: "bbb"};
    let {x3, x4} = {x3: "aaa", x4: "bbb"};
    console.log(x3, x4); // aaa bbb
    // 带默认值的
    let {a: x5 = 1, b: x6 = 2} = {a: 3};
    console.log(x5, x6); // 3 2
    // 下面这句是简写，写全了就是 let {x7: x7 = 1, x8: x8 = 2} = {x7: 3};
    let {x7 = 1, x8 = 2} = {x7: 3};
    console.log(x7, x8); // 3 2
    // 未被解构的都放入 ... 标记的变量
    let {y1, y2, ...yyy} = {y5: 5, y1: 1, y2: 2, y3: 3, y4: 4};
    console.log(y1, y2, yyy); // 1 2 {y5: 5, y3: 3, y4: 4}
}