import type { Ref } from 'vue';

export interface CollapseProvider {
  openAwayNames: any;
  activeNames: Ref;
  openAway: Ref;
  background: any;
  handleItemClick: (name: string | number) => void;
}
