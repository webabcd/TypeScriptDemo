// var 声明的变量是全局作用域，块外也可用
{  
    var a = 10;  
}
console.log(a);

// let 声明的变量是块作用域，仅块内可用
{
    let b = 10;
    console.log(b);
}
// 下面这句会编译时报错 Cannot find name 'b'
// console.log(b); 

// const 常量，块作用域，一旦声明必须初始化，之后不允许修改
{
    const c = 104;
    console.log(c);
}