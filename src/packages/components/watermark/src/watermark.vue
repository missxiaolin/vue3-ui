<template>
  <div
    :class="[ns.b(), fullPage ? `${ns.b()}__full-page` : '']"
    :style="{
      zIndex,
      backgroundSize: `${gapX + width}px`,
      backgroundImage: `url('${base64Url}')`
    }"
  >
  </div>
</template>

<script lang="ts">
import { toRefs, reactive, watch, onMounted } from 'vue';
import { useNamespace } from '../../../hooks';
import createComponent from '../../../utils/create';
import { WatermarkProps } from './watermark';
const { componentName, create } = createComponent('Watermark');

export default create({
  props: WatermarkProps,
  emits: ['click'],
  setup(props, { emit }) {
    let ns = useNamespace('watermark');
    const state = reactive({
      base64Url: ''
    });
    const { fullPage } = toRefs(props)
    const {
      zIndex,
      gapX,
      gapY,
      width,
      height,
      rotate,
      image,
      imageWidth,
      imageHeight,
      content,
      fontStyle,
      fontWeight,
      fontColor,
      fontSize,
      fontFamily,
    } = props;

    const init = () => {
      const canvas = document.createElement('canvas');
      const ratio = window.devicePixelRatio;
      const ctx = canvas.getContext('2d');
      const canvasWidth = `${(gapX + width) * ratio}px`;
      const canvasHeight = `${(gapY + height) * ratio}px`;
      const markWidth = width * ratio;
      const markHeight = height * ratio;
      canvas.setAttribute('width', canvasWidth);
      canvas.setAttribute('height', canvasHeight);
      if (ctx) {
        // 图片
        if (image) {
          ctx.translate(markWidth / 2, markHeight / 2);
          ctx.rotate((Math.PI / 180) * Number(rotate));

          const img = new Image();
          img.crossOrigin = 'anonymous';
          img.referrerPolicy = 'no-referrer';
          img.src = image;
          img.onload = () => {
            ctx.drawImage(
              img,
              (-imageWidth * ratio) / 2,
              (-imageHeight * ratio) / 2,
              imageWidth * ratio,
              imageHeight * ratio
            );
            ctx.restore();
            state.base64Url = canvas.toDataURL();
          };
          return;
        }
        // 文字
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        // 文字绕中间旋转
        ctx.translate(markWidth / 2, markHeight / 2);
        ctx.rotate((Math.PI / 180) * Number(rotate));

        const markSize = Number(fontSize) * ratio;
        ctx.font = `${fontStyle} normal ${fontWeight} ${markSize}px/${markHeight}px ${fontFamily}`;
        ctx.fillStyle = fontColor;

        ctx.fillText(content, 0, 0);
        ctx.restore();
        state.base64Url = canvas.toDataURL();
      } else {
        throw new Error('当前环境不支持Canvas');
      }
    };

    onMounted(() => {
      init();
    });

    watch(
      () => [
        zIndex,
        gapX,
        gapY,
        width,
        height,
        rotate,
        image,
        imageWidth,
        imageHeight,
        content,
        fontStyle,
        fontWeight,
        fontColor,
        fontSize,
        fontFamily
      ],
      () => {
        init();
      }
    );

    return {
      componentName,
      ns,
      fullPage,
      ...toRefs(state)
    };
  }
});
</script>
