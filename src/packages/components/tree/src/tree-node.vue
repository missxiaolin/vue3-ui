<template>
  <div
    v-show="node.visible"
    ref="node$"
    :class="[
      ns.b('node'),
      ns.is('expanded', expanded),
      ns.is('current', node.isCurrent),
      ns.is('hidden', !node.visible),
      ns.is('focusable', !node.disabled),
      ns.is('checked', !node.disabled && node.checked),
      getNodeClass(node)
    ]"
    role="treeitem"
    tabindex="-1"
    :aria-expanded="expanded"
    :aria-disabled="node.disabled"
    :aria-checked="node.checked"
    :draggable="tree.props.draggable"
    :data-key="getNodeKey(node)"
    @click.stop="handleClick"
    @contextmenu="handleContextMenu"
    @dragstart.stop="handleDragStart"
    @dragover.stop="handleDragOver"
    @dragend.stop="handleDragEnd"
    @drop.stop="handleDrop"
  >
    <div :class="ns.be('node', 'content')" :style="{ paddingLeft: (node.level - 1) * tree.props.indent + 'px' }">
      <l-icon
        v-if="tree.props.icon || 'right'"
        :class="[
          ns.be('node', 'expand-icon'),
          ns.is('leaf', node.isLeaf),
          {
            expanded: !node.isLeaf && expanded
          }
        ]"
        :icon="'l-' + (tree.props.icon || 'youbian')"
        @click.stop="handleExpandIconClick"
      >
      </l-icon>
      <l-checkbox
        v-if="showCheckbox"
        v-model="node.checked"
        :indeterminate="node.indeterminate"
        :disabled="!!node.disabled"
        @click.stop
        @change="handleCheckChange"
      />
      <l-icon v-if="node.loading" icon="l-loading" :class="[ns.be('node', 'loading-icon'), ns.is('loading')]">
      </l-icon>
      <node-content :node="node" :render-content="renderContent" />
    </div>
    <l-collapse-transition>
      <div
        v-if="!renderAfterExpand || childNodeRendered"
        v-show="expanded"
        :class="ns.be('node', 'children')"
        role="group"
        :aria-expanded="expanded"
      >
        <l-tree-node
          v-for="child in node.childNodes"
          :key="getNodeKey(child)"
          :render-content="renderContent"
          :render-after-expand="renderAfterExpand"
          :show-checkbox="showCheckbox"
          :node="child"
          :accordion="accordion"
          :props="props"
          @node-expand="handleChildNodeExpand"
        />
      </div>
    </l-collapse-transition>
  </div>
</template>
<script lang="ts">
import { defineComponent, getCurrentInstance, inject, nextTick, provide, ref, watch } from 'vue';
import { isFunction, isString } from '@vue/shared';
import { CollapseTransition } from '../../../components/collapse-transition';
import { Checkbox } from '../../../components/checkbox';
import { Icon } from '../../../components/icon';
import { debugWarn } from '../../../utils/error';
import { useNamespace } from '../../../hooks';
import NodeContent from './tree-node-content.vue';
import { getNodeKey as getNodeKeyUtil } from './model/util';
import { useNodeExpandEventBroadcast } from './model/useNodeExpandEventBroadcast';
import { dragEventsKey } from './model/useDragNode';
import Node from './model/node';

import type { ComponentInternalInstance, PropType } from 'vue';
import type { Nullable } from '../../../utils/types';
import type { RootTreeType, TreeNodeData, TreeOptionProps } from './tree.type';

export default defineComponent({
  name: 'LTreeNode',
  components: {
    [CollapseTransition.name]: CollapseTransition,
    [Checkbox.name]: Checkbox,
    NodeContent,
    [Icon.name]: Icon
  },
  props: {
    node: {
      type: Node,
      default: () => ({})
    },
    props: {
      type: Object as PropType<TreeOptionProps>,
      default: () => ({})
    },
    accordion: Boolean,
    renderContent: Function,
    renderAfterExpand: Boolean,
    showCheckbox: {
      type: Boolean,
      default: false
    }
  },
  emits: ['node-expand'],
  setup(props, ctx) {
    const ns = useNamespace('tree');
    const { broadcastExpanded } = useNodeExpandEventBroadcast(props);
    const tree = inject<RootTreeType>('RootTree');
    const expanded = ref(false);
    const childNodeRendered = ref(false);
    const oldChecked = ref<boolean>(null);
    const oldIndeterminate = ref<boolean>(null);
    const node$ = ref<Nullable<HTMLElement>>(null);
    const dragEvents = inject(dragEventsKey);
    const instance = getCurrentInstance();

    provide('NodeInstance', instance);
    if (!tree) {
      debugWarn('Tree', "Can not find node's tree.");
    }

    if (props.node.expanded) {
      expanded.value = true;
      childNodeRendered.value = true;
    }

    const childrenKey = tree.props['children'] || 'children';
    watch(
      () => {
        const children = props.node.data[childrenKey];
        return children && [...children];
      },
      () => {
        props.node.updateChildren();
      }
    );

    watch(
      () => props.node.indeterminate,
      (val) => {
        handleSelectChange(props.node.checked, val);
      }
    );

    watch(
      () => props.node.checked,
      (val) => {
        handleSelectChange(val, props.node.indeterminate);
      }
    );

    watch(
      () => props.node.expanded,
      (val) => {
        nextTick(() => (expanded.value = val));
        if (val) {
          childNodeRendered.value = true;
        }
      }
    );

    const getNodeKey = (node: Node): any => {
      return getNodeKeyUtil(tree.props.nodeKey, node.data);
    };

    const getNodeClass = (node: Node) => {
      const nodeClassFunc = props.props.customClass;
      if (!nodeClassFunc) {
        return {};
      }
      let className;
      if (isFunction(nodeClassFunc)) {
        const { data } = node;
        className = nodeClassFunc(data, node);
      } else {
        className = nodeClassFunc;
      }

      if (isString(className)) {
        return { [className]: true };
      } else {
        return className;
      }
    };

    const handleSelectChange = (checked: boolean, indeterminate: boolean) => {
      if (oldChecked.value !== checked || oldIndeterminate.value !== indeterminate) {
        tree.ctx.emit('check-change', props.node.data, checked, indeterminate);
      }
      oldChecked.value = checked;
      oldIndeterminate.value = indeterminate;
    };

    const handleClick = (e: MouseEvent) => {
      const store = tree.store.value;
      store.setCurrentNode(props.node);
      tree.ctx.emit('current-change', store.currentNode ? store.currentNode.data : null, store.currentNode);
      tree.currentNode.value = props.node;

      if (tree.props.expandOnClickNode) {
        handleExpandIconClick();
      }

      if (tree.props.checkOnClickNode && !props.node.disabled) {
        handleCheckChange(!props.node.checked, {
          target: { checked: !props.node.checked }
        });
      }
      tree.ctx.emit('node-click', props.node.data, props.node, instance, e);
    };

    const handleContextMenu = (event: Event) => {
      if (tree.instance.vnode.props['onNodeContextmenu']) {
        event.stopPropagation();
        event.preventDefault();
      }
      tree.ctx.emit('node-contextmenu', event, props.node.data, props.node, instance);
    };

    const handleExpandIconClick = () => {
      if (props.node.isLeaf) return;
      if (expanded.value) {
        tree.ctx.emit('node-collapse', props.node.data, props.node, instance);
        props.node.collapse();
      } else {
        props.node.expand();
        ctx.emit('node-expand', props.node.data, props.node, instance);
      }
    };

    const handleCheckChange = (value, ev) => {
      // console.log(value,ev)
      props.node.setChecked(value, !tree.props.checkStrictly);
      nextTick(() => {
        const store = tree.store.value;
        tree.ctx.emit('check', props.node.data, {
          checkedNodes: store.getCheckedNodes(),
          checkedKeys: store.getCheckedKeys(),
          halfCheckedNodes: store.getHalfCheckedNodes(),
          halfCheckedKeys: store.getHalfCheckedKeys()
        });
      });
    };

    const handleChildNodeExpand = (nodeData: TreeNodeData, node: Node, instance: ComponentInternalInstance) => {
      broadcastExpanded(node);
      tree.ctx.emit('node-expand', nodeData, node, instance);
    };

    const handleDragStart = (event: DragEvent) => {
      if (!tree.props.draggable) return;
      dragEvents.treeNodeDragStart({ event, treeNode: props });
    };

    const handleDragOver = (event: DragEvent) => {
      event.preventDefault();
      if (!tree.props.draggable) return;
      dragEvents.treeNodeDragOver({
        event,
        treeNode: { $el: node$.value, node: props.node }
      });
    };

    const handleDrop = (event: DragEvent) => {
      event.preventDefault();
    };

    const handleDragEnd = (event: DragEvent) => {
      if (!tree.props.draggable) return;
      dragEvents.treeNodeDragEnd(event);
    };

    return {
      ns,
      node$,
      tree,
      expanded,
      childNodeRendered,
      oldChecked,
      oldIndeterminate,
      getNodeKey,
      getNodeClass,
      handleSelectChange,
      handleClick,
      handleContextMenu,
      handleExpandIconClick,
      handleCheckChange,
      handleChildNodeExpand,
      handleDragStart,
      handleDragOver,
      handleDrop,
      handleDragEnd
      //   CaretRight,
    };
  }
});
</script>
