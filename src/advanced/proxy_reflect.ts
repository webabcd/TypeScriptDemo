{
    // Proxy - 代理（拦截目标对象的属性操作和函数操作）
    let target = {
        name: 'webabcd',
        age: 40,
        get hello() {
            return this.name + this.age;
        }
    }
    let handler = {
        get: function(target:any, propertyKey:string, receiver:any) { // receiver 就是 Proxy 实例本身
            console.log("get: "+ propertyKey);
            return target[propertyKey];
        },
        set: function(target:any, propertyKey:string, value:any, receiver:any) { // receiver 就是 Proxy 实例本身
            console.log("set: " + propertyKey);
            target[propertyKey] = value;
            return true; // 对于 handler 的 set() 来说，必须要有 return true
        },
        has: function(target:any, propertyKey:string){
            console.log("has: " + propertyKey);
            return propertyKey in target;
        }
        /*
         * 其他可代理的方法如下：
         * construct() - 执行 new Proxy() 时
         * getPrototypeOf() - 执行 Object.getPrototypeOf(proxy) 时
         * setPrototypeOf() - 执行 Object.setPrototypeOf(proxy) 时
         * preventExtensions() - 执行 Object.preventExtensions(proxy) 时
         * isExtensible() - 执行 Object.isExtensible(proxy) 时
         * defineProperty() - 执行 Object.defineProperty(proxy) 时
         * ownKeys() - 执行 Object.getOwnPropertyNames(proxy) 时
         * deleteProperty() - 执行 delete proxy.prop 时
         */
    }
    // Proxy - 让 handler 处理 target 的属性和方法
    let proxy = new Proxy(target, handler);
    proxy.name = "wanglei"; // 会走到 handler 的 set()
    let name = proxy.name; // 会走到 handler 的 get()
    let exists = ("name" in proxy); // 会走到 handler 的 has()


    // 通过 handler 的 apply() 代理函数的调用
    function target2(a:number, b:number) {
        return a + b;
    }
    let handler2 = {
        apply: function(target:any, ctx:any, args:any[]) {
            console.log("apply: " + args.join(","));
            return target(...args);
        }
    };
    let proxy2 = new Proxy(target2, handler2);
    console.log(proxy2(100, 50)); // 150


    // 通过 handler 的 construct() 代理构造函数
    class Target3 {  
        constructor(public a: number, public b: number) {  

        }  
        hello(): number {  
            return this.a + this.b;  
        }  
    }  
    let handler3 = {
        construct(target:any, argArray:any[]) {
            console.log("construct: "+argArray.join(","));
            return new target(...argArray);
        }
    };
    let proxy3 = new Proxy(Target3, handler3);
    console.log(new proxy3(100, 50).hello()); // 150




    // Reflect - 反射
    let target4 = {
        name: 'webabcd',
        age: 40,
        get hello() {
            return this.name + this.age;
        }
    }
    // Reflect.get() - 调用指定对象的指定方法
    console.log(Reflect.get(target4, "hello")); // webabcd40
    // Reflect.get() - 调用指定对象的指定方法（对象中的 this 会指向 Reflect.get() 的第 3 个参数）
    console.log(Reflect.get(target4, "hello", {name: "xyz"})); // xyzundefined
    // Reflect.set() - 设置指定对象的指定属性
    Reflect.set(target4, 'name', "abc");
    // Reflect.get() - 获取指定对象的指定属性
    console.log(Reflect.get(target4, "name")); // abc


    class Target5 {  
        constructor(public a: number, public b: number) {  

        }  
        hello(p:string): string {  
            return `${p} ${this.a + this.b}`;
        }  
    }  
    // Reflect.apply() - 调用指定的函数
    //     第 1 个参数：目标函数
    //     第 2 个参数：目标函数的 this 指向的对象
    //     第 3 个参数：传入目标函数的参数列表
    let t5 = new Target5(1, 2);
    console.log(Reflect.apply(t5.hello, {a:100, b:200}, ['xxx'])); // xxx 300
    

    class Target6 {  
        constructor(public a: number, public b: number) {  

        }  
        hello(): number {  
            return this.a + this.b;  
        }  
    }  
    // Reflect.construct() - 调用构造函数并传参
    let t6 = Reflect.construct(Target6, [100, 200]);
    console.log(t6.hello()); // 300


    /*
     * 关于 Reflect 除了上面说的，还有如下：
     * 注：这些都可以在 Object 中找到相同的用法，可以参见 class/prototype.js 中的关于 Object 的相关说明以及 basic/object.js 中的关于 Object 的相关的说明
     * defineProperty() - 类似 Object.defineProperty()
     * deleteProperty() - 类似 delete obj.prop
     * getPrototypeOf() - 类似 Object.getPrototypeOf()
     * setPrototypeOf() - 类似 Object.setPrototypeOf()
     * preventExtensions() - 类似 Object.preventExtensions()
     * isExtensible() - 类似 Object.isExtensible()
     * ownKeys() - 类似 Object.getOwnPropertyNames()
     *
     * 注：能用 Reflect 的方法就用 Reflect 的，而不要再用 Object 的了
     */




    // 通过 Proxy 和 Reflect 实现察者模式
    let myObj = {
        name: 'webabcd'
    }
    let myHandler = {
        set: function(target:any, propertyKey:string, value:string, receiver:any) {
            const result = Reflect.set(target, propertyKey, value, receiver);
            observerList.forEach(observer => observer(propertyKey, value));
            return result;
        }
    }
    const observerList: Function[] = [];
    const observer = (fn:Function) => observerList.push(fn);
    const observable = (obj:any) => new Proxy(obj, myHandler);

    // 指定观察者
    observer((propertyKey:string, value:string) => {
        console.log(`我是观察者 1，发现 myObj 的 ${propertyKey} 的值变为了 ${value}`);
    });
    observer((propertyKey:string, value:string) => {
        console.log(`我是观察者 2，发现 myObj 的 ${propertyKey} 的值变为了 ${value}`);
    });

    // 指定可被观察的对象，属性发生变化时通知所有观察者
    let observableObj = observable(myObj);
    observableObj.name = "wanglei";
}


// Record - 让对象支持通过 .key 获取 value
{
    let a = {
        width: 100,
        height: 200,
    };
    
    let b = a as Object as Record<string, number>
    console.log(`${b.width}, ${b.height}, ${b.xxx}`); // 100, 200, undefined
}
  
  
// Partial - 实例化时允许只初始化接口的部分属性
{
    interface Person {
        name: string;
        age: number;
    }
    let a: Partial<Person> = {
        // 可以只初始化部分属性，或者所有属性都不初始化
        name: "webabcd",
    };
    
    console.log(`name:${a.name}, age:${a.age}`); // name:webabcd, age:undefined
    a.age = 44
    console.log(`name:${a.name}, age:${a.age}`); // name:webabcd, age:44
}