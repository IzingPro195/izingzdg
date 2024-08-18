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
            placeholder="Digite a url do Typebot"
            autogrow
            dense
            outlined
            @input="(v) => $attrs.element.data.typebotUrl = v.target.value"
            :value="$attrs.element.data.typebotUrl">
          </textarea>
        </div>
        <div class="flex flex-inline full-width items-center">
          <div class="flex flex-inline text-left"
            style="width: 40px">
          </div>
          <textarea ref="inputEnvioMensagem"
            style="min-height: 10vh; max-height: 30vh; flex: auto"
            class="q-pa-sm bg-white"
            placeholder="Digite o nome do Typebot"
            autogrow
            dense
            outlined
            @input="(v) => $attrs.element.data.typebotName = v.target.value"
            :value="$attrs.element.data.typebotName">
          </textarea>
        </div>
        <div class="flex flex-inline full-width items-center">
          <div class="flex flex-inline text-left"
            style="width: 40px">
          </div>
          <textarea ref="inputEnvioMensagem"
            style="min-height: 10vh; max-height: 30vh; flex: auto"
            class="q-pa-sm bg-white"
            placeholder="Palavra Chave para Desligar o Typebot"
            autogrow
            dense
            outlined
            @input="(v) => $attrs.element.data.typebotOff = v.target.value"
            :value="$attrs.element.data.typebotOff">
          </textarea>
        </div>
        <div class="flex flex-inline full-width items-center">
          <div class="flex flex-inline text-left"
            style="width: 40px">
          </div>
          <textarea ref="inputEnvioMensagem"
            style="min-height: 10vh; max-height: 30vh; flex: auto"
            class="q-pa-sm bg-white"
            placeholder="Palavra Chave para reiniciar o Typebot"
            autogrow
            dense
            outlined
            @input="(v) => $attrs.element.data.typebotRestart = v.target.value"
            :value="$attrs.element.data.typebotRestart">
          </textarea>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>

export default {
  name: 'TypebotField',
  data () {
    return {

    }
  },
}
</script>

<style lang="scss" scoped>

</style>
