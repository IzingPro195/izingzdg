<template>
  <div v-if="userProfile === 'admin' || userProfile === 'super' ">
    <q-table
      flat
      bordered
      square
      hide-bottom
      class="my-sticky-dynamic q-ma-lg"
      title="Campanhas"
      :data="campanhas"
      :columns="columns"
      :loading="loading"
      row-key="id"
      :pagination.sync="pagination"
      :rows-per-page-options="[0]"
    >
      <template v-slot:top-right>
        <q-btn
          class="q-mr-md"
          color="primary"
          icon="refresh"
          outline
          @click="listarCampanhas"
        >
          <q-tooltip>
            Atualizar Listagem
          </q-tooltip>
        </q-btn>
        <q-btn
          color="primary"
          label="Adicionar"
          @click="campanhaEdicao = {}; modalCampanha = true"
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
            icon="mdi-account-details-outline"
            @click="contatosCampanha(props.row)"
          >
            <q-tooltip>
              Lista de Contatos da Campanha
            </q-tooltip>
          </q-btn>
          <q-btn
            flat
            round
            v-if="['pending', 'canceled'].includes(props.row.status)"
            icon="mdi-calendar-clock"
            @click="iniciarCampanha(props.row)"
          >
            <q-tooltip>
              Programar Envio
            </q-tooltip>
          </q-btn>
          <q-btn
            flat
            round
            v-if="['scheduled', 'processing'].includes(props.row.status)"
            icon="mdi-close-box-multiple"
            @click="cancelarCampanha(props.row)"
          >
            <q-tooltip>
              Cancelar Campanha
            </q-tooltip>
          </q-btn>
          <q-btn
            flat
            round
            icon="edit"
            @click="editarCampanha(props.row)"
          >
            <q-tooltip>
              Editar Campanha
            </q-tooltip>
          </q-btn>
          <q-btn
            flat
            round
            icon="mdi-delete"
            @click="deletarCampanha(props.row)"
          >
            <q-tooltip>
              Excluir Campanha
            </q-tooltip>
          </q-btn>
        </q-td>
      </template>
    </q-table>
    <ModalCampanha
      v-if="modalCampanha"
      :modalCampanha.sync="modalCampanha"
      :campanhaEdicao.sync="campanhaEdicao"
      @modal-campanha:criada="campanhaCriada"
      @modal-campanha:editada="campanhaEditada"
    />
  </div>
</template>

<script>
import { CancelarCampanha, DeletarCampanha, IniciarCampanha, ListarCampanhas } from 'src/service/campanhas'
import ModalCampanha from './ModalCampanha'
import { MostrarCores } from 'src/service/empresas';
import { format, parseISO, startOfDay } from 'date-fns'

export default {
  name: 'Campanhas',
  components: {
    ModalCampanha
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
      campanhaEdicao: {},
      modalCampanha: false,
      campanhas: [],
      pagination: {
        rowsPerPage: 40,
        rowsNumber: 0,
        lastIndex: 0
      },
      loading: false,
      columns: [
        { name: 'id', label: '#', field: 'id', align: 'left' },
        { name: 'name', label: 'Campanha', field: 'name', align: 'left' },
        { name: 'start', label: 'Início', field: 'start', align: 'center', format: (v) => format(parseISO(v), 'dd/MM/yyyy HH:mm') },
        {
          name: 'status',
          label: 'Status',
          field: 'status',
          align: 'center',
          format: (v) => v ? this.status[v] : ''
        },
        { name: 'contactsCount', label: 'Qtd. Contatos', field: 'contactsCount', align: 'center' },
        { name: 'pendentesEnvio', label: 'À Enviar', field: 'pendentesEnvio', align: 'center' },
        { name: 'pendentesEntrega', label: 'À Entregar', field: 'pendentesEntrega', align: 'center' },
        { name: 'recebidas', label: 'Recebidas', field: 'recebidas', align: 'center' },
        { name: 'lidas', label: 'Lidas', field: 'lidas', align: 'center' },
        { name: 'acoes', label: 'Ações', field: 'acoes', align: 'center' }
      ],
      status: {
        pending: 'Pendente',
        scheduled: 'Programada',
        processing: 'Processando',
        canceled: 'Cancelada',
        finished: 'Finalizada'
      }
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
    async listarCampanhas () {
      const { data } = await ListarCampanhas()
      this.campanhas = data
    },
    isValidDate (v) {
      return startOfDay(new Date(parseISO(v))).getTime() >= startOfDay(new Date()).getTime()
    },
    campanhaCriada (campanha) {
      this.listarCampanhas()
    },
    campanhaEditada (campanha) {
      this.listarCampanhas()
    },
    editarCampanha (campanha) {
      if (campanha.status !== 'pending' && campanha.status !== 'canceled') {
        this.$notificarErro('Só é permitido editar campanhas que estejam pendentes ou canceladas.')
      }
      this.campanhaEdicao = {
        ...campanha,
        start: campanha.start, // format(parseISO(campanha.start), 'yyyy-MM-dd'),
        end: campanha.start // format(parseISO(campanha.start), 'yyyy-MM-dd')
      }
      this.modalCampanha = true
    },
    deletarCampanha (campanha) {
      // if (campanha.status !== 'pending' && campanha.status !== 'canceled' && campanha.contactsCount) {
      //   this.$notificarErro('Só é permitido deletar campanhas que estejam pendentes ou canceladas e não possuam contatos vinculados.')
      // }
      this.$q.dialog({
        title: 'Atenção!!',
        message: `Deseja realmente deletar a Campanha "${campanha.name}"?`,
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
        DeletarCampanha(campanha)
          .then(res => {
            let newCampanhas = [...this.campanhas]
            newCampanhas = newCampanhas.filter(f => f.id !== campanha.id)
            this.campanhas = [...newCampanhas]
            this.$notificarSucesso(`Campanha ${campanha.tag} deletada!`)
          })
        this.loading = false
      })
    },
    contatosCampanha (campanha) {
      this.$router.push({
        name: 'contatos-campanha',
        params: {
          campanhaId: campanha.id,
          campanha
        }
      })
    },
    cancelarCampanha (campanha) {
      this.$q.dialog({
        title: 'Atenção!!',
        message: `Deseja realmente deletar a Campanha "${campanha.name}"?`,
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
        CancelarCampanha(campanha.id)
          .then(res => {
            this.$notificarSucesso('Campanha cancelada.')
            this.listarCampanhas()
          }).catch(err => {
            this.$notificarErro('Não foi possível cancelar a campanha.', err)
          })
      })
    },
    iniciarCampanha (campanha) {
      if (!this.isValidDate(campanha.start)) {
        this.$notificarErro('Não é possível programar campanha com data menor que a atual')
      }

      if (campanha.contactsCount == 0) {
        this.$notificarErro('Necessário ter contatos vinculados para programar a campanha.')
      }

      if (campanha.status !== 'pending' && campanha.status !== 'canceled') {
        this.$notificarErro('Só é permitido programar campanhas que estejam pendentes ou canceladas.')
      }

      IniciarCampanha(campanha.id).then(res => {
        this.$notificarSucesso('Campanha iniciada.')
        this.listarCampanhas()
      }).catch(err => {
        this.$notificarErro('Não foi possível iniciar a campanha.', err)
      })
    }
  },
  mounted () {
    this.listarCampanhas()
    this.userProfile = localStorage.getItem('profile')
    this.loadColors()
  }
}

</script>

<style lang="scss" scoped>
</style>
