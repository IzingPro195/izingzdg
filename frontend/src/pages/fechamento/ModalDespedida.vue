<template>
  <q-dialog
    persistent
    :value="modalDespedida"
    @hide="fecharModal"
    @show="abrirModal"
  >
    <q-card
      style="width: 500px"
      class="q-pa-lg"
    >
      <q-card-section>
        <div class="text-h6">{{ despedidaEdicao.id ? 'Editar': 'Criar' }} Despedida</div>
      </q-card-section>
      <q-card-section>
        <q-input
          class="row col"
          square
          outlined
          style="margin-bottom: 15px;margin-right: 5px;"
          v-model="despedida.message"
          label="Despedida"
          autogrow
        />
      </q-card-section>
      <q-card-actions
        align="right"
        class="q-mt-md"
      >
        <q-btn
          flat
          label="Cancelar"
          color="negative"
          v-close-popup
          class="q-mr-md"
        />
        <q-btn
          flat
          label="Salvar"
          color="primary"
          @click="handleDespedida"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>

</template>

<script>
import { CriarDespedidaPrivada, AlterarDespedidaPrivada } from 'src/service/despedidaprivada'

export default {
  name: 'ModalDespedida',
  props: {
    modalDespedida: {
      type: Boolean,
      default: false
    },
    despedidaEdicao: {
      type: Object,
      default: () => {
        return { id: null }
      }
    }
  },
  data () {
    return {
      despedida: {
        id: null,
      }
    }
  },
  methods: {
    resetarDespedida () {
      this.despedida = {
        id: null
      }
    },
    fecharModal () {
      this.resetarDespedida()
      this.$emit('update:despedidaEdicao', { id: null })
      this.$emit('update:modalDespedida', false)
    },
    abrirModal () {
      if (this.despedidaEdicao.id) {
        this.despedida = { ...this.despedidaEdicao }
      } else {
        this.resetarDespedida()
      }
    },
    async handleDespedida () {
      try {
        this.loading = true
        if (this.despedida.id) {
          const { data } = await AlterarDespedidaPrivada(this.despedida)
          this.$emit('modal-despedida:editada', data)
          this.$q.notify({
            type: 'info',
            progress: true,
            position: 'top',
            textColor: 'black',
            message: 'Despedida editado!',
            actions: [{
              icon: 'close',
              round: true,
              color: 'white'
            }]
          })
        } else {
          const { data } = await CriarDespedidaPrivada(this.despedida)
          this.$emit('modal-despedida:criada', data)
          this.$q.notify({
            type: 'positive',
            progress: true,
            position: 'top',
            message: 'Despedida criado!',
            actions: [{
              icon: 'close',
              round: true,
              color: 'white'
            }]
          })
        }
        this.loading = false
        this.fecharModal()
        // setTimeout(() => {
        //   window.location.reload();
        // }, 300);
      } catch (error) {
        console.error(error)
        this.$notificarErro('Ocorreu um erro ao criar o despedida', error)
      }
    }
  }

}
</script>

<style lang="scss" scoped>
</style>
