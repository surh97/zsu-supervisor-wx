<template>
  <van-popup v-model="visiable" position="right" :overlay="false" class="show-full">
    <van-nav-bar title="个人信息" left-text="返回" @click-left="visiable = false" class="zsu-nav-bar" />
    <van-cell-group>
      <van-cell title="姓名" :value="supervisor.person.name" />
      <van-cell title="职工号" :value="supervisor.person.id" />
      <van-cell title="督导编码" :value="supervisor.code" />
      <van-cell title="督导组别" :value="supervisor.supervisorGroup.fullName" />
      <van-cell title="督导角色" :value="supervisor.supervisorRole.name" />
      <van-cell title="性别" :value="supervisor.genderName" />
      <van-cell title="民族" :value="supervisor.nationName" />
      <van-cell title="职称" :value="supervisor.person.profession.name" />
      <van-cell title="所在院系" :value="supervisor.person.department.name" />
      <van-cell title="隶属校区" :value="supervisor.campus.name" />
      <van-cell title="邮箱" :value="supervisor.email" />
      <van-cell title="手机" :value="supervisor.phone" />
      <van-cell title="人员状态" :value="supervisor.person.status.status" />
      <van-cell title="聘任状态" :value="supervisor.employStatusName" />
    </van-cell-group>
  </van-popup>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Getter } from 'vuex-class';

import { Supervisor } from '@/domains/supervisor';

@Component({ name: 'UserDetailedPage' })
export default class UserDetailedPage extends Vue {
  @Getter private supervisor: Supervisor;

  @Prop() private show: boolean;

  get visiable(): boolean { return this.show; }

  set visiable(value: boolean) { this.$emit('update:show', value); }
}
</script>