import type { InjectionKey } from 'vue';
import type { BreadcrumbProps } from '../components/breadcrumb/src/breadcrumb';

export const breadcrumbKey: InjectionKey<BreadcrumbProps> = Symbol('breadcrumbKey');
