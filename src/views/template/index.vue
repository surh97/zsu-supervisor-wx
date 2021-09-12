<template>
  <div class="app-container">
    <!-- 头 -->
    <van-nav-bar title="中山大学督导员听课记录表" class="template-header" />
    <div class="student-supervisor-record-archive-qrcode" v-if="studentSupervisorRecordArchiveURL">
      <qrcode-vue :value="studentSupervisorRecordArchiveURL" size="240" level="M"/>
    </div>

    <h4 v-show="record.rejection">{{ "驳回原因：" + record.rejection }}</h4>

    <!-- 档案头 -->
    <div class="template">
      <div class="template-header" v-if="question.type.id === 4 && question.base.id === 1" v-for="question in template.questions" :key="'template-header' + question.id">
        <!-- 校园、学年、学期 -->
        <van-row>
          <van-col v-for="subQuestion in question.questions" :key="subQuestion.id" span="8" v-if="[21, 22, 23].indexOf(subQuestion.base.id) >= 0" class="template-header-question-item">
            <!-- 校区 -->
            <span v-if="subQuestion.base.id === 21">
              <span @click="canSave ? campusItem = true : () => {}" :id="'question' + subQuestion.id">{{ subQuestion.answer.answer }}</span>
              <CampusSelect v-model="subQuestion.answer.answer" :show.sync="campusItem" />
            </span>
            <!-- 其他 -->
            <span v-else>{{ subQuestion.answer.answer }}</span>
            <!-- 必填 -->
            <i v-if="subQuestion.required" class="required">*</i>
            <span class="error-tips" v-if="subQuestion.empty">必填</span>
          </van-col>
        </van-row>
        <!-- 周、星期、节 -->
        <van-row>
          <van-col v-for="subQuestion in question.questions" :key="subQuestion.id" span="8" v-if="[24, 25, 26].indexOf(subQuestion.base.id) >= 0" class="template-header-question-item">
            <!-- 周 -->
            <span v-if="subQuestion.base.id === 24">
              <span @click="canSave ? weeksItem = true : () => {}" :id="'question' + subQuestion.id">{{ subQuestion.answer.answer ? `第${subQuestion.answer.answer}周` : '听课周' }}</span>
              <WeeksInput v-model="subQuestion.answer.answer" :show.sync="weeksItem" />
            </span>
            <!-- 星期 -->
            <span v-else-if="subQuestion.base.id === 25">
              <span @click="canSave ? weekItem = true : () => {}" :id="'question' + subQuestion.id">{{ subQuestion.answer.answer ? `星期${subQuestion.answer.answer}` : '听课星期' }}</span>
              <WeekSelect v-model="subQuestion.answer.answer" :show.sync="weekItem" />
            </span>
            <!-- 节 -->
            <span v-else-if="subQuestion.base.id === 26">
              <span @click="canSave ? classesItem = true : () => {}" :id="'question' + subQuestion.id">{{ subQuestion.answer.answer ? `第${subQuestion.answer.answer}节` : '听课节' }}</span>
              <ClassesInput v-model="subQuestion.answer.answer" :show.sync="classesItem" />
            </span>
            <!-- 必填 -->
            <i v-if="subQuestion.required" class="required">*</i>
            <span class="error-tips" v-if="subQuestion.empty">必填</span>
          </van-col>
        </van-row>
      </div>

      <!-- 档案主体 -->
      <div class="template-body" v-for="question in template.questions" :key="'question' + question.id">
        <!-- 单选题 -->
        <div v-if="question.type.id === 1" class="single-select">
          <van-cell-group>
            <van-cell class="question-title">
              <span slot="title" :id="'question' + question.id">{{ question.base.name }}
                <i v-if="question.required" class="required">*</i>
              </span>
              <span class="error-tips" v-if="question.empty">必选</span>
            </van-cell>

            <van-row>
              <van-col :span="12" v-for="option in question.options" :key="'subOption' + option.id" class="single-select-item">
                <i :class="question.answer.answer === option.value ? 'circle select' : 'circle'" @click.stop="canSave ? question.answer.answer = option.value : () => {}" />
                <span @click.stop="canSave ? question.answer.answer = option.value : () => {}">
                  {{ option.base.name }}
                </span>
                <!-- <van-field v-if="option.type.id === 2" v-show="question.answer.answer === option.value" v-model="question.answer.other" class="single-select-other" /> -->
              </van-col>
            </van-row>

            
            <div v-for="option in question.options" :key="'subOption-input' + option.id" class="single-select-item-input">
              <van-field placeholder="请填写原因" type="textarea" v-if="option.type.id === 2" v-show="question.answer.answer === option.value" v-model="question.answer.other" class="single-select-other-imput" />
            </div>
            
            <van-row>
              <div v-if="question.remarks === '输入框' && question.answer.answer === '1'">
                <van-field v-model="question.answer.other" placeholder="请填写原因或具体表现" type="textarea" />
              </div>
            </van-row>
          </van-cell-group>
        </div>

        <!-- 多选题 -->
        <div v-if="question.type.id === 2" class="single-select" v-show="false">
          <van-cell-group>
            <van-cell :title="question.base.name" class="question-title" />
            <van-cell>
              <van-row>
                <!-- <van-checkbox-group v-model="question.checkbox" @click="checkModelQuestionChange($event, question)">
                  <van-checkbox
                    v-for="(item) in question.options"
                    :key="item.id"
                    :name="item.value"
                  >
                    {{ item.base.name }}
                  </van-checkbox>
                </van-checkbox-group> -->
                <van-col :span="24" v-for="option in question.options" :key="'subOption' + option.id" class="single-select-item">
                  <i :class="question.answer.answer !== null ? question.answer.answer.split(',').indexOf(option.value) > -1 ? 'circle select' : 'circle' : 'circle'" @click.stop="canSave ? checkModelQuestionChange(option.value, question) : () => {}" />
                  <span @click.stop="canSave ? checkModelQuestionChange(option.value, question) : () => {}">
                    {{ option.base.name }}
                  </span>
                </van-col>
              </van-row>
            </van-cell>
          </van-cell-group>
        </div>

        <!-- 单行填空 -->
        <div v-if="question.type.id === 4 && question.id != 1" class="single-input">
          <van-cell-group>
            <van-cell :title="question.base.name" class="question-title" />
            <template v-for="subQuestion in question.questions">
              <van-field v-if="subQuestion.type.id === 4" :required="subQuestion.required" :label="subQuestion.base.name" input-align="right" :key="'subQuestion' + subQuestion.id" v-model="subQuestion.answer.answer" :disabled="!canSave" :id="'question' + subQuestion.id" />

              <template v-else-if="subQuestion.type.id === 1">
                <van-cell :key="'subQuestion-title' + subQuestion.id" class="question-title">
                  <span slot="title" :id="'question' + subQuestion.id">{{ subQuestion.base.name }}
                    <i v-if="subQuestion.required" class="required">*</i>
                  </span>
                  <span class="error-tips" v-if="subQuestion.empty">必选</span>
                </van-cell>
                <van-row :key="'subQuestion-select' + subQuestion.id" >
                  <van-col :span="12" v-for="option in subQuestion.options" :key="'subOption' + option.id" class="single-select-item">
                    <i :class="subQuestion.answer.answer === option.value ? 'circle select' : 'circle'" @click.stop="canSave ? subQuestion.answer.answer = option.value : () => {}" />
                    <span @click.stop="canSave ? subQuestion.answer.answer = option.value : () => {}">
                      {{ option.base.name }}
                    </span>
                    <van-field v-if="option.type.id === 2" v-show="subQuestion.answer.answer === option.value" v-model="subQuestion.answer.other" class="single-select-other" />
                  </van-col>
                </van-row>
              </template>

            </template>
          </van-cell-group>
        </div>

        <!-- 多行填空 -->
        <div v-if="question.type.id === 5" class="multi-input">
          <van-cell-group>
            <van-cell class="question-title">
              <span slot="title">{{ question.base.name }}
                <i v-if="question.required" class="required">*</i>
              </span>
              <span class="error-tips" v-if="question.empty">必选</span>
            </van-cell>
            <van-field type="textarea" :autosize="true" v-for="subQuestion in question.questions" :key="'subQuestion' + subQuestion.id" v-model="subQuestion.answer.answer"  :disabled="!canSave" :id="'question' + subQuestion.id" />
          </van-cell-group>
        </div>

        <!-- 矩阵 -->
        <div v-if="question.type.id === 6" class="multi-question">
          <van-cell-group>
            <van-cell :title="question.base.name" class="question-title"/>
            <!-- <van-radio-group v-model="checkModel">
              <van-radio name="0">评分制</van-radio>
              <van-radio name="1">等级制</van-radio>
            </van-radio-group> -->
            <div v-for="subQuestion in question.questions" :key="'array' + subQuestion.id" class="multi-question-answer">
              <van-cell class="question-title" center>
                <span slot="title" class="multi-question-answer-title">{{ subQuestion.base.name }}
                  <i v-if="question.required" class="required">*</i>
                </span>
                <van-stepper v-if="checkModel === '0'" v-model="subQuestion.answer.answer" integer :min="0" :max="100" class="multi-question-score" :disabled="!canSave" :id="'question' + subQuestion.id" @change="inputChange($event, subQuestion)" />
                <span class="comments" v-for="(item, index) in comments" :key="item" v-if="(template.id === 3 || template.id === 4) || ((template.id === 1 || template.id === 2) && index !== 2)">{{ item }}</span>
              </van-cell>
              <van-cell v-show="checkModel === '1'" class="check-model-radio">
                <!-- <van-radio-group v-model="subQuestion.comment" :disabled="!canSave" @change="radioChange($event, subQuestion.answer.answer)">
                  <van-radio v-for="(item, index) in comments" :name="item" :key="item" v-if="(template.id === 3 || template.id === 4) || ((template.id === 1 || template.id === 2) && index !== 2)">{{ item }}</van-radio>
                </van-radio-group> -->
                <van-col v-for="(item, index) in comments" :name="item" :key="item" v-if="(template.id === 3 || template.id === 4 || template.id === 5) || ((template.id === 1 || template.id === 2) && index !== 2)" class="single-select-item">
                  <i :class="item === subQuestion.comment ? 'circle select' : 'circle'" @click.stop="canSave ? radioChange(item, subQuestion) : () => {}" />
                  <span @click.stop="canSave ? radioChange(item, subQuestion) : () => {}">
                    {{ item }}
                  </span>
                </van-col>
              </van-cell>
              <span v-if="question.base.remarks" class="description">{{ subQuestion.base.remarks }}</span>
              <span v-else class="description">以下观测细项为选填</span>
              <van-cell v-for="childQuestion in subQuestion.questions" :key="'childQuestion' + childQuestion.id" :title="childQuestion.base.name" center class="multi-question-option">
                <i :class="childQuestion.answer.answer === option.value ? 'circle select' : 'circle'" v-for="option in childQuestion.options" :key="'subOption' + option.id" @click.stop="canSave ? childQuestion.answer.answer = option.value : () => {}" />
              </van-cell>
            </div>
            <!-- 总分 -->
            <van-cell title="综合评分：" :value="getSum(question)" class="sum-score" />
          </van-cell-group>
        </div>
      </div>
    </div>

    <van-row class="button-group">
      <van-col span="8">
        <van-button type="warning" :loading="saving" @click="close">关闭</van-button>
      </van-col>
      <van-col span="8">
        <van-button type="default" v-if="canSave" :loading="saving" @click="updateRecord">保存</van-button>
      </van-col>
      <van-col span="8">
        <van-button type="primary" v-if="canSave" :loading="saving" @click="commitRecord">提交</van-button>
      </van-col>
    </van-row>

    <!-- 选择老师 -->
    <TeacherSelect v-model="skxxId" :teacherOptions="teacherOptions" :show.sync="isShowTeacherSelect" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import QrcodeVue from 'qrcode.vue';

import CampusSelect from './form/CampusSelect.vue';
import TeacherSelect from './form/TeacherSelect.vue';
import WeeksInput from './form/WeeksInput.vue';
import WeekSelect from './form/WeekSelect.vue';
import ClassesInput from './form/ClassesInput.vue';

import { Record } from '@/domains/work';
import { Template, Question } from '@/domains/template';
import { findRecordTemplateApi, updateRecordTemplateApi, findRecordTempalteTeacherApi, updateTeacherApi } from '@/api/work/RecordApi';
import { isNullOrUndefined } from 'util';
import { Toast, Dialog } from 'vant';

@Component({
  name: 'TemplatePage',
  components: {
    CampusSelect,
    WeeksInput,
    WeekSelect,
    ClassesInput,
    TeacherSelect,
    QrcodeVue,
  },
})
export default class TemplatePage extends Vue {
  /** 保存列表 */
  private saves: number[] = [1, 2, 4];

  /** 记录 */
  private record: Record = new Record();

  /** 档案 */
  private template: Template = new Template();

  /** 保存状态 */
  private saving: boolean = false;

  /** 停止保存 */
  private stopSave: boolean = false;

  /** 定时器 */
  private saveInterval: NodeJS.Timer = null;

  private campusItem: boolean = false;
  private weeksItem: boolean = false;
  private weekItem: boolean = false;
  private classesItem: boolean = false;

  private studentSupervisorRecordArchiveURL: string = '';

  /** 后面追加的内容 */
  /** 显示等级制还是评分制 */
  private checkModel: string = '0';

  /** 等级 */
  private comments: string[] = ['优', '良', '中', '差'];

  /** 当老师出现更改老师姓名，并且出现同名时，记录选择的老师 */
  private skxxId: string = '';

  /** 是否显示选择老师 */
  private isShowTeacherSelect: boolean = false;

  /** 提供选择老师的列表 */
  private teacherOptions: any[] = [];

  /** 多行总数字要大于50字的校验 */
  private moreThan50: number = 0;

  private moreThan50Length: number = 0;

  private letterNumber: number = 0;

  /** 保存 */
  get canSave(): boolean {
    return !isNullOrUndefined(this.record) && this.saves.indexOf(this.record.status) >= 0 && !this.stopSave;
  }

  private initStudentSupervisorRecordArchiveURL() {
    this.studentSupervisorRecordArchiveURL = `https://ddpj.sysu.edu.cn/mobile/student/supervisor_record/archive/STUDENT_QUESTIONNAIRE_20191001/${this.record.id}?COURSE_CODE=${this.record.plan.coursePlan.clazz.id}&COURSE_NAME=${this.record.plan.coursePlan.clazz.course.name}&CAMPUS_NAME=${this.record.plan.coursePlan.campus.name}&CLASSROOM=${this.record.plan.coursePlan.classrome}&LESSON=${this.record.plan.coursePlan.startClass}-${this.record.plan.coursePlan.endClass}`;
  }

  /** 获取记录档案 */
  private async findRecordTemplate(param: Record) {
    const load = Toast.loading({ mask: true, message: '正在获取听课档案，请稍后。', duration: 0 });
    await findRecordTemplateApi(param).then((result: any) => {
      this.record = Record.build(result);
      this.template = this.record.template;
      this.autoSave();
      this.checkModelChange();
      load.clear();
    }).catch(() => {
      load.clear();
    });
  }

  /** 自动保存档案 */
  private autoSave() {
    if (this.canSave) {
      this.saveInterval = setTimeout(() => {
        if (this.canSave) {
          if (this.saving) {
            this.autoSave();
          } else {
            this.updateRecord().then(() => {
              this.autoSave();
            }).catch(() => {
              this.autoSave();
            });
          }
        }
      }, 10000);
    }
  }

  /** 提交档案 */
  private commitRecord(): void {
    if (this.canSave) {
      this.checkIsShuiKe().then(() => {
        this.record.status = 3;
        findRecordTempalteTeacherApi(this.record).then((response: any) => {
          if (response) {
            if (response.length > 1) {
              if (this.skxxId === '') {
                this.teacherOptions = response;
                this.isShowTeacherSelect = true;
                this.stopSave = false;
                this.record.status = 2;
              } else {
                let CoursePlanZsuDTO: object = null;
                for (const item of this.teacherOptions) {
                  if (this.skxxId === item.teacher.zgh) {
                    CoursePlanZsuDTO = item;
                    break;
                  }
                }
                updateTeacherApi(CoursePlanZsuDTO).then(() => {
                  this.handleSave();
                });
              }
            } else if (response.length === 1) {
              const CoursePlanZsuDTO: object = response[0];
              updateTeacherApi(CoursePlanZsuDTO).then(() => {
                this.handleSave();
              });
            } else {
              this.handleSave();
            }
          } else {
            this.handleSave();
          }
        }).catch((error: any) => {
          this.record.status = 2;
        });
      });
    }
  }

  /** 确认提交 */
  private handleSave(): void {
    this.vaild().then(() => {
      this.stopSave = true;
      this.saveRecord(3).then(() => {
        this.close();
      });
    }).catch((id: number) => {
      this.record.status = 2;
      const element: HTMLElement = document.getElementById('question' + id);
      try {
        element.scrollIntoView({ behavior: 'smooth' });
      } catch (error) {
        Toast({ message: `档案存在未填项，系统无法自动定位`, position: 'top' });
      }
    });
  }

  /** 更新档案 */
  private updateRecord(): Promise<void> {
    if (this.canSave) {
      Toast({ message: `正在更新档案`, position: 'top' });
      return this.saveRecord(2);
    }
  }

  /** 保存档案 */
  private saveRecord(status: 2 | 3): Promise<void> {
    const record: Record = new Record();
    record.id = this.record.id;
    record.status = status;
    record.template = this.template;
    record.sumScore = this.record.sumScore;
    return this.save(record);
  }

  /** 保存 */
  private save(record: Record): Promise<void> {
    return new Promise((resolve, reject) => {
      this.saving = true;
      updateRecordTemplateApi(record).then((result: any) => {
        Toast({ message: `档案保存成功`, position: 'top' });
        setTimeout(() => {
          this.saving = false;
          resolve();
        }, 2000);
      }).catch(() => {
        this.saving = false;
        if (record.status === 3) {
          this.stopSave = false;
        } else {
          Toast.fail('保存档案发生错误，无法继续保存！');
        }
        reject();
      });
    });
  }

  // 校验
  private vaild(): Promise<any> {
    return new Promise((resolve, reject) => {
      const empty = false;
      const questions: Question[] = this.template.questions;
      this.moreThan50Length = 0;
      this.moreThan50 = 0;
      this.letterNumber = 0;
      questions.forEach((question: Question) => {
        if (question.type.id === 5 && question.remarks === '大于50') {
          this.moreThan50Length++;
        }
      });
      for (const question of questions) {
        switch (question.type.id) {
          case 1:
            if (!this.singleSelectVaild(question, reject)) { return; }
            break;
          case 4:
            if (!this.singleInputVaild(question, reject)) { return; }
            break;
          case 5:
            if (!this.multiInputVaild(question, reject)) { return; }
            break;
          case 6:
            if (!this.multiQuestionVaild(question, reject)) { return; }
            break;
        }
      }
      resolve();
    });
  }

  /** 单选题验证 */
  private singleSelectVaild(question: Question, reject: (value?: any) => void): boolean {
    if (!question.required) { return; }
    const answer: string = question.answer.answer;
    question.empty = question.required && (answer === null || answer.trim() === '');
    if (question.empty) {
      Toast(`${question.base.name}未填写。`);
      reject(question.id);
      return false;
    }

    if (question.options) {
      const undo = question.options
        .filter((option) => option.type.id === 2)
        .filter((option) => option.value === question.answer.answer)
        .filter(() => question.answer.other === null || question.answer.other.trim() === '');
      if (undo && undo.length) {
        Toast(question.base.name + '---未说明原因');
        reject(question.id);
        return false;
      }
    }

    return true;
  }

  /** 单行填空题验证 */
  private singleInputVaild(question: Question, reject: (value?: any) => void): boolean {
    for (const sub of question.questions) {
      if (!sub.required) {
        return true;
      }
      const answer: string = sub.answer.answer;
      sub.empty = isNullOrUndefined(answer) || (typeof answer === 'string' && answer.trim() === '');
      if (!sub.empty && sub.base.id === 24 && typeof answer === 'number' && answer <= 0) {
        sub.empty = true;
      }
      if (!sub.empty && sub.base.id === 24 && typeof answer === 'string' && answer.trim() === '0') {
        sub.empty = true;
      }
      if (sub.empty) {
        Toast(`${sub.base.name}未填写。`);
        reject(sub.id);
        return false;
      }
    }
    return true;
  }

  /** 多行填空题验证 */
  private multiInputVaild(question: Question, reject: (value?: any) => void): boolean {
    question.empty = false;
    for (const sub of question.questions) {
      const answer: string = sub.answer.answer;
      question.empty = sub.required && (answer === null || answer.trim() === '') ? true : question.empty;
      if (question.empty) {
        Toast(`${sub.base.name}未填写。`);
        reject(sub.id);
        return false;
      } else if (sub.remarks === '大于50') {
        this.moreThan50++;
        this.letterNumber += answer.length;
        if (this.moreThan50Length === this.moreThan50) {
          if (this.letterNumber < 50) {
            question.empty = true;
            Toast(`最后两项信息不能小于50字`);
            reject(sub.id);
            return false;
          }
        }
      }
    }
    return true;
  }

  /** 矩阵题验证 */
  private multiQuestionVaild(question: Question, reject: (value?: any) => void): boolean {
    for (const sub of question.questions) {
      const answer: number = sub.answer.answer === undefined || sub.answer.answer === null || sub.answer.answer === '' ? null : parseInt(sub.answer.answer, 10);
      sub.empty = sub.required && (answer === null || isNaN(answer) || answer <= 1 || answer > 100);
      if (sub.empty) {
        Toast(`${sub.base.name}未填写。`);
        reject(sub.id);
        return false;
      }
    }
    return true;
  }

  /** 获取总分 */
  private getSum(question: Question) {
    let sum: number = 0;
    question.questions.forEach((subQuestion: Question) => {
      sum += subQuestion.answer.answer ? parseInt(subQuestion.answer.answer, 10) * subQuestion.weigh / 100 : 0;
    });
    this.record.sumScore = sum.toFixed(2);
    return sum.toFixed(2);
  }

  /** 关闭页面 */
  private close() {
    if (this.canSave) {
      const load = Toast.loading({ mask: true, message: '正在执行保存操作，请耐心等待档案自动关闭，谢谢！', duration: 0 });
      this.closeSave();
    } else {
      if (this.saveInterval) { clearTimeout(this.saveInterval); }
      this.stopSave = true;
      Toast.loading({ message: '正在关闭页面', duration: 0 });
      location.reload();
    }
  }

  /** 关闭保存 */
  private closeSave() {
    if (this.saving) {
      setTimeout(() => {
        this.closeSave();
      }, 500);
      return;
    }

    this.updateRecord().then(() => {
      if (this.saveInterval) { clearTimeout(this.saveInterval); }
      this.stopSave = true;
      Toast.loading({ mask: true, message: '正在关闭页面', duration: 0 });
      location.reload();
    });
  }

  private async handler(record: Record) {
    const param: Record = new Record();
    const template: Template = new Template();
    param.template = template;
    param.id = record.id;
    template.id = record.template.id;
    this.stopSave = false;
    await this.findRecordTemplate(param);
  }

  private async mounted() {
    const record: Record = this.$route.params as any;
    if (isNullOrUndefined(record) || isNullOrUndefined(record.id)) {
      this.$router.push({ path: '/plan' });
      return;
    }
    await this.handler(record);

    try {
      this.initStudentSupervisorRecordArchiveURL();
    } catch (err) {
      console.log('初始化学生问卷失败！')
    }
  }

  /** 评分改变时触发等级制 */
  private inputChange(value: number, subQuestion): void {
    if (value <= 100 && value >= 0) {
      if (value >= 85) {
        subQuestion.comment = this.comments[0];
      } else if (value > 75) {
        subQuestion.comment = this.comments[1];
      } else if (value >= 60) {
        subQuestion.comment = this.comments[2];
      } else if (value >= 60) {
        subQuestion.comment = this.comments[3];
      }
    } else {
      subQuestion.comment = '';
    }
  }

  /** 等级改变时触发评分 */
  private radioChange(value: string, question): void {
    const scores: string[] = ['95', '85', '75', '65', '55'];
    question.answer.answer = scores[this.comments.indexOf(value)];
    question.comment = value;
  }

  /** 切换显示等级制还是评分制，将数值计算赋给等级 */
  private checkModelChange() {
    this.record.template.questions.forEach((item: any) => {
      if (item.type.id === 6) {
        item.questions.forEach((son: any) => {
          const value = Number(son.answer.answer);
          if (value <= 100 && value >= 0) {
            if (value >= 90) {
              son.comment = this.comments[0];
            } else if (value >= 80) {
              son.comment = this.comments[1];
            } else if (value >= 70) {
              son.comment = this.comments[2];
            } else if (value >= 60) {
              son.comment = this.comments[3];
            } else if (value > 1) {
              son.comment = this.comments[4];
            }
          } else {
            son.comment = '';
          }
        });
      }
    });
  }

  /** 多选题 */
  private checkModelQuestionChange(value: string, question: any): void {
    const arr: string[] = question.answer.answer === null ? [] : question.answer.answer.split(',');
    if (arr.indexOf(value) > -1) {
      arr.splice(arr.indexOf(value), 1);
    } else {
      arr.push(value);
    }
    question.answer.answer = arr.join(',');
  }

  /** 总分小于75，或者水课多选项大于2项时，提示水课，是否确定提交 */
  private checkIsShuiKe(): Promise<void> {
    const record: Record = this.record;
    return new Promise((resolve, reject) => {
      let isMoreThan2 = false;
      record.template.questions.forEach((question: Question) => {
        if (question.remarks === '大于3' && question.type.id === 2) {
          const arr = question.answer.answer !== null ? question.answer.answer.split(',') : [];
          if (arr.length > 2) {
            isMoreThan2 = true;
          }
        }
      });
      if (Number(record.sumScore) <= 75 || isMoreThan2) {
        Dialog.confirm({
          title: '提示',
          message: '当前评分或选项将被确认为水课，是否继续提交?',
        }).then(() => {
          // on confirm
          resolve();
        });
      } else {
        resolve();
      }
    });
  }
}
</script>

<style lang="scss">
$light-green: #32b16c;
$danger-red: #f56c6c;

.template-header {
  background: $light-green;
  color: white;
  font-weight: bolder;
}

.student-supervisor-record-archive-qrcode {
  text-align: center;
}

.rejection {
  padding: 10px;
  background: $danger-red;
  color: #fff;
  font-size: 14px;
}
.template {
  .template-header {
    .template-header-question-item {
      text-align: center;
      background: $light-green;
      height: 40px;
      line-height: 40px;
      color: #fff;
      font-size: 14px;
    }
  }

  // 标题
  .question-title {
    font-size: 14px;
    font-weight: bolder;
    color: white;
    background: $light-green;
  }

  .template-body {
    .van-radio {
      font-size: 12px;
      padding-left: 10px;
      margin: 5px auto;
      .van-icon {
        top: -3px;
        font-size: 14px !important;
      }
    }

    .van-field .van-cell__title {
      max-width: 120px !important;
    }

    // 单选
    // .single-select {
      .single-select-item {
        position: relative;
        .circle {
          margin: 5px 5px;
        }
        span {
          font-size: 12px;
          position: absolute;
          top: 5px;
        }
        .single-select-other.van-field {
          width: auto;
          display: inline-block;
          border: #000 solid 1px;
          border-radius: 5px;
          padding: 0 !important;
          margin: 0 !important;
        }
      }
    // }
        .single-select-other-imput.van-field {
          border-top: #32b16c solid 1px;
        }

    // 复合
    .multi-question {
      .multi-question-answer {
        .question-title {
          padding-top: 16px;
          padding-bottom: 16px;
          position:relative;

          .description {
            font-size: 12px;
            color: red;
            position: absolute;
            bottom: 2px;
            left: 15px;
          }
        }
        .question-title .van-cell__title {
          flex: 0.7;
        }
        .question-title .van-cell__value {
          flex: 1.3;
        }

        .multi-question-answer-title {
          height: 100%;
        }

        .multi-question-score.van-stepper {
          display: inline-block;
          .van-stepper__input {
            border-radius: 5px;
            width: 60px;
          }
          .van-stepper__minus {
            width: 0;
            visibility: hidden;
          }
          .van-stepper__plus {
            width: 0;
            visibility: hidden;
          }
        }

        .multi-question-option {
          font-size: 12px;
        }

        .circle {
          margin-left: 14px;
          margin-top: 8px;
        }

        .circle.select {
          margin-left: 14px;
          margin-top: 8px;
        }
      }
      .sum-score {
        color: red;
        font-weight: bolder;
      }

      .check-model-radio {
        .single-select-item {
          margin-right: 15px;
          .circle {
            margin-left: 0;
            margin-top: -2px;
            vertical-align: middle;
          }
          span {
            vertical-align: middle;
          }
        }
      }
    }

    .circle {
      display: inline-block;
      width: 12px;
      height: 12px;
      background-color: white;
      border: 2px $light-green solid;
      border-radius: 50%;
    }

    .circle.select {
      display: inline-block;
      width: 12px;
      height: 12px;
      background-color: $light-green;
      border: 2px $light-green solid;
      border-radius: 50%;
    }
  }
}

.button-group {
  margin: 40px 0 20px 0;
  text-align: center;
  .van-button {
    width: 80px;
  }
}

i.required {
  color: $danger-red;
  font-weight: bold;
  font-size: 20px;
}
.error-tips {
  color: $danger-red;
}
.comments {
  margin-left: 9px;
}
.description {
  padding: 0 10px;
}
</style>
