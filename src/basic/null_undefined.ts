{
    console.log(undefined == null, undefined === null); // true false
    console.log(typeof null, typeof undefined); // object undefined
    console.log(Number(null), Number(undefined)); // 0 NaN
    console.log(Boolean(null), Boolean(undefined)); // false false
}

{
    // 变量声明了，但是没有赋值，就是 undefined
    let a
    console.log(a); // undefined

    // 函数没有返回值，其返回的就是 undefined
    let b = () => {

    };
    console.log(b());  // undefined

    // 判断是否是 undefined
    console.log(a == undefined, typeof a == 'undefined');  // true true

    // 注：本例中 a 是 undefined，但是其数据类型是 any（可以赋值为任意基本类型或任意对象）
    a = 10;
    a = "abc";
    a = new Date();
}

{
    // 声明变量时，为其赋值为 null
    let a = null;
    // 值为 null 的变量的数据类型是 object
    console.log(typeof a);  // object

    // 注：本例中 a 是 null，但是其数据类型是 object（可以赋值为任意对象）
    a = new Date();
    a = new Array();
}