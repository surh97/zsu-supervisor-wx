<template>
  <div class="app-container">
    <!-- 头 -->
    <van-nav-bar title="听课计划" class="zsu-nav-bar header-lock">
      <van-icon name="search" slot="right" @click="showSearch = true" />
    </van-nav-bar>

    <div class="main-box">
      <!-- 列表 -->
      <van-collapse v-model="activePlan" v-for="data in datas" :key="data.id" accordion class="datas">
        <van-collapse-item :name="data.id">
          <div slot="title">
            <span class="title">{{ data.coursePlan.clazz.course.name }}</span>

            <van-button :type="getPlanButtonType(data)" size="small" class="status-button" plain @click.stop="getPlanButtonClick(data)">{{ getPlanButtonLabel(data) }}</van-button>
            <van-button v-show="data.coursePlan.clazz.courseChangeList.length > 0" type="danger" size="small" class="status-button" plain @click.stop="courseChangeHandler(data.coursePlan.clazz.courseChangeList)">调停</van-button>

            <div class="info">
              <p>{{ `计划编号: ${data.id}` }}</p>
              <p>{{ `上课校区: ${data.coursePlan.campus.name}` }}</p>
              <van-row class="info-double-box">
                <van-col span="12">{{ `教师: ${data.coursePlan.teacher.name}` }}</van-col>
                <van-col span="12">{{ `职称: ${data.coursePlan.teacher.profession.name}` }}</van-col>
              </van-row>
              <p>过期时间: <span :style="data.termOfValidityColor">{{ data.termOfValidityFormat }}</span></p>
              <div >教学班情况: <p v-if="data.coursePlan.clazz.deleted" style="background-color: yellow" > 教学班已取消</p>
                <p v-if="!data.coursePlan.clazz.deleted"  > 教学班正常</p></div>
            </div>
          </div>
          <div class="detailed-box">
            <p>{{ `课程代码: ${data.coursePlan.clazz.course.id}` }}</p>
            <p>{{ `教学班号: ${data.coursePlan.clazz.id}` }}</p>
            <p>{{ `开课单位: ${data.coursePlan.clazz.department.name}` }}</p>
            <p>{{ `上课周: ${data.coursePlan.weeksValue}` }}</p>
            <p>{{ `上课星期: ${data.coursePlan.weekValue}` }}</p>
            <p>{{ `上课节: ${data.coursePlan.classesValue}` }}</p>
            <p>{{ `上课课室: ${data.coursePlan.classRoomValue}` }}</p>
            <p>{{ `教学班上课时间地点: ${data.coursePlan.clazz.address}` }}</p>
          </div>
        </van-collapse-item>
      </van-collapse>
    </div>

    <!-- 查询 -->
    <van-popup v-model="showSearch" position="right" :lazy-render="false" :close-on-click-overlay="false" class="show70">
      <van-nav-bar title="查询" class="zsu-nav-bar" />
      <van-cell-group>
        <van-cell title="校区" clickable @click="campusItem = true" :value="form.plan.coursePlan.campus.name" />
        <van-cell title="学科" clickable @click="courseGroupItem = true" :value="form.plan.coursePlan.clazz.department.courseGroup.name" />
        <van-cell title="单位" clickable @click="departmentItem = true" :value="form.plan.coursePlan.clazz.department.name" />
        <InputItem v-model="form.plan.coursePlan.clazz.course.name" align="right" title="课程名" />
        <InputItem v-model="form.plan.coursePlan.weeks" type="number" align="right" title="周" />
        <van-cell title="星期" clickable @click="weekItem = true" :value="form.plan.coursePlan.week" />
        <InputItem v-model="form.plan.coursePlan.classes" type="number" align="right" title="节次" />
        <InputItem v-model="form.plan.coursePlan.address" align="right" title="上课地点" />
      </van-cell-group>
      <van-tabbar>
        <van-tabbar-item>
          <van-button size="small" plain @click="showSearch = false">取消</van-button>
        </van-tabbar-item>
        <van-tabbar-item>
          <van-button type="primary" size="small" plain @click="search">查询</van-button>
        </van-tabbar-item>
      </van-tabbar>
    </van-popup>

    <!-- 创建档案会话 -->
    <van-dialog v-if="addForm" v-model="showAdd" show-cancel-button class="show-dialog" :before-close="addRecordAction">
      <p class="dialog-title">创建听课记录表</p>
      <van-cell-group>
        <van-cell title="听课记录表:" clickable @click="templateAddItem = true" :value="addForm.template.name" />
      </van-cell-group>
      <van-cell-group>
        <van-cell title="开课形式:" clickable @click="cousrFormAddItem = true" :value="courseForm" />
      </van-cell-group>
      <p class="comment">温馨提示：听课记录表类型确定后不可转换，请根据实际需要选择听课记录表类型，谢谢！</p>
    </van-dialog>

    <!-- 显示更多会话 -->
    <van-dialog v-if="otherPlan" v-model="showOther" show-cancel-button class="show-dialog" :before-close="addOtherRecordAction" :showConfirmButton="!otherPlan.deleted && otherRecords.length < otherPlan.totalListenNum" confirmButtonText="添加听课档案" cancelButtonText="关闭">
      <p class="dialog-title">听课记录</p>
      <van-row class="info-double-box">
        <van-col span="6">记录编号</van-col>
        <van-col span="12">创建时间</van-col>
        <van-col span="6">操作</van-col>
      </van-row>
      <van-cell-group v-for="data in otherRecords" :key="data.id">
        <van-row class="info-double-box">
          <van-col span="6">{{ data.id }}</van-col>
          <van-col span="12">{{ data.createDateFormat }}</van-col>
          <van-col span="6">
            <van-button :type="getRecordButtonType(data)" size="small" @click="getRecordButtonClick(data)">{{ getRecordButtonLabel(data) }}</van-button>
          </van-col>
        </van-row>
      </van-cell-group>
    </van-dialog>

    <!-- 添加档案组件 -->
    <TemplateSelect v-if="addForm" v-model="addForm.template" :show.sync="templateAddItem" />
    <CourseFormSelect v-if="addForm" v-model="addForm.courseFormId" :show.sync="cousrFormAddItem" />

    <!-- 查询组件 -->
    <CampusSelect v-model="form.plan.coursePlan.campus" :show.sync="campusItem" />
    <CourseGroupSelect v-model="form.plan.coursePlan.clazz.department.courseGroup" :show.sync="courseGroupItem" />
    <DepartmentSelect v-model="form.plan.coursePlan.clazz.department" :show.sync="departmentItem" />
    <WeekSelect v-model="form.plan.coursePlan.week" :show.sync="weekItem" />

    <!-- 调停课组件 -->
    <CourseChangeDialog v-on:handler="(fun) => { courseChangeHandler = fun }" />

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter } from 'vuex-class';

import { InputItem, CampusSelect, CourseGroupSelect, DepartmentSelect, WeekSelect, TemplateSelect, CourseFormSelect } from '@/components/form';
import { CourseChangeDialog } from '@/components/course';

import { Now } from '@/domains/date';
import { Supervisor, SupervisorGroup } from '@/domains/supervisor';
import { Record, Plan } from '@/domains/work';
import { Person, Profession } from '@/domains/person';
import { CourseGroup, CoursePlanExec, CoursePlan, Course } from '@/domains/course';
import { Department } from '@/domains/department';
import { Campus } from '@/domains/campus';
import { Page } from '@/domains/page';
import { listPlanApi } from '@/api/work/PlanApi';
import { isNullOrUndefined } from 'util';
import { Toast } from 'vant';
import { Template } from '@/domains/template';
import { saveRecordApi } from '@/api/work/RecordApi';

@Component({
  name: 'PlanPage',
  components: {
    InputItem,
    CampusSelect,
    CourseGroupSelect,
    DepartmentSelect,
    WeekSelect,
    TemplateSelect,
    CourseChangeDialog,
    CourseFormSelect,
  },
})
export default class PlanPage extends Vue {
  @Getter private now: Now;
  @Getter private supervisor: Supervisor;

  private form: Record = null;
  private addForm: Record = null;

  private otherPlan: Plan = null;
  private otherRecords: Record[] = [];

  private datas: Plan[] = [];

  private activePlan: any = null;

  private showSearch: boolean = false;
  private campusItem: boolean = false;
  private courseGroupItem: boolean = false;
  private departmentItem: boolean = false;
  private weekItem: boolean = false;

  private showAdd: boolean = false;
  private templateAddItem: boolean = false;
  private cousrFormAddItem: boolean = false;

  private showOther: boolean = false;

  private get courseForm() {
    switch (this.addForm.courseFormId) {
      case 1:
        return '理论课';
      case 2:
        return '实验课';
      default:
        return '错误选项';
    }
  }

  /** 查询 */
  private search() {
    if (!this.rules()) { return; }
    const load = Toast.loading({ mask: true, message: '正在查询听课计划，请稍等。', duration: 0 });
    listPlanApi(this.form).then((result: any) => {
      this.form.pageInfo.setPage(result);
      const list: Plan[] = Plan.builds(result.list);
      load.clear();
      this.showSearch = false;
      this.datas = list;
    }).catch(() => {
      load.clear();
    });
  }

  /** 校验 */
  private rules(): boolean {
    let result: boolean = true;
    if (isNullOrUndefined(this.form.plan.supervisor.person.id)) {
      Toast.fail('未获取到督导信息，请稍后再试。');
      result = false;
    }
    return result;
  }

  /** 点击添加档案 */
  private addRecordAction(action: string, done: () => void) {
    if (action === 'confirm') {
      const load = Toast.loading({ mask: true, message: '正在创建档案，请稍等。', duration: 0 });
      saveRecordApi(this.addForm).then((result: any) => {
        load.clear();
        done();
        this.showTemplateDialog(Record.build(result));
      }).catch(() => {
        load.clear();
      });
    } else {
      done();
    }
  }

  /** 点击创建档案 */
  private addOtherRecordAction(action: string, done: () => void) {
    if (action === 'confirm') {
      this.createRecord(this.otherPlan);
    }
    done();
  }

  /** 获取按钮类型 */
  private getPlanButtonType(plan: Plan) {
    if (this.isEmpty(plan.recordList)) {
      return 'primary';
    }
    if (this.isSingle(plan)) {
      return this.getRecordButtonType(plan.recordList[0]);
    }
    return 'default';
  }

  /** 获取按钮类型 */
  private getRecordButtonType(record: Record) {
    switch (record.status) {
      case 1: return 'default';
      case 2: return 'warning';
      case 3: return 'primary';
      case 4: return 'danger';
      case 5: return 'default';
      default: return 'danger';
    }
  }

  /** 获取按钮标签 */
  private getPlanButtonLabel(plan: Plan) {
    if (this.isEmpty(plan.recordList)) {
      return '待填写档案';
    }
    if (this.isSingle(plan)) {
      return this.getRecordButtonLabel(plan.recordList[0]);
    }
    return '显示更多';
  }

  /** 获取按钮标签 */
  private getRecordButtonLabel(record: Record) {
    return record.statusValue || '档案错误';
  }

  /** 获取按钮点击事件 */
  private getPlanButtonClick(plan: Plan) {
    if (this.isEmpty(plan.recordList)) {
      this.createRecord(plan);
    } else if (this.isSingle(plan)) {
      this.getRecordButtonClick(plan.recordList[0]);
    } else {
      this.showRecordDialog(plan);
    }
  }

  /** 获取按钮点击事件 */
  private getRecordButtonClick(record: Record) {
    if (record.status) {
      this.showTemplateDialog(record);
    }
  }

  /** 创建档案 */
  private createRecord(data: Plan): void {
    const record: Record = new Record();
    const plan: Plan = new Plan();
    const template: Template = new Template();
    record.courseFormId = 1;
    record.plan = plan;
    record.template = template;
    plan.id = data.id;
    template.id = 5;
    template.name = '听课记录表(201910)';
    this.addForm = record;
    this.showAdd = true;
  }

  /** 显示档案 */
  private showTemplateDialog(record: Record): void {
    const path: any = { name: 'TemplatePage', params: record };
    this.$router.push(path);
  }

  /** 显示记录 */
  private showRecordDialog(plan: Plan): void {
    this.otherPlan = plan;
    this.otherRecords = plan.recordList;
    this.showOther = true;
  }

  /** 空计划（无档案） */
  private isEmpty(records: Record[]): boolean {
    return isNullOrUndefined(records) || (records.length === 1 && isNullOrUndefined(records[0].id));
  }

  /** 单次听课计划 */
  private isSingle(plan: Plan): boolean {
    return plan.totalListenNum === 1;
  }

  /** 初始化表单 */
  private initForm(): void {
    const form: Record = new Record();
    const plan: Plan = new Plan();
    const supervisor: Supervisor = new Supervisor();
    const person: Person = new Person();
    const supervisorCourseGroup: CourseGroup = new CourseGroup();
    const supervisorGroup: SupervisorGroup = new SupervisorGroup();
    const coursePlan: CoursePlanExec = new CoursePlanExec();
    const clazz: CoursePlan = new CoursePlan();
    const department: Department = new Department();
    const courseGroup: CourseGroup = new CourseGroup();
    const course: Course = new Course();
    const teacher: Person = new Person();
    const profession: Profession = new Profession();
    const campus: Campus = new Campus();
    const page: Page = new Page();

    form.plan = plan;
    plan.supervisor = supervisor;
    plan.coursePlan = coursePlan;
    supervisor.person = person;
    supervisor.courseGroup = supervisorCourseGroup;
    supervisor.supervisorGroup = supervisorGroup;
    coursePlan.clazz = clazz;
    coursePlan.teacher = teacher;
    coursePlan.campus = campus;
    clazz.department = department;
    clazz.course = course;
    department.courseGroup = courseGroup;
    teacher.profession = profession;

    form.pageInfo = page;

    form.deleted = false;
    form.statusList = [1, 2];
    plan.deleted = false;
    page.pageSize = 100;

    clazz.year = this.now.year.year;
    clazz.term = this.now.year.term;
    person.id = this.supervisor.person.id;

    this.form = form;
  }

  private created() {
    this.initForm();
  }

  private mounted() {
    this.$nextTick(() => { this.search(); });
  }
}
</script>

<style lang="scss" scoped>
.show-dialog {
  .dialog-title {
    margin: 10px auto 10px 10px;
    font-weight: bold;
  }
  .comment {
    font-size: 14px;
    margin: 8px auto 8px 12px;
    color: red;
  }
  .van-row {
    .van-col {
      text-align: center;
      font-size: 14px;
      height: 40px;
      line-height: 40px;
    }
  }
}
</style>
