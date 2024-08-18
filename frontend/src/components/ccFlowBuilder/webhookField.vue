<template>
  <div>
    <q-card flat
      class="q-pa-sm q-pb-md">
      <q-card-section class="q-pa-none">
        <div class="flex flex-inline full-width items-center">
          <div class="flex flex-inline text-left"
            style="width: 40px">
            <q-btn round
              flat
              dense>
              <q-icon size="2em"
                name="mdi-variable" />
              <q-tooltip>
                Variáveis
              </q-tooltip>
              <q-menu touch-position>
                <q-list dense
                  style="min-width: 100px">
                  <q-item v-for="variavel in variaveis"
                    :key="variavel.label"
                    clickable
                    @click="onInsertSelectVariable(variavel.value)"
                    v-close-popup>
                    <q-item-section>{{ variavel.label }}</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </div>
          <textarea ref="inputEnvioMensagem"
            style="min-height: 10vh; max-height: 30vh; flex: auto"
            class="q-pa-sm bg-white"
            placeholder="Adicine o Webhook (GET)"
            autogrow
            dense
            outlined
            @input="(v) => $attrs.element.data.webhook = v.target.value"
            :value="$attrs.element.data.webhook">
          </textarea>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>

export default {
  name: 'WebhookField',
  data () {
    return {
      variaveis: [
        { label: 'Nome', value: '{{name}}' },
        { label: 'Saudação', value: '{{greeting}}' },
        { label: 'Protocolo', value: '{{protocol}}' },
        { label: 'E-mail (se existir)', value: '{{email}}' },
        { label: 'Telefone', value: '{{phoneNumber}}' },
        { label: 'Kanban', value: '{{kanban}}' },
        { label: 'Atendente', value: '{{user}}' },
        { label: 'E-mail Atendente', value: '{{userEmail}}' },
      ]
    }
  },
  methods: {
    onInsertSelectVariable (variable) {
      console.log('onInsertSelectVariable', variable)
      const self = this
      var tArea = this.$refs.inputEnvioMensagem
      // get cursor's position:
      var startPos = tArea.selectionStart,
        endPos = tArea.selectionEnd,
        cursorPos = startPos,
        tmpStr = tArea.value
      // filter:
      if (!variable) {
        return
      }
      // insert:
      self.txtContent = this.$attrs.element.data.webhook
      self.txtContent = tmpStr.substring(0, startPos) + variable + tmpStr.substring(endPos, tmpStr.length)
      this.$attrs.element.data.webhook = self.txtContent
      // move cursor:
      setTimeout(() => {
        tArea.selectionStart = tArea.selectionEnd = cursorPos + 1
      }, 10)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
