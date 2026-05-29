import { get, post, put, del } from '@/utils/request'

export function getTeachers(params) {
  return get('/api/teachers', params)
}

export function getTeacherById(teacherId) {
  return get(`/api/teachers/${teacherId}`)
}

export function addTeacher(data) {
  return post('/api/teachers', data)
}

export function updateTeacher(data) {
  return put('/api/teachers', data)
}

export function deleteTeacher(teacherId) {
  return del(`/api/teachers/${teacherId}`)
}
