import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('@/components/common/login')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/components/common/register')
  },
  {
    path: '/admin',
    component: () => import('@/components/admin/index'),
    meta: { roles: ['0'] },
    children: [
      {
        path: '',
        name: 'adminHome',
        component: () => import('@/components/common/hello')
      },
      {
        path: 'grade',
        name: 'adminGrade',
        component: () => import('@/components/charts/grade')
      },
      {
        path: 'selectExamToPart',
        name: 'selectExamToPart',
        component: () => import('@/components/teacher/selectExamToPart')
      },
      {
        path: 'scorePart',
        name: 'scorePart',
        component: () => import('@/components/charts/scorePart')
      },
      {
        path: 'allStudentsGrade',
        name: 'allStudentsGrade',
        component: () => import('@/components/teacher/allStudentsGrade')
      },
      {
        path: 'examDescription',
        name: 'examDescription',
        component: () => import('@/components/teacher/examDescription')
      },
      {
        path: 'selectExam',
        name: 'selectExam',
        component: () => import('@/components/teacher/selectExam')
      },
      {
        path: 'addExam',
        name: 'addExam',
        component: () => import('@/components/teacher/addExam')
      },
      {
        path: 'answerDescription',
        name: 'answerDescription',
        component: () => import('@/components/teacher/answerDescription')
      },
      {
        path: 'selectAnswer',
        name: 'selectAnswer',
        component: () => import('@/components/teacher/selectAnswer')
      },
      {
        path: 'addAnswer',
        name: 'addAnswer',
        component: () => import('@/components/teacher/addAnswer')
      },
      {
        path: 'addAnswerChildren',
        name: 'addAnswerChildren',
        component: () => import('@/components/teacher/addAnswerChildren')
      },
      {
        path: 'studentManage',
        name: 'studentManage',
        component: () => import('@/components/teacher/studentManage')
      },
      {
        path: 'addStudent',
        name: 'addStudent',
        component: () => import('@/components/teacher/addStudent')
      },
      {
        path: 'teacherManage',
        name: 'teacherManage',
        component: () => import('@/components/admin/teacherManage')
      },
      {
        path: 'addTeacher',
        name: 'addTeacher',
        component: () => import('@/components/admin/addTeacher')
      },
      {
        path: 'selectExamToGrade',
        name: 'selectExamToGrade',
        component: () => import('@/components/teacher/selectExamToGrade')
      },
      {
        path: 'gradeEssay',
        name: 'gradeEssay',
        component: () => import('@/components/teacher/gradeEssay')
      },
      {
        path: 'addEssayQuestion',
        name: 'addEssayQuestion',
        component: () => import('@/components/teacher/addEssayQuestion')
      }
    ]
  },
  {
    path: '/teacher',
    component: () => import('@/components/admin/index'),
    meta: { roles: ['1'] },
    children: [
      {
        path: '',
        name: 'teacherHome',
        component: () => import('@/components/common/hello')
      },
      {
        path: 'grade',
        name: 'teacherGrade',
        component: () => import('@/components/charts/grade')
      },
      {
        path: 'selectExamToPart',
        name: 'teacherSelectExamToPart',
        component: () => import('@/components/teacher/selectExamToPart')
      },
      {
        path: 'scorePart',
        name: 'teacherScorePart',
        component: () => import('@/components/charts/scorePart')
      },
      {
        path: 'allStudentsGrade',
        name: 'teacherAllStudentsGrade',
        component: () => import('@/components/teacher/allStudentsGrade')
      },
      {
        path: 'examDescription',
        name: 'teacherExamDescription',
        component: () => import('@/components/teacher/examDescription')
      },
      {
        path: 'selectExam',
        name: 'teacherSelectExam',
        component: () => import('@/components/teacher/selectExam')
      },
      {
        path: 'addExam',
        name: 'teacherAddExam',
        component: () => import('@/components/teacher/addExam')
      },
      {
        path: 'answerDescription',
        name: 'teacherAnswerDescription',
        component: () => import('@/components/teacher/answerDescription')
      },
      {
        path: 'selectAnswer',
        name: 'teacherSelectAnswer',
        component: () => import('@/components/teacher/selectAnswer')
      },
      {
        path: 'addAnswer',
        name: 'teacherAddAnswer',
        component: () => import('@/components/teacher/addAnswer')
      },
      {
        path: 'addAnswerChildren',
        name: 'teacherAddAnswerChildren',
        component: () => import('@/components/teacher/addAnswerChildren')
      },
      {
        path: 'studentManage',
        name: 'teacherStudentManage',
        component: () => import('@/components/teacher/studentManage')
      },
      {
        path: 'addStudent',
        name: 'teacherAddStudent',
        component: () => import('@/components/teacher/addStudent')
      },
      {
        path: 'selectExamToGrade',
        name: 'teacherSelectExamToGrade',
        component: () => import('@/components/teacher/selectExamToGrade')
      },
      {
        path: 'gradeEssay',
        name: 'teacherGradeEssay',
        component: () => import('@/components/teacher/gradeEssay')
      },
      {
        path: 'addEssayQuestion',
        name: 'teacherAddEssayQuestion',
        component: () => import('@/components/teacher/addEssayQuestion')
      }
    ]
  },
  {
    path: '/student',
    component: () => import('@/components/student/index'),
    meta: { roles: ['2'] },
    children: [
      {
        path: '',
        name: 'studentHome',
        component: () => import('@/components/student/myExam')
      },
      {
        path: 'startExam',
        name: 'startExam',
        component: () => import('@/components/student/startExam')
      },
      {
        path: 'manager',
        name: 'studentManager',
        component: () => import('@/components/student/manager')
      },
      {
        path: 'examMsg',
        name: 'examMsg',
        component: () => import('@/components/student/examMsg')
      },
      {
        path: 'message',
        name: 'studentMessage',
        component: () => import('@/components/student/message')
      },
      {
        path: 'studentScore',
        name: 'studentScore',
        component: () => import('@/components/student/answerScore')
      },
      {
        path: 'scoreTable',
        name: 'scoreTable',
        component: () => import('@/components/student/scoreTable')
      },
      {
        path: 'essayScore',
        name: 'essayScore',
        component: () => import('@/components/student/essayScore')
      }
    ]
  },
  {
    path: '/answer',
    name: 'answer',
    component: () => import('@/components/student/answer')
  }
]

const router = new Router({
  mode: 'history',
  routes
})

export default router
