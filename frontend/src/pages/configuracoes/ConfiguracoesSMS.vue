<template>
  <div v-if="userProfile === 'admin'">
    <q-list class="text-weight-medium">

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Crie uma conta em comtele.com.br e gera uma chave de API</q-item-label>
          <q-item-label caption> {{ montarUrlIntegração() }} </q-item-label>
        </q-item-section>
          <q-tooltip content-class="bg-negative text-bold">
            SMS
          </q-tooltip>
      </q-item>

      <div class="row q-px-md">
        <div class="col-12" style="margin-top: 20px;">
          <q-input
            v-model="smsToken"
            type="textarea"
            autogrow
            dense
            outlined
            label="Sua Chave de API Comtele"
            input-style="min-height: 6vh; max-height: 9vh;"
            debounce="700"
            @input="alterarSMSToken()"
          />
        </div>
      </div>

    </q-list>
  </div>
</template>

<script>
const usuario = JSON.parse(localStorage.getItem('usuario'))
import { ListarTenantPorId, AlterarTenantSMSToken } from 'src/service/tenants'
import { defineComponent } from 'vue'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export default defineComponent({
  name: 'IndexConfiguracoes',
  data() {
    return {
      usuario,
      smsToken: '',
      webhookChecked: '',
      loading: false,
      userProfile: 'user'
    }
  },
  computed: {
    cBaseUrlIntegração () {
      return `https://sms.comtele.com.br/account/apiconfig`
    }
  },
  methods: {
    formatarDataBrasil(data) {
      const dataObjeto = new Date(data);
      return format(dataObjeto, 'dd/MM/yyyy HH:mm:ss', { locale: ptBR });
    },
    montarUrlIntegração() {
      return `${this.cBaseUrlIntegração}/${this.usuario.tenantId}`
    },
    formatarData(data) {
      const dataFormatada = new Date(data);
      return dataFormatada.toLocaleDateString('pt-BR');
    },
    async alterarSMSToken(){
      try {
        await AlterarTenantSMSToken({
          id: this.usuario.tenantId,
          smsToken: this.smsToken,
        })
        this.$q.notify({
          type: 'positive',
          message: 'Configuração alterada!',
          progress: true,
          actions: [{ icon: 'close', round: true, color: 'white' }],
        })
      } catch (error) {
        console.error('error - AlterarConfiguracao', error)
        this.$notificarErro('Ocorreu um erro!', error)
      } 
    },
    async listarTenantPorId(){
      this.loading = true; 
      const { data } = await ListarTenantPorId(this.usuario.tenantId)
      this.smsToken = data[0].smsToken
      this.webhookChecked = data[0].webhookChecked
    },
  },
  async mounted() {
    await this.listarTenantPorId()
    this.userProfile = localStorage.getItem('profile')
  },
})
</script>
