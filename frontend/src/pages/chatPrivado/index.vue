<template>
  <div class="whatsapp-app position-relative bg-grey-4" :style="style">
    <q-layout view="lHh Lpr lFf" class="whatsapp-layout shadow-3" container>
      <q-header elevated>
        <q-toolbar class="bg-grey-3 text-black">
          <q-btn flat class="bg-padrao btn-rounded" icon="mdi-home" @click="() => $router.push({ name: 'home-dashboard' })">
            <q-tooltip content-class="bg-padrao text-grey-9 text-bold">
              Retornar ao menu
            </q-tooltip>
          </q-btn>
          <q-btn flat class="bg-padrao btn-rounded q-ml-xs" icon="mdi-forum-outline" @click="() => $router.push({ name: 'atendimento' })">
            <q-tooltip content-class="bg-padrao text-grey-9 text-bold">
              Atendimento
            </q-tooltip>
          </q-btn>
          <q-btn flat class="bg-padrao btn-rounded q-ml-xs" icon="mdi-arrow-right-bold-box-outline" @click="toggleRightDrawer">
            <q-tooltip content-class="bg-padrao text-grey-9 text-bold">
              Reduzir
            </q-tooltip>
          </q-btn>
          <div class="row items-center q-mx-md">
            <q-btn round flat :disable="cDisableActions">
              <q-avatar color="primary" text-color="white">
                {{ Value(selectedContact.name.charAt(0), 'name') }}
              </q-avatar>
            </q-btn>
            <div class="q-pl-md">
              <div class="q-subtitle-2 q-font-weight-bold">
                {{ Value(selectedContact.name, 'name') }}
                <q-skeleton v-if="!Value(selectedContact.name, 'name')" animation="none" style="width: 230px" />
              </div>
              <div class="q-caption text-grey-7">
                {{ Value(selectedContact.email, 'email') }}
                <q-skeleton v-if="!Value(selectedContact.email, 'email')" animation="none" style="width: 230px" />
              </div>
            </div>
          </div>
          <q-space />
        </q-toolbar>
      </q-header>

      <q-page-container class="bg-grey-2" :style="styleChatArea">
        <q-scroll-area ref="chatPanel" class="scroll-y chatarea" :style="cStyleScrolll" @scroll="scrollArea">
          <div class="q-pa-md">
            <transition-group appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
              <div v-for="(message, index) in messages" :key="message.id" class="text-weight-medium">
                <hr v-if="isLineDate" :key="'hr-' + index" class="hr-text q-mt-lg q-mb-md"
                  :data-content="formatarData(message.timestamp)"
                  v-show="index === 0 || formatarData(message.timestamp) !== formatarData(messages[index - 1].timestamp)">
                <q-chat-message :ref="message.id" :id="message.id"
                  :name="message.sender.id == usuario.userId ? 'Eu' : message.sender.name"
                  :bg-color="message.sender == usuario.userId ? 'grey-2' : $q.dark.isActive ? 'blue-2' : 'blue-1'"
                  :stamp="dataInWordsMessage(Number(message.timestamp))" :sent="message.sender.id == usuario.userId">
                  <div style="width: 200px">
                    <q-icon v-if="message.sender == usuario.userId" class="absolute-bottom-right q-pr-xs q-pb-xs"
                      name="mdi-check-all" size="1.2em" :color="message.read ? 'blue-12' : ''" />
                    <template v-if="message.mediaType === 'image'">
                      <q-img @click=" urlMedia = message.mediaUrl; abrirModalImagem = true" :src="message.mediaUrl"
                        spinner-color="primary" class="q-mt-md" style="cursor: pointer;min-width: 280px;max-width: 280px;" />
                      <VueEasyLightbox moveDisabled :visible="abrirModalImagem" :imgs="urlMedia" :index="message.ticketId || 1" @hide="abrirModalImagem = false" />
                    </template>
                    <template v-if="message.mediaType === 'video'">
                      <video :src="message.mediaUrl" controls class="q-mt-md" style="height:150px; min-width: 280px;max-width: 280px; objectFit: cover; borderRadius: 8px;">
                      </video>
                    </template>
                    <template v-if="!['audio', 'contactMessage', 'image', 'video'].includes(message.mediaType) && message.mediaUrl">
                      <div class="text-center full-width hide-scrollbar no-scroll" style="min-width: 280px;max-width: 280px;">
                        <iframe v-if="isPDF(message.mediaUrl)" frameBorder="0" scrolling="no" style="min-width: 280px;max-width: 280px; overflow-y: hidden;" class="no-scroll hide-scrollbar" :src="message.mediaUrl">
                          Faça download do PDF
                        </iframe>
                        <q-btn type="a" :color="$q.dark.isActive ? '' : 'grey-3'" no-wrap no-caps stack dense class="q-mt-sm text-center text-black btn-rounded text-grey-9 ellipsis" download :target="isPDF(message.mediaUrl) ? '_blank' : ''" :href="message.mediaUrl">
                          <q-tooltip v-if="message.mediaUrl" content-class="text-bold">
                            Baixar: {{ message.mediaName }}
                            {{ message.text }}
                          </q-tooltip>
                          <div class="row items-center q-ma-xs">
                            <div class="ellipsis col-grow q-pr-sm" style="max-width: 290px">
                              {{ formatarMensagem(message.text || message.mediaName) }}
                            </div>
                            <q-icon name="mdi-download" />
                          </div>
                        </q-btn>
                      </div>
                    </template>
                    <div v-if="message.mediaType === 'chat'" class="q-message-container row items-end no-wrap">
                      {{ message.text }}
                    </div>
                  </div>
                </q-chat-message>
              </div>
            </transition-group>
            <div id="inicioListaMensagensChat"></div>
          </div>
        </q-scroll-area>
      </q-page-container>

      <q-drawer v-model="rightDrawerOpen" side="right" show-if-above bordered :breakpoint="690">
        <q-toolbar class="bg-grey-3 q-mb-xs">
          
          <q-input rounded outlined dense class="drawer-search q-ml-xs" bg-color="white" v-model="searchParam" @input="buscarTicketFiltro()" placeholder="Pesquisar..." style="width: 200px;">
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
          </q-input>
          <q-space />
          <q-btn round flat icon="close" class="drawer-close" @click="toggleRightDrawer" />
        </q-toolbar>

        <q-tabs v-model="tab" inline-label class="btn-rounded" dense narrow-indicator :active-bg-color="$q.dark.isActive ? 'primary' : 'grey-3'" align="justify" :class="{'text-white': $q.dark.isActive, 'text-black': !$q.dark.isActive}">
          <q-tab :ripple="false" name="users" icon="mdi-account-outline" label="Usuários">
            <template v-slot:default>
              <span>
                <q-badge v-if="notificacaoInternaNaoLida > 0"
                    color="red"
                    floating
                    class="badge-left"
                  > {{ notificacaoInternaNaoLida }}</q-badge>
              </span>
            </template>
          </q-tab>
          <q-tab :ripple="false" name="groups" icon="mdi-account-outline" label="Equipes">
            <template v-slot:default>
              <span>
                <q-badge v-if="notificacaoInternaGrupoNaoLida > 0"
                    color="red"
                    floating
                    class="badge-left"
                  > {{ notificacaoInternaGrupoNaoLida }}</q-badge>
              </span>
            </template>
          </q-tab>
          <!-- <q-tab :ripple="false" name="groups" icon="mdi-account-outline" label="Equipes"></q-tab> -->
        </q-tabs>
        <template>
          <q-tab-panels v-model="tab" animated swipeable>
            <q-tab-panel name="users" class="tabChat">
              <q-scroll-area style="height: calc(96vh - 158px) !important">
                <q-list>
                  <q-item v-for="(contact) in searchedUsers" :key="contact.id" clickable v-ripple @click="openChat(contact, false)">
                    <q-item-section avatar>
                      <q-avatar color="primary" text-color="white">
                        {{ contact.name.charAt(0) }}
                        <q-tooltip>
                          {{ contact.isOnline ? 'Online' : 'Offline' }}
                        </q-tooltip>
                        <q-badge floating style="background-color: green;" v-if="contact.isOnline"></q-badge>
                        <q-badge floating style="background-color: gray;" v-if="!contact.isOnline"></q-badge>
                      </q-avatar>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label lines="1">
                        {{ contact.name }}
                        <q-tooltip content-class="text-bold">
                          {{ contact.name }}
                        </q-tooltip>
                      </q-item-label>
                      <q-item-label class="conversation__summary" caption>
                        <q-icon v-if="contact.read !== null" name="mdi-check-all" size="1.2em" :color="contact.read ? 'blue-12' : ''" />
                        {{ contact.text || '' }}
                      </q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <q-item-label caption>
                        {{ dataInWords(contact.timestamp) }}
                      </q-item-label>
                      <q-badge class="badge-left" color="red" v-if="contact.count > 0">{{ contact.count }}</q-badge>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-scroll-area>
            </q-tab-panel>
            <q-tab-panel name="groups" class="tabChat">
              <q-scroll-area style="height: calc(96vh - 158px) !important">
                <q-list>
                  <q-item v-for="(contact) in searchedGroup" :key="contact.id" clickable v-ripple @click="openChat(contact, true)">
                    <q-item-section avatar>
                      <q-avatar color="primary" text-color="white">
                        {{ contact.name.charAt(0) }}
                      </q-avatar>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label lines="1">
                        {{ contact.name }}
                        <q-tooltip content-class="text-bold">
                          {{ contact.name }}
                        </q-tooltip>
                      </q-item-label>
                      <q-item-label class="conversation__summary" caption>
                        {{ contact.text || '' }}
                      </q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <q-item-label caption>
                        {{ dataInWords(contact.timestamp) }}
                      </q-item-label>
                      <q-badge class="badge-left" color="red" v-if="contact.count > 0">{{ contact.count }}</q-badge>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-scroll-area>
            </q-tab-panel>
          </q-tab-panels>
        </template>
      </q-drawer>

      <q-footer>
        <q-toolbar class="bg-grey-3 text-black row">
          <template>
            <q-btn v-if="$q.screen.width > 500" flat dense icon="mdi-emoticon-happy-outline" :disable="cDisableActions || cMostrarEnvioArquivo" class="bg-padrao btn-rounded q-mx-xs" :color="$q.dark.isActive ? 'white' : ''">
              <q-tooltip content-class="text-bold">
                Emoji
              </q-tooltip>
              <q-menu anchor="top right" self="bottom middle" :offset="[5, 40]">
                <VEmojiPicker style="width: 40vw" :showSearch="false" :emojisByRow="20" labelSearch="Localizar..." lang="pt-BR" @select="onInsertSelectEmoji" />
              </q-menu>
            </q-btn>
            <q-btn v-if="$q.screen.width > 500" icon="mdi-paperclip" round flat :disable="cDisableActions" @click="abrirEnvioArquivo" dense :color="$q.dark.isActive ? 'white' : ''">
              <q-tooltip content-class="text-bold">
                Anexar Arquivo
              </q-tooltip>
            </q-btn>
            <q-btn v-if="$q.screen.width > 500" icon="mdi-message-video" round flat :disable="cDisableActions" @click="handlSendLinkVideo" dense :color="$q.dark.isActive ? 'white' : ''">
              <q-tooltip content-class="text-bold">
                Enviar link para videoconferencia
              </q-tooltip>
            </q-btn>
            <q-input hide-bottom-space :disable="cDisableActions" v-show="!cMostrarEnvioArquivo" ref="inputEnvioMensagem" id="inputEnvioMensagem" type="textarea" @keydown.exact.enter.prevent="() => newMenssage.trim().length ? sendMessage() : ''" class="col-grow q-mx-xs text-grey-10 inputEnvioMensagem" bg-color="white" color="grey-7" placeholder="Digita sua mensagem" input-style="max-height: 30vh" autogrow rounded dense outlined v-model="newMenssage">
              <template v-slot:prepend v-if="$q.screen.width < 500">
                <q-btn flat icon="mdi-emoticon-happy-outline" :disable="cDisableActions" dense round :color="$q.dark.isActive ? 'white' : ''">
                  <q-tooltip content-class="text-bold">
                    Emoji
                  </q-tooltip>
                  <q-menu anchor="top right" self="bottom middle" :offset="[5, 40]">
                    <VEmojiPicker style="width: 40vw" :showSearch="false" :emojisByRow="20" labelSearch="Localizar..." lang="pt-BR" @select="onInsertSelectEmoji" />
                  </q-menu>
                </q-btn>
                <q-btn icon="mdi-paperclip" round flat :disable="cDisableActions" @click="abrirEnvioArquivo" dense :color="$q.dark.isActive ? 'white' : ''">
                  <q-tooltip content-class="text-bold">
                    Enviar
                  </q-tooltip>
                </q-btn>
              </template>
            </q-input>
            <q-file :disable="cDisableActions" ref="PickerFileMessage" id="PickerFileMessage" v-show="cMostrarEnvioArquivo" v-model="arquivos" class="col-grow q-mx-xs PickerFileMessage" bg-color="white" input-style="max-height: 30vh" outlined use-chips multiple autogrow dense rounded append :max-files="5" :max-file-size="15728640" :max-total-size="31457280" @keydown.exact.enter.prevent="() => arquivos.length > 0 ? sendMessage() : ''" accept=".txt, .xml, .jpg, .png, image/jpeg, .pdf, .doc, .docx, .mp4, .xls, .xlsx, .jpeg, .zip, .ppt, .pptx, image/*" @rejected="onRejectedFiles" />
            <q-btn ref="btnEnviarMensagem" @click="sendMessage()" flat icon="mdi-send" :disable="cDisableActions" class="bg-padrao btn-rounded q-mx-xs" :color="$q.dark.isActive ? 'white' : ''">
              <q-tooltip content-class="text-bold">
                Enviar
              </q-tooltip>
            </q-btn>
          </template>
        </q-toolbar>
      </q-footer>
    </q-layout>
    <audio ref="audioNotification">
      <source :src="alertSound" type="audio/mp3">
    </audio>
  </div>
</template>

<script>

import { uid } from 'quasar'
import { mapGetters } from 'vuex'
import { ListarUsuariosChatPrivado } from 'src/service/user'
import pt from 'date-fns/locale/pt-BR'
import { format, formatDistance, parseJSON } from 'date-fns'
import { listCountUnreadPrivateMessage, listCountUnreadGroupMessage, enviarMensagemPrivada, listarGruposPrivados, listarMensagensPrivadas, marcarMensagemPrivadaComoLida } from 'src/service/chatPrivado'
import VueEasyLightbox from 'vue-easy-lightbox'
import { VEmojiPicker } from 'v-emoji-picker'
import whatsBackground from 'src/assets/wa-background.png'
import whatsBackgroundDark from 'src/assets/wa-background-dark.jpg'
import alertSound from 'src/assets/sound.mp3'
import mixinSockets from 'src/pages/atendimento/mixinSockets'
import socketInitial from 'src/layouts/socketInitial'
import { MostrarCores } from 'src/service/empresas';

export default {
  mixins: [mixinSockets, socketInitial],
  name: 'WhatsappLayout',
  props: {
    isLineDate: {
      type: Boolean,
      default: true
    },
    showMenu: {
      type: Boolean,
      default: false
    }
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
      notificacaoInternaNaoLida: '',
      notificacaoInternaGrupoNaoLida: '',
      usuario: {},
      rightDrawerOpen: false,
      abrirModalImagem: false,
      search: '',
      message: '',
      newMenssage: '',
      urlMedia: '',
      alertSound,
      tab: 'users',
      searchParam: '',
      searchedUsers: [],
      searchedGroup: [],
      arquivos: [],
      messages: [],
      userId: 0,
      heigthInputMensagem: 0,
      abrirFilePicker: false,
      selectedContact: {
        id: null,
        name: '',
        isOnline: false,
        messages: [],
        hasMore: false
      }
    }
  },
  computed: {
    ...mapGetters([
      'userChat',
      'mensagemChatPrivado',
      'notificacaoChatPrivado',
      'chatFocado',
      'unreadMessageInterna',
      'listaUsuarios',
      'listaGrupos'
    ]),
    cMostrarEnvioArquivo() {
      return this.arquivos.length > 0
    },
    style() {
      return {
        height: this.$q.screen.height + 'px'
      }
    },
    styleChatArea() {
      return {
        backgroundImage: this.$q.dark.isActive ? `url(${whatsBackgroundDark}) !important` : `url(${whatsBackground}) !important`,
        backgroundPosition: 'center !important',
        minHeight: '100vh'
      }
    },
    cDisableActions() {
      return (this.selectedContact.id == null)
    },
    cStyleScrolll() {
      const loading = 0 // this.loading ? 72 : 0
      const add = this.heigthInputMensagem + loading
      return `min-height: calc(100vh - ${100 + add}px) !important; width: 100%`
    }
  },
  watch: {
    // notificacaoChatPrivado: {
    //   handler() {
    //     // if (this.$router.currentRoute.fullPath.indexOf('atendimento-Interno') < 0 || !this.chatFocado.id || this.chatFocado.id !== this.notificacaoChatPrivado.senderId) {
    //     //   this.$store.commit('LIST_PRIVATE_NOTIFICATION', { action: 'update', data: 1 })
    //     // }
    //     this.$store.commit('LIST_PRIVATE_NOTIFICATION', { action: 'update', data: 1 })
    //     this.contarMensagens()
    //   }
    // },
    listaUsuarios: {
      handler() {
        this.searchedUsers = this.listaUsuarios
        if (this.searchParam.length > 0) {
          this.searchedUsers = this.listaUsuarios.filter(u => u.name.toLowerCase().indexOf(this.searchParam.toLowerCase()) == 0)
        }
      }
    },
    listaGrupos: {
      handler() {
        this.searchedGroup = this.listaGrupos
        if (this.searchParam.length > 0) {
          this.searchedGroup = this.listaGrupos.filter(u => u.name.toLowerCase().indexOf(this.searchParam.toLowerCase()) == 0)
        }
      }
    },
    unreadMessageInterna: {
      handler() {
        const usuario = JSON.parse(localStorage.getItem('usuario'))
        if (this.selectedContact.id !== null && this.selectedContact.id == this.unreadMessageInterna.receiverId) {
          this.messages.forEach(message => {
            if (message.sender.id == this.unreadMessageInterna.senderId) {
              message.read = true
              this.$forceUpdate()
            }
          })
        }
        if (this.unreadMessageInterna.senderId == usuario.userId) {
          const index = this.listaUsuarios.findIndex(user => user.id == this.unreadMessageInterna.receiverId)
          const user = { ...this.listaUsuarios[index] }
          user.read = true
          this.$store.commit('LIST_USERS_PRIVATE', { action: 'update', data: user })
        }
      }
    },
    userChat: {
      handler() {
        this.usuarios.forEach(user => {
          if (user.id === this.userChat.userId) {
            user.isOnline = this.userChat.isOnline
            this.$forceUpdate()
          }
        })
      }
    },
    mensagemChatPrivado: {
    handler() {
      const usuario = JSON.parse(localStorage.getItem('usuario'));
      if (this.selectedContact.id !== null &&
        ((this.selectedContact.id == this.mensagemChatPrivado.senderId && this.mensagemChatPrivado.groupId == null) ||
          (this.selectedContact.id == this.mensagemChatPrivado.groupId && this.mensagemChatPrivado.receiverId == null && this.mensagemChatPrivado.senderId != usuario.userId))
      ) {
        // Verifica se a mensagem já existe
        const existingMessage = this.messages.find(message => message.id === this.mensagemChatPrivado.id);
        if (!existingMessage) {
          const newMessage = {
            id: this.mensagemChatPrivado.id,
            text: this.mensagemChatPrivado.text,
            timestamp: this.mensagemChatPrivado.timestamp,
            sender: this.mensagemChatPrivado.sender,
            received: this.mensagemChatPrivado.receiverId,
            mediaType: this.mensagemChatPrivado.mediaType,
            mediaName: this.mensagemChatPrivado.mediaName,
            mediaUrl: this.mensagemChatPrivado.mediaUrl
          };

          this.messages.push(newMessage);

          // Atualiza a lista de usuários
          if (this.selectedContact.isGroup) {
            const index = this.listaGrupos.findIndex(grupo => grupo.id == this.mensagemChatPrivado.groupId);
            const group = { ...this.listaGrupos[index] };
            group.senderId = this.mensagemChatPrivado.senderId;
            group.timestamp = this.mensagemChatPrivado.timestamp;
            group.text = this.mensagemChatPrivado.text;
            group.read = null;
            this.$store.commit('LIST_GROUPS_PRIVATE_CHAT', { action: 'update', data: group });
          } else {
            const index = this.listaUsuarios.findIndex(user => user.id == this.mensagemChatPrivado.senderId);
            const user = { ...this.listaUsuarios[index] };
            user.senderId = this.mensagemChatPrivado.senderId;
            user.timestamp = this.mensagemChatPrivado.timestamp;
            user.text = this.mensagemChatPrivado.text;
            user.read = null;
            this.$store.commit('LIST_USERS_PRIVATE', { action: 'update', data: user });
          }

          this.$forceUpdate();
          this.marcarMensagemComoLida(this.selectedContact.id, this.selectedContact.isGroup);
          this.scrollToBottom();
        }
      } else {
        // Atualiza a lista de usuários
        if (this.mensagemChatPrivado.groupId != null && this.mensagemChatPrivado.senderId != usuario.userId) {
          const index = this.listaGrupos.findIndex(grupo => grupo.id == this.mensagemChatPrivado.groupId);
          const group = { ...this.listaGrupos[index] };
          group.senderId = this.mensagemChatPrivado.senderId;
          group.timestamp = this.mensagemChatPrivado.timestamp;
          group.text = this.mensagemChatPrivado.text;
          group.read = null;
          group.count++;
          this.$store.commit('LIST_GROUPS_PRIVATE_CHAT', { action: 'update', data: group });
        } else {
          const index = this.listaUsuarios.findIndex(user => user.id == this.mensagemChatPrivado.senderId);
          const user = { ...this.listaUsuarios[index] };
          user.senderId = this.mensagemChatPrivado.senderId;
          user.timestamp = this.mensagemChatPrivado.timestamp;
          user.text = this.mensagemChatPrivado.text;
          user.read = null;
          user.count++;
          this.$store.commit('LIST_USERS_PRIVATE', { action: 'update', data: user });
        }

        this.$forceUpdate();
      }
    }
  },
    notificacaoChatPrivado: {
      handler() {
        const usuario = JSON.parse(localStorage.getItem('usuario'))
        if (this.notificacaoChatPrivado.groupId && this.notificacaoChatPrivado.senderId !== usuario.userId) {
          const index = this.listaGrupos.findIndex(g => g.id == this.notificacaoChatPrivado.groupId)
          const grupo = this.listaGrupos[index]
          if ((index >= 0 && !this.chatFocado) || (this.chatFocado && this.chatFocado.id !== grupo.id)) {
            this.$store.commit('LIST_PRIVATE_NOTIFICATION', { action: 'update', data: 1 })
            this.contarMensagens()
            const audio = new Audio(alertSound)
            audio.play()
            return
          }
          return
        }
        if ((!this.chatFocado || this.chatFocado.id !== this.notificacaoChatPrivado.senderId) && this.notificacaoChatPrivado.senderId !== usuario.userId) {
          this.$store.commit('LIST_PRIVATE_NOTIFICATION', { action: 'update', data: 1 })
          this.contarMensagens()
          const audio = new Audio(alertSound)
          audio.play()
        }
      }
    }
  },
  methods: {
    async contarMensagens() {
      try {
        const privateMessageData = await listCountUnreadPrivateMessage(this.usuario.userId);
        const groupMessageData = await listCountUnreadGroupMessage(this.usuario.userId);
        this.notificacaoInternaNaoLida = privateMessageData.data.count
        this.notificacaoInternaGrupoNaoLida = groupMessageData.data.count.count
      } catch(e){

      }
    },
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
    toggleRightDrawer() {
      this.rightDrawerOpen = !this.rightDrawerOpen
    },
    async openChat(contact, isGroup) {
      this.$store.commit('CHAT_PRIVATE_FOC_UPDATE', contact)
      this.selectedContact = contact
      this.selectedContact.isGroup = isGroup
      this.listarMensagens(contact.id, isGroup)
      this.scrollToBottom()
      await this.marcarMensagemComoLida(contact.id, isGroup)
    },
    abrirEnvioArquivo(event) {
      this.newMenssage = ''
      this.abrirFilePicker = true
      this.$refs.PickerFileMessage.pickFiles(event)
    },
    onRejectedFiles(rejectedEntries) {
      this.$q.notify({
        html: true,
        message: `Ops... Ocorreu um erro! <br>
        <ul>
          <li>Cada arquivo deve ter no máximo 10MB.</li>
          <li>Em caso de múltiplos arquivos, o tamanho total (soma de todos) deve ser de até 30MB.</li>
        </ul>`,
        type: 'negative',
        progress: true,
        position: 'top',
        actions: [{
          icon: 'close',
          round: true,
          color: 'white'
        }]
      })
    },
    async listarMensagens(userId, isGroup) {
      try {
        const { data } = await listarMensagensPrivadas(userId, isGroup)
        // Filtra as mensagens para incluir apenas aquelas com senderId ou receiverId correspondente ao ID do contato selecionado
        this.messages = data.msgs.map(message => ({
          id: message.id,
          text: message.text,
          timestamp: message.timestamp,
          sender: message.sender,
          mediaType: message.mediaType,
          mediaName: message.mediaName,
          mediaUrl: message.mediaUrl,
          received: message.receiverId,
          read: message.read
        }))

        this.userId = userId
        this.scrollToBottom()
      } catch (error) {
        console.error(error)
      }
    },
    async marcarMensagemComoLida(contactId, isGroup) {
      try {
        await marcarMensagemPrivadaComoLida(contactId, isGroup)
        if (isGroup) {
          const index = this.listaGrupos.findIndex(grupo => grupo.id == contactId)
          const grupo = { ...this.listaGrupos[index] }
          this.$store.commit('LIST_PRIVATE_NOTIFICATION', { action: 'remove', data: grupo.count })
          grupo.count = 0
          this.$store.commit('LIST_GROUPS_PRIVATE_CHAT', { action: 'update', data: grupo })
          this.contarMensagens()
        } else {
          const index = this.listaUsuarios.findIndex(user => user.id == contactId)
          const user = { ...this.listaUsuarios[index] }
          this.$store.commit('LIST_PRIVATE_NOTIFICATION', { action: 'remove', data: user.count })
          user.count = 0
          this.$store.commit('LIST_USERS_PRIVATE', { action: 'update', data: user })
          this.contarMensagens()
        }
      } catch (error) {
        console.error('Erro ao marcar mensagem como não lida:', error)
      }
    },
    async sendMessage() {
      if (this.newMenssage.trim() === '' && !this.cMostrarEnvioArquivo) {
        return;
      }
      try {
        const usuario = JSON.parse(localStorage.getItem('usuario'));
        let id = Date.now(); // Use a timestamp for unique ID

        const date = new Date();

        const messageData = {
          id: id,
          text: this.newMenssage,
          timestamp: date.getTime(),
          sender: usuario.userId,
          receiverId: this.selectedContact.id,
          tenantId: usuario.tenantId,
          mediaType: 'chat',
          read: false,
          arquivos: this.arquivos,
          isGroup: this.selectedContact.isGroup
        };

        let response;

        if (!this.cMostrarEnvioArquivo) {
          response = await enviarMensagemPrivada(messageData);
        } else {
          const formData = new FormData();
          this.arquivos.forEach(media => {
            formData.append('id', id);
            formData.append('medias', media);
            formData.append('text', media.name);
            formData.append('read', false);
            formData.append('isGroup', this.selectedContact.isGroup);
            formData.append('tenantId', usuario.tenantId);
            formData.append('receiverId', this.selectedContact.id);
            formData.append('sender', usuario.userId);
            formData.append('timestamp', date.getTime());
          });
          response = await enviarMensagemPrivada(formData);
        }

        delete messageData.receiverId;
        messageData.received = this.selectedContact.id;
        messageData.mediaType = response.data.mensagem.mediaType;
        messageData.mediaName = response.data.mensagem.mediaName;
        messageData.mediaUrl = response.data.mensagem.mediaUrl;
        messageData.sender = {
          id: usuario.userId,
          name: usuario.username
        };
        this.messages.push(messageData);

        this.$forceUpdate();
        this.scrollToBottom();

        // Atualiza a lista de usuários
        const index = this.listaUsuarios.findIndex(user => user.id == this.selectedContact.id);
        const user = { ...this.listaUsuarios[index] };
        user.senderId = usuario.userId;
        user.timestamp = response.data.mensagem.timestamp;
        user.text = this.newMenssage.trim() === '' ? response.data.mensagem.mediaName : this.newMenssage;
        user.read = false;
        this.$store.commit('LIST_USERS_PRIVATE', { action: 'update', data: user });

        this.newMenssage = '';
        this.arquivos = [];
      } catch (error) {
        console.error(error);
      }
      this.scrollToBottom();
    },
    async handlSendLinkVideo() {
      try {
        const link = `https://meet.jit.si/${uid()}/${uid()}`
        let mensagem = link
        const usuario = JSON.parse(localStorage.getItem('usuario'));
        let id = Date.now(); // Use a timestamp for unique ID

        const date = new Date();

        const messageData = {
          id: id,
          text: mensagem,
          timestamp: date.getTime(),
          sender: usuario.userId,
          receiverId: this.selectedContact.id,
          tenantId: usuario.tenantId,
          mediaType: 'chat',
          read: false,
          arquivos: this.arquivos,
          isGroup: this.selectedContact.isGroup
        };

        let response;
        response = await enviarMensagemPrivada(messageData);
        
        delete messageData.receiverId;
        messageData.received = this.selectedContact.id;
        messageData.mediaType = response.data.mensagem.mediaType;
        messageData.mediaName = response.data.mensagem.mediaName;
        messageData.mediaUrl = response.data.mensagem.mediaUrl;
        messageData.sender = {
          id: usuario.userId,
          name: usuario.username
        };
        this.messages.push(messageData);

        this.$forceUpdate();
        this.scrollToBottom();

        // Atualiza a lista de usuários
        const index = this.listaUsuarios.findIndex(user => user.id == this.selectedContact.id);
        const user = { ...this.listaUsuarios[index] };
        user.senderId = usuario.userId;
        user.timestamp = response.data.mensagem.timestamp;
        user.text = this.newMenssage.trim() === '' ? response.data.mensagem.mediaName : this.newMenssage;
        user.read = false;
        this.$store.commit('LIST_USERS_PRIVATE', { action: 'update', data: user });

        this.newMenssage = '';
        this.arquivos = [];
      } catch (error) {
        console.error(error);
      }
      this.scrollToBottom();
    },
    async listarUsuarios() {
      try {
        const { data } = await ListarUsuariosChatPrivado(this.params)
        this.$store.commit('LIST_USERS_PRIVATE', { action: 'create', data: data.users.filter(usuario => usuario.profile !== 'superadmin') })
      } catch (error) {
        console.error(error)
      }
    },
    async listarGrupos() {
      const usuario = JSON.parse(localStorage.getItem('usuario'))
      const { data } = await listarGruposPrivados(usuario.userId)
      this.$store.commit('LIST_GROUPS_PRIVATE_CHAT', { action: 'create', data: data })
    },
    buscarTicketFiltro() {
      this.searchedUsers = this.listaUsuarios.filter(u => u.name.toLowerCase().indexOf(this.searchParam.toLowerCase()) == 0)
      this.searchedGroup = this.listaGrupos.filter(g => g.name.toLowerCase().indexOf(this.searchParam.toLowerCase()) == 0)
    },
    dataInWords(timestamp) {
      if (timestamp) {
        return formatDistance(new Date(Number(timestamp)), new Date(), { locale: pt })
      } else {
        return null
      }
    },
    dataInWordsMessage(date) {
      return format(parseJSON(new Date(date)), 'HH:mm', { locale: pt })
    },
    onInsertSelectEmoji(emoji) {
      const self = this
      var tArea = this.$refs.inputEnvioMensagem.$refs.input
      // get cursor's position:
      var startPos = tArea.selectionStart,
        endPos = tArea.selectionEnd,
        cursorPos = startPos,
        tmpStr = tArea.value

      // filter:
      if (!emoji.data) {
        return
      }

      // insert:
      self.txtContent = this.newMenssage
      self.txtContent = tmpStr.substring(0, startPos) + emoji.data + tmpStr.substring(endPos, tmpStr.length)
      this.newMenssage = self.txtContent
      // move cursor:
      setTimeout(() => {
        tArea.selectionStart = tArea.selectionEnd = cursorPos + emoji.data.length
      }, 10)
    },
    Value(obj) {
      if (obj) {
        return obj
      } else {
        return ''
      }
    },
    scrollToBottom() {
      setTimeout(() => {
        this.$nextTick(() => {
          document.getElementById('inicioListaMensagensChat').scrollIntoView()
        })
      }, 200)
    },
    scrollArea(e) {
      this.hideOptions = true
      setTimeout(() => {
        if (!e) return
        this.scrollIcon = (e.verticalSize - (e.verticalPosition + e.verticalContainerSize)) > 2000 // e.verticalPercentage < 0.8
      }, 200)
    },
    isPDF(url) {
      if (!url) return false
      const split = url.split('.')
      const ext = split[split.length - 1]
      return ext === 'pdf'
    },
    formatarMensagem(body) {
      if (!body) return
      let format = body
      function is_aplhanumeric(c) {
        var x = c.charCodeAt()
        return !!(((x >= 65 && x <= 90) || (x >= 97 && x <= 122) || (x >= 48 && x <= 57)))
      }
      function whatsappStyles(format, wildcard, opTag, clTag) {
        var indices = []
        for (var i = 0; i < format.length; i++) {
          if (format[i] === wildcard) {
            // eslint-disable-next-line no-unused-expressions
            if (indices.length % 2) { (format[i - 1] == ' ') ? null : ((typeof (format[i + 1]) == 'undefined') ? indices.push(i) : (is_aplhanumeric(format[i + 1]) ? null : indices.push(i))) } else { (typeof (format[i + 1]) == 'undefined') ? null : ((format[i + 1] == ' ') ? null : (typeof (format[i - 1]) == 'undefined') ? indices.push(i) : ((is_aplhanumeric(format[i - 1])) ? null : indices.push(i))) }
          } else {
            // eslint-disable-next-line no-unused-expressions
            (format[i].charCodeAt() == 10 && indices.length % 2) ? indices.pop() : null
          }
        }
        // eslint-disable-next-line no-unused-expressions
        (indices.length % 2) ? indices.pop() : null
        var e = 0
        indices.forEach(function (v, i) {
          var t = (i % 2) ? clTag : opTag
          v += e
          format = format.substr(0, v) + t + format.substr(v + 1)
          e += (t.length - 1)
        })
        return format
      }
      format = whatsappStyles(format, '_', '<i>', '</i>')
      format = whatsappStyles(format, '*', '<b>', '</b>')
      format = whatsappStyles(format, '~', '<s>', '</s>')
      format = format.replace(/\n/gi, '<br>')
      return format
    },
    formatarData(data, formato = 'dd/MM/yyyy') {
      const dt = new Date(Number(data))
      return format(dt, formato, { locale: pt })
    }
  },
  async mounted() {
    if (!localStorage.getItem('reloaded')) {
      localStorage.setItem('reloaded', 'true');
      window.location.reload();
    } else {
      localStorage.removeItem('reloaded');
    }
    await this.contarMensagens();
    this.$store.commit('UPDATE_SHOW_MENU', this.showMenu)
    this.listarUsuarios()
    this.listarGrupos()
    this.loadColors()
  },
  created() {
    this.usuario = JSON.parse(localStorage.getItem('usuario'))
    setInterval(() => {
      this.recalcularHora++
    }, 20000)
  },
  components: {
    VEmojiPicker,
    VueEasyLightbox
  }
}
</script>

<style lang="sass">

.badge-left
  border-radius: 50%

.chatarea .q-scrollarea__container
  height: calc(100vh - 100px) !important

.WAL
  width: 100%
  height: 100%
  padding-bottom: 20px

  &:before
    content: ''
    height: 127px
    position: fixed
    top: 0
    width: 100%

  &__layout
    margin: 0 auto
    z-index: 4000
    height: 100vh
    width: 100%
    max-width: 100vw
    border-radius: 5px

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

.q-message-text
  min-width: 300px
  max-width: 300px

.tabChat
  margin-top: 0
  padding-top: 8px
  padding-right: 0
  padding-left: 0
  padding-bottom: 0

.hr-text
    line-height: 1em
    position: relative
    outline: 0
    border: 0
    color: black
    text-align: center
    height: 1.5em
    opacity: 0.8

    &:before
      content: ""
      background: linear-gradient(to right, transparent, #818078, transparent)
      position: absolute
      left: 0
      top: 50%
      width: 100%
      height: 1px

    &:after
      content: attr(data-content)
      position: relative
      display: inline-block
      color: black
      font-size: 16px
      font-weight: 600
      padding: 0 0.5em
      line-height: 1.5em
      background-color: $grey
      border-radius: 15px

</style>
