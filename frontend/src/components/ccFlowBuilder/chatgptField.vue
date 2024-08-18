<template>
  <div>
    <q-card flat
      class="q-pa-sm q-pb-md">
      <q-card-section class="q-pa-none">
        <div class="flex flex-inline full-width items-center">
          <div class="flex flex-inline text-left"
            style="width: 40px">
          </div>
          <textarea ref="inputEnvioMensagem"
            style="min-height: 10vh; max-height: 30vh; flex: auto"
            class="q-pa-sm bg-white"
            placeholder="Digite a API Key do ChatGpt"
            autogrow
            dense
            outlined
            @input="(v) => $attrs.element.data.chatgptApiKey = v.target.value"
            :value="$attrs.element.data.chatgptApiKey">
          </textarea>
        </div>
        <div class="flex flex-inline full-width items-center">
          <div class="flex flex-inline text-left"
            style="width: 40px">
          </div>
          <textarea ref="inputEnvioMensagem"
            style="min-height: 10vh; max-height: 30vh; flex: auto"
            class="q-pa-sm bg-white"
            placeholder="Digite a ID da Organização"
            autogrow
            dense
            outlined
            @input="(v) => $attrs.element.data.chatgptOrgId = v.target.value"
            :value="$attrs.element.data.chatgptOrgId">
          </textarea>
        </div>
        <div class="flex flex-inline full-width items-center">
          <div class="flex flex-inline text-left"
            style="width: 40px">
          </div>
          <textarea ref="inputEnvioMensagem"
            style="min-height: 10vh; max-height: 30vh; flex: auto"
            class="q-pa-sm bg-white"
            placeholder="Palavra Chave para Desligar o ChatGpt"
            autogrow
            dense
            outlined
            @input="(v) => $attrs.element.data.chatgptOff = v.target.value"
            :value="$attrs.element.data.chatgptOff">
          </textarea>
        </div>
        <div class="flex flex-inline full-width items-center">
          <div class="flex flex-inline text-left"
            style="width: 40px">
          </div>
          <textarea ref="inputEnvioMensagem"
            style="min-height: 10vh; max-height: 30vh; flex: auto"
            class="q-pa-sm bg-white"
            placeholder="Prompt para o ChatGpt"
            autogrow
            dense
            outlined
            @input="(v) => $attrs.element.data.chatgptPrompt = v.target.value"
            :value="$attrs.element.data.chatgptPrompt">
          </textarea>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>

export default {
  name: 'ChatGPTField',
  data () {
    return {

    }
  },
}
</script>

<style lang="scss" scoped>

</style>
