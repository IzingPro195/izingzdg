<template>
  <div>
    <div class="q-my-md">
      <q-card
        flat
        bordered
        class="my-sticky-dynamic q-ma-lg"
      >
        <q-card-section class="text-h6 text-bold">
          Envios em Massa
        </q-card-section>
        <q-list class="text-weight-medium">
          
          <div class="row q-px-md">
            <div class="col-3 q-py-md" style="margin: 1px;">
              <q-input v-model="min" label="Mínimo (segundos)" style="margin: 1px;" dense outlined />
            </div>
            <div class="col-3 q-py-md" style="margin: 1px;">
              <q-input v-model="max" label="Máximo (segundos)" style="margin: 1px;" dense outlined />
            </div>
            <div class="col-3 q-py-md" style="margin: 1px;">
              <q-toggle
                style="margin: 1px;"
                v-model="contatosImportar"
                label="Contatos"
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
                label="Selecionar Contatos"
                use-chips
                multiple
                dense
                outlined
                style="margin: 1px;"
              > 
              <!-- <template v-slot:option="scope">
                  <q-item class="blur-effect">
                    <q-item-section>
                      {{ scope.opt.label }}
                    </q-item-section>
                  </q-item>
                </template> -->
              </q-select>
            </div>
            
            <div class="col-9 q-py-md" v-if="!contatosImportar">
              <q-input
                v-model="numberInput"
                label="Números (separados por vírgula)"
                dense
                outlined
                style="margin: 1px;"
              />
            </div>
            <div class="col-3 q-py-md" v-if="!contatosImportar">
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

            <div class="col-12 q-py-md">
              <q-input v-model="message" type="textarea" label="Mensagem" style="margin: 1px;" autogrow dense outlined />
            </div>
            
            <div class="col-12">
              <q-btn label="Enviar" @click="enviar" color="primary" style="margin-bottom: 15px;margin-right: 5px;"/>
              <q-btn label="Limpar" @click="limparCampos" color="negative" style="margin-bottom: 15px;margin-left: 5px;"/>
            </div>

          </div>
        </q-list>
      </q-card>
    </div>
  </div>
</template>

<script>
import { EnviarSMSMassa } from 'src/service/sms'
import { ListarContatos } from 'src/service/contatos'

export default {
  name: 'MassaSms',
  data() {
    return {
      userProfile: 'user',
      numberInput: '',
      message: '',
      min: '',
      max: '',
      contatosImportar: false,
      loading: false,
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
    handleFileUpload(event) {
      this.file = event.target.files[0];
    },
    async limparCampos(){
      this.message = ''
      this.numberInput = ''
      this.min = ''
      this.max = ''
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
    async enviar(){
      if (this.contatosImportar){
        const numbers = this.selectedContacts.map(contact => contact.value);
        const minInt = parseInt(this.min, 10)
        const maxInt = parseInt(this.max, 10)
        if (isNaN(minInt) || isNaN(maxInt)) {
          this.$q.notify({
            html: true,
            message: `Por favor, insira números válidos para min e max`,
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
        if (numbers === "") {
          this.$q.notify({
            html: true,
            message: `Por favor, insira os números destino.`,
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
        // checagens
        if (this.message === "") {
          this.$q.notify({
            html: true,
            message: `Por favor, insira a mensagem que será enviada.`,
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
        this.$q.notify({
          html: true,
          message: `Aguarde, suas mensagens estão sendo carregadas.`,
          type: 'warning',
          progress: true,
          position: 'top',
          actions: [{
            icon: 'close',
            round: true,
            color: 'white'
          }]
        })
        // envios
        const data = {
          arrayNumbers: numbers,
          message: this.message,
          min: minInt,
          max: maxInt,
          importContact: true
        };
        await EnviarSMSMassa(data)
        this.$q.notify({
          html: true,
          message: `Suas mensagens estão sendo enviadas.`,
          type: 'positive',
          progress: true,
          position: 'top',
          actions: [{
            icon: 'close',
            round: true,
            color: 'white'
          }]
        })
        await this.limparCampos();
        return;
      }
      if (!this.contatosImportar){
        const numbers = this.numberInput.split(',').map(num => num.trim())
        const minInt = parseInt(this.min, 10)
        const maxInt = parseInt(this.max, 10)
        if (isNaN(minInt) || isNaN(maxInt)) {
          this.$q.notify({
            html: true,
            message: `Por favor, insira números válidos para min e max`,
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
        if (this.numberInput === "") {
          this.$q.notify({
            html: true,
            message: `Por favor, insira os números destino.`,
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
        // checagens
        if (this.message === "") {
          this.$q.notify({
            html: true,
            message: `Por favor, insira a mensagem que será enviada.`,
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
        this.$q.notify({
          html: true,
          message: `Aguarde, suas mensagens estão sendo carregadas.`,
          type: 'warning',
          progress: true,
          position: 'top',
          actions: [{
            icon: 'close',
            round: true,
            color: 'white'
          }]
        })
        // envios
        const data = {
          arrayNumbers: numbers,
          message: this.message,
          min: minInt,
          max: maxInt,
          importContact: false
        };
        await EnviarSMSMassa(data)
        this.$q.notify({
          html: true,
          message: `Suas mensagens estão sendo enviadas.`,
          type: 'positive',
          progress: true,
          position: 'top',
          actions: [{
            icon: 'close',
            round: true,
            color: 'white'
          }]
        })
        await this.limparCampos();
        return;
      }
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
