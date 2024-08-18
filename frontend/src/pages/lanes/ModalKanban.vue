<template>
  <q-dialog
    persistent
    :value="modalKanban"
    @hide="fecharModal"
    @show="abrirModal"
  >
    <q-card
      style="width: 500px"
      class="q-pa-lg"
    >
      <q-card-section>
        <div class="text-h6">{{ kanbanEdicao.id ? 'Editar': 'Criar' }} Kanban</div>
      </q-card-section>
      <q-card-section>
        <q-input
          class="row col"
          square
          outlined
          v-model="kanban.name"
          label="Nome da Kanban"
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
          @click="handleKanban"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>

</template>

<script>
import { CriarKanban, AlterarKanban } from 'src/service/kanban'
export default {
  name: 'ModalKanban',
  props: {
    modalKanban: {
      type: Boolean,
      default: false
    },
    kanbanEdicao: {
      type: Object,
      default: () => {
        return { id: null }
      }
    }
  },
  data () {
    return {
      kanban: {
        id: null,
        name: null
      }
    }
  },
  methods: {
    resetarKanban () {
      this.kanban = {
        id: null,
        name: null
      }
    },
    fecharModal () {
      this.resetarKanban()
      this.$emit('update:kanbanEdicao', { id: null })
      this.$emit('update:modalKanban', false)
    },
    abrirModal () {
      if (this.kanbanEdicao.id) {
        this.kanban = { ...this.kanbanEdicao }
      } else {
        this.resetarKanban()
      }
    },
    async handleKanban () {
      try {
        this.loading = true
        if (this.kanban.id) {
          const { data } = await AlterarKanban(this.kanban)
          this.$emit('modal-kanban:editada', data)
          this.$q.notify({
            type: 'info',
            progress: true,
            position: 'top',
            textColor: 'black',
            message: 'Etapa editada!',
            actions: [{
              icon: 'close',
              round: true,
              color: 'white'
            }]
          })
        } else {
          const { data } = await CriarKanban(this.kanban)
          this.$emit('modal-kanban:criada', data)
          this.$q.notify({
            type: 'positive',
            progress: true,
            position: 'top',
            message: 'Kanban criada!',
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
        this.$notificarErro('Ocorreu um erro!', error)
      }
    }
  }

}
</script>

<style lang="scss" scoped>
</style>
