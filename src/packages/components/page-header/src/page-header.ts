import { buildProps, definePropType } from '../../../utils/props';

export const PageHeaderProps = buildProps({
  icon: {
    type: String,
    default: 'l-xitongfanhui'
  },
  title: String,
  content: {
    type: String,
    default: ''
  }
} as const);

export const pageHeaderEmits = {
  back: () => true
};
export type PageHeaderEmits = typeof pageHeaderEmits;
