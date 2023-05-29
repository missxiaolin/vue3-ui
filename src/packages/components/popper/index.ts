export { default as Popper } from './src/popper.vue';
export { default as PopperContent } from './src/content.vue';
export { default as PopperArrow } from './src/arrow.vue';
export { default as PopperTrigger } from './src/trigger.vue';
/** export end */
// 以下内容不以组件形式导出

export * from './src/popper';
export * from './src/tokens';
export { useDeprecateAppendToBody } from './src/deprecation';

export type { Placement, Options } from '@popperjs/core';
