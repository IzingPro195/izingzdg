<template>
  <q-dialog
    persistent
    :value="modalNota"
    @hide="fecharModal"
    @show="abrirModal"
  >
    <q-card
      style="width: 500px"
      class="q-pa-lg"
    >
      <q-card-section>
        <div class="text-h6">{{ notaEdicao.id ? 'Editar': 'Criar' }} Notas</div>
      </q-card-section>
      <q-card-section>
        <q-input
          type="textarea"
          class="row col"
          square
          outlined
          v-model="nota.notes"
          label="Nota de atendimento"
          autogrow
        />
        <!-- <q-input
          class="row col"
          square
          outlined
          v-model="nota.ticketId"
          label="Atendimento"
        /> -->
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
          @click="handleNota"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>

</template>

<script>
import { uid } from 'quasar'
import { CriarNota, AlterarNota } from 'src/service/notas'
export default {
  name: 'ModalNota',
  props: {
    modalNota: {
      type: Boolean,
      default: false
    },
    notaEdicao: {
      type: Object,
      default: () => {
        return { id: null }
      }
    }
  },
  data () {
    return {
      nota: {
        id: null,
        notes: null,
        ticketId: null,
        idFront: null
      }
    }
  },
  methods: {
    resetarNota () {
      this.nota = {
        id: null,
        notes: null,
        ticketId: null,
        idFront: null
      }
    },
    fecharModal () {
      this.resetarNota()
      this.$emit('update:notaEdicao', { id: null })
      this.$emit('update:modalNota', false)
    },
    abrirModal () {
      if (this.notaEdicao.id) {
      this.nota = { ...this.notaEdicao };
    } else {
      this.resetarNota();
      this.nota.ticketId = this.notaEdicao.ticketId;
      this.nota.idFront = uid()
    }
    },
    async handleNota () {
      try {
        this.loading = true
        if (this.nota.id) {
          const { data } = await AlterarNota(this.nota)
          this.$emit('modal-nota:editada', data)
          this.$q.notify({
            type: 'info',
            progress: true,
            position: 'top',
            textColor: 'black',
            message: 'Nota editada!',
            actions: [{
              icon: 'close',
              round: true,
              color: 'white'
            }]
          })
        } else {
          const { data } = await CriarNota(this.nota)
          this.$emit('modal-nota:criada', data)
          this.$q.notify({
            type: 'positive',
            progress: true,
            position: 'top',
            message: 'Nota criada!',
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
        this.$notificarErro('Ocorreu um erro ao criar a nota', error)
      }
    }
  }

}
</script>

<style lang="scss" scoped>
</style>
