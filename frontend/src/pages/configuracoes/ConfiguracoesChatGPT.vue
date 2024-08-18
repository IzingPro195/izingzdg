<template>
  <div v-if="userProfile === 'admin'">
    <q-list class="text-weight-medium">

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Ativar integração com ChatGPT</q-item-label>
          <q-item-label caption> Quando ativo, o sistema consumirá informações do ChatGPT. </q-item-label>
        </q-item-section>

        <q-item-section avatar>
          <q-toggle
            v-model="chatgpt"
            false-value="disabled"
            true-value="enabled"
            checked-icon="check"
            keep-color
            :color="chatgpt === 'enabled' ? 'green' : 'negative'"
            size="md"
            unchecked-icon="clear"
            @input="atualizarConfiguracao('chatgpt')"
          />
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Ativar integração com ChatGPT para todos os atendimentos por Padrão</q-item-label>
          <q-item-label caption> Quando ativo, o sistema consumirá informações do ChatGPT em todos os atendimentos </q-item-label>
        </q-item-section>

        <q-item-section avatar>
          <q-toggle
            v-model="chatgptAllTickets"
            false-value="disabled"
            true-value="enabled"
            checked-icon="check"
            keep-color
            :color="chatgptAllTickets === 'enabled' ? 'green' : 'negative'"
            size="md"
            unchecked-icon="clear"
            @input="atualizarConfiguracao('chatgptAllTickets')"
          />
        </q-item-section>
      </q-item>

      <!-- <div class="row q-px-md" v-if="chatgpt === 'enabled'">
        <div class="col-12">
          <q-input
            v-model="chatgptApiKey"
            type="textarea"
            autogrow
            dense
            outlined
            label="API Key OpenAI:"
            input-style="min-height: 6vh; max-height: 9vh;"
            debounce="700"
            @input="atualizarConfiguracao('chatgptApiKey')"
          />
        </div>
      </div> -->

      <!-- <div class="row q-px-md" v-if="chatgpt === 'enabled'">
        <div class="col-12">
          <q-input
            v-model="chatgptPrompt"
            type="textarea"
            autogrow
            dense
            outlined
            label="Prompt de Atendimento"
            input-style="min-height: 6vh; max-height: 9vh;"
            debounce="700"
            @input="atualizarConfiguracao('chatgptPrompt')"
          />
        </div>
      </div> -->

      <!-- <div class="row q-px-md" v-if="chatgpt === 'enabled'">
        <div class="col-12">
          <q-input
            v-model="chatgptOrganizationId"
            type="textarea"
            autogrow
            dense
            outlined
            label="ID da Organização:"
            input-style="min-height: 6vh; max-height: 9vh;"
            debounce="700"
            @input="atualizarConfiguracao('chatgptOrganizationId')"
          />
        </div>
      </div>

      <div class="row q-px-md" v-if="chatgpt === 'enabled'">
        <div class="col-12">
          <q-input
            v-model="chatgptOff"
            type="textarea"
            autogrow
            dense
            outlined
            label="Palavra para desligar o ChatGPT:"
            input-style="min-height: 6vh; max-height: 9vh;"
            debounce="700"
            @input="atualizarConfiguracao('chatgptOff')"
          />
        </div>
      </div> -->

      <!-- <div class="row q-px-md" v-if="chatgpt === 'enabled'">
        <div class="col-12">
          <q-input
            v-model="chatgptExpire"
            type="textarea"
            autogrow
            dense
            outlined
            label="Tempo de expiração do ChatGpt:"
            input-style="min-height: 6vh; max-height: 9vh;"
            debounce="700"
            @input="atualizarConfiguracao('chatgptExpire')"
          />
        </div>
      </div> -->
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
      chatgpt: null,
      chatgptApiKey: '',
      chatgptOrganizationId: '',
      chatgptOff: '',
      chatgptExpire: '',
      chatgptPrompt: '',
      chatgptAllTickets: null
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
