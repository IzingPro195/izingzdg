<template>
  <q-dialog
    persistent
    :value="modalAvaliacao"
    @hide="fecharModal"
    @show="abrirModal"
  >
    <q-card
      style="width: 500px"
      class="q-pa-lg"
    >
      <q-card-section>
        <div class="text-h6">{{ avaliacaoEdicao.id ? 'Editar': 'Criar' }} Avaliação</div>
      </q-card-section>
      <q-card-section>
        <q-input
          class="row col"
          square
          outlined
          v-model="avaliacao.evaluation"
          label="Avaliação"
        />
        <q-input
          class="row col"
          square
          outlined
          v-model="avaliacao.attempts"
          label="Tentativas"
        />
        <q-input
          class="row col"
          square
          outlined
          v-model="avaliacao.ticketId"
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
          @click="handleAvaliacao"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>

</template>

<script>
import { CriarAvaliacao, AlterarAvaliacao } from 'src/service/avaliacoes'
export default {
  name: 'ModalAvaliacao',
  props: {
    modalAvaliacao: {
      type: Boolean,
      default: false
    },
    avaliacaoEdicao: {
      type: Object,
      default: () => {
        return { id: null }
      }
    }
  },
  data () {
    return {
      avaliacao: {
        id: null,
        evaluation: null,
        attempts: null,
        ticketId: null,
      }
    }
  },
  methods: {
    resetarAvaliacao () {
      this.avaliacao = {
        id: null,
        evaluation: null,
        attempts: null,
        ticketId: null,
      }
    },
    fecharModal () {
      this.resetarAvaliacao()
      this.$emit('update:avaliacaoEdicao', { id: null })
      this.$emit('update:modalAvaliacao', false)
    },
    abrirModal () {
      if (this.avaliacaoEdicao.id) {
        this.avaliacao = { ...this.avaliacaoEdicao }
      } else {
        this.resetarAvaliacao()
      }
    },
    async handleAvaliacao () {
      try {
        this.loading = true
        if (this.avaliacao.id) {
          const { data } = await AlterarAvaliacao(this.avaliacao)
          this.$emit('modal-avaliacao:editada', data)
          this.$q.notify({
            type: 'info',
            progress: true,
            position: 'top',
            textColor: 'black',
            message: 'Avaliação editada!',
            actions: [{
              icon: 'close',
              round: true,
              color: 'white'
            }]
          })
        } else {
          const { data } = await CriarAvaliacao(this.avaliacao)
          this.$emit('modal-avaliacao:criada', data)
          this.$q.notify({
            type: 'positive',
            progress: true,
            position: 'top',
            message: 'Avaliação criada!',
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
        this.$notificarErro('Ocorreu um erro ao criar a avaliação', error)
      }
    }
  }

}
</script>

<style lang="scss" scoped>
</style>
