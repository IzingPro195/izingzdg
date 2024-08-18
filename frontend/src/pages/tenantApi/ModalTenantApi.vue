<template>
  <q-dialog
    persistent
    :value="modalTenantApi"
    @hide="fecharModal"
    @show="abrirModal"
  >
    <q-card
      style="width: 500px"
      class="q-pa-lg"
    >
      <q-card-section>
        <div class="text-h6">{{ tenantApiEdicao.id ? 'Editar': 'Criar' }} API Tenant</div>
      </q-card-section>
      <q-card-section>
        <q-input
          class="row col"
          square
          outlined
          v-model="tenantApi.apiToken"
          label="Token API"
        />
      </q-card-section>
      <q-card-actions
        align="right"
        class="q-mt-md"
      >
        <q-btn
          flat
          label="Gerar Token"
          color="warning"
          @click="gerarApiToken"
          class="q-mr-md"
        />
        <q-btn
          flat
          label="Cancelar"
          color="negative"
          v-close-popup
          class="q-mr-md"
        />
        <q-btn
          flat
          label="Salvar"
          color="primary"
          @click="handleTenantApi"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>

</template>

<script>
import { CriarApiTenant, AlterarApiTenant } from 'src/service/tenantApi'
import crypto from 'crypto' 
export default {
  name: 'ModalTenantApi',
  props: {
    modalTenantApi: {
      type: Boolean,
      default: false
    },
    tenantApiEdicao: {
      type: Object,
      default: () => {
        return { id: null }
      }
    }
  },
  data () {
    return {
      tenantApi: {
        id: null,
        apiToken: null,
      }
    }
  },
  methods: {
    gerarApiToken() {
      const length = 64;
      const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=';
      let token = '';
      const values = crypto.randomBytes(length);
      for (let i = 0; i < length; i++) {
        token += charset[values[i] % charset.length];
      }
      this.tenantApi.apiToken = token;
    },
    resetarTenantApi () {
      this.tenantApi = {
        id: null,
        apiToken: null,
      }
    },
    fecharModal () {
      this.resetarTenantApi()
      this.$emit('update:tenantApiEdicao', { id: null })
      this.$emit('update:modalTenantApi', false)
    },
    abrirModal () {
      if (this.tenantApiEdicao.id) {
        this.tenantApi = { ...this.tenantApiEdicao }
      } else {
        this.resetarTenantApi()
      }
    },
    async handleTenantApi () {
      try {
        this.loading = true
        if (this.tenantApi.id) {
          const { data } = await AlterarApiTenant(this.tenantApi)
          this.$emit('modal-tenantApi:editada', data)
          this.$q.notify({
            type: 'info',
            progress: true,
            position: 'top',
            textColor: 'black',
            message: 'Etapa editada!',
            actions: [{
              icon: 'close',
              round: true,
              color: 'white'
            }]
          })
        } else {
          const { data } = await CriarApiTenant(this.tenantApi)
          this.$emit('modal-tenantApi:criada', data)
          this.$q.notify({
            type: 'positive',
            progress: true,
            position: 'top',
            message: 'TenantApi criada!',
            actions: [{
              icon: 'close',
              round: true,
              color: 'white'
            }]
          })
        }
        this.loading = false
        this.fecharModal()
      } catch (error) {
        console.error(error)
        this.$notificarErro('Ocorreu um erro!', error)
      }
    }
  }

}
</script>

<style lang="scss" scoped>
</style>
