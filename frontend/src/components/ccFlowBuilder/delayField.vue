<template>
  <div>
    <q-card flat
      class="q-pa-sm q-pb-md">
      <q-card-section class="q-pa-none">
        <div class="flex flex-inline full-width items-center">
          <div class="flex flex-inline text-left"
            style="width: 40px">
          </div>
          <input ref="inputEnvioMensagem"
            type="number"
            style="height: 10vh; flex: auto"
            class="q-pa-sm bg-white"
            placeholder="Digite o valor do delay em segundos"
            autogrow
            dense
            outlined
            @input="(v) => $attrs.element.data.time = v.target.value"
            :value="$attrs.element.data.time">
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>

export default {
  name: 'DelayField',
  data () {
    return {

    }
  },
}
</script>

<style lang="scss" scoped>

</style>
