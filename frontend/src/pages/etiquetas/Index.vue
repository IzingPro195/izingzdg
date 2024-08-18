<template>
  <div v-if="userProfile === 'admin' || userProfile === 'super' ">
    <q-table
      flat
      bordered
      square
      hide-bottom
      class="my-sticky-dynamic q-ma-lg"
      title="Etiquetas"
      :data="etiquetas"
      :columns="columns"
      :loading="loading"
      row-key="id"
      :pagination.sync="pagination"
      :rows-per-page-options="[0]"
    >
      <template v-slot:top-right>
        <q-btn
          color="primary"
          label="Adicionar"
          @click="etiquetaEdicao = {}; modalEtiqueta = true"
        />
      </template>
      <template v-slot:body-cell-color="props">
        <q-td class="text-center">
          <div
            class="q-pa-sm rounded-borders"
            :style="`background: ${props.row.color}`"
          >
            {{ props.row.color }}
          </div>
        </q-td>
      </template>
      <template v-slot:body-cell-isActive="props">
        <q-td class="text-center">
          <q-icon
            size="24px"
            :name="props.value ? 'mdi-check-circle-outline' : 'mdi-close-circle-outline'"
            :color="props.value ? 'positive' : 'negative'"
          />
        </q-td>
      </template>
      <template v-slot:body-cell-acoes="props">
        <q-td class="text-center">
          <q-btn
            flat
            round
            icon="edit"
            @click="editarEtiqueta(props.row)"
          />
          <q-btn
            flat
            round
            icon="mdi-delete"
            @click="deletarEtiqueta(props.row)"
          />
        </q-td>
      </template>
    </q-table>
    <ModalEtiqueta
      :modalEtiqueta.sync="modalEtiqueta"
      :etiquetaEdicao.sync="etiquetaEdicao"
      @modal-etiqueta:criada="etiquetaCriada"
      @modal-etiqueta:editada="etiquetaEditada"
    />
  </div>
</template>

<script>
import { DeletarEtiqueta, ListarEtiquetas } from 'src/service/etiquetas'
import ModalEtiqueta from './ModalEtiqueta'
import { MostrarCores } from 'src/service/empresas';
export default {
  name: 'Etiquetas',
  components: {
    ModalEtiqueta
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
      etiquetaEdicao: {},
      modalEtiqueta: false,
      etiquetas: [],
      pagination: {
        rowsPerPage: 40,
        rowsNumber: 0,
        lastIndex: 0
      },
      loading: false,
      columns: [
        { name: 'id', label: '#', field: 'id', align: 'left' },
        { name: 'tag', label: 'Etiqueta', field: 'tag', align: 'left' },
        { name: 'color', label: 'Cor', field: 'color', align: 'center' },
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
    async listarEtiquetas () {
      const { data } = await ListarEtiquetas()
      this.etiquetas = data
    },
    etiquetaCriada (etiqueta) {
      const newEtiquetas = [...this.etiquetas]
      newEtiquetas.push(etiqueta)
      this.etiquetas = [...newEtiquetas]
    },
    etiquetaEditada (etiqueta) {
      const newEtiquetas = [...this.etiquetas]
      const idx = newEtiquetas.findIndex(f => f.id === etiqueta.id)
      if (idx > -1) {
        newEtiquetas[idx] = etiqueta
      }
      this.etiquetas = [...newEtiquetas]
    },
    editarEtiqueta (etiqueta) {
      this.etiquetaEdicao = { ...etiqueta }
      this.modalEtiqueta = true
    },
    deletarEtiqueta (etiqueta) {
      this.$q.dialog({
        title: 'Atenção!!',
        message: `Deseja realmente deletar a Etiqueta "${etiqueta.tag}"?`,
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
        DeletarEtiqueta(etiqueta)
          .then(res => {
            let newEtiquetas = [...this.etiquetas]
            newEtiquetas = newEtiquetas.filter(f => f.id !== etiqueta.id)

            this.etiquetas = [...newEtiquetas]
            this.$q.notify({
              type: 'positive',
              progress: true,
              position: 'top',
              message: `Etiqueta ${etiqueta.tag} deletada!`,
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
    this.listarEtiquetas()
    this.userProfile = localStorage.getItem('profile')
    this.loadColors()
  }
}
</script>

<style lang="scss" scoped>
</style>
