import request from 'src/service/request';

export function criarNotificacao(data) {
  return request({
    url: '/notifications',
    method: 'post',
    data
  });
}

export function listarNotificacoes(params) {
  return request({
    url: '/notifications',
    method: 'get',
    params
  });
}

export function alterarNotificacao(data) {
  return request({
    url: `/notifications/${data.id}`,
    method: 'put',
    data
  });
}

export function deletarNotificacao(id) {
  return request({
    url: `/notifications/${id}`,
    method: 'delete'
  });
}

export function deletarTodasNotificacoes() {
  return request({
    url: '/notifications',
    method: 'delete'
  });
}

export function marcarMensagemComoLida(id, userId) {
  return request({
    url: `/notifications/${id}`,
    method: 'put',
    data: { isRead: true, userId }
  });
}
