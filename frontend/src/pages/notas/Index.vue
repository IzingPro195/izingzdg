<template>
  <div v-if="userProfile === 'admin' || userProfile === 'super' ">
    <div class="q-my-md">
      <q-card
        flat
        bordered
        class="my-sticky-dynamic q-ma-lg"
      >
        <q-card-section class="text-h6 text-bold">
          Notas
        </q-card-section>
      </q-card>
    </div>
    <q-table
      flat
      bordered
      square
      hide-bottom
      class="my-sticky-dynamic q-ma-lg"
      title="Notas"
      :data="notas"
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
          @click="notaEdicao = {}; modalNota = true"
        /> -->
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
          @input="filtrarNotas"
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
          @input="filtrarNotasPorData"
          style="width: 200px; margin-left: 10px"
        />
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
            icon="edit"
            @click="editarNota(props.row)"
          />
          <q-btn
            flat
            round
            icon="mdi-delete"
            @click="deletarNota(props.row)"
          />
        </q-td>
      </template>
    </q-table>
    <ModalNota
      :modalNota.sync="modalNota"
      :notaEdicao.sync="notaEdicao"
      @modal-nota:criada="notaCriada"
      @modal-nota:editada="notaEditada"
    />
  </div>
</template>

<script>
import { DeletarNota, ListarNotas } from 'src/service/notas'
import { ListarUsuarios } from 'src/service/user'
import ModalNota from './ModalNota'

export default {
  name: 'Notas',
  components: {
    ModalNota
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
      params: {
        searchParam: null,
      },
      userProfile: 'user',
      usuarios: [],
      filter: null,
      dateFilter: null,
      notaEdicao: {},
      modalNota: false,
      notas: [],
      pagination: {
        rowsPerPage: 40,
        rowsNumber: 0,
        lastIndex: 0
      },
      loading: false,
      columns: [
        { name: 'id', label: '#', field: 'id', align: 'left' },
        { name: 'notes', label: 'Nota', field: 'notes', align: 'left' },
        { name: 'usuerId', label: 'Usuário', field: 'userId', align: 'center', format: (val) => this.formatUser(val) },
        { name: 'ticketId', label: 'Atendimento', field: 'ticketId', align: 'center' },
        { name: 'createdAt', label: 'Data', field: 'createdAt', align: 'center', format: (val) => this.formatDate(val) },
        { name: 'acoes', label: 'Ações', field: 'acoes', align: 'center' }
      ]
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
    filtrarNotas (data) {
      this.notas = []
      this.params.searchParam = data
      this.loading = true
      this.listarNotasFiltro()
      this.loading = false
    },
    async listarNotasFiltro () {
      this.loading = true
      const response = await ListarNotas();
      const notas = response.data;
      try {
        const searchTerm = this.params.searchParam.toLowerCase();
        const notasFiltradas = notas.filter(nota => {
          const notaString = JSON.stringify(nota).toLowerCase();
          return notaString.includes(searchTerm);
        });
        this.LOAD_NOTAS(notasFiltradas);
      } catch(e){
        this.notas = response.data
      }
      this.loading = false
    },
    filtrarNotasPorData() {
      this.loading = true;
      const dataFiltrada = this.dateFilter ? new Date(this.dateFilter) : null;

      if (dataFiltrada) {
        const dataFiltradaStr = dataFiltrada.toISOString().split('T')[0];

        this.notas = this.notas.filter(nota => {
          const notaData = new Date(nota.createdAt);
          const notaDataStr = notaData.toISOString().split('T')[0];

          return notaDataStr === dataFiltradaStr;
        });

        if (this.notas.length === 0) {
          this.listarNotas();
        }
      } else {
        this.listarNotas();
      }
      this.loading = false;
    },
    LOAD_NOTAS(notasFiltradas) {
      this.notas = notasFiltradas;
    },
    async listarNotas () {
      const { data } = await ListarNotas()
      this.notas = data
    },
    notaCriada (nota) {
      const newNotas = [...this.notas]
      newNotas.push(nota)
      this.notas = [...newNotas]
    },
    notaEditada (nota) {
      const newNotas = [...this.notas]
      const idx = newNotas.findIndex(f => f.id === nota.id)
      if (idx > -1) {
        newNotas[idx] = nota
      }
      this.notas = [...newNotas]
    },
    editarNota (nota) {
      this.notaEdicao = { ...nota }
      this.modalNota = true
    },
    deletarNota (nota) {
      this.$q.dialog({
        title: 'Atenção!!',
        message: `Deseja realmente deletar a Nota "${nota.notes}"?`,
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
        DeletarNota(nota)
          .then(res => {
            let newNotas = [...this.notas]
            newNotas = newNotas.filter(f => f.id !== nota.id)

            this.notas = [...newNotas]
            this.$q.notify({
              type: 'positive',
              progress: true,
              position: 'top',
              message: `Nota ${nota.nota} deletada!`,
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
    this.listarNotas()
    this.listarUsuarios()
    this.userProfile = localStorage.getItem('profile')
  }
}
</script>

<style lang="scss" scoped>
</style>
