<template>
  <q-dialog @hide="$emit('hide')" ref="dialog">
    <q-card
      :style="{
        fontFamily: 'Inter, sans-serif',
        width: '900px',
        minWidth: '400px',
        maxWidth: '85vw',
        borderRadius: '8px',
      }"
      class="q-pa-lg"
    >
      <div class="column q-gutter-sm no-wrap">
        <div>
          <div class="row">
            <div class="col-xs-12 text-primary text-weight-bold text-20">Agendamento de Mensagem</div>
            <q-btn style="top: 10px; right: 15px" class="absolute" color="primary" round icon="close" flat v-close-popup />
          </div>
        </div>

        <div>
          <InputMensagem isScheduleDate :mensagensRapidas="mensagensRapidas" :replyingMessage.sync="replyingMessage" />
        </div>
      </div>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  props: ['mensagensRapidas', 'replyingMessage'],
  emits: ['hide', 'ok', 'close'],
  components: {
    InputMensagem: () => import('../InputMensagem.vue'),
  },
  methods: {
    show() {
      this.$refs.dialog.show()
    },
    hide() {
      this.$refs.dialog.hide()
    },
  },
})
</script>
