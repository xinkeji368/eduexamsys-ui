import { get, post, put, del } from '@/utils/request'

export function getMultiQuestions(params) {
  return get('/api/questions/multi', params)
}

export function getMultiQuestionById(questionId) {
  return get(`/api/questions/multi/${questionId}`)
}

export function getMultiQuestionsByPaper(paperId) {
  return get(`/api/questions/multi/paper/${paperId}`)
}

export function getRandomMultiQuestions(subject, count) {
  return get('/api/questions/multi/random', { subject, count })
}

export function getLastMultiQuestionId() {
  return get('/api/questions/multi/lastQuestionId')
}

export function addMultiQuestion(data) {
  return post('/api/questions/multi', data)
}

export function getFillQuestions(params) {
  return get('/api/questions/fill', params)
}

export function getFillQuestionsByPaper(paperId) {
  return get(`/api/questions/fill/paper/${paperId}`)
}

export function getRandomFillQuestions(subject, count) {
  return get('/api/questions/fill/random', { subject, count })
}

export function getLastFillQuestionId() {
  return get('/api/questions/fill/lastQuestionId')
}

export function addFillQuestion(data) {
  return post('/api/questions/fill', data)
}

export function getJudgeQuestions(params) {
  return get('/api/questions/judge', params)
}

export function getJudgeQuestionsByPaper(paperId) {
  return get(`/api/questions/judge/paper/${paperId}`)
}

export function getRandomJudgeQuestions(subject, count) {
  return get('/api/questions/judge/random', { subject, count })
}

export function getLastJudgeQuestionId() {
  return get('/api/questions/judge/lastQuestionId')
}

export function addJudgeQuestion(data) {
  return post('/api/questions/judge', data)
}

export function getEssayQuestions(params) {
  return get('/api/questions/essay', params)
}

export function getEssayQuestionById(questionId) {
  return get(`/api/questions/essay/${questionId}`)
}

export function getEssayQuestionsByPaper(paperId) {
  return get(`/api/questions/essay/paper/${paperId}`)
}

export function getRandomEssayQuestions(subject, count) {
  return get('/api/questions/essay/random', { subject, count })
}

export function getLastEssayQuestionId() {
  return get('/api/questions/essay/lastQuestionId')
}

export function addEssayQuestion(data) {
  return post('/api/questions/essay', data)
}

export function updateEssayQuestion(data) {
  return put('/api/questions/essay', data)
}

export function deleteEssayQuestion(questionId) {
  return del(`/api/questions/essay/${questionId}`)
}
