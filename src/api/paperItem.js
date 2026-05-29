import { post } from '@/utils/request'

export function generatePaper(data) {
  return post('/api/paper/item/generate', data)
}

export function clearPaper(data) {
  return post('/api/paper/item/clear', data)
}
