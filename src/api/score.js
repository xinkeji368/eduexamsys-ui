import { get, post } from '@/utils/request'

export function getScores(params) {
  return get('/api/scores', params)
}

export function getScoresByStudent(studentId, params) {
  return get(`/api/scores/student/${studentId}`, params)
}

export function getAllScoresByStudent(studentId) {
  return get(`/api/scores/student/${studentId}/all`)
}

export function getScoresByExam(examCode) {
  return get(`/api/scores/exam/${examCode}`)
}

export function addScore(data) {
  return post('/api/scores', data)
}
