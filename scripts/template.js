/*
 * @Description: 页面快速生成脚本
 * @Date: 2023-05-26 10:26:23
 * @auth xiaolin
 */

const fs = require('fs');
const path = require('path');
const basePath = path.resolve(__dirname, '../src');

const fileName = process.argv[2];

if (!fileName) {
  console.log('文件名称不能为空！');
  console.log('示例：npm run tem ${fileName}');
  process.exit(0);
}


let caseFileName = fileName.toLowerCase()

/**
 * @msg: vue页面模版
 */
const VueTep = `
<template>
<div :class="ns.b()">
  
</div>
</template>

<script lang="ts">
import { ref } from 'vue';
import createComponent from '../../../utils/create';
import { useNamespace } from '../../../hooks';
const { create } = createComponent('${fileName}');

export default create({
setup(props, { emit }) {
  const ns = useNamespace('${caseFileName}');

  return {
    ns
  };
}
});
</script>

`;

const docTep = `
  ## ${fileName}
`
const indexTep = `
import { default as ${fileName} } from './src/${caseFileName}.vue'

export {
    ${fileName}
}
`

fs.readdir(`${basePath}/packages/components/${caseFileName}`, function (err, file) {
  if (err) {
    fs.mkdirSync(`${basePath}/packages/components/${caseFileName}`); // mkdir
    fs.mkdirSync(`${basePath}/packages/components/${caseFileName}/docs`); // mkdir
    fs.mkdirSync(`${basePath}/packages/components/${caseFileName}/style`); // mkdir
    fs.mkdirSync(`${basePath}/packages/components/${caseFileName}/src`); // mkdir
  }
  process.chdir(`${basePath}/packages/components/${caseFileName}/docs`); // cd docs
  fs.writeFileSync(`doc.md`, docTep); // save doc
  process.chdir(`${basePath}/packages/components/${caseFileName}/style`); // cd style
  fs.writeFileSync(`${caseFileName}.scss`, ''); // save scss 文件
  process.chdir(`${basePath}/packages/components/${caseFileName}/src`); // cd components
  fs.writeFileSync(`${caseFileName}.vue`, VueTep); // save scss 文件
  process.chdir(`${basePath}/packages/components/${caseFileName}`); // cd components
  fs.writeFileSync(`index.ts`, indexTep); // 导出组件
  process.exit(0);
});
