<template>
  <div>
    <div class="q-my-md">
      <q-card
        :style="{ minHeight: minHeight + 'px' }"
        flat
        bordered
        class="my-sticky-dynamic q-ma-lg"
      >
        <q-card-section class="text-h6 text-bold">
          Gerador de Grupos
        </q-card-section>
        <div class="row q-px-md">
          <div class="col-12">
            <q-btn
            color="primary"
            label="Criar Grupos em Massa"
            @click="modalCriarGrupo = true"
            style="margin-bottom: 15px;margin-right: 5px;"
          />
          </div>
        </div>

        <q-card-section class="text-h6 text-bold">
          Listar Participantes
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

          <!-- <div class="row q-px-md">
            <div class="col-12 q-py-md">
              <q-toggle v-model="listar" label="Listar Participantes" dense style="margin: 1px;" />
            </div>
          </div> -->
          <div class="row q-px-md">
            <div class="col-12 q-py-md">
              <div v-if="loading">Aguarde, carregando todos os participantes dos grupos...</div>
              <div v-if="loading" class="loading-bar">
                <div class="bar"></div>
              </div>
            </div>
          </div>
          <div class="col-12 q-py-md">
            <div v-for="grupo in participantes" :key="grupo.groupId">
              <div><strong>Grupo ID:</strong> {{ grupo.groupId }}</div>
              <ul>
                <li v-for="participante in grupo.participants" :key="participante">
                  {{ participante }}
                </li>
              </ul>
            </div>
          </div>


          <div class="col-12">
            <q-btn label="Listar Participantes" @click="enviar" color="primary" style="margin-bottom: 15px;margin-right: 5px;"/>
            <q-btn label="Exportar para XLS" @click="exportDataToXLS" color="primary" style="margin-bottom: 15px;margin-right: 5px;"/>
            <q-btn label="Limpar" @click="limparCampos" color="negative" style="margin-bottom: 15px;margin-left: 5px;"/>
          </div>

          </div>
        </q-list>
        
      </q-card>

      <!-- <q-card
        flat
        bordered
        class="my-sticky-dynamic q-ma-lg"
      >
        <q-card-section class="text-h6 text-bold">
          Listar Participantes
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
              <div v-if="loading">Aguarde, carregando todos os participantes dos grupos...</div>
              <div v-if="loading" class="loading-bar">
                <div class="bar"></div>
              </div>
            </div>
          </div>
          <div class="col-12 q-py-md">
            <div v-for="grupo in participantes" :key="grupo.groupId">
              <div><strong>Grupo ID:</strong> {{ grupo.groupId }}</div>
              <ul>
                <li v-for="participante in grupo.participants" :key="participante">
                  {{ participante }}
                </li>
              </ul>
            </div>
          </div>


          <div class="col-12">
            <q-btn label="Listar Participantes" @click="enviar" color="primary" style="margin-bottom: 15px;margin-right: 5px;"/>
            <q-btn label="Limpar" @click="limparCampos" color="negative" style="margin-bottom: 15px;margin-left: 5px;"/>
          </div>

          </div>
        </q-list>
      </q-card> -->

    </div>
    
    <ModalCriarGrupo
      :modalCriarGrupo.sync="modalCriarGrupo"
      @modal-grupo:criado="grupoCriado"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { ListarGrupo, ListarParticipantes } from 'src/service/grupo'
import ModalCriarGrupo from './ModalCriarGrupo'
import XLSX from 'xlsx';

export default {
  name: 'MassaGrupo',
  components: {
    ModalCriarGrupo
  },
  data() {
    return {
      minHeight: 150,
      groupOptions: [],
      groupIds: [],
      userProfile: 'user',
      whatsappId: null,
      loading: false,
      modalCriarGrupo: false,
      listar: false,
      participantes: [],
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
    exportDataToXLS() {
      const wb = XLSX.utils.book_new();
      const data = [];
      this.participantes.forEach(grupo => {
        grupo.participants.forEach(participante => {
          data.push({
            'Grupo ID': grupo.groupId,
            'Participante': participante
          });
        });
      });
      const ws = XLSX.utils.json_to_sheet(data);
      XLSX.utils.book_append_sheet(wb, ws, 'Participantes');
      XLSX.writeFile(wb, 'participantes.xlsx');
    },
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
    async listarParticipantes() {
      this.loading = true;
      const grupos = this.groupIds.map(group => group.id);
      const data = {
        whatsappId: this.whatsappId.value,
        groupIds: grupos,
      };
      const response = await ListarParticipantes(data);
      this.participantes = response.data;
      this.loading = false;
    },
    async enviar(){
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
      if (this.groupIds.length === 0) {
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
      return;
      }
      await this.listarParticipantes()
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
