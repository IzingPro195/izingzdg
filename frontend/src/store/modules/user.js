import { RealizarLogin, RedefinirSenha, ResetarPassword } from '../../service/login'
import { Notify, Dark } from 'quasar'
// import { sessaolog } from 'src/service/sessaolog'
import { socketIO } from 'src/utils/socket'
// import { validaapi } from 'src/service/validaapi'
import axios from 'axios'

const socket = socketIO()

const pesquisaTicketsFiltroPadrao = {
  searchParam: '',
  pageNumber: 1,
  status: ['open', 'pending'],
  showAll: false,
  count: null,
  queuesIds: [],
  withUnreadMessages: false,
  isNotAssignedUser: false,
  includeNotQueueDefined: true
  // date: new Date(),
}

const user = {
  state: {
    token: null,
    isAdmin: false,
    isSuporte: false
  },
  mutations: {
    SET_IS_SUPORTE (state, payload) {
      const domains = ['@']
      let authorized = false
      domains.forEach(domain => {
        if (payload?.email.toLocaleLowerCase().indexOf(domain.toLocaleLowerCase()) !== -1) {
          authorized = true
        }
      })
      state.isSuporte = authorized
    },
    SET_IS_ADMIN (state, payload) {
      state.isAdmin = !!((state.isSuporte || payload.profile === 'admin'))
    }
  },
  actions: {
    async UserLogin ({ commit, dispatch }, user) {
      user.email = user.email.trim()
      try {
        // await sessaolog()
        const { data } = await RealizarLogin(user)
        localStorage.setItem('token', JSON.stringify(data.token))
        localStorage.setItem('username', data.username)
        localStorage.setItem('profile', data.profile)
        localStorage.setItem('userId', data.userId)
        localStorage.setItem('usuario', JSON.stringify(data))
        localStorage.setItem('queues', JSON.stringify(data.queues))
        localStorage.setItem('queues', JSON.stringify(data.queues))
        localStorage.setItem('filtrosAtendimento', JSON.stringify(pesquisaTicketsFiltroPadrao))

        if (data?.configs?.filtrosAtendimento) {
          localStorage.setItem('filtrosAtendimento', JSON.stringify(data.configs.filtrosAtendimento))
        }
        if (data?.configs?.isDark) {
          Dark.set(data.configs.isDark)
        }
        commit('SET_IS_SUPORTE', data)
        commit('SET_IS_ADMIN', data)

        socket.emit(`${data.tenantId}:setUserActive`)

        // chamada deve ser feita após inserir o token no localstorage
        // const { data: usuario } = await DadosUsuario(data.userId)
        // validaapi()
        Notify.create({
          type: 'positive',
          message: 'Login realizado com sucesso!',
          position: 'top',
          progress: true
        })

        if (data.profile === 'admin') {
          this.$router.push({
            name: 'home-dashboard'
          })
        } else {
          this.$router.push({
            name: 'atendimento'
          })
        }
        // validaapi()
      } catch (error) {
        console.error(error, error.data.error === 'ERROR_NO_PERMISSION_API_ADMIN')
        if (error.data.error === 'ERROR_NO_PERMISSION_API_ADMIN') {
          Notify.create({
            type: 'negative',
            message: 'Instalação não AUTORIZADA',
            caption: 'ERROR_NO_PERMISSION_API_ADMIN',
            position: 'top',
            progress: true
          })
        }
      }
    },
    async requestPasswordReset({ commit }, payload) {
      try {
        await ResetarPassword(payload)
        Notify.create({
          type: 'positive',
          message: 'E-mail de recuperação de senha enviado.',
          position: 'top',
          progress: true
        })
      } catch (error) {
        Notify.create({
          type: 'negative',
          message: 'Erro ao solicitar redefinição de senha.',
          position: 'top',
          progress: true
        })
        throw new Error('Erro ao solicitar redefinição de senha')
      }
    },
    async resetPassword({ commit }, payload) {
      try {
        await RedefinirSenha(payload)
        Notify.create({
          type: 'positive',
          message: 'Senha redefinida com sucesso!',
          position: 'top',
          progress: true
        })
      } catch (error) {
        Notify.create({
          type: 'negative',
          message: 'Erro ao redefinir a senha.',
          position: 'top',
          progress: true
        })
        throw new Error('Erro ao redefinir a senha')
      }
    }


  }
}

export default user
