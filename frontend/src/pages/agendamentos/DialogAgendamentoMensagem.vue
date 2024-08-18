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

        <div class="q-mt-md">
          <q-select
            v-model="selectedWhatsapp"
            :options="cSessionsOptions"
            label="Selecione o WhatsApp"
          />
        </div>

        <div class="q-mt-md">
          <q-select
            v-model="selectedContact"
            :options="contacts"
            option-label="name"
            option-value="id"
            label="Selecione o Contato"
            use-input
            input-debounce="500"
            @filter="filterContacts"
            virtual-scroll
            @virtual-scroll="onScroll"
          >
          </q-select>
        </div>

        <div v-if="selectedWhatsapp && selectedContact">
          <InputMensagem :selectedWhatsapp="selectedWhatsapp" :selectedContact="selectedContact" isScheduleDate />
        </div>
      </div>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'
import { ListarContatos } from 'src/service/contatos'

export default defineComponent({
  emits: ['hide', 'ok', 'close'],
  components: {
    InputMensagem: () => import('./InputMensagem.vue'),
  },
  computed: {
    ...mapGetters(['whatsapps']),
    cSessions() {
      // return this.whatsapps.filter(w => w.type === 'whatsapp' && !w.isDeleted)
      return this.whatsapps.filter(w => (w.type === 'whatsapp' || w.type === 'waba' || w.type === 'baileys')  && !w.isDeleted && w.status === 'CONNECTED');
    },
    cSessionsOptions() {
      return this.cSessions.map(w => ({ label: w.name, value: w.id, type: w.type, tokenAPI: w.tokenAPI || null }))
    }
  },
  data() {
    return {
      selectedWhatsapp: null,
      selectedContact: null,
      contacts: [],
      loading: false,
      params: {
        pageNumber: 1,
        hasMore: true
      },
      pagination: {
        lastIndex: 0,
        rowsNumber: 0
      }
    };
  },
  methods: {
    show() {
      this.$refs.dialog.show();
      this.listarContatos();
    },
    hide() {
      this.$refs.dialog.hide();
    },
    async listarContatos() {
      this.loading = true;
      try {
        const { data } = await ListarContatos(this.params);
        this.params.hasMore = data.hasMore;
        this.contacts = [...this.contacts, ...data.contacts];
        this.pagination.lastIndex = this.contacts.length - 1;
        this.pagination.rowsNumber = data.count;
      } catch (error) {
        console.error('Erro ao listar contatos:', error);
      } finally {
        this.loading = false;
      }
    },
    onScroll() {
      if (this.loading !== true && this.params.hasMore === true) {
        this.params.pageNumber++;
        this.listarContatos();
      }
    },
    filterContacts(val, update, abort) {
      update(() => {
        this.contacts = this.contacts.filter(contact => contact.name.toLowerCase().includes(val.toLowerCase()));
      });
    }
  }
})
</script>

<style scoped>
.scroller {
  max-height: 200px;
  overflow-y: auto;
}
</style>
