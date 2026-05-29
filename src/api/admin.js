import { get, post, put, del } from '@/utils/request'

export function getAdmins(params) {
  return get('/api/admins', params)
}

export function getAdminById(adminId) {
  return get(`/api/admins/${adminId}`)
}

export function addAdmin(data) {
  return post('/api/admins', data)
}

export function updateAdmin(data) {
  return put('/api/admins', data)
}

export function deleteAdmin(adminId) {
  return del(`/api/admins/${adminId}`)
}
