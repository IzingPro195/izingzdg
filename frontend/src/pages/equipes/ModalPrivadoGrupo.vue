<template>
  <q-dialog persistent :value="modalGrupo" @hide="fecharModal" @show="abrirModal">
    <q-card style="width: 500px" class="q-pa-lg">
      <q-card-section>
        <div class="text-h6">{{ grupoEdicao.id ? 'Editar' : 'Criar' }} Equipe</div>
      </q-card-section>
      <q-card-section>
        <div class="row">
          <div class="col-12">
            <q-input square outlined v-model="grupo.group" label="Nome da Equipe" />
          </div>
          <div class="col-6">
            <q-toggle v-model="grupo.isActive" label="Ativo" />
          </div>
        </div>
      </q-card-section>
      <q-card-actions align="right" class="q-mt-md">
        <q-btn label="Cancelar" color="negative" v-close-popup class="q-mr-md" />
        <q-btn label="Salvar" color="primary" @click="handleGrupo" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { CriarGrupoPrivado, AlterarGrupoPrivado } from 'src/service/equipes'
export default {
  name: 'ModalPrivadoGrupo',
  props: {
    modalGrupo: {
      type: Boolean,
      default: false
    },
    grupoEdicao: {
      type: Object,
      default: () => {
        return { id: null }
      }
    }
  },
  data() {
    return {
      grupo: {
        id: null,
        grupo: null,
        isActive: true
      }
    }
  },
  methods: {
    resetarGrupo() {
      this.grupo = {
        id: null,
        grupo: null,
        isActive: true
      }
    },
    fecharModal() {
      this.resetarGrupo()
      this.$emit('update:grupoEdicao', { id: null })
      this.$emit('update:modalGrupo', false)
    },
    abrirModal() {
      if (this.grupoEdicao.id) {
        this.grupo = { ...this.grupoEdicao }
      } else {
        this.resetarGrupo()
      }
    },
    async handleGrupo() {
      try {
        this.loading = true
        if (this.grupo.id) {
          const { data } = await AlterarGrupoPrivado(this.grupo)
          this.$emit('modal-grupo:editada', data)
          this.$q.notify({
            type: 'info',
            progress: true,
            position: 'top',
            textColor: 'black',
            message: 'Equipe Editada!',
            actions: [{
              icon: 'close',
              round: true,
              color: 'white'
            }]
          })
        } else {
          const { data } = await CriarGrupoPrivado(this.grupo)
          this.$emit('modal-grupo:criada', data)
          this.$q.notify({
            type: 'positive',
            progress: true,
            position: 'top',
            message: 'Equipe criada!',
            actions: [{
              icon: 'close',
              round: true,
              color: 'white'
            }]
          })
        }
        this.loading = false
        this.fecharModal()
      } catch (error) {
        console.error(error)
        this.$notificarErro('Ocorreu um erro!', error)
      }
    }
  }

}
</script>

<style lang="scss" scoped></style>
