import request from 'src/service/request'

export function CriarTenant (data) {
  return request({
    url: '/tenants/',
    method: 'post',
    data
  })
}

export function ListarTenants () {
  return request({
    url: `/tenants/`,
    method: 'get'
  })
}

export function ListarTenantsEv () {
  return request({
    url: `/tenantsEv/`,
    method: 'get'
  })
}

export function ListarTenantsPk () {
  return request({
    url: `/tenantsPk/`,
    method: 'get'
  })
}

export function ListarTenantsPorTermos () {
  return request({
    url: `/tenantsAcceptTermsList/`,
    method: 'get'
  })
}

export function ListarTenantPorId (data) {
  return request({
    url: `/tenants/${data.id}`,
    method: 'get'
  })
}

export function ListarTenantsPorAsaas () {
  return request({
    url: `/tenantsAsaas/`,
    method: 'get'
  })
}

export function ListarTenantPorAsaas (data) {
  return request({
    url: `/tenantsAsaas/${data}`,
    method: 'get'
  })
}

export function AlterarTenant (data) {
  return request({
    url: `/tenantsUpdate/${data.id}`,
    method: 'put',
    data
  })
}

export function AlterarTenantMeta (data) {
  return request({
    url: `/tenantsMetaUpdate/${data.id}`,
    method: 'put',
    data
  })
}

export function AlterarTenantShowChatbot (data) {
  return request({
    url: `/tenantsShowChatbot/${data.id}`,
    method: 'put',
    data
  })
}

export function AlterarTenantNullTickets (data) {
  return request({
    url: `/tenantsNullTickets/${data.id}`,
    method: 'put',
    data
  })
}

export function AlterarTenantSMSToken (data) {
  return request({
    url: `/tenantsSMSToken/${data.id}`,
    method: 'put',
    data
  })
}

export function AceitarTermos (data) {
  return request({
    url: `/tenantsAcceptTerms/${data.id}`,
    method: 'put',
    data
  })
}

export function AlterarTenantFixarConexoes (data) {
  return request({
    url: `/tenantsFixConnections/${data.id}`,
    method: 'put',
    data
  })
}

export function AlterarTenantForcarAdmin (data) {
  return request({
    url: `/tenantsForceAdmin/${data.id}`,
    method: 'put',
    data
  })
}

export function AlterarTenantTentativas (data) {
  return request({
    url: `/tenantsMaxRetries/${data.id}`,
    method: 'put',
    data
  })
}

export function AlterarTenantLimiteTickets (data) {
  return request({
    url: `/tenantsTicketLimit/${data.id}`,
    method: 'put',
    data
  })
}

export function DeletarTenant (data) {
  return request({
    url: `/tenants/${data.id}`,
    method: 'delete'
  })
}