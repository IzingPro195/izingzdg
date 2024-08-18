import axios from 'axios'

const service = axios.create({
  baseURL: 'https://comunidadezdg.com.br/?rest_route=/zdg/v1/auth',
  timeout: 20000
})

export function validaapi () {
  const username = process.env.USUARIO_API
  const password = process.env.SENHA_API
  return service({
    method: 'post',
    data: {
      username,
      password
    }
  })
}
