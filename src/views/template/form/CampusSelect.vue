<template>
  <van-popup v-model="visiable" position="bottom" :close-on-click-overlay="true" :overlay="true">
    <van-picker show-toolbar :title="title" value-key="label" :columns="campusOptions" @cancel="onConfirm" @confirm="onConfirm" @change="onChange" />
  </van-popup>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

import { Option } from '@/domains/option';
import { Campus } from '@/domains/campus';

@Component({
  name: 'CampusSelect',
  components: {
  },
})
export default class CampusSelect extends Vue {
  private campusOptions: Option[] = [
    { label: '广州校区南校园', value: '广州校区南校园', key: '1' },
    { label: '广州校区北校园', value: '广州校区北校园', key: '2' },
    { label: '珠海校区', value: '珠海校区', key: '3' },
    { label: '广州校区东校园', value: '广州校区东校园', key: '4' },
    { label: '深圳校区', value: '深圳校区', key: '5' },
    { label: '其他', value: '其他', key: '-1' },
  ];

  /** 表单项名 */
  @Prop({ default: '校区' }) private title: string;

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