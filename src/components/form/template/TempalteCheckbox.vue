<template>
  <SelectItem v-model="form" :title="title" :options="templateOptions" :show.sync="visiable" :empty="false" cancelText="关闭" v-on:onChange="onChange" />
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Getter } from 'vuex-class';

import { SelectItem } from '../';

import { Option } from '@/domains/option';
import { Template } from '@/domains/template';

@Component({
  name: 'TemplateSelect',
  components: {
    SelectItem,
  },
})
export default class TemplateCheckbox extends Vue {
  private templateOptions: Option[] = [
    // { key: 1, value: 1, label: '理论课' },
    // { key: 2, value: 2, label: '实验课' },
    { key: 3, value: 3, label: '理论课2' },
    { key: 4, value: 4, label: '实验课2' },
  ];

  /** 表单项名 */
  @Prop({ default: '听课记录表' }) private title: string;

  /** 值 */
  @Prop() private value: Template;

  /** 显示 */
  @Prop() private show: boolean;

  /** 获取值 */
  get form(): Template { return this.value; }

  /** 返回值 */
  set form(value: Template) { this.$emit('input', value); }

  get visiable(): boolean { return this.show; }

  set visiable(value: boolean) { this.$emit('update:show', value); }

  private onChange(value: Option) {
    this.form.id = value.value as number;
    this.form.name = value.label as string;
  }
}
</script>