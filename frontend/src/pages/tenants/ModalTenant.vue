<template>
  <q-dialog
    persistent
    :value="modalTenant"
    @hide="fecharModal"
    @show="abrirModal"
  >
    <q-card
      style="width: 500px"
      class="q-pa-lg"
    >
      <q-card-section>
        <div class="text-h6">{{ tenantEdicao.id ? 'Editar': 'Criar' }} Tenant</div>
      </q-card-section>
      <q-card-section>
        <q-toggle
          v-model="toggleStatus"
          :label="toggleStatus ? 'Ativo' : 'Inativo'"
          color="primary"
        />
        <!-- <q-input
          class="row col"
          square
          outlined
          type="number"
          v-model="tenant.ownerId"
          label="ID do Admin"
        /> -->
        <q-input
          class="row col"
          square
          outlined
          v-model="tenant.name"
          label="Nome"
        />
        <q-input
          class="row col"
          square
          outlined
          type="number"
          v-model="tenant.maxUsers"
          label="Usuários"
        />
        <q-input
          class="row col"
          square
          outlined
          type="number"
          v-model="tenant.maxConnections"
          label="Conexões"
        />
        <q-input
          class="row col"
          square
          outlined
          type="text"
          v-model="tenant.identity"
          label="Identidade"
        />
        <!-- <q-input
          class="row col"
          square
          outlined
          type="text"
          v-model="tenant.bmToken"
          label="WABA Meta Token"
        /> -->
        <!-- <q-input
          class="row col"
          square
          outlined
          type="number"
          v-model="tenant.asaas"
          label="Conexões"
        /> -->
        <br>
        <div class="text-h6">Trial</div>
        <q-toggle
          v-model="toggleTrial"
          :label="toggleTrial ? 'Ativo' : 'Inativo'"
          color="primary"
        />
        <q-input
          v-if="toggleTrial"
          class="row col"
          square
          outlined
          type="text"
          v-model="tenant.trialPeriod"
          label="Período"
        />
        <br>
        <div class="text-h6">Asaas</div>
        <q-toggle
          v-model="toggleAsaas"
          :label="toggleAsaas ? 'Ativo' : 'Inativo'"
          color="primary"
        />
        <q-input
          v-if="toggleAsaas"
          class="row col"
          square
          outlined
          type="text"
          v-model="tenant.asaasToken"
          label="Token Asaas"
        />
        <q-input
          v-if="toggleAsaas"
          class="row col"
          square
          outlined
          type="text"
          v-model="tenant.asaasCustomerId"
          label="CustomerID Asaas"
        />
      </q-card-section>
      <q-card-actions
        align="right"
        class="q-mt-md"
      >
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
          @click="validateAndHandleTenant"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>

</template>

<script>
import { CriarTenant, AlterarTenant } from 'src/service/tenants'
export default {
  name: 'ModalTenant',
  props: {
    modalTenant: {
      type: Boolean,
      default: false
    },
    tenantEdicao: {
      type: Object,
      default: () => {
        return { id: null }
      }
    }
  },
  data () {
    return {
      tenant: {
        id: null,
        status: 'active',
        // ownerId: null,
        name: null,
        maxUsers: null,
        maxConnections: null,
        asaas: null,
        asaasToken: null,
        asaasCustomerId: null,
        metaToken: null,
        bmToken: null,
        identity: null
      },
      toggleStatus: false,
      toggleAsaas: false,
      toggleTrial: false
    }
  },
  watch: {
    'tenant.status': function (newStatus) {
      this.toggleStatus = newStatus === 'active';
    },
    toggleStatus: function (newToggleStatus) {
      this.tenant.status = newToggleStatus ? 'active' : 'inactive';
    },
    'tenant.asaas': function (newAsaas) {
      this.toggleAsaas = newAsaas === 'enabled';
    },
    'tenant.trial': function (newTrial) {
      this.toggleTrial = newTrial === 'enabled';
    },
    toggleAsaas: function (newToggleAsaas) {
      this.tenant.asaas = newToggleAsaas ? 'enabled' : 'disabled';
    },
    toggleTrial: function (newToggleTrial) {
      this.tenant.trial = newToggleTrial ? 'enabled' : 'disabled';
    }
  },
  methods: {
    resetarTenant () {
      this.tenant = {
        id: null,
        status: null,
        // ownerId: null,
        name: null,
        maxUsers: null,
        maxConnections: null,
        asaas: null,
        asaasToken: null,
        asaasCustomerId: null,
        metaToken: null,
        bmToken: null
      }
    },
    fecharModal () {
      this.resetarTenant()
      this.$emit('update:tenantEdicao', { id: null })
      this.$emit('update:modalTenant', false)
    },
    abrirModal () {
      if (this.tenantEdicao.id) {
        this.tenant = { ...this.tenantEdicao }
        if(this.tenantEdicao.status === 'active'){
          this.toggleStatus = true
        }
        if(this.tenantEdicao.status === 'inactive'){
          this.toggleStatus = false
        }
      } else {
        this.resetarTenant()
      }
    },
    async handleTenant () {
      try {
        this.loading = true
        if (this.tenant.id === 1) {
          this.tenant.status = 'active'
          this.$q.notify({
            type: 'positive',
            progress: true,
            position: 'top',
            message: 'Não é possível desativar a Empresa 1!',
            actions: [{
              icon: 'close',
              round: true,
              color: 'white'
            }]
          })
        }
        if (this.tenant.id) {
          const { data } = await AlterarTenant(this.tenant)
          this.$emit('modal-tenant:editada', data)
          this.$q.notify({
            type: 'info',
            progress: true,
            position: 'top',
            textColor: 'black',
            message: 'Tenant editado!',
            actions: [{
              icon: 'close',
              round: true,
              color: 'white'
            }]
          })
        } else {
          const { data } = await CriarTenant(this.tenant)
          this.$emit('modal-tenant:criada', data)
          this.$q.notify({
            type: 'positive',
            progress: true,
            position: 'top',
            message: 'Tenant criado!',
            actions: [{
              icon: 'close',
              round: true,
              color: 'white'
            }]
          })
        }
        this.loading = false
        this.fecharModal()
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } catch (error) {
        console.error(error)
        this.$notificarErro('Ocorreu um erro ao criar o tenant', error)
      }
    },
    validateAndHandleTenant() {
      if (this.areRequiredFieldsFilled()) {
        this.handleTenant();
      } else {
        this.$q.notify({
          type: 'negative',
          position: 'top',
          message: 'Preencha todos os campos obrigatórios.',
        });
      }
    },

    areRequiredFieldsFilled() {
      return (
        this.tenant.name &&
        this.tenant.maxUsers !== null &&
        this.tenant.maxConnections !== null &&
        this.tenant.status !== null
      );
    },
  }

}
</script>

<style lang="scss" scoped>
</style>
