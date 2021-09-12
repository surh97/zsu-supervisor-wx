<template>
  <div class="main-layout">
    <transition name="van-fade" mode="out-in">
      <router-view />
    </transition>
    <van-tabbar v-model="active">
      <van-tabbar-item icon="share" to="/course">选课</van-tabbar-item>
      <van-tabbar-item icon="records" to="/plan">听课计划</van-tabbar-item>
      <van-tabbar-item icon="pending-orders" to="/record">听课记录</van-tabbar-item>
      <van-tabbar-item icon="contact" to="/user">我</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({ name: 'Layout' })
export default class Layout extends Vue {
  private active: number = 0;
}
</script>

<style lang="scss" scoped>
.main-layout {
  width: 100%;
  height: 100vh;
}
.van-tabbar-item--active {
  color: #005825;
}
</style>

