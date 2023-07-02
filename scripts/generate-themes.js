/* eslint-disable @typescript-eslint/no-var-requires */
const stylesList = require('../src/packages/build-css.json');
const path = require('path');
const fs = require('fs-extra');
let fileStr = `@import '../variables.scss';\n`;
let tasks = [];
console.log('\n  -------- 编译样式表 --------- \n ');

Object.keys(stylesList).forEach((element) => {
  // 创建 组件样式 copy 任务
  const comSrc = `${stylesList[element]}`;
  const orgSrc = `${comSrc}`;
  const libSrc = `${comSrc.replace('components/', '')}`;
  tasks.push(
    fs
      .copy(path.resolve(__dirname, `../src/packages/${orgSrc}`), path.resolve(__dirname, `../libs/packages/${libSrc}`))
      .then(() => {
        fileStr += `@import '../../packages/${libSrc}';\n`;
        // console.log('fileStr----', fileStr);
      })
      .catch(() => {
        // ...
      })
  );
});

/**
 * @description  创建 主题 copy 任务
 */
tasks.push(
  fs.copy(path.resolve(__dirname, '../src/packages/theme-chalk'), path.resolve(__dirname, '../libs/theme-chalk'))
);


/**
 * @description : 生成主题样式
 */
Promise.all(tasks).then(() => {
  fs.outputFile(path.resolve(__dirname, '../libs/theme-chalk/themes/default.scss'), fileStr, 'utf8', () => {
    // logger.success(`文件写入成功`);
  });
  console.log('\n  -------- 编译样式表完成 --------- \n ')
});
