<template>
  <q-dialog
    persistent
    :value="modalPalavra"
    @hide="fecharModal"
    @show="abrirModal"
  >
    <q-card
      style="width: 500px"
      class="q-pa-lg"
    >
      <q-card-section>
        <div class="text-h6">{{ palavraEdicao.id ? 'Editar': 'Criar' }} Palavra</div>
      </q-card-section>
      <q-card-section>
        <q-input
          class="row col"
          square
          outlined
          style="margin-bottom: 15px;margin-right: 5px;"
          v-model="palavra.word"
          label="Palavra (minúscula)"
          @input="handleInput"
        />
        <q-select
          class="row col"
          square
          outlined
          style="margin-bottom: 15px;margin-right: 5px;"
          v-model="whatsappId"
          :options="cSessionsOptions"
          label="WhatsApp ID"
          @input="popularGrupos()"
        />
        <q-select
          class="row col"
          square
          outlined
          style="margin-bottom: 15px;margin-right: 5px;"
          v-model="palavra.groupId"
          :options="groupOptions"
          label="Grupo"
          option-value="id"
          option-label="name"
          multiple
          use-chips
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
          @click="handlePalavra"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>

</template>

<script>
import { CriarPalavra, AlterarPalavra } from 'src/service/palavras'
import { ListarGrupo } from 'src/service/grupo'
import { mapGetters } from 'vuex';

export default {
  name: 'ModalPalavra',
  props: {
    modalPalavra: {
      type: Boolean,
      default: false
    },
    palavraEdicao: {
      type: Object,
      default: () => {
        return { id: null }
      }
    }
  },
  data () {
    return {
      groupOptions: [],
      whatsappId: null,
      palavra: {
        id: null,
        whatsappId: null,
        groupId: null,
      }
    }
  },
  computed: {
    ...mapGetters(['whatsapps']),
    cSessions() {
      // return this.whatsapps.filter(w => w.type === 'whatsapp' && !w.isDeleted)
      return this.whatsapps.filter(w => ["whatsapp", "baileys"].includes(w.type) && !w.isDeleted && w.status === 'CONNECTED');
    },
    cSessionsOptions() {
      return this.cSessions.map(w => ({ label: w.name, value: w.id }))
    }
  },
  methods: {
    handleInput(value) {
      this.palavra.word = value.toLowerCase();
    },
    resetarPalavra () {
      this.palavra = {
        id: null,
        whatsappId  : null,
        groupId: null,
      }
    },
    fecharModal () {
      this.resetarPalavra()
      this.$emit('update:palavraEdicao', { id: null })
      this.$emit('update:modalPalavra', false)
    },
    abrirModal () {
      if (this.palavraEdicao.id) {
        this.palavra = { ...this.palavraEdicao }
      } else {
        this.resetarPalavra()
      }
    },
    async popularGrupos() {
      if (!this.whatsappId) return;

      try {
        const data = {
          whatsappId: this.whatsappId.value
        }
        const reponse = await ListarGrupo(data);
        this.groupOptions = reponse.data.groups.map(group => ({
          id: group.id,
          name: group.name
        }));
      } catch (error) {
        console.error('Erro ao listar grupos:', error);
        this.groupOptions = [];
      }
    },
    async handlePalavra () {
      try {
        this.loading = true
        if (this.palavra.id) {
          const { data } = await AlterarPalavra(this.palavra)
          this.$emit('modal-palavra:editada', data)
          this.$q.notify({
            type: 'info',
            progress: true,
            position: 'top',
            textColor: 'black',
            message: 'Palavra editado!',
            actions: [{
              icon: 'close',
              round: true,
              color: 'white'
            }]
          })
        } else {
          const { data } = await CriarPalavra(this.palavra)
          this.$emit('modal-palavra:criada', data[0])
          this.$q.notify({
            type: 'positive',
            progress: true,
            position: 'top',
            message: 'Palavra criado!',
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
        this.$notificarErro('Ocorreu um erro ao criar o palavra', error)
      }
    }
  }

}
</script>

<style lang="scss" scoped>
</style>
