import { get, post, del } from '@/utils/request'

export function getPapers() {
  return get('/api/papers')
}

export function getPaperById(paperId) {
  return get(`/api/papers/${paperId}`)
}

export function addPaper(data) {
  return post('/api/papers', data)
}

export function deletePaper(paperId) {
  return del(`/api/papers/${paperId}`)
}
