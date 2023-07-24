import { computed, getCurrentInstance, inject, provide, ref } from 'vue';
import type { InjectionKey, Ref } from 'vue';
import ZHCN from '../../locale/lang/zh-cn';
import type { Language } from '../../locale';
import { useGlobalConfig } from '../use-global-config';

type Translator = (...args: any[]) => string;

export type LocaleContext = {
  locale: Ref<Language>;
  lang: Ref<string>;
  t: Translator;
};

export const LocaleInjectionKey = 'ElLocaleInjection' as unknown as InjectionKey<LocaleContext>;

// this is meant to fix global methods like `ElMessage(opts)`, this way we can inject current locale
// into the component as default injection value.
let localeObjCache: LocaleContext;

function template(str: string, option: any) {
  if (!str || !option) return str;
  return str.replace(/\{(\w+)\}/g, (_, key) => {
    return option[key];
  });
}

/**
 * @param path
 * @param option
 * @param current
 * @returns
 */
function translate(path: any, option: any, current: any) {
  const paths = path.split('.');
  let value;
  for (let i = 0, j = paths.length; i < j; i++) {
    const property = paths[i];
    value = current[property];
    if (i === j - 1) return template(value, option);
    if (!value) return '';
    current = value;
  }
}

/**
 * @returns 
 */
export const useLocaleInject = () => {
  const langConfig = useGlobalConfig('locale');
  const lang = langConfig?.value?.name;
  const locale = langConfig?.value;
  return inject(
    LocaleInjectionKey,
    localeObjCache || {
      lang: ref(ZHCN.name),
      locale: ref(ZHCN),
      t: (...args) => {
        const [path, option] = args;
        return translate(path, option, locale || ZHCN);
      }
    }
  );
};

export const useLocale = () => {
  const vm = getCurrentInstance()!;
  const props = vm.props as {
    locale: Language;
  };

  const locale = computed(() => props.locale || ZHCN);
  const lang = computed(() => locale.value.name);

  const _translator = (...args: any[]) => {
    const [path, option] = args;
    return translate(path, option, locale.value);
  };

  const t = (...args: any[]) => {
    return _translator(...args);
  };

  const provides = {
    locale,
    lang,
    t
  } as LocaleContext;

  // this could be broken if someone tries to do following:

  /**
   * <config-provider :locale="lang1">
   *   <config-provider :locale="lang2">
   *     Something calls modal component.
   *   </config-provider>
   * </config-provider>
   */
  localeObjCache = provides;
  provide(LocaleInjectionKey, provides);
};