<template>
  <div class="WAL position-relative bg-grey-3" :style="style">
    <q-layout class="WAL__layout shadow-3" container view="lHr LpR lFr">

      <q-drawer
        v-model="drawerTickets"
        @hide="drawerTickets = false"
        show-if-above
        :overlay="$q.screen.lt.md"
        persistent
        :breakpoint="769"
        bordered
        :width="$q.screen.lt.md ? $q.screen.width : 380"
        content-class="hide-scrollbar full-width"
      >
      <q-toolbar class="q-pr-none q-gutter-xs full-width" style="height: 64px">
          <q-btn-dropdown no-caps flat class="bg-padrao text-bold btn-rounded" ripple>
            <template v-slot:label>
              <!-- <div :style="{ maxWidth: $q.screen.lt.sm ? '120px' : '' }" class="ellipsis">
                {{ username }}
              </div> -->
                <div :style="{ maxWidth: $q.screen.lt.sm ? '120px' : '', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '20ch' }" class="ellipsis">
                {{ username }}
                </div>
            </template>
            <q-list style="min-width: 100px">
              <q-item clickable v-close-popup @click="abrirModalUsuario">
                <q-item-section>Perfil</q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="efetuarLogout">
                <q-item-section>Sair</q-item-section>
              </q-item>
              <q-separator />
            </q-list>
          </q-btn-dropdown>
          <q-space />
          <q-btn flat class="bg-padrao btn-rounded" icon="mdi-forum-outline" @click="() => $router.push({ name: 'chat-privado' })" :disable="loadingMount">
            <q-tooltip content-class="bg-padrao text-grey-9 text-bold"> Chat Interno </q-tooltip>
            <q-badge v-if="this.notificacaoInternaNaoLida > 0"
              color="red"
              floating
              class="badge-left"
            > {{ this.notificacaoInternaNaoLida }}</q-badge>
          </q-btn>
          <q-btn flat class="bg-padrao btn-rounded" icon="mdi-clipboard-list-outline" @click="tarefaEdicao = {}; modalTarefa = true" :disable="loadingMount">
            <q-tooltip content-class="bg-padrao text-grey-9 text-bold"> Criar Tarefa </q-tooltip>
          </q-btn>
          <q-btn style="margin-right: 5px;" flat class="bg-padrao btn-rounded" icon="mdi-home" @click="() => $router.push({ name: 'home-dashboard' })" :disable="loadingMount">
            <q-tooltip content-class="bg-padrao text-grey-9 text-bold"> Retornar ao menu </q-tooltip>
          </q-btn>
        </q-toolbar>
        <q-linear-progress
          v-if="loadingMount"
          indeterminate
          color="primary"
          class="absolute-top"
          style="width: 100%;"
        />
        <StatusWhatsapp v-if="false" class="q-mx-sm full-width" />

        <q-toolbar class="items-center">
          <q-separator class="absolute-top" />
          <div class="full-width">
            <q-tabs
              v-model="tabTickets"
              narrow-indicator
              dense
              :active-bg-color="$q.dark.isActive ? 'primary' : 'grey-3'"
              inline-label
              align="justify"
              :class="{
                'text-white': $q.dark.isActive,
                'text-black': !$q.dark.isActive
              }"
              class="btn-rounded"
            >
            <q-tab
              :ripple="false"
              name="private"
              icon="mdi-account-outline"
            >
            <q-badge
              v-if="contadorUniversal === 'enabled'"
              color="red"
              floating
              class="badge-left"
            > {{ privateMessages.length }}</q-badge>
              <q-tooltip content-class="bg-padrao text-grey-9 text-bold"> Conversas Privadas </q-tooltip>
            </q-tab>
            <q-tab
              v-if="grupoAtivo === 'disabled'"
              :ripple="false"
              name="groups"
              icon="mdi-account-group-outline"
            >
            <q-badge
              v-if="contadorUniversal === 'enabled'"
              color="red"
              floating
              class="badge-left"
            > {{ groupMessages.length }}</q-badge>
            <q-tooltip content-class="bg-padrao text-grey-9 text-bold"> Conversas em Grupo </q-tooltip>
            </q-tab>
            </q-tabs>
          </div>
        </q-toolbar>
        
        <q-toolbar v-show="toolbarSearch" class="row q-gutter-sm q-py-sm items-center">
          <q-separator class="absolute-top" />
          <q-btn :icon="!cFiltroSelecionado ? 'mdi-filter-outline' : 'mdi-filter-plus'" flat class="bg-padrao btn-rounded" :color="cFiltroSelecionado ? 'deep-orange-9' : 'primary'" style="flex: 1;">
            <q-menu content-class="shadow-10 no-scroll" square>
              <div class="row q-pa-sm" style="min-width: 350px; max-width: 350px">
                <div class="q-ma-sm">
                  <div class="text-h6 q-mb-md">Filtros Avançados</div>
                  <q-toggle
                    v-if="profile === 'admin'"
                    class="q-ml-lg"
                    v-model="pesquisaTickets.showAll"
                    label="Visualizar Tickets"
                    :class="{ 'q-mb-lg': pesquisaTickets.showAll }"
                    @input="debounce(BuscarTicketFiltro(), 700)"
                  />
                  <q-separator class="q-mb-md" v-if="!pesquisaTickets.showAll"  />
                  <div v-if="!pesquisaTickets.showAll ">
                    <q-select
                      :disable="pesquisaTickets.showAll"
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
                      :options="filasUser"
                      :input-debounce="700"
                      option-value="id"
                      option-label="queue"
                      @input="debounce(BuscarTicketFiltro(), 700)"
                      input-style="width: 300px; max-width: 300px;"
                    />

                    <q-list dense class="q-my-md">
                      <q-item tag="label" v-ripple>
                        <q-item-section avatar>
                          <q-checkbox v-model="pesquisaTickets.status" val="open" color="primary" keep-color @input="debounce(BuscarTicketFiltro(), 700)" />
                        </q-item-section>
                        <q-item-section>
                          <q-item-label>Abertos</q-item-label>
                        </q-item-section>
                      </q-item>
                      <!-- <q-item tag="label" v-ripple v-if="profile === 'admin'">
                        <q-item-section avatar>
                          <q-checkbox v-model="pesquisaTickets.showAll" color="negative" keep-color @input="debounce(BuscarTicketFiltro(), 700)" />
                          <q-checkbox v-model="pesquisaTickets.status" val="pending" color="negative" keep-color @input="debounce(BuscarTicketFiltro(), 700)" />
                        </q-item-section>
                        <q-item-section>
                          <q-item-label>Pendentes</q-item-label>
                        </q-item-section>
                      </q-item> -->
                      <q-item tag="label" v-ripple>
                        <q-item-section avatar>
                          <q-checkbox v-model="pesquisaTickets.status" val="pending" color="negative" keep-color @input="debounce(BuscarTicketFiltro(), 700)" />
                        </q-item-section>
                        <q-item-section>
                          <q-item-label>Pendentes</q-item-label>
                        </q-item-section>
                      </q-item>
                      <q-item tag="label" v-ripple>
                        <q-item-section avatar>
                          <q-checkbox v-model="pesquisaTickets.status" val="closed" color="positive" keep-color @input="debounce(BuscarTicketFiltro(), 700)" />
                        </q-item-section>
                        <q-item-section>
                          <q-item-label>Resolvidos</q-item-label>
                        </q-item-section>
                      </q-item>
                    </q-list>
                    <q-separator class="q-mb-md" />
                    <q-toggle v-model="pesquisaTickets.withUnreadMessages" label="Somente Tickets com mensagens não lidas" @input="debounce(BuscarTicketFiltro(), 700)" />
                    <!-- <q-toggle v-model="pesquisaTickets.isNotAssignedUser" label="Somente Tickets não atribuidos (sem usuário definido)" @input="debounce(BuscarTicketFiltro(), 700)" /> -->
                  </div>
                  <q-separator class="q-my-md" spaced v-if="!pesquisaTickets.showAll" />
                  <q-btn class="float-right q-my-md" color="primary" label="Fechar" push v-close-popup />
                </div>
              </div>
            </q-menu>
            <q-tooltip content-class="bg-padrao text-grey-9 text-bold"> Filtro Avançado </q-tooltip>
          </q-btn>
          <q-input v-model="pesquisaTickets.searchParam" dense outlined rounded type="search" class="col-grow" :debounce="700" @input="BuscarTicketFiltro()" style="flex: 2;">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
          <q-btn flat class="bg-padrao btn-rounded" icon="mdi-book-account-outline" @click="$q.screen.lt.md ? (modalNovoTicket = true) : $router.push({ name: 'chat-contatos' })" style="flex: 1;">
            <q-tooltip content-class="bg-padrao text-grey-9 text-bold"> Contatos </q-tooltip>
          </q-btn>
          <q-btn flat class="bg-padrao btn-rounded" icon="mdi-text-box-plus-outline" @click="loadMoreOpenTickets()" v-if="hasMoreTickets"  style="flex: 1;">
            <q-tooltip content-class="bg-padrao text-grey-9 text-bold"> Carregar Mais Atendimentos </q-tooltip>
          </q-btn>
          <!-- <q-toolbar class="q-space-between q-flex items-right"> -->
          <!-- <q-btn
            v-if="hasMoreTickets"
            @click="loadMoreOpenTickets"
            class="q-ml-auto"
            style="z-index: 2;"
            icon="mdi-book-account-outline"
          >
          </q-btn> -->
        <!-- </q-toolbar> -->
          <q-separator class="absolute-bottom" />
        </q-toolbar>

        <q-toolbar v-show="toolbarSearch" class="row q-gutter-sm q-py-sm items-center" v-if="fixarConexao === 'enabled'">
          <q-toggle
            size="xl"
            keep-color
            dense
            class="text-bold q-ml-md flex flex-block"
            :icon-color="$q.dark.isActive ? 'black' : 'white'"
            :value="$q.dark.isActive"
            :color="$q.dark.isActive ? 'grey-3' : 'black'"
            checked-icon="mdi-white-balance-sunny"
            unchecked-icon="mdi-weather-sunny"
            @input="$setConfigsUsuario({ isDark: !$q.dark.isActive })"
          >
            <q-tooltip content-class="text-body1"> {{ $q.dark.isActive ? 'Desativar' : 'Ativar' }} Modo Escuro (Dark Mode) </q-tooltip>
          </q-toggle>
          <div class="flex flex-inline q-pt-xs">
            <q-scroll-area horizontal style="height: 40px; width: 300px">
              <template v-for="item in whatsapps">
                  <q-btn rounded flat dense size="18px" :key="item.id" class="q-mx-xs q-pa-none" :style="`opacity: ${item.status === 'CONNECTED' ? 1 : 0.2}`" :icon="`img:${item.type}-logo.png`">
                    <q-tooltip max-height="300px" content-class="bg-blue-1 text-body1 text-grey-9 hide-scrollbar">
                      <ItemStatusChannel :item="item" />
                    </q-tooltip>
                  </q-btn>
              </template>
            </q-scroll-area>
          </div>
          <q-separator class="absolute-bottom" />
        </q-toolbar>

        <q-toolbar
          v-show="tabTickets === 'private'"
          class="items-center"
        >
          <div class="full-width q-py-xs">
            <q-tabs
              v-model="tabTicketsStatus"
              narrow-indicator
              dense
              align="justify"
              :active-bg-color="$q.dark.isActive ? 'primary' : 'grey-2'"
              class="text-primary btn-rounded"
            >
              <q-tab
                :ripple="false"
                name="open"
                icon="mdi-message-processing-outline"
                label="Aberto"
                :class="{
                'text-white': $q.dark.isActive,
                'text-black': !$q.dark.isActive
                }"
              >
                <q-badge
                  color="red"
                  floating
                  class="badge-left"
                > {{ openTickets.length }}</q-badge>
                <q-tooltip content-class="bg-padrao text-grey-9 text-bold"> Conversas Privadas </q-tooltip>
              </q-tab>
              <q-tab
                :ripple="false"
                name="pending"
                icon="mdi-message-text-clock-outline"
                label="Pendente"
                :class="{
                'text-white': $q.dark.isActive,
                'text-black': !$q.dark.isActive
                }"
              >
                <q-badge
                  color="red"
                  floating
                  class="badge-left"
                > {{ pendingTickets.length }}</q-badge>
                <q-tooltip content-class="bg-padrao text-grey-9 text-bold"> Conversas Privadas </q-tooltip>
              </q-tab>
              <q-tab
                :ripple="false"
                name="closed"
                icon="mdi-message-text-lock-outline"
                label="Fechado"
                :class="{
                'text-white': $q.dark.isActive,
                'text-black': !$q.dark.isActive
                }"
              >
                <q-badge
                  color="red"
                  floating
                  class="badge-left"
                > {{ closedTickets.length }}</q-badge>
                <q-tooltip content-class="bg-padrao text-grey-9 text-bold"> Conversas Privadas </q-tooltip>
              </q-tab>
              <q-tab
                v-if="chatBotLane === 'enabled'"
                :ripple="false"
                name="chatbot"
                icon="mdi-message-cog-outline"
                label="Chatbot"
                :class="{
                'text-white': $q.dark.isActive,
                'text-black': !$q.dark.isActive
                }"
              >
                <q-badge
                  color="red"
                  floating
                  class="badge-left"
                > {{ pendingTicketsChatBot.length }}</q-badge>
                <q-tooltip content-class="bg-padrao text-grey-9 text-bold"> Conversas Privadas </q-tooltip>
              </q-tab>
            </q-tabs>
          </div>
        </q-toolbar>

        <q-toolbar
          v-show="tabTickets === 'groups'"
          class="items-center"
        >
          <div class="full-width q-py-xs">
            <q-tabs
              v-model="tabTicketsStatus"
              narrow-indicator
              dense
              align="justify"
              :active-bg-color="$q.dark.isActive ? 'primary' : 'grey-2'"
              class="text-primary btn-rounded"
            >
              <q-tab
                :ripple="false"
                name="open"
                icon="mdi-message-processing"
                label="Aberto"
                :class="{
                'text-white': $q.dark.isActive,
                'text-black': !$q.dark.isActive
                }"
              >
                <q-badge
                  color="red"
                  floating
                  class="badge-left"
                > {{ openGroupTickets.length }}</q-badge>
                <q-tooltip content-class="bg-padrao text-grey-9 text-bold"> Conversas em Grupo </q-tooltip>
              </q-tab>
              <q-tab
                :ripple="false"
                name="pending"
                icon="mdi-message-text-clock"
                label="Pendente"
                :class="{
                'text-white': $q.dark.isActive,
                'text-black': !$q.dark.isActive
                }"
              >
                <q-badge
                  color="red"
                  floating
                  class="badge-left"
                > {{ pendingGroupTickets.length }}</q-badge>
                <q-tooltip content-class="bg-padrao text-grey-9 text-bold"> Conversas em Grupo </q-tooltip>
              </q-tab>
              <q-tab
                :ripple="false"
                name="closed"
                icon="mdi-message-text-lock"
                label="Fechado"
                :class="{
                'text-white': $q.dark.isActive,
                'text-black': !$q.dark.isActive
                }"
              >
                <q-badge
                  color="red"
                  floating
                  class="badge-left"
                > {{ closedGroupTickets.length }}</q-badge>
                <q-tooltip content-class="bg-padrao text-grey-9 text-bold"> Conversas em Grupo </q-tooltip>
              </q-tab>
            </q-tabs>
          </div>
        </q-toolbar>
          
        <q-scroll-area
          ref="scrollAreaTickets" style="height: calc(100% - 180px)"
          @scroll="onScroll"
        >

          <ItemTicket
            v-show="tabTickets === 'private' && tabTicketsStatus === 'open'"
            v-for="ticket in openTickets"
            :key="ticket.id"
            :ticket="ticket"
            :filas="filas"
          />

          <ItemTicket
            v-show="tabTickets === 'private' && tabTicketsStatus === 'pending'"
            v-for="ticket in pendingTickets"
            :key="ticket.id"
            :ticket="ticket"
            :filas="filas"
          />

          <ItemTicket
            v-show="tabTickets === 'private' && tabTicketsStatus === 'chatbot'"
            v-for="ticket in pendingTicketsChatBot"
            :key="ticket.id+'bot'"
            :ticket="ticket"
            :filas="filas"
          />

          <ItemTicket
            v-show="tabTickets === 'private' && tabTicketsStatus === 'closed'"
            v-for="ticket in closedTickets"
            :key="ticket.id"
            :ticket="ticket"
            :filas="filas"
          />

          <ItemTicket
          v-show="tabTickets === 'groups' && tabTicketsStatus === 'open'"
            v-for="ticket in openGroupTickets"
            :key="ticket.id"
            :ticket="ticket"
            :filas="filas"
          />

          <ItemTicket
          v-show="tabTickets === 'groups' && tabTicketsStatus === 'pending'"
            v-for="ticket in pendingGroupTickets"
            :key="ticket.id"
            :ticket="ticket"
            :filas="filas"
          />

          <ItemTicket
          v-show="tabTickets === 'groups' && tabTicketsStatus === 'closed'"
            v-for="ticket in closedGroupTickets"
            :key="ticket.id"
            :ticket="ticket"
            :filas="filas"
          />

          <div v-if="loading">
            <div class="row justify-center q-my-md">
              <q-spinner
                color="white"
                size="3em"
                :thickness="3"
              />
            </div>
            <div class="row col justify-center q-my-sm text-white">
              Carregando...
            </div>
          </div>
        </q-scroll-area>

        <div class="absolute-bottom row justify-between" style="height: 50px" v-if="fixarConexao === 'disabled'">
          <q-toggle
            size="xl"
            keep-color
            dense
            class="text-bold q-ml-md flex flex-block"
            :icon-color="$q.dark.isActive ? 'black' : 'white'"
            :value="$q.dark.isActive"
            :color="$q.dark.isActive ? 'grey-3' : 'black'"
            checked-icon="mdi-white-balance-sunny"
            unchecked-icon="mdi-weather-sunny"
            @input="$setConfigsUsuario({ isDark: !$q.dark.isActive })"
          >
            <q-tooltip content-class="text-body1"> {{ $q.dark.isActive ? 'Desativar' : 'Ativar' }} Modo Escuro (Dark Mode) </q-tooltip>
          </q-toggle>
          <div class="flex flex-inline q-pt-xs">
            <q-scroll-area horizontal style="height: 40px; width: 300px">
              <template v-for="item in whatsapps">
                  <q-btn rounded flat dense size="18px" :key="item.id" class="q-mx-xs q-pa-none" :style="`opacity: ${item.status === 'CONNECTED' ? 1 : 0.2}`" :icon="`img:${item.type}-logo.png`">
                    <q-tooltip max-height="300px" content-class="bg-blue-1 text-body1 text-grey-9 hide-scrollbar">
                      <ItemStatusChannel :item="item" />
                    </q-tooltip>
                  </q-btn>
              </template>
            </q-scroll-area>
          </div>
        </div>
      </q-drawer>

      <q-page-container>
        <router-view :mensagensRapidas="mensagensRapidas" :key="ticketFocado.id"></router-view>
      </q-page-container>
    
      <q-drawer v-if="!cRouteContatos && ticketFocado.id" v-model="drawerContact" show-if-above bordered side="right" content-class="bg-grey-1" @on-show="carregarIntegracaoStatus">
        <div class="bg-white full-width no-border-radius q-pa-sm" style="height: 60px">
          <span class="q-ml-md text-h6"> Dados Contato </span>
        </div>
        
        <q-scroll-area style="height: calc(100vh - 70px)">
          <div class="q-pa-sm">
            <q-card class="bg-white btn-rounded" style="width: 100%" bordered flat>
              <q-card-section class="text-bold q-pa-sm">
                <q-btn flat class="btn-outline btn-small" @click="toggleDrawer" label="Reduzir Menu" icon="mdi-arrow-collapse-right" /> 
              </q-card-section>
            </q-card>
            <q-card class="bg-white btn-rounded q-mt-sm" style="width: 100%" bordered flat>
              <q-card-section class="text-center">
                <q-avatar style="border: 1px solid #9e9e9ea1 !important; width: 100px; height: 100px">
                  <q-icon name="mdi-account" style="width: 100px; height: 100px" size="6em" color="grey-5" v-if="!ticketFocado.contact.profilePicUrl" />
                  <q-img :src="ticketFocado.contact.profilePicUrl" style="width: 100px; height: 100px">
                    <template v-slot:error>
                      <q-icon name="mdi-account" size="1.5em" color="grey-5" />
                    </template>
                  </q-img>
                </q-avatar>
                <div class="contact-info">
                  <div class="contact-details">
                    <div class="contact-item">
                      <span class="contact-label">Nome:</span>
                      <span class="contact-value">{{ ticketFocado.contact.name || '' }}</span>
                    </div>
                    <div class="contact-item">
                      <span class="contact-label">Telefone:</span>
                      <span class="contact-value">
                        <template v-if="ticketFocado.contact.number">
                          <a :href="getPhoneNumberLink(ticketFocado.contact.number)">
                            {{ ticketFocado.contact.number }}
                          </a>
                        </template>
                      </span>
                    </div>
                    <div class="contact-item" v-if="ticketFocado.contact.email">
                      <span class="contact-label">Email:</span>
                      <span class="contact-value">
                        <template v-if="ticketFocado.contact.email">
                          <a :href="'mailto:' + ticketFocado.contact.email">{{ ticketFocado.contact.email }}</a>
                        </template>
                        <template v-else>
                          {{ ticketFocado.contact.email || '' }}
                        </template>
                      </span>
                    </div>
                    <div class="contact-item" v-if="ticketFocado.contact.cpf">
                      <span class="contact-label">CPF:</span>
                      <span class="contact-value">
                        <template v-if="ticketFocado.contact.cpf">
                          {{ ticketFocado.contact.cpf }}
                        </template>
                        <template v-else>
                          {{ ticketFocado.contact.cpf || '' }}
                        </template>
                      </span>
                    </div>
                    <div class="contact-item" v-if="ticketFocado.contact.firstName">
                      <span class="contact-label">Data de Aniversário:</span>
                      <span class="contact-value">
                        <template v-if="ticketFocado.contact.birthdayDate">
                          {{ ticketFocado.contact.birthdayDate }}
                        </template>
                        <template v-else>
                          {{ ticketFocado.contact.birthdayDate || '' }}
                        </template>
                      </span>
                    </div>
                    <div class="contact-item" v-if="ticketFocado.contact.firstName">
                      <span class="contact-label">Primeiro nome:</span>
                      <span class="contact-value">
                        <template v-if="ticketFocado.contact.firstName">
                          {{ ticketFocado.contact.firstName }}
                        </template>
                        <template v-else>
                          {{ ticketFocado.contact.firstName || '' }}
                        </template>
                      </span>
                    </div>
                    <div class="contact-item" v-if="ticketFocado.contact.lastName">
                      <span class="contact-label">Sobrenome:</span>
                      <span class="contact-value">
                        <template v-if="ticketFocado.contact.lastName">
                          {{ ticketFocado.contact.lastName }}
                        </template>
                        <template v-else>
                          {{ ticketFocado.contact.lastName || '' }}
                        </template>
                      </span>
                    </div>
                    <div class="contact-item" v-if="ticketFocado.contact.businessName">
                      <span class="contact-label">Empresa:</span>
                      <span class="contact-value">
                        <template v-if="ticketFocado.contact.businessName">
                          {{ ticketFocado.contact.businessName }}
                        </template>
                        <template v-else>
                          {{ ticketFocado.contact.businessName || '' }}
                        </template>
                      </span>
                    </div>
                  </div>
                </div>
                <!-- <div class="text-caption q-mt-md blur-effect" style="font-size: 14px">
                  {{ ticketFocado.contact.name || '' }}
                </div>
                <div class="text-caption q-mt-sm blur-effect" style="font-size: 14px" id="number">
                  <template v-if="ticketFocado.contact.number">
                    <a :href="getPhoneNumberLink(ticketFocado.contact.number)">
                      {{ ticketFocado.contact.number }}
                    </a>
                  </template>
                </div>
                <div class="text-caption q-mt-md" style="font-size: 14px" id="email">
                  <template v-if="ticketFocado.contact.email">
                    <a :href="'mailto:' + ticketFocado.contact.email">{{ ticketFocado.contact.email }}</a>
                  </template>
                  <template v-else>
                    {{ ticketFocado.contact.email || '' }}
                  </template>
                </div>
                <div class="text-caption q-mt-md" style="font-size: 14px" id="email">
                  <template v-if="ticketFocado.contact.cpf">
                    {{ ticketFocado.contact.cpf }}
                  </template>
                  <template v-else>
                    {{ ticketFocado.contact.cpf || '' }}
                  </template>
                </div>
                <div class="text-caption q-mt-md" style="font-size: 14px" id="email">
                  <template v-if="ticketFocado.contact.birthdayDate">
                    {{ ticketFocado.contact.birthdayDate }}
                  </template>
                  <template v-else>
                    {{ ticketFocado.contact.birthdayDate || '' }}
                  </template>
                </div> -->
                <q-btn flat class="btn-outline btn-small" style="margin-right: 4px;" label="SMS" @click="abrirModalSMS(getPhoneNumberSMS(ticketFocado.contact.number))" v-if="smsAtivo" />
                <q-btn flat class="btn-outline btn-small" label="Editar" @click="editContact(ticketFocado.contact.id)" />
                <template v-if="cIsExtraInfo">
                  <q-list>
                    <q-item v-for="(info, idx) in ticketFocado.contact.extraInfo" :key="idx">
                      <q-item-section>
                        <q-item-label>{{ info.value }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </template>
              </q-card-section>
            </q-card>
            <q-card class="bg-white btn-rounded q-mt-sm" style="width: 100%" bordered flat>
              <q-card-section class="text-bold q-pa-sm">
                <q-btn 
                  style="margin-right: 4px;"
                  icon="mdi-email-open-outline" 
                  flat 
                  class="btn-outline btn-small" 
                  @click="atualizarLido(ticketFocado)" >
                  <q-tooltip content-class="bg-primary text-bold">
                    Marcar Como Lido
                  </q-tooltip>
                </q-btn>
                <q-btn 
                  style="margin-right: 4px;"
                  icon="mdi-email-outline" 
                  flat 
                  class="btn-outline btn-small" 
                  @click="atualizarNaoLido(ticketFocado)" >
                  <q-tooltip content-class="bg-primary text-bold">
                    Marcar Como Não Lido
                  </q-tooltip>
                </q-btn>
                <q-btn flat class="btn-outline btn-small" label="Logs" icon="mdi-timeline-text-outline" @click="abrirModalLogs" />
              </q-card-section>
            </q-card>
            <q-card class="bg-white btn-rounded q-mt-sm" style="width: 100%" bordered flat v-if="(ticketFocado.channel === 'whatsapp')">
              <q-card-section class="text-bold q-pa-sm">
                <q-btn flat class="btn-outline btn-small" label="Sincronizar Histórico" icon="mdi-sync" @click="syncOldMessagesByUserWhatsapp(ticketFocado)" />
              </q-card-section>
            </q-card>
            
            <q-card class="bg-white btn-rounded q-mt-sm" style="width: 100%" bordered flat v-if="ticketFocado.channel !== 'instagram' && ticketFocado.channel !== 'telegram'">
              <q-card-section class="q-pa-none">
                <q-item tag="label" v-ripple>
                  <q-item-section>
                    <q-item-label>Protocolo</q-item-label>
                    <q-item-label caption>Protocolos de atendimento. </q-item-label>
                  </q-item-section>
                </q-item>
              </q-card-section>
                <q-card-section class="q-pa-sm">
                  <q-item>
                    <q-card-section class="text-bold q-pa-sm" style="flex: 1;">
                      <q-btn flat class="btn-outline btn-small" label="Enviar" icon="mdi-send-check" @click="sendProtocol(ticketFocado)" />
                    </q-card-section>
                    <q-card-section class="text-bold q-pa-sm" style="flex: 1;">
                      <q-btn flat class="btn-outline btn-small" label="Logs" icon="mdi-timeline-text-outline" @click="abrirModalProtocoloLogs" />
                    </q-card-section>
                  </q-item>
                </q-card-section>
            </q-card>

            <q-card class="bg-white btn-rounded q-mt-sm" style="width: 100%" bordered flat v-if="ticketFocado.channel !== 'instagram' && ticketFocado.channel !== 'telegram'">
              <q-card-section class="q-pa-none">
                <q-item tag="label" v-ripple>
                  <q-item-section>
                    <q-item-label>Avaliação</q-item-label>
                    <q-item-label caption>Avaliações de atendimento. </q-item-label>
                  </q-item-section>
                </q-item>
              </q-card-section>
              <q-card-section class="q-pa-sm">
                <q-item>
                  <q-card-section class="text-bold q-pa-sm" style="flex: 1;">
                    <q-btn flat class="btn-outline btn-small" label="Enviar" icon="mdi-send-check" @click="sendEvaluation(ticketFocado)" />
                  </q-card-section>
                  <q-card-section class="text-bold q-pa-sm" style="flex: 1;">
                    <q-btn flat class="btn-outline btn-small" label="Logs" icon="mdi-timeline-text-outline" @click="abrirModalAvaliacaoLogs" />
                  </q-card-section>
                </q-item>
              </q-card-section>
            </q-card>

            <q-card class="bg-white btn-rounded q-mt-sm" style="width: 100%" bordered flat>
              <q-card-section class="q-pa-none">
                <q-item tag="label" v-ripple>
                  <q-item-section>
                    <q-item-label>Notas</q-item-label>
                    <q-item-label caption>Notas de atendimento. </q-item-label>
                  </q-item-section>
                </q-item>
              </q-card-section>
              <q-card-section class="q-pa-sm">
                <q-item>
                  <q-card-section class="text-bold q-pa-sm" style="flex: 1;">
                    <q-btn flat class="btn-outline btn-small" label="Registrar" icon="mdi-clipboard-text-multiple-outline" @click="abrirModalNota" />
                  </q-card-section>
                  <q-card-section class="text-bold q-pa-sm" style="flex: 1;">
                    <q-btn flat class="btn-outline btn-small" label="Logs" icon="mdi-timeline-text-outline" @click="abrirModalNotaLogs" />
                  </q-card-section>
                </q-item>
              </q-card-section>
            </q-card>

            <q-card class="bg-white btn-rounded q-mt-sm" style="width: 100%" bordered flat>
              <q-card-section class="q-pa-none">
                <q-item tag="label" v-ripple>
                  <q-item-section>
                    <q-item-label>Extrair Conversas</q-item-label>
                    <q-item-label caption>Download em PDF</q-item-label>
                  </q-item-section>
                </q-item>
              </q-card-section>
              <q-card-section class="q-pa-sm">
                <q-item>
                  <q-card-section class="text-bold q-pa-sm" style="flex: 1;">
                    <q-btn flat class="btn-outline btn-small" label="Baixar Arquivo PDF" icon="mdi-clipboard-text-multiple-outline" @click="downloadPDF" />
                  </q-card-section>
                </q-item>
              </q-card-section>
            </q-card>

            <q-card class="bg-white q-mt-sm btn-rounded" style="width: 100%" bordered flat :key="ticketFocado.id + $uuid()" v-if="typebotAtivo === 'enabled'">
              <q-card-section class="q-pa-none">
                <q-item tag="label" v-ripple>
                  <q-item-section>
                    <q-item-label>TypeBOT</q-item-label>
                    <q-item-label caption> Quando ativo, o sistema consumirá o TypeBOT. </q-item-label>
                  </q-item-section>

                  <q-item-section avatar>
                    <q-toggle
                      v-model="typebotStatus"
                      checked-icon="check"
                      keep-color
                      :color="typebotStatus ? 'green' : 'negative'"
                      size="md"
                      unchecked-icon="clear"
                      @input="atualizarTypebot('typebotStatus')"
                    />
                  </q-item-section>
                </q-item>
              </q-card-section>
            </q-card>

            <q-card class="bg-white q-mt-sm btn-rounded" style="width: 100%" bordered flat :key="ticketFocado.id + $uuid()"  v-if="dialogflowAtivo === 'enabled' && (ticketFocado.channel !== 'waba' && ticketFocado.channel !== 'telegram')">
              <q-card-section class="q-pa-none">
                <q-item tag="label" v-ripple>
                  <q-item-section>
                    <q-item-label>DialogFlow</q-item-label>
                    <q-item-label caption> Quando ativo, o sistema consumirá o Dialogflow. </q-item-label>
                  </q-item-section>

                  <q-item-section avatar>
                    <q-toggle
                      v-model="dialogflowStatus"
                      checked-icon="check"
                      keep-color
                      :color="dialogflowStatus ? 'green' : 'negative'"
                      size="md"
                      unchecked-icon="clear"
                      @input="atualizarDialogflow('dialogflowStatus')"
                    />
                  </q-item-section>
                </q-item>
              </q-card-section>
            </q-card>

            <q-card class="bg-white q-mt-sm btn-rounded" style="width: 100%" bordered flat :key="ticketFocado.id + $uuid()"  v-if="chatgptAtivo === 'enabled'">
              <q-card-section class="q-pa-none">
                <q-item tag="label" v-ripple>
                  <q-item-section>
                    <q-item-label>ChatGPT</q-item-label>
                    <q-item-label caption> Quando ativo, o sistema consumirá o ChatGPT. </q-item-label>
                  </q-item-section>

                  <q-item-section avatar>
                    <q-toggle
                      v-model="chatgptStatus"
                      checked-icon="check"
                      keep-color
                      :color="chatgptStatus ? 'green' : 'negative'"
                      size="md"
                      unchecked-icon="clear"
                      @input="atualizarChatgpt('chatgptStatus')"
                    />
                  </q-item-section>
                </q-item>
              </q-card-section>
            </q-card>

            <q-card class="bg-white q-mt-sm btn-rounded" style="width: 100%" bordered flat :key="ticketFocado.id + $uuid()" v-if="n8nAtivo === 'enabled' && ticketFocado.channel !== 'telegram'">
              <q-card-section class="q-pa-none">
                <q-item tag="label" v-ripple>
                  <q-item-section>
                    <q-item-label>N8N</q-item-label>
                    <q-item-label caption> Quando ativo, o sistema consumirá o N8N. </q-item-label>
                  </q-item-section>

                  <q-item-section avatar>
                    <q-toggle
                      v-model="n8nStatus"
                      checked-icon="check"
                      keep-color
                      :color="n8nStatus ? 'green' : 'negative'"
                      size="md"
                      unchecked-icon="clear"
                      @input="atualizarN8N('n8nStatus')"
                    />
                  </q-item-section>
                </q-item>
              </q-card-section>
            </q-card>

            <q-card class="bg-white q-mt-sm btn-rounded" style="width: 100%" bordered flat :key="ticketFocado.id + $uuid()" v-if="difyAtivo === 'enabled' && ticketFocado.channel !== 'telegram'">
              <q-card-section class="q-pa-none">
                <q-item tag="label" v-ripple>
                  <q-item-section>
                    <q-item-label>Dify (Beta)</q-item-label>
                    <q-item-label caption> Quando ativo, o sistema consumirá o Dify. </q-item-label>
                  </q-item-section>

                  <q-item-section avatar>
                    <q-toggle
                      v-model="difyStatus"
                      checked-icon="check"
                      keep-color
                      :color="difyStatus ? 'green' : 'negative'"
                      size="md"
                      unchecked-icon="clear"
                      @input="atualizarDify('difyStatus')"
                    />
                  </q-item-section>
                </q-item>
              </q-card-section>
            </q-card>

            <q-card class="bg-white q-mt-sm btn-rounded" style="width: 100%" bordered flat :key="ticketFocado.id + $uuid()">
              <q-card-section class="text-bold q-pb-none">
                Kanban
                <q-separator />
              </q-card-section>
              <q-select
                v-model="kanbanSelecionado"
                outlined
                label="Salvar"
                :options="kanbans"
                option-value="id"
                option-label="name"
                emit-value
                class="q-mb-md"
                :style="{ margin: '5px' }"
                @input="selecionarKanbanParaContato"
              />
              <!-- <q-btn label="Salvar" @click="selecionarKanbanParaContato" class="q-mb-md" :style="{ margin: '5px' }"/> -->
            </q-card>

            <q-card class="bg-white q-mt-sm btn-rounded" style="width: 100%" bordered flat :key="ticketFocado.id + $uuid()" v-if="ticketFocado.channel !== 'instagram' && ticketFocado.channel !== 'telegram'">
              <q-card-section class="text-bold q-pb-none">
                Bloquear Contato
                <q-separator />
                <q-toggle v-model="bloquearStatus" @input="bloquearContato" label="Bloqueado"></q-toggle>
              </q-card-section>
            </q-card>

            <q-card class="bg-white q-mt-sm btn-rounded" style="width: 100%" bordered flat :key="ticketFocado.id + $uuid()">
              <q-card-section class="text-bold q-pb-none">
                Etiquetas
                <q-separator />
              </q-card-section>
              <q-card-section class="q-pa-none">
                <q-select
                  square
                  borderless
                  :value="ticketFocado.contact.tags"
                  multiple
                  :options="etiquetas"
                  use-chips
                  option-value="id"
                  option-label="tag"
                  emit-value
                  map-options
                  dropdown-icon="add"
                  @input="tagSelecionada"
                >
                  <template v-slot:option="{ itemProps, itemEvents, opt, selected, toggleOption }">
                    <q-item v-bind="itemProps" v-on="itemEvents">
                      <q-item-section>
                        <q-item-label v-html="opt.tag"></q-item-label>
                      </q-item-section>
                      <q-item-section side>
                        <q-checkbox :value="selected" @input="toggleOption(opt)" />
                      </q-item-section>
                    </q-item>
                  </template>
                  <template v-slot:selected-item="{ opt }">
                    <q-chip dense square color="white" text-color="primary" class="q-ma-xs row col-12 text-body1">
                      <q-icon :style="`color: ${opt.color}`" name="mdi-pound-box-outline" size="28px" class="q-mr-sm" />
                      {{ opt.tag }}
                    </q-chip>
                  </template>
                  <template v-slot:no-option="{ itemProps, itemEvents }">
                    <q-item v-bind="itemProps" v-on="itemEvents">
                      <q-item-section>
                        <q-item-label class="text-negative text-bold"> Ops... Sem etiquetas criadas! </q-item-label>
                        <q-item-label caption> Cadastre novas etiquetas na administração de sistemas. </q-item-label>
                      </q-item-section>
                    </q-item>
                  </template>
                </q-select>
              </q-card-section>
            </q-card>

            <q-card class="bg-white q-mt-sm btn-rounded" style="width: 100%" bordered flat :key="ticketFocado.id + $uuid()">
              <q-card-section class="text-bold q-pb-none">
                Carteira
                <q-separator />
              </q-card-section>
              <q-card-section class="q-pa-none">
                <q-select
                  square
                  borderless
                  :value="ticketFocado.contact.wallets"
                  multiple
                  :max-values="1"
                  :options="usuarios"
                  use-chips
                  option-value="id"
                  option-label="name"
                  emit-value
                  map-options
                  dropdown-icon="add"
                  @input="carteiraDefinida"
                >
                  <template v-slot:option="{ itemProps, itemEvents, opt, selected, toggleOption }">
                    <q-item v-bind="itemProps" v-on="itemEvents">
                      <q-item-section>
                        <q-item-label v-html="opt.name"></q-item-label>
                      </q-item-section>
                      <q-item-section side>
                        <q-checkbox :value="selected" @input="toggleOption(opt)" />
                      </q-item-section>
                    </q-item>
                  </template>
                  <template v-slot:selected-item="{ opt }">
                    <q-chip dense square color="white" text-color="primary" class="q-ma-xs row col-12 text-body1">
                      {{ opt.name }}
                    </q-chip>
                  </template>
                  <template v-slot:no-option="{ itemProps, itemEvents }">
                    <q-item v-bind="itemProps" v-on="itemEvents">
                      <q-item-section>
                        <q-item-label class="text-negative text-bold"> Ops... Sem carteiras disponíveis!! </q-item-label>
                      </q-item-section>
                    </q-item>
                  </template>
                </q-select>
              </q-card-section>
            </q-card>
            

            <q-card class="bg-white q-mt-sm btn-rounded" style="width: 100%" bordered flat :key="ticketFocado.id + $uuid()" v-if="ticketFocado.channel !== 'instagram' && ticketFocado.channel !== 'telegram'">
              <q-card-section class="text-bold q-pb-none">
                Mensagens Agendadas
                <q-separator />
              </q-card-section>
              <q-card-section class="q-pa-none">
                <template v-if="ticketFocado.scheduledMessages">
                  <q-list>
                    <q-item v-for="(message, idx) in ticketFocado.scheduledMessages.filter((msg) => !msg.isDeleted)" :key="idx" clickable>
                      <q-item-section>
                        <q-item-label caption>
                          <div class="row justify-between items-center no-wrap">
                            <div>
                              <strong>Agendado para:</strong>
                              <div>{{ $formatarData(message.scheduleDate, 'dd/MM/yyyy HH:mm') }}</div>
                            </div>

                            <div>
                              <div class="row q-gutter-xs no-wrap">
                                <!-- <q-btn flat round dense icon="edit" size="sm" @click="editarMensagem(message)" /> -->
                                <q-btn flat round dense icon="mdi-trash-can-outline" size="sm" @click="deletarMensagem(message)" />
                              </div>
                            </div>
                          </div>
                        </q-item-label>
                        <q-item-label caption lines="2"> <b>Msg:</b> {{ message.mediaName || message.body }} </q-item-label>
                      </q-item-section>
                      <q-tooltip :delay="500">
                        <MensagemChat :mensagens="[message]" />
                      </q-tooltip>
                    </q-item>
                  </q-list>
                </template>
              </q-card-section>
            </q-card>
          </div>
        </q-scroll-area>
      </q-drawer>

      <ModalNovoTicket :modalNovoTicket.sync="modalNovoTicket" />
      
      <ContatoModal :contactId="selectedContactId" :modalContato.sync="modalContato" @contatoModal:contato-editado="contatoEditado" />

      <ModalUsuario :isProfile="true" :modalUsuario.sync="modalUsuario" :usuarioEdicao.sync="usuario" />

      <ModalNotaAtendimento :modalNota.sync="modalNota" :notaEdicao.sync="notaEdicao" />

      <ModalSMS :modalSMS.sync="modalSMS" :smsEnvio.sync="smsEnvio" />

      <!-- <button @click="aceitarTermos" v-if="!termoaceito && profile === 'superadmin'">Verificar Termos</button> -->
      <ModalLayout v-if="profile === 'superadmin'" :show="showModal" class="modal-top" @close="showModal = false" @aceitar="handleAcceptance"></ModalLayout>

      <ModalTarefa
        :modalTarefa.sync="modalTarefa"
      />

      <q-dialog v-model="exibirModalLogs" no-backdrop-dismiss full-height position="right" @hide="logsTicket = []">
        <q-card style="width: 400px">
          <q-card-section :class="{ 'bg-grey-2': !$q.dark.isActive, 'bg-primary': $q.dark.isActive }">
            <div class="text-h6">
              Logs Ticket: {{ ticketFocado.id }}
              <q-btn icon="close" color="negative" flat class="bg-padrao float-right" round v-close-popup />
            </div>
          </q-card-section>
          <q-card-section class="">
            <q-scroll-area style="height: calc(100vh - 200px)" class="full-width">
              <q-timeline color="black" style="width: 360px" class="q-pl-sm" :class="{ 'text-black': !$q.dark.isActive }">
                <template v-for="(log, idx) in logsTicket">
                  <div>
                    <q-timeline-entry
                      :key="(log && log.id) || idx"
                      :subtitle="$formatarData(log.createdAt, 'dd/MM/yyyy HH:mm')"
                      :color="(messagesLog[log.type] && messagesLog[log.type].color) || ''"
                      :icon="(messagesLog[log.type] && messagesLog[log.type].icon) || ''"
                    >
                      <template v-slot:title>
                        <div :class="{ 'text-white': $q.dark.isActive }" style="width: calc(100% - 20px)">
                          <div class="row col text-bold text-body2">{{ (log.user && log.user.name) || 'Bot' }}:</div>
                          <div class="row col">{{ messagesLog[log.type] && messagesLog[log.type].message }}</div>
                        </div>
                      </template>
                    </q-timeline-entry>
                  </div>
                </template>
              </q-timeline>
            </q-scroll-area>
          </q-card-section>
        </q-card>
      </q-dialog>

      <q-dialog v-model="exibirModalProtocoloLogs" no-backdrop-dismiss full-height position="right" @hide="logsProtocolo = []">
        <q-card style="width: 400px">
          <q-card-section :class="{ 'bg-grey-2': !$q.dark.isActive, 'bg-primary': $q.dark.isActive }">
            <div class="text-h6">
              Protocolos de atendimento: {{ ticketFocado.id }}
              <q-btn icon="close" color="negative" flat class="bg-padrao float-right" round v-close-popup />
            </div>
          </q-card-section>
          <q-card-section class="">
            <q-scroll-area style="height: calc(100vh - 200px)" class="full-width">
              <q-timeline color="black" style="width: 360px" class="q-pl-sm" :class="{ 'text-black': !$q.dark.isActive }">
                <template v-for="(log, idx) in logsProtocolo">
                  <div>
                    <q-timeline-entry
                      :key="(log && log.id) || idx"
                      :subtitle="$formatarData(log.createdAt, 'dd/MM/yyyy HH:mm')"
                      :color="(messagesLog[log.type] && messagesLog[log.type].color) || ''"
                      :icon="(messagesLog[log.type] && messagesLog[log.type].icon) || ''"
                    >
                      <template v-slot:title>
                        <div :class="{ 'text-white': $q.dark.isActive }" style="width: calc(100% - 20px)">
                          <div class="row col text-bold text-body2">{{ (log.user && log.user.name) || 'Bot' }}:</div>
                          <div class="row col">{{ (log.protocol) || 'Protocolo não foi enviado com sucesso' }}</div>
                        </div>
                      </template>
                    </q-timeline-entry>
                  </div>
                </template>
              </q-timeline>
            </q-scroll-area>
          </q-card-section>
        </q-card>
      </q-dialog>

      <q-dialog v-model="exibirModalAvaliacaoLogs" no-backdrop-dismiss full-height position="right" @hide="logsAvaliacao = []">
        <q-card style="width: 400px">
          <q-card-section :class="{ 'bg-grey-2': !$q.dark.isActive, 'bg-primary': $q.dark.isActive }">
            <div class="text-h6">
              Avaliações de atendimento: {{ ticketFocado.id }}
              <q-btn icon="close" color="negative" flat class="bg-padrao float-right" round v-close-popup />
            </div>
             
            <q-linear-progress :value="evaluationMedia / 5" color="primary" class="q-mt-md"></q-linear-progress>
            <div class="text-subtitle">Média das avaliações: {{ evaluationMedia }}/5</div> 
          </q-card-section>
          <q-card-section class="">
            <q-scroll-area style="height: calc(100vh - 200px)" class="full-width">
              <q-timeline color="black" style="width: 360px" class="q-pl-sm" :class="{ 'text-black': !$q.dark.isActive }">
                <template v-for="(log, idx) in logsAvaliacao">
                  <div>
                    <q-timeline-entry
                      :key="(log && log.id) || idx"
                      :subtitle="$formatarData(log.createdAt, 'dd/MM/yyyy HH:mm')"
                      :color="(messagesLog[log.type] && messagesLog[log.type].color) || ''"
                      :icon="(messagesLog[log.type] && messagesLog[log.type].icon) || ''"
                    >
                      <template v-slot:title>
                        <div :class="{ 'text-white': $q.dark.isActive }" style="width: calc(100% - 20px)">
                          <div class="row col text-bold text-body2">{{ (log.user && log.user.name) || 'Bot' }}:</div>
                          <div class="row col">
                            <template v-if="log.evaluation !== undefined && log.evaluation >= 0 && log.evaluation <= 5">
                              <template v-if="log.evaluation === 0">
                                <q-linear-progress :value="0" color="red">
                                </q-linear-progress>
                                <div class="text-subtitle">0/5</div>
                              </template>
                              <template v-else>
                                <q-linear-progress :value="log.evaluation / 5" color="primary">
                                </q-linear-progress>
                                <div class="text-subtitle">{{ log.evaluation }}/5</div>
                              </template>
                            </template>
                            <template v-else>
                                Avaliação não foi concluída com sucesso
                              </template>
                          </div>
                        </div>
                      </template>
                    </q-timeline-entry>
                  </div>
                </template>
              </q-timeline>
            </q-scroll-area>
          </q-card-section>
        </q-card>
      </q-dialog>

      <q-dialog v-model="exibirModalNotaLogs" no-backdrop-dismiss full-height position="right" @hide="logsNota = []">
        <q-card style="width: 400px">
          <q-card-section :class="{ 'bg-grey-2': !$q.dark.isActive, 'bg-primary': $q.dark.isActive }">
            <div class="text-h6">
              Notas de atendimento: {{ ticketFocado.id }}
              <q-btn icon="close" color="negative" flat class="bg-padrao float-right" round v-close-popup />
            </div>
          </q-card-section>
          <q-card-section class="">
            <q-scroll-area style="height: calc(100vh - 200px)" class="full-width">
              <q-timeline color="black" style="width: 360px" class="q-pl-sm" :class="{ 'text-black': !$q.dark.isActive }">
                <template v-for="(log, idx) in logsNota">
                  <div>
                    <q-timeline-entry
                      :key="(log && log.id) || idx"
                      :subtitle="$formatarData(log.createdAt, 'dd/MM/yyyy HH:mm')"
                      :color="(messagesLog[log.type] && messagesLog[log.type].color) || ''"
                      :icon="(messagesLog[log.type] && messagesLog[log.type].icon) || ''"
                    >
                      <template v-slot:title>
                        <div :class="{ 'text-white': $q.dark.isActive }" style="width: calc(100% - 20px)">
                          <div class="row col text-bold text-body2">{{ (log.user && log.user.name) || 'Bot' }}:</div>
                          <div class="row col" :style="{ 'white-space': 'pre-line' }">{{ (log.notes) || 'Nota não foi registrada com sucesso' }}</div>
                        </div>
                      </template>
                      <q-btn
                        flat
                        round
                        icon="edit"
                        @click="editarNota(log)"
                      />
                      <q-btn
                        flat
                        round
                        icon="mdi-delete"
                        @click="deletarNota(log)"
                      />
                    </q-timeline-entry>
                  </div>
                </template>
              </q-timeline>
            </q-scroll-area>
          </q-card-section>
        </q-card>
      </q-dialog>

    </q-layout>
    <audio ref="audioNotificationPlay">
      <source :src="alertSound" type="audio/mp3" />
    </audio>
  </div>
</template>

<script>
import ItemStatusChannel from 'src/pages/sessaoWhatsapp/ItemStatusChannel.vue'
import ContatoModal from 'src/pages/contatos/ContatoModal'
import ItemTicket from './ItemTicket'
import { AtualizarTicketNaoLido, ConsultarLogsTicket, ConsultarTickets, DeletarMensagem, AtualizarN8NTicket, AtualizarDifyTicket, AtualizarTypebotTicket, AtualizarDialogflowTicket, AtualizarChatgptTicket, EnviarMensagemTexto, AtualizarStatusTicket, AtualizarStatusTicketNull } from 'src/service/tickets'
import { mapGetters } from 'vuex'
import mixinSockets from './mixinSockets'
import socketInitial from 'src/layouts/socketInitial'
import ModalNovoTicket from './ModalNovoTicket'
import ModalSMS from './ModalSMS.vue'
import { ListarFilas } from 'src/service/filas'
import { ListarKanbans } from 'src/service/kanban'
const UserQueues = JSON.parse(localStorage.getItem('queues'))
const profile = localStorage.getItem('profile')
const username = localStorage.getItem('username')
const usuario = JSON.parse(localStorage.getItem('usuario'))
import StatusWhatsapp from 'src/components/StatusWhatsapp'
import alertSound from 'src/assets/sound.mp3'
import silenceSound from 'src/assets/silence.mp3'
import { ListarWhatsapps } from 'src/service/sessoesWhatsapp'
import { debounce, uid } from 'quasar'
import { format } from 'date-fns'
import ModalUsuario from 'src/pages/usuarios/ModalUsuario'
import { ListarConfiguracoes } from 'src/service/configuracoes'
import { ListarMensagensRapidas } from 'src/service/mensagensRapidas'
import { ListarEtiquetas } from 'src/service/etiquetas'
import { EditarEtiquetasContato, EditarCarteiraContato, EditarContato, ObterContato } from 'src/service/contatos'
import { CriarProtocolo, ConsultarLogsProtocolo } from 'src/service/protocolos'
import { CriarAvaliacao, ConsultarLogsAvaliacao } from 'src/service/avaliacoes'
import { ConsultarLogsNota, DeletarNota } from 'src/service/notas'
import { RealizarLogout } from 'src/service/login'
import { ListarUsuarios, DadosUsuario } from 'src/service/user'
import { SyncOldMessagesByUserWbot, LocalizarMensagens } from 'src/service/tickets'
import { ListarTenantPorId, ListarTenantPorAsaas, AceitarTermos, ListarTenantsPorTermos } from 'src/service/tenants'
import { EnviarTextoWaba } from 'src/service/waba'
import MensagemChat from './MensagemChat.vue'
import { messagesLog } from '../../utils/constants'
import ModalNotaAtendimento from 'src/pages/notas/ModalNotaAtendimento'
import ModalLayout from './ModalLayout.vue'
import { listCountUnreadPrivateMessage, listCountUnreadGroupMessage } from 'src/service/chatPrivado'
import { MostrarAvaliacao } from 'src/service/empresas'
import ModalTarefa from 'src/pages/tarefas/ModalTarefa'
import jsPDF from 'jspdf';
import { MostrarCores } from 'src/service/empresas';
export default {
  name: 'IndexAtendimento',
  mixins: [mixinSockets, socketInitial],
  components: {
    ItemTicket,
    ModalNovoTicket,
    StatusWhatsapp,
    ContatoModal,
    ModalUsuario,
    MensagemChat,
    ItemStatusChannel,
    ModalNotaAtendimento,
    ModalSMS,
    ModalLayout,
    ModalTarefa
  },
  data() {
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
      rating: [
        { label: 'Ruim', rating: 0 },
        { label: 'Regular', rating: 1 },
        { label: 'Bom', rating: 2 },
        { label: 'Muito Bom', rating: 3 },
        { label: 'Excelente', rating: 4 },
        { label: 'Incrível', rating: 5 },
      ],
      tarefaEdicao: {},
      modalTarefa: false,
      notify: null, 
      loadingMount: false,
      isMounted: false,
      showModal: false,
      batchSize: 30,
      hasMoreTickets: true,
      drawerContact: true,
      kanbans: [],
      kanbanStatus: '',
      kanbanSelecionado: null,
      bloquearStatus: null,
      tabTickets: 'private',
      tabTicketsStatus: 'open',
      typebotStatus: '',
      typebotAtivo: false,
      n8nStatus: '',
      difyStatus: '',
      difyAtivo: false,
      n8nAtivo: false,
      smsAtivo: false,
      dialogflowStatus: '',
      dialogflowAtivo: false,
      chatgptStatus: '',
      chatgptAtivo: false,
      grupoAtivo: 'disabled',
      contadorUniversal: '',
      notificacaoAtivo: 'enabled',
      grupoStatus: '',
      tempoFechamento: '',
      autoFechamentoAtivo: 'disabled',
      mensagemDeEncerramento: '',
      messagesLog,
      selectedTab: 'open',
      configuracoes: [],
      debounce,
      alertSound,
      silenceSound,
      notificacaoSound: '',
      usuario,
      usuarios: [],
      username,
      modalUsuario: false,
      toolbarSearch: true,
      drawerTickets: true,
      loading: false,
      profile,
      modalNovoTicket: false,
      modalContato: false,
      selectedContactId: null,
      filterBusca: '',
      showDialog: false,
      atendimentos: [],
      countTickets: 0,
      pesquisaTickets: {
        searchParam: '',
        pageNumber: 1,
        status: ['open', 'pending'],
        showAll: false,
        count: null,
        queuesIds: [],
        withUnreadMessages: false,
        isNotAssignedUser: false,
        includeNotQueueDefined: true,
        // date: new Date(),
      },
      filas: [],
      filasUser: [],
      etiquetas: [],
      mensagensRapidas: [],
      modalEtiquestas: false,
      exibirModalLogs: false,
      logsTicket: [],
      logsProtocolo: [],
      logsNota: [],
      exibirModalProtocoloLogs: false,
      exibirModalNotaLogs: false,
      logsAvaliacao: [],
      exibirModalAvaliacaoLogs: false,
      evaluationMedia: 0,
      asyncData: [],
      modalNota: false,
      modalSMS: false,
      notaEdicao: {},
      smsEnvio: '',
      chatBotLane: null,
      fixarConexao: null,
      termoaceito: false,
      notificacaoInternaNaoLida: ''
    }
  },
  watch: {
    ticketFocado: {
      handler: 'carregarIntegracaoStatus',
      immediate: true
    },
    logsAvaliacao: 'calcularMedia',
    notificacaoChatPrivado: {
      handler() {
        if (this.$router.currentRoute.fullPath.indexOf('atendimento-Interno') < 0 || !this.chatFocado.id || this.chatFocado.id !== this.notificacaoChatPrivado.senderId) {
          this.$store.commit('LIST_PRIVATE_NOTIFICATION', { action: 'update', data: 1 })
        }
        this.listarMensagens()
      }
    },
  },
  computed: {
    ...mapGetters(['tickets', 'ticketFocado', 'mensagens', 'hasMore', 'whatsapps', 'notificacaoChatPrivado']),
    cUserQueues() {
      return UserQueues
    },
    style() {
      return {
        height: this.$q.screen.height + 'px',
      }
    },
    cToolbarSearchHeigthAjust() {
      return this.toolbarSearch ? 58 : 0
    },
    cHeigVerticalTabs() {
      return `${50 + this.cToolbarSearchHeigthAjust}px`
    },
    cRouteContatos() {
      return this.$route.name === 'chat-contatos'
    },
    cFiltroSelecionado() {
      const { queuesIds, showAll, withUnreadMessages, isNotAssignedUser } = this.pesquisaTickets
      return !!(queuesIds?.length || showAll || withUnreadMessages || isNotAssignedUser)
    },
    cIsExtraInfo() {
      return this.ticketFocado?.contact?.extraInfo?.length > 0
    },
    openTickets() {
      const filteredTickets = this.tickets.filter(ticket => ticket.status === 'open' && !ticket.isGroup)
      const groupedTickets = filteredTickets.reduce((acc, ticket) => {
        const key = `${ticket.whatsappId}_${ticket.userId}_${ticket.status}_${ticket.contactId}`;
        if (!acc[key] || acc[key].id > ticket.id) {
          acc[key] = ticket;
        }
        return acc;
      }, {});
      const groupedTicketIds = new Set(Object.values(groupedTickets).map(ticket => ticket.id));
      const remainingTickets = filteredTickets.filter(ticket => !groupedTicketIds.has(ticket.id));      
      remainingTickets.forEach(ticket => {
        AtualizarStatusTicketNull(ticket.id, 'closed', ticket.userId);
        console.log(`Ticket duplo ${ticket.id} tratado.`);
      });
      // return Object.values(groupedTickets).slice(0, this.batchSize);
      return Object.values(groupedTickets)
    },
    pendingTickets() {
      const filteredTickets = this.tickets.filter(ticket => ticket.status === 'pending' && !ticket.isGroup)
      const groupedTickets = filteredTickets.reduce((acc, ticket) => {
        const key = `${ticket.whatsappId}_${ticket.userId}_${ticket.status}_${ticket.contactId}`;
        if (!acc[key] || acc[key].id > ticket.id) {
          acc[key] = ticket;
        }
        return acc;
      }, {});
      const groupedTicketIds = new Set(Object.values(groupedTickets).map(ticket => ticket.id));
      const remainingTickets = filteredTickets.filter(ticket => !groupedTicketIds.has(ticket.id));      
      remainingTickets.forEach(ticket => {
        AtualizarStatusTicketNull(ticket.id, 'closed', ticket.userId);
        console.log(`Ticket duplo ${ticket.id} tratado.`);
      });
      // return this.tickets.filter(ticket => !ticket.isGroup)
      return Object.values(groupedTickets)
      // return Object.values(groupedTickets).slice(0, this.batchSize);
    },
    // openTickets() {
    //   const openParams = {
    //     searchParam: '',
    //     pageNumber: 1,
    //     status: 'open',
    //   };
    //   ConsultarTickets(openParams)
    //     .then(result => {
    //       const tickets = result.data.tickets;
    //       const ticketsOrdenados = tickets.sort((a, b) => {
    //         const dataA = new Date(a.lastMessageAt);
    //         const dataB = new Date(b.lastMessageAt);
    //         return dataB - dataA;
    //       });
    //       const groupedTickets = tickets.reduce((acc, ticket) => {
    //         if (ticket.status === 'open' && !ticket.isGroup) {
    //           const key = `${ticket.whatsappId}_${ticket.userId}_${ticket.status}_${ticket.contactId}`;
    //           if (!acc[key] || acc[key].id > ticket.id) {
    //             acc[key] = ticket;
    //           }
    //         }
    //         return acc;
    //       }, {});
    //       const ticketsArray = Object.values(groupedTickets);
    //       ticketsArray.sort((a, b) => b.lastMessageAt - a.lastMessageAt);
    //       this.asyncData = ticketsArray.slice(0, this.batchSize);
    //       console.log('Ticket')
    //     })
    //     .catch(error => {
    //       console.error(error);
    //     });

    //   // Retorne o estado local na propriedade computada
    //   return this.asyncData;
    // },

    // pendingTickets() {
    //   // return this.tickets.filter(ticket => ticket.status === 'pending' && !ticket.isGroup)
    //   const filteredTickets = this.tickets.filter(ticket => ticket.status === 'pending' && !ticket.isGroup);
    //   const groupedTickets = filteredTickets.reduce((acc, ticket) => {
    //     const key = `${ticket.whatsappId}_${ticket.userId}_${ticket.status}_${ticket.contactId}`;
    //     if (!acc[key] || acc[key].id > ticket.id) {
    //       acc[key] = ticket;
    //     }
    //     return acc;
    //   }, {});
    //   //return Object.values(groupedTickets);
    //   return Object.values(groupedTickets).slice(0, this.batchSize);
    // },
    pendingTicketsChatBot() {
      // return this.tickets.filter(ticket => ticket.status === 'pending' && !ticket.isGroup)
      const filteredTickets = this.tickets.filter(ticket => ticket.status === 'pending' && !ticket.isGroup && (ticket.stepAutoReplyId && ticket.autoReplyId || ticket.chatFlowId && ticket.stepChatFlow));
      const groupedTickets = filteredTickets.reduce((acc, ticket) => {
        const key = `${ticket.whatsappId}_${ticket.userId}_${ticket.status}_${ticket.contactId}`;
        if (!acc[key] || acc[key].id > ticket.id) {
          acc[key] = ticket;
        }
        return acc;
      }, {});
      return Object.values(groupedTickets);
      // return Object.values(groupedTickets).slice(0, this.batchSize);
    },
    closedTickets() {
      return this.tickets.filter(ticket => ticket.status === 'closed' && !ticket.isGroup)
      // return this.tickets.filter(ticket => ticket.status === 'closed' && !ticket.isGroup).slice(0, this.batchSize);
    },
    closedGroupTickets() {
      return this.tickets.filter(ticket => ticket.status === 'closed' && ticket.isGroup)
      // return this.tickets.filter(ticket => ticket.status === 'closed' && ticket.isGroup).slice(0, this.batchSize);
    },
    openGroupTickets() {
      // return this.tickets.filter(ticket => ticket.status === 'open' && ticket.isGroup)
      const filteredTickets = this.tickets.filter(ticket => ticket.status === 'open' && ticket.isGroup);
      const groupedTickets = filteredTickets.reduce((acc, ticket) => {
        const key = `${ticket.whatsappId}_${ticket.userId}_${ticket.status}_${ticket.contactId}`;
        if (!acc[key] || acc[key].id > ticket.id) {
          acc[key] = ticket;
        }
        return acc;
      }, {});
      return Object.values(groupedTickets);
      // return Object.values(groupedTickets).slice(0, this.batchSize);
    },
    pendingGroupTickets() {
      // return this.tickets.filter(ticket => ticket.status === 'pending' && ticket.isGroup)
      const filteredTickets = this.tickets.filter(ticket => ticket.status === 'pending' && ticket.isGroup);
      const groupedTickets = filteredTickets.reduce((acc, ticket) => {
        const key = `${ticket.whatsappId}_${ticket.userId}_${ticket.status}_${ticket.contactId}`;
        if (!acc[key] || acc[key].id > ticket.id) {
          acc[key] = ticket;
        }
        return acc;
      }, {});
      return Object.values(groupedTickets);
      // return Object.values(groupedTickets).slice(0, this.batchSize);
    },
    privateMessages() {
      return this.tickets.filter(ticket => ticket.unreadMessages && !ticket.isGroup)
    },
    groupMessages() {
      return this.tickets.filter(ticket => ticket.unreadMessages && ticket.isGroup)
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
    async downloadPDF() {
      const doc = new jsPDF();

      try {
        const response = await LocalizarMensagens({ ticketId: this.ticketFocado.id });
        const mensagens = response.data.messages;
        let yPosition = 10;

        mensagens.forEach((mensagem, index) => {
          if (yPosition > 280) {
            doc.addPage();
            yPosition = 10;
          }
          
          const remetente = mensagem.fromMe ? 'Eu' : mensagem.contact.name || 'Contato';
          doc.setFontSize(12);
          doc.text(`Mensagem de: ${remetente}`, 10, yPosition);
          yPosition += 10;
          
          const lines = doc.splitTextToSize(mensagem.body, 180);
          doc.text(lines, 10, yPosition);
          yPosition += lines.length * 10;
          yPosition += 10;
        });

        doc.save( 'atendimento_' + this.ticketFocado.id + '_mensagens.pdf');
      } catch (error) {
        console.error('Erro ao baixar as mensagens:', error);
      }
    },
    async atualizarNaoLido (ticketFocado) {
      try{
        await AtualizarTicketNaoLido(ticketFocado.id, 1)
      } catch(e){
        
      }
    },
    async atualizarLido (ticketFocado) {
      try{
        await AtualizarTicketNaoLido(ticketFocado.id, 0)
      } catch(e){
        
      }
    },
    async listarMensagens() {
      try {
        const privateMessageData = await listCountUnreadPrivateMessage(this.usuario.userId);
        const groupMessageData = await listCountUnreadGroupMessage(this.usuario.userId);
        this.notificacaoInternaNaoLida = privateMessageData.data.count + groupMessageData.data.count.count
      } catch(e){

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
          message: 'Solicite ao Super Administrador o aceite dos termos de uso para o tenant ' + tenantWithFalseAcceptTerms.tenantId,
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
    fecharModalNota() {
      this.exibirModalNotaLogs = false;
      // setTimeout(() => {
      //   this.exibirModalNotaLogs = true;
      // }, 2000);
    },
    editarNota (nota) {
      this.notaEdicao = { ...nota }
      this.modalNota = true
      this.fecharModalNota();
    },
    deletarNota (nota) {
      this.$q.dialog({
        title: 'Atenção!!',
        message: `Deseja realmente deletar a Nota "${nota.notes}"?`,
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
      }).onOk(() => {
        this.loading = true
        DeletarNota(nota)
          .then(res => {
            // let newNotas = [...this.notas]
            // newNotas = newNotas.filter(f => f.id !== nota.id)

            // this.notas = [...newNotas]
            this.$q.notify({
              type: 'positive',
              progress: true,
              position: 'top',
              message: `Nota ${nota.notes} deletada!`,
              actions: [{
                icon: 'close',
                round: true,
                color: 'white'
              }]
            })
            this.fecharModalNota();
          })
        this.loading = false
      })
    },
    abrirModalNota() {
      this.notaEdicao = { ticketId: this.ticketFocado.id };
      this.modalNota = true;
    },
    abrirModalSMS(number) {
      this.modalSMS = true;
      this.smsEnvio = number;
    },
    async autoCloseTickets(tempo, mensagem) {
      if (this.autoFechamentoAtivo !== 'enabled') {
        return;
      }
      else if (this.autoFechamentoAtivo === 'enabled'){
        const currentTimeInSeconds = Math.floor(new Date().getTime() / 1000);
        await Promise.all(this.tickets.map(async (ticket) => {
          const lastMessageTimeInSeconds = Math.floor(ticket.lastMessageAt / 1000);
          if (currentTimeInSeconds - lastMessageTimeInSeconds > tempo && ticket.status === 'open') {
            await EnviarMensagemTexto(ticket.id, message)
            await AtualizarStatusTicket(ticket.id, 'closed', ticket.userId);
            const message = {
              read: 1,
              fromMe: true,
              mediaUrl: '',
              body: mensagem,
              scheduleDate: null,
              quotedMsg: null,
              idFront: uid(),
            }
            this.$q.notify({
              type: 'warning',
              message: 'Atendimento ' + ticket.id + ' resolvido automaticamente por ter ficado sem interação por mais de ' + tempo + ' minutos.',
              position: 'top',
            })
          }
        }));
      }
    },
    calcularMedia() {
      const avaliacoesValidas = this.logsAvaliacao.filter(log => {
      return !isNaN(log.evaluation) && log.evaluation >= 0 && log.evaluation <= 5;
      })
      if (avaliacoesValidas.length > 0) {
        const somaAvaliacoes = avaliacoesValidas.reduce((total, log) => total + Number(log.evaluation), 0);
        this.evaluationMedia = (somaAvaliacoes / avaliacoesValidas.length).toFixed(2);
      } else {
        this.evaluationMedia = '0.00'
      }
    },
    getPhoneNumberLink(number) {
      if ((number.startsWith("55")) && (number.charAt(4) > 5)) {
        return `tel:${number.slice(0, 4)}9${number.slice(-8)}`;
      } else {
        return `tel:${number}`;
      }
    },
    getPhoneNumberSMS(number) {
      if ((number.startsWith("55")) && (number.charAt(4) > 5)) {
        return `${number.slice(0, 4)}9${number.slice(-8)}`;
      } else {
        return `${number}`;
      }
    },
    async loadMoreOpenTickets() {
      // this.batchSize += 30;
      // this.consultarTickets();
      this.$q.notify({
        type: 'positive',
        message: 'Atendimentos carregados!',
        position: 'top',
        progress: true,
        actions: [{
          icon: 'close',
          round: true,
          color: 'white'
        }]
      })
      try {
        this.loading = true
        this.pesquisaTickets.pageNumber++
        await this.consultarTickets()
        this.loading = false
      } catch (error) {
        this.loading = false
      }
    },
    showNotification() {
      this.$q.notify({
        type: 'warning',
        message: 'Atendimentos carregados nas abas aberto, pendente e fechado!',
        position: 'top',
      })
      this.loadMoreOpenTickets()
    },
    toggleDrawer() { 
      this.drawerContact = !this.drawerContact;
    },
    async syncOldMessagesByUserWhatsapp (ticketFocado) {
      let value = 1;
      this.$q.dialog({
        title: 'Atenção!! Deseja realmente sincronizar o histórico de mensagens? ',
        message: 'Por segurança, o sistema tem um intervalo de 4 segundos entre cada mensagem importada.',
        prompt: {
          model: value,
          type: 'number',
          label: 'Limite de mensagens a serem importadas',
          hint: 'Apenas números positivos são permitidos',
          attributes: {
            min: 0,
            step: 1,
          },
        },
        ok: {
          label: 'Sim',
          color: 'primary',
          push: true
        },
        cancel: {
          label: 'Não',
          color: 'negative',
          push: true
        },
        persistent: true
      }).onOk((value) => {
        const data = {
          whatsappId: ticketFocado.whatsappId,
          limit: value,
          tenantId: ticketFocado.tenantId,
          contactId: ticketFocado.isGroup
            ? ticketFocado.contact.number + "@g.us"
            : ticketFocado.contact.number + "@c.us"
        };
        if (value !== null && value > 0) {
          this.$q.notify({
            type: 'positive',
            progress: true,
            position: 'top',
            message: 'Aguarde alguns instantes, o sistema irá importar ' + value + ' mensagens para o usuário ' + ticketFocado.contact.number,
            actions: [{
              icon: 'close',
              round: true,
              color: 'white'
            }]
          })
          this.loading = true
          SyncOldMessagesByUserWbot(data).then(r => {
            // this.$store.commit('SYNC_WHATSAPP', ticketFocado.whatsappId)
          }).finally(f => {
            this.loading = false
          })
        } else {
          this.$q.notify({
            type: 'warning',
            progress: true,
            position: 'top',
            message: 'Valor inserido pelo usuário é inválido ou não foi fornecido.',
            actions: [{
              icon: 'close',
              round: true,
              color: 'white'
            }]
          })
        }
      })
    },
    async sendProtocol (ticketFocado) {
      this.$q.dialog({
        title: 'Deseja enviar um protocolo para esse atendimento? ',
        // message: 'Esse protocolo será armazenado no banco dados .',
        ok: {
          label: 'Sim',
          color: 'primary',
          push: true
        },
        cancel: {
          label: 'Não',
          color: 'negative',
          push: true
        },
        persistent: true
      }).onOk(async () => {
        const ticketId = ticketFocado.id
        const protocol = Date.now().toString();
        const message = {
          read: 1,
          fromMe: true,
          mediaUrl: '',
          body: `Protocolo de atendimento: ${protocol}`,
          scheduleDate: null,
          quotedMsg: null,
          idFront: uid(),
        }
        const messageWaba = {
          read: 1,
          fromMe: true,
          mediaUrl: '',
          body: `Protocolo de atendimento: ${protocol}`,
          scheduleDate: null,
          quotedMsg: null,     
          from: ticketFocado.contact.number,
          tokenApi: ticketFocado.whatsapp.tokenAPI,
          ticketId: ticketFocado.id,
          idFront: uid(),
        }
        const data = {
          protocol: protocol,
          ticketId: ticketFocado.id,
          userId: ticketFocado.user.id,
          tenantId: ticketFocado.tenantId,
        };
        if (data) {
          this.$q.notify({
            type: 'positive',
            progress: true,
            position: 'top',
            message: 'Protocolo ' + protocol + ' enviado para o atendimento ' + ticketFocado.id,
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
          await CriarProtocolo(data).then(r => {
          }).finally(f => {
            this.loading = false
          })
        } else {
          this.$q.notify({
            type: 'warning',
            progress: true,
            position: 'top',
            message: 'Não foi possível enviar o protocolo de atendimento.',
            actions: [{
              icon: 'close',
              round: true,
              color: 'white'
            }]
          })
        }
      })
    },
    async listarAvaliacao () {
      const { data } = await MostrarAvaliacao()
      this.rating = data[0].rating
    },
    buildRatingMessage() {
      return `Avalie este atendimento:\n${this.rating.map(r => `${r.rating} - ${r.label}`).join('\n')}`;
    },
    async sendEvaluation (ticketFocado) {
      this.$q.dialog({
        title: 'Deseja enviar uma avaliação para esse atendimento? ',
        // message: 'Esse protocolo será armazenado no banco dados .',
        ok: {
          label: 'Sim',
          color: 'primary',
          push: true
        },
        cancel: {
          label: 'Não',
          color: 'negative',
          push: true
        },
        persistent: true
      }).onOk(async () => {
        const ticketId = ticketFocado.id
        const evaluation = 'Avaliação enviada';
        const message = {
          read: 1,
          fromMe: true,
          mediaUrl: '',
          // body: `Avalie este atendimento:\n0- Ruim\n1- Regular\n2- Bom\n3-Muito Bom\n4- Excelente\n5- Incrível`,
          body: this.buildRatingMessage(),
          scheduleDate: null,
          quotedMsg: null,
          idFront: uid(),
        }
        const messageWaba = {
          read: 1,
          fromMe: true,
          mediaUrl: '',
          // body: `Avalie este atendimento:\n0- Ruim\n1- Regular\n2- Bom\n3-Muito Bom\n4- Excelente\n5- Incrível`,
          body: this.buildRatingMessage(),
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
            message: 'Avalição enviada para o atendimento ' + ticketFocado.id,
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
      })
    },
    async atualizarDify (key) {
      const value = this.$data[key];
      try {
      await AtualizarDifyTicket(this.ticketFocado.id, value);
      this.$q.notify({
          type: 'positive',
          message: 'Configuração alterada!',
          progress: true,
          actions: [{ icon: 'close', round: true, color: 'white' }],
      })
      await AtualizarDifyTicket(this.ticketFocado.id, value);
      } catch (error) {
        console.error('error - AlterarConfiguracao', error)
        this.$data[key] = !value
        this.$notificarErro('Ocorreu um erro!', error)
      }
    },
    async atualizarN8N (key) {
      const value = this.$data[key];
      try {
      await AtualizarN8NTicket(this.ticketFocado.id, value);
      this.$q.notify({
          type: 'positive',
          message: 'Configuração alterada!',
          progress: true,
          actions: [{ icon: 'close', round: true, color: 'white' }],
      })
      await AtualizarN8NTicket(this.ticketFocado.id, value);
      } catch (error) {
        console.error('error - AlterarConfiguracao', error)
        this.$data[key] = !value
        this.$notificarErro('Ocorreu um erro!', error)
      }
    },
    async atualizarTypebot (key) {
      const value = this.$data[key];
      try {
      await AtualizarTypebotTicket(this.ticketFocado.id, value);
      this.$q.notify({
          type: 'positive',
          message: 'Configuração alterada!',
          progress: true,
          actions: [{ icon: 'close', round: true, color: 'white' }],
      })
      await AtualizarTypebotTicket(this.ticketFocado.id, value);
      } catch (error) {
        console.error('error - AlterarConfiguracao', error)
        this.$data[key] = !value
        this.$notificarErro('Ocorreu um erro!', error)
      }
    },
    async atualizarDialogflow (key) {
      const value = this.$data[key];
      try {
      await AtualizarDialogflowTicket(this.ticketFocado.id, value);
      this.$q.notify({
          type: 'positive',
          message: 'Configuração alterada!',
          progress: true,
          actions: [{ icon: 'close', round: true, color: 'white' }],
      })
      await AtualizarDialogflowTicket(this.ticketFocado.id, value);
      } catch (error) {
        console.error('error - AlterarConfiguracao', error)
        this.$data[key] = !value
        this.$notificarErro('Ocorreu um erro!', error)
      }
    },
    async atualizarChatgpt (key) {
      const value = this.$data[key];
      try {
      await AtualizarChatgptTicket(this.ticketFocado.id, value);
      this.$q.notify({
          type: 'positive',
          message: 'Configuração alterada!',
          progress: true,
          actions: [{ icon: 'close', round: true, color: 'white' }],
      })
      await AtualizarChatgptTicket(this.ticketFocado.id, value);
      } catch (error) {
        console.error('error - AlterarConfiguracao', error)
        this.$data[key] = !value
        this.$notificarErro('Ocorreu um erro!', error)
      }
    },
    async obterContato(key) {
      if (key === undefined) return
      try {
        const { data } = await ObterContato(key)
        return data.kanban
      } catch(err){
        console.log('Erro ao obter contato: ' + err)
      }
    },
    async carregarIntegracaoStatus() {
      if (this.ticketFocado && (this.ticketFocado.typebotStatus !== undefined || this.ticketFocado.dialogflowStatus !== undefined || this.ticketFocado.chatgptStatus !== undefined || this.ticketFocado.n8nStatus !== undefined || this.ticketFocado.difyStatus !== undefined)) {
        setTimeout(async () => {
          try{
            const kanbanStatus = await this.obterContato(this.ticketFocado.contactId)
            const kanbanName = await this.listarKanbans()
            const kanbanSelecionado = kanbanName.find(kanban => kanban.id === kanbanStatus);
            this.kanbanSelecionado = kanbanSelecionado ? kanbanSelecionado.name : null;
            this.kanbanStatus = kanbanStatus
            this.bloquearStatus = this.ticketFocado.contact.blocked
          } catch(e){
            // console.log('Carregar integração Kanban.')
          }
          this.typebotStatus = this.ticketFocado.typebotStatus
          this.dialogflowStatus = this.ticketFocado.dialogflowStatus
          this.chatgptStatus = this.ticketFocado.chatgptStatus
          this.n8nStatus = this.ticketFocado.n8nStatus
          this.difyStatus = this.ticketFocado.difyStatus
        }, 300);
      }
    },
    handlerNotifications(data) {
      const options = {
        body: `${data.body} - ${format(new Date(), 'HH:mm')}`,
        icon: data.ticket.contact.profilePicUrl,
        tag: data.ticket.id,
        renotify: true,
      }

      const notification = new Notification(`Mensagem de ${data.ticket.contact.name}`, options)

      setTimeout(() => {
        notification.close()
      }, 10000)

      notification.onclick = (e) => {
        e.preventDefault()
        window.focus()
        this.$store.dispatch('AbrirChatMensagens', data.ticket)
        this.$router.push({ name: 'atendimento' })
        // history.push(`/tickets/${ticket.id}`);
      }

      this.$nextTick(() => {
        // utilizar refs do layout
        try{
        this.$refs.audioNotificationPlay.play()
        } catch(e){
        }
      })
      // document.addEventListener('click', this.playAudioOnce)
      // const audioNotification = this.$refs.audioNotificationPlay
      // if (audioNotification) {
      //   audioNotification.play()
      // }    
    },
    // playAudioOnce() {
    //   const audioNotification = this.$refs.audioNotificationPlay
    //   if (audioNotification) {
    //     audioNotification.play()
    //     document.removeEventListener('click', this.playAudioOnce)
    //   }
    // },
    async setarFonteAudio(){
      if (this.notificacaoAtivo === 'enabled'){
        this.notificacaoSound = this.alertSound
      }
      else if (this.notificacaoAtivo === 'disabled'){
        this.notificacaoSound = this.silenceSound
      }
    },
    async listarConfiguracoes() {
      const { data } = await ListarConfiguracoes()
      localStorage.setItem('configuracoes', JSON.stringify(data))
      const difyConfig = data.find(config => config.key === 'dify')
      this.difyAtivo = difyConfig.value
      const n8nConfig = data.find(config => config.key === 'n8n')
      this.n8nAtivo = n8nConfig.value
      const typebotConfig = data.find(config => config.key === 'typebot')
      this.typebotAtivo = typebotConfig.value
      const dialogflowConfig = data.find(config => config.key === 'dialogflow')
      this.dialogflowAtivo = dialogflowConfig.value
      const chatgptConfig = data.find(config => config.key === 'chatgpt')
      this.chatgptAtivo = chatgptConfig.value
      const ignoreGroupMsg = data.find(config => config.key === 'ignoreGroupMsg')
      this.grupoAtivo = ignoreGroupMsg.value
      const universalCounter = data.find(config => config.key === 'universalCounter')
      this.contadorUniversal = universalCounter.value
      const autoCloseTime = data.find(config => config.key === 'autoCloseTime')
      this.tempoFechamento = autoCloseTime.value
      const autoClose = data.find(config => config.key === 'autoClose')
      this.autoFechamentoAtivo = autoClose.value
      const autoCloseMessage = data.find(config => config.key === 'autoCloseMessage')
      this.mensagemDeEncerramento = autoCloseMessage.value
      // await this.autoCloseTickets(this.tempoFechamento, this.mensagemDeEncerramento)
      // const notificationSilenced = data.find(config => config.key === 'notificationSilenced')
      // this.notificacaoAtivo = notificationSilenced.value
      // this.setarFonteAudio()
    },
    onScroll(info) {
      // if (this.loading || !this.hasMore) {
      //   return;
      // }
      if (this.loading) {
        return;
      }
      if (info.verticalPercentage <= 0.85) return
      this.onLoadMore()
    },
    editContact(contactId) {
      this.selectedContactId = contactId
      this.modalContato = true
    },
    contatoEditado(contato) {
      this.$store.commit('UPDATE_TICKET_FOCADO_CONTACT', contato)
    },
    async consultarTickets (paramsInit = {}) {
      const params = {
        ...this.pesquisaTickets,
        ...paramsInit
      }
      try {
        const { data } = await ConsultarTickets(params)
        this.countTickets = data.count
        this.$store.commit('LOAD_TICKETS', data.tickets)
        this.$store.commit('SET_HAS_MORE', data.hasMore)
      } catch (err) {
        this.$notificarErro('Algum problema', err)
        console.error(err)
      }
      // return () => clearTimeout(delayDebounceFn)
    },
    // async consultarTickets(paramsInit = {}) {
    //   const params = {
    //     ...this.pesquisaTickets,
    //     ...paramsInit,
    //   }
    //   try {
    //     const { data } = await ConsultarTickets(params)
    //     this.countTickets = data.count
    //     this.$store.commit('LOAD_TICKETS', data.tickets)
    //     this.$store.commit('SET_HAS_MORE', data.hasMore)
    //     if (this.hasMore) {
    //       setTimeout(async () => {
    //         this.pesquisaTickets.pageNumber++
    //         await this.consultarTickets()
    //       }, 1000);
    //     }
    //   } catch (err) {
    //     this.$notificarErro('Algum problema ao consutar ticket 3', err)
    //     console.error(err)
    //   }
    // },
    async BuscarTicketFiltro() {
      this.$store.commit('RESET_TICKETS')
      this.loading = true
      localStorage.setItem('filtrosAtendimento', JSON.stringify(this.pesquisaTickets))
      this.pesquisaTickets = {
        ...this.pesquisaTickets,
        pageNumber: 1,
      }
      await this.consultarTickets(this.pesquisaTickets)
      this.loading = false
      this.$setConfigsUsuario({ isDark: this.$q.dark.isActive })
    },
    wait(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },
    async onLoadMore() {
      // if (this.tickets.length === 0 || !this.hasMore || this.loading) {
      //   return
      // }
      this.$q.notify({
        color: 'positive',
        position: 'top',
        progress: true,
        message: 'Ao chegar ao final da lista de tickets, novos atendimentos são carregados em todas as abas. Essa ação será recorrente a cada 3 segundos!',
        actions: [{
          icon: 'close',
          round: true,
          color: 'white'
        }]
      });
      try {
        this.loading = true
        this.pesquisaTickets.pageNumber++
        await this.consultarTickets()
        await this.wait(3000);
        this.loading = false
      } catch (error) {
        this.loading = false
      }
    },
    async listarFilas() {
      const { data } = await ListarFilas()
      this.filas = data
      localStorage.setItem('filasCadastradas', JSON.stringify(data || []))
    },
    async listarWhatsapps() {
      const { data } = await ListarWhatsapps()
      this.$store.commit('LOAD_WHATSAPPS', data)
    },
    async listarEtiquetas() {
      const { data } = await ListarEtiquetas(true)
      this.etiquetas = data
    },
    async listTenantPorId(){
      const { data } = await ListarTenantPorId(this.usuario.tenantId)
      localStorage.setItem('nullticket', JSON.stringify(data[0].nullTickets))
      this.chatBotLane = data[0].showChatBot
      this.fixarConexao = data[0].fixConnections
      if(data[0].smsToken !==''){
        this.smsAtivo = true
      }
      // this.smsAtivo = 
      if(data[0].status !== 'active'){
        try {
        this.$q.notify({
          color: 'warning',
          position: 'top',
          message: 'Sua empresa está inativa!',
        });
        setTimeout(async () => {
          await RealizarLogout(usuario)
          localStorage.removeItem('token')
          localStorage.removeItem('username')
          localStorage.removeItem('profile')
          localStorage.removeItem('userId')
          localStorage.removeItem('queues')
          localStorage.removeItem('usuario')
          localStorage.removeItem('filtrosAtendimento')
          this.$router.go({ name: 'login', replace: true })
        }, 2000);
      } catch (error) {
        this.$notificarErro('Não foi possível realizar logout', error)
      }
      } else {
        if (data[0].asaas === 'enabled'){
          try{
            const { data } = await ListarTenantPorAsaas(this.usuario.tenantId)
            if (data.data.some(item => item.status === 'OVERDUE')) {
              this.$q.notify({
                color: 'warning',
                position: 'top',
                message: 'Entre em contato com o administrador do sistema!',
              });
              setTimeout(async () => {
                await RealizarLogout(usuario)
                localStorage.removeItem('token')
                localStorage.removeItem('username')
                localStorage.removeItem('profile')
                localStorage.removeItem('userId')
                localStorage.removeItem('queues')
                localStorage.removeItem('usuario')
                localStorage.removeItem('filtrosAtendimento')
                this.$router.go({ name: 'login', replace: true })
              }, 2000);
            }
          } catch(e){
            console.log('Não foi possível listar as opções de pagamento')
          }
        }
      }
    },
    async abrirModalUsuario() {
      // if (!usuario.id) {
      //   await this.dadosUsuario()
      // }
      // const { data } = await DadosUsuario(userId)
      // this.usuario = data
      this.modalUsuario = true
    },
    async efetuarLogout() {
      console.log('logout - index atendimento')
      try {
        await RealizarLogout(usuario)
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
    copyContent(content) {
      navigator.clipboard
        .writeText(content)
        .then(() => {
          // Copiado com sucesso
          console.log('Conteúdo copiado: ', content)
        })
        .catch((error) => {
          // Ocorreu um erro ao copiar
          console.error('Erro ao copiar o conteúdo: ', error)
        })
    },
    // editarMensagem(mensagem) {
    //   const dialog = this.$q
    //     .dialog({
    //       component: () => import('./Chat/DIalogEdicaoMensagem.vue'),
    //       parent: this,
    //       mensagensRapidas: this.mensagensRapidas,
    //       replyingMessage: null,
    //       mensagem,
    //     })
    //     .onOk((updated) => {
    //       this.$store.commit('UPDATE_MESSAGE', {
    //         id: mensagem.id,
    //         ticketId: this.ticketFocado.id,
    //         ...updated,
    //       })

    //       dialog.hide()
    //     })
    // },
    deletarMensagem(mensagem) {
      this.$q
        .dialog({
          title: 'Atenção!! Deseja realmente deletar a mensagem? ',
          message: 'Mensagens antigas não serão apagadas no cliente.',
          cancel: {
            label: 'Não',
            color: 'primary',
            push: true,
          },
          ok: {
            label: 'Sim',
            color: 'negative',
            push: true,
          },
          persistent: true,
        })
        .onOk(() => {
          this.loading = true
          DeletarMensagem(mensagem)
            .then((res) => {
              this.loading = false
              mensagem.isDeleted = true
            })
            .catch((error) => {
              this.loading = false
              console.error(error)
              this.$notificarErro('Não foi possível apagar a mensagem', error)
            })
        })
        .onCancel(() => {})
    },
    async tagSelecionada(tags) {
      const { data } = await EditarEtiquetasContato(this.ticketFocado.contact.id, [...tags])
      this.contatoEditado(data)
    },
    async carteiraDefinida(wallets) {
      const { data } = await EditarCarteiraContato(this.ticketFocado.contact.id, [...wallets])
      this.contatoEditado(data)
    },
    async listarUsuarios() {
      try {
        const { data } = await ListarUsuarios()
        this.usuarios = data.users
      } catch (error) {
        console.error(error)
        this.$notificarErro('Problema ao carregar usuários', error)
      }
    },
    async atualizarUsuario() {
      try {
        const { data } = await DadosUsuario(this.usuario.userId)
        this.filasUser = data.queues
      } catch (error) {
        console.error(error)
        this.$notificarErro('Problema ao carregar usuário', error)
      }
    },
    setValueMenu() {
      this.drawerTickets = !this.drawerTickets
    },
    setValueMenuContact() {
      this.drawerContact = !this.drawerContact
    },
    async abrirModalLogs() {
      const { data } = await ConsultarLogsTicket({ ticketId: this.ticketFocado.id })
      this.logsTicket = data
      this.exibirModalLogs = true
    },
    async abrirModalProtocoloLogs() {
      const { data } = await ConsultarLogsProtocolo({ ticketId: this.ticketFocado.id })
      this.logsProtocolo = data
      this.exibirModalProtocoloLogs = true
    },
    async abrirModalAvaliacaoLogs() {
      const { data } = await ConsultarLogsAvaliacao({ ticketId: this.ticketFocado.id })
      this.logsAvaliacao = data
      this.exibirModalAvaliacaoLogs = true
    },
    async abrirModalNotaLogs() {
      const { data } = await ConsultarLogsNota({ ticketId: this.ticketFocado.id })
      this.logsNota = data
      this.exibirModalNotaLogs = true
    },
    async selecionarKanbanParaContato() {
      const contato = {
        number: this.ticketFocado.contact.number,
        kanban: this.kanbanSelecionado
      };
      try {
        const { data } = await EditarContato(this.ticketFocado.contactId, contato);
        // console.log(data);
      } catch (error) {
        console.error('error - AlterarConfiguracao', error)
        this.$notificarErro('Ocorreu um erro ao tentar salvar os dados: ', error)
      }
      
    },
    async bloquearContato() {
      console.log(this.bloquearStatus)
      const contato = {
        number: this.ticketFocado.contact.number,
        blocked: this.bloquearStatus
      };
      try {
        const { data } = await EditarContato(this.ticketFocado.contactId, contato);
        // console.log(data);
      } catch (error) {
        console.error('error - AlterarConfiguracao', error)
        this.$notificarErro('Ocorreu um erro ao tentar salvar os dados: ', error)
      }
    },
    async listarKanbans () {
      try{
      const { data } = await ListarKanbans()
      this.kanbans = data.kanban
      return data.kanban;
    } catch(e){
      // console.log('Listar Kanban')
    }
    }
  },
  beforeMount() {
    this.$store.commit('RESET_TICKETS')
    // this.$store.commit('UPDATE_TICKET')
    this.listarFilas()
    this.listarEtiquetas()
    this.listarConfiguracoes()
    const filtros = JSON.parse(localStorage.getItem('filtrosAtendimento'))
    if (!filtros?.pageNumber != 1) {
      localStorage.setItem('filtrosAtendimento', JSON.stringify(this.pesquisaTickets))
    }
  },
  // async mounted() {
  //   if (!localStorage.getItem('reloaded')) {
  //     localStorage.setItem('reloaded', 'true');
  //     window.location.reload();
  //   } else {
  //     localStorage.removeItem('reloaded');
  //   }
  //   // await this.autoCloseTickets(this.tempoFechamento)
  //   await this.listTenantPorId()
  //   await this.atualizarUsuario()
  //   await this.aceitarTermos()
  //   await this.listarMensagens()
  //   this.$store.commit('UPDATE_SHOW_MENU', this.showMenu)
  //   this.$root.$on('infor-cabecalo-chat:acao-menu', this.setValueMenu)
  //   this.$root.$on('update-ticket:info-contato', this.setValueMenuContact)
  //   this.socketTicketList()
  //   this.pesquisaTickets = JSON.parse(localStorage.getItem('filtrosAtendimento'))
  //   this.$root.$on('handlerNotifications', this.handlerNotifications)
  //   await this.listarWhatsapps()
  //   await this.consultarTickets()
  //   await this.listarUsuarios()
  //   const { data } = await ListarMensagensRapidas()
  //   this.mensagensRapidas = data
  //   if (!('Notification' in window)) {
  //   } else {
  //     Notification.requestPermission()
  //   }
  //   this.userProfile = localStorage.getItem('profile')
  //   // this.socketInitial()

  //   // se existir ticket na url, abrir o ticket.
  //   if (this.$route?.params?.ticketId) {
  //     const ticketId = this.$route?.params?.ticketId
  //     if (ticketId && this.tickets.length > 0) {
  //       const ticket = this.tickets.find((t) => t.id === +ticketId)
  //       if (!ticket) return
  //       // caso esteja em um tamanho mobile, fechar a drawer dos contatos
  //       if (this.$q.screen.lt.md && ticket.status !== 'pending') {
  //         this.$root.$emit('infor-cabecalo-chat:acao-menu')
  //       }
  //       console.log('before - AbrirChatMensagens', ticket)
  //       this.$store.commit('SET_HAS_MORE', true)
  //       this.$store.dispatch('AbrirChatMensagens', ticket)
  //     }
  //   } else {
  //     console.log('chat-empty')
  //     this.$router.push({ name: 'chat-empty' })
  //   }
  //   // await this.autoCloseTickets(this.tempoFechamento, this.mensagemDeEncerramento)
  // },
  async mounted() {
    this.loadingMount = true;

    this.notify = this.$q.notify({
      position: 'top',
      type: 'positive',
      message: 'Aguarde enquanto os tickets são carregados...',
      progress: true,
      actions: [{ icon: 'close', round: true, color: 'white' }],
    });

    if (!localStorage.getItem('reloaded')) {
      localStorage.setItem('reloaded', 'true');
      window.location.reload();
    } else {
      localStorage.removeItem('reloaded');
    }

    try {
      this.$root.$on('infor-cabecalo-chat:acao-menu', this.setValueMenu);
      this.$root.$on('update-ticket:info-contato', this.setValueMenuContact);
      this.socketTicketList();
      this.pesquisaTickets = JSON.parse(localStorage.getItem('filtrosAtendimento'));
      this.$root.$on('handlerNotifications', this.handlerNotifications);
      await this.listarWhatsapps();
      await this.consultarTickets();
      await this.listarUsuarios();
      try{
        await this.listTenantPorId();
        await this.atualizarUsuario();
        await this.aceitarTermos();
        await this.listarMensagens();
        await this.listarAvaliacao()
        await this.loadColors()
        await this.loadMoreOpenTickets()
      } catch(e){
        console.log(e)
      }
      const { data } = await ListarMensagensRapidas();
      this.mensagensRapidas = data;
      if ('Notification' in window) {
        Notification.requestPermission();
      }
      this.userProfile = localStorage.getItem('profile');

      // Verificar se existe ticket na URL e abrir o ticket
      if (this.$route?.params?.ticketId) {
        const ticketId = this.$route.params.ticketId;
        if (ticketId && this.tickets.length > 0) {
          const ticket = this.tickets.find((t) => t.id === +ticketId);
          if (ticket) {
            if (this.$q.screen.lt.md && ticket.status !== 'pending') {
              this.$root.$emit('infor-cabecalo-chat:acao-menu');
            }
            this.$store.commit('SET_HAS_MORE', true);
            this.$store.dispatch('AbrirChatMensagens', ticket);
          }
        }
      } else {
        this.$router.push({ name: 'chat-empty' });
      }
      this.$store.commit('UPDATE_SHOW_MENU', this.showMenu);

    } catch (error) {
      console.error('Erro ao montar o componente:', error);
    } finally {
      this.isMounted = true;
      this.loadingMount = false;
      if (this.notify) {
        this.notify();
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    if (!this.isMounted) {
      next(false);
    } else {
      next();
    }
  },
  destroyed() {
    this.$store.commit('RESET_TICKETS')
    this.$root.$off('handlerNotifications', this.handlerNotifications)
    this.$root.$off('infor-cabecalo-chat:acao-menu', this.setValueMenu)
    this.$root.$on('update-ticket:info-contato', this.setValueMenuContact)
    // this.socketDisconnect()
    this.$store.commit('TICKET_FOCADO', {})
  },
}
</script>

<style lang="sass">
.contact-info
  display: flex
  flex-direction: column
  align-items: center
  text-align: center

.contact-avatar
  margin-bottom: 1rem

.avatar-img
  border-radius: 50%
  width: 100px
  height: 100px

.contact-details
  width: 100%
  max-width: 300px

.contact-item
  display: flex
  justify-content: space-between
  margin-bottom: 0.5rem

.contact-label
  font-weight: bold

.contact-value a
  text-decoration: none
  color: inherit

.contact-actions
  margin-top: 1rem

absolute-top
  position: absolute
  top: 0

.upload-btn-wrapper
  position: relative
  overflow: hidden
  display: inline-block

  & input[type="file"]
    font-size: 100px
    position: absolute
    left: 0
    top: 0
    opacity: 0

.WAL
  width: 100%
  height: 100%

  &:before
    content: ''
    height: 127px
    position: fixed
    top: 0
    width: 100%

  &__layout
    margin: 0 auto
    z-index: 4000
    height: 100%
    width: 100%

  &__field.q-field--outlined .q-field__control:before
    border: none

  .q-drawer--standard
    .WAL__drawer-close
      display: none

@media (max-width: 850px)
  .WAL
    padding: 0
    &__layout
      width: 100%
      border-radius: 0

@media (min-width: 691px)
  .WAL
    &__drawer-open
      display: none

.conversation__summary
  margin-top: 4px

.conversation__more
  margin-top: 0!important
  font-size: 1.4rem

.tab-container
  overflow-x: auto
  font-size: 0.75rem

.tab-scroll
  white-space: nowrap
  
.badge-left
  border-radius: 50%
  
.black-icon
  color: black !important

.q-tabs__indicator
  background: transparent !important
  
.blur-effect 
  filter: blur(0px)
</style>