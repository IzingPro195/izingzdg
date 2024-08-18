<template>
  <div v-if="userProfile === 'superadmin'">
    <q-table flat
      bordered
      square
      hide-bottom
      class="my-sticky-dynamic q-ma-lg"
      title="TenantApis"
      :data="tenantApis"
      :columns="columns"
      :loading="loading"
      row-key="id"
      :pagination.sync="pagination"
      :rows-per-page-options="[0]">
      <template v-slot:top-right>
        <q-btn color="primary"
          label="Adicionar"
          @click="tenantApiEdicao = {}; modalTenantApi = true" />
      </template>
      <template v-slot:body-cell-acoes="props">
        <q-td class="text-center">
          <q-btn flat
            round
            icon="edit"
            @click="editarTenantApi(props.row)" />
          <q-btn flat
            round
            icon="mdi-delete"
            @click="deletarTenantApi(props.row)" />
        </q-td>
      </template>
    </q-table>
    <div>
      <q-card class="q-ma-md">
        <q-card-section>
          <q-item-label style="word-break: break-all;">
            <h3 class="text-weight-medium text-nowrap q-pr-md">
              <span class="text-bold">Rota para criação de um novo tenant via API:</span>
            </h3>
            <pre><b>Endpoint:</b> {{ montarUrlIntegração() }}</pre>
            <pre><b>Bearer Token:</b> Api Token</pre>
            <pre><b>Body:</b> </pre>
            <pre>
{
  "status": "active",
  "name": "Empresa Exemplo",
  "maxUsers": 3,
  "maxConnections": 3,
  "acceptTerms": true,
  "email": "user@example.com",
  "password": "securePassword123!",
  "userName": "Pedro Bastos",
  "identity": "07122255533"
  "profile": "admin",
  "trial": "enabled",
  "trialPeriod": 3
}
            </pre>
          </q-item-label>
        </q-card-section>
      </q-card>
    </div>
    <div>
      <q-card class="q-ma-md">
        <q-card-section>
          <q-item-label style="word-break: break-all;">
            <h3 class="text-weight-medium text-nowrap q-pr-md">
              <span class="text-bold">Rota para ativação/desativação de um novo tenant via API:</span>
            </h3>
            <pre><b>Endpoint:</b> {{ montarUrlIntegraçãoStatus() }}</pre>
            <pre><b>Bearer Token:</b> Api Token</pre>
            <pre><b>Body:</b> </pre>
            <pre>
{
  "status": "active",
  "identity": "07122989674"
}
            </pre>
          </q-item-label>
        </q-card-section>
      </q-card>
    </div>
    <ModalTenantApi :modalTenantApi.sync="modalTenantApi"
      :tenantApiEdicao.sync="tenantApiEdicao"
      @modal-tenantApi:criada="tenantApiCriada"
      @modal-tenantApi:editada="tenantApiEditada" />
  </div>
</template>

<script>
import { DeletarApiTenant, ListarApisTenant } from 'src/service/tenantApi'
import ModalTenantApi from './ModalTenantApi'
import { MostrarCores } from 'src/service/empresas';
export default {
  name: 'TenantApis',
  components: {
    ModalTenantApi
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
      tenantApiEdicao: {},
      modalTenantApi: false,
      tenantApis: [],
      pagination: {
        rowsPerPage: 40,
        rowsNumber: 0,
        lastIndex: 0
      },
      loading: false,
      columns: [
        { name: 'id', label: '#', field: 'id', align: 'left' },
        { name: 'apiToken', label: 'Api Token', field: 'apiToken', align: 'left' },
        { name: 'acoes', label: 'Ações', field: 'acoes', align: 'center' }
      ]
    }
  },
  computed: {
    cBaseUrlIntegração () {
      return `${process.env.URL_API}/tenantApiStoreTenant`
    },
    cBaseUrlIntegraçãoStatus () {
      return `${process.env.URL_API}/tenantApiUpdateTenant`
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
    montarUrlIntegração (id) {
      return `${this.cBaseUrlIntegração}`
    },
    montarUrlIntegraçãoStatus (id) {
      return `${this.cBaseUrlIntegraçãoStatus}`
    },
    async listarTenantApis () {
      const { data } = await ListarApisTenant()
      this.tenantApis = data.tenantApi
    },
    tenantApiCriada (tenantApi) {
      const newTenantApis = [...this.tenantApis]
      newTenantApis.push(tenantApi)
      this.tenantApis = [...newTenantApis]
    },
    tenantApiEditada (tenantApi) {
      const newTenantApis = [...this.tenantApis]
      const idx = newTenantApis.findIndex(f => f.id === tenantApi.id)
      if (idx > -1) {
        newTenantApis[idx] = tenantApi
      }
      this.tenantApis = [...newTenantApis]
    },
    editarTenantApi (tenantApi) {
      this.tenantApiEdicao = { ...tenantApi }
      this.modalTenantApi = true
    },
    deletarTenantApi (tenantApi) {
      this.$q.dialog({
        title: 'Atenção!!',
        message: `Deseja realmente deletar a TenantApi "${tenantApi.id}"?`,
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
        DeletarApiTenant(tenantApi)
          .then(res => {
            let newTenantApis = [...this.tenantApis]
            newTenantApis = newTenantApis.filter(f => f.id !== tenantApi.id)

            this.tenantApis = [...newTenantApis]
            this.$q.notify({
              type: 'positive',
              progress: true,
              position: 'top',
              message: `TenantApi ${tenantApi.apiToken} deletada!`,
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
    this.listarTenantApis()
    this.userProfile = localStorage.getItem('profile')
    this.loadColors()
  }
}
</script>

<style lang="scss" scoped>
</style>
