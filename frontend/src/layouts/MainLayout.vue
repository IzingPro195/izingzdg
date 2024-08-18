<template>
  <div>
  <q-layout view="hHh Lpr lFf">

    <q-header class="bg-white text-grey-8 q-py-xs "
      height-hint="58"
      bordered>
      <q-toolbar>
        <q-btn flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          icon="menu">
          <q-tooltip>Menu</q-tooltip>
        </q-btn>

        <q-btn flat
          no-caps
          no-wrap
          dense
          class="q-ml-sm"
          v-if="$q.screen.gt.xs">
          <q-img src="/zpro.png"
            spinner-color="primary"
            style="height: 50px; width: 140px" />
          <!-- <q-toolbar-title
            shrink
            class="text-bold text-grey-7"
          >
            IZING
          </q-toolbar-title> -->
        </q-btn>

        <q-space />

        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn 
            v-if="userProfile !== 'superadmin'"
            flat 
            dense 
            color="grey-8" 
            icon="mdi-message-text-outline" 
            @click="showModalMensagensInternas = true"
          >
            <q-badge color="red"
              text-color="white"
              floating
              v-if="parseInt(unreadMessagesCount) > 0">
              {{ unreadMessagesCount }}
            </q-badge>
            <q-tooltip content-class="bg-padrao text-grey-9 text-bold">Mensagens Internas</q-tooltip>
          </q-btn>
          <q-btn v-if="userProfile !== 'superadmin'" flat dense color="grey-8" icon="mdi-send-outline" @click="showModalMensagem = true">
            <q-tooltip content-class="bg-padrao text-grey-9 text-bold"> Iniciar Conversa Avulsa </q-tooltip>
          </q-btn>
          <q-btn round
            v-if="userProfile !== 'superadmin'"
            dense
            flat
            color="grey-8"
            icon="notifications"
            >
            <q-badge color="red"
              text-color="white"
              floating
              v-if="(parseInt(notifications.count) + parseInt(notifications_p.count)) > 0 || this.notificacaoInternaNaoLida">
              {{ parseInt(notifications.count) + parseInt(notifications_p.count) + parseInt(this.notificacaoInternaNaoLida)}}
            </q-badge>
            <q-menu>
              <q-list style="min-width: 300px">
                <!--q-item>
                  <q-item-section
                    style="cursor: pointer;">
                    {{ parseInt(notifications.count) }} + {{ parseInt(notifications_p.count) }}
                  </q-item-section>
                </q-item-->
                <q-item v-if="(parseInt(notifications.count) + parseInt(notifications_p.count)) == 0">
                  <q-item-section style="cursor: pointer;">
                    Nada de novo por aqui!
                  </q-item-section>
                </q-item>
                <q-item v-if="parseInt(notificacoesChat) > 0">
                  <q-item-section avatar @click="() => $router.push({ name: 'interno' })" style="cursor: pointer;">
                    <q-avatar style="width: 60px; height: 60px" color="primary" text-color="white">
                      {{ notificacoesChat }}
                    </q-avatar>
                  </q-item-section>
                  <q-item-section @click="() => $router.push({ name: 'chat-privado' })" style="cursor: pointer;">
                    Novas mensagens não lidas no chat interno!
                  </q-item-section>
                </q-item>
                <q-item v-if="parseInt(notificacaoInternaNaoLida) > 0">
                  <q-item-section avatar @click="() => $router.push({ name: 'interno' })" style="cursor: pointer;">
                    <q-avatar style="width: 60px; height: 60px" color="primary" text-color="white">
                      {{ notificacaoInternaNaoLida }}
                    </q-avatar>
                  </q-item-section>
                  <q-item-section @click="() => $router.push({ name: 'chat-privado' })" style="cursor: pointer;">
                    Mensagens não lidas no chat interno!
                  </q-item-section>
                </q-item>
                <q-item v-if="parseInt(notifications_p.count) > 0">
                  <q-item-section avatar
                    @click="() => $router.push({ name: 'atendimento' })"
                    style="cursor: pointer;">
                    <q-avatar style="width: 60px; height: 60px"
                      color="primary"
                      text-color="white">
                      {{ notifications_p.count }}
                    </q-avatar>
                  </q-item-section>
                  <q-item-section @click="() => $router.push({ name: 'atendimento' })"
                    style="cursor: pointer;">
                    Clientes pendentes na fila
                  </q-item-section>
                </q-item>
                <q-item v-for="ticket in notifications.tickets"
                  :key="ticket.id"
                  style="border-bottom: 1px solid #ddd; margin: 5px;">
                  <q-item-section avatar
                    @click="abrirAtendimentoExistente(ticket.name, ticket)"
                    style="cursor: pointer;">
                    <q-avatar style="width: 60px; height: 60px">
                      <img :src="ticket.profilePicUrl">
                    </q-avatar>
                  </q-item-section>
                  <q-item-section @click="abrirAtendimentoExistente(ticket.name, ticket)"
                    style="cursor: pointer;">
                    <q-list>
                      <q-item style="text-align:center; font-size: 17px; font-weight: bold; min-height: 0">{{ ticket.name
                      }}</q-item>
                      <q-item style="min-height: 0; padding-top: 0"><b>Mensagem: </b> {{ ticket.lastMessage }}</q-item>
                    </q-list>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
            <q-tooltip >Notificações</q-tooltip>
          </q-btn>
          <q-avatar :color="usuario.status === 'offline' ? 'negative' : 'positive'"
            text-color="white"
            size="25px"
            :icon="usuario.status === 'offline' ? 'mdi-account-off' : 'mdi-account-check'"
            rounded
            class="q-ml-lg">
            <q-tooltip>
              {{ usuario.status === 'offline' ? 'Usuário Offiline' : 'Usuário Online' }}
            </q-tooltip>
          </q-avatar>
          <q-btn round
            flat
            class="bg-padrao text-bold q-mx-sm q-ml-lg">
            <q-avatar size="26px">
              {{ $iniciaisString(username) }}
            </q-avatar>
            <q-menu>
              <q-list style="min-width: 100px">
                <q-item-label header> Olá! <b> {{ username }} </b> </q-item-label>
                <!-- <q-item
                  clickable
                  v-close-popup
                >
                  <q-item-section>
                    <q-toggle
                      color="blue"
                      :value="$q.dark.isActive"
                      label="Modo escuro"
                      @input="$setConfigsUsuario({isDark: !$q.dark.isActive})"
                    />
                  </q-item-section>
                </q-item> -->
                <cStatusUsuario @update:usuario="atualizarUsuario"
                  :usuario="usuario" />
                <q-item clickable
                  v-close-popup
                  @click="abrirModalUsuario">
                  <q-item-section>Perfil</q-item-section>
                </q-item>
                <q-item clickable
                  v-close-popup
                  @click="efetuarLogout">
                  <q-item-section>Sair</q-item-section>
                </q-item>
                <q-separator />
                <q-item>
                  <q-item-section>
                    <cPaymentStatus />
                  </q-item-section>
                </q-item>
                <q-item>
                <q-item-section>
                    <cSystemVersion  />
                  </q-item-section>
                </q-item>

              </q-list>
            </q-menu>

            <q-tooltip>Usuário</q-tooltip>
          </q-btn>

          <q-dialog v-model="showModalMensagem" @hide="resetFields">
            <q-card>
              <q-card-section>
                <div class="text-h6">Iniciar Conversa Avulsa</div>
              </q-card-section>

              <q-card-section>
                <q-select
                  style="margin: 1px;"
                  v-model="whatsappId"
                  :options="cSessionsOptions"
                  label="WhatsApp ID"
                  dense
                  outlined
                />
                <c-input
                  class="col-12 col-md-6"
                  style="margin: 1px; margin-top: 5px"
                  outlined
                  v-model="numero" 
                  mask="+#############"
                  placeholder="+DDI (DDD) 99999 9999"
                  fill-mask
                  unmasked-value
                  dense
                  hint="Número do celular deverá conter 9 dígitos e ser precedido do DDI E DDD."
                  label="Número"
                />
                <c-input
                  outlined
                  style="margin: 1px; margin-top: 5px"
                  dense 
                  v-model="mensagem" 
                  label="Mensagem" 
                  type="textarea"
                />
              </q-card-section>

              <q-card-actions align="right">
                <q-btn label="Cancelar" class="q-px-md q-mr-sm" color="negative" @click="showModalMensagem = false" />
                <q-btn label="Enviar" class="q-px-md q-mr-sm" color="positive" @click="enviarMensagem" />
              </q-card-actions>
            </q-card>
          </q-dialog>

          <q-dialog v-model="showModalMensagensInternas">
            <q-card>
              <q-card-section>
                <div class="text-h6">Mensagens Internas</div>
              </q-card-section>

              <q-card-section>
                <q-list>
                  <q-item 
                    v-for="mensagem in mensagensInternas" 
                    :key="mensagem.id"
                    :class="{ 'mensagem-lida': mensagem.isRead }"
                  >
                    <q-item-section>
                      <q-item-label>{{ mensagem.message }}</q-item-label>
                      <q-item-label caption>{{ formatDate(mensagem.createdAt) }}</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <q-btn icon="mdi-check-circle" @click="marcarComoLida(mensagem.id)" v-if="!mensagem.isRead"/>
                      <q-btn icon="mdi-delete" @click="deletarMensagem(mensagem.id)" />
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-card-section>

              <q-card-actions align="right">
                <q-btn label="Fechar" color="primary" @click="showModalMensagensInternas = false" />
              </q-card-actions>
            </q-card>
          </q-dialog>

        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen"
      show-if-above
      bordered
      :mini="miniState"
      @mouseover="miniState = false"
      @mouseout="miniState = true"
      mini-to-overlay
      content-class="bg-white text-grey-9">
      <q-scroll-area class="fit">
        <q-list padding
          :key="userProfile">
          <EssentialLink v-for="item in menuData"
            :key="item.title"
            v-bind="item" v-if="userProfile === 'admin' || userProfile === 'user' || userProfile === 'super'"/>
          <div v-if="userProfile === 'super'">
            <q-separator spaced />
            <div class="q-mb-lg"></div>
            <!-- <q-item-label header>Administração</q-item-label> -->
            <template v-for="item in menuDataSupervisor">
              <EssentialLink v-if="exibirMenuBeta(item)"
                :key="item.title"
                v-bind="item" />
            </template>
          </div>
          <div v-if="userProfile === 'admin'">
            <q-separator spaced />
            <div class="q-mb-lg"></div>
            <!-- <q-item-label header>Administração</q-item-label> -->
            <template v-for="item in menuDataAdmin">
              <EssentialLink v-if="exibirMenuBeta(item)"
                :key="item.title"
                v-bind="item" />
            </template>
          </div>
          <div v-if="userProfile === 'superadmin'">
            <!-- <q-separator spaced /> -->
            <div class="q-mb-lg"></div>
            <!-- <q-item-label header>Administração</q-item-label> -->
            <template v-for="item in menuDataSuperAdmin">
              <EssentialLink v-if="exibirMenuBeta(item)"
                :key="item.title"
                v-bind="item" />
            </template>
          </div>

          <div style="height: 50px;"></div>
        </q-list> 
      </q-scroll-area>
      <div class="absolute-bottom text-center row justify-start"
        :class="{ 'bg-grey-3': $q.dark.isActive }"
        style="height: 40px; margin-bottom: 10px">
        <q-toggle size="xl"
          keep-color
          dense
          class="text-bold q-ml-xs"
          :icon-color="$q.dark.isActive ? 'black' : 'white'"
          :value="$q.dark.isActive"
          :color="$q.dark.isActive ? 'grey-3' : 'black'"
          checked-icon="mdi-white-balance-sunny"
          unchecked-icon="mdi-weather-sunny"
          @input="$setConfigsUsuario({ isDark: !$q.dark.isActive })">
          <q-tooltip content-class="text-body1 hide-scrollbar">
            {{ $q.dark.isActive ? 'Desativar' : 'Ativar' }} Modo Escuro (Dark Mode)
          </q-tooltip>
        </q-toggle>
      </div>
    </q-drawer>

    <q-page-container>
      <q-page class="q-pa-xs">
        <router-view />
      </q-page>
    </q-page-container>
    <audio ref="audioNotification" v-if="userProfile === 'admin' || userProfile === 'user'">
      <source :src="alertSound"
        type="audio/mp3">
    </audio>
    <ModalUsuario :isProfile="true"
      :modalUsuario.sync="modalUsuario"
      :usuarioEdicao.sync="usuario" />
  </q-layout>

    <div>
      <!-- <button v-if="this.usuario.profile === 'superadmin'" @click="aceitarTermos">Verificar Termos</button> -->
      <ModalLayout v-if="this.usuario.profile === 'superadmin'" :show="showModal" @close="showModal = false" @aceitar="handleAcceptance"></ModalLayout>
    </div>
  </div>
</template>

<script>
// const userId = +localStorage.getItem('userId')
import cSystemVersion from '../components/cSystemVersion.vue'
import cPaymentStatus from '../components/cPaymentStatus.vue'
import { ListarWhatsapps } from 'src/service/sessoesWhatsapp'
import EssentialLink from 'components/EssentialLink.vue'
import socketInitial from './socketInitial'
import alertSound from 'src/assets/sound.mp3'
import { format } from 'date-fns'
const username = localStorage.getItem('username')
import ModalUsuario from 'src/pages/usuarios/ModalUsuario'
import { mapGetters } from 'vuex'
import { ListarConfiguracoes } from 'src/service/configuracoes'
import { RealizarLogout } from 'src/service/login'
import cStatusUsuario from '../components/cStatusUsuario.vue'
import { socketIO } from 'src/utils/socket'
import { ConsultarTickets } from 'src/service/tickets'
import ModalLayout from './ModalLayout.vue'
import { ListarTenantPorId, ListarTenantPorAsaas, AceitarTermos, ListarTenantsPorTermos } from 'src/service/tenants'
import { listCountUnreadPrivateMessage, listCountUnreadGroupMessage } from 'src/service/chatPrivado'
import { TextoIndividual } from 'src/service/massa' 
import { listarNotificacoes, deletarNotificacao, marcarMensagemComoLida } from 'src/service/notificacao'
import { DadosUsuario, UpdateIsOnlineUsuario } from 'src/service/user'
const socket = socketIO()

const objMenu = [
  {
    title: 'Dashboard',
    caption: '',
    icon: 'mdi-home',
    routeName: 'home-dashboard'
  },
  {
    title: 'Atendimentos',
    caption: 'Lista de atendimentos',
    icon: 'mdi-forum-outline',
    routeName: 'atendimento'
  },
  {
    title: 'Contatos',
    caption: 'Lista de contatos',
    icon: 'mdi-card-account-mail',
    routeName: 'contatos'
  },
  {
    title: 'Disparo em Massa',
    caption: 'Envio de mensagens massivas',
    icon: 'mdi-rocket',
    routeName: 'massa'
  },
  {
    title: 'Grupos',
    caption: 'Gestão de Grupos em Massa',
    icon: 'mdi-hexagon-multiple-outline',
    routeName: 'grupo'
  },
  {
    title: 'Chat',
    caption: 'Chat',
    icon: 'mdi-forum-outline',
    routeName: 'chat-privado'
  },
  {
    title: 'Kanban',
    caption: 'CRM',
    icon: 'mdi-developer-board',
    routeName: 'kanban'
  },
  {
    title: 'Tarefas',
    caption: 'TodoList',
    icon: 'mdi-clipboard-list-outline',
    routeName: 'tarefas'
  },
]

const objMenuSupervisor = [
  {
    title: 'Canais',
    caption: 'Canais de Comunicação',
    icon: 'mdi-cellphone-wireless',
    routeName: 'sessoes'
  },
  {
    title: 'Relatórios',
    caption: 'Relatórios gerais',
    icon: 'mdi-file-chart',
    routeName: 'relatorios'
  },
  {
    title: 'Filas',
    caption: 'Cadastro de Filas',
    icon: 'mdi-arrow-decision-outline',
    routeName: 'filas'
  },
  {
    title: 'Equipes',
    caption: 'Equipes',
    icon: 'mdi-account-network-outline',
    routeName: 'equipes'
  },
  {
    title: 'Mensagens Rápidas',
    caption: 'Mensagens pré-definidas',
    icon: 'mdi-reply-all-outline',
    routeName: 'mensagens-rapidas'
  },
  {
    title: 'Chatbot',
    caption: 'Robô de atendimento',
    icon: 'mdi-robot',
    routeName: 'chat-flow'
  },
  {
    title: 'Agendamentos',
    caption: 'Mensagens Agendadas',
    icon: 'mdi-message-text-clock-outline',
    routeName: 'agendamentos'
  },
  {
    title: 'Aniversários',
    caption: 'Mensagens Agendadas',
    icon: 'mdi-gift-outline',
    routeName: 'aniversarios'
  },
  {
    title: 'Fechamento',
    caption: 'Mensagens de Fechamento',
    icon: 'mdi-message-arrow-right-outline',
    routeName: 'fechamento'
  },
  {
    title: 'Etiquetas',
    caption: 'Cadastro de etiquetas',
    icon: 'mdi-tag-text',
    routeName: 'etiquetas'
  },
  {
    title: 'Notas',
    caption: 'Notas de atendimento',
    icon: 'mdi-clipboard-text-multiple-outline',
    routeName: 'notas'
  },
  {
    title: 'Protocolos',
    caption: 'Protocolos de atendimento',
    icon: 'mdi-timeline-text-outline',
    routeName: 'protocolos'
  },
  {
    title: 'Avaliações',
    caption: 'Avaliações de atendimento',
    icon: 'mdi-account-star-outline',
    routeName: 'avaliacoes'
  },
  {
    title: 'Horário de Atendimento',
    caption: 'Horário de funcionamento',
    icon: 'mdi-calendar-clock',
    routeName: 'horarioAtendimento'
  },
  {
    title: 'Campanha',
    caption: 'Campanhas de envio',
    icon: 'mdi-message-bookmark-outline',
    routeName: 'campanhas'
  }
]

const objMenuAdmin = [
  {
    title: 'Canais',
    caption: 'Canais de Comunicação',
    icon: 'mdi-cellphone-wireless',
    routeName: 'sessoes'
  },
  {
    title: 'Painel Atendimentos',
    caption: 'Visão geral dos atendimentos',
    icon: 'mdi-view-dashboard-variant',
    routeName: 'painel-atendimentos'
  },
  {
    title: 'Relatórios',
    caption: 'Relatórios gerais',
    icon: 'mdi-file-chart',
    routeName: 'relatorios'
  },
  {
    title: 'Usuários',
    caption: 'Admin de usuários',
    icon: 'mdi-account-group',
    routeName: 'usuarios'
  },
  {
    title: 'Filas',
    caption: 'Cadastro de Filas',
    icon: 'mdi-arrow-decision-outline',
    routeName: 'filas'
  },
  {
    title: 'Equipes',
    caption: 'Equipes Chat',
    icon: 'mdi-account-network-outline',
    routeName: 'equipes'
  },
  {
    title: 'Mensagens Rápidas',
    caption: 'Mensagens pré-definidas',
    icon: 'mdi-reply-all-outline',
    routeName: 'mensagens-rapidas'
  },
  {
    title: 'Chatbot',
    caption: 'Robô de atendimento',
    icon: 'mdi-robot',
    routeName: 'chat-flow'
  },
  {
    title: 'Agendamentos',
    caption: 'Mensagens Agendadas',
    icon: 'mdi-message-text-clock-outline',
    routeName: 'agendamentos'
  },
  {
    title: 'Aniversários',
    caption: 'Mensagens Agendadas',
    icon: 'mdi-gift-outline',
    routeName: 'aniversarios'
  },
  {
    title: 'Fechamento',
    caption: 'Mensagens de Fechamento',
    icon: 'mdi-message-arrow-right-outline',
    routeName: 'fechamento'
  },
  {
    title: 'Etiquetas',
    caption: 'Cadastro de etiquetas',
    icon: 'mdi-tag-text',
    routeName: 'etiquetas'
  },
  {
    title: 'Notas',
    caption: 'Notas de atendimento',
    icon: 'mdi-clipboard-text-multiple-outline',
    routeName: 'notas'
  },
  {
    title: 'Protocolos',
    caption: 'Protocolos de atendimento',
    icon: 'mdi-timeline-text-outline',
    routeName: 'protocolos'
  },
  {
    title: 'Avaliações',
    caption: 'Avaliações de atendimento',
    icon: 'mdi-account-star-outline',
    routeName: 'avaliacoes'
  },
  {
    title: 'Horário de Atendimento',
    caption: 'Horário de funcionamento',
    icon: 'mdi-calendar-clock',
    routeName: 'horarioAtendimento'
  },
  /// / criar rotina para liberar pelo backend
  {
    title: 'Campanha',
    caption: 'Campanhas de envio',
    icon: 'mdi-message-bookmark-outline',
    routeName: 'campanhas'
    // isBeta: true
  },
  {
    title: 'API',
    caption: 'Integração sistemas externos',
    icon: 'mdi-call-split',
    routeName: 'api-service'
    // isBeta: true
  },
  {
    title: 'Configurações',
    caption: 'Configurações gerais',
    icon: 'mdi-cog',
    routeName: 'configuracoes'
  }
]

const objMenuSuperAdmin = [
  {
    title: 'Tenants',
    caption: 'Tenants',
    icon: 'mdi-office-building',
    routeName: 'tenants'
  },
  {
    title: 'Usuários',
    caption: 'Admin de usuários',
    icon: 'mdi-account-group',
    routeName: 'usuariotenants'
  },
  {
    title: 'E-mail',
    caption: 'Recuperação de Senha',
    icon: 'mdi-email',
    routeName: 'configuracoesTenant'
  },
  {
    title: 'Canais',
    caption: 'Canais de Comunicação',
    icon: 'mdi-cellphone-wireless',
    routeName: 'sessoestenants'
  },
  {
    title: 'API',
    caption: 'API SuperAdmin',
    icon: 'mdi-call-split',
    routeName: 'tenantApi'
  },
  {
    title: 'Pagamentos',
    caption: 'Dados de Pagamento',
    icon: 'mdi-credit-card-multiple-outline',
    routeName: 'pagamentostenants'
  },
  {
    title: 'Customizar',
    caption: 'Logos e Cores',
    icon: 'mdi-format-paint',
    routeName: 'customizar'
  },
  {
    title: 'Notificação',
    caption: 'Mensagens Internas',
    icon: 'mdi-message-text-outline',
    routeName: 'notificacao'
  },
  {
    title: 'Dados Internos',
    caption: 'Mensagens Internas',
    icon: 'mdi-package-variant',
    routeName: 'tenantsPk'
  },
  {
    title: 'Terminal',
    caption: 'Terminal SSH',
    icon: 'mdi-console',
    routeName: 'terminal'
  },
]

const objMenuBloqueio = [
  {
    title: 'Configurações',
    caption: 'Configurações gerais',
    icon: 'mdi-cog',
    routeName: 'configuracoesbloqueio'
  },
]

export default {
  name: 'MainLayout',
  mixins: [socketInitial],
  components: { EssentialLink, ModalUsuario, ModalLayout, cStatusUsuario, cSystemVersion, cPaymentStatus },
  data () {
    return {
      showModalMensagensInternas: false,
      mensagensInternas: [],
      whatsappId: null,
      showModal: false,
      showModalMensagem: false,
      numero: '',
      mensagem: '',
      username,
      domainExperimentalsMenus: ['@'],
      miniState: true,
      userProfile: 'user',
      modalUsuario: false,
      usuario: {},
      alertSound,
      leftDrawerOpen: false,
      menuData: objMenu,
      menuDataAdmin: objMenuAdmin,
      menuDataSupervisor: objMenuSupervisor,
      menuDataSuperAdmin: objMenuSuperAdmin,
      countTickets: 0,
      ticketsList: [],
      notificacaoInternaNaoLida: ''
    }
  },
  computed: {
    ...mapGetters(['notifications', 'notifications_p', 'whatsapps', 'showMenu', 'chatFocado', 'notificacaoChatPrivado', 'notificacoesChat', 'notificacaoTicket', 'whatsapps']),
    cProblemaConexao () {
      const idx = this.whatsapps.findIndex(w =>
        ['PAIRING', 'TIMEOUT', 'DISCONNECTED'].includes(w.status)
      )
      return idx !== -1
    },
    cQrCode () {
      const idx = this.whatsapps.findIndex(
        w => w.status === 'qrcode' || w.status === 'DESTROYED'
      )
      return idx !== -1
    },
    cOpening () {
      const idx = this.whatsapps.findIndex(w => w.status === 'OPENING')
      return idx !== -1
    },
    cUsersApp () {
      return this.$store.state.usersApp
    },
    cObjMenu () {
      if (this.cProblemaConexao) {
        return objMenu.map(menu => {
          if (menu.routeName === 'sessoes') {
            menu.color = 'negative'
          }
          return menu
        })
      }
      return objMenu
    },
    cSessions() {
      return this.whatsapps.filter(w => ["whatsapp", "baileys"].includes(w.type) && !w.isDeleted && w.status === 'CONNECTED');
    },
    cSessionsOptions() {
      return this.cSessions.map(w => ({ label: w.name, value: w.id, type: w.type }))
    },
    unreadMessagesCount() {
      return this.mensagensInternas.filter(notificacao => !notificacao.isRead).length;
    }
  },
  watch: {
    notificacaoChatPrivado: {
      handler() {
        if (this.$router.currentRoute.fullPath.indexOf('atendimento-Interno') < 0 || !this.chatFocado.id || this.chatFocado.id !== this.notificacaoChatPrivado.senderId) {
          this.$store.commit('LIST_PRIVATE_NOTIFICATION', { action: 'update', data: 1 })
          this.listarMensagens()
          const audio = new Audio(alertSound)
          audio.play()
        }
      }
    },
    notificacaoTicket: {
      handler() {
        this.$nextTick(() => {
          this.$refs.audioNotification.play()
        })
      }
    }
  },
  methods: {
    async carregarMensagensInternas() {
      try {
        const response = await listarNotificacoes({ userId: this.usuario.userId });
        this.mensagensInternas = response.data.notifications
          .filter(mensagem => mensagem.userId === this.usuario.userId)
          .map(mensagem => ({
            ...mensagem,
            isRead: mensagem.isRead || false // Adiciona a propriedade 'isRead' se não existir
          }));
      } catch (error) {
        console.error('Erro ao carregar mensagens internas:', error);
      }
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    },
    async marcarComoLida(id) {
      try {
        const userId = this.usuario.userId;
        await marcarMensagemComoLida(id, userId);
        this.mensagensInternas = this.mensagensInternas.map(msg => 
          msg.id === id ? { ...msg, isRead: true } : msg
        );
      } catch (error) {
        console.error('Erro ao marcar mensagem como lida:', error);
      }
    },
    async deletarMensagem(id) {
      try {
        await deletarNotificacao(id);
        this.mensagensInternas = this.mensagensInternas.filter(msg => msg.id !== id);
      } catch (error) {
        console.error('Erro ao deletar mensagem:', error);
      }
    },
    async enviarMensagem() {
      const data = {
        whatsappId: this.whatsappId.value,
        whatsappType: this.whatsappId.type,
        number: this.numero,
        message: this.mensagem,
      };
      try{
        await TextoIndividual(data)
        this.$q.notify({
          color: 'positive',
          position: 'top',
          message: 'Mensagem enviada para o número: ' + this.numero,
        });
        this.closeModal();
      } catch (e){
        this.$q.notify({
          color: 'negative',
          position: 'top',
          message: 'Erro ao enviar mensagem individual: ' + e.data.error,
        });
      }
      this.closeModal();
    },
    closeModal() {
      this.showModalMensagem = false;
      this.resetFields();
    },
    resetFields() {
      this.numero = '';
      this.mensagem = '';
      this.whatsappId = null;
    },
    async listarMensagens() {
      try {
        const privateMessageData = await listCountUnreadPrivateMessage(this.usuario.userId);
        const groupMessageData = await listCountUnreadGroupMessage(this.usuario.userId);
        this.notificacaoInternaNaoLida = privateMessageData.data.count + groupMessageData.data.count.count
      } catch(e){
      }
    },
    exibirMenuBeta (itemMenu) {
      if (!itemMenu?.isBeta) return true
      for (const domain of this.domainExperimentalsMenus) {
        if (this.usuario.email.indexOf(domain) !== -1) return true
      }
      return false
    },
    async listarWhatsapps () {
      const { data } = await ListarWhatsapps()
      this.$store.commit('LOAD_WHATSAPPS', data)
    },
    handlerNotifications (data) {
      const { message, contact, ticket } = data

      const options = {
        body: `${message.body} - ${format(new Date(), 'HH:mm')}`,
        icon: contact.profilePicUrl,
        tag: ticket.id,
        renotify: true
      }

      const notification = new Notification(
        `Mensagem de ${contact.name}`,
        options
      )

      notification.onclick = e => {
        e.preventDefault()
        window.focus()
        this.$store.dispatch('AbrirChatMensagens', ticket)
        this.$router.push({ name: 'atendimento' })

        // history.push(`/tickets/${ticket.id}`);
      }
      this.$nextTick(() => {
        // utilizar refs do layout
        this.$refs.audioNotification.play()
      })
    },
    async abrirModalUsuario () {
      this.modalUsuario = true
    },
    async efetuarLogout () {
      try {
        await RealizarLogout(this.usuario)
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        localStorage.removeItem('profile')
        localStorage.removeItem('userId')
        localStorage.removeItem('queues')
        localStorage.removeItem('usuario')
        localStorage.removeItem('filtrosAtendimento')

        this.$router.go({ name: 'login', replace: true })
      } catch (error) {
        this.$notificarErro('Não foi possível realizar logout', error)
      }
    },
    async listarConfiguracoes () {
      const { data } = await ListarConfiguracoes()
      localStorage.setItem('configuracoes', JSON.stringify(data))
    },
    conectarSocket (usuario) {
      socket.on(`${usuario.tenantId}:chat:updateOnlineBubbles`, data => {
        this.$store.commit('SET_USERS_APP', data)
      })
    },
    async atualizarUsuario () {
      this.usuario = JSON.parse(localStorage.getItem('usuario'))
      const { data } = await DadosUsuario(this.usuario.userId)
      if (!data.isOnline) {
        socket.emit(`${this.usuario.tenantId}:setUserIdle`)
      }
      if (data.isOnline) {
        socket.emit(`${this.usuario.tenantId}:setUserActive`)
      }
    },
    async dadosAsaas () {
      if(this.usuario.profile === "superadmin") return
      const { data } = await ListarTenantPorId(this.usuario.tenantId)
      if (data[0].asaas === 'enabled'){
        try{
          const { data } = await ListarTenantPorAsaas(this.usuario.tenantId)
          if (data.data.some(item => item.status === 'OVERDUE')) {
            this.menuData = objMenuBloqueio
            this.menuDataAdmin = []
            this.$q.notify({
              color: 'warning',
              position: 'top',
              message: 'Entre em contato com o administrador do sistema!',
            });
          }
        } catch(e){
          console.log('Não foi possível listar as opções de pagamento')
        }
      }
    },
    async aceitarTermos(){
      const { data } = await ListarTenantsPorTermos();
      const tenant = data.find(tenant => tenant.tenantId === this.usuario.tenantId);
      const hasFalseAcceptTerms = tenant && !tenant.acceptTerms;
      if (hasFalseAcceptTerms && this.usuario.profile !== 'superadmin') {
        this.$q.notify({
          type: 'negative',
          message: 'Solicite ao Super Administrador o aceite dos termos de uso da sua empresa.',
          progress: true,
          actions: [{ icon: 'close', round: true, color: 'white' }],
        });
        this.showModal = true;
      }
      const tenantWithFalseAcceptTerms = data.find(tenant => !tenant.acceptTerms);
      if (tenantWithFalseAcceptTerms  && this.usuario.profile === 'superadmin') {
        console.log(`Tenant com acceptTerms falso: ${tenantWithFalseAcceptTerms.tenantId}`);
        this.$q.notify({
          type: 'negative',
          message: 'Solicite ao Super Administrador o aceite dos termos de uso para o tenant ' + tenantWithFalseAcceptTerms.tenantId + '.',
          progress: true,
          actions: [{ icon: 'close', round: true, color: 'white' }],
        });
        this.showModal = true;
      }
    },
    async handleAcceptance() {
      try {
        await AceitarTermos({
          id: this.usuario.tenantId,
          acceptTerms: true,
        })
        this.$q.notify({
          type: 'positive',
          message: 'Termos aceitos com sucesso para o domínio ' + process.env.URL_API,
          progress: true,
          actions: [{ icon: 'close', round: true, color: 'white' }],
        })
        window.location.reload();
      } catch (error) {
        console.error('error - AlterarConfiguracao', error)
        this.$notificarErro('Ocorreu um erro!', error)
      } 
    },
    async consultarTickets () {
      const params = {
        searchParam: '',
        pageNumber: 1,
        status: ['open', 'pending'],
        showAll: false,
        count: null,
        queuesIds: [],
        withUnreadMessages: true,
        isNotAssignedUser: false,
        includeNotQueueDefined: true
        // date: new Date(),
      }
      try {
        const { data } = await ConsultarTickets(params)
        this.countTickets = data.count // count total de tickets no status
        // this.ticketsList = data.tickets
        // console.log(data)
        this.$store.commit('UPDATE_NOTIFICATIONS', data)
        setTimeout(() => {
          this.$store.commit('UPDATE_NOTIFICATIONS', data)
        }, 500);
        // this.$store.commit('SET_HAS_MORE', data.hasMore)
        // console.log(this.notifications)
      } catch (err) {
        this.$notificarErro('Algum problema ao consultar tickets', err)
        console.error(err)
      }
      const params2 = {
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
        const { data } = await ConsultarTickets(params2)
        this.countTickets = data.count // count total de tickets no status
        // this.ticketsList = data.tickets
        // console.log(data)
        this.$store.commit('UPDATE_NOTIFICATIONS_P', data)
        setTimeout(() => {
          this.$store.commit('UPDATE_NOTIFICATIONS_P', data)
        }, 500);
        // this.$store.commit('SET_HAS_MORE', data.hasMore)
        // console.log(this.notifications)
      } catch (err) {
        this.$notificarErro('Algum problema ao consultar tickets 5', err)
        console.error(err)
      }
    },
    abrirChatContato (ticket) {
      // caso esteja em um tamanho mobile, fechar a drawer dos contatos
      if (this.$q.screen.lt.md && ticket.status !== 'pending') {
        this.$root.$emit('infor-cabecalo-chat:acao-menu')
      }
      if (!(ticket.status !== 'pending' && (ticket.id !== this.$store.getters.ticketFocado.id || this.$route.name !== 'chat'))) return
      this.$store.commit('SET_HAS_MORE', true)
      this.$store.dispatch('AbrirChatMensagens', ticket)
    },
    abrirAtendimentoExistente (contato, ticket) {
      this.$q.dialog({
        title: 'Atenção!!',
        message: `${contato} possui um atendimento em curso (Atendimento: ${ticket.id}). Deseja abrir o atendimento?`,
        cancel: {
          label: 'Não',
          color: 'primary',
          push: true
        },
        ok: {
          label: 'Sim',
          color: 'negative',
          push: true
        },
        persistent: true
      }).onOk(async () => {
        try {
          this.abrirChatContato(ticket)
        } catch (error) {
          this.$notificarErro(
            'Não foi possível atualizar o token',
            error
          )
        }
      })
    }
  },
  async mounted () {
    this.atualizarUsuario()
    await this.listarWhatsapps()
    await this.listarConfiguracoes()
    await this.consultarTickets()
    await this.listarMensagens()
    this.carregarMensagensInternas();
    if (!('Notification' in window)) {
    } else {
      Notification.requestPermission()
    }
    this.usuario = JSON.parse(localStorage.getItem('usuario'))
    this.userProfile = localStorage.getItem('profile')
    this.dadosAsaas()
    this.aceitarTermos()
    await this.conectarSocket(this.usuario)
  },
  destroyed () {
    socket.disconnect()
  }
}
</script>
<style scoped>
.q-img__image {
  background-size: contain;
}

.mensagem-lida {
  background-color: #e0e0e0;
  color: #757575;
}

</style>
