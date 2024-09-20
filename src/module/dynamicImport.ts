/**
 * 本例用于演示模块的动态导入（es2020 新特性）
 */

setTimeout(async () => { 
    // 模块的动态导入
    const a = await import('./a.js');
    console.log(`${a.name} ${a.hello()}`); // name hello
}, 3000);