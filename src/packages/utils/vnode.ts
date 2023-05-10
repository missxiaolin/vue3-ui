import { Fragment, Text, Comment, createBlock, openBlock, createCommentVNode, isVNode, camelize } from 'vue';

import type { VNode, VNodeTypes, VNodeChild } from 'vue';

type Children = VNodeTypes[] | VNodeTypes;

const TEMPLATE = 'template';

export const SCOPE = 'VNode';

export enum PatchFlags {
  TEXT = 1,
  CLASS = 2,
  STYLE = 4,
  PROPS = 8,
  FULL_PROPS = 16,
  HYDRATE_EVENTS = 32,
  STABLE_FRAGMENT = 64,
  KEYED_FRAGMENT = 128,
  UNKEYED_FRAGMENT = 256,
  NEED_PATCH = 512,
  DYNAMIC_SLOTS = 1024,
  HOISTED = -1,
  BAIL = -2
}

export const isFragment = (node: unknown): node is VNode => isVNode(node) && node.type === Fragment;

export const isText = (node: VNodeChild) => (node as VNode).type === Text;

export const isComment = (node: VNodeChild) => (node as VNode).type === Comment;

export const isTemplate = (node: VNodeChild) => (node as VNode).type === TEMPLATE;

/**
 * determine if the element is a valid element type rather than fragments and comment e.g. <template> v-if
 * @param node {VNode} node to be tested
 */
export const isValidElementNode = (node: unknown): node is VNode =>
  isVNode(node) && !isFragment(node) && !isComment(node);