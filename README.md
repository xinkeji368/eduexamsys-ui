# EduExamSys 学生练习考试系统 - 前端

## 项目简介

EduExamSys 前端是基于 Vue.js 框架开发的在线考试系统客户端，采用 Element UI 组件库构建，提供流畅的用户体验和现代化的界面设计。

## 技术栈

| 技术 | 说明 |
|------|------|
| Vue.js 2.x | 前端框架 |
| Vue Router | 路由管理 |
| Vuex | 状态管理 |
| Element UI | UI 组件库 |
| Axios | HTTP 请求库 |
| ECharts | 图表可视化 |
| SCSS | 样式预处理 |

## 项目结构

```
eduexamsys-ui/
├── src/
│   ├── assets/                 # 静态资源
│   │   ├── img/              # 图片资源
│   │   └── styles/            # 全局样式
│   │       ├── variables.scss # SCSS 变量
│   │       └── global.scss     # 全局样式覆盖
│   ├── components/            # 页面组件
│   │   ├── admin/             # 管理员模块
│   │   │   ├── addTeacher.vue # 添加教师
│   │   │   ├── tacherManage.vue # 教师管理
│   │   │   └── index.vue      # 管理首页
│   │   ├── charts/            # 图表模块
│   │   │   ├── grade.vue      # 成绩统计图
│   │   │   └── scorePart.vue  # 分数段分布图
│   │   ├── common/            # 公共组件
│   │   │   ├── login.vue      # 登录页
│   │   │   ├── register.vue   # 注册页
│   │   │   ├── header.vue     # 顶部导航
│   │   │   └── mainLeft.vue   # 侧边菜单
│   │   ├── student/           # 学生模块
│   │   │   ├── startExam.vue  # 开始考试
│   │   │   ├── myExam.vue     # 我的考试
│   │   │   ├── examMsg.vue    # 考试详情
│   │   │   ├── answer.vue     # 答题界面
│   │   │   ├── answerScore.vue # 成绩展示
│   │   │   ├── scoreTable.vue # 成绩查询
│   │   │   └── message.vue    # 留言反馈
│   │   └── teacher/           # 教师模块
│   │       ├── addExam.vue    # 添加考试
│   │       ├── selectExam.vue  # 考试查询
│   │       ├── addAnswer.vue   # 添加题库
│   │       ├── studentManage.vue # 学生管理
│   │       └── allStudentsGrade.vue # 学生成绩
│   ├── router/                # 路由配置
│   ├── utils/                 # 工具函数
│   │   ├── request.js         # Axios 封装
│   │   ├── storage.js         # 本地存储
│   │   ├── debounce.js        # 防抖函数
│   │   ├── date.js            # 日期格式化
│   │   └── constants.js       # 常量定义
│   ├── vuex/                  # 状态管理
│   ├── App.vue                # 根组件
│   └── main.js                # 入口文件
├── config/                    # 项目配置
├── static/                    # 静态资源
├── .eslintrc.js              # ESLint 配置
├── .prettierrc.js            # Prettier 配置
└── package.json               # 依赖配置
```

## 功能模块

### 学生端

| 功能 | 说明 |
|------|------|
| 在线考试 | 选择题、填空题、判断题实时答题 |
| 成绩查询 | 查看历史考试成绩 |
| 错题复习 | 查看答题解析 |
| 留言反馈 | 与教师互动交流 |
| 密码修改 | 账户安全管理 |

### 教师端

| 功能 | 说明 |
|------|------|
| 考试管理 | 创建、编辑、删除考试 |
| 题库管理 | 添加选择题、填空题、判断题 |
| 学生管理 | 查看学生信息 |
| 成绩查看 | 查看班级学生成绩 |
| 成绩统计 | 分数段分布图表 |

### 管理端

| 功能 | 说明 |
|------|------|
| 教师管理 | 添加、编辑、删除教师账户 |
| 系统设置 | 系统基础配置 |

## 快速开始

### 环境要求

- Node.js 12+
- npm 或 yarn

### 安装依赖

```bash
npm install
# 或
yarn install
```

### 开发模式

```bash
npm run serve
```

### 生产打包

```bash
npm run build
```

## 样式规范

### SCSS 变量

项目使用统一的 SCSS 变量系统，定义在 `src/assets/styles/variables.scss`：

```scss
// 主色调
$primary-color: #1890ff;
$primary-hover: #40a9ff;

// 文字颜色
$text-color: #303133;
$text-color-secondary: #606266;

// 间距系统
$spacing-sm: 8px;
$spacing-md: 16px;
$spacing-lg: 24px;

// 圆角
$border-radius-small: 4px;
$border-radius-medium: 8px;

// 阴影
$shadow-light: 0 2px 8px rgba(0, 0, 0, 0.08);
$shadow-medium: 0 4px 16px rgba(0, 0, 0, 0.12);
```

### 命名规范

- 组件样式使用 scoped 作用域
- 使用 SCSS 嵌套语法
- 优先使用变量定义的值
- 避免使用 !important

## 项目优化记录

### 2026-05 优化内容

#### 代码规范

- **ESLint + Prettier**：统一代码格式和风格
- **工具函数封装**：storage、debounce、date、request、constants
- **组件结构规范化**：清晰的组件拆分

#### 性能优化

- **删除冗余代码**：移除 console.log 和重复代码
- **路由懒加载**：优化首屏加载速度
- **样式优化**：避免不必要的重渲染

#### 视觉美化

- **统一配色**：#1890ff 主色调
- **现代化卡片设计**：阴影、圆角、hover 动效
- **响应式布局**：适配不同屏幕尺寸
- **过渡动画**：流畅的交互体验

#### 已优化组件

| 组件 | 优化内容 |
|------|----------|
| login.vue | 渐变背景、卡片动画、响应式布局 |
| header.vue | 导航样式优化、hover 动效 |
| mainLeft.vue | 侧边栏样式统一、菜单高亮 |
| startExam.vue | 试卷卡片、hover 效果、搜索框 |
| studentManage.vue | 表格样式、按钮样式统一 |
| addExam.vue | 表单样式优化、按钮动效 |
| addAnswerChildren.vue | 表单布局、间距统一 |
| answerScore.vue | 成绩展示动画优化 |

## 浏览器支持

| 浏览器 | 版本 |
|--------|------|
| Chrome | 60+ |
| Firefox | 60+ |
| Safari | 12+ |
| Edge | 79+ |

## License

Private Project - All Rights Reserved
