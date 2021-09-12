<template>
  <div class="app-container">
    <!-- 头 -->
    <van-nav-bar title="选课" class="zsu-nav-bar header-lock">
      <van-icon name="search" slot="right" @click="showSearch = true" />
    </van-nav-bar>

    <div class="main-box">
      <!-- 列表 -->
      <van-collapse v-model="activeCourse" v-for="data in datas" :key="data.id" accordion class="datas">
        <van-collapse-item :name="data.id">
          <div slot="title">
            <span class="title">{{ data.clazz.course.name }}</span>

            <van-button type="primary" size="small" class="status-button" plain @click.stop="planCreateHandler(data)">我要听课</van-button>
            <van-button v-show="data.clazz.courseChangeList.length > 0" type="danger" size="small" class="status-button" plain @click.stop="courseChangeHandler(data.clazz.courseChangeList)">调停</van-button>

            <div class="info">
              <p><span class="title-key">校区: </span>{{ data.campus.name }}</p>
              <p><span class="title-key">单位: </span>{{ data.clazz.department.name }}</p>
              <p><span class="title-key">上课节: </span>{{ data.classesValue }}</p>
              <p><span class="title-key">上课课室: </span>{{ data.classRoomValue }}</p>
              <van-row class="info-double-box">
                <van-col span="12"><span class="title-key">上课周: </span>{{ data.weeksValue }}</van-col>
                <van-col span="12"><span class="title-key">上课星期: </span>{{ data.weekValue }}</van-col>
              </van-row>
              <van-row class="info-double-box">
                <van-col span="12"><span class="title-key">教师: </span>{{ data.teacher.name }}</van-col>
                <van-col span="12"><span class="title-key">职称: </span>{{ data.teacher.profession.name }}</van-col>
              </van-row>
            </div>
          </div>
          <div class="detailed-box">
            <p><span class="title-key">课程代码: </span>{{ data.clazz.course.id }}</p>
            <p><span class="title-key">教学班号: </span>{{ data.clazz.id }}</p>
            <p><span class="title-key">教师优先: </span>{{ data.teacher.priority.priorityOption.name }}</p>
            <p><span class="title-key">课程优先: </span>{{ data.clazz.priority.priorityOption.name }}</p>
            <p><span class="title-key">课程类别: </span>{{ data.clazz.courseType }}</p>
            <p><span class="title-key">学分: </span>{{ data.clazz.credit }}</p>
            <p><span class="title-key">学时: </span>{{ data.clazz.hours }}</p>
            <p><span class="title-key">教学班上课时间地点: </span>{{ data.clazz.address }}</p>
            <p><span class="title-key">修读对象: </span>{{ data.clazz.range }}</p>
          </div>
        </van-collapse-item>
      </van-collapse>
      <van-pagination v-model="form.pageInfo.pageNum" :total-items="form.pageInfo.total" :items-per-page="form.pageInfo.pageSize" :show-page-size="3" force-ellipses @change="search" />
    </div>

    <!-- 查询 -->
    <van-popup v-model="showSearch" position="right" :lazy-render="false" :close-on-click-overlay="false" class="show70">
      <van-nav-bar title="查询" class="zsu-nav-bar" />
      <van-cell-group>
        <van-cell title="校区" clickable @click="campusItem = true" :value="form.coursePlan.campus.name" />
        <van-cell title="学科" clickable @click="courseGroupItem = true" :value="form.coursePlan.clazz.department.courseGroup.name" />
        <van-cell title="单位" clickable @click="departmentItem = true" :value="form.coursePlan.clazz.department.name" />
        <InputItem v-model="form.coursePlan.clazz.course.name" align="right" title="课程名" />
        <InputItem v-model="form.coursePlan.weeks" type="number" align="right" title="周" />
        <van-cell title="星期" clickable @click="weekItem = true" :value="form.coursePlan.week" />
        <InputItem v-model="form.coursePlan.classes" type="number" align="right" title="节次" />
        <InputItem v-model="form.coursePlan.address" align="right" title="上课地点" />
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
    <CampusSelect v-model="form.coursePlan.campus" :show.sync="campusItem" />
    <CourseGroupSelect v-model="form.coursePlan.clazz.department.courseGroup" :show.sync="courseGroupItem" />
    <DepartmentSelect v-model="form.coursePlan.clazz.department" :show.sync="departmentItem" />
    <WeekSelect v-model="form.coursePlan.week" :show.sync="weekItem" />

    <!-- 选课组件 -->
    <CourseAddPage v-on:refresh="search" v-on:handler="(fun) => { planCreateHandler = fun }" />

    <!-- 调停课组件 -->
    <CourseChangeDialog v-on:handler="(fun) => { courseChangeHandler = fun }" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter } from 'vuex-class';

import CourseAddPage from './add.vue';
import { InputItem, CampusSelect, CourseGroupSelect, DepartmentSelect, WeekSelect, TemplateSelect } from '@/components/form';
import { CourseChangeDialog } from '@/components/course';

import { Now } from '@/domains/date';
import { Supervisor } from '@/domains/supervisor';
import { Plan } from '@/domains/work';
import { CoursePlanExec, CoursePlan, Course, CourseGroup, CourseChange } from '@/domains/course';
import { Department } from '@/domains/department';
import { Person, Profession } from '@/domains/person';
import { Campus } from '@/domains/campus';
import { Page } from '@/domains/page';
import { listCoursePlanExecApi } from '@/api/course/CourseApi';
import { isNullOrUndefined } from 'util';
import { Toast } from 'vant';

@Component({
  name: 'CoursePage',
  components: {
    CourseAddPage,
    InputItem,
    CampusSelect,
    CourseGroupSelect,
    DepartmentSelect,
    WeekSelect,
    TemplateSelect,
    CourseChangeDialog,
  },
})
export default class CoursePage extends Vue {
  /** 当前学年 */
  @Getter private now: Now;

  /** 督导 */
  @Getter private supervisor: Supervisor;

  /** 查询表单 */
  private form: Plan = null;

  private datas: CoursePlanExec[] = [];

  private activeCourse: any = null;

  private showSearch: boolean = false;
  private campusItem: boolean = false;
  private courseGroupItem: boolean = false;
  private departmentItem: boolean = false;
  private weekItem: boolean = false;

  private planCreateHandler: (data: CoursePlanExec) => void = null;
  private courseChangeHandler: (datas: CourseChange[]) => void = null;

  /** 查询 */
  private search() {
    if (!this.rules()) { return; }
    const load = Toast.loading({ mask: true, message: '正在查询上课信息，请稍等。', duration: 0 });
    this.datas = [];
    listCoursePlanExecApi(this.form).then((result: any) => {
      this.form.pageInfo.setPage(result);
      const list: CoursePlanExec[] = CoursePlanExec.builds(result.list);
      this.showSearch = false;
      this.datas = list;
      load.clear();
    }).catch(() => {
      load.clear();
    });
  }

  /** 校验 */
  private rules(): boolean {
    if (isNullOrUndefined(this.form.coursePlan.clazz.year)) {
      Toast.fail('请设置学年参数。');
      return false;
    }
    if (isNullOrUndefined(this.form.coursePlan.clazz.term)) {
      Toast.fail('请设置学期参数。');
      return false;
    }
    if (isNullOrUndefined(this.form.coursePlan.clazz.department.courseGroup.id)) {
      Toast.fail('请设置学科参数。');
      return false;
    }
    return true;
  }

  /** 初始化表单 */
  private initForm(): void {
    const form: Plan = new Plan();
    const coursePlan: CoursePlanExec = new CoursePlanExec();
    const clazz: CoursePlan = new CoursePlan();
    const course: Course = new Course();
    const department: Department = new Department();
    const courseGroup: CourseGroup = new CourseGroup();
    const teacher: Person = new Person();
    const profession: Profession = new Profession();
    const campus: Campus = new Campus();
    const page: Page = new Page();

    form.coursePlan = coursePlan;
    form.pageInfo = page;
    coursePlan.clazz = clazz;
    coursePlan.teacher = teacher;
    coursePlan.campus = campus;
    clazz.course = course;
    clazz.department = department;

    department.courseGroup = courseGroup;
    teacher.profession = profession;

    form.searchType = 0;
    clazz.year = this.now.year.year;
    clazz.term = this.now.year.term;
    courseGroup.id = this.supervisor.courseGroup.id;
    courseGroup.name = this.supervisor.courseGroup.name;
    campus.id = this.supervisor.campus.id;
    campus.name = this.supervisor.campus.name;

    this.form = form;
  }

  private created(): void {
    this.initForm();
  }

  private mounted(): void {
    this.$nextTick(() => { this.search(); });
  }
}
</script>

<style lang="scss" scoped>
</style>
