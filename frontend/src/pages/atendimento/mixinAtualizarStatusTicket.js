import { AtualizarStatusTicket, EnviarMensagemTexto, LocalizarMensagens, AtualizarTicket, ConsultarDadosTicket} from 'src/service/tickets'
import { EnviarTextoWaba } from 'src/service/waba'
import { ListarDespedidasPrivada } from 'src/service/despedidaprivada'
import { CriarAvaliacao, AlterarAvaliacao } from 'src/service/avaliacoes'
import { MostrarAvaliacao } from 'src/service/empresas'
import { uid } from 'quasar'
const userId = +localStorage.getItem('userId')

export default {
  data () {
    return {
      rating: [
        { label: 'Ruim', rating: 0 },
        { label: 'Regular', rating: 1 },
        { label: 'Bom', rating: 2 },
        { label: 'Muito Bom', rating: 3 },
        { label: 'Excelente', rating: 4 },
        { label: 'Incrível', rating: 5 },
      ]
    }
  },
  methods: {
    iniciarAtendimento (ticket) {
      this.loading = true
      AtualizarStatusTicket(ticket.id, 'open', userId)
        .then(res => {
          this.loading = false
          this.$q.notify({
            message: `Atendimento Iniciado || ${ticket.name} - Ticket: ${ticket.id}`,
            type: 'positive',
            progress: true,
            position: 'top',
            actions: [{
              icon: 'close',
              round: true,
              color: 'white'
            }]
          })
          this.$store.commit('TICKET_FOCADO', {})
          this.$store.commit('SET_HAS_MORE', true)
          this.$store.dispatch('AbrirChatMensagens', ticket)
        })
        .catch(error => {
          this.loading = false
          console.error(error)
          this.$notificarErro('Não foi possível atualizar o status', error)
        })
    },
    espiarAtendimento (ticket) {
      this.loading = true
      AtualizarStatusTicket(ticket.id, 'pending')
        .then(res => {
          this.loading = false
          this.$q.notify({
            message: `Espiando || ${ticket.name} - Ticket: ${ticket.id}`,
            type: 'positive',
            progress: true,
            position: 'top',
            actions: [{
              icon: 'close',
              round: true,
              color: 'white'
            }]
          })
          this.$store.commit('TICKET_FOCADO', {})
          this.$store.commit('SET_HAS_MORE', true)
          this.$store.dispatch('AbrirChatMensagens', ticket)
        })
        .catch(error => {
          this.loading = false
          console.error(error)
          this.$notificarErro('Não foi possível atualizar o status', error)
        })
    },
    async fetchMessagesForTicket(ticket) {
      try {
        const response = await LocalizarMensagens({ ticketId: ticket.id });
        this.currentTicket = { ...ticket, messages: response.data.messages };
        this.isTicketModalOpen = true;
      } catch (error) {
        console.error('Failed to fetch messages:', error);
        this.isTicketModalOpen = false;
      }
    },
    async espiarAtendimentoTicketId (ticketId) {
      console.log(ticketId)
      try{
        const ticket = await ConsultarDadosTicket({ id: ticketId });
        console.log(ticket)
        this.fetchMessagesForTicket(ticket.data);
        this.$q.notify({
          message: `Espiando - Ticket: ${ticket.data.id}`,
          type: 'positive',
          progress: true,
          position: 'top',
          actions: [{
            icon: 'close',
            round: true,
            color: 'white'
          }]
        });
      } catch(e){
        console.log('Erro ao espiar: ', e)
      }
    },
    async espiarAtendimentoPainel (ticket) {
      try{
        this.fetchMessagesForTicket(ticket);
        this.$q.notify({
          message: `Espiando - Ticket: ${ticket.id}`,
          type: 'positive',
          progress: true,
          position: 'top',
          actions: [{
            icon: 'close',
            round: true,
            color: 'white'
          }]
        });
      } catch(e){
        console.log('Erro ao espiar: ', e)
      }

      // AtualizarStatusTicket(ticket.id, 'pending').then(res => {
      //   this.$q.notify({
      //     message: `Espiando - Ticket: ${ticket.id}`,
      //     type: 'positive',
      //     progress: true,
      //     position: 'top',
      //     actions: [{
      //       icon: 'close',
      //       round: true,
      //       color: 'white'
      //     }]
      //   });
      //   this.$store.commit('TICKET_FOCADO', ticket);
      //   // Aqui, você pode optar por não chamar ações de roteamento ou outras lógicas que foram deslocadas para o modal.
      // }).catch(error => {
      //   console.error(error);
      //   this.$notificarErro('Não foi possível atualizar o status', error);
      // });
    },
    async buildRatingMessage() {
      const { data } = await MostrarAvaliacao()
      return `Avalie este atendimento:\n${data[0].rating.map(r => `${r.rating} - ${r.label}`).join('\n')}`;
    },
    async sendEvaluation (ticketFocado) {
      const ticketId = ticketFocado.id
      const evaluation = 'Avaliação enviada';
      const bodyMessage = await this.buildRatingMessage()
      const message = {
        read: 1,
        fromMe: true,
        mediaUrl: '',
        // body: `Avalie este atendimento:\n0- Ruim\n1- Regular\n2- Bom\n3-Muito Bom\n4- Excelente\n5- Incrível`,
        body: bodyMessage,
        scheduleDate: null,
        quotedMsg: null,
        idFront: uid(),
      }
      const messageWaba = {
        read: 1,
        fromMe: true,
        mediaUrl: '',
        // body: `Avalie este atendimento:\n0- Ruim\n1- Regular\n2- Bom\n3-Muito Bom\n4- Excelente\n5- Incrível`,
        body: bodyMessage,
        scheduleDate: null,
        quotedMsg: null,     
        from: ticketFocado.contact.number,
        tokenApi: ticketFocado.whatsapp.tokenAPI,
        ticketId: ticketFocado.id,
        idFront: uid(),
      }
      const data = {
        evaluation: evaluation,
        attempts: 0,
        ticketId: ticketFocado.id,
        userId: ticketFocado.user.id,
        tenantId: ticketFocado.tenantId,
      };
      if (data) {
        this.$q.notify({
          type: 'positive',
          progress: true,
          position: 'top',
          message: 'Avalição enviada para o atendimento ' + ticketFocado.id + '. O atendimento será finalizado de maneira automática após o envio da avaliação pelo cliente.',
          actions: [{
            icon: 'close',
            round: true,
            color: 'white'
          }]
        })
        this.loading = true
        if(ticketFocado.channel !== 'waba'){
          await EnviarMensagemTexto(ticketId, message)
        }
        if(ticketFocado.channel === 'waba'){
          await EnviarTextoWaba(messageWaba)
        }
        await CriarAvaliacao(data).then(r => {
          // this.$store.commit('SYNC_WHATSAPP', ticketFocado.whatsappId)
        }).finally(f => {
          this.loading = false
        })
      } else {
        this.$q.notify({
          type: 'warning',
          progress: true,
          position: 'top',
          message: 'Não foi possível enviar a avaliação do atendimento.',
          actions: [{
            icon: 'close',
            round: true,
            color: 'white'
          }]
        })
      }
    },
    async listarDespedidas () {
      const { data } = await ListarDespedidasPrivada()
      this.despedidas = data.farewellPrivateMessage
    },
    async atualizarStatusTicket (status) {
      const contatoName = this.ticketFocado.contact.name || ''
      const ticketId = this.ticketFocado.id
      const title = {
        open: 'Atendimento será iniciado, ok?',
        pending: 'Retornar à fila?',
        closed: 'Encerrar o atendimento?'
      }
      const toast = {
        open: 'Atendimento iniciado!',
        pending: 'Retornado à fila!',
        closed: 'Atendimento encerrado!'
      }

      let dialogOptions = {
        title: title[status],
        message: `Cliente: ${contatoName} || Ticket: ${ticketId}`,
        cancel: {
          label: 'Não',
          color: 'negative',
          push: true,
        },
        persistent: true,
      };
    
      if (status === 'closed') {
        await this.listarDespedidas();
        dialogOptions = {
          ...dialogOptions,
          options: {
            model: null,
            items: this.despedidas.map((despedida) => ({
              label: despedida.message.substring(0, 15) + '...',
              value: despedida.id,
            })),
          },
          ok: {
            label: 'Sim',
            color: 'primary',
            push: true,
          },
        };
      } else {
        dialogOptions = {
          ...dialogOptions,
          ok: {
            label: 'Sim',
            color: 'primary',
            push: true,
          },
        };
      }
      
      this.$q.dialog(dialogOptions).onOk(async (data) => {
        this.loading = true
        if (status === 'closed' && data !== null) {
          const despedidaSelecionada = this.despedidas.find(
            (despedida) => despedida.id === data
          );
          if (despedidaSelecionada) {
            const message = {
              read: 1,
              fromMe: true,
              mediaUrl: '',
              body: despedidaSelecionada.message,
              scheduleDate: null,
              quotedMsg: null,
              idFront: uid(),
            }
            try{
              if( this.ticketFocado.channel !== 'waba'){
                await EnviarMensagemTexto(ticketId, message)
                this.$q.notify({
                  type: 'positive',
                  progress: true,
                  position: 'top',
                  message: 'A mensagem selecionada está sendo enviada e o ticket será fechado dentro de 30 segundos!',
                  actions: [{
                    icon: 'close',
                    round: true,
                    color: 'white'
                  }]
                })
              }
              if(this.ticketFocado.channel === 'waba'){
                const data = {
                  read: 1,
                  fromMe: true,
                  mediaUrl: '',
                  body: despedidaSelecionada.message,
                  scheduleDate: null,
                  quotedMsg: null,     
                  from: this.ticketFocado.contact.number,
                  tokenApi: this.ticketFocado.whatsapp.tokenAPI,
                  // tokenApi: this.ticketFocado.channel.tokenApi,
                  ticketId: this.ticketFocado.id,
                  idFront: uid(),
                }
                await EnviarTextoWaba(data)
                this.$q.notify({
                  type: 'positive',
                  progress: true,
                  position: 'top',
                  message: 'A mensagem selecionada está sendo enviada e o ticket será fechado dentro de 30 segundos!',
                  actions: [{
                    icon: 'close',
                    round: true,
                    color: 'white'
                  }]
                })
              }
              try{
                await AtualizarTicket(this.ticketFocado.id, {
                  isFarewellMessage: true
                })
                await AlterarAvaliacao(this.ticketFocado.id, {
                  attempts: 2
                })
              } catch(e){
                
              }
              await new Promise(resolve => setTimeout(resolve, 30000));
            } catch(e){
            }
          }
        }
        if(this.ticketFocado.whatsapp.sendEvaluation === 'enabled' && this.ticketFocado.status === "open" && (this.ticketFocado.channel === 'whatsapp' || this.ticketFocado.channel === 'waba' || this.ticketFocado.channel === 'baileys')){
          try{
            AtualizarStatusTicket(ticketId, 'open', userId)
            await this.sendEvaluation(this.ticketFocado)
            this.loading = false
            return
          } catch(e){
            this.loading = false
          }
        }
        AtualizarStatusTicket(ticketId, status, userId)
          .then(res => {
            this.loading = false
            this.$q.notify({
              message: `${toast[status]} || ${contatoName} (Ticket ${ticketId})`,
              type: 'positive',
              progress: true,
              actions: [{
                icon: 'close',
                round: true,
                color: 'white'
              }]
            })
            this.$store.commit('TICKET_FOCADO', {})
            if (status !== 'open') this.$router.push({ name: 'chat-empty' })
          })
          .catch(error => {
            this.loading = false
            this.$q.notify({
              message: `Atendimento nessa conexão já iniciado na aba aberto/pendente ou solicite ao admin para abrir um novo atendimento na opção contato.`,
              type: 'warning',
              progress: true,
              actions: [{
                icon: 'close',
                round: true,
                color: 'white'
              }]
            })
            console.error(error)
            this.$notificarErro('Não foi possível atuaizar o status', error)
          })
      })
    }
  }
}
