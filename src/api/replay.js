import { get, post } from '@/utils/request'

export function getReplaysByMessage(messageId) {
  return get(`/api/replays/message/${messageId}`)
}

export function addReplay(data) {
  return post('/api/replays', data)
}
