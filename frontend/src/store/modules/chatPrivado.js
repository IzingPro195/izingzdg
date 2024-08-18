const chatPrivado = {
  state: {
    mensagemChatPrivado: {},
    unreadMessageInterna: {},
    listaUsuarios: [],
    listaGrupos: [],
    chatFocado: {},
    notificacaoChatPrivado: {},
    notificacoesChat: 0
  },
  mutations: {
    LIST_USERS_PRIVATE(state, payload) {
      if (payload.action === 'create') {
        payload.data.sort((a, b) => new Date(Number(b.timestamp)) - new Date(Number(a.timestamp)))
        // state.listaUsuarios = [...payload.data, ...payload.data, ...payload.data, ...payload.data, ...payload.data, ...payload.data, ...payload.data, ...payload.data, ...payload.data, ...payload.data, ...payload.data, ...payload.data, ...payload.data, ...payload.data, ...payload.data, ...payload.data, ...payload.data, ...payload.data, ...payload.data, ...payload.data, ...payload.data, ...payload.data, ...payload.data, ...payload.data, ...payload.data, ...payload.data, ...payload.data, ...payload.data]
        state.listaUsuarios = payload.data
      } else if (payload.action === 'update') {
        const index = state.listaUsuarios.findIndex(user => user.id === payload.data.id)
        state.listaUsuarios[index] = payload.data
        state.listaUsuarios.sort((a, b) => new Date(Number(b.date)) - new Date(Number(a.date)))
      } else if (payload.action === 'updateAllUsers') {
        const users = [...state.listaUsuarios]
        users.map(user => {
          user.isOnline = false
          return user
        })
        state.listaUsuarios = users
      }
    },
    LIST_GROUPS_PRIVATE_CHAT(state, payload) {
      if (payload.action === 'create') {
        payload.data.sort((a, b) => new Date(Number(b.timestamp)) - new Date(Number(a.timestamp)))
        // state.listaUsuarios = [...payload.data, ...payload.data, ...payload.data, ...payload.data, ...payload.data, ...payload.data, ...payload.data, ...payload.data, ...payload.data, ...payload.data, ...payload.data, ...payload.data, ...payload.data, ...payload.data, ...payload.data, ...payload.data, ...payload.data, ...payload.data, ...payload.data, ...payload.data, ...payload.data, ...payload.data, ...payload.data, ...payload.data, ...payload.data, ...payload.data, ...payload.data, ...payload.data]
        state.listaGrupos = payload.data
      } else if (payload.action === 'update') {
        const index = state.listaGrupos.findIndex(user => user.id === payload.data.id)
        state.listaGrupos[index] = payload.data
        state.listaGrupos.sort((a, b) => new Date(Number(b.date)) - new Date(Number(a.date)))
      }
    },
    CHAT_PRIVATE_FOC_UPDATE(state, payload) {
      state.chatFocado = payload
    },
    UNREAD_MESSAGE_PRIVATE_RECEIVED(state, payload) {
      state.unreadMessageInterna = payload.data
    },
    PRIVATE_RECEIVED_MESSAGE(state, payload) {
      state.mensagemChatPrivado = payload.data
    },
    NOTIFICATION_RECEIVED_PRIVATE_MESSAGE(state, payload) {
      state.notificacaoChatPrivado = payload.data
    },
    LIST_PRIVATE_NOTIFICATION(state, payload) {
      console.log('socket ON: INTERNAL_CHAT: ' + payload.data)
      if (payload.action === 'create') {
        state.notificacoesChat = parseInt(payload.data)
      } else if (payload.action === 'update') {
        state.notificacoesChat += parseInt(payload.data)
      } else if (payload.action === 'remove') {
        state.notificacoesChat -= parseInt(payload.data)
      }
    }
  }
}

export default chatPrivado
