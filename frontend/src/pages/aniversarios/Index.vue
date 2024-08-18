<template>
  <div v-if="userProfile === 'admin' || userProfile === 'super' ">
    <q-table
      flat
      bordered
      square
      hide-bottom
      class="my-sticky-dynamic q-ma-lg"
      :data="aniversarios"
      :columns="columns"
      :loading="loading"
      row-key="id"
      :pagination.sync="pagination"
      :rows-per-page-options="[0]"
    >
      <template v-slot:top>
        <div class="q-pa-md" style="display: flex; justify-content: space-between; align-items: center; gap: 20px;">
          <div>
            <div class="text-h6">Aniversários</div>
          </div>
          <div>
            <q-btn @click="openModalAniversario"
                flat
                dense
                icon="mdi-gift-outline"
                color="primary"
                class="bg-padrao btn-rounded">
            <q-tooltip content-class="bg-primary text-bold">
              Enviar Mensagens de Aniversário Manualmente
            </q-tooltip>
          </q-btn>
          </div>
        </div>
      </template>
      <template v-slot:body-cell-acoes="props">
        <q-td class="text-center">
          <q-btn
            flat
            round
            icon="edit"
            @click="editContact(props.row.id)"
          />
        </q-td>
      </template>
    </q-table>
    <q-dialog v-model="isModalOpen">
      <q-card>
        <q-card-section>
          <div class="text-h6">Selecione o WhatsApp</div>
          <p>Enviar Mensagens de Aniversário Manualmente</p>
          <q-banner class="bg-yellow text-black" inline-actions>Ao clicar em enviar, será disparada a mensagem de anivesário cadastrada no Canal, para os aniversariantes do dia.</q-banner>
        </q-card-section>

        <q-card-section v-if="loadingBirthday">
          <q-item-section>
            <q-item-label>Enviando mensagens</q-item-label>
            <q-item-label caption> Esse comando irá enviar a mensagem para todos os aniversariantes do dia. </q-item-label>
            <div v-if="loadingBirthday">Aguarde, enviando mensagens de aniversário...</div>
            <div v-if="loadingBirthday" class="loading-bar">
            <div class="bar"></div>
            </div>
          </q-item-section>
        </q-card-section>
        
        <q-card-section>
          <q-select
            v-model="selectedWhatsApp"
            :options="cSessionsOptions"
            label="WhatsApp"
            filled
          />
        </q-card-section>
        
        <q-card-actions align="right">
          <q-btn flat label="Cancelar" v-close-popup />
          <q-btn flat label="Enviar" @click="sendBirthdayMessage" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <ContatoModal
      :contactId="selectedContactId"
      :modalContato.sync="modalContato"
    />
  </div>
</template>

<script>
import { ListarContatosAniversario } from 'src/service/contatos'
import { SendBirthdayMessage } from 'src/service/tickets'
import { MostrarCores } from 'src/service/empresas';
import ContatoModal from 'src/pages/contatos/ContatoModal'
import { mapGetters } from 'vuex'
// import mixinCommon from './mixinCommon'
export default {
  name: 'Agendamentos',
  components: { ContatoModal },
  // mixins: [mixinCommon],
  computed: {
    ...mapGetters(['whatsapps']),
    cSessions() {
      return this.whatsapps.filter(w => (w.type === 'whatsapp' || w.type === 'waba' || w.type === 'baileys')  && !w.isDeleted && w.status === 'CONNECTED' && w.birthdayDate === 'enabled');
    },
    cSessionsOptions() {
      return this.cSessions.map(w => ({ label: w.name, value: w.id, type: w.type, tokenAPI: w.tokenAPI || null }))
    }
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
      aniversarios: [],
      pagination: {
        rowsPerPage: 40,
        rowsNumber: 0,
        lastIndex: 0
      },
      loading: false,
      loadingBirthday: false,
      columns: [
        { name: 'id', label: '#', field: 'id', align: 'left' },
        { name: 'name', label: 'Nome', field: 'name', align: 'center' },
        { name: 'birthdayDate', label: 'Aniversário', field: 'birthdayDate', align: 'center' },
        { name: 'acoes', label: 'Ações', field: 'acoes', align: 'center' }
      ],
      selectedContactId: null,
      modalContato: false,
      isModalOpen: false,
      selectedWhatsApp: null,
    }
  },
  methods: {
    openModalAniversario() {
      this.isModalOpen = true;
    },
    async sendBirthdayMessage() {
      this.loadingBirthday = true
      console.log(this.selectedWhatsApp)
      if (this.selectedWhatsApp) {
        try {
          await SendBirthdayMessage({
            whatsapp: this.selectedWhatsApp
          });
          this.$q.notify({
            type: 'positive',
            message: 'Mensagens de aniversário enviadas com sucesso!'
          });
        } catch (error) {
          this.$q.notify({
            type: 'negative',
            message: 'Erro ao enviar mensagens de aniversário.'
          });
        }
      }
      this.loadingBirthday = false
      this.isModalOpen = false;
    },
    editContact (contactId) {
      this.selectedContactId = contactId
      this.modalContato = true
    },
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
    async listarAniversarios () {
      try {
        this.loading = true;
        const data = await ListarContatosAniversario();
        this.aniversarios = data.data.contacts

        // .filter(message => !message.isDeleted)
        // .map(message => ({
        //   ...message,
        //   contactName: message.contact.name,
        //   ticketId: message.ticket.id,
        //   ticketStatus: message.ticket.status
        // }));
      } catch (error) {
        console.error('Erro ao listar as mensagens:', error);
      } finally {
        this.loading = false;
      }
    },
  },
  mounted () {
    this.listarAniversarios()
    this.userProfile = localStorage.getItem('profile')
    this.loadColors()
  }
}
</script>

<style lang="sass">
.loading-bar
  width: 100%
  height: 4px
  background-color: #ccc
  position: relative
  
  .bar
    width: 0
    height: 100%
    background-color: #007bff
    position: absolute
    top: 0
    left: 0
    animation: loadingAnimation 1s infinite
  
@keyframes loadingAnimation
  0%
    width: 0
  100%
    width: 100%
</style>
