<template>
  <div v-if="userProfile === 'admin' || userProfile === 'super' ">
    <q-card
      class="q-ma-sm "
      square
    >
      <div class="text-h5 q-pa-sm q-ma-sm">
        Horário de Atendimento
        <q-icon name="help">
          <q-tooltip content-class="bg-light-blue-1 text-black q-pa-sm shadow-4">
            <span class="text-weight-medium"> Tipos de horário: </span>
            <span class="row col">
              Aberto: Estabelecimento aberto durante todo o dia. Não será feito envio de mensagem de ausência;
            </span>
            <span class="row col">
              Fechado: Estabelecimento fechado durante todo o dia. Será feito envio de mensagem de ausência, independente do horário;
            </span>
            <span class="row col">
              Horário: Representa o horário de funcionamento do estabelecimento. O sistema enviará mensagem de ausênica quando mensagens forem recebidas fora dos horários estabelecidos.
            </span>
            <span class="row col">
              **Importante: A mensagem de ausência será enviada após o encerramento do atendimento automático.
            </span>
          </q-tooltip>
        </q-icon>

        <q-btn
          color="primary"
          label="Salvar"
          class="float-right"
          @click="salvarHorariosAtendimento"
        />
      </div>
      <q-separator />
      <q-card-section>
        <div class="row q-col-gutter-sm">
          <div
            class="col-xs-12 col-sm-4 q-mt-sm"
            v-for="dia in businessHours"
            :key="dia.value"
          >
            <q-card
              square
              bordered
              flat
            >
              <div class="text-body1 text-bold bg-grey-3 q-pa-xs q-pl-sm">
                {{ dia.label }}
              </div>
              <q-separator />
              <q-card-section class="q-pt-none">
                <q-option-group
                  inline
                  class="row justify-between q-mb-md"
                  v-model="dia.type"
                  :options="optType"
                  color="primary"
                />

                <div class="row items-baseline q-gutter-sm">
                  <q-input
                    :disable="dia.type !== 'H'"
                    dense
                    outlined
                    class="col-grow"
                    error-message="Obrigatório"
                    hide-underline
                    type="time"
                    v-model="dia.hr1"
                  />
                  <h6>às</h6>
                  <q-input
                    :disable="dia.type !== 'H'"
                    dense
                    outlined
                    class="col-grow"
                    error-message="Obrigatório"
                    hide-underline
                    type="time"
                    v-model="dia.hr2"
                  />
                </div>
                <div class="row items-baseline q-gutter-sm">
                  <q-input
                    :disable="dia.type !== 'H'"
                    dense
                    outlined
                    class="col-grow"
                    error-message="Obrigatório"
                    hide-underline
                    type="time"
                    v-model="dia.hr3"
                  />
                  <h6>às</h6>
                  <q-input
                    :disable="dia.type !== 'H'"
                    dense
                    outlined
                    class="col-grow"
                    error-message="Obrigatório"
                    hide-underline
                    type="time"
                    v-model="dia.hr4"
                  />
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-card-section>
    </q-card>
    <q-card
      square
      bordered
      class="q-ma-sm full-full-height"
    >
      <div class="text-h6 q-pa-sm q-ma-sm">
        Mensagem de Ausência
        <q-btn
          color="positive"
          label="Salvar"
          class="float-right"
          @click="salvarMensagemAusencia"
        />
      </div>
      <q-card-section class="q-pt-none">
        <div class="row items-center">
          <div class="col-xs-3 col-sm-2 col-md-1">
            <q-btn
              round
              flat
              class="q-ml-sm"
            >
              <q-icon
                size="2em"
                name="mdi-emoticon-happy-outline"
              />
              <q-tooltip>
                Emoji
              </q-tooltip>
              <q-menu
                anchor="top right"
                self="bottom middle"
                :offset="[5, 40]"
              >
                <VEmojiPicker
                  style="width: 40vw"
                  :showSearch="false"
                  :emojisByRow="20"
                  labelSearch="Localizar..."
                  lang="pt-BR"
                  @select="onInsertSelectEmoji"
                />
              </q-menu>
            </q-btn>
          </div>
          <div class="col-xs-8 col-sm-10 col-md-11 q-pl-sm">
            <textarea
              ref="inputEnvioMensagem"
              style="min-height: 9vh; max-height: 9vh;"
              class="q-pa-sm bg-white full-width"
              placeholder="Digite a mensagem"
              autogrow
              dense
              outlined
              @input="(v) => messageBusinessHours = v.target.value"
              :value="messageBusinessHours"
            />
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { VEmojiPicker } from 'v-emoji-picker'
import { MostrarCores } from 'src/service/empresas';
import { MostrarHorariosAtendiemento, AtualizarHorariosAtendiemento, AtualizarMensagemHorariosAtendiemento } from 'src/service/empresas'
export default {
  name: 'HorarioAtendimento',
  components: { VEmojiPicker },
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
      userProfile: 'user',
      optType: [
        { value: 'O', label: 'Aberto' },
        { value: 'C', label: 'Fechado' },
        { value: 'H', label: 'Horário' }
      ],
      businessHours: [
        { day: 0, label: 'Domingo', type: 'O', hr1: '08:00', hr2: '12:00', hr3: '14:00', hr4: '18:00' },
        { day: 1, label: 'Segunda-Feira', type: 'O', hr1: '08:00', hr2: '12:00', hr3: '14:00', hr4: '18:00' },
        { day: 2, label: 'Terça-Feira', type: 'O', hr1: '08:00', hr2: '12:00', hr3: '14:00', hr4: '18:00' },
        { day: 3, label: 'Quarta-Feira', type: 'O', hr1: '08:00', hr2: '12:00', hr3: '14:00', hr4: '18:00' },
        { day: 4, label: 'Quinta-Feira', type: 'O', hr1: '08:00', hr2: '12:00', hr3: '14:00', hr4: '18:00' },
        { day: 5, label: 'Sexta-Feira', type: 'O', hr1: '08:00', hr2: '12:00', hr3: '14:00', hr4: '18:00' },
        { day: 6, label: 'Sábado', type: 'O', hr1: '08:00', hr2: '12:00', hr3: '14:00', hr4: '18:00' }
      ],
      messageBusinessHours: null
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
    onInsertSelectEmoji (emoji) {
      const self = this
      var tArea = this.$refs.inputEnvioMensagem
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
      self.txtContent = this.messageBusinessHours
      self.txtContent = tmpStr.substring(0, startPos) + emoji.data + tmpStr.substring(endPos, tmpStr.length)
      this.messageBusinessHours = self.txtContent
      // move cursor:
      setTimeout(() => {
        tArea.selectionStart = tArea.selectionEnd = cursorPos + emoji.data.length
      }, 10)
    },
    async listarMensagemHorariosAtendimento () {
      const { data } = await MostrarHorariosAtendiemento()
      this.businessHours = data[0].businessHours
      this.messageBusinessHours = data[0].messageBusinessHours
    },
    async salvarHorariosAtendimento () {
      try{
        const { data } = await AtualizarHorariosAtendiemento(this.businessHours)
        this.businessHours = data.businessHours
        this.$q.notify({
          color: 'positive',
          position: 'top',
          message: `Horário de funcionamento atualizado.`,
        });
      } catch(e){
        console.log('Horário de funcionamento erro :' + e)
      }
    },
    async salvarMensagemAusencia () {
      try{
        const { data } = await AtualizarMensagemHorariosAtendiemento({
          messageBusinessHours: this.messageBusinessHours
        })
        this.messageBusinessHours = data.messageBusinessHours
        this.$q.notify({
          color: 'positive',
          position: 'top',
          message: `Mensagem de ausência atualizada.`,
        });
      } catch(e){
        console.log('Mensagem de ausência erro :' + e)
      }
    }
  },
  mounted () {
    this.listarMensagemHorariosAtendimento()
    this.userProfile = localStorage.getItem('profile')
    this.loadColors()
  }
}
</script>

<style lang="scss" scoped>
</style>
