<template>
  <div>
    <div class="q-my-md">

      <q-card
        flat
        bordered
        class="my-sticky-dynamic q-ma-lg"
      >
        <q-card-section class="text-h6 text-bold">
          Manipular Usuários
        </q-card-section>
        <q-list class="text-weight-medium">
          
          <div class="row q-px-md">
            <div class="col-6 q-py-md">
              <q-select
                style="margin: 1px;"
                v-model="whatsappId"
                :options="cSessionsOptions"
                label="Conexão"
                dense
                outlined
                @input="popularGrupos()"
              />
            </div>
            <div class="col-6 q-py-md">
              <q-select
                style="margin: 1px;"
                v-model="groupIds"
                :options="groupOptions"
                label="Grupos"
                dense
                multiple
                use-chips
                outlined
                option-value="id"
                option-label="name"
              />
          </div>

          <div class="row q-px-md">
            <div class="col-12 q-py-md">
              <q-toggle
                v-model="promover"
                label="Promover Admins"
                dense
                style="margin: 1px;"
              />
            </div>
          </div>

          <div class="row q-px-md">
            <div class="col-12 q-py-md">
              <q-toggle
                v-model="demover"
                label="Demover Admins"
                dense
                style="margin: 1px;"
              />
            </div>
          </div>

          <div class="row q-px-md">
            <div class="col-12 q-py-md">
              <q-toggle
                v-model="adicionar"
                label="Adicionar Usuários"
                dense
                style="margin: 1px;"
              />
            </div>
          </div>

          <div class="row q-px-md">
            <div class="col-12 q-py-md">
              <q-toggle
                v-model="remover"
                label="Remover Usuários"
                dense
                style="margin: 1px;"
              />
            </div>
          </div>

          <div v-if="promover || demover || adicionar || remover" class="col-4 q-py-md" style="margin: 1px;">
            <q-toggle
              style="margin: 1px;"
              color="green"
              v-model="contatosImportar"
              label="Importar Contatos"
              dense
            />
          </div>

          <div class="col-12 q-py-md" v-if="(promover && contatosImportar) || (demover && contatosImportar) || (adicionar && contatosImportar) || (remover && contatosImportar)">
            <div v-if="loading">Aguarde, carregando todos os contatos do sistema...</div>
            <div v-if="loading" class="loading-bar">
              <div class="bar"></div>
            </div>
            <q-select
              v-model="selectedContacts"
              :options="contactOptions"
              label="Selecionar Contatos"
              use-chips
              multiple
              dense
              outlined
              style="margin: 1px;"
              >
              </q-select>
          </div>
            
          <div class="col-9 q-py-md" v-if="(promover && !contatosImportar) || (demover && !contatosImportar) || (adicionar && !contatosImportar) || (remover && !contatosImportar)">
            <q-input
              v-model="numberInput"
              label="Números (separados por vírgula)"
              dense
              outlined
              style="margin: 1px;"
            />
          </div>
          <div class="col-3 q-py-md" v-if="(promover && !contatosImportar) || (demover && !contatosImportar) || (adicionar && !contatosImportar) || (remover && !contatosImportar)">
            <q-input
              type="file"
              accept=".csv"
              label="Importar Números do CSV"
              @change="handleCSVUpload"
              dense
              outlined
              style="margin: 1px;"
            />
          </div>

          <div class="col-12">
            <div class="col-12 q-py-md">
              <div v-if="loading2">Aguarde, executando ações...</div>
              <div v-if="loading2" class="loading-bar">
                <div class="bar"></div>
              </div>
            </div>
            <q-btn label="Executar" @click="enviar" color="primary" style="margin-bottom: 15px;margin-right: 5px;"/>
            <q-btn label="Limpar" @click="limparCampos" color="negative" style="margin-bottom: 15px;margin-left: 5px;"/>
          </div>

          </div>
        </q-list>
      </q-card>

    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { ListarGrupo, PromoverUsuario, DemoverUsuario, AdicionarUsuario, RemoverUsuario } from 'src/service/grupo'
import { ListarContatos } from 'src/service/contatos'

export default {
  name: 'MassaGrupo',
  data() {
    return {
      groupOptions: [],
      groupIds: [],
      userProfile: 'user',
      whatsappId: null,
      promover: false,
      demover: false,
      adicionar: false,
      remover: false,
      contatosImportar: false,
      numberInput: '',
      file: null,
      loading: false,
      loading2: false,
      params: {
        hasMore: true
      },
      selectedContacts: [],
      contactOptions: [],
    }
  },
  watch: {
    contatosImportar(newVal, oldVal) {
      this.listarContatos();
    },
    promover(newValue) {
      if (newValue) {
        this.demover = false;
        this.adicionar = false;
        this.remover = false;
      }
    },
    demover(newValue) {
      if (newValue) {
        this.promover = false;
        this.adicionar = false;
        this.remover = false;
      }
    },
    adicionar(newValue) {
      if (newValue) {
        this.promover = false;
        this.demover = false;
        this.remover = false;
      }
    },
    remover(newValue) {
      if (newValue) {
        this.promover = false;
        this.demover = false;
        this.adicionar = false;
      }
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
    async limparCampos(){
      this.groupIds = []
      this.groupOptions = []
      this.whatsappId = null
      this.$q.notify({
        html: true,
        message: `Campos redefinidos, essa pagina será atualizada.`,
        type: 'warning',
        progress: true,
        position: 'top',
        actions: [{
          icon: 'close',
          round: true,
          color: 'white'
        }]
      })
      setTimeout(() => {
        window.location.reload();
      }, 500);
    },
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
    handleCSVUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target.result;
          this.processCSV(content);
        };
        reader.readAsText(file);
      }
    },
    processCSV(csvContent) {
      const lines = csvContent.split('\n');
      const numbers = lines.map(line => line.trim()).filter(line => line !== '');
      this.numberInput = numbers.join(',');
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
    async promoverUsuario(){
      const grupos = this.groupIds.map(group => group.id);
      if (this.contatosImportar){
        const numbers = this.selectedContacts.map(contact => contact.value);
        const data = {
          whatsappId: this.whatsappId.value,
          groupIds: grupos,
          participants: numbers,
        };
        await PromoverUsuario(data)
      }
      if (!this.contatosImportar){
        const numbers = this.numberInput.split(',').map(num => num.trim())
        const data = {
          whatsappId: this.whatsappId.value,
          groupIds: grupos,
          participants: numbers,
        };
        await PromoverUsuario(data)
      }
    },
    async demoverUsuario(){
      const grupos = this.groupIds.map(group => group.id);
      if (this.contatosImportar){
        const numbers = this.selectedContacts.map(contact => contact.value);
        const data = {
          whatsappId: this.whatsappId.value,
          groupIds: grupos,
          participants: numbers,
        };
        await DemoverUsuario(data)
      }
      if (!this.contatosImportar){
        const numbers = this.numberInput.split(',').map(num => num.trim())
        const data = {
          whatsappId: this.whatsappId.value,
          groupIds: grupos,
          participants: numbers,
        };
        await DemoverUsuario(data)
      }
    },
    async adicionarUsuario(){
      const grupos = this.groupIds.map(group => group.id);
      if (this.contatosImportar){
        const numbers = this.selectedContacts.map(contact => contact.value);
        const data = {
          whatsappId: this.whatsappId.value,
          groupIds: grupos,
          participants: numbers,
        };
        await AdicionarUsuario(data)
      }
      if (!this.contatosImportar){
        const numbers = this.numberInput.split(',').map(num => num.trim())
        const data = {
          whatsappId: this.whatsappId.value,
          groupIds: grupos,
          participants: numbers,
        };
        await AdicionarUsuario(data)
      }
    },
    async removerUsuario(){
      const grupos = this.groupIds.map(group => group.id);
      if (this.contatosImportar){
        const numbers = this.selectedContacts.map(contact => contact.value);
        const data = {
          whatsappId: this.whatsappId.value,
          groupIds: grupos,
          participants: numbers,
        };
        await RemoverUsuario(data)
      }
      if (!this.contatosImportar){
        const numbers = this.numberInput.split(',').map(num => num.trim())
        const data = {
          whatsappId: this.whatsappId.value,
          groupIds: grupos,
          participants: numbers,
        };
        await RemoverUsuario(data)
      }
    },
    async enviar(){
      this.loading2 = true
      if(this.whatsappId === null) {
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
        this.loading2 = false
        return;
      }
      if(this.groupIds.length === 0) {
        this.$q.notify({
          html: true,
          message: `Por favor, selecione um ou mais grupos.`,
          type: 'warning',
          progress: true,
          position: 'top',
          actions: [{
            icon: 'close',
            round: true,
            color: 'white'
          }]
        })
        this.loading2 = false
        return;
      }
      if (!this.contatosImportar && this.numberInput === '') {
        this.$q.notify({
          html: true,
          message: `Por favor, preencha selecione ou informe os contatos.`,
          type: 'warning',
          progress: true,
          position: 'top',
          actions: [{
            icon: 'close',
            round: true,
            color: 'white'
          }]
        })
        this.loading2 = false
        return;
      }
      if (this.contatosImportar && this.selectedContacts.length === 0) {
        this.$q.notify({
          html: true,
          message: `Por favor, preencha selecione ou informe os contatos.`,
          type: 'warning',
          progress: true,
          position: 'top',
          actions: [{
            icon: 'close',
            round: true,
            color: 'white'
          }]
        })
        this.loading2 = false
        return;
      }
      if(this.promover){
        try{
          await this.promoverUsuario()
        } catch(e){
          this.loading2 = false
        } 
      }
      if(this.demover){
        try{
          await this.demoverUsuario()
        } catch(e){
          this.loading2 = false
        } 
      }
      if(this.adicionar){
        try{
          await this.adicionarUsuario()
        } catch(e){
          this.loading2 = false
        }
      }
      if(this.remover){
        try{
          await this.removerUsuario()
        } catch(e){
          this.loading2 = false
        }
      }
      this.loading2 = false
      this.limparCampos()
    }
  },
  async mounted() {
    this.userProfile = localStorage.getItem('profile')
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

.blur-effect 
  filter: blur(0px)    
</style>
