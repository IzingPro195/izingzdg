import request from 'src/service/request'

export function ListarContatos (params) {
  return request({
    url: '/contacts/',
    method: 'get',
    params
  })
}

export function ListarContatosAniversario (params) {
  return request({
    url: '/contactsBirthday/',
    method: 'get',
    params
  })
}

export function ListarContatosKanban (params) {
  return request({
    url: '/contactsKanban/',
    method: 'get',
    params
  })
}

export function ListarContatosPorEtiqueta (params) {
  return request({
    url: '/contactsByTags/',
    method: 'get',
    params
  })
}

export function ListarContatosKanbanTags (params) {
  return request({
    url: '/contactsTags/',
    method: 'get',
    params
  })
}

export function ObterContato (contactId) {
  return request({
    url: `/contacts/${contactId}`,
    method: 'get'
  })
}

export function ObterContatoPeloNumero (numberId) {
  return request({
    url: `/contactsNumber/${numberId}`,
    method: 'get'
  })
}

export function CriarContato (data) {
  return request({
    url: '/contacts',
    method: 'post',
    data
  })
}

export function CriarContatoVcard (data) {
  return request({
    url: '/contactVcard',
    method: 'post',
    data
  })
}


export function ListarUrlFoto (data) {
  return request({
    url: '/contactsShowProfilePicture',
    method: 'post',
    data
  })
}

export function ImportarArquivoContato (data) {
  return request({
    url: '/contacts/upload',
    method: 'post',
    data,
    timeout: 120000
  })
}

export function ExportarArquivoContato (data) {
  return request({
    url: '/contacts/export',
    method: 'post',
    data,
    timeout: 120000
  })
}

export function SyncronizarContatos () {
  return request({
    url: '/contacts/sync',
    method: 'post'
  })
}

export function SyncronizarGrupos () {
  return request({
    url: '/groups/sync',
    method: 'post'
  })
}

export function EditarContato (contactId, data) {
  return request({
    url: `/contacts/${contactId}`,
    method: 'put',
    data
  })
}

export function DeletarContato (contactId) {
  return request({
    url: `/contacts/${contactId}`,
    method: 'delete'
  })
}

export function EditarEtiquetasContato (contactId, tags) {
  const data = {
    tags
  }
  return request({
    url: `/contact-tags/${contactId}`,
    method: 'put',
    data
  })
}

export function EditarCarteiraContato (contactId, wallets) {
  const data = {
    wallets
  }
  return request({
    url: `/contact-wallet/${contactId}`,
    method: 'put',
    data
  })
}
