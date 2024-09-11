{
    /**
     * Promise - 用于异步编程（非多线程）
     *   有 3 种状态： pending（进行中），fulfilled（已成功），rejected（已失败）
     *   状态只能从 pending 变为 fulfilled 或者从 pending 变为 rejected，且变成 fulfilled 或 rejected 之后这个 Promise 对象就不能再变了
     */

    const promise = new Promise((resolve, reject) => {
        let success = new Date().getTime() % 2 == 0;
        if (success) {
            // 从 pending 变为 fulfilled
            resolve("pending to fulfilled");
        } else {
            // 从 pending 变为 rejected
            reject("pending to rejected");
        }

        // 状态变为 fulfilled 或 rejected 之后就不能再变了，所以下面这两句都是没用的
        resolve("aaaaaaaaaa");
        reject("bbbbbbbbbb");
    });

    // then() - promise 的状态变为 fulfilled 或 rejected 之后的回调
    //   第 1 个参数指定的函数用于接收 fulfilled 状态的回调
    //   第 2 个参数指定的函数用于接收 rejected 状态的回调
    promise.then(function(value) {
        console.log('a:' + value) // a:pending to fulfilled
    }, function(error) {
        console.log('b:' + error) // b:pending to rejected
    });
    // 返回结果为 fulfilled 或 rejected

    // 如果有多个 then() 则都会收到回调
    // 如果 then() 的时候，promise 没有完成，则在 promise 完成的时候会收到回调
    // 如果在 then() 之前 promise 就完成了，则 then() 的时候马上会收到回调
    promise.then(function(value) {
        console.log('c:' + value) // c:pending to fulfilled
    }, function(error) {
        console.log('d:' + error) // d:pending to rejected
    });
    // 返回结果为 fulfilled 或 rejected


    // Promise.resolve() - 将指定的对象转换为 fulfilled 状态的 Promise 对象并返回
    // Promise.resolve("abc") 等价于 new Promise(resolve => resolve('abc'))
    Promise.resolve("abc").then((value) => { console.log(value)} ); // abc
    // Promise.reject() - 将指定的对象转换为 rejected 状态的 Promise 对象并返回
    // Promise.reject('xyz') 等价于 new Promise((resolve, reject) => reject("xyz"))
    Promise.reject('xyz').then(null, (value) => { console.log(value) }); // xyz


    // then() 是支持链式调用的（即每次 then() 都通过返回 Promise 对象来支持链式调用）
    new Promise(resolve => {
        resolve("a");
    }).then(value => {
        console.log(value); // a
        // 因为 then() 返回的是 Promise 对象，如果你 return 一个非 Promise 对象的话，则会自动将其变为 Promise 对象
        // 此例实际返回的是 Promise.resolve("b")
        return "b";
    }).then(value => {
        console.log(value); // b
        return Promise.reject("c");
    }).then(null, value => {
        console.log(value); // c
    });


    // 通过 Promise.all() 并发执行多个 Promise 对象
    const p1 = new Promise((resolve, reject) => {
        console.log('p1 start');
        setTimeout(() => {
            console.log('p1 end');
            resolve("fulfilled 1");
        }, 100);
    });
    const p2 = "fulfilled 2"; // 被 Promise.all() 包装时，会转换为 Promise.resolve("fulfilled 2")
    const p3 = new Promise((resolve, reject) => {
        console.log('p3 start');
        setTimeout(() => {
            console.log('p3 end');
            let success = new Date().getTime() % 2 == 0;
            if (success) {
                resolve("fulfilled 3");
            } else {
                reject("rejected 3");
            }
        }, 100);

    });
    // Promise.all() - 将多个 Promise 对象包装成一个新的 Promise 对象，并返回这个新的 Promise 对象
    // Promise.all() 内的所有 Promise 对象是并行执行的
    // 如果所有 Promise 对象全部变为 fulfilled 状态，则新的 Promise 对象变为 fulfilled 状态，返回结果为一个数组，其按对应的索引位置保存每个 Promise 对象的结果
    // 如果有一个 Promise 对象变为 rejected 状态，则新的 Promise 对象变为 rejected 状态
    Promise.all([p1, p2, p3]).then(values => {
        console.log(values); // ["fulfilled 1", "fulfilled 2", "fulfilled 3"]
    }, error => {
        console.log(error) // rejected 3
    });
    // 返回结果为 ["fulfilled 1", "fulfilled 2", "fulfilled 3"] 或 rejected 3


    const p4 = new Promise((resolve, reject) => {
        setTimeout(() => { resolve("fulfilled 4"); }, 100);
    });
    const p5 = "fulfilled 5"; // 被 Promise.race() 包装时，会转换为 Promise.resolve("fulfilled 5")
    const p6 = Promise.reject("rejected 6");
    // Promise.race() - 将多个 Promise 对象包装成一个新的 Promise 对象，并返回这个新的 Promise 对象
    // Promise.race() 内的所有 Promise 对象是并行执行的
    // 这个新的 Promise 对象返回的状态和值是多个 Promise 对象中最先完成的那个 Promise 的状态和值
    Promise.race([p4, p5, p6]).then(value => {
        console.log(value); // fulfilled 5
    }, error => {
        console.log(error) // rejected 6
    });
    // 返回结果为 fulfilled 5


    const p7 = new Promise((resolve, reject) => {
        let x = new Date().getTime() % 3;
        if (x == 0) {
            resolve("fulfilled 7");
        } else if (x == 1) {
            reject("rejected 7");
        } else if (x == 2) {
            throw "exception 7";
        }
    });
    // catch() - 捕获 Promise 中的 throw 的异常
    p7.then(value => {
        console.log(value) // fulfilled 7
    }, error => {
        console.log(error) // rejected 7
    }).catch(exception => {
        console.log(exception) // exception 7
    });
}