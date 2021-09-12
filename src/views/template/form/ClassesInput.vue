<template>
  <van-dialog v-model="visiable" show-cancel-button :before-close="close" confirmButtonText="确定">
    <van-cell-group>
      <van-field label="听课节" v-model="form" placeholder="请输入听课节" />
    </van-cell-group>
  </van-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

import { Option } from '@/domains/option';
import { Campus } from '@/domains/campus';

@Component({
  name: 'ClassesInput',
  components: {
  },
})
export default class ClassesInput extends Vue {
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

  private close(action: string, done: () => void) {
    done();
  }
}
</script>