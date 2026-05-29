import { get, post, put, del } from '@/utils/request'

export function login(data) {
  return post('/api/auth/login', data)
}

export function register(data) {
  return post('/api/auth/register', data)
}
