<template>
  <div v-if="userProfile === 'admin' || userProfile === 'super' ">
    <div class="q-my-md">
      <q-card flat bordered class="my-sticky-dynamic q-ma-lg">
        <q-card-section class="text-h6 text-bold">
          Avaliações
        </q-card-section>
      </q-card>
    </div>
    <q-table
      flat
      bordered
      square
      hide-bottom
      class="my-sticky-dynamic q-ma-lg"
      title="Avaliacoes"
      :data="avaliacoes"
      :columns="columns"
      :loading="loading"
      row-key="id"
      :pagination.sync="pagination"
      :rows-per-page-options="[0]"
    >
      <template v-slot:top-right>
        <!-- <q-btn
          color="primary"
          label="Adicionar"
          @click="avaliacaoEdicao = {}; modalAvaliacao = true"
        /> -->
      </template>
      <template v-slot:top-left>
        <q-input
          :class="{ 'order-last q-mt-md': $q.screen.width < 500 }"
          style="width: 300px"
          filled
          dense
          debounce="500"
          v-model="filter"
          clearable
          placeholder="Localize"
          @input="filtrarAvaliacoes"
        >
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-input
          filled
          dense
          v-model="dateFilter"
          clearable
          type="date"
          placeholder="Filtrar por data"
          @input="filtrarAvaliacoesPorData"
          style="width: 200px; margin-left: 10px"
        />
      </template>
      <template v-slot:body-cell-color="props">
        <q-td class="text-center">
          <div class="q-pa-sm rounded-borders" :style="`background: ${props.row.color}`">
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
          <q-btn flat round icon="edit" @click="editarAvaliacao(props.row)" />
          <q-btn flat round icon="mdi-delete" @click="deletarAvaliacao(props.row)" />
        </q-td>
      </template>
    </q-table>
    <ModalAvaliacao
      :modalAvaliacao.sync="modalAvaliacao"
      :avaliacaoEdicao.sync="avaliacaoEdicao"
      @modal-avaliacao:criada="avaliacaoCriada"
      @modal-avaliacao:editada="avaliacaoEditada"
    />
  </div>
</template>

<script>
import { DeletarAvaliacao, ListarAvaliacoes } from 'src/service/avaliacoes'
import ModalAvaliacao from './ModalAvaliacao'
import { ListarUsuarios } from 'src/service/user'

export default {
  name: 'Avaliacoes',
  components: {
    ModalAvaliacao
  },
  data () {
    return {
      params: {
        searchParam: null,
      },
      userProfile: 'user',
      filter: null,
      dateFilter: null,
      avaliacaoEdicao: {},
      modalAvaliacao: false,
      avaliacoes: [],
      usuarios: [],
      pagination: {
        rowsPerPage: 40,
        rowsNumber: 0,
        lastIndex: 0
      },
      loading: false,
      columns: [
        { name: 'id', label: '#', field: 'id', align: 'left' },
        { name: 'evaluation', label: 'Avaliação', field: 'evaluation', align: 'left' },
        { name: 'usuerId', label: 'Usuário', field: 'userId', align: 'center', format: (val) => this.formatUser(val) },
        { name: 'ticketId', label: 'Atendimento', field: 'ticketId', align: 'center' },
        { name: 'createdAt', label: 'Data', field: 'createdAt', align: 'center', format: (val) => this.formatDate(val) },
        { name: 'acoes', label: 'Ações', field: 'acoes', align: 'center' }
      ]
    }
  },
  watch: {
    dateFilter(newValue) {
      this.filtrarAvaliacoesPorData(newValue);
    }
  },
  methods: {
    async listarUsuarios(){
      const data = await ListarUsuarios()
      this.usuarios = data.data.users
    },
    formatUser(userId) {
      const user = this.usuarios.find(user => user.id === userId);
      return user ? user.name : 'Usuário não encontrado';
    },
    getTicketUrl(ticketId) {
      const route = this.$router.resolve({ path: `/atendimento/${ticketId}` });
      return route.href;
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    },
    filtrarAvaliacoes(data) {
      this.avalicoes = []
      this.params.searchParam = data
      this.loading = true
      this.listarAvaliacoesFiltro()
      this.loading = false
    },
    async listarAvaliacoesFiltro() {
      this.loading = true
      const response = await ListarAvaliacoes();
      const avaliacoes = response.data;
      try {
        const searchTerm = this.params.searchParam.toLowerCase();
        const avaliacoesFiltradas = avaliacoes.filter(avaliacao => {
          const avaliacaoString = JSON.stringify(avaliacao).toLowerCase();
          return avaliacaoString.includes(searchTerm);
        });
        this.LOAD_AVALIACOES(avaliacoesFiltradas);
      } catch(e){
        this.avaliacoes = response.data
      }
      this.loading = false
    },
    filtrarAvaliacoesPorData() {
      this.loading = true;
      const dataFiltrada = this.dateFilter ? new Date(this.dateFilter) : null;

      if (dataFiltrada) {
        const dataFiltradaStr = dataFiltrada.toISOString().split('T')[0];
        this.avaliacoes = this.avaliacoes.filter(avaliacao => {
          const avaliacaoData = new Date(avaliacao.createdAt);
          const avaliacaoDataStr = avaliacaoData.toISOString().split('T')[0];
          const match = (avaliacaoDataStr === dataFiltradaStr);
          return match;
        });

        if (this.avaliacoes.length === 0) {
          this.listarAvaliacoes();
        }
      } else {
        this.listarAvaliacoes();
      }
      this.loading = false;
    },
    LOAD_AVALIACOES(avaliacoesFiltradas) {
      this.avaliacoes = avaliacoesFiltradas;
    },
    async listarAvaliacoes() {
      this.loading = true;
      const { data } = await ListarAvaliacoes();
      this.avaliacoes = data;
      this.loading = false;
    },
    avaliacaoCriada(avaliacao) {
      const newAvaliacoes = [...this.avaliacoes]
      newAvaliacoes.push(avaliacao)
      this.avaliacoes = [...newAvaliacoes]
    },
    avaliacaoEditada(avaliacao) {
      const newAvaliacoes = [...this.avaliacoes]
      const idx = newAvaliacoes.findIndex(f => f.id === avaliacao.id)
      if (idx > -1) {
        newAvaliacoes[idx] = avaliacao
      }
      this.avaliacoes = [...newAvaliacoes]
    },
    editarAvaliacao(avaliacao) {
      this.avaliacaoEdicao = { ...avaliacao }
      this.modalAvaliacao = true
    },
    deletarAvaliacao(avaliacao) {
      this.$q.dialog({
        title: 'Atenção!!',
        message: `Deseja realmente deletar a Avaliação "${avaliacao.evaluation}"?`,
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
        DeletarAvaliacao(avaliacao)
          .then(res => {
            let newAvaliacoes = [...this.avaliacoes]
            newAvaliacoes = newAvaliacoes.filter(f => f.id !== avaliacao.id)

            this.avaliacoes = [...newAvaliacoes]
            this.$q.notify({
              type: 'positive',
              progress: true,
              position: 'top',
              message: `Avaliação ${avaliacao.evaluation} deletado!`,
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
  mounted() {
    this.listarAvaliacoes()
    this.listarUsuarios()
    this.userProfile = localStorage.getItem('profile')
  }
}
</script>


<style lang="scss" scoped>
</style>
