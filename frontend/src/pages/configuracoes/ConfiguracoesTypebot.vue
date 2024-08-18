<template>
  <div v-if="userProfile === 'admin'">
    <q-list class="text-weight-medium">

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Ativar Typebot</q-item-label>
          <q-item-label caption> Quando ativo, o sistema consumirá o fluxo do Typebot. </q-item-label>
        </q-item-section>

        <q-item-section avatar>
          <q-toggle
            v-model="typebot"
            false-value="disabled"
            true-value="enabled"
            checked-icon="check"
            keep-color
            :color="typebot === 'enabled' ? 'green' : 'negative'"
            size="md"
            unchecked-icon="clear"
            @input="atualizarConfiguracao('typebot')"
          />
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Ativar integração com Typebot para todos os atendimentos por Padrão</q-item-label>
          <q-item-label caption> Quando ativo, o sistema consumirá informações do Typebot em todos os atendimentos </q-item-label>
        </q-item-section>

        <q-item-section avatar>
          <q-toggle
            v-model="typebotAllTickets"
            false-value="disabled"
            true-value="enabled"
            checked-icon="check"
            keep-color
            :color="typebotAllTickets === 'enabled' ? 'green' : 'negative'"
            size="md"
            unchecked-icon="clear"
            @input="atualizarConfiguracao('typebotAllTickets')"
          />
        </q-item-section>
      </q-item>
<!-- 
      <div class="row q-px-md" v-if="typebot === 'enabled'">
        <div class="col-12">
          <q-input
            v-model="typebotUrl"
            type="textarea"
            autogrow
            dense
            outlined
            label="URL do Typebot:"
            input-style="min-height: 6vh; max-height: 9vh;"
            debounce="700"
            @input="atualizarConfiguracao('typebotUrl')"
          />
        </div>
      </div>

      <div class="row q-px-md" v-if="typebot === 'enabled'">
        <div class="col-12">
          <q-input
            v-model="typebotName"
            type="textarea"
            autogrow
            dense
            outlined
            label="Nome do Typebot:"
            input-style="min-height: 6vh; max-height: 9vh;"
            debounce="700"
            @input="atualizarConfiguracao('typebotName')"
          />
        </div>
      </div>

      <div class="row q-px-md" v-if="typebot === 'enabled'">
        <div class="col-12">
          <q-input
            v-model="typebotOff"
            type="textarea"
            autogrow
            dense
            outlined
            label="Palavra para desligar o Typebot:"
            input-style="min-height: 6vh; max-height: 9vh;"
            debounce="700"
            @input="atualizarConfiguracao('typebotOff')"
          />
        </div>
      </div>

      <div class="row q-px-md" v-if="typebot === 'enabled'">
        <div class="col-12">
          <q-input
            v-model="typebotRestart"
            type="textarea"
            autogrow
            dense
            outlined
            label="Palavra para reiniciar o Typebot:"
            input-style="min-height: 6vh; max-height: 9vh;"
            debounce="700"
            @input="atualizarConfiguracao('typebotRestart')"
          />
        </div>
      </div> -->

      <!-- <div class="row q-px-md" v-if="typebot === 'enabled'">
        <div class="col-12">
          <q-input
            v-model="typebotExpire"
            type="textarea"
            autogrow
            dense
            outlined
            label="Tempo de expiração do Typebot:"
            input-style="min-height: 6vh; max-height: 9vh;"
            debounce="700"
            @input="atualizarConfiguracao('typebotExpire')"
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
      typebot: null,
      typebotUrl: '',
      typebotName: '',
      typebotOff: '',
      typebotRestart: '',
      typebotExpire: '',
      typebotAllTickets: null
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
