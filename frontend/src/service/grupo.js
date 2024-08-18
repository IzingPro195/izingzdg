import request from 'src/service/request'

export function ListarGrupo (data) {
  return request({
    url: '/listGroup/',
    method: 'post',
    data
  })
}

export function ListarGrupoPelaId (data) {
  return request({
    url: '/listGroupById/',
    method: 'post',
    data
  })
}

export function CriarGrupo (data) {
  return request({
    url: '/createGroups/',
    method: 'post',
    data
  })
}

export function ListarParticipantes (data) {
  return request({
    url: '/listParticipants/',
    method: 'post',
    data
  })
}


export function MudarDescricao (data) {
  return request({
    url: '/changeDescriptions/',
    method: 'post',
    data
  })
}

export function MudarTitulo (data) {
  return request({
    url: '/changeTitles/',
    method: 'post',
    data
  })
}

export function MudarFotoUrl (data) {
  return request({
    url: '/changePicturesUrl/',
    method: 'post',
    data
  })
}

export function MudarFotoArquivo (data) {
  return request({
    url: '/changePicturesFile/',
    method: 'post',
    data
  })
}

export function MudarPermissao (data) {
  return request({
    url: '/setAdminsOnlyForGroups/',
    method: 'post',
    data
  })
}

export function PromoverUsuario (data) {
  return request({
    url: '/promoteParticipantsInGroups/',
    method: 'post',
    data
  })
}

export function DemoverUsuario (data) {
  return request({
    url: '/demoteParticipantsInGroups/',
    method: 'post',
    data
  })
}

export function AdicionarUsuario (data) {
  return request({
    url: '/addParticipantsToGroups/',
    method: 'post',
    data
  })
}

export function RemoverUsuario (data) {
  return request({
    url: '/removeParticipantsFromGroups/',
    method: 'post',
    data
  })
}
