import request from 'src/service/request'

export function BuscarTemplates (tokenApi) {
  return request({
    url: `/wabametaTemplate/${tokenApi}`,
    method: 'get',
  })
}

export function VerificarTelefone (data) {
  return request({
    url: `/wabametaVerifyPhone`,
    method: 'post',
    data
  })
}

export function EnviarTextoWaba (data) {
  return request({
    url: '/wabametaText',
    method: 'post',
    data
  })
}

export function EnviarTemplateWaba (data) {
  return request({
    url: '/wabametaTemplateText',
    method: 'post',
    data
  })
}

export function EnviarTemplateComponenteWaba (data) {
  return request({
    url: '/wabametaTemplateComponents',
    method: 'post',
    data
  })
}

export function EnviarTemplateMassaComponenteWaba (data) {
  return request({
    url: '/wabametaBulkTemplateComponents',
    method: 'post',
    data
  })
}

export function EnviarTemplateWabaAgendado (data) {
  return request({
    url: '/wabametaTemplateTextSchedule',
    method: 'post',
    data
  })
}

export function EnviarArquivoWaba (data) {
  return request({
    url: '/wabametaFile',
    method: 'post',
    data
  })
}


export function EnviarStickerWaba (data) {
  return request({
    url: '/wabametaSticker',
    method: 'post',
    data
  })
}

export function EnviarArquivoUrlWaba (data) {
  return request({
    url: '/wabametaFileUrl',
    method: 'post',
    data
  })
}

export function EnviarBotaoWaba (data) {
  return request({
    url: '/wabametaButton',
    method: 'post',
    data
  })
}

export function EnviarListaWaba (data) {
  return request({
    url: '/wabametaList',
    method: 'post',
    data
  })
}
