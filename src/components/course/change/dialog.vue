<template>
  <van-popup v-model="visible" position="right" :lazy-render="false" :close-on-click-overlay="false" class="show-full">
    <van-nav-bar title="调停信息" class="zsu-nav-bar" />

    <van-cell-group>
      <van-cell v-for="data in datas" :key="data.id" center>
        <p>{{ `调停课类型：${data.changeType}` }}</p>
        <p>{{ `上课周：${data.weeksValue}` }}</p>
        <p>{{ `上课星期：${data.weekValue}` }}</p>
        <p>{{ `上课节：${data.classesValue}` }}</p>
        <p>{{ `上课校区：${data.campusValue}` }}</p>
        <p>{{ `上课教学楼：${data.academicBuildingValue}` }}</p>
        <p>{{ `上课课室：${data.classromeValue}` }}</p>
        <p>{{ `任课教师：${data.teacherValue}` }}</p>
        <p>{{ `原上课日期：${data.oldDateFormat}` }}</p>
        <p>{{ `补课日期：${data.newDateFormat}` }}</p>
        <p>{{ `更新时间：${data.updateTimeFormat}` }}</p>
      </van-cell>
    </van-cell-group>

    <van-tabbar>
      <van-tabbar-item>
        <van-button type="danger" size="small" plain @click="visible = false">关闭</van-button>
      </van-tabbar-item>
    </van-tabbar>

  </van-popup>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { CourseChange } from '@/domains/course';

@Component({ name: 'SelectItem' })
export default class SelectItem extends Vue {
  private datas: CourseChange[] = [];

  private visible: boolean = false;

  /** handler */
  private handler(datas: CourseChange[]) {
    this.datas = datas;
    this.visible = true;
  }

  private mounted() {
    this.$emit('handler', this.handler);
  }
}
</script>

