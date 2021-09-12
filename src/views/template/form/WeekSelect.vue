<template>
  <van-popup v-model="visiable" position="bottom" :close-on-click-overlay="true" :overlay="true">
    <van-picker show-toolbar :title="title" value-key="label" :columns="weekOptions" @cancel="onConfirm" @confirm="onConfirm" @change="onChange" />
  </van-popup>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

import { Option } from '@/domains/option';
import { Campus } from '@/domains/campus';

@Component({
  name: 'WeekSelect',
  components: {
  },
})
export default class WeekSelect extends Vue {
  private weekOptions: Option[] = [
    { label: '星期一', value: '1', key: '1' },
    { label: '星期二', value: '2', key: '2' },
    { label: '星期三', value: '3', key: '3' },
    { label: '星期四', value: '4', key: '4' },
    { label: '星期五', value: '5', key: '5' },
    { label: '星期六', value: '6', key: '6' },
    { label: '星期日', value: '7', key: '7' },
  ];

  /** 表单项名 */
  @Prop({ default: '星期' }) private title: string;

  /** 值 */
  @Prop() private value: string;

  /** 显示 */
  @Prop() private show: boolean;

  /** 获取值 */
  get form(): string { return this.value; }

  /** 返回值 */
  set form(value: string) { this.$emit('input', value); }

  get visiable(): boolean { return this.show; }

  set visiable(value: boolean) {
    this.$emit('update:show', value);
  }

  private onConfirm() {
    this.visiable = false;
  }

  private onChange(picker: any, value: any) {
    this.form = value.value;
  }
}
</script>