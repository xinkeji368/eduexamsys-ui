export const QUESTION_TYPE = {
  CHOICE: '选择题',
  FILL: '填空题',
  JUDGE: '判断题'
};

export const DIFFICULTY_LEVEL = {
  EASY: '简单',
  NORMAL: '一般',
  HARD: '困难'
};

export const EXAM_STATUS = {
  NOT_STARTED: 0,
  IN_PROGRESS: 1,
  ENDED: 2
};

export const USER_ROLE = {
  ADMIN: 'admin',
  TEACHER: 'teacher',
  STUDENT: 'student'
};

export const PAGE_SIZE = 10;
export const PAGE_SIZE_OPTIONS = [10, 20, 50, 100];

export const DATE_FORMAT = 'YYYY-MM-DD';
export const DATETIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';

export default {
  QUESTION_TYPE,
  DIFFICULTY_LEVEL,
  EXAM_STATUS,
  USER_ROLE,
  PAGE_SIZE,
  PAGE_SIZE_OPTIONS,
  DATE_FORMAT,
  DATETIME_FORMAT
};
