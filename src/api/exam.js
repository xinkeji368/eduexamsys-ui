import { get, post, put, del } from '@/utils/request'

export function getExams(params) {
  return get('/api/exams', params)
}

export function getExamById(examCode) {
  return get(`/api/exams/${examCode}`)
}

export function getLastPaperId() {
  return get('/api/exams/lastPaperId')
}

export function addExam(data) {
  return post('/api/exams', data)
}

export function updateExam(data) {
  return put('/api/exams', data)
}

export function deleteExam(examCode) {
  return del(`/api/exams/${examCode}`)
}
