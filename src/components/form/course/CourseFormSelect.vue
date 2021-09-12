<template>
  <SelectItem v-model="form" :title="title" :options="courseFormOptions" :show.sync="visiable" v-on:onChange="onChange" />
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Getter } from 'vuex-class';

import { SelectItem } from '../';

import { Option } from '@/domains/option';

@Component({
  name: 'CourseFormSelect',
  components: {
    SelectItem,
  },
})
export default class CourseFormSelect extends Vue {
  private courseFormOptions: Option[] = [
    { key: 1, value: 1, label: '理论课' },
    { key: 2, value: 2, label: '实验课' },
  ];

  /** 表单项名 */
  @Prop({ default: '开课形式' }) private title: string;

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