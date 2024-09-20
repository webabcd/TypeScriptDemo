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

/*
// es2020 新特性
// 支持 ?? 运算符（但是我这里测试时会报错，不知道为啥）
{
    let value1: string | null = null;
    let value2: string | undefined = undefined;
    let value3: string = 'Hello';
    
    const result1 = value1 ?? 'Default'; // 'Default'
    const result2 = value2 ?? 'Default'; // 'Default'
    const result3 = value3 ?? 'Default'; // 'Hello'
}
*/