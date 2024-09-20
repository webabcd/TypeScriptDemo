{
    // 基础

    // try/catch/finally 的用法
    function f1(str:string) : number | null {
        try {
            let num = Number(str);
            if (isNaN(num)) {
                throw new Error("不是一个有效的数字");
            }
            return num / 5;
        } catch (error) {
            console.error(`catch: ${(error as Error).message}`);
            return null;
        } finally {
            console.log("finally");
        }
    }
    
    console.log(f1("100")); // finally 20
    console.log(f1("abc")); // catch: 不是一个有效的数字 finally null
}

// es2020 新特性
// 支持 ?? 运算符
{
    let value1: string | null = null;
    let value2: string | undefined = undefined;
    let value3: string = 'Hello';
 
    // ?? 用于在变量为 null 或 undefined 时提供默认值
    const result1 = value1 ?? 'Default';
    const result2 = value2 ?? 'Default';
    const result3 = value3 ?? 'Default';

    console.log(result1, result2, result3); // Default Default Hello
}

// es2021 新特性
{
    // ||= 仅当左侧操作数为假值时，才将右侧操作数赋值给左侧操作数
    let a = 10;
    a ||= 5; // 10
    let b = 0;
    b ||= 5; // 5

    // &&= 仅当左侧操作数为真值时，才将右侧操作数赋值给左侧操作数
    let c = 10;
    c &&= 5; // 5
    let d = 0;
    d &&= 5; // 0

    // ??= 仅当左侧操作数为 null 或 undefined 时，才将右侧操作数赋值给左侧操作数
    let e = null;
    e ??= 5; // 5
    let f = undefined;
    f ??= 5; // 5
    let g = 10;
    g ??= 5; // 10

    console.log(a, b, c, d, e, f, g); // 10 5 5 0 5 5 10
}