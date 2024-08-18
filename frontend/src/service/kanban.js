import request from 'src/service/request'

export function CriarKanban (data) {
  return request({
    url: '/kanban/',
    method: 'post',
    data
  })
}

export function ListarKanbans () {
  return request({
    url: '/kanban/',
    method: 'get'
  })
}

export function AlterarKanban (data) {
  return request({
    url: `/kanban/${data.id}`,
    method: 'put',
    data
  })
}

export function DeletarKanban (data) {
  return request({
    url: `/kanban/${data.id}`,
    method: 'delete'
  })
}
