<template>
  <div class="app-container">
    <!-- 头 -->
    <van-nav-bar title="听课记录" class="zsu-nav-bar header-lock">
      <van-icon name="search" slot="right" @click="showSearch = true" />
    </van-nav-bar>

    <div class="main-box">
      <!-- 列表 -->
      <van-collapse v-model="activeRecord" v-for="data in datas" :key="data.id" accordion class="datas">
        <van-collapse-item :name="data.id">
          <div slot="title">
            <span class="title">{{ data.plan.coursePlan.clazz.course.name }}</span>
            <van-button :type="getButtonType(data.status)" size="small" class="status-button" plain @click.stop="getRecordButtonClick(data)">{{ data.statusValue }}</van-button>
            <div class="info">
              <p>{{ `档案编号: ${data.id}` }}</p>
              <van-row class="info-double-box">
                <van-col span="12">{{ `教师: ${data.plan.coursePlan.teacher.name}` }}</van-col>
                <van-col span="12">{{ `职称: ${data.plan.coursePlan.teacher.profession.name}` }}</van-col>
              </van-row>
              <van-row class="info-double-box">
                <van-col span="12" v-if="data.useTime">{{ `用时: ${data.useTime}` }}</van-col>
                <van-col span="12" v-if="data.confirmTimeFormat">{{ `提交时间: ${data.confirmTimeFormat}` }}</van-col>
              </van-row>
            </div>
          </div>
          <div class="detailed-box">
            <p>{{ `课程代码: ${data.plan.coursePlan.clazz.course.id}` }}</p>
            <p>{{ `教学班号: ${data.plan.coursePlan.clazz.id}` }}</p>
            <p>{{ `开课单位: ${data.plan.coursePlan.clazz.department.name}` }}</p>
            <p>{{ `上课周: ${data.plan.coursePlan.weeksValue}` }}</p>
            <p>{{ `上课星期: ${data.plan.coursePlan.weekValue}` }}</p>
            <p>{{ `上课节: ${data.plan.coursePlan.classesValue}` }}</p>
            <p>{{ `上课课室: ${data.plan.coursePlan.classRoomValue}` }}</p>
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

    <!-- 查询组件 -->
    <CampusSelect v-model="form.plan.coursePlan.campus" :show.sync="campusItem" />
    <CourseGroupSelect v-model="form.plan.coursePlan.clazz.department.courseGroup" :show.sync="courseGroupItem" />
    <DepartmentSelect v-model="form.plan.coursePlan.clazz.department" :show.sync="departmentItem" />
    <WeekSelect v-model="form.plan.coursePlan.week" :show.sync="weekItem" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter } from 'vuex-class';

import { InputItem, CampusSelect, CourseGroupSelect, DepartmentSelect, WeekSelect } from '@/components/form';

import { Record, Plan } from '@/domains/work';
import { Now } from '@/domains/date';
import { Supervisor, SupervisorGroup } from '@/domains/supervisor';
import { Person, Profession } from '@/domains/person';
import { CourseGroup, CoursePlanExec, CoursePlan, Course } from '@/domains/course';
import { Department } from '@/domains/department';
import { Campus } from '@/domains/campus';
import { Page } from '@/domains/page';
import { listRecordApi } from '@/api/work/RecordApi';
import { isNullOrUndefined } from 'util';
import { Toast } from 'vant';

@Component({
  name: 'RecordPage',
  components: {
    InputItem,
    CampusSelect,
    CourseGroupSelect,
    DepartmentSelect,
    WeekSelect,
  },
})
export default class RecordPage extends Vue {
  @Getter private now: Now;
  @Getter private supervisor: Supervisor;

  private form: Record = null;

  private datas: Record[] = [];

  private activeRecord: any = null;

  private showSearch: boolean = false;
  private campusItem: boolean = false;
  private courseGroupItem: boolean = false;
  private departmentItem: boolean = false;
  private weekItem: boolean = false;

  /** 查询 */
  private search() {
    if (!this.rules()) { return; }
    const load = Toast.loading({ mask: true, message: '正在查询听课记录，请稍等。', duration: 0 });
    listRecordApi(this.form).then((result: any) => {
      this.form.pageInfo.setPage(result);
      const list: Record[] = Record.builds(result.list);
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

  /** 获取按钮类型 */
  private getButtonType(status: number) {
    if (isNullOrUndefined(status)) { return 'default'; }
    switch (status) {
      case 1: return 'default';
      case 2: return 'warning';
      case 3: return 'primary';
      case 4: return 'danger';
      case 5: return 'default';
      default: return 'default';
    }
  }

  /** 获取按钮点击事件 */
  private getRecordButtonClick(record: Record) {
    if (record.status) {
      this.showTemplateDialog(record);
    }
  }

  /** 显示档案 */
  private showTemplateDialog(record: Record): void {
    const path: any = { name: 'TemplatePage', params: record };
    this.$router.push(path);
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

    form.orderBy = 'confirmTime';
    form.orderRule = 'DESC';
    form.deleted = false;
    form.statusList = [2, 3, 4];
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
