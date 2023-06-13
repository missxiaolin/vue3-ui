import Popover from './src/index.vue';
export { default as Popover } from './src/index.vue';

/** export end */
import type { App } from 'vue';
import PopoverDirective, { VPopover } from './src/directive';

import type { SFCWithInstall } from '../../utils/types';
(PopoverDirective as SFCWithInstall<typeof PopoverDirective>).install = (app: App) => {
  app.directive(VPopover, PopoverDirective);
};

const _PopoverDirective = PopoverDirective as SFCWithInstall<typeof PopoverDirective>;

Popover.directive = _PopoverDirective;

const _Popover = Popover as any as SFCWithInstall<typeof Popover> & {
  directive: typeof _PopoverDirective;
};

export default _Popover;
export const LPopover = _Popover;
export const LPopoverDirective = _PopoverDirective;
