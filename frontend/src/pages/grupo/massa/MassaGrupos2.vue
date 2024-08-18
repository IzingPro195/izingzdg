<template>
  <div>
    <div class="q-my-md">

      <q-card
        flat
        bordered
        class="my-sticky-dynamic q-ma-lg"
      >
        <q-card-section class="text-h6 text-bold">
          Manipular Grupos
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
                v-model="titulo"
                label="Alterar Título"
                dense
                style="margin: 1px;"
              />
            </div>
          </div>
          <div v-if="titulo" class="col-12 q-py-md">
            <q-input v-model="novoTitulo" type="textarea" label="Nova Título" style="margin: 1px;" autogrow dense outlined />
          </div>

          <div class="row q-px-md">
            <div class="col-12 q-py-md">
              <q-toggle
                v-model="descricao"
                label="Alterar Descrição"
                dense
                style="margin: 1px;"
              />
            </div>
          </div>
          <div v-if="descricao" class="col-12 q-py-md">
            <q-input v-model="novaDescricao" type="textarea" label="Nova Descrição" style="margin: 1px;" autogrow dense outlined />
          </div>

          <div class="row q-px-md">
            <div class="col-12 q-py-md">
              <q-toggle
                v-model="imagemUrl"
                label="Alterar Imagem (URL)"
                dense
                style="margin: 1px;"
              />
            </div>
          </div>
          <div v-if="imagemUrl" class="col-12 q-py-md">
            <q-input v-model="novaImagemUrl" type="textarea" label="Nova Imagem" style="margin: 1px;" autogrow dense outlined />
          </div>

          <div class="row q-px-md">
            <div class="col-12 q-py-md">
              <q-toggle
                v-model="imagemArquivo"
                label="Alterar Imagem (Upload)"
                dense
                style="margin: 1px;"
              />
            </div>
          </div>
          <div v-if="imagemArquivo" class="col-12 q-py-md">
            <input type="file" @change="handleFileUpload">
          </div>

          <div class="row q-px-md">
            <div class="col-12 q-py-md">
              <q-toggle
                v-model="permissao"
                label="Alterar Permissão"
                dense
                style="margin: 1px;"
              />
            </div>
          </div>
          <div v-if="permissao" class="col-12 q-py-md">
            <q-toggle v-model="novaPermissao" label="Somente admins podem enviar mensagens" color="primary" />
          </div>

          <div class="col-12">
            <div class="col-12 q-py-md">
              <div v-if="loading2">Aguarde, alterando dados dos grupos...</div>
              <div v-if="loading2" class="loading-bar">
                <div class="bar"></div>
              </div>
            </div>
            <q-btn label="Alterar" @click="enviar" color="primary" style="margin-bottom: 15px;margin-right: 5px;"/>
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
import { ListarGrupo, MudarDescricao, MudarTitulo, MudarFotoUrl, MudarFotoArquivo, MudarPermissao } from 'src/service/grupo'

export default {
  name: 'MassaGrupo',
  data() {
    return {
      groupOptions: [],
      groupIds: [],
      userProfile: 'user',
      whatsappId: null,
      descricao: false,
      novaDescricao: '',
      titulo: false,
      novoTitulo: '',
      imagemUrl: false,
      novaImagemUrl: '',
      permissao: false,
      novaPermissao: false,
      file: null,
      imagemArquivo: false,
      loading: false,
      loading2: false,
      grupoCriado: {},
      params: {
        hasMore: true
      },
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
    handleFileUpload(event) {
      this.file = event.target.files[0];
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
    async mudarDescricao(){
      const grupos = this.groupIds.map(group => group.id);
      const data = {
        whatsappId: this.whatsappId.value,
        groupIds: grupos,
        description: this.novaDescricao,
      };
      await MudarDescricao(data)
    },
    async mudarTitulo(){
      const grupos = this.groupIds.map(group => group.id);
      const data = {
        whatsappId: this.whatsappId.value,
        groupIds: grupos,
        title: this.novoTitulo,
      };
      await MudarTitulo(data)
    },
    async mudarFotoUrl(){
      const grupos = this.groupIds.map(group => group.id);
      const data = {
        whatsappId: this.whatsappId.value,
        groupIds: grupos,
        picture: this.novaImagemUrl,
      };
      await MudarFotoUrl(data)
    },
    async mudarFotoArquivo(){
      const grupos = this.groupIds.map(group => group.id);
      const formData = new FormData();
      formData.append('whatsappId', this.whatsappId.value);
      formData.append('arrayGroupIds', grupos.toString());
      if (this.file) {
        formData.append('medias', this.file, this.file.name);
      }
      await MudarFotoArquivo(formData)      
    },
    async mudarPermissao(){
      const grupos = this.groupIds.map(group => group.id);
      const data = {
        whatsappId: this.whatsappId.value,
        groupIds: grupos,
        adminsOnly: this.novaPermissao,
      };
      await MudarPermissao(data)
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
      if(this.titulo){
        if (this.novoTitulo === '') {
          this.$q.notify({
            html: true,
            message: `Por favor, preencha a opção com o novo título.`,
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
        try{
          await this.mudarTitulo()
        } catch(e){
          this.loading2 = false
        }
      }
      if(this.descricao){
        if (this.novaDescricao === '') {
          this.$q.notify({
            html: true,
            message: `Por favor, preencha a opção com a nova descrição.`,
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
        try{
          await this.mudarDescricao()
        } catch(e){
          this.loading2 = false
        }  
      }
      if(this.imagemUrl){
        if (this.novaImagemUrl === '') {
          this.$q.notify({
            html: true,
            message: `Por favor, preencha a opção com a URL da nova imagem.`,
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
        try{
          await this.mudarFotoUrl()
        } catch(e){
          this.loading2 = false
        } 
      }
      if(this.imagemArquivo){
        if (!this.file) {
          this.$q.notify({
            html: true,
            message: `Por favor, faça o upload do novo arquivo.`,
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
        try{
          await this.mudarFotoArquivo()
        } catch(e){
          this.loading2 = false
        }
      }
      if(this.permissao){
        try{
          await this.mudarPermissao()
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
  
</style>
