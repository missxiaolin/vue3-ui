<template>
  <div class="l-player-top">
    <p class="top-title">{{ title || '' }}</p>
    <p class="top-title">{{ currTime }}</p>
  </div>
</template>

<script lang="ts">
import { onUnmounted, reactive, ref } from 'vue';
import createComponent from '../../../../utils/create';
const { create } = createComponent('VideoPlayerTop');

export default create({
  props: {
    title: {
      default: ''
    }
  },
  setup(props, { emit }) {
    Date.prototype.format = function (fmt): any {
      let o = {
        'h+': this.getHours(),
        'm+': this.getMinutes(),
        's+': this.getSeconds()
      };
      for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
          fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
        }
      }
      return fmt;
    };
    let currTime = ref('00:00:00');
    currTime.value = new Date().format('hh:mm:ss');
    let timeout: any = null;
    timeout = setInterval(() => {
      currTime.value = new Date().format('hh:mm:ss');
    }, 1000);

    onUnmounted(() => {
      clearInterval(timeout);
    });
    return {
      ...props,
      currTime
    };
  }
});
</script>
