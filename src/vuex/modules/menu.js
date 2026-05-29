const state = {
  adminMenu: [
    {
      index: '1',
      title: '考试管理',
      icon: 'icon-kechengbiao',
      content: [
        { item1: '功能介绍', path: '/admin/examDescription' },
        { item2: '考试查询', path: '/admin/selectExam' },
        { item3: '添加考试', path: '/admin/addExam' }
      ]
    },
    {
      index: '2',
      title: '题库管理',
      icon: 'icon-tiku',
      content: [
        { item1: '功能介绍', path: '/admin/answerDescription' },
        { item2: '所有题库', path: '/admin/selectAnswer' },
        { item3: '增加题库', path: '/admin/addAnswer' },
        { path: '/admin/addAnswerChildren' }
      ]
    },
    {
      index: '3',
      title: '成绩查询',
      icon: 'icon-performance',
      content: [
        { item1: '学生成绩查询', path: '/admin/allStudentsGrade' },
        { path: '/admin/grade' },
        { item2: '成绩分段查询', path: '/admin/selectExamToPart' },
        { path: '/admin/scorePart' }
      ]
    },
    {
      index: '4',
      title: '学生管理',
      icon: 'icon-role',
      content: [
        { item1: '学生管理', path: '/admin/studentManage' },
        { item2: '添加学生', path: '/admin/addStudent' }
      ]
    },
    {
      index: '5',
      title: '教师管理',
      icon: 'icon-Userselect',
      content: [
        { item1: '教师管理', path: '/admin/teacherManage' },
        { item2: '添加教师', path: '/admin/addTeacher' }
      ]
    }
  ],
  teacherMenu: [
    {
      index: '1',
      title: '考试管理',
      icon: 'icon-kechengbiao',
      content: [
        { item1: '功能介绍', path: '/teacher/examDescription' },
        { item2: '考试查询', path: '/teacher/selectExam' },
        { item3: '添加考试', path: '/teacher/addExam' }
      ]
    },
    {
      index: '2',
      title: '题库管理',
      icon: 'icon-tiku',
      content: [
        { item1: '功能介绍', path: '/teacher/answerDescription' },
        { item2: '所有题库', path: '/teacher/selectAnswer' },
        { item3: '增加题库', path: '/teacher/addAnswer' },
        { path: '/teacher/addAnswerChildren' }
      ]
    },
    {
      index: '3',
      title: '成绩查询',
      icon: 'icon-performance',
      content: [
        { item1: '学生成绩查询', path: '/teacher/allStudentsGrade' },
        { path: '/teacher/grade' },
        { item2: '成绩分段查询', path: '/teacher/selectExamToPart' },
        { path: '/teacher/scorePart' }
      ]
    },
    {
      index: '4',
      title: '学生管理',
      icon: 'icon-role',
      content: [
        { item1: '学生管理', path: '/teacher/studentManage' },
        { item2: '添加学生', path: '/teacher/addStudent' }
      ]
    },
    {
      index: '5',
      title: '阅卷管理',
      icon: 'icon-edit',
      content: [
        { item1: '选择考试', path: '/teacher/selectExamToGrade' },
        { item2: '批改简答题', path: '/teacher/gradeEssay' }
      ]
    }
  ]
}

const getters = {
  menuByRole: (state) => (role) => {
    switch (role) {
      case '0': return state.adminMenu
      case '1': return state.teacherMenu
      default: return []
    }
  }
}

export default {
  namespaced: true,
  state,
  getters
}
