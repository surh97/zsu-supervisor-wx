<template>
  <van-field v-model="currentValue" :type="type" :label="title" :input-align="align" clearable />
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component({ name: 'InputItem' })
export default class InputItem extends Vue {
  /** 标题 */
  @Prop() private title: string;

  /** 值 */
  @Prop() private value: string | number;

  /** 类型 */
  @Prop({ default: 'text' }) private type: string;

  /** 对其 */
  @Prop({ default: 'left' }) private align: string;

  /** 获取值 */
  get currentValue(): string | number { return this.value; }

  /** 返回值 */
  set currentValue(value: string | number) { this.$emit('input', value); }
}
</script>
