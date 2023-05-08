import { ref, unref, inject, computed } from 'vue';
import { elFormItemKey, elFormKey } from '../../tokens/index';
import { componentSizes } from '../../utils/constants';
import { buildProp } from '../../utils/props';

export const useSizeProp = buildProp({
  type: String,
  values: componentSizes,
  required: false
} as const);
