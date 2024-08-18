  <template>
    <q-dialog
      persistent
      :value="modalCriarGrupo"
      @hide="fecharModal"
      @show="abrirModal"
    >
      <q-card
        style="width: 500px"
        class="q-pa-lg"
      >
        <q-card-section>
          <div class="text-h6">Criar Grupo</div>
        </q-card-section>
        <q-card-section>
          <q-select
            class="row col"
            v-model="whatsappId"
            :options="cSessionsOptions"
            label="Conexão"
            square
            outlined
            style="margin-bottom: 15px;margin-right: 5px;"
          />
          <q-input
            class="row col"
            square
            outlined
            v-model="grupo.title"
            label="Nome do Grupo"
            style="margin-bottom: 15px;margin-right: 5px;"
          />
          <div class="col-4 q-py-md" style="margin: 1px;">
            <q-toggle
              style="margin: 1px;"
              v-model="contatosImportar"
              label="Definir Contato / Selecionar Contato"
              dense
            />
          </div>
          <div class="col-12 q-py-md" v-if="contatosImportar">
            <div v-if="loading">Aguarde, carregando todos os contatos do sistema...</div>
            <div v-if="loading" class="loading-bar">
              <div class="bar"></div>
            </div>
            <q-select
              v-model="selectedContacts"
              :options="contactOptions"
              label="Selecionar Contato"
              use-chips
              dense
              outlined
              style="margin: 1px;"
            />
          </div>
          <q-input
            v-if="!contatosImportar"
            class="row col"
            square
            outlined
            v-model="grupo.number"
            label="Número do Participante"
            style="margin-bottom: 15px;margin-right: 5px;"
          />
          <q-input
            class="row col"
            square
            outlined
            v-model="quantidade"
            label="Quantidade de Grupos"
            style="margin-bottom: 15px; margin-right: 5px;"
            type="number"
            min="1"
            step="1"
          />
          <div class="row q-px-md">
            <div class="col-12 q-py-md">
              <div v-if="loading2">Aguarde, criando grupos...</div>
              <div v-if="loading2" class="loading-bar">
                <div class="bar"></div>
              </div>
            </div>
          </div>
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
            @click="handleCriarGrupo"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </template>

  <script>
  import { CriarGrupo } from 'src/service/grupo'
  import { mapGetters } from 'vuex';
  import { ListarContatos } from 'src/service/contatos'

  export default {
    name: 'ModalCriarGrupo',
    props: {
      modalCriarGrupo: {
        type: Boolean,
        default: false
      },
    },
    data () {
      return {
        whatsappId: null,
        quantidade: '',
        contatosImportar: false,
        selectedContacts: [],
        contactOptions: [],
        loading: false,
        loading2: false,
        params: {
          hasMore: true
        },
        grupo: {
          title: '',
          whatsappId: null,
          number: null,
        }
      }
    },
    watch:{
      contatosImportar(newVal, oldVal) {
        this.listarContatos();
      },
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
      async listarContatos() {
        this.loading = true;
        this.contactOptions = [];
        this.params.pageNumber = 1;
        this.params.hasMore = true; 
        try {
          while (this.params.hasMore) {
            const { data } = await ListarContatos(this.params); 
            this.processarContatos(data)
            this.params.hasMore = data.hasMore;
            if (this.params.hasMore) {
              this.params.pageNumber++;
              await new Promise(resolve => setTimeout(resolve, 1000));
            }
          }
        } catch (error) {
          console.error('Erro ao obter contatos:', error);
        } finally {
          this.loading = false;
        }
      },
      processarContatos(data) {
        const contatosFiltrados = data.contacts.filter(contato => this.isGroup ? contato.isGroup : !contato.isGroup);
        const opcoesContato = contatosFiltrados.map(contato => ({
          label: contato.name,
          value: contato.number
        }));
        this.contactOptions = [...this.contactOptions, ...opcoesContato];
      },
      resetarGrupo () {
        this.grupo = {
          titles: '',
          whatsappId  : null,
          number: null,
        }
      },
      fecharModal () {
        this.resetarGrupo()
        this.$emit('update:modalCriarGrupo', false)
      },
      abrirModal () {
        this.resetarGrupo()
      },
      async handleCriarGrupo () {
        if (this.whatsappId === null) {
          this.$q.notify({
            html: true,
            message: `Por favor, selecione uma conexão.`,
            type: 'warning',
            progress: true,
            position: 'top',
            actions: [{
              icon: 'close',
              round: true,
              color: 'white'
            }]
          })
        return;
        }
        if (this.grupo.title === undefined) {
          this.$q.notify({
            html: true,
            message: `Por favor, preencha o campo com o nome do(s) grupo(s).`,
            type: 'warning',
            progress: true,
            position: 'top',
            actions: [{
              icon: 'close',
              round: true,
              color: 'white'
            }]
          })
        return;
        }
        if (!this.contatosImportar && this.grupo.number === null) {
          this.$q.notify({
            html: true,
            message: `Por favor, preencha o campo com um contato a ser adicionado ao(s) novo(s) grupo(s) criado(s).`,
            type: 'warning',
            progress: true,
            position: 'top',
            actions: [{
              icon: 'close',
              round: true,
              color: 'white'
            }]
          })
        return;
        }
        if (this.contatosImportar && this.selectedContacts.length === 0) {
          this.$q.notify({
            html: true,
            message: `Por favor, selecione um contato a ser adicionado ao(s) novo(s) grupo(s) criado(s).`,
            type: 'warning',
            progress: true,
            position: 'top',
            actions: [{
              icon: 'close',
              round: true,
              color: 'white'
            }]
          })
        return;
        }
        if (this.quantidade === '') {
          this.$q.notify({
            html: true,
            message: `Por favor, preencha o campo a quantidade(s) de grupo(s) criado(s).`,
            type: 'warning',
            progress: true,
            position: 'top',
            actions: [{
              icon: 'close',
              round: true,
              color: 'white'
            }]
          })
        return;
        }
        try {
          if (this.contatosImportar){
            this.loading2 = true;
            const titles = [];
            for (let i = 1; i <= this.quantidade; i++) {
              titles.push(`${this.grupo.title} #${String(i).padStart(2, '0')}`);
            }
            const data = {
              whatsappId: this.whatsappId.value,
              titles,
              number: this.selectedContacts.value,
            };
            await CriarGrupo(data);
            this.loading2 = false;
            this.fecharModal();
          }
          if(!this.contatosImportar){
            this.loading2 = true;
            const titles = [];
            for (let i = 1; i <= this.quantidade; i++) {
              titles.push(`${this.grupo.title} #${String(i).padStart(2, '0')}`);
            }
            const data = {
              whatsappId: this.whatsappId.value,
              titles,
              number: this.grupo.number,
            };
            await CriarGrupo(data);
            this.loading2 = false;
            this.fecharModal();
          }
        } catch (error) {
          console.error(error);
          this.loading2 = false;
          // this.$notificarErro('Ocorreu um erro ao criar os grupos', error);
        }
      }
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