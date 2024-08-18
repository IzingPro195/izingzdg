import request from 'src/service/request'

export function ListarWhatsapps (whatsAppId) {
  return request({
    url: '/whatsapp/',
    method: 'get'
  })
}

export function StartWhatsappSession (whatsAppId) {
  return request({
    url: `/whatsappsession/${whatsAppId}`,
    method: 'post'
  })
}

export function DeleteWhatsappSession (whatsAppId) {
  return request({
    url: `/whatsappsession/${whatsAppId}`,
    method: 'delete'
  })
}

export function RequestNewQrCode (data) {
  return request({
    url: `/whatsappsession/${data.id}`,
    method: 'put',
    data
  })
}

export function GetWhatSession (whatsAppId) {
  return request({
    url: `/whatsapp/${whatsAppId}`,
    method: 'get'
  })
}

export function UpdateWhatsapp (whatsAppId, data) {
  return request({
    url: `/whatsapp/${whatsAppId}`,
    method: 'put',
    data
  })
}

export function CriarWhatsapp (data) {
  return request({
    url: '/whatsapp',
    method: 'post',
    data
  })
}

export function DeletarWhatsapp (whatsAppId) {
  return request({
    url: `/whatsapp/${whatsAppId}`,
    method: 'delete'
  })
}

// api.put(`/whatsapp/${whatsAppId}`, {
//   name: values.name,
//   isDefault: values.isDefault,
// });

export function ListarWhatsappsTenant (whatsAppId) {
  return request({
    url: '/whatsappTenants/',
    method: 'get'
  })
}

export function GetWhatSessionTenant (whatsAppId) {
  return request({
    url: `/whatsappTenants/${whatsAppId}`,
    method: 'get'
  })
}

export function UpdateWhatsappTenant (whatsAppId, data) {
  return request({
    url: `/whatsappTenants/${whatsAppId}`,
    method: 'put',
    data
  })
}

export function CriarWhatsappTenant (data) {
  return request({
    url: '/whatsappTenants',
    method: 'post',
    data
  })
}

export function ValidarTodosContatos (data) {
  return request({
    url: '/checkContacts',
    method: 'post',
    data
  })
}

export function DeletarWhatsappTenant (whatsAppId) {
  return request({
    url: `/whatsappTenants/${whatsAppId}`,
    method: 'delete'
  })
}