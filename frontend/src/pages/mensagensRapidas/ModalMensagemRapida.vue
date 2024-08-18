<template>
  <q-dialog
    persistent
    :value="modalMensagemRapida"
    @hide="fecharModal"
    @show="abrirModal"
  >
    <q-card
      :style="$q.screen.width < 500 ? 'width: 95vw' : 'min-width: 700px; max-width: 700px'"
      class="q-pa-lg"
    >
      <q-card-section>
        <div class="text-h6">{{ mensagemRapida.id ? 'Editar': 'Criar' }} Mensagem Rápida {{ mensagemRapida.id  ? `(ID: ${mensagemRapida.id})` : '' }}</div>
      </q-card-section>
      <q-card-section class="q-pa-none">
        <div class="row q-my-md">
          <div class="col">
            <q-input
              style="width: 200px; margin-left: 62px"
              square
              outlined
              v-model="mensagemRapida.key"
              label="Chave"
            />
            <p style="margin-left: 62px; font-size: 10px; margin-top: 3px;">
              A chave é o atalho para pesquisa da mensagem pelos usuários.
            </p>
          </div>
        </div>
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
            <label class="text-caption">Mensagem:</label>
            <textarea
              ref="inputEnvioMensagem"
              style="min-height: 15vh; max-height: 15vh;"
              class="q-pa-sm bg-white full-width"
              placeholder="Digite a mensagem"
              autogrow
              dense
              outlined
              @input="(v) => mensagemRapida.message = v.target.value"
              :value="mensagemRapida.message"
            />
          </div>
          <div class="col-xs-3 col-sm-2 col-md-1">
            <q-checkbox v-model="isVoz" />
            <q-tooltip>
              Enviar como Áudio Gravado
            </q-tooltip>
          </div>
          <div class="col-xs-8 col-sm-10 col-md-11 q-pl-sm">
            <q-file dense outlined v-model="arquivoCarregado" label="Escolha o arquivo" filled />
          </div>
        </div>
      </q-card-section>
      <q-card-actions
        align="right"
        class="q-mt-md"
      >
        <!-- <q-btn
          flat
          label="Remover Arquivo"
          color="primary"
          @click="limparArquivo"
        /> -->
        <q-btn
          flat
          label="Cancelar"
          color="negative"
          v-close-popup
          class="q-mr-md"
        />
        <q-btn
          flat
          label="Salvar"
          color="primary"
          @click="handleMensagemRapida"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { VEmojiPicker } from 'v-emoji-picker'

import { CriarMensagemRapida, AlterarMensagemRapida } from 'src/service/mensagensRapidas'
export default {
  name: 'ModalMensagemRapida',
  components: { VEmojiPicker },
  props: {
    modalMensagemRapida: {
      type: Boolean,
      default: false
    },
    mensagemRapidaEmEdicao: {
      type: Object,
      default: () => {
        return { id: null, key: '', message: '', medias: '', voice: '' }
      }
    }
  },
  data () {
    return {
      mensagemRapida: {
        key: null,
        message: null,
        medias: null,
        voice: null
      },
      arquivoCarregado: null,
      isVoz: false
    }
  },
  methods: {
    limparArquivo(){
      this.arquivoCarregado = null
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
      self.txtContent = this.mensagemRapida.message
      self.txtContent = tmpStr.substring(0, startPos) + emoji.data + tmpStr.substring(endPos, tmpStr.length)
      this.mensagemRapida.message = self.txtContent
      // move cursor:
      setTimeout(() => {
        tArea.selectionStart = tArea.selectionEnd = cursorPos + emoji.data.length
      }, 10)
    },
    fecharModal () {
      this.$emit('update:mensagemRapidaEmEdicao', { id: null })
      this.$emit('update:modalMensagemRapida', false)
    },
    abrirModal () {
      if (this.mensagemRapidaEmEdicao.id) {
        console.log(this.mensagemRapidaEmEdicao)
        this.mensagemRapida = { ...this.mensagemRapidaEmEdicao }
        this.mensagemRapida.arquivoCarregado = this.mensagemRapidaEmEdicao.media
      } else {
        this.mensagemRapida = {
          key: null,
          message: null,
          medias: null,
          voice: null
        }
        this.arquivoCarregado = null
      }
    },
    async handleMensagemRapida () {
      this.loading = true;
      try {
        let data;
        if (this.mensagemRapida.id) {
          const formData = new FormData();
          formData.append("key", this.mensagemRapida.key);
          formData.append("message", this.mensagemRapida.message.toString());
          if (this.arquivoCarregado) {
            formData.append("medias", this.arquivoCarregado);
          }
          if (!this.arquivoCarregado) {
            formData.append("medias", null);
          }
          formData.append("voice", this.isVoz ? "enabled" : "disabled");
          console.log(this.mensagemRapida.id)
          data = await AlterarMensagemRapida(this.mensagemRapida.id, formData);
          this.$emit('mensagemRapida:editada', { ...this.mensagemRapida, ...data.data })
        } else {
          const formData = new FormData();
          formData.append("key", this.mensagemRapida.key);
          formData.append("message", this.mensagemRapida.message);
          if (this.arquivoCarregado) {
            formData.append("medias", this.arquivoCarregado);
          }
          if (!this.arquivoCarregado) {
            formData.append("medias", null);
          }
          formData.append("voice", this.isVoz ? "enabled" : "disabled");
          data = await CriarMensagemRapida(formData);
          this.$emit('mensagemRapida:criada', { ...this.mensagemRapida, ...data.data })
        }
        this.$q.notify({
          type: 'positive',
          message: this.mensagemRapida.id ? 'Mensagem rápida atualizada com sucesso!' : 'Mensagem rápida criada com sucesso!'
        });
        // this.$emit('updateListaMensagens');
        this.fecharModal();
      } catch (error) {
        console.error(error);
        this.$q.notify({
          type: 'negative',
          message: 'Ocorreu um erro ao salvar a mensagem rápida.'
        });
      }
      this.loading = false;
    }
    // async handleMensagemRapida () {
    //   this.loading = true
    //   try {
    //     if (this.mensagemRapida.id) {
    //       const { data } = await AlterarMensagemRapida(this.mensagemRapida)
    //       this.$emit('mensagemRapida:editada', { ...this.mensagemRapida, ...data })
    //       this.$q.notify({
    //         type: 'info',
    //         progress: true,
    //         position: 'top',
    //         textColor: 'black',
    //         message: 'Mensagem Rápida editada!',
    //         actions: [{
    //           icon: 'close',
    //           round: true,
    //           color: 'white'
    //         }]
    //       })
    //     } else {
    //       const { data } = await CriarMensagemRapida(this.mensagemRapida)
    //       this.$emit('mensagemRapida:criada', data)
    //       this.$q.notify({
    //         type: 'positive',
    //         progress: true,
    //         position: 'top',
    //         message: 'Mensagem rápida criada!',
    //         actions: [{
    //           icon: 'close',
    //           round: true,
    //           color: 'white'
    //         }]
    //       })
    //     }
    //     this.fecharModal()
    //   } catch (error) {
    //     console.error(error)
    //   }
    //   this.loading = false
    // }
  }
}
</script>

<style lang="scss" scoped>
</style>
