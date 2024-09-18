/*
 * 本例以在 TypeScript 中使用 crypto-js 为例

 * crypto-js 是一个纯 js 项目，是不能直接在 typescript 中使用的，需要相应的 .d.ts 声明文件
 * 比如 aes.js 要有一个对应的 aes.d.ts 声明文件，其用于为 TypeScript 提供类型声明
 * 
 * 安装 crypto-js 及其声明文件的命令为如下
 * npm install crypto-js @types/crypto-js
 * 如果你已经有 package.json 和 package-lock.json 了，则执行如下命令即可
 * npm i（npm install）
 */

import * as CryptoJS from 'crypto-js';

const message = 'abc';
const secretKey = '0123456789';

const encrypted = CryptoJS.AES.encrypt(message, secretKey).toString();
console.log('encrypted: ', encrypted);

const bytes = CryptoJS.AES.decrypt(encrypted, secretKey);
const decrypted = bytes.toString(CryptoJS.enc.Utf8);
console.log('decrypted: ', decrypted);