import request from '@/utils/request'

// 获取组织架构数据列表
export const getDepartmentsList = () => {
  return request({
    url: '/company/department'
  })
}

// 新增部门
export const addDepartment = (data) => {
  return request({
    url: '/company/department',
    method: 'POST',
    data
  })
}

// 根据id查询部门详情
export const getDepartment = (id) => {
  return request({
    url: `/company/department/${id}`
  })
}

// 根据id修改部门
export const editDepartment = (data) => {
  return request({
    url: `/company/department/${data.id}`,
    method: 'PUT',
    data
  })
}

// 根据id删除部门
export const delDepartment = (id) => {
  return request({
    url: `/company/department/${id}`,
    method: 'delete'
  })
}
// 员工简单列表
export const simpleEmployeeList = () => {
  return request({
    url: `/sys/user/simple`
  })
}
