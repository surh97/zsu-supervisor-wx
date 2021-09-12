<template>
  <van-popup v-model="visiable" position="bottom" :close-on-click-overlay="true" :overlay="true">
    <van-picker show-toolbar :cancel-button-text="cancelText" :title="title" value-key="label" :columns="options" @cancel="onCancel" @confirm="onConfirm" @change="onChange" />
  </van-popup>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Emit } from 'vue-property-decorator';

import { Option } from '@/domains/option';

@Component({ name: 'SelectItem' })
export default class SelectItem extends Vue {
  /** 标题 */
  @Prop() private title: string;

  /** 选项列表 */
  @Prop({ default: [] }) private options: Option[];

  /** 值 */
  @Prop() private value: string | number | boolean;

  /** 显示 */
  @Prop() private show: boolean;

  /** 取消按钮文字 */
  @Prop({ default: '置空' }) private cancelText: string;

  /** 置空 */
  @Prop({ default: true }) private empty: boolean;

  /** 获取值 */
  get currentValue(): string | number | boolean { return this.value; }

  /** 返回值 */
  set currentValue(value: string | number | boolean) { this.$emit('input', value); }

  get visiable(): boolean { return this.show; }

  set visiable(value: boolean) { this.$emit('update:show', value); }

  private onConfirm(value: any): void {
    this.visiable = false;
  }

  private onCancel() {
    if (this.empty) {
      this.$emit('onChange', Option.getEmpty());
    }
    this.visiable = false;
  }

  private onChange(picker: any, value: any) {
    this.$emit('onChange', value);
  }
}
</script>

