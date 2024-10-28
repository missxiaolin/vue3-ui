/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs-extra');
const readline = require('linebyline');
const { resolve, join, basename } = require('path');
const OUTPUT_PATH = join(__dirname, '../src/packages/components.json');
const OUTPUT_CSS_PATH = join(__dirname, '../src/packages/build-css.json');
const fg = require('fast-glob');

const comPath = join(__dirname, '../src/packages/main/component.ts');
const pluginPath = join(__dirname, '../src/packages/main/plugin.ts');
const cssPath = join(__dirname, '../src/packages/main/style.ts');
let input = `{\n`;
let css = `{\n`;

/**
 * js 模块 打包文件写入
 * @param {*} file 
 */
async function loadComponent(file) {
  let rl = readline(file);
  let status = 0;
  
  rl.on('line', function (line, lineCount, byteCount) {
    // console.log('line------>', line)
    line = line.replace(/#.*$/g, '').trim();
    if (line.indexOf('components') != -1) {
      let pattern = /from '(\.\.\/)?([^']+)'/;
      let matched = line.match(pattern);
      if (matched) {
        let matchString = matched[2];
        matchString = matchString.replace(/\.\.\//g, ''); // 移除所有的 "../"
        let arr = matchString.split('/');
        input = input + `"${arr[1]}": "./src/packages/${matchString}",\n`;
      } else {
        // console.log('没有匹配到字符串');
      }
    } else if (line === '];' || line == 'export default [];' || line == 'export default [  ]') {
      // 结束
      if (file.indexOf('src/packages/main/component') !== -1) {
        loadComponent(pluginPath)
      } else {
        input = input + '}';
        fs.outputFile(OUTPUT_PATH, input, 'utf8', () => {
          console.log(`组件列表 文件写入成功`);
        });
      }
    }
  });
}

/**
 * css 打包文件写入
 * @param {*} file 
 */
async function loadCssComponent(file) {
  let rl = readline(file);
  rl.on('line', function (line, lineCount, byteCount) {
    line = line.replace(/#.*$/g, '').trim();
    if (line.indexOf('packages') != -1) {
      let pattern = /'@\/packages\/(.+)';/
      let matched = line.match(pattern);
      if (matched) {
        let matchString = matched[1];
        const regex = /\/([^/]+)\.scss$/;
        let match = matchString.match(regex);
        css = css + `"${match[1]}": "${matchString}",\n`;
      } else {
        // console.log('没有匹配到字符串');
      }
    }
  })
  rl.on("close", function () {
    css = css + '}';
    fs.outputFile(OUTPUT_CSS_PATH, css, 'utf8', () => {
      console.log(`css列表 文件写入成功`);
    });
  })
}

loadComponent(comPath);

loadCssComponent(cssPath)
