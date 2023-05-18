import { buildProps, iconPropType } from '../../../utils/props';
import type { ExtractPropTypes } from 'vue';
import type Breadcrumb from './breadcrumb.vue';

export const breadcrumbProps = buildProps({
  separatorIcon: {
    type: iconPropType,
    default: 'l-youbian'
  }
} as const);
export type BreadcrumbProps = ExtractPropTypes<typeof breadcrumbProps>;
export type BreadcrumbInstance = InstanceType<typeof Breadcrumb>;
