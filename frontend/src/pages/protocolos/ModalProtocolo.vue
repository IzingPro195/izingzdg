<template>
  <q-dialog
    persistent
    :value="modalProtocolo"
    @hide="fecharModal"
    @show="abrirModal"
  >
    <q-card
      style="width: 500px"
      class="q-pa-lg"
    >
      <q-card-section>
        <div class="text-h6">{{ protocoloEdicao.id ? 'Editar': 'Criar' }} Protocolo</div>
      </q-card-section>
      <q-card-section>
        <q-input
          class="row col"
          square
          outlined
          v-model="protocolo.protocol"
          label="Número de Protocolo"
        />
        <q-input
          class="row col"
          square
          outlined
          v-model="protocolo.ticketId"
          label="Atendimento"
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
          label="Salvar"
          color="primary"
          @click="handleProtocolo"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>

</template>

<script>
import { CriarProtocolo, AlterarProtocolo } from 'src/service/protocolos'
export default {
  name: 'ModalProtocolo',
  props: {
    modalProtocolo: {
      type: Boolean,
      default: false
    },
    protocoloEdicao: {
      type: Object,
      default: () => {
        return { id: null }
      }
    }
  },
  data () {
    return {
      protocolo: {
        id: null,
        protocol: null,
        ticketId: null,
      }
    }
  },
  methods: {
    resetarProtocolo () {
      this.protocolo = {
        id: null,
        protocol: null,
        ticketId: null,
      }
    },
    fecharModal () {
      this.resetarProtocolo()
      this.$emit('update:protocoloEdicao', { id: null })
      this.$emit('update:modalProtocolo', false)
    },
    abrirModal () {
      if (this.protocoloEdicao.id) {
        this.protocolo = { ...this.protocoloEdicao }
      } else {
        this.resetarProtocolo()
      }
    },
    async handleProtocolo () {
      try {
        this.loading = true
        if (this.protocolo.id) {
          const { data } = await AlterarProtocolo(this.protocolo)
          this.$emit('modal-protocolo:editada', data)
          this.$q.notify({
            type: 'info',
            progress: true,
            position: 'top',
            textColor: 'black',
            message: 'Protocolo editado!',
            actions: [{
              icon: 'close',
              round: true,
              color: 'white'
            }]
          })
        } else {
          const { data } = await CriarProtocolo(this.protocolo)
          this.$emit('modal-protocolo:criada', data)
          this.$q.notify({
            type: 'positive',
            progress: true,
            position: 'top',
            message: 'Protocolo criado!',
            actions: [{
              icon: 'close',
              round: true,
              color: 'white'
            }]
          })
        }
        this.loading = false
        this.fecharModal()
      } catch (error) {
        console.error(error)
        this.$notificarErro('Ocorreu um erro ao criar o protocolo', error)
      }
    }
  }

}
</script>

<style lang="scss" scoped>
</style>
