import {
  App,
  defineComponent,
  ComponentPropsOptions,
  ExtractPropTypes,
  SetupContext,
  RenderFunction,
  Component,
  getCurrentInstance
} from 'vue';
export function createComponent(name: string) {
  const componentName = 'L' + name;

  const useGlobalConfig = () => {
    const vm: any = getCurrentInstance();
    if ('$LUI' in vm.proxy) {
      return vm.proxy.$EMONSTER;
    }
    return {};
  };

  return {
    useGlobalConfig,
    componentName,
    create: function <
      PropsOptions extends Readonly<ComponentPropsOptions>,
      Props extends Readonly<ExtractPropTypes<PropsOptions>>
    >(_component: {
      name?: string;
      baseName?: string;
      install?: (vue: App) => void;
      props?: PropsOptions;
      components?: Record<string, Component>;
      setup?: (props: Props, setupContext: SetupContext) => RenderFunction | Record<string, any> | any;
      emits?: string[] | Object;
      [optionKey: string]: any;
    }) {
      _component.baseName = name;
      _component.name = componentName;
      _component.install = (vue: App) => {
        vue.component(_component.name as string, _component as any);
      };
      return defineComponent(_component as any);
    }
  };
}
