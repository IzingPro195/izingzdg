import { orderBy } from 'lodash'
import { parseISO } from 'date-fns'

const orderTickets = (tickets) => {
  const newOrder = orderBy(tickets, (obj) => parseISO(obj.updatedAt), ['desc'])
  return newOrder
}

const getters = {
  notifications: state => state.notifications.notifications,
  notifications_p: state => state.notifications.notifications_p,
  tickets: state => orderTickets(state.atendimentoTicket.tickets),
  mensagensTicket: state => state.atendimentoTicket.mensagens,
  ticketFocado: state => state.atendimentoTicket.ticketFocado,
  hasMore: state => state.atendimentoTicket.hasMore,
  whatsapps: state => state.whatsapp.whatsApps,
  isSuporte: state => state.user.isSuporte,
  isAdmin: state => state.user.isAdmin,
  listaUsuarios: state => state.chatPrivado.listaUsuarios,
  listaGrupos: state => state.chatPrivado.listaGrupos,
  unreadMessageInterna: state => state.chatPrivado.unreadMessageInterna,
  mensagemChatPrivado: state => state.chatPrivado.mensagemChatPrivado,
  userChat: state => state.chatPrivado.userChat,
  chatFocado: state => state.chatPrivado.chatFocado,
  notificacaoChatPrivado: state => state.chatPrivado.notificacaoChatPrivado,
  notificacoesChat: state => state.chatPrivado.notificacoesChat,
  showMenu: state => state.usersApp.showMenu,
  notificacaoTicket: state => state.atendimentoTicket.notificacaoTicket
}
export default getters
