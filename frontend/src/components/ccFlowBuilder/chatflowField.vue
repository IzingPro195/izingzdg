<template>
  <div>
    <q-card flat
      class="q-pa-sm q-pb-md">
      <q-card-section class="q-pa-none">
        <div class="flex flex-inline full-width items-center">
          <div class="flex flex-inline text-left"
            style="width: 40px">
          </div>
          <q-select
            ref="inputEnvioMensagem"
            style="height: 10vh; flex: auto"
            square
            borderless
            :value="$attrs.element.data.chatFlow"
            class="q-pa-sm bg-white"
            autogrow
            dense
            outlined
            emit-value
            @input="(v) => $attrs.element.data.chatFlow = v"
            :options="listachatFlow.map(chatFlow => ({label: chatFlow.name, value: chatFlow.id}))"
          />
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { ListarChatFlow } from 'src/service/chatFlow'

export default {
  name: 'ChatFlowField',
  data () {
    return {
      listachatFlow: []
    }
  },
  mounted() {
    this.listarChatFlow();
  },
  methods: {
    async listarChatFlow () {
      try {
        const { data } = await ListarChatFlow()
        this.listachatFlow = data.chatFlow
      } catch (error) {
        console.error('Erro ao buscar flows:', error);
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
