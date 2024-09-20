/**
 * 本例用于演示 import, export
 */

// 从指定的模块中导入指定的被 export 的变量或函数或对象
import { name, hello } from './a';
// 从指定的模块中导入指定的被 export 的变量或函数或对象
import { name_b, hello_b } from './b';
// 从指定的模块中导入指定的被 export 的变量或函数或对象（并重命名）
import { name as name_c, hello as hello_c } from './c';
// 从指定的模块中导入指定的被 export 的变量或函数或对象（并重命名）
import { name as name_d, hello as hello_d } from './d';
// 从指定的模块中导入被 export default 的变量或函数或对象，并为其命名
// 注：对于 export default 导出的对象，在 import 的时候不需要加 {}
import obj_e from './e';
// 从指定的模块中导入被 export default 的变量或函数或对象，并为其命名
// 注：对于 export default 导出的对象，在 import 的时候不需要加 {}
import obj_f from './f';
// 从指定的模块中导入指定的被 export 的变量或函数或对象
import { name as name_g, hello as hello_g }  from './g';
// 从指定的模块中导入被 export 的全部内容
import * as obj_h from './h';

console.log(`a: ${name} ${hello()}`);
console.log(`b: ${name_b} ${hello_b()}`);
console.log(`c: ${name_c} ${hello_c()}`);
console.log(`d: ${name_d} ${hello_d()}`);
console.log(`e: ${obj_e.name} ${obj_e.hello()}`);
console.log(`f: ${obj_f.name} ${obj_f.hello()}`);
console.log(`g: ${name_g} ${hello_g()}`);
console.log(`h: ${obj_h.name} ${obj_h.hello()}`);

// 将 './i' 文件导入并编译
import './i';
