/* eslint-disable @typescript-eslint/no-var-requires */
const package = require('../package.json');
const fs = require('fs-extra');
/* eslint-disable @typescript-eslint/no-var-requires */
const { readdirSync, promises } = require('fs');
const lineReader = require('line-reader');
const { resolve, join, basename } = require('path');
const COMPONENT_ROOT = resolve(__dirname, '../src/packages/components/');
const fg = require('fast-glob');

const package_dir = '../src/packages/components/';

// 排除遍历目录
const ignoreDirs = ['README.md', '.DS_Store'];

let IMPORT_STR = ``;
let COMPONENT_PACKAGES = [];
let COMPONENT_LIST = `{
`;
let PLUGIN_STR = ``;
let PLUGIN_PACKAGES = [];
let PLUGIN_LIST = `{
`;

let STYLE_IMPORT_STR = ``;
let STYLE_IMPORT_LIST = `{
`;

let EXPORT_NAME = ``;
let EXPORT_IMPOR = ``;


let EXPORT_DESIGN = []
let EXPORT_DESIGN_COMPONENT_LIST =  {};


/**
 * 是文件
 * @param filePath 文件路径
 * @returns {Promise<boolean>} true:是;false:不是或不存在
 */
const isFile = async (filePath) =>
  await promises
    .stat(filePath)
    .then((stat) => stat.isFile())
    .catch((_) => false);

/**
 * @param {*} folders
 * @param {*} index
 * @param {*} comList
 */
const loadComponent = async (folders, index, comList = []) => {
  const filePath = `${package_dir}${folders[index]}/index.ts`;
  const isExis = await isFile(resolve(__dirname, `${filePath}`));
  if (!folders[index]) {
    return henerateFile();
  }
  if (!isExis) {
    return loadComponent(folders, index + 1, []);
  }
  const data = await lineReader.eachLine(resolve(__dirname, `${filePath}`), async (line, isLast, cb) => {
    // 校验是否包含通用导出标识 export {} from
    line = line.replace(/\s/g, '');
    line = line.replace(/'/g, '"');
    line = line.replace(/;/g, '');
    const isExportAll = line.includes('export{defaultas'); // export { default as xxx} 组件
    const isExportDefault = line.includes('exportdefault'); // 是否是 export default xxx  插件
    const isNotes = line.includes('//'); // 注释行
    const isExportEnd = line.includes('exportend');
    if (!isExportEnd) {
      if (!isNotes && isExportAll) {
        `${line}`.replace(/\{([^\}]+)\}(.*)/g, ($1, $2, $3, $4) => {
          // 获取组件名称
          const name = ($2.split('defaultas')[1] || '').trim();
          // console.log(name);
          comList.push(name);
          if (EXPORT_DESIGN) {
            EXPORT_DESIGN.push(`"${name}"`)
          }
          
          // EXPORT_NAME += `export ${name};\n`;
          `${$3}`.replace(/\".([^\"]+)\"(.*)/g, ($11, $22, $33, $44) => {
            // 获取组件路径
            COMPONENT_LIST += ` ${name}: 'components/${folders[index]}${$22}',\n`;
          });
        });
      } else if (!isNotes && isExportDefault) {
        const name = (line.split('exportdefault')[1] || '').trim();
        PLUGIN_STR += `import { ${name} } from '../components/${folders[index]}';\n`;
        PLUGIN_PACKAGES.push(name);
        PLUGIN_LIST += `${name}: 'components/${folders[index]}',\n`;
      }
    }

    if (!isLast && !isExportEnd) {
      // 判断不是最后一行
      cb();
    } else {
      // 无文件后
      if (comList && comList.length) {
        // 合并入 components.ts 导入
        IMPORT_STR += `import { ${comList.join(',')} } from '../components/${folders[index]}';\n`;
        EXPORT_IMPOR += `export { ${comList.join(',')} } from '../components/${folders[index]}';\n`;
        comList && comList.forEach(item => {
          let obj = {}
          obj.component = `xxxxx/packages/_es/${folders[index]}`
          EXPORT_DESIGN_COMPONENT_LIST[item] = obj
        })
        // 合并入  components.ts  完整导出列表
        COMPONENT_PACKAGES = COMPONENT_PACKAGES.concat(comList);
      }

      // 获取 scss
      try {
        const styles = readdirSync(resolve(__dirname, `${package_dir}${folders[index]}/style`));
        styles.forEach((item) => {
          const stylePath = `components/${folders[index]}/style/${item}`;
          STYLE_IMPORT_STR += `
import '@/packages/${stylePath}';`;
          STYLE_IMPORT_LIST += `"${item.split('.scss')[0]}": "${stylePath}",\n`;
        });
      } catch (error) {}
      if (index + 1 <= folders.length) {
        loadComponent(folders, index + 1, []);
      }
    }
  });
};

/**
 * @description 生成 文件
 */
const henerateFile = () => {
  let componentsFiles = `${IMPORT_STR}

export default [ ${COMPONENT_PACKAGES} ]

`;
  // export const compontentsList = ${COMPONENT_LIST}}

  let pluginFiles = `${PLUGIN_STR}
  
export default [ ${PLUGIN_PACKAGES} ]
`;
  // export const pluginList = ${PLUGIN_LIST}}

  let stylesFiles = `
${STYLE_IMPORT_STR}
`;

  const exportFile = `${EXPORT_IMPOR}
`;
console.log(EXPORT_DESIGN_COMPONENT_LIST)
  const EXPORT_DESIGN_CONTENT = `export const DSSIGN_COMPONENT = ${JSON.stringify(EXPORT_DESIGN_COMPONENT_LIST)} \n export default [\n${EXPORT_DESIGN}\n]`
  // component-design.ts
  fs.outputFile(resolve(__dirname, '../src/packages/main/component-design.ts'), EXPORT_DESIGN_CONTENT, 'utf8', () => {
    console.log(`组件按需 文件写入成功-new`);
  });
  fs.outputFile(resolve(__dirname, '../src/packages/main/component-auto.ts'), exportFile, 'utf8', () => {
    console.log(`组件按需 文件写入成功`);
  });
  
  fs.outputFile(resolve(__dirname, '../src/packages/main/component.ts'), componentsFiles, 'utf8', () => {
    console.log(`组件列表 文件写入成功`);
  });

  fs.outputFile(resolve(__dirname, '../src/packages/main/plugin.ts'), pluginFiles, 'utf8', () => {
    console.log(`组件列表 文件写入成功`);
  });
  fs.outputFile(resolve(__dirname, '../src/packages/main/style.ts'), stylesFiles, 'utf8', () => {
    console.log(`组件样式 文件写入成功`);
  });

  //   let buildStylesFiles = `
  // 'use strict'
  // module.exports =  ${STYLE_IMPORT_LIST}}
  // `;
  //   fs.outputFile(resolve(__dirname, '../src/packages/main/style.ts'), buildStylesFiles, 'utf8', () => {
  //     console.log(`组件样式 文件写入成功`);
  //   });
};

/**
 * 获取组件库文件
 */
const generateComponentsType = async () => {
  let folders = (
    await fg('[^_]*', {
      onlyDirectories: true,
      cwd: COMPONENT_ROOT
    })
  ).filter((fold) => !ignoreDirs.includes(fold));
  folders.sort();
  //   console.log('folders---', JSON.stringify(folders));

  loadComponent(folders, 0);
};

generateComponentsType();
