<template>
  <SelectItem v-model="form" :title="title" :options="departmentOptions" :show.sync="visiable" v-on:onChange="onChange" />
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Getter } from 'vuex-class';

import { SelectItem } from '../';

import { Option } from '@/domains/option';
import { Department } from '@/domains/department';

@Component({
  name: 'DepartmentSelect',
  components: {
    SelectItem,
  },
})
export default class DepartmentSelect extends Vue {
  @Getter private departmentOptions: Option[];

  /** 表单项名 */
  @Prop({ default: '单位' }) private title: string;

  /** 值 */
  @Prop() private value: Department;

  /** 显示 */
  @Prop() private show: boolean;

  /** 获取值 */
  get form(): Department { return this.value; }

  /** 返回值 */
  set form(value: Department) { this.$emit('input', value); }

  get visiable(): boolean { return this.show; }

  set visiable(value: boolean) { this.$emit('update:show', value); }

  private onChange(value: Option) {
    this.form.id = value.value as string;
    this.form.name = value.label as string;
  }
}
</script>