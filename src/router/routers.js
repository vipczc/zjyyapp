import Main from '@/view/main'
import parentView from '@/components/parent-view'


export const loginRouter = {
  path: '/login',
  name: 'login',
  component: () => import ('@/view/login/login.vue')
}

export const test = {
  path: '/test',
  name: 'test',
  component: () => import ('@/view/test/test.vue')
}

export const page404 = {
  path: '*',
  name: 'error_404',
  component: () => import ('@/view/error-page/404.vue')
}
export const page401 = {
  path: '/401',
  name: 'error_401',
  component: () => import ('@/view/error-page/401.vue')
}
export const page500 = {
  path: '/500',
  name: 'error_500',
  component: () => import ('@/view/error-page/500.vue')
}
// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
  path: '/',
  name: 'main',
  redirect: '/home',
  title: '首页',
  component: Main,
  children: [
    {
      path: 'home',
      name: 'home',
      component: () => import ('@/view/single-page/home')
    },
    {
      path: 'today_work',
      name: 'today_work',
      // component: () => import ('@/view/single-page/today_work/today_work')
      component: resolve => require(['@/view/single-page/today_work/today_work'], resolve)
    },{
      path: 'teacher_comment',
      name: 'teacher_comment',
      component: resolve => require(['@/view/single-page/teacher_comment/teacher_comment'], resolve)
    },{
      path: 'base_comment',
      name: 'base_comment',
      component: resolve => require(['@/view/single-page/base_comment/base_comment'], resolve)
    },{
      path: 'comment',
      name: 'comment',
      component: resolve => require(['@/view/single-page/comment/comment'], resolve)
    },{
      path: 'president',
      name: 'president',
      component: resolve => require(['@/view/single-page/president/president'], resolve)
    },{
      path: 'teacher_train',
      name: 'teacher_train',
      component: resolve => require(['@/view/single-page/teacher_train/teacher_train'], resolve)
    },{
      path: 'activity_detail',
      name: 'activity_detail',
      component: resolve => require(['@/view/single-page/activity_detail/activity_detail'], resolve)
    },{
      path: 'on_rotation',
      name: 'on_rotation',
      component: resolve => require(['@/view/single-page/on_rotation/on_rotation'], resolve)
    },{
      path: 'teacher_introduce',
      name: 'teacher_introduce',
      component: resolve => require(['@/view/single-page/teacher_introduce/teacher_introduce'], resolve)
    },{
      path: 'teacher_merits',
      name: 'teacher_merits',
      component: resolve => require(['@/view/single-page/teacher_merits/teacher_merits'], resolve)
    },{
      path: 'student_survey',
      name: 'student_survey',
      component: resolve => require(['@/view/single-page/student_survey/student_survey'], resolve)
    },{
      path: 'student_train',
      name: 'student_train',
      component: resolve => require(['@/view/single-page/student_train/student_train'], resolve)
    },{
      path: 'skill_center',
      name: 'skill_center',
      component: resolve => require(['@/view/single-page/skill_center/skill_center'], resolve)
    },{
      path: 'student_examine',
      name: 'student_examine',
      component: resolve => require(['@/view/single-page/student_examine/student_examine'], resolve)
    },{
      path: 'teaching_student',
      name: 'teaching_student',
      component: resolve => require(['@/view/single-page/teaching/teaching_student'], resolve)
    },
    {
      path: 'teaching_active',
      name: 'teaching_active',
      component: resolve => require(['@/view/single-page/teaching/teaching_active'], resolve)
    },{
      path: 'active_center',
      name: 'active_center',
      component: resolve => require(['@/view/single-page/skill_center/active_center'], resolve)
    },
  ]
}


export default [
  loginRouter,
  otherRouter,
  test,
  page500,
  page401,
  page404,
];