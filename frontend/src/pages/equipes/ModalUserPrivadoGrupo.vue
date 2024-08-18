<template>
  <q-dialog persistent :value="modalUserGrupo" @hide="fecharModal" @show="abrirModal">
    <q-card style="width: 500px" class="q-pa-lg">
      <q-card-section>
        <h3>Gerir Usuários da Equipe</h3>
        <q-select
          v-model="tempSelectedUsers"
          :options="searchedUsers"
          option-label="name"
          option-value="id"
          multiple
          :clearable="false"
          emit-value
          map-options
          placeholder="Selecione usuários para adicionar"
        >
          <q-tooltip>
            Marque ou desmarque os usuarios da lista.
          </q-tooltip>
      </q-select>
      </q-card-section>
      <q-card-actions align="right" class="q-mt-md">
        <q-btn flat label="Salvar" color="primary" @click="saveChanges" class="q-mr-md" />
        <q-btn flat label="Fechar" color="negative" v-close-popup class="q-mr-md" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { ListarUsersPrivadosPorGrupo, AddUserGrupoPrivado, RemoveUserGrupoPrivado } from 'src/service/equipes'
import { ListarUsuarios } from 'src/service/user'

export default {
  name: 'ModalUserPrivadoGrupo',
  props: {
    modalUserGrupo: {
      type: Boolean,
      default: false
    },
    grupoId: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      listaUsuariosGrupo: [],
      listaUsuarios: [],
      searchedUsers: [],
      searchParamUser: '',
      tempSelectedUsers: [], // Temporary selection storage
      selectedUsers: []
    }
  },
  methods: {
    resetar() {
      this.listaUsuariosGrupo = []
      this.listaUsuarios = []
      this.searchedUsers = []
      this.searchParamUser = ''
      this.tempSelectedUsers = []
      this.selectedUsers = []
    },
    fecharModal() {
      this.$emit('update:grupoId', 0)
      this.$emit('update:modalUserGrupo', false)
      this.resetar()
    },
    filtroUser() {
      this.searchedUsers = this.listaUsuarios.filter(u => u.name.toLowerCase().includes(this.searchParamUser.toLowerCase()))
    },
    async abrirModal() {
      this.resetar()
      await this.listarUsuariosDoGrupo()
      await this.listarUsuariosDoSistema()
      this.tempSelectedUsers = [...this.selectedUsers]
    },
    async listarUsuariosDoGrupo() {
      try {
        const { data } = await ListarUsersPrivadosPorGrupo(this.grupoId)
        if (data) {
          this.listaUsuariosGrupo = data
          this.updateSelectedUsers()
        }
      } catch (error) {
        console.error('Erro ao listar usuários do grupo:', error)
      }
    },
    async listarUsuariosDoSistema() {
      try {
        const { data } = await ListarUsuarios()
        if (data && data.users) {
          const usuariosFiltrados = data.users.filter(user => user.profile !== 'superadmin')
          this.listaUsuarios = usuariosFiltrados
          this.searchedUsers = usuariosFiltrados
        }
      } catch (error) {
        console.error('Erro ao listar usuários do sistema:', error)
      }
    },
    updateSelectedUsers() {
      this.selectedUsers = this.listaUsuariosGrupo.map(user => user.user.id)
    },
    async saveChanges() {
      const addedUsers = this.tempSelectedUsers.filter(userId => !this.selectedUsers.includes(userId))
      const removedUsers = this.selectedUsers.filter(userId => !this.tempSelectedUsers.includes(userId))

      try {
        for (const userId of addedUsers) {
          await AddUserGrupoPrivado(userId, this.grupoId)
        }

        for (const userId of removedUsers) {
          await RemoveUserGrupoPrivado(userId, this.grupoId)
        }

        await this.listarUsuariosDoGrupo()
        await this.listarUsuariosDoSistema()
        this.$q.notify({
          type: 'info',
          progress: true,
          position: 'top',
          message: 'Usuários atualizados!',
          textColor: 'black',
          actions: [{
            icon: 'close',
            round: true,
            color: 'white'
          }]
        })
        this.fecharModal()
      } catch (error) {
        console.error('Erro ao atualizar usuários:', error)
        this.$q.notify({
          type: 'negative',
          progress: true,
          position: 'top',
          message: 'Erro ao atualizar usuários!',
          actions: [{
            icon: 'close',
            round: true,
            color: 'white'
          }]
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.q-pa-lg {
  min-width: 70vw;
}
</style>
