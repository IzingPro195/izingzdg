<template>
  <div v-if="userProfile === 'admin' || userProfile === 'super' ">
    <q-table flat
      bordered
      square
      hide-bottom
      class="my-sticky-dynamic q-ma-lg"
      title="Filas"
      :data="filas"
      :columns="columns"
      :loading="loading"
      row-key="id"
      :pagination.sync="pagination"
      :rows-per-page-options="[0]">
      <template v-slot:top-right>
        <q-btn color="primary"
          label="Adicionar"
          @click="filaEdicao = {}; modalFila = true" />
      </template>
      <template v-slot:body-cell-isActive="props">
        <q-td class="text-center">
          <q-icon size="24px"
            :name="props.value ? 'mdi-check-circle-outline' : 'mdi-close-circle-outline'"
            :color="props.value ? 'positive' : 'negative'" />
        </q-td>
      </template>
      <template v-slot:body-cell-acoes="props">
        <q-td class="text-center">
          <q-btn flat
            round
            icon="edit"
            @click="editarFila(props.row)" />
          <q-btn flat
            round
            icon="mdi-delete"
            @click="deletarFila(props.row)" />
        </q-td>
      </template>
    </q-table>
    <ModalFila :modalFila.sync="modalFila"
      :filaEdicao.sync="filaEdicao"
      @modal-fila:criada="filaCriada"
      @modal-fila:editada="filaEditada" />
  </div>
</template>

<script>
import { DeletarFila, ListarFilas } from 'src/service/filas'
import { MostrarCores } from 'src/service/empresas';
import ModalFila from './ModalFila'
export default {
  name: 'Filas',
  components: {
    ModalFila
  },
  data () {
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
      filaEdicao: {},
      modalFila: false,
      filas: [],
      pagination: {
        rowsPerPage: 40,
        rowsNumber: 0,
        lastIndex: 0
      },
      loading: false,
      columns: [
        { name: 'id', label: '#', field: 'id', align: 'left' },
        { name: 'queue', label: 'Fila', field: 'queue', align: 'left' },
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
    async listarFilas () {
      const { data } = await ListarFilas()
      this.filas = data
    },
    filaCriada (fila) {
      const newFilas = [...this.filas]
      newFilas.push(fila)
      this.filas = [...newFilas]
    },
    filaEditada (fila) {
      const newFilas = [...this.filas]
      const idx = newFilas.findIndex(f => f.id === fila.id)
      if (idx > -1) {
        newFilas[idx] = fila
      }
      this.filas = [...newFilas]
    },
    editarFila (fila) {
      this.filaEdicao = { ...fila }
      this.modalFila = true
    },
    deletarFila (fila) {
      this.$q.dialog({
        title: 'Atenção!!',
        message: `Deseja realmente deletar a Fila "${fila.queue}"?`,
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
        DeletarFila(fila)
          .then(res => {
            let newFilas = [...this.filas]
            newFilas = newFilas.filter(f => f.id !== fila.id)

            this.filas = [...newFilas]
            this.$q.notify({
              type: 'positive',
              progress: true,
              position: 'top',
              message: `Fila ${fila.queue} deletada!`,
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
  mounted () {
    this.listarFilas()
    this.userProfile = localStorage.getItem('profile')
    this.loadColors()
  }
}
</script>

<style lang="scss" scoped>
</style>
