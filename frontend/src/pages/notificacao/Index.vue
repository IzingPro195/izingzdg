<template>
  <div v-if="userProfile === 'superadmin'">
    <q-table
      flat
      bordered
      square
      hide-bottom
      class="my-sticky-dynamic q-ma-lg"
      title="Notificações"
      :data="notificacoes"
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
          @click="notificacaoEdicao = {}; modalNotificacao = true"
          style="margin-bottom: 15px; margin-right: 5px;"
        />
        <q-btn
          color="negative"
          label="Deletar Todas"
          @click="deletarTodasNotificacoes"
          style="margin-bottom: 15px; margin-left: 5px;"
        />
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
          placeholder="Localizar"
          @input="filtrarNotificacoes"
        >
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <template v-slot:body-cell-acoes="props">
        <q-td class="text-center">
          <q-btn
            flat
            round
            icon="edit"
            @click="editarNotificacao(props.row)"
          />
          <q-btn
            flat
            round
            icon="mdi-delete"
            @click="deletarNotificacao(props.row)"
          />
        </q-td>
      </template>
    </q-table>
    <ModalNotificacao
      :modalNotificacao.sync="modalNotificacao"
      :notificacaoEdicao.sync="notificacaoEdicao"
      @modal-notificacao:criada="notificacaoCriada"
      @modal-notificacao:editada="notificacaoEditada"
    />
  </div>
</template>

<script>
import { 
  listarNotificacoes, 
  deletarNotificacao, 
  deletarTodasNotificacoes 
} from 'src/service/notificacao'
import ModalNotificacao from './ModalNotificacao'
import { MostrarCores } from 'src/service/empresas';

export default {
  name: 'Notificacoes',
  components: {
    ModalNotificacao
  },
  data() {
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
      filter: null,
      notificacaoEdicao: {},
      modalNotificacao: false,
      notificacoes: [],
      pagination: {
        rowsPerPage: 40,
        rowsNumber: 0,
        lastIndex: 0
      },
      loading: false,
      columns: [
        { name: 'id', label: '#', field: 'id', align: 'left' },
        { name: 'message', label: 'Mensagem', field: 'message', align: 'left' },
        { name: 'userId', label: 'User ID', field: 'userId', align: 'center' }, 
        { name: 'userName', label: 'Usuário', field: row => row.user.name, align: 'center' },
        {
          name: 'isRead',
          label: 'Leitura',
          field: 'isRead',
          align: 'center',
          format: (val) => val ? 'Lido' : 'Não Lido'
        },
        { name: 'createdAt', label: 'Data', field: 'createdAt', align: 'center', format: (val) => this.formatDate(val) },
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
    async listarNotificacoes() {
      this.loading = true;
      const response = await listarNotificacoes({ searchParam: this.filter, pageNumber: 1 });
      this.notificacoes = response.data.notifications;
      this.loading = false;
    },
    async filtrarNotificacoes() {
      this.listarNotificacoes();
    },
    // formatUser(userId) {
    //   const user = this.usuarios.find(user => user.id === userId);
    //   return user ? user.name : 'Usuário não encontrado';
    // },
    formatDate(dateString) {
      const date = new Date(dateString);
      date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    },
    notificacaoCriada(notificacao) {
      this.notificacoes.push(notificacao);
      this.listarNotificacoes();
    },
    notificacaoEditada(notificacao) {
      this.listarNotificacoes();
      const index = this.notificacoes.findIndex(n => n.id === notificacao.id);
      if (index !== -1) {
        this.notificacoes.splice(index, 1, notificacao);
      }
    },
    editarNotificacao(notificacao) {
      this.notificacaoEdicao = { ...notificacao };
      this.modalNotificacao = true;
    },
    deletarNotificacao(notificacao) {
      this.$q.dialog({
        title: 'Atenção!!',
        message: `Deseja realmente deletar a notificação "${notificacao.id}"?`,
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
      }).onOk(async () => {
        this.loading = true;
        await deletarNotificacao(notificacao.id);
        this.notificacoes = this.notificacoes.filter(n => n.id !== notificacao.id);
        this.loading = false;
        this.$q.notify({
          type: 'positive',
          progress: true,
          position: 'top',
          message: `Notificação ${notificacao.id} deletada!`,
          actions: [{ icon: 'close', round: true, color: 'white' }]
        });
      });
    },
    deletarTodasNotificacoes() {
      this.$q.dialog({
        title: 'Atenção!!',
        message: `Deseja realmente deletar todas as notificações?`,
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
      }).onOk(async () => {
        this.loading = true;
        await deletarTodasNotificacoes();
        this.notificacoes = [];
        this.loading = false;
        this.$q.notify({
          type: 'positive',
          progress: true,
          position: 'top',
          message: `Todas as notificações foram deletadas!`,
          actions: [{ icon: 'close', round: true, color: 'white' }]
        });
      });
    }
  },
  mounted() {
    this.listarNotificacoes();
    this.userProfile = localStorage.getItem('profile');
    this.loadColors()
  }
}
</script>

<style lang="scss" scoped>
</style>
