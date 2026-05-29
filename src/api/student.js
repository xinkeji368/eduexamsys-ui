import { get, post, put, del } from '@/utils/request'

export function getStudents(params) {
  return get('/api/students', params)
}

export function getStudentById(studentId) {
  return get(`/api/students/${studentId}`)
}

export function addStudent(data) {
  return post('/api/students', data)
}

export function updateStudent(data) {
  return put('/api/students', data)
}

export function updatePassword(data) {
  return put('/api/students/password', data)
}

export function deleteStudent(studentId) {
  return del(`/api/students/${studentId}`)
}
