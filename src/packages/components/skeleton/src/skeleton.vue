<template>
  <template v-if="uiLoading">
    <div :class="[ns.b(), ns.is('animated', animated)]" v-bind="$attrs">
      <template v-for="i in count" :key="i">
        <slot v-if="loading" :key="i" name="template">
          <skeleton-item :class="ns.is('first')" variant="p" />
          <skeleton-item
            v-for="item in rows"
            :key="item"
            :class="[ns.e('paragraph'), ns.is('last', item === rows && rows > 1)]"
            variant="p"
          >
          </skeleton-item>
        </slot>
      </template>
    </div>
  </template>
  <template v-else>
    <slot v-bind="$attrs"></slot>
  </template>
</template>
<script lang="ts">
import { toRef, toRefs } from 'vue';
import { useNamespace, useThrottleRender } from '../../../hooks';
import { skeletonProps } from './skeleton';
import SkeletonItem from './skeleton-item.vue';
import createComponent from '../../../utils/create';
const { create, componentName } = createComponent('Skeleton');

export default create({
  components: {
    SkeletonItem
  },
  props: skeletonProps,
  setup(props, { emit }) {
    const { animated, count, rows } = toRefs(props);

    const ns = useNamespace('skeleton');
    const uiLoading = useThrottleRender(toRef(props, 'loading'), props.throttle);
    return { ns, uiLoading, animated, count, rows };
  }
});
</script>
