import { buildProps, iconPropType } from '../../../utils/props';
import type Step from './step.vue'

export const StepProps = buildProps({
  /**
   * @description step title
   */
  title: {
    type: String,
    default: ''
  },
  /**
   * @description step custom icon. Icons can be passed via named slot as well
   */
  icon: {
    type: iconPropType
  },
  /**
   * @description step description
   */
  description: {
    type: String,
    default: ''
  },
  /**
   * @description current status. It will be automatically set by Steps if not configured.
   */
  status: {
    type: String,
    values: ['', 'wait', 'process', 'finish', 'error', 'success'],
    default: ''
  }
} as const);

export type StepInstance = InstanceType<typeof Step>
