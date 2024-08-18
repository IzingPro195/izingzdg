<template>
  <div v-if="userProfile === 'admin'">
    <div class="row col q-pa-md justify-between items-center" >
      <h1> Painel Atendimentos </h1>
      <q-btn color="primary"
        icon="mdi-filter"
        label="Filtros"
        @click="visualizarFiltros = true" />
      <div class="q-mb-md">
        <q-btn @click="fecharTicketsAbertos"
            flat
            color="primary"
            class="bg-padrao btn-rounded">
          <q-icon name="mdi-forum" />
          <q-tooltip content-class="bg-primary text-bold">
            Fechar Atendimentos Abertos
          </q-tooltip>
        </q-btn>
        <q-btn @click="fecharTicketsPendentes"
            flat
            color="primary"
            class="bg-padrao btn-rounded">
          <q-icon name="mdi-account-clock-outline" />
          <q-tooltip content-class="bg-primary text-bold">
            Fechar Atendimentos Pendentes
          </q-tooltip>
        </q-btn>
        <q-btn @click="listarUsuarios2"
            flat
            color="primary"
            class="bg-padrao btn-rounded">
          <q-icon name="mdi-transfer" />
          <q-tooltip content-class="bg-primary text-bold">
            Transferir Atendimento entre Usuários
          </q-tooltip>
        </q-btn>
      </div>
      <q-separator />
    </div>

    <q-dialog full-height
      position="right"
      v-model="visualizarFiltros">
      <q-card style="width: 300px">
        <q-card-section>
          <div class="text-h6">Filtros</div>
        </q-card-section>
        <q-card-section class="q-gutter-md">
          <DatePick dense
            class="row col"
            v-model="pesquisaTickets.dateStart" />
          <DatePick dense
            class="row col"
            v-model="pesquisaTickets.dateEnd" />
          <q-separator v-if="profile === 'admin'" />
          <q-toggle v-if="profile === 'admin'"
            class="q-ml-lg"
            v-model="pesquisaTickets.showAll"
            label="(Admin) - Visualizar Todos" />
          <!-- <q-separator class="q-mb-md"
            v-if="profile === 'admin'" />

          <q-select v-if="!pesquisaTickets.showAll"
            square
            dense
            outlined
            hide-bottom-space
            emit-value
            map-options
            multiple
            options-dense
            use-chips
            label="Filas"
            color="primary"
            v-model="pesquisaTickets.queuesIds"
            :options="filas"
            :input-debounce="700"
            option-value="id"
            option-label="queue"
            input-style="width: 280px; max-width: 280px;" /> -->
          <!-- @input="debounce(BuscarTicketFiltro(), 700)" -->
        </q-card-section>
        <q-card-section>
          <q-separator />
          <div class="text-h6 q-mt-md">Tipo de visualização</div>
          <q-option-group :options="optionsVisao"
            label="Visão"
            type="radio"
            v-model="visao" />
        </q-card-section>
        <q-card-actions align="center">
          <q-btn outline
            label="Atualizar"
            color="primary"
            v-close-popup
            @click="consultarTickets" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <div style="height: 85vh"
      class="scroll">
      <template v-for="(items, key) in sets">
        <div :style="{ height: 800 }"
          :key="key"
          class="row q-pa-md q-col-gutter-md q-mb-sm">
          <div :class="contentClass"
            v-for="(item, index) in items"
            :key="index">
            <q-card bordered
              square
              flat>
              <q-item v-if="visao === 'U' || visao === 'US'"
                class="text-bold"
                :class="{
                  'bg-negative text-white': definirNomeUsuario(item[0]) === 'Pendente'
                }">
                <q-item-section avatar>
                  <q-avatar size="50px"
                  class="relative-position">
                    <q-icon size="50px"
                      name="mdi-account-circle"
                      color="grey-8" />
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-bold text-h6">{{ definirNomeUsuario(item[0]) }}</q-item-label>
                  <q-item-label caption
                    :class="{
                      'text-white': definirNomeUsuario(item[0]) === 'Pendente'
                    }">
                    Atendimentos: {{ item.length }}
                  </q-item-label>
                </q-item-section>
              </q-item>

              <q-item v-if="visao === 'F' || visao === 'FS'"
                class="text-bold"
                :class="{
                  'bg-negative text-white': definirNomeFila(item[0]) === 'Sem Fila'
                }">
                <q-item-section avatar>
                  <q-avatar>
                    <img src="https://cdn.quasar.dev/img/boy-avatar.png">
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ definirNomeFila(item[0]) }}</q-item-label>
                  <q-item-label caption
                    :class="{
                      'text-white': definirNomeFila(item[0]) === 'Sem Fila'
                    }">
                    Abertos: {{ counterStatus(item).open }} | Pendentes: {{ counterStatus(item).pending }} | Total: {{
                        item.length
                    }}
                  </q-item-label>
                </q-item-section>
                <q-btn @click="listarFilas"
                  v-if="definirNomeFila(item[0]).toLowerCase() === 'sem fila'"
                  flat
                  color="primary"
                  class="bg-padrao btn-rounded">
                  <q-icon name="mdi-transfer" />
                  <q-tooltip content-class="bg-primary text-bold">
                    Transferir Atendimentos Sem Fila
                  </q-tooltip>
                </q-btn>
              </q-item>
              <q-separator />
              <q-card-section :style="{ height: '320px' }"
                class="scroll"
                v-if="visao === 'U' || visao === 'F'">
                <ItemTicket v-for="(ticket, i) in item"
                  :key="i"
                  :ticket="ticket"
                  :filas="filas" />
              </q-card-section>
            </q-card>
          </div>
          <q-resize-observer @resize="onResize"></q-resize-observer>
        </div>
      </template>
    </div>

    <q-dialog v-model="modalTransferirTicket"
      @hide="modalTransferirTicket = false"
      persistent>
      <q-card class="q-pa-md"
        style="width: 500px">
        <q-card-section>
          <div class="text-h6">Transferir todos os atendimentos sem fila</div>
          <div class="text-h8">Selecione o destino (atendimentos sem fila):</div>
        </q-card-section>
        <q-card-section>
          <q-select square
            outlined
            v-model="filaSelecionada"
            :options="filas"
            emit-value
            map-options
            option-value="id"
            option-label="queue"
            label="Fila de destino" />
        </q-card-section>
        <q-card-section>
          <q-select square
            outlined
            v-model="usuarioSelecionado"
            :options="usuarios.filter(filterUsers)"
            emit-value
            map-options
            option-value="id"
            option-label="name"
            label="Usuário destino" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            label="Sair"
            color="negative"
            v-close-popup
            class="q-mr-lg" />
          <q-btn
            label="Salvar"
            color="primary"
            @click="confirmarTransferenciaTicket" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="modalTransferirTicket2"
      @hide="modalTransferirTicket2 = false"
      persistent>
      <q-card class="q-pa-md"
        style="width: 500px">
        <q-card-section>
          <div class="text-h6">Transferir atendimento entre usuários</div>
          <div class="text-h8">Atenção, os usuários devem ter acesso as mesmas filas:</div>
        </q-card-section>
        <q-card-section>
          <q-select square
            outlined
            v-model="usuarioSelecionado2"
            :options="usuarios2"
            emit-value
            map-options
            option-value="id"
            option-label="name"
            label="Usuário de Origem" />
        </q-card-section>
        <q-card-section>
          <q-select square
            outlined
            v-model="usuarioSelecionado3"
            :options="usuarios3"
            emit-value
            map-options
            option-value="id"
            option-label="name"
            label="Usuário de Destino" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            label="Sair"
            color="negative"
            v-close-popup
            class="q-mr-lg" />
          <q-btn
            label="Salvar"
            color="primary"
            @click="confirmarTransferenciaTicket2" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="modalTransferirTicket3"
      @hide="modalTransferirTicket3 = false"
      persistent>
      <q-card class="q-pa-md"
        style="width: 500px">
        <q-card-section>
          <div class="text-h6">Resolver todos os atendimentos pendentes</div>
          <div class="text-h8">Atenção, essa é uma ação em massa e não poderá ser revertida.</div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            label="Sair"
            color="negative"
            v-close-popup
            class="q-mr-lg" />
          <q-btn
            label="Resolver"
            color="primary"
            @click="resolverTodosPendentes" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="modalTransferirTicket4"
      @hide="modalTransferirTicket4 = false"
      persistent>
      <q-card class="q-pa-md"
        style="width: 500px">
        <q-card-section>
          <div class="text-h6">Resolver todos os atendimentos abertos</div>
          <div class="text-h8">Atenção, essa é uma ação em massa e não poderá ser revertida.</div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            label="Sair"
            color="negative"
            v-close-popup
            class="q-mr-lg" />
          <q-btn
            label="Resolver"
            color="primary"
            @click="resolverTodosAbertos" />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </div>
</template>

<script>
// const userId = +localStorage.getItem('userId')
const usuario = JSON.parse(localStorage.getItem('usuario'))
import { socketIO } from 'src/utils/socket'
const socket = socketIO()

import { MostrarCores } from 'src/service/empresas';
import ItemTicket from 'src/pages/atendimento/ItemTicketPainel'
import { ConsultarTicketsQueuesService } from 'src/service/estatisticas.js'
import { ListarFilas } from 'src/service/filas'
import { ListarUsuarios } from 'src/service/user'
import { AtualizarTicket } from 'src/service/tickets'
const UserQueues = localStorage.getItem('queues')
import { groupBy } from 'lodash'
const profile = localStorage.getItem('profile')
import { format, sub } from 'date-fns'
export default {
  name: 'painel-de-controle',
  components: { ItemTicket },
  data () {
    return {
      colors: {
        neutral: "#E0E1E2",
        primary: "#5c67f2",
        secondary: "#f5f5f9",
        accent: "#ff5c93",
        warning: "#ffeb3b",
        negative: "#f44336",
        positive: "#25d366",
        light: "#8DB1DD",
      },
      userProfile: 'admin',
      profile,
      visualizarFiltros: false,
      slide: 0,
      height: 400,
      optionsVisao: [
        { label: 'Por Usuário', value: 'U' },
        { label: 'Por Usuário (Sintético)', value: 'US' },
        { label: 'Por Filas', value: 'F' },
        { label: 'Por Filas (Sintético)', value: 'FS' }
      ],
      visao: 'U',
      pesquisaTickets: {
        showAll: true,
        dateStart: format(sub(new Date(), { days: 30 }), 'yyyy-MM-dd'),
        dateEnd: format(new Date(), 'yyyy-MM-dd'),
        queuesIds: []
      },
      tickets: [],
      filas: [],
      usuarios: [],
      modalTransferirTicket: false,
      usuarioSelecionado: null,
      filaSelecionada: null,
      usuarios2: [],
      usuarios3: [],
      modalTransferirTicket2: false,
      modalTransferirTicket3: false,
      modalTransferirTicket4: false,
      usuarioSelecionado2: null,
      usuarioSelecionado3: null,
      sizes: { lg: 3, md: 3, sm: 2, xs: 1 }
    }
  },
  computed: {
    contentClass () {
      let contentClass = 'col'
      const keysLenSize = Object.keys(this.cTicketsUser[0]).length
      for (const size of ['xl', 'lg', 'md', 'sm', 'xs']) {
        if (this.sizes[size]) {
          const sizeExpect = this.sizes[size] > keysLenSize ? keysLenSize : this.sizes[size]
          contentClass += ' col-' + size + '-' + (12 / sizeExpect)
        }
      }
      return contentClass
    },
    sets () {
      const sets = []
      // const items = this.itemsPerSet
      const limit = Math.ceil(this.cTicketsUser.length / this.itemsPerSet)
      for (let index = 0; index < limit; index++) {
        const start = index * this.itemsPerSet
        const end = start + this.itemsPerSet
        sets.push(this.cTicketsUser.slice(start, end))
      }
      return sets[0]
    },
    itemsPerSet () {
      let cond = false
      for (const size of ['xl', 'lg', 'md', 'sm', 'xs']) {
        cond = cond || this.$q.screen[size]
        if (cond && this.sizes[size]) {
          return this.sizes[size]
        }
      }
      return 1
    },
    cUserQueues () {
      try {
        const filasUsuario = JSON.parse(UserQueues).map(q => {
          if (q.isActive) {
            return q.id
          }
        })
        return this.filas.filter(f => filasUsuario.includes(f.id)) || []
      } catch (error) {
        return []
      }
    },
    cTicketsUser () {
      const field = this.visao === 'U' || this.visao === 'US' ? 'userId' : 'queueId'
      return [groupBy(this.tickets, field)]
    }
  },
  methods: {
    async loadColors() {
      try {
        const response = await MostrarCores();
        if (response.status === 200) {
          const companyData = response.data[0];
          const colorsArray = companyData.systemColors;

          

          this.colors = colorsArray.reduce((acc, colorObj) => {
            const key = colorObj.label.toLowerCase();
            acc[key] = colorObj[key];  // Use the correct key here
            return acc;
          }, {});

          

          const root = document.documentElement;
          root.style.setProperty("--q-neutral", this.colors.neutral);
          root.style.setProperty("--q-primary", this.colors.primary);
          root.style.setProperty("--q-secondary", this.colors.secondary);
          root.style.setProperty("--q-accent", this.colors.accent);
          root.style.setProperty("--q-warning", this.colors.warning);
          root.style.setProperty("--q-negative", this.colors.negative);
          root.style.setProperty("--q-positive", this.colors.positive);
          root.style.setProperty("--q-light", this.colors.light);

          

        } else {
          console.error('Erro ao carregar as cores');
        }
      } catch (error) {
        console.error('Erro ao carregar as cores:', error);
      }
    },
    filterUsers (element, index, array) {
      const fila = this.filaSelecionada
      if (fila == null) return true
      const queues_valid = element.queues.filter(function (element, index, array) {
        return (element.id == fila)
      })
      return (queues_valid.length > 0)
    },
    async listarFilas () {
      try {
        const { data } = await ListarFilas()
        this.filas = data
        this.modalTransferirTicket = true
        this.listarUsuarios()
      } catch (error) {
        console.error(error)
        this.$notificarErro('Problema ao carregar filas', error)
      }
    },
    async listarUsuarios () {
      try {
        const { data } = await ListarUsuarios()
        this.usuarios = data.users
        this.modalTransferirTicket = true
      } catch (error) {
        console.error(error)
        this.$notificarErro('Problema ao carregar usuários', error)
      }
    },
    async atualizarTicketPorFila (id, user, fila, status) {
      await AtualizarTicket(id, {
        userId: user,
        queueId: fila,
        status: status,
        isTransference: 1
      })
    },
    async confirmarTransferenciaTicket () {
      if(this.usuarioSelecionado === null) {
        this.$notificarErro('Selecione o usuário e a fila destino para os atendimentos pendentes!')
        return;
      }
      try {
        for (const ticket of this.tickets) {
          if (ticket.queueId === null) {
            await this.atualizarTicketPorFila(ticket.id, this.usuarioSelecionado, this.filaSelecionada, ticket.status)
          }
        }
      } catch (error){
        console.error(error)
        this.$notificarErro('Problema ao realizar transferência', error)
      }
      this.modalTransferirTicket = false
    },
    async listarUsuarios2 () {
      try {
        const { data } = await ListarUsuarios()
        this.usuarios2 = data.users
        this.usuarios3 = data.users
        this.modalTransferirTicket2 = true
      } catch (error) {
        console.error(error)
        this.$notificarErro('Problema ao carregar usuários', error)
      }
    },
    async confirmarTransferenciaTicket2 () {
      if(this.usuarioSelecionado2 === null || this.usuarioSelecionado3 === null) {
        this.$notificarErro('Selecione o usuário destino!')
        return;
      }
      try {
        for (const ticket of this.tickets) {
          if (ticket.userId === this.usuarioSelecionado2) {
            await this.atualizarTicketPorFila(ticket.id, this.usuarioSelecionado3, ticket.queueId, ticket.status)
          }
        }
      } catch (error){
        console.error(error)
        this.$notificarErro('Problema ao realizar transferência', error)
      }
      this.modalTransferirTicket2 = false
    },
    async atualizarTicketPendente (id, user, fila) {
      await AtualizarTicket(id, {
        userId: user,
        queueId: fila,
        status: 'closed',
        isTransference: 1
      })
    },
    async fecharTicketsPendentes () {
      try {
        this.modalTransferirTicket3 = true
      } catch (error) {
        console.error(error)
        this.$notificarErro('Problema ao fechar atendimentos em massa', error)
      }
    },
    async fecharTicketsAbertos () {
      try {
        this.modalTransferirTicket4 = true
      } catch (error) {
        console.error(error)
        this.$notificarErro('Problema ao fechar atendimentos em massa', error)
      }
    },
    async resolverTodosPendentes() {
      try {
        const pendingTickets = this.tickets.filter(ticket => ticket.status === 'pending');

        for (let i = 0; i < pendingTickets.length; i += 10) {
          const batch = pendingTickets.slice(i, i + 10);
          const batchPromises = batch.map(ticket => 
            this.atualizarTicketPendente(ticket.id, ticket.userId, ticket.queueId)
              .catch(e => {
                console.log(ticket.id + ' não atualizado: ' + e);
              })
          );
          this.$q.notify({
            color: 'warning',
            position: 'top',
            message: 'Tickets sendo resolvido em blocos de 10 itens.',
          });
          await Promise.all(batchPromises);
        }

        this.$q.notify({
          color: 'warning',
          position: 'top',
          message: 'Aguarde, página será recarregada após a conclusão da ação.',
        });
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } catch (error) {
        console.error(error);
        this.$notificarErro('Problema ao fechar atendimentos em massa', error);
      }
      this.modalTransferirTicket3 = false;
    },
    async resolverTodosAbertos() {
      try {
        const openTickets = this.tickets.filter(ticket => ticket.status === 'open');

        for (let i = 0; i < openTickets.length; i += 10) {
          const batch = openTickets.slice(i, i + 10);
          const batchPromises = batch.map(ticket => 
            this.atualizarTicketPendente(ticket.id, ticket.userId, ticket.queueId)
              .catch(e => {
                console.log(ticket.id + ' não atualizado: ' + e);
              })
          );
          this.$q.notify({
            color: 'warning',
            position: 'top',
            message: 'Tickets sendo resolvido em blocos de 10 itens.',
          });
          await Promise.all(batchPromises);
        }

        this.$q.notify({
          color: 'warning',
          position: 'top',
          message: 'Aguarde, página será recarregada após a conclusão da ação.',
        });
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } catch (error) {
        console.error(error);
        this.$notificarErro('Problema ao fechar atendimentos em massa', error);
      }
      this.modalTransferirTicket4 = false;
    },
    deleteTicket (ticketId) {
      const newTickets = [...this.tickets]
      const ticketsFilter = newTickets.filter(t => t.id !== ticketId)
      this.tickets = [...ticketsFilter]
    },
    updateTicket (ticket) {
      const newTickets = [...this.tickets]
      const idx = newTickets.findIndex(t => ticket.id)
      if (idx) {
        newTickets[idx] = ticket
        this.tickets = [...newTickets]
      }
    },
    createTicket (ticket) {
      const newTickets = [...this.tickets]
      newTickets.unshift(ticket)
      this.tickets = [...newTickets]
    },
    verifyIsActionSocket (data) {
      if (!data.id) return false

      // mostrar todos
      if (this.pesquisaTickets.showAll) return true

      // não existir filas cadastradas
      if (!this.filas.length) return true

      // verificar se a fila do ticket está filtrada
      const isQueue = this.pesquisaTickets.queuesIds.indexOf(q => data.queueId === q)

      let isValid = false
      if (isQueue !== -1) {
        isValid = true
      }
      return isValid

      // verificar se o usuario possui ecesso a fila do ticket
    },
    conectSocketQueues (tenantId, queueId) {
      // socket.on(`${tenantId}:${queueId}:ticket:queue`, data => {
      //   if (!this.verifyIsActionSocket(data.ticket)) return

      //   if (data.action === 'update') {
      //     this.updateTicket(data.ticket)
      //   }
      //   if (data.action === 'create') {
      //     this.createTicket(data.ticket)
      //   }
      //   if (data.action === 'delete') {
      //     this.deleteTicket(data.ticketId)
      //   }
      // })
    },
    socketTickets () {
      socket.on(`${usuario.tenantId}:ticketList`, async (data) => {
        if (data.type === 'ticket:update') {
          if(data.payload.channel !== 'waba'){
            console.log('socket ON: DASH:UPDATE')
            this.$q.notify({
              color: 'positive',
              position: 'bottom',
              message: `Novas interações para o atendimento ${data.payload.id} recebidas. Caso queira acessar as novas informações nesse painel, atualize essa página.`,
            });
          }
        }
      })
    },
    connectSocket () {
      this.socketTickets()
      this.cUserQueues.forEach(el => {
        this.conectSocketQueues(usuario.tenantId, el.id)
      })
    },
    definirNomeUsuario (item) {
      this.verifyIsActionSocket(item)
      return item?.user?.name || 'Pendente'
    },
    definirNomeFila (f) {
      const fila = this.filas.find(fila => fila.id === f.queueId)
      return fila?.queue || 'Sem Fila'
    },
    counterStatus (tickets) {
      const status = {
        open: 0,
        pending: 0,
        closed: 0
      }
      const group = groupBy(tickets, 'status')
      status.open = group.open?.length || 0
      status.pending = group.pending?.length || 0
      status.closed = group.closed?.length || 0
      return status
    },
    consultarTickets () {
      ConsultarTicketsQueuesService(this.pesquisaTickets)
        .then(res => {
          this.tickets = res.data
          this.connectSocket()
        })
        .catch(error => {
          console.error(error)
          this.$notificarErro('Erro ao consultar atendimentos', error)
        })
    },
    onResize ({ height }) {
      this.height = height
    }
  },

  async mounted () {
    if (!localStorage.getItem('reloaded')) {
      localStorage.setItem('reloaded', 'true');
      window.location.reload();
    } else {
      localStorage.removeItem('reloaded');
    }
    await ListarFilas().then(res => {
      this.filas = res.data
    })
    await this.consultarTickets()
    this.userProfile = localStorage.getItem('profile')
    this.loadColors()
  },
  destroyed () {
    socket.disconnect()
  }
}
</script>

<style lang="scss" scoped>

</style>
