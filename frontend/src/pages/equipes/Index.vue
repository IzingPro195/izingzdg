<template>
  <div v-if="userProfile === 'admin' || userProfile === 'super' ">

    <q-table style="width: 100%;margin-left: 0;" flat bordered square hide-bottom class="my-sticky-dynamic q-ma-lg"
      :data="groups" :columns="columns" :loading="loading" row-key="id" :pagination.sync="pagination"
      :rows-per-page-options="[0]"
      title="Equipes">

      <template v-slot:top-right>
        <q-btn color="primary" label="Adicionar" @click="grupoEdicao = {}; modalGrupo = true" />
      </template>

      <template v-slot:body-cell-isActive="props">
        <q-td class="text-center">
          <q-icon size="24px" :name="props.value ? 'mdi-check-circle-outline' : 'mdi-close-circle-outline'"
            :color="props.value ? 'positive' : 'negative'" />
        </q-td>
      </template>

      <template v-slot:body-cell-acoes="props">
        <q-td class="text-center">
          <q-btn flat round icon="mdi-account-multiple-plus-outline" @click="editarUsuarios(props.row)">
            <q-tooltip content-class="bg-padrao text-grey-9 text-bold">
              Adicionar/ Remover Usuários
            </q-tooltip>
          </q-btn>
          <q-btn flat round icon="edit" @click="editarGrupo(props.row)" />
          <q-btn flat round icon="mdi-delete" @click="deletarGrupo(props.row)" />
        </q-td>
      </template>
    </q-table>
    <ModalPrivadoGrupo :modalGrupo.sync="modalGrupo" :grupoEdicao.sync="grupoEdicao" @modal-grupo:criada="grupoCriada"
      @modal-grupo:editada="grupoEditada" />
    <ModalUserPrivadoGrupo :modalUserGrupo.sync="modalUserGrupo" :grupoId.sync="grupoId" />
  </div>
</template>

<script>
import ModalPrivadoGrupo from './ModalPrivadoGrupo'
import ModalUserPrivadoGrupo from './ModalUserPrivadoGrupo'
import { DeletarGrupoPrivado, ListarGruposPrivados } from 'src/service/equipes'
import { MostrarCores } from 'src/service/empresas';
export default {
  name: 'Grupos',
  components: {
    ModalPrivadoGrupo,
    ModalUserPrivadoGrupo
  },
  data() {
    return {
      colors: {
        neutral: "#E0E1E2",
        primary: "#5c67f2",
        secondary: "#f5f5f9",
        accent: "#ff5c93",
        warning: "#ffeb3b",
        negative: "#f44336",
        positive: "#25d366",
        light: "#8DB1DD",
      },
      userProfile: 'user',
      grupoEdicao: {},
      modalGrupo: false,
      modalUserGrupo: false,
      grupoId: 0,
      groups: [],
      pagination: {
        rowsPerPage: 40,
        rowsNumber: 0,
        lastIndex: 0
      },
      loading: false,
      columns: [
        { name: 'id', label: '#', field: 'id', align: 'left' },
        { name: 'group', label: 'Equipe', field: 'group', align: 'left' },
        { name: 'isActive', label: 'Ativo', field: 'isActive', align: 'center' },
        { name: 'acoes', label: 'Ações', field: 'acoes', align: 'center' }
      ]
    }
  },
  methods: {
    async loadColors() {
      try {
        const response = await MostrarCores();
        if (response.status === 200) {
          const companyData = response.data[0];
          const colorsArray = companyData.systemColors;

          

          this.colors = colorsArray.reduce((acc, colorObj) => {
            const key = colorObj.label.toLowerCase();
            acc[key] = colorObj[key];  // Use the correct key here
            return acc;
          }, {});

          

          const root = document.documentElement;
          root.style.setProperty("--q-neutral", this.colors.neutral);
          root.style.setProperty("--q-primary", this.colors.primary);
          root.style.setProperty("--q-secondary", this.colors.secondary);
          root.style.setProperty("--q-accent", this.colors.accent);
          root.style.setProperty("--q-warning", this.colors.warning);
          root.style.setProperty("--q-negative", this.colors.negative);
          root.style.setProperty("--q-positive", this.colors.positive);
          root.style.setProperty("--q-light", this.colors.light);

          

        } else {
          console.error('Erro ao carregar as cores');
        }
      } catch (error) {
        console.error('Erro ao carregar as cores:', error);
      }
    },
    async listarGrupos() {
      const { data } = await ListarGruposPrivados()
      this.groups = data
    },
    grupoCriada(grupo) {
      const newGrupos = [...this.groups]
      newGrupos.push(grupo)
      this.groups = [...newGrupos]
    },
    grupoEditada(grupo) {
      const newGrupos = [...this.groups]
      const idx = newGrupos.findIndex(g => g.id === grupo.id)
      if (idx > -1) {
        newGrupos[idx] = grupo
      }
      this.groups = [...newGrupos]
    },
    editarGrupo(grupo) {
      this.grupoEdicao = { ...grupo }
      this.modalGrupo = true
    },
    editarUsuarios(grupo) {
      this.modalUserGrupo = true
      this.grupoId = grupo.id
    },
    deletarGrupo(grupo) {
      this.$q.dialog({
        title: 'Atenção!!',
        message: `Deseja realmente deletar o grupo "${grupo.group}"?`,
        cancel: {
          label: 'Não',
          color: 'primary',
          push: true
        },
        ok: {
          label: 'Sim',
          color: 'negative',
          push: true
        },
        persistent: true
      }).onOk(() => {
        this.loading = true
        DeletarGrupoPrivado(grupo)
          .then(res => {
            let newGrupos = [...this.groups]
            newGrupos = newGrupos.filter(g => g.id !== grupo.id)

            this.groups = [...newGrupos]
            this.$q.notify({
              type: 'positive',
              progress: true,
              position: 'top',
              message: `Grupo ${grupo.group} deletado!`,
              actions: [{
                icon: 'close',
                round: true,
                color: 'white'
              }]
            })
          })
        this.loading = false
      })
    }

  },
  mounted() {
    this.listarGrupos()
    this.userProfile = localStorage.getItem('profile')
    this.loadColors()
  }
}
</script>

<style lang="scss" scoped></style>
