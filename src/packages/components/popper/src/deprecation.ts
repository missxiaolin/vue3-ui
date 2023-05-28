import { computed, getCurrentInstance } from 'vue';
import { useDeprecated } from '../../../hooks';
import { isBoolean } from '../../../utils/util';

export function useDeprecateAppendToBody(scope: string, from: string) {
  const vm = getCurrentInstance()!;

  const compatTeleported = computed(() => {
    return (isBoolean(vm.props[from]) ? vm.props[from] : vm.props.teleported) as boolean;
  });

  useDeprecated(
    {
      scope,
      from,
      replacement: 'teleported',
      version: '',
      ref: ''
    },
    computed(() => isBoolean(vm.props[from]))
  );

  return {
    compatTeleported
  };
}
