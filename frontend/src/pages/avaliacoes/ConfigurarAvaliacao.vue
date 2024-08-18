<template>
  <div v-if="userProfile === 'admin' || userProfile === 'super' ">
    <q-card class="q-ma-sm" square>
      <div class="text-h5 q-pa-sm q-ma-sm">
        Avaliações
        <q-icon name="help">
          <q-tooltip content-class="bg-light-blue-1 text-black q-pa-sm shadow-4">
            <span class="text-weight-medium"> Tipos de Avaliações: </span>
            <span class="row col">
              Avaliação: Valor atribuído de 0 a 5.;
            </span>
            <span class="row col">
              Rótulo: Mensagem enviada para cada avaliação;
            </span>
          </q-tooltip>
        </q-icon>

        <q-btn
          color="primary"
          label="Salvar"
          class="float-right"
          @click="salvarAvaliacao"
        />
      </div>
      <q-separator />
      <q-card-section>
        <div class="row q-col-gutter-sm">
          <div
            class="col-xs-12 col-sm-4 q-mt-sm"
            v-for="avaliacao in rating"
            :key="avaliacao.rating"
          >
            <q-card square bordered flat>
              <div class="text-body1 text-bold bg-grey-3 q-pa-xs q-pl-sm">
                <q-input
                  v-if="isEditable"
                  v-model="avaliacao.label"
                  dense
                  outlined
                  class="bg-white"
                >
                  <template v-slot:prepend>
                    <q-icon name="mdi-account-star-outline" /> {{ avaliacao.rating }}
                  </template>
                </q-input>
                <span v-else>{{ avaliacao.label }}</span>
              </div>
            </q-card>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>


<script>
import { VEmojiPicker } from 'v-emoji-picker'
import { MostrarAvaliacao, AtualizarAvaliacao } from 'src/service/empresas'
export default {
  name: 'Avaliacao',
  components: { VEmojiPicker },
  data () {
    return {
      userProfile: 'user',
      isEditable: true,
      rating: [
        { label: 'Ruim', rating: 0 },
        { label: 'Regular', rating: 1 },
        { label: 'Bom', rating: 2 },
        { label: 'Muito Bom', rating: 3 },
        { label: 'Excelente', rating: 4 },
        { label: 'Incrível', rating: 5 },
      ]
    }
  },
  methods: {
    async listarAvaliacao () {
      const { data } = await MostrarAvaliacao()
      this.rating = data[0].rating
    },
    async salvarAvaliacao () {
      try{
        const { data } = await AtualizarAvaliacao(this.rating)
        this.rating = data.rating
        this.$q.notify({
          color: 'positive',
          position: 'top',
          message: `Horário de funcionamento atualizado.`,
        });
      } catch(e){
        console.log('Horário de funcionamento erro :' + e)
      }
    },
  },
  mounted () {
    this.listarAvaliacao()
    this.userProfile = localStorage.getItem('profile')
  }
}
</script>

<style lang="scss" scoped>
</style>
