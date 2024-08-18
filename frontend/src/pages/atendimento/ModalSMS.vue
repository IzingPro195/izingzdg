<template>
  <q-dialog
    persistent
    :value="modalSMS"
    @hide="fecharModal"
    @show="abrirModal"
  >
    <q-card
      style="width: 500px"
      class="q-pa-lg"
    >
      <q-card-section>
        <div class="text-h6">Enviar SMS</div>
      </q-card-section>
      <q-card-section>
        <q-input
          type="textarea"
          class="row col"
          square
          outlined
          v-model="message"
          label="SMS"
          autogrow
        />
      </q-card-section>
      <q-card-actions
        align="right"
        class="q-mt-md"
      >
        <q-btn
          flat
          label="Cancelar"
          color="negative"
          v-close-popup
          class="q-mr-md"
        />
        <q-btn
          flat
          label="Enviar"
          color="primary"
          @click="handleSMS"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>

</template>

<script>  
import { EnviarSMS } from 'src/service/sms'
export default {
  name: 'ModalSMS',
  props: {
    modalSMS: {
      type: Boolean,
      default: false
    },
    smsEnvio: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      message: '',
      sms: ''
    }
  },
  methods: {
    resetarSMS () {
      this.message = null
    },
    fecharModal () {
      this.resetarSMS()
      this.$emit('update:modalSMS', false)
    },
    abrirModal () {
      console.log(this.smsEnvio)
      if (this.smsEnvio.id) {
        this.sms = this.smsEnvio;
      } else {
        this.resetarSMS();
      }
    },
    async handleSMS () {
      try {
        this.loading = true
        try {
          const dados ={
            'phoneNumber': this.smsEnvio,
            'message': this.message
          }
          const resposta = await EnviarSMS(dados)
          this.$q.notify({
            type: 'positive',
            message: 'Comtele: ' + resposta.data.Message,
            position: 'top',
          })
        } catch (erro) {
          this.$q.notify({
            type: 'warning',
            message: 'Erro ao enviar dados para o servidor da Comtele: ' + erro,
            position: 'top',
          })
        }
        this.loading = false
        this.fecharModal()
      } catch (error) {
        this.$q.notify({
          type: 'warning',
          message: 'Erro ao enviar dados para o servidor da Comtele: ' + error,
          position: 'top',
        })
      }
    }
  }

}
</script>

<style lang="scss" scoped>
</style>
