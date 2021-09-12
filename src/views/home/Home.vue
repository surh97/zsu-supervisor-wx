<template>
  <div>
    <img src="@/assets/image/background/home.png" alt="背景图" width="100%">
    <div class="bgvoice">欢迎来到督导评教系统！</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({ name: 'HomePage' })
export default class HomePage extends Vue {
}
</script>

<style lang="scss" scoped>
div {
  img {
    position: absolute;
    width: 16rem;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 5;
  }
  .bgvoice {
    width: 6rem;
    position: absolute;
    font-size: 0.86rem;
    color: #555;
    top: 50%;
    left: 50%;
    transform: translate(-10%, -40%);
    z-index: 6;
  }
}
</style>

