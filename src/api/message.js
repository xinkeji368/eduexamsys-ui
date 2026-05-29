import { get, post, del } from '@/utils/request'

export function getMessages(params) {
  return get('/api/messages', params)
}

export function getMessageById(id) {
  return get(`/api/messages/${id}`)
}

export function addMessage(data) {
  return post('/api/messages', data)
}

export function deleteMessage(id) {
  return del(`/api/messages/${id}`)
}
