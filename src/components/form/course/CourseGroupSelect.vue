<template>
  <SelectItem v-model="form" :title="title" :options="courseGroupOptions" :show.sync="visiable" v-on:onChange="onChange" />
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Getter } from 'vuex-class';

import { SelectItem } from '../';

import { Option } from '@/domains/option';
import { CourseGroup } from '@/domains/course';

@Component({
  name: 'CourseGroupSelect',
  components: {
    SelectItem,
  },
})
export default class CourseGroupSelect extends Vue {
  @Getter private courseGroupOptions: Option[];

  /** 表单项名 */
  @Prop({ default: '学科' }) private title: string;

  /** 值 */
  @Prop() private value: CourseGroup;

  /** 显示 */
  @Prop() private show: boolean;

  /** 获取值 */
  get form(): CourseGroup { return this.value; }

  /** 返回值 */
  set form(value: CourseGroup) { this.$emit('input', value); }

  get visiable(): boolean { return this.show; }

  set visiable(value: boolean) { this.$emit('update:show', value); }

  private onChange(value: Option) {
    this.form.id = value.value as number;
    this.form.name = value.label as string;
  }
}
</script>