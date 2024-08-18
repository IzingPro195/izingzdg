<template>
  <div v-if="userProfile === 'admin' || userProfile === 'super' ">
    <div class="q-my-md">
      <q-card
        flat
        bordered
        class="my-sticky-dynamic q-ma-lg"
      >
        <q-card-section class="text-h6 text-bold">
          Protocolos
        </q-card-section>
      </q-card>
    </div>
    <q-table
      flat
      bordered
      square
      hide-bottom
      class="my-sticky-dynamic q-ma-lg"
      title="Protocolos"
      :data="protocolos"
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
          @click="protocoloEdicao = {}; modalProtocolo = true"
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
          @input="filtrarProtocolos"
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
          @input="filtrarProtocolosPorData"
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
      <!-- <template v-slot:body-cell-ticketId="props">
        <q-td :props="props">
          <a :href="getTicketUrl(props.row.ticketId)">{{ props.row.ticketId }}</a>
        </q-td>
      </template> -->
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
            @click="editarProtocolo(props.row)"
          />
          <q-btn
            flat
            round
            icon="mdi-delete"
            @click="deletarProtocolo(props.row)"
          />
        </q-td>
      </template>
    </q-table>
    <ModalProtocolo
      :modalProtocolo.sync="modalProtocolo"
      :protocoloEdicao.sync="protocoloEdicao"
      @modal-protocolo:criada="protocoloCriada"
      @modal-protocolo:editada="protocoloEditada"
    />
  </div>
</template>

<script>
import { DeletarProtocolo, ListarProtocolos } from 'src/service/protocolos'
import ModalProtocolo from './ModalProtocolo'
import { ListarUsuarios } from 'src/service/user'
export default {
  name: 'Protocolos',
  components: {
    ModalProtocolo
  },
  data () {
    return {
      params: {
        searchParam: null,
      },
      userProfile: 'user',
      filter: null,
      dateFilter: null,
      protocoloEdicao: {},
      usuarios: [],
      modalProtocolo: false,
      protocolos: [],
      pagination: {
        rowsPerPage: 40,
        rowsNumber: 0,
        lastIndex: 0
      },
      loading: false,
      columns: [
        { name: 'id', label: '#', field: 'id', align: 'left' },
        { name: 'protocol', label: 'Protocolo', field: 'protocol', align: 'left' },
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
    filtrarProtocolos (data) {
      this.protocolos = []
      this.params.searchParam = data
      this.loading = true
      this.listarProtocolosFiltro()
      this.loading = false
    },
    async listarProtocolosFiltro () {
      this.loading = true
      const response = await ListarProtocolos();
      const protocolos = response.data;
      try {
        const searchTerm = this.params.searchParam.toLowerCase();
        const protocolosFiltradas = protocolos.filter(protocolo => {
          const protocoloString = JSON.stringify(protocolo).toLowerCase();
          return protocoloString.includes(searchTerm);
        });
        this.LOAD_PROTOCOLOS(protocolosFiltradas);
      } catch(e){
        this.protocolos = response.data
      }
      this.loading = false
    },
    filtrarProtocolosPorData() {
      this.loading = true;
      const dataFiltrada = this.dateFilter ? new Date(this.dateFilter) : null;

      if (dataFiltrada) {
        const dataFiltradaStr = dataFiltrada.toISOString().split('T')[0];

        this.protocolos = this.protocolos.filter(protocolo => {
          const protocoloData = new Date(protocolo.createdAt);
          const protocoloDataStr = protocoloData.toISOString().split('T')[0];

          return protocoloDataStr === dataFiltradaStr;
        });

        if (this.protocolos.length === 0) {
          this.listarProtocolos();
        }
      } else {
        this.listarProtocolos();
      }
      this.loading = false;
    },
    LOAD_PROTOCOLOS(protocolosFiltradas) {
      this.protocolos = protocolosFiltradas;
    },
    async listarProtocolos () {
      const { data } = await ListarProtocolos()
      this.protocolos = data
    },
    protocoloCriada (protocolo) {
      const newProtocolos = [...this.protocolos]
      newProtocolos.push(protocolo)
      this.protocolos = [...newProtocolos]
    },
    protocoloEditada (protocolo) {
      const newProtocolos = [...this.protocolos]
      const idx = newProtocolos.findIndex(f => f.id === protocolo.id)
      if (idx > -1) {
        newProtocolos[idx] = protocolo
      }
      this.protocolos = [...newProtocolos]
    },
    editarProtocolo (protocolo) {
      this.protocoloEdicao = { ...protocolo }
      this.modalProtocolo = true
    },
    deletarProtocolo (protocolo) {
      this.$q.dialog({
        title: 'Atenção!!',
        message: `Deseja realmente deletar o Protocolo "${protocolo.protocol}"?`,
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
        DeletarProtocolo(protocolo)
          .then(res => {
            let newProtocolos = [...this.protocolos]
            newProtocolos = newProtocolos.filter(f => f.id !== protocolo.id)

            this.protocolos = [...newProtocolos]
            this.$q.notify({
              type: 'positive',
              progress: true,
              position: 'top',
              message: `Protocolo ${protocolo.protocol} deletado!`,
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
    this.listarProtocolos()
    this.listarUsuarios()
    this.userProfile = localStorage.getItem('profile')
  }
}
</script>

<style lang="scss" scoped>
</style>
