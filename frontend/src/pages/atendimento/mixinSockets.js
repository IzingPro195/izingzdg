const usuario = JSON.parse(localStorage.getItem('usuario'))
import Router from 'src/router/index'
import checkTicketFilter from 'src/utils/checkTicketFilter'
import { socketIO } from 'src/utils/socket'
import { ConsultarTickets } from 'src/service/tickets'
import { orderBy } from 'lodash'
import { parseISO } from 'date-fns'

const socket = socketIO()

const userId = +localStorage.getItem('userId')

// localStorage.debug = '*'

socket.on(`tokenInvalid:${socket.id}`, () => {
  socket.disconnect()
  localStorage.removeItem('token')
  localStorage.removeItem('username')
  localStorage.removeItem('profile')
  localStorage.removeItem('userId')
  localStorage.removeItem('usuario')
  setTimeout(() => {
    Router.push({
      name: 'login'
    })
  }, 1000)
})

export default {
  created() {
    socket.on(`${usuario.tenantId}:msg-private-msg`, data => {
      if (data.action === 'update' && (data.data.receiverId == usuario.userId || data.data.groupId != null)) {
        this.$store.commit('PRIVATE_RECEIVED_MESSAGE', data)
      }
    })
    
    socket.on(`${usuario.tenantId}:unread-msg-private-msg`, data => {
      if (data.action === 'update' && data.data.senderId == usuario.userId) {
        this.$store.commit('UNREAD_MESSAGE_PRIVATE_RECEIVED', data)
      }
    })
    
    socket.on(`${usuario.tenantId}:msg-private-msg-notificacao`, data => {
      if (data.action === 'update' && (data.data.receiverId == usuario.userId || data.data.groupId != null)) {
        this.$store.commit('NOTIFICATION_RECEIVED_PRIVATE_MESSAGE', data)
      }
    })
    
    socket.on('verifyOnlineUsers', data => {
      this.$store.commit('LIST_USERS_PRIVATE', { action: 'updateAllUsers', data: {} })
      this.socket.emit(`${usuario.tenantId}:userVerified`, usuario)
    })

    socket.on(`${usuario.tenantId}:user-online`, data => {
      if (data.action === 'update' && data.data.userId !== usuario.userId) {
        this.$store.commit('USER_CHAT_UPDATE', data)
      }
    })
    
    socket.on(`${usuario.tenantId}:updateStatusUser`, async () => {
      const { data } = await ListarUsuariosChatPrivado()
      this.$store.commit('LIST_USERS_PRIVATE', { action: 'create', data: data.users })
    })
  },
  methods: {
    scrollToBottom () {
      setTimeout(() => {
        this.$root.$emit('scrollToBottomMessageChat')
      }, 200)
    },
    socketMessagesList () {

    },
    socketTicket () {
      socket.on('connect', () => {
        socket.on(`${usuario.tenantId}:ticket`, data => {
          if (data.action === 'update' && data.ticket.userId === userId) {
            if (data.ticket.status === 'open' && !data.ticket.isTransference) {
              this.$store.commit('TICKET_FOCADO', data.ticket)
            }
          }
        })
      })
    },
    socketTicketList () {
      this.socketTicketListNew()
    },
    socketTicketListNew () {
      socket.on('connect', () => {

        socket.on(`${usuario.tenantId}:ticketList`, async data => {
          
          if (data.type === 'chat:create') {
            if (
              !data.payload.read &&
              (data.payload.ticket.userId === userId || !data.payload.ticket.userId) &&
              data.payload.ticket.id !== this.$store.getters.ticketFocado.id
            ) {
              if (checkTicketFilter(data.payload.ticket)) {
                this.handlerNotifications(data.payload)
              }
            }
            this.$store.commit('UPDATE_MESSAGES', data.payload)
            this.scrollToBottom()
          }

          if (data.type === 'chat:ack' || data.type === 'chat:delete') {
            this.$store.commit('UPDATE_MESSAGE_STATUS', data.payload)
          }

          if (data.type === 'chat:update') {
            this.$store.commit('UPDATE_MESSAGE', data.payload)
          }

          if (data.type === 'ticket:update') {
            this.$store.commit('UPDATE_TICKET', data.payload)
            this.$store.commit('UPDATE_NOTIFICATIONS', data.payload)
          }
        })

        socket.on(`${usuario.tenantId}:ticketList`, async data => {
          var verify = []
          if (data.type === 'notification:new') {
            // console.log(data)
            // Atualiza notificações de mensagem
            // var data_noti = []
            const params = {
              searchParam: '',
              pageNumber: 1,
              status: ['pending'],
              showAll: false,
              count: null,
              queuesIds: [],
              withUnreadMessages: false,
              isNotAssignedUser: false,
              includeNotQueueDefined: true
              // date: new Date(),
            }
            try {
              const data_noti = await ConsultarTickets(params)
              this.$store.commit('UPDATE_NOTIFICATIONS_P', data_noti.data)
              verify = data_noti
            } catch (err) {
              this.$notificarErro('Algum problema ao consultar tickets', err)
              console.error(err)
            }
            // Faz verificação para se certificar que notificação pertence a fila do usuário
            var pass_noti = false
            verify.data.tickets.forEach((element) => { pass_noti = (element.id == data.payload.id ? true : pass_noti) })
            // Exibe Notificação
            if (pass_noti) {
              const message = new self.Notification('Novo cliente pendente', {
                body: 'Cliente: ' + data.payload.contact.name,
                tag: 'simple-push-demo-notification'
              })
            }
          }
        })

        socket.on(`${usuario.tenantId}:contactList`, data => {
          this.$store.commit('UPDATE_CONTACT', data.payload)
        })
        
        // socket.io.on(`${usuario.tenantId}:whatsapp`, data => {
        //   if (data.action === 'update') {
        //     console.log('socket ON: UPDATE_WHATSAPPS')
        //     this.$store.commit('UPDATE_WHATSAPPS', data.whatsapp)
        //   }
        // })

        // socket.on(`${usuario.tenantId}:whatsapp`, data => {
        //   console.log('socket ON: DELETE_WHATSAPPS')
        //   if (data.action === 'delete') {
        //     this.$store.commit('DELETE_WHATSAPPS', data.whatsappId)
        //   }
        // })

        // socket.on(`${usuario.tenantId}:whatsappSession`, data => {
        //   console.log('socket ON: UPDATE_SESSION')
        //   if (data.action === 'update') {
        //     this.$store.commit('UPDATE_SESSION', data.session)
        //     this.$root.$emit('UPDATE_SESSION', data.session)
        //   }

        //   if (data.action === 'loadingscreen') {
        //     this.$q.notify({
        //       position: 'bottom',
        //       icon: 'mdi-wifi-arrow-up-down',
        //       message: `A conexão com o WhatsApp está sendo sincronizada. Conexão: ${data.session.name} - ${data.percent}%.`,
        //       type: 'positive',
        //       color: 'positive',
        //       html: true,
        //       progress: true,
        //       timeout: 7000,
        //       actions: [{
        //         icon: 'close',
        //         round: true,
        //         color: 'white'
        //       }],
        //       classes: 'text-body2 text-weight-medium'
        //     })
        //   }

        //   if (data.action === 'readySession') {
        //     this.$q.notify({
        //       position: 'top',
        //       icon: 'mdi-wifi-arrow-up-down',
        //       message: `A conexão com o WhatsApp está pronta e o mesmo está habilitado para enviar e receber mensagens. Conexão: ${data.session.name}. Número: ${data.session.number}.`,
        //       type: 'positive',
        //       color: 'primary',
        //       html: true,
        //       progress: true,
        //       timeout: 7000,
        //       actions: [{
        //         icon: 'close',
        //         round: true,
        //         color: 'white'
        //       }],
        //       classes: 'text-body2 text-weight-medium'
        //     })
        //   }
        // })

        // socket.on(`${usuario.tenantId}:change_battery`, data => {
        //   console.log('socket ON: CHANGE_BATTERY')
        //   this.$q.notify({
        //     message: `Bateria do celular do whatsapp ${data.batteryInfo.sessionName} está com bateria em ${data.batteryInfo.battery}%. Necessário iniciar carregamento.`,
        //     type: 'negative',
        //     progress: true,
        //     position: 'top',
        //     actions: [{
        //       icon: 'close',
        //       round: true,
        //       color: 'white'
        //     }]
        //   })
        // })

        // socket.on(`${usuario.tenantId}:ticketList`, async (data) => {
        //   if (data.type === 'ticket:update') {
        //     console.log('socket ON: TICKET:UPDATE')
        //     try {
        //       const params = {
        //         searchParam: '',
        //         pageNumber: 1,
        //         status: ['open', 'pending', 'closed'],
        //         showAll: false,
        //         count: null,
        //         queuesIds: [],
        //         withUnreadMessages: [true, false],
        //         isNotAssignedUser: [true, false],
        //         includeNotQueueDefined: [true, false]
        //         // date: new Date(),
        //       }
        //       const { data } = await ConsultarTickets(params)
        //       this.countTickets = data.count           
        //       this.$store.commit('UPDATE_NOTIFICATIONS', data)
        //       const orderTickets = (tickets) => {
        //         const newTickes = orderBy(tickets, (obj) => parseISO(obj.lastMessageAt || obj.updatedAt), ['asc'])
        //         return [...newTickes]
        //       }
        //       const newTickets = orderTickets(data.tickets)
        //       // console.log('try ORDER_TICKETS', newTickets.map(ticket => ({ id: ticket.id, lastMessageAt: ticket.lastMessageAt })))      
        //       setTimeout(() => {
        //         // console.log('try LOAD_TICKETS')
        //         this.$store.commit('LOAD_TICKETS', newTickets);
        //       }, 200);
        //       setTimeout(() => {
        //         // console.log('try UPDATE_TICKET')
        //         this.$store.commit('UPDATE_TICKET', newTickets);
        //       }, 400);
        //       setTimeout(async () => {
        //         // console.log('try UPDATE_CONTACT')
        //         this.$store.commit('UPDATE_CONTACT', newTickets);
        //         // this.$store.commit('UPDATE_NOTIFICATIONS', data)
        //       }, 600);
        //     } catch (err) {
        //       console.log('error try', err)
        //     }
        //   }
        //   if (data.type === 'ticket:create') {
        //     console.log('socket ON: TICKET:CREATE')
        //     console.log(data)
        //     try {
        //       const params = {
        //         searchParam: '',
        //         pageNumber: 1,
        //         status: ['open', 'pending', 'closed'],
        //         showAll: false,
        //         count: null,
        //         queuesIds: [],
        //         withUnreadMessages: false,
        //         isNotAssignedUser: false,
        //         includeNotQueueDefined: true
        //         // date: new Date(),
        //       }
        //       const { data } = await ConsultarTickets(params)
        //       this.countTickets = data.count           
        //       this.$store.commit('UPDATE_NOTIFICATIONS', data)
        //       const orderTickets = (tickets) => {
        //         const newTickes = orderBy(tickets, (obj) => parseISO(obj.lastMessageAt || obj.updatedAt), ['asc'])
        //         return [...newTickes]
        //       }
        //       const newTickets = orderTickets(data.tickets)    
        //       // console.log('try ORDER_TICKETS', newTickets.map(ticket => ({ id: ticket.id, lastMessageAt: ticket.lastMessageAt })))      
        //       setTimeout(() => {
        //         // console.log('try LOAD_TICKETS')
        //         this.$store.commit('LOAD_TICKETS', newTickets);
        //       }, 200);
        //       setTimeout(() => {
        //         // console.log('try UPDATE_TICKET')
        //         this.$store.commit('UPDATE_TICKET', newTickets);
        //       }, 400);
        //       setTimeout(() => {
        //         // console.log('try UPDATE_CONTACT')
        //         this.$store.commit('UPDATE_CONTACT', newTickets);
        //         // this.$store.commit('UPDATE_NOTIFICATIONS', data)
        //       }, 600);
        //     } catch (err) {
        //       console.log('error try', err)
        //     }
        //   }
        // })

        // socket.on(`${usuario.tenantId}:ticketList`, async (data) => {   
        //   if (data.type === 'chat:create') {
        //     console.log('socket ON: CHAT:CREATE')
        //     // if (data.payload.ticket.userId !== userId) return
        //     //if (data.payload.fromMe) return
        //     new self.Notification('Contato: ' + data.payload.ticket.contact.name, {
        //       body: 'Mensagem: ' + data.payload.body,
        //       tag: 'simple-push-demo-notification',
        //       image: data.payload.ticket.contact.profilePicUrl,
        //       icon: data.payload.ticket.contact.profilePicUrl,
        //     })
        //     this.$store.commit('UPDATE_MESSAGES', data.payload)
        //     const params = {
        //       searchParam: '',
        //       pageNumber: 1,
        //       status: ['open', 'pending', 'closed'],
        //       showAll: false,
        //       count: null,
        //       queuesIds: [],
        //       withUnreadMessages: false,
        //       isNotAssignedUser: false,
        //       includeNotQueueDefined: true
        //       // date: new Date(),
        //     }
        //     try {
        //       const { data } = await ConsultarTickets(params)
        //       this.countTickets = data.count        
        //       this.$store.commit('UPDATE_NOTIFICATIONS', data)
        //       const orderTickets = (tickets) => {
        //         const newTickes = orderBy(tickets, (obj) => parseISO(obj.lastMessageAt || obj.updatedAt), ['asc'])
        //         return [...newTickes]
        //       }
        //       const newTickets = orderTickets(data.tickets)      
        //       setTimeout(() => {
        //         // this.$store.commit('LOAD_TICKETS', newTickets);
        //       }, 200);
        //       setTimeout(() => {
        //         // this.$store.commit('UPDATE_TICKET', newTickets);
        //         try{
        //           this.$store.commit('UPDATE_MESSAGES', data.payload)
        //         } catch(e){
                  
        //         }
        //       }, 400);
        //       setTimeout(() => {
        //         this.$store.commit('UPDATE_CONTACT', newTickets);
        //         this.$store.commit('UPDATE_NOTIFICATIONS', data);
        //       }, 600);
        //       try{
        //         this.scrollToBottom()
        //       } catch(e){
                
        //       }
        //     } catch (err) {
        //       console.log('error try', err)
        //     }
        //   }
        // })

        // socket.on(`${usuario.tenantId}:ticketList`, async data => {
        //   var verify = []
        //   if (data.type === 'notification:new') {
        //     const params = {
        //       searchParam: '',
        //       pageNumber: 1,
        //       status: ['open', 'pending'],
        //       showAll: false,
        //       count: null,
        //       queuesIds: [],
        //       withUnreadMessages: false,
        //       isNotAssignedUser: false,
        //       includeNotQueueDefined: true
        //     }
        //     try {
        //       const data_noti = await ConsultarTickets(params)
        //       this.$store.commit('UPDATE_NOTIFICATIONS_P', data_noti.data)
        //       verify = data_noti
        //     } catch (err) {
        //       this.$notificarErro('Algum problema', err)
        //       console.error(err)
        //     }
        //     var pass_noti = false
        //     verify.data.tickets.forEach((element) => { pass_noti = (element.id == data.payload.id ? true : pass_noti) })
        //     if (pass_noti) {
        //       const message = new self.Notification('Novo cliente pendente', {
        //         body: 'Cliente: ' + data.payload.contact.name,
        //         tag: 'simple-push-demo-notification'
        //       })
        //       console.log(message)
        //     }
        //   }
        // })

        // socket.on(`${usuario.tenantId}:ticketList`, async data => {
          
        //   if (data.type === 'chat:ack' || data.type === 'chat:delete') {
        //     console.log('socket ON: CHAT:ACK')
        //     this.$store.commit('UPDATE_MESSAGE_STATUS', data.payload)
        //   }

        //   if (data.type === 'chat:update') {
        //     this.$store.commit('UPDATE_MESSAGE', data.payload)
        //   }
        // })

        // socket.on(`${usuario.tenantId}:contactList`, data => {
        //   if (data.type === 'contact:update') {
        //     console.log('socket ON: CONTACT:UPDATE')
        //     this.$store.commit('UPDATE_CONTACT', data.payload)
        //   }
        // })

      })
    },
    socketDisconnect () {
      socket.disconnect()
    }
  }
}