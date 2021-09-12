<template>
  <div>
    <van-dialog title="创建听课计划" v-model="visible" show-cancel-button :before-close="createPlanAction">
      <van-cell-group>
        <van-cell title="听课类型：" :value="form.listenTypeName" center @click="planTypeItem = !typeDisabled" />
        <van-cell title="听课次数：" center>
          <van-stepper :disabled="numDisabled" v-model="form.totalListenNum" integer :min="min" :max="max" />
        </van-cell>
      </van-cell-group>
    </van-dialog>

    <PlanTypeSelect v-model="form.listenType" :totalListenNum.sync="form.totalListenNum" :show.sync="planTypeItem" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';

import { PlanTypeSelect } from '@/components/form';

import { CoursePlanExec, CoursePlan, CourseGroup } from '@/domains/course';
import { RoundExec } from '@/domains/round';
import { Getter } from 'vuex-class';
import { Supervisor } from '@/domains/supervisor';
import { Plan } from '@/domains/work';
import { Toast, Dialog } from 'vant';
import { Person } from '@/domains/person';
import { isNullOrUndefined } from 'util';
import { Priority, PriorityType } from '@/domains/priority';
import { savePlanApi } from '@/api/work/PlanApi';
import { Campus } from '@/domains/campus';

@Component({
  name: 'CourseAddPage',
  components: {
    PlanTypeSelect,
  },
})
export default class CourseAddPage extends Vue {
  /** 轮次执行列表 */
  @Getter private roundExecs: RoundExec[];

  /** 督导 */
  @Getter private supervisor: Supervisor;

  /** 表单 */
  private form: Plan = new Plan();

  /** 显示 */
  private visible: boolean = false;

  /** 禁用听课类型 */
  private typeDisabled: boolean = false;

  /** 禁用听课次数 */
  private numDisabled: boolean = false;

  /** 上课信息 */
  private coursePlanExec: CoursePlanExec = null;

  /** 有效轮次 */
  private effectiveRoundExecs: RoundExec[] = [];

  /** 类型选择选项 */
  private planTypeItem: boolean = false;

  /** 最大值 */
  get max() { return this.form.listenType === 2 ? 3 : 1; }

  /** 最小值 */
  get min() { return this.form.listenType === 2 ? 2 : 1; }

  /** 禁用 */
  get enabled(): boolean {
    // 开放选课
    if (true) {
      return true;
    }
    
    let result: boolean = false;

    // 学科
    const courseGroup: CourseGroup = this.coursePlanExec.clazz.department.courseGroup;

    // 校区
    const campus: Campus = this.coursePlanExec.campus;

    // 本学科课程
    result = this.supervisor.courseGroup.id === courseGroup.id ? true : result;

    // 可选学科
    result = this.effectiveRoundExecs.some((roundExec: RoundExec): boolean => {
      if (roundExec.roundPlan.courseGroup.id === courseGroup.id) {
        return true;
      }
    }) ? true : result;

    // // 珠海规则
    // if (!isNullOrUndefined(campus) && !isNullOrUndefined(campus.id) && campus.id === 3) {
    //   result = [24, 25].indexOf(this.supervisor.courseGroup.id) > -1 && [24, 25].indexOf(courseGroup.id) > -1 ? true : result;
    //   result = [26, 28].indexOf(this.supervisor.courseGroup.id) > -1 && [26, 28].indexOf(courseGroup.id) > -1 ? true : result;
    // }
    // 珠海规则  // todo 于2019/9/4 杜老師：选课规则：南校区按督导所在学科选课；东校区理工、文社可互选；珠海校区和医科选课不设限。
    if (!isNullOrUndefined(campus) && !isNullOrUndefined(campus.id) && campus.id === 3) {
      result = true;
    }
    // 东校区
    if (!isNullOrUndefined(campus) && !isNullOrUndefined(campus.id) && campus.id === 4) {
      result = [24, 25].indexOf(this.supervisor.courseGroup.id) > -1 && [24, 25].indexOf(courseGroup.id) > -1 ? true : result;
      result = [26, 28].indexOf(this.supervisor.courseGroup.id) > -1 && [26, 28].indexOf(courseGroup.id) > -1 ? true : result;
    }
    // 综合科规则(只要是综合科的课程 所有督导都可以选)
    result = [29, 27].indexOf(courseGroup.id) > -1 ? true : result;

    return result;
  }

  @Watch('roundExecs')
  private onRoundExecsChange(value: RoundExec[]) {
    if (!isNullOrUndefined(value)) {
      // 轮次执行
      const roundExec: RoundExec = this.findCourseGroupRoundExec();
      // 可督导轮次列表
      this.listCanSupervisorRoundExec(roundExec);
    }
  }

  /** 会话事件 */
  private createPlanAction(action: string, done: () => void) {
    if (action === 'confirm') {
      if (!this.rules()) { return; }
      const load = Toast.loading({ mask: true, message: '正在创建听课计划，请稍等。', duration: 0 });
      savePlanApi(this.form).then((result: any) => {
        load.clear();
        Toast.success(result);
        setTimeout(() => {
          done();
          this.$emit('refresh');
        }, 1000);
      }).catch(() => {
        load.clear();
        done();
      });
    } else {
      done();
    }
  }

  /** 校验 */
  private rules() {
    if (isNullOrUndefined(this.form.listenType)) {
      Toast.fail('请选择听课类型。');
      return false;
    }
    if (isNullOrUndefined(this.form.totalListenNum)) {
      Toast.fail('请选择听课次数。');
      return false;
    }
    return true;
  }

  /** 初始化听课计划 */
  private initPlan(): void {
    const plan: Plan = new Plan();
    this.setSupervisor(plan);
    this.setCourse(plan);
    this.setClazzPriority(plan);
    this.setTeacherPriority(plan);
    if (!this.setRoundExec(plan)) {
      Toast.fail('无法获取课程开课单位所在学科的轮次执行信息，暂时无法进行选课。');
      return;
    }

    this.typeDisabled = !isNullOrUndefined(plan.listenType);
    this.numDisabled = !isNullOrUndefined(plan.totalListenNum);
    plan.listenType = isNullOrUndefined(plan.listenType) ? 1 : plan.listenType;
    plan.totalListenNum = isNullOrUndefined(plan.totalListenNum) ? 1 : plan.totalListenNum;

    if (this.enabled) {
      this.form = plan;
      this.visible = true;
    } else {
      Toast.fail('抱歉！您暂时不能选择此课程进行督导。');
    }
  }

  /** 设置督导 */
  private setSupervisor(plan: Plan): void {
    const supervisor: Supervisor = new Supervisor();
    const person: Person = new Person();
    supervisor.person = person;
    plan.supervisor = supervisor;
  }

  /** 设置课程 */
  private setCourse(plan: Plan): void {
    const coursePlanExec: CoursePlanExec = new CoursePlanExec();
    const coursePlan: CoursePlan = new CoursePlan();
    const teacher: Person = new Person();
    plan.coursePlan = coursePlanExec;
    coursePlanExec.clazz = coursePlan;
    coursePlanExec.teacher = teacher;

    coursePlanExec.id = this.coursePlanExec.id;
    coursePlan.id = this.coursePlanExec.clazz.id;
    coursePlan.year = this.coursePlanExec.clazz.year;
    coursePlan.term = this.coursePlanExec.clazz.term;
  }

  /** 设置教学班优先 */
  private setClazzPriority(plan: Plan): void {
    if (!isNullOrUndefined(this.coursePlanExec.clazz.priority)) {
      const priority: Priority = new Priority();
      priority.id = this.coursePlanExec.clazz.priority.id;
      plan.coursePlan.clazz.priority = priority;
      this.setPriorityType(plan, priority);
    }
  }

  /** 设置教师优先 */
  private setTeacherPriority(plan: Plan): void {
    if (this.coursePlanExec.teacher) {
      plan.coursePlan.teacher.id = this.coursePlanExec.teacher.id;
      if (!isNullOrUndefined(this.coursePlanExec.teacher.priority)) {
        const priority: Priority = new Priority();
        priority.id = this.coursePlanExec.teacher.priority.id;
        plan.coursePlan.teacher.priority = priority;
        this.setPriorityType(plan, priority);
      }
    }
  }

  /** 设置优先选项 */
  private setPriorityType(plan: Plan, priority: Priority): void {
    const type: PriorityType = priority.priorityOption;
    if (!isNullOrUndefined(type)) {
      if (!isNullOrUndefined(type.supervisorCourseType)) {
        if (isNullOrUndefined(plan.listenType) || type.supervisorCourseType > plan.listenType) {
          plan.listenType = type.supervisorCourseType;
        }
      }
      if (!isNullOrUndefined(type.totalListenNum)) {
        if (isNullOrUndefined(plan.totalListenNum) || type.totalListenNum > plan.totalListenNum) {
          plan.totalListenNum = type.totalListenNum;
        }
      }
    }
  }

  /** 设置轮次执行 */
  private setRoundExec(plan: Plan): boolean {
    return this.roundExecs.some((roundExec: RoundExec): boolean => {
      if (roundExec.roundPlan.courseGroup.id === this.coursePlanExec.clazz.department.courseGroup.id) {
        plan.roundExec = new RoundExec();
        plan.roundExec.id = roundExec.id;
        plan.roundExec.loop = roundExec.loop;
        return true;
      }
    });
  }

  /** 获取学科轮次执行 */
  private findCourseGroupRoundExec() {
    let roundExec: RoundExec;
    this.roundExecs.some((data: RoundExec): boolean => {
      if (data.roundPlan.courseGroup.id === this.supervisor.courseGroup.id) {
        roundExec = data;
        return true;
      }
    });
    return roundExec;
  }

  /** 获取可督导轮次执行列表 */
  private listCanSupervisorRoundExec(roundExec: RoundExec): void {
    this.effectiveRoundExecs = [];
    // 过滤医科
    if (roundExec.roundPlan.courseGroup.id === 27) { return; }
    this.roundExecs.forEach((data: RoundExec) => {
      if (data.roundPlan.courseGroup.id !== 27 && data.loop <= roundExec.loop && data.roundPlan.order < roundExec.roundPlan.order) {
        this.effectiveRoundExecs.push(data);
      }
    });
  }

  /** 检查课程信息 */
  private courseCheck(): Promise<void> {
    return new Promise((resolve, reject) => {
      const coursePlanExec = this.coursePlanExec;
      let message: string = ' ';
      if (isNullOrUndefined(coursePlanExec.campus) || isNullOrUndefined(coursePlanExec.campus.id)) { message += '校区 '; }
      if (isNullOrUndefined(coursePlanExec.startWeeks) || isNullOrUndefined(coursePlanExec.endWeeks)) { message += '上课周 '; }
      if (isNullOrUndefined(coursePlanExec.week)) { message += '上课星期 '; }
      if (isNullOrUndefined(coursePlanExec.startClass) || isNullOrUndefined(coursePlanExec.endClass)) { message += '上课节 '; }
      if (isNullOrUndefined(coursePlanExec.classrome) && isNullOrUndefined(coursePlanExec.academicBuilding)) { message += '上课地点 '; }
      if (message !== ' ') {
        Dialog.confirm({
          title: '警告！',
          message: '此课程信息的' + message + '信息存在缺失，确定继续？',
        }).then(() => {
          resolve();
        }).catch(() => { return; });
      } else {
        resolve();
      }
    });
  }

  /** handler */
  private handler(data: CoursePlanExec) {
    if (isNullOrUndefined(this.roundExecs)) {
      Toast.fail('暂未获取到轮次信息，请稍后再试。');
      return;
    }
    this.coursePlanExec = data;
    this.courseCheck().then(() => {
      this.initPlan();
    });
  }

  private mounted() {
    this.$emit('handler', this.handler);
  }
}
</script>
