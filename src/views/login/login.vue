<template>
  <div class="login-box">
    <img src="@/assets/image/background/login.png" alt="背景图" width="100%">
    <div class="login-form">
      <van-field v-model="form.username" placeholder="用户名" border />
      <van-field v-model="form.password" type="password" placeholder="密码" />
      <div style="position: relative; padding-right: 120px;">
        <van-field v-model="form.imageCode"  placeholder="验证码"  />
        <div style="position: absolute; right: 0; top: 10px;" >
          <img :src="codeUrl" style="vertical-align: middle" />
          <span class="demonstration" @click="getCode" style="margin: 0 5px; vertical-align: middle">刷新</span>
        </div>
      </div>
      <van-button type="primary" size="large" @click="login">登录</van-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Action } from 'vuex-class';

import { User } from '@/domains/user';
import { setTimeout } from 'timers';
import { loginApi } from '@/api/login/LoginApi';
import { isNullOrUndefined } from 'util';
import { Toast } from 'vant';
import baseUrl from '../../utils/base-url';

class LoginUser extends User {
  private imageCode: string = '';
}

@Component({ name: 'LoginPage' })
export default class LoginPage extends Vue {
  /** 登录表单 */
  private form: LoginUser = new LoginUser();

  private codeUrl: string = '';
  /** 校验规则 */
  private rules: any = {
    username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
    password: [{ required: true, message: '请输入登录密码', trigger: 'blur' }],
    imageCode: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
  };

  @Action('Login') private actionLogin: (user: User) => Promise<any>;

  @Action('RefreshSupervisor') private actionRefreshSupervisor: () => Promise<any>;

  @Action('FindUser') private actionRefreshUser: () => Promise<any>;

  /** 登录 */
  private login() {
    if (this.validate()) {
      this.actionLogin(this.form).then(() => {
        this.actionRefreshSupervisor().then(() => {
          this.actionRefreshUser().then(() => {
            this.$router.push({ path: '/course' });
          });
        });
      });
    }
  }

  /** 校验 */
  private validate(): boolean {
    const username = this.form.username;
    if (isNullOrUndefined(username) || username.trim() === '') {
      Toast.fail('请输入用户名');
      return false;
    }
    const password = this.form.password;
    if (isNullOrUndefined(password) || password.trim() === '') {
      Toast.fail('请输入密码');
      return false;
    }
    return true;
  }
  private created() {
    this.getCode();
  }
  // 获取验证码
  private getCode(): void {
    this.codeUrl = baseUrl + '/code/image?t=' + Date.now();
  }
}
</script>

<style lang="scss" scoped>
.login-box {
  padding: 50px 10px;
  .login-form {
    padding: 0 20px;
    .van-field {
      margin: 20px 0;
      border: 1px solid #ccc;
      border-radius: 5px;
    }
  }
}
</style>

