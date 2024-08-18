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
            :value="$attrs.element.data.kanban"
            class="q-pa-sm bg-white"
            autogrow
            dense
            outlined
            emit-value
            @input="(v) => $attrs.element.data.kanban = v"
            :options="kanbans.map(kanban => ({label: kanban.name, value: kanban.id}))"
          />
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { ListarKanbans } from 'src/service/kanban'

export default {
  name: 'KanbanField',
  data () {
    return {
      kanbans: []
    }
  },
  mounted() {
    this.listarKanbans();
  },
  methods: {
    async listarKanbans () {
      try{
        const { data } = await ListarKanbans()
        this.kanbans = data.kanban
        return data.kanban;
      } catch(e){
        console.error('Erro ao buscar kanbans:', error);
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
