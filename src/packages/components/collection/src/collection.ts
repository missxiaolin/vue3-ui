import { ref, inject, onMounted, onBeforeUnmount, provide, unref } from 'vue';
import Collection from './collection.vue';
import CollectionItem from './collection-item.vue';

import type { InjectionKey } from 'vue';
import type { ECollectionInjectionContext, ECollectionItemInjectionContext } from './tokens';

export const COLLECTION_ITEM_SIGN = `data-L-collection-item`;

// Make sure the first letter of name is capitalized
export const createCollectionWithScope = (name: string) => {
  const COLLECTION_NAME = `L${name}Collection`;
  const COLLECTION_ITEM_NAME = `${COLLECTION_NAME}Item`;
  const COLLECTION_INJECTION_KEY: InjectionKey<ECollectionInjectionContext> = Symbol(COLLECTION_NAME);
  const COLLECTION_ITEM_INJECTION_KEY: InjectionKey<ECollectionItemInjectionContext> = Symbol(COLLECTION_ITEM_NAME);

  const ECollection = {
    ...Collection,
    name: COLLECTION_NAME,
    setup() {
      const collectionRef = ref<HTMLElement | null>(null);
      const itemMap: ECollectionInjectionContext['itemMap'] = new Map();
      const getItems = () => {
        const collectionE = unref(collectionRef);

        if (!collectionE) return [];
        const orderedNodes = Array.from(collectionE.querySelectorAll(`[${COLLECTION_ITEM_SIGN}]`));

        const items = [...itemMap.values()];

        const orderedItems = items.sort((a, b) => orderedNodes.indexOf(a.ref!) - orderedNodes.indexOf(b.ref!));
        return orderedItems;
      };

      provide(COLLECTION_INJECTION_KEY, {
        itemMap,
        getItems,
        collectionRef
      });
    }
  };

  const ECollectionItem = {
    ...CollectionItem,
    name: COLLECTION_ITEM_NAME,
    setup(_, { attrs }) {
      const collectionItemRef = ref<HTMLElement | null>(null);
      const collectionInjection = inject(COLLECTION_INJECTION_KEY, undefined)!;

      provide(COLLECTION_ITEM_INJECTION_KEY, {
        collectionItemRef
      });

      onMounted(() => {
        const collectionItemE = unref(collectionItemRef);
        if (collectionItemE) {
          collectionInjection.itemMap.set(collectionItemE, {
            ref: collectionItemE,
            ...attrs
          });
        }
      });

      onBeforeUnmount(() => {
        const collectionItemE = unref(collectionItemRef)!;
        collectionInjection.itemMap.delete(collectionItemE);
      });
    }
  };
  return {
    COLLECTION_INJECTION_KEY,
    COLLECTION_ITEM_INJECTION_KEY,
    ECollection,
    ECollectionItem
  };
};
