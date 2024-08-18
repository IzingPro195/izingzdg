<template>
  <div @drop.prevent="handleFileDrop" @dragover.prevent>
    <div class="drop-area" @drop="handleFileDrop" @dragover="handleDragOver" @dragleave="handleDragLeave">
      
      <div class="row q-col-gutter-md" v-if="isScheduleDate">
        <div class="col-xs-12 col-md-6">
          <q-select :options="schedule.options" v-model="schedule.selected" map-options outlined @input="onSelectSchedule" />
        </div>
        <div class="col-xs-12 col-md-6">
          <q-datetime-picker outlined stack-label label="Data/Hora Agendamento" mode="datetime" v-model="scheduleDate" format24h :readonly="schedule.selected.value !== 'custom'" />
        </div>
      </div>

      <div class="q-py-md row bg-white justify-start items-center text-grey-9 relative-position">
        <template v-if="!isRecordingAudio">
          <q-btn
            v-if="$q.screen.width > 500 && selectedWhatsapp && selectedWhatsapp.type === 'whatsapp'"
            flat
            dense
            @click="abrirEnvioArquivo"
            icon="mdi-paperclip"
            :disable="cDisableActions"
            class="bg-padrao btn-rounded q-mx-xs"
            :color="$q.dark.isActive ? 'white' : ''"
          >
            <q-tooltip content-class="text-bold"> Agendar arquivo </q-tooltip>
          </q-btn>
          
          <q-btn v-if="$q.screen.width > 500 && selectedWhatsapp && selectedWhatsapp.type === 'whatsapp'" flat dense icon="mdi-emoticon-happy-outline" :disable="cDisableActions" class="bg-padrao btn-rounded q-mx-xs" :color="$q.dark.isActive ? 'white' : ''">
            <q-tooltip content-class="text-bold"> Emoji </q-tooltip>
            <q-menu anchor="top right" self="bottom middle" :offset="[5, 40]">
              <VEmojiPicker style="width: 40vw" :showSearch="false" :emojisByRow="calculateEmojisByRow()" labelSearch="Localizar..." lang="pt-BR" @select="onInsertSelectEmoji" />
            </q-menu>
          </q-btn>
          <q-btn
            v-if="$q.screen.width > 500 && selectedWhatsapp && selectedWhatsapp.type === 'whatsapp'"
            flat
            dense
            @click="handlSendLinkVideo"
            icon="mdi-message-video"
            :disable="cDisableActions"
            class="bg-padrao btn-rounded q-mx-xs"
            :color="$q.dark.isActive ? 'white' : ''"
          >
            <q-tooltip content-class="text-bold"> Agendar link para videoconferencia </q-tooltip>
          </q-btn>
          <q-btn
            v-if="$q.screen.width > 500 && selectedWhatsapp && selectedWhatsapp.type === 'whatsapp'"
            flat
            dense
            @click="abrirEnvioSticker"
            icon="mdi-sticker-outline"
            :disable="cDisableActions"
            class="bg-padrao btn-rounded q-mx-xs"
            :color="$q.dark.isActive ? 'white' : ''"
          >
            <q-tooltip content-class="text-bold"> Agendar Figurinha </q-tooltip>
          </q-btn>
          <q-btn
            v-if="selectedWhatsapp && selectedWhatsapp.type === 'waba'"
            flat
            dense
            icon="mdi-message-cog-outline"
            class="bg-padrao btn-rounded q-mx-xs"
            :color="$q.dark.isActive ? 'white' : ''"
            @click="buscarTemplateWaba()"
          >
            <q-tooltip content-class="text-bold"> Templates </q-tooltip>
          </q-btn>
          <q-toggle keep-color v-model="sign" dense @input="handleSign" class="q-mx-sm q-ml-md" :color="sign ? 'positive' : 'black'" type="toggle" v-if="userProfile === 'admin'">
            <q-tooltip> {{ sign ? 'Desativar' : 'Ativar' }} Assinatura </q-tooltip>
          </q-toggle>
          <q-toggle keep-color v-model="sign" dense @input="handleSign" class="q-mx-sm q-ml-md" :color="sign ? 'positive' : 'black'" type="toggle" v-if="assinaturaAtiva === 'disabled' && userProfile !== 'admin'">
            <q-tooltip> {{ sign ? 'Desativar' : 'Ativar' }} Assinatura </q-tooltip>
          </q-toggle>
          <q-input
            hide-bottom-space
            :loading="loading"
            :disable="cDisableActions"
            ref="inputEnvioMensagem"
            id="inputEnvioMensagem"
            type="textarea"
            @keydown.exact.enter.prevent="() => (textChat.trim().length ? enviarMensagem() : '')"
            v-show="!cMostrarEnvioArquivo"
            class="col-grow q-mx-xs text-grey-10 inputEnvioMensagem"
            bg-color="grey-2"
            color="grey-7"
            placeholder="Digita sua mensagem"
            input-style="max-height: 30vh"
            autogrow
            rounded
            dense
            outlined
            v-model="textChat"
            :value="textChat"
            @paste="handleInputPaste"
          >
            <template v-slot:prepend v-if="$q.screen.width < 500 && selectedWhatsapp && selectedWhatsapp.type === 'whatsapp'">
              <q-btn flat icon="mdi-emoticon-happy-outline" :disable="cDisableActions" dense round :color="$q.dark.isActive ? 'white' : ''">
                <q-tooltip content-class="text-bold"> Emoji </q-tooltip>
                <q-menu anchor="top right" self="bottom middle" :offset="[5, 40]">
                  <VEmojiPicker style="width: 40vw" :showSearch="false" :emojisByRow="calculateEmojisByRow()" labelSearch="Localizar..." lang="pt-BR" @select="onInsertSelectEmoji" />
                </q-menu>
              </q-btn>
            </template>
            <template v-slot:append>
              <q-btn
                flat
                @click="abrirEnvioArquivo"
                icon="mdi-paperclip"
                :disable="cDisableActions"
                dense
                round
                v-if="$q.screen.width < 500 && selectedWhatsapp && selectedWhatsapp.type === 'whatsapp'"
                class="bg-padrao btn-rounded"
                :color="$q.dark.isActive ? 'white' : ''"
              >
                <q-tooltip content-class=" text-bold"> Agendar arquivo </q-tooltip>
              </q-btn>
              <q-btn
              flat
                v-if="$q.screen.width < 500 && selectedWhatsapp && selectedWhatsapp.type === 'whatsapp'"
                @click="abrirEnvioSticker"
                icon="mdi-sticker-outline"
                :disable="cDisableActions"
                dense
                round
                class="bg-padrao btn-rounded"
                :color="$q.dark.isActive ? 'white' : ''"
              >
                <q-tooltip content-class="text-bold"> Agendar Figurinha </q-tooltip>
              </q-btn>
            </template>
          </q-input>
          <q-file
            :loading="loading"
            :disable="cDisableActions"
            ref="PickerFileMessage"
            id="PickerFileMessage"
            v-show="cMostrarEnvioArquivo"
            v-model="arquivos"
            class="col-grow q-mx-xs PickerFileMessage"
            bg-color="blue-grey-1"
            input-style="max-height: 30vh"
            outlined
            use-chips
            multiple
            autogrow
            dense
            rounded
            append
            :max-files="5"
            :max-file-size="52428800"
            :max-total-size="52428800"
            :accept="accept"
            @rejected="onRejectedFiles"
          />
          <q-btn
            v-if="textChat || cMostrarEnvioArquivo"
            ref="btnEnviarMensagem"
            @click="enviarMensagem"  
            flat
            icon="mdi-send"
            class="bg-padrao btn-rounded q-mx-xs"
            :color="$q.dark.isActive ? 'white' : ''"
          >
            <q-tooltip content-class=" text-bold"> Agendar Mensagem </q-tooltip>
          </q-btn>
          <!-- <q-btn
            v-if="!textChat && !cMostrarEnvioArquivo && !isRecordingAudio"
            @click="handleSartRecordingAudio"
            :disabled="cDisableActions"
            flat
            icon="mdi-microphone"
            class="bg-padrao btn-rounded q-mx-xs"
            :color="$q.dark.isActive ? 'white' : ''"
          >
            <q-tooltip content-class="text-bold"> Agendar Áudio </q-tooltip>
          </q-btn> -->
        </template>
        <template v-else>
          <div class="full-width items-center row justify-end">
            <q-skeleton animation="pulse-y" class="col-grow q-mx-md" type="text" />
            <div style="width: 200px" class="flex flex-center items-center" v-if="isRecordingAudio && selectedWhatsapp && selectedWhatsapp.type !== 'waba'">
              <q-btn flat icon="mdi-close" color="negative" @click="handleCancelRecordingAudio" class="bg-padrao btn-rounded q-mx-xs" />
              <RecordingTimer class="text-bold" :class="{ 'text-white': $q.dark.isActive }" />
              <q-btn flat icon="mdi-send-circle-outline" color="positive" @click="handleStopRecordingAudio" class="bg-padrao btn-rounded q-mx-xs" />
            </div>
            <div style="width: 200px" class="flex flex-center items-center" v-if="isRecordingAudio && selectedWhatsapp && selectedWhatsapp.type === 'waba'">
              <q-btn flat icon="mdi-close" color="negative" @click="handleCancelRecordingAudio" class="bg-padrao btn-rounded q-mx-xs" />
              <RecordingTimer class="text-bold" :class="{ 'text-white': $q.dark.isActive }" />
              <q-btn flat icon="mdi-send-circle-outline" color="positive" @click="handleStopRecordingAudioWaba" class="bg-padrao btn-rounded q-mx-xs" />
            </div>
          </div>
        </template>
      </div>

      <q-dialog v-model="abrirModalPreviewImagem" position="right" @hide="hideModalPreviewImagem" @show="showModalPreviewImagem">
        <q-card style="height: 90vh; min-width: 60vw; max-width: 60vw" class="q-pa-md">
          <q-card-section>
            <div class="text-h6">
              {{ urlMediaPreview.title }}
              <q-btn class="float-right" icon="close" color="negative" round outline @click="hideModalPreviewImagem" />
            </div>
          </q-card-section>
          <q-card-section>
            <q-img :src="urlMediaPreview.src" spinner-color="white" class="img-responsive mdi-image-auto-adjust q-uploader__file--img" style="height: 60vh; min-width: 55vw; max-width: 55vw" />
          </q-card-section>
          <q-card-actions align="center">
            <q-btn ref="qbtnPasteEnvioMensagem" label="Agendar" color="primary" v-close-popup @click="enviarMensagem" @keypress.enter.exact="enviarMensagem()" />
          </q-card-actions>
          <span class="row col text-caption text-blue-grey-10">* Confirmar envio: Enter</span>
          <span class="row col text-caption text-blue-grey-10">** Cancelar: ESC</span>
        </q-card>
      </q-dialog>

      <q-dialog v-model="modalVisivelTemplate" position="standard" @hide="fecharModalTemplate">
        <q-card style="min-width: 500px">
          <q-card-section class="q-pa-md">
            <div class="q-gutter-sm row items-center">
              <div class="col-12">
                <q-select
                  v-model="selectedTemplate"
                  :options="templates.map(template => ({ label: `${template.name} (ID: ${template.id}, Lang: ${template.language})`, value: template }))"
                  label="Escolha um Template"
                  filled
                  outlined
                  dense
                  bg-color="grey-2"
                  color="grey-7"
                  style="margin: 10px;"
                />
              </div>
            </div>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn
              label="Agendar"
              color="primary"
              :disabled="!selectedTemplate"
              @click="enviarTemplateSelecionado"
            />
            <q-btn
              label="Cancelar"
              color="negative"
              @click="fecharModalTemplate"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>

<script>
import { LocalStorage, uid } from 'quasar'
import mixinCommon from './mixinCommon'
import { EnviarMensagemAgendada, EditarMensagemText } from 'src/service/tickets'
import { VEmojiPicker } from 'v-emoji-picker'
import { mapGetters } from 'vuex'
import RecordingTimer from './RecordingTimer'
import MicRecorder from 'mic-recorder-to-mp3'
const Mp3Recorder = new MicRecorder({ bitRate: 128 })
import { add, format } from 'date-fns'
import { defineComponent } from 'vue'
import { ListarConfiguracoes } from 'src/service/configuracoes'
import { EnviarTextoWaba, EnviarArquivoWaba, BuscarTemplates, EnviarTemplateWabaAgendado } from 'src/service/waba'

export default defineComponent({
  name: 'InputMensagem',
  mixins: [mixinCommon],
  props: {
    selectedTicket: {
      type: Object,
      default: null,
    },
    isScheduleDate: {
      type: Boolean,
      default: false,
    },
    mensagens: {
      type: Array,
      default: () => [],
    },
    editMessage: {
      type: Object,
      default: null,
    },
    selectedWhatsapp: {
      type: Object,
      required: true,
    },
    selectedContact: {
      type: Object,
      required: true,
    },
  },
  components: {
    VEmojiPicker,
    RecordingTimer,
  },
  data() {
    return {
      schedule: {
        selected: { label: 'Agendamento customizado', value: 'custom', func: null },
        options: [
          { label: 'Agendamento customizado', value: 'custom', func: null },
          { label: 'Em 30 minutos', value: '30_mins', func: () => add(new Date(), { minutes: 30 }) },
          { label: 'Amanhã', value: 'amanha', func: () => add(new Date(), { days: 1 }) },
          { label: 'Próxima semana', value: 'prox_semana', func: () => add(new Date(), { weeks: 1 }) },
        ],
      },
      gptEnabled: false,
      loading: false,
      accept: '.txt, .xml, .jpg, .png, .pdf, .doc, .docx, .mp4, .xls, .xlsx, .jpeg, .zip, .ppt, .ogg, .mp3, .pptx, image/*',
      abrirFilePicker: false,
      abrirModalPreviewImagem: false,
      isRecordingAudio: false,
      urlMediaPreview: {
        title: '',
        src: '',
      },
      arquivos: [],
      textChat: '',
      sign: true,
      scheduleDate: null,
      modalVisivel: false,
      modalVisivelUsuario: false,
      modalVisivelBotao: false,
      modalVisivelLista: false,
      mensagemMarcacaoFantasma: '',
      mensagemMarcacaoUsuario: '',
      mensagemBotao: '',
      mensagemLista: '',
      botao1: '',
      botao2: '',
      botao3: '',
      header: '',
      footer: '',
      sectionTitle: '',
      rowTitle1: '',
      rowDescription1: '',
      rowTitle2: '',
      rowDescription2: '',
      rowTitle3: '',
      rowDescription3: '',
      rowTitle4: '',
      rowDescription4: '',
      rowTitle5: '',
      rowDescription5: '',
      button_text: '',
      participantes: '',
      participantsInput: '',
      selectedParticipants: [],
      participantsList: [],
      assinaturaAtiva: null,
      userProfile: 'user',
      modalVisivelTemplate: false,
      templates: [],
      selectedTemplate: null,
      sticker: false
    }
  },
  computed: {
    ...mapGetters(['ticketFocado']),
    cMostrarEnvioArquivo() {
      return this.arquivos.length > 0
    },
    cDisableActions() {
      return this.isRecordingAudio
    },
  },
  methods: {
    handleFileDrop(event) {
      const files = event.dataTransfer.files;
      if (files.length) {
        this.textChat = '';
        this.arquivos = [files[0]];
        this.abrirModalPreviewImagem = true;
        this.urlMediaPreview = {
          title: `Agendar imagem para ${this.selectedContact?.name}`,
          src: this.openFilePreviewDD(files[0]),
        };
        this.$refs.inputEnvioMensagem.focus();
      }
    },
    handleDragOver(event) {
      event.preventDefault();
      event.currentTarget.classList.add('dragover');
    },
    handleDragLeave(event) {
      event.currentTarget.classList.remove('dragover');
    },
    openFilePreviewDD(file) {
      const urlImg = window.URL.createObjectURL(file);
      return urlImg;
    },
    abrirModalTemplate() {
      this.modalVisivelTemplate = true;
    },
    fecharModalTemplate() {
      this.modalVisivelTemplate = false;
      this.selectedTemplate = null;
    },
    async enviarTemplateSelecionado() {
      if (this.selectedTemplate) {
        const message = {
          contactId: this.selectedContact.id,
          channel: this.selectedWhatsapp.type,
          channelId: this.selectedWhatsapp.value,
          read: 1,
          fromMe: true,
          mediaUrl: '',
          body: JSON.stringify(this.selectedTemplate.value.components),
          scheduleDate: this.isScheduleDate ? this.scheduleDate : null,
          quotedMsg: null,     
          from: this.selectedContact.number,
          tokenApi: this.selectedWhatsapp.tokenAPI,
          idFront: uid(),
          mediaType: 'templates',
          sendType: 'templates',
          language: this.selectedTemplate.value.language,
          templateName: this.selectedTemplate.value.name
        }
        await EnviarTemplateWabaAgendado(message)
        console.log('Enviando template:', this.selectedTemplate);
        this.fecharModalTemplate();
        window.location.reload();
      }
    },
    async buscarTemplateWaba(){
      const tokenApi = this.selectedWhatsapp.tokenAPI
      const response = await BuscarTemplates(tokenApi)
      const templatesFiltrados = response.data.data.filter(template => {
        const headerTextComponents = template.components.some(component => component.type === 'HEADER' && component.format === 'TEXT');
        return headerTextComponents;
      });
      this.templates = templatesFiltrados;
      this.abrirModalTemplate()
    },
    formatLabel(participant) {
      return `${participant.name} - ${participant.userId}`;
    },
    handleSelectAllOption(value) {
      if (value.includes('todos')) {
        this.selectedParticipants = this.participantsList.map(item => item.userId);
      }
    },
    async listarConfiguracoes() {
      const { data } = await ListarConfiguracoes()
      localStorage.setItem('configuracoes', JSON.stringify(data))
      const signedConfig = data.find(config => config.key === 'signed')
      this.assinaturaAtiva = signedConfig.value
    },
    fecharModal() {
      this.modalVisivel = false;
    },
    fecharModalUsuario() {
      this.modalVisivelUsuario = false;
    },
    fecharModalBotao(){
      this.textChat = ''
      this.mensagemBotao = ''
      this.botao1 = ''
      this.botao2 = ''
      this.botao3 = ''
      this.isRecordingAudio = false
      this.loading = false
      this.modalVisivelBotao = false;
    },
    fecharModalLista(){
      this.mensagemLista = ''
      this.header = ''
      this.footer = ''
      this.sectionTitle = ''
      this.rowTitle1 = ''
      this.rowDescription1 = ''
      this.rowTitle2 = ''
      this.rowDescription2 = ''
      this.rowTitle3 = ''
      this.rowDescription3 = ''
      this.rowTitle4 = ''
      this.rowDescription4 = ''
      this.rowTitle5 = ''
      this.rowDescription5 = ''
      this.button_text = ''
      this.textChat = ''
      this.modalVisivelLista = false;
    },
    mostrarModal() {
      this.modalVisivel = true;
    },
    mostrarModalUsuario() {
      this.modalVisivelUsuario = true;
    },
    mostrarModalBotao() {
      this.modalVisivelBotao = true;
    },
    mostrarModalLista() {
      this.modalVisivelLista = true;
    },
    setScheduleDate(date) {
      this.scheduleDate = date
    },
    setMensagem(str) {
      this.textChat = str
    },
    onSelectSchedule(newValue) {
      if (!newValue.func) {
        this.scheduleDate = null
        return
      }
      const date = newValue.func()
      this.scheduleDate = format(date, 'yyyy-MM-dd HH:mm')
    },
    openFilePreview(event) {
      const data = event.clipboardData.files[0]
      const urlImg = window.URL.createObjectURL(data)
      return urlImg
    },
    handleInputDrop(evt) {
      const allowed = this.accept.split(',').map((a) => a.trim())
      this.textChat = ''
      this.arquivos = [
        ...this.arquivos,
        ...[...evt.dataTransfer.files].filter((file) => {
          const ext = file.name.split('.').pop()
          const extensionPattern = allowed.map((ext) => ext.replace(/\./g, '\\.').replace(/\*/g, '.*')).join('|')
          const regex = new RegExp(`^(${extensionPattern})$`, 'i')
          return regex.test(file.type) || regex.test('.' + ext)
        }),
      ]

      if (!this.arquivos.length) {
        this.$q.notify({
          message: 'Arquivo inválido!',
          caption: `Formatos aceitos: ${allowed.join(', ')}`,
          type: 'negative',
        })
        return
      }

      this.$refs.inputEnvioMensagem.focus()
    },
    handleInputPaste(e) {
      if (!this.selectedWhatsapp?.id) return
      if (e.clipboardData.files[0]) {
        this.textChat = ''
        this.arquivos = [e.clipboardData.files[0]]
        this.abrirModalPreviewImagem = true
        this.urlMediaPreview = {
          title: `Agendar imagem para ${this.selectedContact?.name}`,
          src: this.openFilePreview(e),
        }
        this.$refs.inputEnvioMensagem.focus()
      }
    },
    onInsertSelectEmoji(emoji) {
      const self = this
      var tArea = this.$refs.inputEnvioMensagem.$refs.input
      var startPos = tArea.selectionStart,
        endPos = tArea.selectionEnd,
        cursorPos = startPos,
        tmpStr = tArea.value

      if (!emoji.data) {
        return
      }

      self.txtContent = this.textChat
      self.txtContent = tmpStr.substring(0, startPos) + emoji.data + tmpStr.substring(endPos, tmpStr.length)
      this.textChat = self.txtContent

      setTimeout(() => {
        tArea.selectionStart = tArea.selectionEnd = cursorPos + emoji.data.length
      }, 10)
    },
    abrirEnvioArquivo(event) {
      this.textChat = ''
      this.sticker = false;
      this.abrirFilePicker = true
      this.$refs.PickerFileMessage.pickFiles(event)
    },
    abrirEnvioSticker(event) {
      this.textChat = ''
      this.abrirFilePicker = true
      this.sticker = true
      this.$refs.PickerFileMessage.pickFiles(event)
    },
    async handleSartRecordingAudio() {
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true })
        await Mp3Recorder.start()
        this.isRecordingAudio = true
      } catch (error) {
        this.isRecordingAudio = false
      }
    },
    async handleStopRecordingAudio() {
      this.loading = true
      try {
        const [, blob] = await Mp3Recorder.stop().getMp3()
        if (blob.size < 10000) {
          this.loading = false
          this.isRecordingAudio = false
          return
        }

        const formData = new FormData()
        const filename = `${new Date().getTime()}.mp3`
        formData.append('medias', blob, filename)
        formData.append('body', filename)
        formData.append('fromMe', true)
        if (this.isScheduleDate) {
          formData.append('scheduleDate', this.scheduleDate)
        }
        await EnviarMensagemAgendada(formData)
        this.arquivos = []
        this.textChat = ''
        this.$emit('update:replyingMessage', null)
        this.abrirFilePicker = false
        this.abrirModalPreviewImagem = false
        this.isRecordingAudio = false
        this.loading = false
        setTimeout(() => {
          this.scrollToBottom()
        }, 300)
      } catch (error) {
        this.isRecordingAudio = false
        this.loading = false
        this.$notificarErro('Ocorreu um erro!', error)
      }
    },
    async handleStopRecordingAudioWaba() {
      this.loading = true
      try {
        const [, blob] = await Mp3Recorder.stop().getMp3()
        if (blob.size < 10000) {
          this.loading = false
          this.isRecordingAudio = false
          return
        }

        const formData = new FormData()
        const filename = `${new Date().getTime()}.mp3`

        formData.append('fromMe', true)
        formData.append('medias', blob, filename)
        formData.append('body', filename)
        formData.append('idFront', uid())
        formData.append('tokenApi', this.selectedWhatsapp.tokenAPI)
        formData.append('from', this.selectedContact.number)
        formData.append('ticketId', this.selectedTicket.id)
        if (this.isScheduleDate) {
          formData.append('scheduleDate', this.scheduleDate)
        }

        await EnviarArquivoWaba(formData)
        this.arquivos = []
        this.textChat = ''
        this.$emit('update:replyingMessage', null)
        this.abrirFilePicker = false
        this.abrirModalPreviewImagem = false
        this.isRecordingAudio = false
        this.loading = false
        setTimeout(() => {
          this.scrollToBottom()
        }, 300)
      } catch (error) {
        this.isRecordingAudio = false
        this.loading = false
        this.$notificarErro('Ocorreu um erro!', error)
      }
    },
    async handleCancelRecordingAudio() {
      try {
        await Mp3Recorder.stop().getMp3()
        this.isRecordingAudio = false
        this.loading = false
      } catch (error) {
        this.$notificarErro('Ocorreu um erro!', error)
      }
    },
    prepararUploadMedia() {
      if (!this.arquivos.length) {
        throw new Error('Não existem arquivos para envio')
      }
      const formDatas = this.arquivos.map(media => {
        const formData = new FormData()
        formData.append('channelId', this.selectedWhatsapp.value)
        formData.append('channel', this.selectedWhatsapp.type)
        formData.append('contactId', this.selectedContact.id)
        formData.append('fromMe', true)
        formData.append('medias', media)
        formData.append('body', media.name)
        formData.append('idFront', uid())
        formData.append('isSticker', this.sticker)
        if (this.isScheduleDate) {
          formData.append('scheduleDate', this.scheduleDate)
        }
        return formData
      })
      return formDatas
    },
    prepararUploadMediaWABA() {
      if (!this.arquivos.length) {
        throw new Error('Não existem arquivos para envio')
      }
      const formDatas = this.arquivos.map(media => {
        const formData = new FormData()
        formData.append('fromMe', true)
        formData.append('medias', media)
        formData.append('body', media.name)
        formData.append('idFront', uid())
        formData.append('tokenApi', this.selectedWhatsapp.tokenAPI)
        formData.append('from', this.selectedContact.number)
        formData.append('ticketId', this.selectedTicket.id)
        if (this.isScheduleDate) {
          formData.append('scheduleDate', this.scheduleDate)
        }
        return formDatas
      })
      return formDatas
    },
    prepararMensagemTexto() {
      if (this.textChat.trim() === '') {
        throw new Error('Mensagem Inexistente')
      }
      let mensagem = this.textChat.trim()
      const username = localStorage.getItem('username')
      if (username && this.sign) {
        mensagem = `*${username}*:\n ${mensagem}`
      }

      const message = {
        contactId: this.selectedContact.id,
        channel: this.selectedWhatsapp.type,
        channelId: this.selectedWhatsapp.value,
        read: 1,
        fromMe: true,
        mediaUrl: '',
        body: mensagem,
        scheduleDate: this.isScheduleDate ? this.scheduleDate : null,
        quotedMsg: null,
        idFront: uid(),
      }
      if (this.isScheduleDate) {
        message.scheduleDate = this.scheduleDate
      }
      return message
    },
    prepararMensagemTextoWABA() {
      if (this.textChat.trim() === '') {
        throw new Error('Mensagem Inexistente')
      }
      let mensagem = this.textChat.trim()
      const username = localStorage.getItem('username')
      if (username && this.sign) {
        mensagem = `*${username}*:\n ${mensagem}`
      }

      const message = {
        read: 1,
        fromMe: true,
        mediaUrl: '',
        body: mensagem,
        scheduleDate: this.isScheduleDate ? this.scheduleDate : null,
        quotedMsg: null,     
        from: this.selectedContact.number,
        tokenApi: this.selectedWhatsapp.tokenAPI,
        ticketId: this.selectedTicket.id,
        idFront: uid(),
      }
      if (this.isScheduleDate) {
        message.scheduleDate = this.scheduleDate
      }
      return message
    },
    async enviarMensagem() {
      if(this.selectedWhatsapp.type === 'waba'){
        this.loading = true
        try{
          if(this.cMostrarEnvioArquivo){
            const formDatas = this.prepararUploadMediaWABA()
            for (const formData of formDatas) {
              await EnviarArquivoWaba(formData)
            }
          }
          else {
            const data = this.prepararMensagemTextoWABA()
            await EnviarTextoWaba(data)
          }
          this.arquivos = []
          this.textChat = ''
          this.$emit('update:replyingMessage', null)
          this.abrirFilePicker = false
          this.abrirModalPreviewImagem = false
          setTimeout(() => {
            this.scrollToBottom()
          }, 300)
        } catch (error) {
          this.$notificarErro('Ocorreu um erro!', error)
        } finally {
          this.isRecordingAudio = false
          this.loading = false
          setTimeout(() => {
            this.$refs.inputEnvioMensagem?.focus()
          }, 300)
          return;
        }
      }
      if (this.isScheduleDate && !this.scheduleDate) {
        this.$notificarErro('Para agendar uma mensagem, informe o campo Data/Hora Agendamento.')
        return
      }
      this.loading = true
      try {
        if (!this.cMostrarEnvioArquivo) {
          if (!this.textChat) return
          const message = this.prepararMensagemTexto()
          if (this.editMessage) {
            const { data } = await EditarMensagemText(this.editMessage.id, message)
            this.$emit('onEditMessage', data)
          } else {
            console.log(message)
            await EnviarMensagemAgendada(message)
          }
        } else {
          const formDatas = this.prepararUploadMedia()
          for (const formData of formDatas) {
            await EnviarMensagemAgendada(formData)
          }
        }
        this.arquivos = []
        this.textChat = ''
        this.$emit('update:replyingMessage', null)
        this.abrirFilePicker = false
        this.abrirModalPreviewImagem = false
        setTimeout(() => {
          this.scrollToBottom()
        }, 300)
      } catch (error) {
        this.$notificarErro('Ocorreu um erro!', error)
      } finally {
        this.isRecordingAudio = false
        this.loading = false
        setTimeout(() => {
          this.$refs.inputEnvioMensagem?.focus()
        }, 300)
        window.location.reload();
      }
    },
    async handlSendLinkVideo() {
      const link = `https://meet.jit.si/${uid()}/${uid()}`
      let mensagem = link
      const username = localStorage.getItem('username')
      if (username && this.sign) {
        mensagem = `*${username}*:\n ${mensagem}`
      }
      const message = {
        read: 1,
        fromMe: true,
        mediaUrl: '',
        body: mensagem,
        scheduleDate: this.isScheduleDate ? this.scheduleDate : null,
        quotedMsg: null,
        idFront: uid(),
      }

      this.loading = true
      try {
        await EnviarMensagemAgendada(message)
        setTimeout(() => {
          this.scrollToBottom()
        }, 200)
        setTimeout(() => {
          window.open(link, '_blank')
        }, 800)
      } catch (error) {
        this.loading = false
        this.$notificarErro('Ocorreu um erro!', error)
      }
      this.loading = false
      window.location.reload();
    },
    handlerInputMensagem(v) {
      this.textChat = v.target.value
    },
    showModalPreviewImagem() {
      this.$nextTick(() => {
        setTimeout(() => {
          this.$refs.qbtnPasteEnvioMensagem.$el.focus()
        }, 20)
      })
    },
    hideModalPreviewImagem() {
      this.arquivos = []
      this.urlMediaPreview = {}
      this.abrirModalPreviewImagem = false
    },
    onRejectedFiles(rejectedEntries) {
      this.$q.notify({
        html: true,
        message: `Ops... Ocorreu um erro! <br>
        <ul>
          <li>Verifique o tamanho do arquivo.</li>
          <li>Em caso de múltiplos arquivos, o tamanho total (soma de todos) deve ser de até 50MB.</li>
        </ul>`,
        type: 'negative',
        progress: true,
        position: 'top',
        actions: [
          {
            icon: 'close',
            round: true,
            color: 'white',
          },
        ],
      })
    },
    handleSign(state) {
      this.sign = state
      LocalStorage.set('sign', this.sign)
    },
    onResize() {
      this.$forceUpdate();
    },
    calculateEmojisByRow() {
      const screenWidth = window.innerWidth;
      if (screenWidth < 600) {
        return 5;
      } else if (screenWidth >= 600 && screenWidth < 1200) {
        return 10;
      } else {
        return 20;
      }
    },
  },
  beforeMount() {
    this.listarConfiguracoes()
  },
  mounted() {
    window.addEventListener('resize', this.onResize);
    this.$root.$on('mensagem-chat:focar-input-mensagem', () => this.$refs.inputEnvioMensagem.focus())
    const self = this
    window.addEventListener('paste', self.handleInputPaste)
    if (![null, undefined].includes(LocalStorage.getItem('sign'))) {
      this.handleSign(LocalStorage.getItem('sign'))
    }
    this.userProfile = localStorage.getItem('profile')
  },
  beforeDestroy() {
    const self = this
    window.removeEventListener('paste', self.handleInputPaste)
    window.removeEventListener('resize', this.onResize);
  },
  destroyed() {
    this.$root.$off('mensagem-chat:focar-input-mensagem')
  },
})
</script>

<style lang="sass" scoped>
@media (max-width: 850px)
  .inputEnvioMensagem,
  .PickerFileMessage
    width: 150px

@media (min-width: 851px), (max-width: 1360px)
  .inputEnvioMensagem,
  .PickerFileMessage
    width: 200px !important

.emoji-picker
  width: 100%
    
@media (min-width: 600px)
  .emoji-picker
    width: 50vw

</style>
