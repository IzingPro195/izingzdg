<template>
  <div v-if="userProfile === 'admin'">
    <q-list class="text-weight-medium">

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Ativar Dialogflow</q-item-label>
          <q-item-label caption> Quando ativo, o sistema consumirá o fluxo do Dialogflow. </q-item-label>
        </q-item-section>

        <q-item-section avatar>
          <q-toggle
            v-model="dialogflow"
            false-value="disabled"
            true-value="enabled"
            checked-icon="check"
            keep-color
            :color="dialogflow === 'enabled' ? 'green' : 'negative'"
            size="md"
            unchecked-icon="clear"
            @input="atualizarConfiguracao('dialogflow')"
          />
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Ativar integração com Dialogflow para todos os atendimentos por Padrão</q-item-label>
          <q-item-label caption> Quando ativo, o sistema consumirá informações do Dialogflow em todos os atendimentos </q-item-label>
        </q-item-section>

        <q-item-section avatar>
          <q-toggle
            v-model="dialogflowAllTickets"
            false-value="disabled"
            true-value="enabled"
            checked-icon="check"
            keep-color
            :color="dialogflowAllTickets === 'enabled' ? 'green' : 'negative'"
            size="md"
            unchecked-icon="clear"
            @input="atualizarConfiguracao('dialogflowAllTickets')"
          />
        </q-item-section>
      </q-item>

      <!-- <div class="row q-px-md" v-if="dialogflow === 'enabled'">
        <div class="col-12">
          <q-input
            v-model="dialogflowJsonFilename"
            type="textarea"
            autogrow
            dense
            outlined
            label="Nome do arquivo JSON:"
            input-style="min-height: 6vh; max-height: 9vh;"
            debounce="700"
            @input="atualizarConfiguracao('dialogflowJsonFilename')"
          />
        </div>
      </div>

      <div class="row q-px-md" v-if="dialogflow === 'enabled'">
        <div class="col-12">
          <q-input
            v-model="dialogflowJson"
            type="textarea"
            autogrow
            dense
            outlined
            label="Conteúdo do Json:"
            input-style="min-height: 6vh; max-height: 9vh;"
            debounce="700"
            @input="atualizarConfiguracao('dialogflowJson')"
          />
        </div>
      </div>

      <div class="row q-px-md" v-if="dialogflow === 'enabled'">
        <div class="col-12">
          <q-input
            v-model="dialogflowProjectId"
            type="textarea"
            autogrow
            dense
            outlined
            label="Project ID do Dialogflow:"
            input-style="min-height: 6vh; max-height: 9vh;"
            debounce="700"
            @input="atualizarConfiguracao('dialogflowProjectId')"
          />
        </div>
      </div>

      <div class="row q-px-md" v-if="dialogflow === 'enabled'">
        <div class="col-12">
          <q-input
            v-model="dialogflowLanguage"
            type="textarea"
            autogrow
            dense
            outlined
            label="Linguagem do Dialogflow:"
            input-style="min-height: 6vh; max-height: 9vh;"
            debounce="700"
            @input="atualizarConfiguracao('dialogflowLanguage')"
          />
        </div>
      </div>

      <div class="row q-px-md" v-if="dialogflow === 'enabled'">
        <div class="col-12">
          <q-input
            v-model="dialogflowOff"
            type="textarea"
            autogrow
            dense
            outlined
            label="Nome da intent para desligar o Dialogflow:"
            input-style="min-height: 6vh; max-height: 9vh;"
            debounce="700"
            @input="atualizarConfiguracao('dialogflowOff')"
          />
        </div>
      </div> -->

      <!-- <div class="row q-px-md" v-if="dialogflow === 'enabled'">
        <div class="col-12">
          <q-input
            v-model="dialogflowRestart"
            type="textarea"
            autogrow
            dense
            outlined
            label="Nome da intent para reiniciar o Dialogflow:"
            input-style="min-height: 6vh; max-height: 9vh;"
            debounce="700"
            @input="atualizarConfiguracao('dialogflowRestart')"
          />
        </div>
      </div>

      <div class="row q-px-md" v-if="dialogflow === 'enabled'">
        <div class="col-12">
          <q-input
            v-model="dialogflowExpire"
            type="textarea"
            autogrow
            dense
            outlined
            label="Tempo de expiração do Dialogflow:"
            input-style="min-height: 6vh; max-height: 9vh;"
            debounce="700"
            @input="atualizarConfiguracao('dialogflowExpire')"
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
      dialogflow: null,
      dialogflowJsonFilename: '',
      dialogflowJson: '',
      dialogflowProjectId: '',
      dialogflowLanguage: '',
      dialogflowOff: '',
      dialogflowAllTickets: null
      // dialogflowRestart: '',
      // dialogflowExpire: ''
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
