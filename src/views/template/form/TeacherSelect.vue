<template>
  <van-popup v-model="visiable" position="bottom" :close-on-click-overlay="true" :overlay="true">
    <van-picker show-toolbar :title="title" value-key="label" :columns="teacherOptionsList" confirm-button-text="确定" @cancel="onConfirm" @confirm="onConfirm" @change="onChange" />
  </van-popup>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

import { Option } from '@/domains/option';
import { Campus } from '@/domains/campus';

@Component({
  name: 'TeacherSelect',
  components: {
  },
})
export default class CampusSelect extends Vue {
  @Prop({ default: [] })
  private teacherOptions: any[];

  /** 表单项名 */
  @Prop({ default: '选择老师' }) private title: string;

  /** 值 */
  @Prop() private value: string;

  /** 显示 */
  @Prop() private show: boolean;

  /** 获取值 */
  get form(): string { return this.value; }

  /** 返回值 */
  set form(value: string) {
    console.log(value);
    this.$emit('input', value);
  }

  get visiable(): boolean { return this.show; }

  set visiable(value: boolean) {
    this.$emit('update:show', value);
  }

  get teacherOptionsList(): any[] {
    const arr: any[] = [];
    this.teacherOptions.forEach((item: any) => {
      const obj = {
        label: this.format(item.teacher.dw) + this.format(item.teacher.xiaoqu),
        value: item.teacher.zgh,
        key: item.teacher.zgh,
      };
      arr.push(obj);
    });
    return arr;
  }

  private format(label: string): string {
    return label ? label : '';
  }

  private onConfirm(value) {
    console.log(value);
    this.$emit('input', value.value);
    this.visiable = false;
  }

  private onChange(picker: any, value: any) {
    this.form = value.value;
  }
}
</script>