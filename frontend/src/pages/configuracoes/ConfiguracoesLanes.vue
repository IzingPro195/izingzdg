<template>
  <div v-if="userProfile === 'admin'">
    <q-table flat
      bordered
      square
      hide-bottom
      class="my-sticky-dynamic q-ma-lg"
      title="Lanes"
      :data="kanbans"
      :columns="columns"
      :loading="loading"
      row-key="id"
      :pagination.sync="pagination"
      :rows-per-page-options="[0]">
      <template v-slot:top-right>
        <q-btn color="primary"
          label="Adicionar"
          @click="kanbanEdicao = {}; modalKanban = true" />
      </template>
      <template v-slot:body-cell-isActive="props">
        <q-td class="text-center">
          <q-icon size="24px"
            :name="props.value ? 'mdi-check-circle-outline' : 'mdi-close-circle-outline'"
            :color="props.value ? 'positive' : 'negative'" />
        </q-td>
      </template>
      <template v-slot:body-cell-acoes="props">
        <q-td class="text-center">
          <q-btn flat
            round
            icon="edit"
            @click="editarKanban(props.row)" />
          <q-btn flat
            round
            icon="mdi-delete"
            @click="deletarKanban(props.row)" />
        </q-td>
      </template>
    </q-table>
    <ModalKanban :modalKanban.sync="modalKanban"
      :kanbanEdicao.sync="kanbanEdicao"
      @modal-kanban:criada="kanbanCriada"
      @modal-kanban:editada="kanbanEditada" />
  </div>
</template>

<script>
import { DeletarKanban, ListarKanbans } from 'src/service/kanban'
import ModalKanban from './ModalKanban'
export default {
  name: 'Kanbans',
  components: {
    ModalKanban
  },
  data () {
    return {
      userProfile: 'user',
      kanbanEdicao: {},
      modalKanban: false,
      kanbans: [],
      pagination: {
        rowsPerPage: 40,
        rowsNumber: 0,
        lastIndex: 0
      },
      loading: false,
      columns: [
        { name: 'id', label: '#', field: 'id', align: 'left' },
        { name: 'name', label: 'Lane', field: 'name', align: 'left' },
        { name: 'acoes', label: 'Ações', field: 'acoes', align: 'center' }
      ]
    }
  },
  methods: {
    async listarKanbans () {
      try {
        const { data } = await ListarKanbans();
        data.kanban.sort((a, b) => a.id - b.id);
        this.kanbans = data.kanban;
      } catch (error) {
        console.error('Erro ao listar kanbans:', error);
      }
    },
    kanbanCriada (kanban) {
      const newKanbans = [...this.kanbans]
      newKanbans.push(kanban)
      this.kanbans = [...newKanbans]
    },
    kanbanEditada (kanban) {
      const newKanbans = [...this.kanbans]
      const idx = newKanbans.findIndex(f => f.id === kanban.id)
      if (idx > -1) {
        newKanbans[idx] = kanban
      }
      this.kanbans = [...newKanbans]
    },
    editarKanban (kanban) {
      this.kanbanEdicao = { ...kanban }
      this.modalKanban = true
    },
    deletarKanban (kanban) {
      this.$q.dialog({
        title: 'Atenção!!',
        message: `Deseja realmente deletar a Lane "${kanban.name}"?`,
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
        DeletarKanban(kanban)
          .then(res => {
            let newKanbans = [...this.kanbans]
            newKanbans = newKanbans.filter(f => f.id !== kanban.id)

            this.kanbans = [...newKanbans]
            this.$q.notify({
              type: 'positive',
              progress: true,
              position: 'top',
              message: `Kanban ${kanban.name} deletada!`,
              actions: [{
                icon: 'close',
                round: true,
                color: 'white'
              }]
            })
          })
        this.loading = false
      })
    }

  },
  mounted () {
    this.listarKanbans()
    this.userProfile = localStorage.getItem('profile')
  }
}
</script>

<style lang="scss" scoped>
</style>
