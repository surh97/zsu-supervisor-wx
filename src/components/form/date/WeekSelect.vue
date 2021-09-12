<template>
  <SelectItem v-model="form" :title="title" :options="weekOptions" :show.sync="visiable" v-on:onChange="onChange" />
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Getter } from 'vuex-class';

import { SelectItem } from '../';

import { Option } from '@/domains/option';

@Component({
  name: 'WeekSelect',
  components: {
    SelectItem,
  },
})
export default class WeekSelect extends Vue {
  private weekOptions: Option[] = [
    { label: '星期日', key: '7', value: 7 },
    { label: '星期一', key: '1', value: 1 },
    { label: '星期二', key: '2', value: 2 },
    { label: '星期三', key: '3', value: 3 },
    { label: '星期四', key: '4', value: 4 },
    { label: '星期五', key: '5', value: 5 },
    { label: '星期六', key: '6', value: 6 },
  ];

  /** 表单项名 */
  @Prop({ default: '星期' }) private title: string;

  /** 值 */
  @Prop() private value: number;

  /** 显示 */
  @Prop() private show: boolean;

  /** 获取值 */
  get form(): number { return this.value; }

  /** 返回值 */
  set form(value: number) { this.$emit('input', value); }

  get visiable(): boolean { return this.show; }

  set visiable(value: boolean) { this.$emit('update:show', value); }

  private onChange(value: Option) {
    this.form = value.value as number;
  }
}
</script>