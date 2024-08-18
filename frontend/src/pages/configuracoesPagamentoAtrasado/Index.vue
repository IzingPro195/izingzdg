<template>
  <div>
    <q-list class="text-weight-medium">
      <!-- <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Informações sobre pagamento</q-item-label>
          <q-item-label caption> Fatura ASAAS </q-item-label>
        </q-item-section>
      </q-item> -->
      <q-table
      flat
      bordered
      square
      hide-bottom
      class="my-sticky-dynamic q-ma-lg"
      title="Avaliacoes"
      :data="pagamentos"
      :columns="columns"
      :loading="loading"
      row-key="id"
      :rows-per-page-options="[0]"
      >
        <template v-slot:top="props">
          <q-toolbar>
            <q-toolbar-title>
              Informações sobre pagamento
            </q-toolbar-title>
            <q-space></q-space>
          </q-toolbar>
        </template>
        <template v-slot:body-cell-dueDate="props">
          <q-td :props="props">
            {{ formatarData(props.row.dueDate) }}
          </q-td>
        </template>
        <template v-slot:body-cell-bankSlipUrl="props">
          <q-td :props="props">
            <a :href="props.row.bankSlipUrl" target="_blank">Link do Pagamento</a>
          </q-td>
        </template>
        <template v-slot:body-cell-status="props">
          <q-td :props="props">
            {{ props.row.status === 'PENDING' ? 'Pendente' : props.row.status === 'OVERDUE' ? 'Vencido' : props.row.status }}
          </q-td>
        </template>
      </q-table>

    </q-list>
  </div>
</template>

<script>
const usuario = JSON.parse(localStorage.getItem('usuario'))
import { ListarTenantPorId, ListarTenantPorAsaas } from 'src/service/tenants'
import { MostrarCores } from 'src/service/empresas';
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IndexConfiguracoes',
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
      usuario,
      pagamentos: [],
      columns: [
        { name: 'id', label: 'ID do Pagamento', field: 'id', align: 'left' },
        { name: 'status', label: 'Status', field: 'status', align: 'left' },
        { name: 'dueDate', label: 'Vencimento', field: 'dueDate', align: 'left' },
        { name: 'bankSlipUrl', label: 'Link para Pagamento', field: 'bankSlipUrl', align: 'left' }
      ],
      loading: false, 
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
    formatarData(data) {
      const dataFormatada = new Date(data);
      return dataFormatada.toLocaleDateString('pt-BR');
    },
    async listarTenantPorId(){
      this.loading = true; 
      const { data } = await ListarTenantPorId(this.usuario.tenantId)
      if (data[0].asaas === 'enabled'){
        try{
          const { data } = await ListarTenantPorAsaas(this.usuario.tenantId)
          this.pagamentos = data.data; 
          this.loading = false; 
        } catch(e){
          console.log('Não foi possível listar as opções de pagamento')
          this.loading = false; 
        }
      } else{
        this.loading = false; 
      }
    },
  },
  async mounted() {
    await this.listarTenantPorId()
    this.loadColors()
  },
})
</script>
