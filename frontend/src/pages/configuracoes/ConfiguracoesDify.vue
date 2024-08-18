<template>
  <div v-if="userProfile === 'admin'">
    <q-list class="text-weight-medium">

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Ativar integração com Dify (Beta)</q-item-label>
          <q-item-label caption> Quando ativo, o sistema consumirá informações do Dify. </q-item-label>
        </q-item-section>

        <q-item-section avatar>
          <q-toggle
            v-model="dify"
            false-value="disabled"
            true-value="enabled"
            checked-icon="check"
            keep-color
            :color="dify === 'enabled' ? 'green' : 'negative'"
            size="md"
            unchecked-icon="clear"
            @input="atualizarConfiguracao('dify')"
          />
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Ativar integração com Dify para todos os atendimentos por Padrão</q-item-label>
          <q-item-label caption> Quando ativo, o sistema consumirá informações do Dify em todos os atendimentos </q-item-label>
        </q-item-section>

        <q-item-section avatar>
          <q-toggle
            v-model="difyAllTickets"
            false-value="disabled"
            true-value="enabled"
            checked-icon="check"
            keep-color
            :color="difyAllTickets === 'enabled' ? 'green' : 'negative'"
            size="md"
            unchecked-icon="clear"
            @input="atualizarConfiguracao('difyAllTickets')"
          />
        </q-item-section>
      </q-item>

    </q-list>
  </div>
</template>

<script>
import { AlterarConfiguracao, ListarConfiguracoes } from 'src/service/configuracoes'

import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IndexConfiguracoes',
  data() {
    return {
      userProfile: 'user',
      configuracoes: [],
      dify: null,
      // chatgptApiKey: '',
      // chatgptOrganizationId: '',
      // chatgptOff: '',
      // chatgptExpire: '',
      // chatgptPrompt: '',
      difyAllTickets: null
    }
  },
  methods: {
    async listarConfiguracoes() {
      const { data } = await ListarConfiguracoes()
      this.configuracoes = data
      this.configuracoes.forEach((el) => {
        let value = el.value
        this.$data[el.key] = value
      })
    },
    async atualizarConfiguracao(key) {
      const params = { key, value: this.$data[key] }
      try {
        await AlterarConfiguracao(params)
        this.$q.notify({
          type: 'positive',
          message: 'Configuração alterada!',
          progress: true,
          actions: [{ icon: 'close', round: true, color: 'white' }],
        })
      } catch (error) {
        console.error('error - AlterarConfiguracao', error)
        this.$data[key] = this.$data[key] === 'enabled' ? 'disabled' : 'enabled'
        this.$notificarErro('Ocorreu um erro!', error)
      }
    },
  },
  async mounted() {
    await this.listarConfiguracoes()
    this.userProfile = localStorage.getItem('profile')
  },
})
</script>