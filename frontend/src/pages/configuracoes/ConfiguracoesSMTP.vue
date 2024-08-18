<template>
  <div v-if="userProfile === 'admin'">
    <q-list class="text-weight-medium">

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Ativar SMTP</q-item-label>
          <q-item-label caption> Quando ativo, o sistema enviará informações para o e-mail do usuário. </q-item-label>
        </q-item-section>

        <q-item-section avatar>
          <q-toggle
            v-model="smtp"
            false-value="disabled"
            true-value="enabled"
            checked-icon="check"
            keep-color
            :color="smtp === 'enabled' ? 'green' : 'negative'"
            size="md"
            unchecked-icon="clear"
            @input="atualizarConfiguracao('smtp')"
          />
        </q-item-section>
      </q-item>

      <div class="row q-px-md" v-if="smtp === 'enabled'">
        <div class="col-12">
          <q-input
            v-model="emailHost"
            type="textarea"
            autogrow
            dense
            outlined
            label="Servidor do E-mail (Host):"
            input-style="min-height: 6vh; max-height: 9vh;"
            debounce="700"
            @input="atualizarConfiguracao('emailHost')"
          />
        </div>
      </div>

      <div class="row q-px-md" v-if="smtp === 'enabled'">
        <div class="col-12">
          <q-input
            v-model="emailPort"
            type="number"
            autogrow
            dense
            outlined
            label="Porta SMTP"
            input-style="min-height: 6vh; max-height: 9vh;"
            debounce="700"
            @input="atualizarConfiguracao('emailPort')"
          />
        </div>
      </div>

      <div class="row q-px-md" v-if="smtp === 'enabled'">
        <div class="col-12">
          <q-input
            v-model="emailUser"
            type="textarea"
            autogrow
            dense
            outlined
            label="Usuário do E-mail:"
            input-style="min-height: 6vh; max-height: 9vh;"
            debounce="700"
            @input="atualizarConfiguracao('emailUser')"
          />
        </div>
      </div>

      <div class="row q-px-md" v-if="smtp === 'enabled'">
        <div class="col-12">
          <q-input
            v-model="emailPass"
            type="password"
            autogrow
            dense
            outlined
            label="Senha do E-mail:"
            input-style="min-height: 6vh; max-height: 9vh;"
            debounce="700"
            @input="atualizarConfiguracao('emailPass')"
          />
        </div>
      </div>

      <q-item tag="label" v-ripple v-if="smtp === 'enabled'">
        <q-item-section>
          <q-item-label>Protocolo de Segurança</q-item-label>
          <q-item-label caption> Ativar protocolo seguro. </q-item-label>
        </q-item-section>

        <q-item-section avatar>
          <q-toggle
            v-model="emailSecure"
            false-value="false"
            true-value="true"
            checked-icon="check"
            keep-color
            :color="emailSecure === 'true' ? 'green' : 'negative'"
            size="md"
            unchecked-icon="clear"
            @input="atualizarConfiguracao('emailSecure')"
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
      smtp: null,
      emailHost: '',
      emailPort: '',
      emailSecure: '',
      emailUser: '',
      emailPass: ''
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
