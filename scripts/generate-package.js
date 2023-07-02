/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const fs = require('fs-extra');
console.log('\n  -------- 创建 package.json 任务 --------- \n ');

/**
 * @description  创建 package.json 任务
 */
fs.copy(
  path.resolve(__dirname, '../src/packages/main/package.json'),
  path.resolve(__dirname, '../libs/package.json')
);
