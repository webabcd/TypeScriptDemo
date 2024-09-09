{
    // 简单枚举
    enum Status {ok, error};
    console.log(Status["ok"], Status["error"]); // 0 1
    console.log(Status[0], Status[1]); // ok error
}

{
    // 简单枚举的赋值
    enum Status {ok = 100, error = 200};
    console.log(Status["ok"], Status["error"]); // 100 200
    console.log(Status[100], Status[200]); // ok error
}

{
    // 定义枚举值时可以使用简单的表达式
    enum Status { ok = 1, error = 1 << 2 };
    console.log(Status.ok, Status.error); // 1 4
}

{
    // 常量枚举
    const enum Status { ok, error };
    console.log(Status.ok, Status.error); // 0 1
}

{
    // 常量枚举的赋值
    const enum Status { ok = "ok", error = "error" };
    console.log(Status.ok, Status.error); // ok error
}