<template>
  <div class="doc-footer" :class="`doc-footer-${themeColor}`">
    <div class="doc-footer-content">
      <div class="doc-footer-list">
        <!-- <img class="doc-footer-logo" src="" /> -->
      </div>

      <div class="doc-footer-list">
        <h4 class="doc-footer-title">相关产品</h4>
        <div class="doc-footer-item">
          <a class="sub-link" target="_blank" href="https://vuejs.org">Vue</a>
        </div>
        <div class="doc-footer-item"><a class="sub-link" target="_blank" href="https://vitejs.dev">Vite</a> </div>
      </div>
      <div class="doc-footer-list">
        <h4 class="doc-footer-title">社区</h4>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { RefData } from '../../assets/utils/ref';

export default defineComponent({
  name: 'doc-footer',

  setup() {
    return {
      themeColor: RefData.getInstance().themeColor
    };
  }
});
</script>

<style lang="scss" scoped>
@import '../../assets/style/variables.scss';

.doc {
  &-footer {
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
    text-align: center;
    background: #fff;
    &-content {
      width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: space-betemuien;
      align-items: flex-start;
    }
    &-list {
      position: relative;
      &:first-child {
        margin-right: 65px;
      }
    }
    &-logo {
      margin-top: 8px;
    }
    &-title {
      margin-bottom: 24px;
      font-size: 16px;
      font-weight: bold;
      text-align: left;
    }
    &-item {
      margin-bottom: 14px;
      line-height: 17px;
      font-size: 12px;
      text-align: left;
      cursor: pointer;
      .sub-link {
        // cursor: pointer;
      }
    }
    &-desc {
      font-size: 12px;
      line-height: 30px;
    }
    &-select-hd {
      width: 92px;
      height: 32px;
      padding: 0 10px;
      line-height: 32px;
      font-size: 12px;
      text-align: left;
      border-width: 1px;
      border-style: solid;
      border-radius: 2px;
      cursor: pointer;
    }
    &-select-bd {
      position: absolute;
      border-radius: 2px;
      text-align: left;
    }
    &-select-item {
      width: 92px;
      height: 32px;
      padding: 0 10px;
      line-height: 32px;
      font-size: 12px;
      border-width: 0px 1px 1px;
      border-style: solid;
      border-radius: 2px;
      cursor: pointer;
    }
    .icon-color {
      display: inline-block;
      width: 12px;
      height: 10px;
      margin-right: 10px;
      background: url('../../assets/images/icon-color.png') no-repeat center/100%;
    }
    .circle-red,
    .circle-black,
    .circle-white {
      position: relative;
      top: -1px;
      display: inline-block;
      width: 12px;
      height: 12px;
      margin-right: 10px;
      border-radius: 50%;
      vertical-align: middle;
    }
  }
}
// 颜色
.doc-footer {
  // height: 240px;
  // 黑色
  &-black {
    background: $theme-black-footer-bg;
    border-top: 1px solid $theme-black-footer-border;
    .doc-footer {
      &-title {
        color: $theme-black-footer-word1;
      }
      &-item {
        color: $theme-black-footer-word2;
        .sub-link {
          color: $theme-black-footer-word2;
        }
      }
      &-desc {
        color: $theme-black-footer-word4;
      }
      &-select-hd {
        color: $theme-black-footer-word2;
        // background: rgba(29, 29, 33, 1);
        border-color: $theme-black-theme-border;
        &:hover {
          color: $theme-black-footer-hover;
        }
      }
      &-select-item {
        color: $theme-black-footer-word2;
        // background: rgba(29, 29, 33, 1);
        border-color: $theme-black-theme-border;
        .circle-red {
          background: $theme-red-gradient;
        }
        .circle-black {
          background: $theme-black-circle;
          border: 1px solid $theme-black-theme-border;
        }
        .circle-white {
          background: $theme-white-circle;
        }
        &:hover {
          background-color: $theme-black-theme-border;
          .circle-black {
            border-color: $theme-black-circle;
          }
        }
        &.active {
          background-color: $theme-black-footer-hover;
          border-color: $theme-black-footer-hover;
          .circle-red {
            border: 1px solid $theme-red-border;
          }
          .circle-black {
            border-color: $theme-black-footer-bg;
          }
        }
      }
    }
  }
  // 白色、红色
  &-white,
  &-red {
    background: $theme-white-footer-bg;
    border-top: 1px solid $theme-white-footer-border;
    .doc-footer {
      &-title {
        color: $theme-white-footer-word1;
      }
      &-item {
        color: $theme-white-footer-word2;
        .sub-link {
          color: $theme-white-footer-word2;
        }
      }
      &-desc {
        color: $theme-white-footer-word4;
      }
      &-select-hd {
        color: $theme-white-footer-word2;
        // background: rgba(29, 29, 33, 1);
        border-color: $theme-white-theme-border;
        &:hover {
          color: $theme-white-footer-hover;
        }
      }
      &-select-item {
        color: $theme-white-footer-word2;
        // background: rgba(29, 29, 33, 1);
        border-color: $theme-white-theme-border;
        .circle-red {
          background: $theme-red-gradient;
        }
        .circle-black {
          background: $theme-black-circle;
          border: 1px solid $theme-black-circle;
        }
        .circle-white {
          background: $theme-white-circle;
          border: 1px solid $theme-white-circle-border;
        }
        &:hover {
          color: $theme-white-footer-word3;
          background-color: $theme-white-theme-border;
          .circle-black {
            border-color: $theme-black-circle;
          }
        }
        &.active {
          color: $theme-white;
          background-color: $theme-white-footer-hover;
          border-color: $theme-white-footer-hover;
          .circle-red {
            border: 1px solid $theme-red-border;
          }
          .circle-black {
            border-color: $theme-black-circle;
          }
          .circle-white {
            border-color: $theme-white-circle;
          }
        }
      }
    }
  }
}
.vx-item {
  position: relative;
  &:hover {
    .vx-box {
      display: block;
    }
  }
}
.icon-vx {
  display: inline-block;
  width: 13px;
  height: 13px;
  margin-left: 5px;
  vertical-align: -2px;
  background: url('../../assets/images/icon-footer-vx.png') no-repeat center/100%;
}
.vx-box {
  display: none;
  position: absolute;
  right: -144px;
  top: -160px;
  padding: 20px 30px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(238, 238, 238, 1);
  box-shadow: 0px 2px 4px 0px rgba(143, 143, 143, 0.5);
  .vx-desc {
    margin-bottom: 10px;
    line-height: 17px;
    font-size: 12px;
    color: #1a1a1a;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .img-code {
    width: 121px;
    height: 121px;
    margin-bottom: 10px;
  }
  .vx-red {
    margin: 0 4px;
    font-weight: bold;
    color: #29c1c2;
  }
}
</style>