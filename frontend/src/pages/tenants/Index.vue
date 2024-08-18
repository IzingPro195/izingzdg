<template>
  <div>
    <q-table
      flat
      bordered
      square
      hide-bottom
      class="my-sticky-dynamic q-ma-lg"
      title="Tenants"
      :data="tenants"
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
          @click="tenantEdicao = {}; modalTenant = true"
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
            @click="editarTenant(props.row)"
          />
          <q-btn
            flat
            round
            icon="mdi-delete"
            @click="deletarTenant(props.row)"
          />
        </q-td>
      </template>
      <template v-slot:body-cell-status="props">
      <q-td :class="getColClass(props.row)">
        {{ formatStatus(props.row.status) }}
      </q-td>
    </template>
    </q-table>
    <ModalTenant
      :modalTenant.sync="modalTenant"
      :tenantEdicao.sync="tenantEdicao"
      @modal-tenant:criada="tenantCriada"
      @modal-tenant:editada="tenantEditada"
    />
  </div>
</template>

<script>
import { DeletarTenant, ListarTenants } from 'src/service/tenants'
import { MostrarCores } from 'src/service/empresas';
import ModalTenant from './ModalTenant'
export default {
  name: 'Tenants',
  components: {
    ModalTenant
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
      tenantEdicao: {},
      modalTenant: false,
      tenants: [],
      pagination: {
        rowsPerPage: 40,
        rowsNumber: 0,
        lastIndex: 0
      },
      loading: false,
      columns: [
        { name: 'id', label: '#', field: 'id', align: 'left' },
        { name: 'status', label: 'Status', field: 'status', align: 'left', format: val => this.formatStatus(val) },
        // { name: 'ownerId', label: 'Usuário Admin', field: 'ownerId', align: 'center' },
        { name: 'name', label: 'Nome', field: 'name', align: 'center' },
        { name: 'maxUsers', label: 'Limite de Usuário', field: 'maxUsers', align: 'center' },
        { name: 'maxConnections', label: 'Limite de Conexão', field: 'maxConnections', align: 'center' },
        { name: 'asaas', label: 'Asaas Ativo', field: 'asaas', align: 'center', format: val => this.formatAsaasStatus(val) },
        { name: 'asaasToken', label: 'Token Asaas', field: 'asaasToken', align: 'center', format: val => val && val.length > 20 ? `${val.substring(0, 20)}...` : val },
        { name: 'asaasCustomerId', label: 'CustomerID Asaas', field: 'asaasCustomerId', align: 'center' },
        { name: 'identity', label: 'Identidade', field: 'identity', align: 'center' },
        { name: 'trial', label: 'Teste', field: 'trial', align: 'center', format: val => this.formatTrialStatus(val) },
        { name: 'trialPeriod', label: 'Tempo de Teste', field: 'trialPeriod', align: 'center' },
        // { name: 'metaToken', label: 'Token WABA Meta', field: 'metaToken', align: 'center', format: val => val && val.length > 20 ? `${val.substring(0, 20)}...` : val  },
        // { name: 'bmToken', label: 'Token Business Manager', field: 'bmToken', align: 'center', format: val => val && val.length > 20 ? `${val.substring(0, 20)}...` : val  },
        { name: 'createdAt', label: 'Data', field: 'createdAt', align: 'center' },
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
    getColClass(row) {
      return row.status === 'active' ? 'bg-active' : 'bg-inactive';
    },
    formatStatus(value) {
      return value === 'active' ? 'Ativo' : 'Inativo';
    },
    formatAsaasStatus(value) {
      return value === 'enabled' ? 'Ativo' : 'Inativo';
    },
    formatTrialStatus(value) {
      return value === 'enabled' ? 'Ativo' : 'Inativo';
    },
    async listarTenants () {
      const { data } = await ListarTenants()
      this.tenants = data
    },
    tenantCriada (tenant) {
      const newTenants = [...this.tenants]
      newTenants.push(tenant)
      this.tenants = [...newTenants]
    },
    tenantEditada (tenant) {
      const newTenants = [...this.tenants]
      const idx = newTenants.findIndex(f => f.id === tenant.id)
      if (idx > -1) {
        newTenants[idx] = tenant
      }
      this.tenants = [...newTenants]
    },
    editarTenant (tenant) {
      this.tenantEdicao = { ...tenant }
      this.modalTenant = true
    },
    deletarTenant(tenant) {
      if(tenant.id === 1){
        this.$q.dialog({
          title: 'Atenção!!',
          message: `Não é posível deletar o tenant ${tenant.id}!`,
        })
      return
      }
      this.$q.dialog({
        title: 'Atenção!!',
        message: `Deseja realmente deletar o Tenant "${tenant.id}"?`,
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
        DeletarTenant(tenant)
          .then(res => {
            let newTenants = [...this.tenants]
            newTenants = newTenants.filter(f => f.id !== tenant.id)

            this.tenants = [...newTenants]
            this.$q.notify({
              type: 'positive',
              progress: true,
              position: 'top',
              message: `Tenant ${tenant.id} deletado!`,
              actions: [{
                icon: 'close',
                round: true,
                color: 'white'
              }]
            })
          })
          .catch(error => {
            console.log(error.data.error)
            this.$q.notify({
              type: 'negative',
              progress: true,
              position: 'top',
              message: `Erro ao deletar o tenant: ${error.data.error || error}`,
              actions: [{
                icon: 'close',
                round: true,
                color: 'white'
              }]
            })
          })
          .finally(() => {
            this.loading = false
          })
      })
    }
  },
  mounted () {
    this.listarTenants()
    this.loadColors()
  }
}
</script>

<style lang="scss" scoped>
.bg-active {
  background-color: #21BA45;
}

.bg-inactive {
  background-color: #C10015;
}
</style>
