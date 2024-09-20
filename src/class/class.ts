{
    class Person {
        // 注：类的属性和方法支持 3 种访问修饰符，分别是 private, protected, public（默认都是 public 的）

        // 属性（不用初始化），注意此处 ? 的用法
        age?:number;
        // 属性（声明时初始化）
        weight:number = 0;
        // 属性（在构造函数中初始化）
        name;
        // 只读属性（在构造函数中初始化）
        readonly id;
        // 构造函数
        // 注：其中的 public gender:string 会自动生成一个名为 gender 的属性，并需要在构造函数中初始化，如果不想在构造函数中初始化，则可以用 public gender?:string
        constructor(name:string, id:number, public gender:string) {
            this.name = name;
            this.id = id;
        }
        // 方法
        hello() {
            return `id:${this.id} name:${this.name}`;
        }

        // 属性的 getter 和 setter
        private _description:string = "";
        get description():string {
            return this._description;
        }
        set description(value:string) {
            this._description = value;
        }

        // 静态属性
        static num = 1314;

        // 静态方法
        static hello(name:string) {
            return `hello: ${name}`
        }
    }
    
    let a = new Person('webabcd', 123, "male");
    a.weight = 50;
    console.log(a.hello(), `gender:${a.gender}`, `weight:${a.weight}`); // id:123 name:webabcd gender:male weight:50

    console.log(a.age); // undefined
    // 注意此处 ! 的用法，如果不加 ! 的话会编译报错的
    console.log(a.age! * 2); // NaN
    a.age = 44;
    console.log(a.age); // 44
    // 注意此处 ! 的用法，如果不加 ! 的话会编译报错的
    console.log(a.age! * 2); // 88

    a.description = "I am wanglei.";
    console.log(a.description); // I am wanglei.

    console.log(Person.num); // 1314

    console.log(Person.hello("webabcd")); // hello: webabcd
}

{
    // 抽象类不允许被实例化
    abstract class Animal {
        public constructor(public name:string) {
          this.name = name;
        }
        public abstract hello():string;
        // 抽象类可以定义有具体逻辑的方法
        public walk():string {
            return `walk: ${this.name}`;
        }
    }

    class Dog extends Animal {
        // 必须要实现父抽象类的抽象方法
        public hello() {
            return `hello: ${this.name}`;
        }
        public run():string {
            return `run: ${this.name}`;
        }
    }
 
    // 注：一个类只能继承自另一个类，但是可以继承自多个接口
    class BigDog extends Dog {
        // 重写父类的方法
        public run():string {
            return `runrunrun: ${this.name}`;
        }
    }

    let dog:Dog = new Dog("collie");
    console.log(dog.hello(), dog.walk(), dog.run()); // hello: collie walk: collie run: collie

    let bigDog:BigDog = new BigDog("collie");
    console.log(bigDog.run()); // runrunrun: collie
}

{
    // 接口用于定义对象的形状
    
    interface Interface1 {
        hello1(): void;
    }
    interface Interface2 {
        hello2(): void;
    }
    // 接口可以继承多个接口
    interface Interface3 extends Interface1, Interface2 {
        hello3(): void;
    }
    class Class0 {
        hello0() {
            console.log('xxx');
        }
    }
    // 接口可以继承类（注意：接口继承类时，类的方法会变成抽象方法，必须在子类中实现）
    interface Interface4 extends Class0 {
        hello4(): void;
    }
    
    // 类可以实现多个接口
    class MyClass implements Interface3, Interface4 {
        hello0() {
            console.log('hello0');
        }
        hello1() {
            console.log('hello1');
        }
        hello2() {
            console.log('hello2');
        }
        hello3() {
            console.log('hello3');
        }
        hello4() {
            console.log('hello4');
        }
    }
    
    let a = new MyClass();
    a.hello0();
    a.hello1();
    a.hello2();
    a.hello3();
    a.hello4();
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
            // 通过 as 将基类对象转换为子类对象
            let dog = animal as Dog;
            dog.run();
        }
    }
    f1(new Dog("dog"));
}