<template>
  <div class="text-caption text-center q-pa-sm" v-if="asaas === true">
    Fatura:
    <q-badge align="middle"
      color="primary">
      {{ statusTexto  }}
    </q-badge>
  </div>
</template>
<script>
const usuario = JSON.parse(localStorage.getItem('usuario'))
import { ListarTenantPorId, ListarTenantPorAsaas } from 'src/service/tenants'
export default {
  name: 'PaymentStatus',
  data() {
    return {
      userProfile: 'user',
      usuario,
      pagamento: null,
      loading: false, 
      asaas: false
    }
  },
  computed: {
    statusTexto() {
      switch (this.pagamento) {
        case 'PENDING':
          return 'Pendente';
        case 'RECEIVED':
          return 'Recebido';
        case 'OVERDUE':
          return 'Vencido';
        default:
          return 'Status Desconhecido';
      }
    }
  },
  methods: {
    async listarTenantPorId(){
      this.loading = true; 
      const { data } = await ListarTenantPorId(this.usuario.tenantId)
      if (data[0].asaas === 'enabled'){
        this.asaas = true
        try{
          const { data } = await ListarTenantPorAsaas(this.usuario.tenantId)
          this.pagamento = data.data[0].status; 
          console.log()
          this.loading = false; 
        } catch(e){
          console.log('Não foi possível listar as opções de pagamento')
          this.loading = false; 
        }
      } else{
        this.asaas = false
        this.loading = false; 
      }
    },
  },
  async mounted() {
    await this.listarTenantPorId()
    this.userProfile = localStorage.getItem('profile')
  },
}
</script>
<style>

</style>
