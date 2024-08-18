<template>
  <div>
    <div class="q-my-md">
      <q-card
        flat
        bordered
        class="my-sticky-dynamic q-ma-lg"
      >
        <q-card-section class="text-h6 text-bold">
          Tarefas
        </q-card-section>
      </q-card>
    </div>
    <q-table
      flat
      bordered
      square
      hide-bottom
      class="my-sticky-dynamic q-ma-lg"
      title="Tarefas"
      :data="tarefas"
      :columns="columns"
      :loading="loading"
      row-key="id"
      :pagination.sync="pagination"
      :rows-per-page-options="[0]"
    >
      <template v-slot:top-right>
        <q-btn
          color="primary"
          label="Adicionar"
          @click="tarefaEdicao = {}; modalTarefa = true"
        />
      </template>
      <template v-slot:top-left>
        <q-input
        :class="{
        'order-last q-mt-md': $q.screen.width < 500
      }"
        style="width: 300px"
        filled
        dense
        debounce="500"
        v-model="filter"
        clearable
        placeholder="Localize"
        @input="filtrarTarefa"
      >
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
      </q-input>
      </template>
      <template v-slot:body-cell-color="props">
        <q-td class="text-center">
          <div
            class="q-pa-sm rounded-borders"
            :style="`background: ${props.row.color}`"
          >
            {{ props.row.color }}
          </div>
        </q-td>
      </template>
      <template v-slot:body-cell-isActive="props">
        <q-td class="text-center">
          <q-icon
            size="24px"
            :name="props.value ? 'mdi-check-circle-outline' : 'mdi-close-circle-outline'"
            :color="props.value ? 'positive' : 'negative'"
          />
        </q-td>
      </template>
      <template v-slot:body-cell-acoes="props">
        <q-td class="text-center">
          <q-btn
              flat
              round
              icon="mdi-check-circle-outline"
              @click="concluirTarefa(props.row)"
            >
            <q-tooltip
              anchor="top middle"
              self="bottom middle"
              :offset="[0, 10]"
            >
              Clique para concluir a tarefa
            </q-tooltip>
          </q-btn>
          <q-btn
              flat
              round
              icon="mdi-content-copy"
              @click="duplicarTarefa(props.row)"
            >
            <q-tooltip
              anchor="top middle"
              self="bottom middle"
              :offset="[0, 10]"
            >
              Clique para duplicar a tarefa
            </q-tooltip>
          </q-btn>
          <q-btn
              flat
              round
              icon="edit"
              @click="editarTarefa(props.row)"
            >
            <q-tooltip
              anchor="top middle"
              self="bottom middle"
              :offset="[0, 10]"
            >
              Clique para editar a tarefa
            </q-tooltip>
          </q-btn>
          <q-btn
              v-if="userProfile === 'admin'"
              flat
              round
              icon="mdi-delete"
              @click="deletarTarefa(props.row)"
              >
            <q-tooltip
              anchor="top middle"
              self="bottom middle"
              :offset="[0, 10]"
            >
              Clique para deletar a tarefa
            </q-tooltip>
          </q-btn>
        </q-td>
      </template>
    </q-table>
    <ModalTarefa
      :modalTarefa.sync="modalTarefa"
      :tarefaEdicao.sync="tarefaEdicao"
      @modal-tarefa:criada="tarefaCriada"
      @modal-tarefa:editada="tarefaEditada"
    />
  </div>
</template>

<script>
import { DeletarTarefa, ListarTarefas, AlterarTarefa, CriarTarefa } from 'src/service/tarefas'
import { MostrarCores } from 'src/service/empresas';
import ModalTarefa from './ModalTarefa'
export default {
  name: 'Tarefas',
  components: {
    ModalTarefa
  },
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
      params: {
        searchParam: null,
      },
      filter: null,
      tarefaEdicao: {},
      modalTarefa: false,
      tarefas: [],
      pagination: {
        rowsPerPage: 40,
        rowsNumber: 0,
        lastIndex: 0
      },
      loading: false,
      columns: [
        { name: 'id', label: '#', field: 'id', align: 'left' },
        { name: 'status', label: 'Status', field: 'status', align: 'left', format: (val) => this.formatStatus(val) },
        { name: 'name', label: 'Tarefa', field: 'name', align: 'left' },
        { name: 'description', label: 'Descrição', field: 'description', align: 'left', format: (val) => this.formatComments(val) },
        { name: 'limitDate', label: 'Data Limite', field: 'limitDate', align: 'left', format: (val) => this.formatDate(val) },
        { name: 'owner', label: 'Responsável', field: 'owner', align: 'left' },
        { name: 'priority', label: 'Prioridade', field: 'priority', align: 'left', format: (val) => this.formatPriority(val) },
        { name: 'comments', label: 'Comentários', field: 'comments', align: 'left', format: (val) => this.formatComments(val) },
        // { name: 'createdAt', label: 'Data', field: 'createdAt', align: 'center' },
        { name: 'acoes', label: 'Ações', field: 'acoes', align: 'center' }
      ]
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
    filtrarTarefa (data) {
      this.tarefas = []
      this.params.searchParam = data
      this.loading = true
      this.listarTarefasFiltro()
      this.loading = false
    },
    async listarTarefasFiltro () {
      this.loading = true
      const response = await ListarTarefas();
      const tarefas = response.data;
      try{
        const searchTerm = this.params.searchParam.toLowerCase();
        const tarefasFiltradas = tarefas.filter(tarefa => {
          const tarefaAsString = JSON.stringify(tarefa).toLowerCase();
          return tarefaAsString.includes(searchTerm);
        });
        this.LOAD_TAREFAS(tarefasFiltradas);
      } catch(e){
        this.tarefas = response.data
      }
      this.loading = false
    },
    LOAD_TAREFAS(tarefasFiltradas) {
      this.tarefas = tarefasFiltradas;
    },
    formatComments(comment) {
      if (comment && comment.length > 30) {
        return comment.substring(0, 30) + '...';
      }
      return comment;
    },
    formatStatus(value) {
      const statusMap = {
        'delayed': '🚩 Atrasada',
        'pending': '🔄 Pendente',
        'finished': '✅ Finalizada'
      };
      return statusMap[value] || value;
    },
    formatPriority(value) {
      const priorityMap = {
        'high': '⚡⚡⚡ Alta',
        'medium': '⚡⚡ Média',
        'low': '⚡ Baixa',
        'none': '😉 Nenhuma'
      };
      return priorityMap[value] || value;
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    },
    async listarTarefas () {
      const { data } = await ListarTarefas()
      this.tarefas = data
    },
    tarefaCriada (tarefa) {
      const newTarefas = [...this.tarefas]
      newTarefas.push(tarefa)
      this.tarefas = [...newTarefas]
    },
    tarefaEditada (tarefa) {
      const newTarefas = [...this.tarefas]
      const idx = newTarefas.findIndex(f => f.id === tarefa.id)
      if (idx > -1) {
        newTarefas[idx] = tarefa
      }
      this.tarefas = [...newTarefas]
    },
    editarTarefa (tarefa) {
      this.tarefaEdicao = { ...tarefa }
      this.modalTarefa = true
    },
    async concluirTarefa (tarefa) {
      this.loading = true
      try {
        const tarefaAtualizada = {
          ...tarefa,
          status: 'finished'
        };
        const { data } = await AlterarTarefa(tarefaAtualizada);
        this.$emit('modal-tarefa:editada', data)
        this.$q.notify({
          type: 'info',
          progress: true,
          position: 'top',
          textColor: 'black',
          message: 'Tarefa finalizada!',
          actions: [{
            icon: 'close',
            round: true,
            color: 'white'
          }]
        })
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
      this.loading = false
    },
    async duplicarTarefa (tarefa) {
      this.loading = true
      try {
        const tarefaAtualizada = {
          ...tarefa,
        };
        const { data } = await CriarTarefa(tarefaAtualizada);
        this.$emit('modal-tarefa:criada', data)
        this.$q.notify({
          type: 'info',
          progress: true,
          position: 'top',
          textColor: 'black',
          message: 'Tarefa duplicada!',
          actions: [{
            icon: 'close',
            round: true,
            color: 'white'
          }]
        })
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
      this.loading = false
    },
    async checarAtrasadas() {
      try {
        const { data } = await ListarTarefas();
        let tarefasAtualizadas = false;
        const atualizacoes = data.map(async (tarefa) => {
          const limitDate = new Date(tarefa.limitDate);
          const hoje = new Date();
          if ((limitDate < hoje && tarefa.status !== 'finished')) {
            const tarefaAtualizada = {
              ...tarefa,
              status: 'delayed'
            };
            await AlterarTarefa(tarefaAtualizada);
            tarefasAtualizadas = true;
          }
        });
        await Promise.all(atualizacoes);
        if (tarefasAtualizadas) {
          //  window.location.reload();
        }
      } catch (error) {
        console.error('Erro ao checar tarefas atrasadas:', error);
      }
    },
    deletarTarefa (tarefa) {
      this.$q.dialog({
        title: 'Atenção!!',
        message: `Deseja realmente deletar o Tarefa "${tarefa.name}"?`,
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
        DeletarTarefa(tarefa)
          .then(res => {
            let newTarefas = [...this.tarefas]
            newTarefas = newTarefas.filter(f => f.id !== tarefa.id)

            this.tarefas = [...newTarefas]
            this.$q.notify({
              type: 'positive',
              progress: true,
              position: 'top',
              message: `Tarefa ${tarefa.name} deletado!`,
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
    this.listarTarefas()
    this.checarAtrasadas()
    this.userProfile = localStorage.getItem('profile')
    this.loadColors()
  }
}
</script>

<style lang="scss" scoped>
</style>
