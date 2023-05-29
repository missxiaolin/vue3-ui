import type { Ref } from 'vue';

export type CollectionItem<T = Record<string, any>> = {
  ref: HTMLElement | null;
} & T;

export type ECollectionInjectionContext = {
  itemMap: Map<HTMLElement, CollectionItem>;
  getItems: <T>() => CollectionItem<T>[];
  collectionRef: Ref<HTMLElement | null>;
};

export type ECollectionItemInjectionContext = {
  collectionItemRef: Ref<HTMLElement | null>;
};
