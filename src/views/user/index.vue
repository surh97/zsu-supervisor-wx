<template>
  <div class="app-container">
    <van-nav-bar :title="title" class="zsu-nav-bar" />
    <van-cell-group>
      <van-cell title="个人信息" is-link @click="showDetailed = true" />
    </van-cell-group>
    <div class="margin20">
      <van-button type="danger" size="large" plain @click="logout" class="height40">退出登录</van-button>
    </div>
    <UserDetailedPage :show.sync="showDetailed" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter, Action } from 'vuex-class';

import UserDetailedPage from './detailed.vue';

import { Supervisor } from '@/domains/supervisor';

@Component({
  name: 'UserPage',
  components: {
    UserDetailedPage,
  },
})
export default class UserPage extends Vue {
  @Getter private supervisor: Supervisor;

  @Action('Logout') private actionLogout: () => Promise<any>;

  private showDetailed: boolean = false;

  get title(): string {
    return `${this.supervisor.person.name}老师`;
  }

  /** 登出 */
  private logout() {
    this.actionLogout().then(() => {
      this.$router.push({ path: '/login' });
    });
  }
}
</script>

<style lang="scss" scoped>
</style>