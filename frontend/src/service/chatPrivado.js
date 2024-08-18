import request from './request'

export function enviarMensagemPrivada(data) {
  return request({
    url: '/chat-privado/msg',
    method: 'post',
    data
  })
}

export function marcarMensagemPrivadaComoLida(contactId, isGroup) {
  return request({
    url: `/chat-privado/msg/${contactId}`,
    method: 'put',
    data: {
      isGroup
    }
  })
}
export function listarGruposPrivados(userId) {
  return request({
    url: `/users/grupo-privado/${userId}`,
    method: 'get'
  })
}

export function listarMensagensPrivadas(contactId, isGroup) {
  return request({
    url: `/chat-privado/msg/${contactId}?isGroup=${isGroup}`,
    method: 'get'
  })
}

export function listCountUnreadPrivateMessage() {
  return request({
    url: '/chat-privado/msgs/mensagens',
    method: 'get'
  })
}

export function listCountUnreadGroupMessage() {
  return request({
    url: '/chat-privado/groups/mensagens',
    method: 'get'
  })
}
