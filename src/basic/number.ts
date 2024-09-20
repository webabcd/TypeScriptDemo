{
    // 将指定类型的数据转换为 number 类型
    console.log(Number("100"), Number(true), Number({}), Number([])); // 100 1 NaN 0

    // 将数字格式化为字符串
    console.log(1234.56789.toString()); // 1234.56789
    console.log((32).toString(16)); // 20
    console.log(1234.56789.toFixed(2)); // 1234.57
    function formatWithCommas(num: number): string {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    console.log(formatWithCommas(123456789)); // 123,456,789

    // 二进制
    console.log(0b10); // 2
    // 八进制
    console.log(0o10); // 8
    // 十六进制
    console.log(0x10); // 16

    // 表示 1 与大于 1 的最小浮点数之间的差（大于 0 的最小浮点数）
    console.log(Number.EPSILON); // 2.220446049250313e-16
    // 大于 0 的最小数
    console.log(Number.MIN_VALUE); // 5e-324
    // 最大数
    console.log(Number.MAX_VALUE); // 1.7976931348623157e+308
    // 精确的最小整数（非科学计数法）
    console.log(Number.MIN_SAFE_INTEGER); // -9007199254740991
    // 精确的最大整数（非科学计数法）
    console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991
    // 无限小
    console.log(Number.NEGATIVE_INFINITY); // -Infinity
    // 无限大
    console.log(Number.POSITIVE_INFINITY); // Infinity

    // 判断一个数是否是有限的
    console.log(Number.isFinite(1)); // true
    console.log(Number.isFinite(0.1)); // true
    console.log(Number.isFinite(NaN)); // false
    console.log(Number.isFinite(Infinity)); // false
    console.log(Number.isFinite(-Infinity)); // false

    // 判断一个数据是否是 NaN（not a number）
    console.log(Number.isNaN(NaN)); // true
    console.log(Number.isNaN(100));; // false
    console.log(Number.isNaN("abc")); // false

    // 字符串转数字
    console.log(Number.parseInt("100")); // 100
    console.log(Number.parseInt("100", 10)); // 100
    console.log(Number.parseInt("100", 16)); // 256
    console.log(Number.parseFloat("123.123")); // 123.123

    // 判断一个数是否是整数
    console.log(Number.isInteger(123)); // true
    // 判断一个数是否是精确整数（非科学计数法）
    console.log(Number.isSafeInteger(123)); // true

    // 取整
    console.log(Math.trunc(11.7)); // 11
    console.log(Math.trunc(-11.7)); // -11
    console.log(Math.trunc(-0.3)); // -0（注意：0 也是带符号的）

    // 向上取整
    console.log(Math.ceil(11.7)); // 12
    console.log(Math.ceil(-11.7)); // -11

    // 向下取整
    console.log(Math.floor(11.7)); // 11
    console.log(Math.floor(-11.7)); // -12
}

// es2016 新特性
{
    // 幂运算符 **
    // 下面的例子用于计算 2 的 10 次方
    console.log(2 ** 10) // 1024
}

// es2021 新特性
{
    // 支持 _ 数字分隔符，以便提高可读性
    let billion = 1_000_000_000; // 十进制
    let hex = 0x123_abc; // 十六进制
    let binary = 0b1010_0001; // 二进制
}