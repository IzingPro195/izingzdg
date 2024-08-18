import request from 'src/service/request'

export function EnviarSMS (data) {
  return request({
    url: '/sendSms',
    method: 'post',
    data
  })
}

export function EnviarSMSMassa (data) {
  return request({
    url: '/bulkSms',
    method: 'post',
    data
  })
}