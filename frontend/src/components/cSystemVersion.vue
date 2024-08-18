<template>
  <div class="text-caption text-center q-pa-sm">
    <q-badge align="middle"
      color="primary">
      Versão: {{ cVersion }}
    </q-badge>
  </div>
</template>
<script>
import packageEnv from 'src/../package.json'
export default {
  name: 'SystemVersion',
  computed: {
    cVersion () {
      return packageEnv.version
    }
  }
}
</script>
<style>

</style>
