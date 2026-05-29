import { get, post, put } from '@/utils/request'

export function getAllAnswers(params) {
  return get('/api/answers', params)
}

export function getAnswersByExamAndStudent(examCode, studentId, questionType) {
  const params = questionType ? { questionType } : {}
  return get(`/api/answers/exam/${examCode}/student/${studentId}`, params)
}

export function getEssayAnswers(params) {
  return get('/api/answers/essay', params)
}

export function addAnswer(data) {
  return post('/api/answers', data)
}

export function updateAnswer(data) {
  return put('/api/answers', data)
}

export function gradeEssayAnswer(id, score, teacherComment) {
  const params = { score }
  if (teacherComment) params.teacherComment = teacherComment
  return put(`/api/answers/${id}/grade`, null, { params })
}
