{
    /**
     * iterator - 迭代器（可迭代对象有 Array, TypedArray, Map, Set, String）
     *   next() - 迭代到下一个位置
     *     value - 当前位置的对象
     *     done - 当前位置是否是结尾
     *       true 代表结尾，也就是说，可迭代对象的最后一个元素的 done 仍然为 false，再之后才是 true
     */

    const a = ["a", "b", "c"];
    // [Symbol.iterator]() - 获取可迭代对象的迭代器
    const b = a[Symbol.iterator]();
    console.log(b.next(), b.next(), b.next(), b.next());
    // {value: "a", done: false} {value: "b", done: false} {value: "c", done: false} {value: undefined, done: true}


    // 通过 for...of 语句迭代可迭代对象（es6 中新增的方式）
    let c = ["a", "b", "c"];
    for (let item of c) {
        console.log(item);
    }
    // a
    // b
    // c


    // 用其他方式遍历（es5 中就有的方式）
    for (let i = 0; i < c.length; i++) { // for 语句
        console.log(c[i]);
    }
    // a
    // b
    // c
    for (let index in c) { // for...in 语句
        console.log(index, c[index]);
    }
    // 0 a
    // 1 b
    // 2 c
    c.forEach(item => { // forEach 语句
        console.log(item);
    });
    // a
    // b
    // c




    /**
     * Generator - 自定义可迭代对象，即可以支持 iterator 的对象
     *   通过 function* 定义生成器函数（generator function）
     *   每 next() 一下得到的是 generator function 的下一个 yield 的值
     *   yield 的返回值是此 yield 之后再次 next() 传进来的值
     *   如果 next() 后遇到了 return 则迭代结束，返回的 value 是 return 的值，得到的 done 为 true
     */
    function* generator() {
        yield 1;
        yield 2;
        return 3
    }
    let g = generator();
    console.log(g.next(), g.next(), g.next());
    // {value: 1, done: false} {value: 2, done: false} {value: 3, done: true}


    // 通过 yield* 在一个 function* 内调用另一个 function*
    function* generator_b() {
        yield 2;
        yield 3;
    }
    function* generator_a() {
        yield 1;
        yield* generator_b();
        return 4;
    }
    let ga = generator_a();
    console.log(ga.next(), ga.next(), ga.next(), ga.next());
    // {value: 1, done: false} {value: 2, done: false} {value: 3, done: false} {value: 4, done: true}


    // 以下为 generator 和 iterator 的应用：通过 generator 将一个对象变为支持 iterator 的对象
    function* objectEntries(obj:any) {
        const propKeys = Reflect.ownKeys(obj);
        for (const propKey of propKeys) {
            yield [propKey, obj[propKey]];
        }
    }
    let obj = { name: "webabcd", age: 40 };
    for (const [key,value] of objectEntries(obj)) {
        console.log(`${key}: ${value}`);
    }
    // name: webabcd
    // age: 40
}