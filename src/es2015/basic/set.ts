{
    // set 是一个集合，先进先出，不会插入重复数据，数据支持类型的多样性
    // 常规操作有 add(), delete(), has(), clear(), size 等
    let mySet = new Set();


    mySet.add(1);
    mySet.add(2);
    mySet.add("webabcd"); // 数据支持类型的多样性
    mySet.add(2); // 不会插入重复数据


    // 遍历
    for (let value of mySet) {
        console.log(value);
    }
    // 遍历
    mySet.forEach(function(value) {
        console.log(value);
    });


    // set 对象转数组
    console.log(mySet); // {1, 2, webabcd}
    console.log([...mySet]); // [1, 2, 'webabcd']


    // 实例化 set 对象时，初始化其数据集合
    console.log(new Set(["1", "2", "3"])); // {1, 2, 3}


    // string 转 set
    console.log(new Set("webabcd")); // {"w", "e", "b", "a", "b", "c", "d"}


    // set 可以给数组排重
    console.log(new Set([3, 1, 2, 3, 2])); // {3, 1, 2}


    let a = new Set([1, 2, 3]);
    let b = new Set([4, 3, 2]);
    // set 可以合并，结果排重
    console.log(new Set([...a, ...b])); // {1, 2, 3, 4}
    // set 可以合并，结果取交集（通过 array 的 filter 实现）
    console.log(new Set([...a].filter(p => b.has(p)))); // {2, 3}
}