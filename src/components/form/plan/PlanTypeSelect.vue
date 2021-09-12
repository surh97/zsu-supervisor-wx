<template>
  <SelectItem v-model="form" :title="title" :options="planTypeOptions" :show.sync="visiable" v-on:onChange="onChange" cancelText="关闭" :empty="false" />
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

import { SelectItem } from '../';

import { Option } from '@/domains/option';

@Component({
  name: 'PlanTypeSelect',
  components: {
    SelectItem,
  },
})
export default class PlanTypeSelect extends Vue {
  private planTypeOptions: Option[] = [
    { key: 1, value: 1, label: '随堂听课评课' },
    { key: 2, value: 2, label: '课程跟踪评课' },
  ];

  /** 表单项名 */
  @Prop({ default: '听课类型' }) private title: string;

  /** 值 */
  @Prop() private value: number;

  /** 听课次数 */
  @Prop() private totalListenNum: number;

  /** 显示 */
  @Prop() private show: boolean;

  /** 获取值 */
  get form(): number { return this.value; }

  /** 返回值 */
  set form(value: number) { this.$emit('input', value); }

  get visiable(): boolean { return this.show; }

  set visiable(value: boolean) { this.$emit('update:show', value); }

  get totalListenNumValue(): number { return this.totalListenNum; }

  set totalListenNumValue(value: number) { this.$emit('update:totalListenNum', value); }

  private onChange(value: Option) {
    this.form = value.value as number;
    if (value.value === 2) {
      this.totalListenNumValue = 2;
    } else {
      this.totalListenNumValue = 1;
    }
  }
}
</script>