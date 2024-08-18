<template>
  <div v-if="userProfile === 'admin'">
    <q-list class="text-weight-medium">
      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label> Não visualizar Tickets já atribuidos à outros usuários </q-item-label>
          <q-item-label caption> Somente o usuário responsável pelo ticket e/ou os administradores visualizarão a atendimento. </q-item-label>
        </q-item-section>

        <q-item-section avatar>
          <q-toggle
            v-model="NotViewAssignedTickets"
            false-value="disabled"
            true-value="enabled"
            checked-icon="check"
            keep-color
            :color="NotViewAssignedTickets === 'enabled' ? 'green' : 'negative'"
            size="md"
            unchecked-icon="clear"
            @input="atualizarConfiguracao('NotViewAssignedTickets')"
          />
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Não visualizar Tickets no ChatBot</q-item-label>
          <q-item-label caption> Quando habilitado, nenhum usuário poderá ver os tickets atendidos pelo chatbot. </q-item-label>
        </q-item-section>

        <q-item-section avatar>
          <q-toggle
            v-model="NotViewTicketsChatBot"
            false-value="disabled"
            true-value="enabled"
            checked-icon="check"
            keep-color
            :color="NotViewTicketsChatBot === 'enabled' ? 'green' : 'negative'"
            size="md"
            unchecked-icon="clear"
            @input="atualizarConfiguracao('NotViewTicketsChatBot')"
          />
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Forçar atendimento via Carteira</q-item-label>
          <q-item-label caption> Caso o contato tenha carteira vínculada, o sistema irá direcionar o atendimento somente para os donos da carteira de clientes. </q-item-label>
        </q-item-section>

        <q-item-section avatar>
          <q-toggle
            v-model="DirectTicketsToWallets"
            false-value="disabled"
            true-value="enabled"
            checked-icon="check"
            keep-color
            :color="DirectTicketsToWallets === 'enabled' ? 'green' : 'negative'"
            size="md"
            unchecked-icon="clear"
            @input="atualizarConfiguracao('DirectTicketsToWallets')"
          />
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Visualizar Tickets sem Usuário ou Fila Atribuído</q-item-label>
          <q-item-label caption> Habilitando esta opção todos os usuários visualizaram os atendimentos que entrarem na plataforma sem usuário ou fila atribuídos. </q-item-label>
        </q-item-section>

      <q-item-section avatar>
        <q-toggle
            v-model="ticketNulo"
            false-value="disabled"
            true-value="enabled"
            checked-icon="check"
            keep-color
            :color="ticketNulo === 'enabled' ? 'green' : 'negative'"
            size="md"
            unchecked-icon="clear"
            @input="alterarTenantNullTickets('ticketNulo')"
        />
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Fluxo ativo para o Bot de atendimento</q-item-label>
          <q-item-label caption> Fluxo a ser utilizado pelo Bot para os novos atendimentos </q-item-label>
        </q-item-section>
        <q-btn  @click="resetarFluxoAtivo"
            flat
            icon="mdi-replay"
            color="negative"
            class="bg-padrao btn-rounded" >
          <q-tooltip content-class="bg-negative text-bold">
            Resetar Fluxo Chatbot
          </q-tooltip>
        </q-btn>
        <q-item-section avatar>
          <q-select
            style="width: 300px"
            outlined
            dense
            v-model="botTicketActive"
            :options="listaChatFlow"
            map-options
            emit-value
            option-value="id"
            option-label="name"
            @input="atualizarConfiguracao('botTicketActive')"
          />
        </q-item-section>
        
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Ignorar Mensagens de Grupo</q-item-label>
          <q-item-label caption> Habilitando esta opção o sistema não abrirá ticket para grupos </q-item-label>
        </q-item-section>

      <q-item-section avatar>
        <q-toggle
            v-model="ignoreGroupMsg"
            false-value="disabled"
            true-value="enabled"
            checked-icon="check"
            keep-color
            :color="ignoreGroupMsg === 'enabled' ? 'green' : 'negative'"
            size="md"
            unchecked-icon="clear"
            @input="atualizarConfiguracao('ignoreGroupMsg')"
        />
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Recusar chamadas no Whatsapp</q-item-label>
          <q-item-label caption> Quando ativo, as ligações de aúdio e vídeo serão recusadas, automaticamente. </q-item-label>
        </q-item-section>

        <q-item-section avatar>
          <q-toggle
            v-model="rejectCalls"
            false-value="disabled"
            true-value="enabled"
            checked-icon="check"
            keep-color
            :color="rejectCalls === 'enabled' ? 'green' : 'negative'"
            size="md"
            unchecked-icon="clear"
            @input="atualizarConfiguracao('rejectCalls')"
          />
        </q-item-section>
      </q-item>

      <div class="row q-px-md" v-if="rejectCalls === 'enabled'">
        <div class="col-12">
          <q-input
            v-model="callRejectMessage"
            type="textarea"
            autogrow
            dense
            outlined
            label="Mensagem ao rejeitar ligação:"
            input-style="min-height: 6vh; max-height: 9vh;"
            debounce="700"
            @input="atualizarConfiguracao('callRejectMessage')"
          />
      </div>
      </div>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Habilitar guia de atendimento de Chatbots</q-item-label>
          <q-item-label caption> Habilitando esta opção será adicionada uma guia de atendimento exclusiva para os chatbots. </q-item-label>
        </q-item-section>

      <q-item-section avatar>
        <q-toggle
            v-model="chatbotLane"
            false-value="disabled"
            true-value="enabled"
            checked-icon="check"
            keep-color
            :color="chatbotLane === 'enabled' ? 'green' : 'negative'"
            size="md"
            unchecked-icon="clear"
            @input="alterarTenantShowChatbot('chatbotLane')"
        />
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Fixar conexões no topo do atendimento</q-item-label>
          <q-item-label caption> Habilitando esta opção as conexões deixarão de flutuar no roda-pé e serão fixadas no topo da lista de atendimentos. </q-item-label>
        </q-item-section>

      <q-item-section avatar>
        <q-toggle
            v-model="fixarConexao"
            false-value="disabled"
            true-value="enabled"
            checked-icon="check"
            keep-color
            :color="fixarConexao === 'enabled' ? 'green' : 'negative'"
            size="md"
            unchecked-icon="clear"
            @input="alterarTenantFixarConexoes('fixarConexao')"
        />
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Forçar admin no atendimento</q-item-label>
          <q-item-label caption> Habilitando esta opção os ticket pendentes serão atribuídos ao admin. </q-item-label>
        </q-item-section>

      <q-item-section avatar>
        <q-toggle
            v-model="forcarAdmin"
            false-value="disabled"
            true-value="enabled"
            checked-icon="check"
            keep-color
            :color="forcarAdmin === 'enabled' ? 'green' : 'negative'"
            size="md"
            unchecked-icon="clear"
            @input="alterarTenantForcarAdmin('forcarAdmin')"
        />
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Desabilitar controle de assinatura</q-item-label>
          <q-item-label caption> Habilitando esta opção o usuário não poderá desabilitar a assinatura no atendimento. </q-item-label>
        </q-item-section>

      <q-item-section avatar>
        <q-toggle
            v-model="signed"
            false-value="disabled"
            true-value="enabled"
            checked-icon="check"
            keep-color
            :color="signed === 'enabled' ? 'green' : 'negative'"
            size="md"
            unchecked-icon="clear"
            @input="atualizarConfiguracao('signed')"
        />
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Contador nas tabs superiores (Privados/Grupos)</q-item-label>
          <q-item-label caption> Habilitando esta opção o usuário irá visualizar os tickcets com mensagens abertas nas tabs superiores de conversas privadas e grupos. </q-item-label>
        </q-item-section>

      <q-item-section avatar>
        <q-toggle
            v-model="universalCounter"
            false-value="disabled"
            true-value="enabled"
            checked-icon="check"
            keep-color
            :color="universalCounter === 'enabled' ? 'green' : 'negative'"
            size="md"
            unchecked-icon="clear"
            @input="atualizarConfiguracao('universalCounter')"
        />
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Resolver atendimento sem interação automaticamente</q-item-label>
          <q-item-label caption> Habilitando esta opção atendimentos ociosos serão resolvidos automaticamente. </q-item-label>
        </q-item-section>

      <q-item-section avatar>
        <q-toggle
            v-model="autoClose"
            false-value="disabled"
            true-value="enabled"
            checked-icon="check"
            keep-color
            :color="autoClose === 'enabled' ? 'green' : 'negative'"
            size="md"
            unchecked-icon="clear"
            @input="atualizarConfiguracao('autoClose')"
        />
        </q-item-section>
      </q-item>

      <div class="row q-px-md" v-if="autoClose === 'enabled'">
        <div class="col-12">
          <q-select
            v-model="autoCloseTime"
            :options="tempoOptions"
            outlined
            label="Escolha uma opção (tempo em minutos)"
            input-style="min-height: 6vh; max-height: 9vh;"
            debounce="700"
            @input="atualizarConfiguracao('autoCloseTime')"
          />
        </div>
      </div>

      <div class="row q-px-md" v-if="autoClose === 'enabled'">
        <div class="col-12">
          <q-input
            v-model="autoCloseMessage"
            type="textarea"
            autogrow
            dense
            outlined
            label="Mensagem de encerramento"
            input-style="min-height: 6vh; max-height: 9vh;"
            debounce="700"
            @input="atualizarConfiguracao('autoCloseMessage')"
          />
        </div>
      </div>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Filtrar atendimentos antigos</q-item-label>
          <q-item-label caption> Habilitando esta opção você irá filtrar atendimentos antigos. </q-item-label>
        </q-item-section>

      <q-item-section avatar>
        <q-toggle
            v-model="ticketLimit"
            false-value="disabled"
            true-value="enabled"
            checked-icon="check"
            keep-color
            :color="ticketLimit === 'enabled' ? 'green' : 'negative'"
            size="md"
            unchecked-icon="clear"
            @input="atualizarConfiguracao('ticketLimit')"
        />
        </q-item-section>
      </q-item>

      <div class="row q-px-md" v-if="ticketLimit === 'enabled'">
        <div class="col-12">
          <q-input
            v-model="ticketLimitDaysAgo"
            type="number"
            autogrow
            dense
            outlined
            input-style="min-height: 6vh; max-height: 9vh;"
            debounce="700"
            @input="atualizarConfiguracao('ticketLimitDaysAgo')"
          />
        </div>
      </div>

      <!-- <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Controle de Pagamento ASAAS</q-item-label>
          <q-item-label caption> Quando ativo, você poderá controlar o acesso de acordo com o status de pagamento do ASAAS. </q-item-label>
        </q-item-section>

        <q-item-section avatar>
          <q-toggle
            v-model="asaas"
            false-value="disabled"
            true-value="enabled"
            checked-icon="check"
            keep-color
            :color="asaas === 'enabled' ? 'green' : 'negative'"
            size="md"
            unchecked-icon="clear"
            @input="atualizarConfiguracao('asaas')"
          />
        </q-item-section>
      </q-item>

      <div class="row q-px-md" v-if="asaas === 'enabled'">
        <div class="col-12">
          <q-input
            v-model="asaasCustomerId"
            type="textarea"
            autogrow
            dense
            outlined
            label="ASAAS Costumer ID:"
            input-style="min-height: 6vh; max-height: 9vh;"
            debounce="700"
            @input="atualizarConfiguracao('asaasCustomerId')"
          />
      </div>
      </div>

      <div class="row q-px-md" v-if="asaas === 'enabled'">
        <div class="col-12">
          <q-input
            v-model="asaasToken"
            type="textarea"
            autogrow
            dense
            outlined
            label="ASAAS Token:"
            input-style="min-height: 6vh; max-height: 9vh;"
            debounce="700"
            @input="atualizarConfiguracao('asaasToken')"
          />
      </div>
      </div> -->

      <!-- <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Notificações sonoras</q-item-label>
          <q-item-label caption> Habilitando esta opção o usuário receberá notificações de áudio. </q-item-label>
        </q-item-section>

      <q-item-section avatar>
        <q-toggle
            v-model="notificationSilenced"
            false-value="disabled"
            true-value="enabled"
            checked-icon="check"
            keep-color
            :color="notificationSilenced === 'enabled' ? 'green' : 'negative'"
            size="md"
            unchecked-icon="clear"
            @input="atualizarConfiguracao('notificationSilenced')"
        />
        </q-item-section>
      </q-item> -->

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Máximo de vezes que a mensagem de horário de atendimento deve ser enviada para o cliente.</q-item-label>
            <q-item-label caption>Insira aqui a quantidade de vezes que a mensagem de ausência pode ser enviada para cada atendimento...</q-item-label>
        </q-item-section>
        <q-item-section avatar>
          <q-input
              v-model="tentativas"
              type="number"
              dense
              outlined
              debounce="700"
              @input="alterarTenantTentativas('tentativas')"
              style="width: 300px"
            />
        </q-item-section>
        
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Quantidade de ticket que devem ser consultados em atendimentos.</q-item-label>
            <q-item-label caption>Insira aqui a quantidade de tickets que devem ser buscado na tela de atendimento...</q-item-label>
        </q-item-section>
        <q-item-section avatar>
          <q-input
              v-model="limiteTickets"
              type="number"
              dense
              outlined
              debounce="700"
              @input="alterarTenantLimiteTickets('limiteTickets')"
              style="width: 300px"
            />
        </q-item-section>
        
      </q-item>


      <!-- <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Máximo de vezes que a mensagem de horário de atendimento deve ser enviada para o cliente.</q-item-label>
          <q-item-label caption> Insira aqui a quantidade de vezes que a mensagem de ausência pode ser enviada para cada atendimento... </q-item-label>
        </q-item-section>
        </q-item>
      <div class="row q-px-md">
        <div class="col-12">
          <q-input
            v-model="tentativas"
            type="number"
            autogrow
            dense
            outlined
            input-style="min-height: 6vh; max-height: 9vh;"
            debounce="700"
            @input="alterarTenantTentativas('tentativas')"
          />
        </div>
      </div> -->

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Números bloqueados na plataforma</q-item-label>
          <q-item-label caption> Insira aqui a lista dos números (separados por vírgula) que não devem ser atendidos dentro da plataforma.. </q-item-label>
        </q-item-section>
        </q-item>
      <div class="row q-px-md">
        <div class="col-12">
          <q-input
            v-model="forbiddenNumbers"
            type="textarea"
            autogrow
            dense
            outlined
            input-style="min-height: 6vh; max-height: 9vh;"
            debounce="700"
            @input="atualizarConfiguracao('forbiddenNumbers')"
          />
        </div>
      </div>

      <!-- <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Reiniciar API Não Oficial</q-item-label>
          <q-item-label caption> Esse comando reinicia a api. </q-item-label>
        </q-item-section>
        <q-btn  @click="restart"
            flat
            icon="mdi-replay"
            color="negative"
            class="bg-padrao btn-rounded" >
          <q-tooltip content-class="bg-negative text-bold">
            Resetar
          </q-tooltip>
        </q-btn>
      </q-item>
       -->
      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Resolver Mensagens Com Erro</q-item-label>
          <q-item-label caption> Esse comando irá remover mensagens com erro do sistema. </q-item-label>
        </q-item-section>
        <q-btn  @click="resolvePending"
            flat
            icon="mdi-replay"
            color="negative"
            class="bg-padrao btn-rounded" >
          <q-tooltip content-class="bg-negative text-bold">
            Resolver
          </q-tooltip>
        </q-btn>
      </q-item>
      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Validar Todos os Contatos</q-item-label>
          <q-item-label caption> Esse comando irá validar o número de todos os contatos do sistema. </q-item-label>
          <div v-if="loading">Aguarde, validando todos os contatos do sistema...</div>
          <div v-if="loading" class="loading-bar">
          <div class="bar"></div>
          </div>
        </q-item-section>
        <q-btn  @click="checkContact"
            flat
            icon="mdi-replay"
            color="negative"
            class="bg-padrao btn-rounded" >
          <q-tooltip content-class="bg-negative text-bold">
            Validar
          </q-tooltip>
        </q-btn>
      </q-item>

    </q-list>
  </div>
</template>

<script>
const usuario = JSON.parse(localStorage.getItem('usuario'))
import { ListarChatFlow } from 'src/service/chatFlow'
import { Restart } from 'src/service/pm2'
import { AlterarConfiguracao, ListarConfiguracoes } from 'src/service/configuracoes'
import { ListarTenantPorId, AlterarTenantShowChatbot, AlterarTenantNullTickets, AlterarTenantTentativas, AlterarTenantLimiteTickets, AlterarTenantFixarConexoes, AlterarTenantForcarAdmin } from 'src/service/tenants'
import { ResolvePending } from 'src/service/tickets'
import { ValidarTodosContatos } from 'src/service/sessoesWhatsapp'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IndexConfiguracoes',
  data() {
    return {
      usuario,
      userProfile: 'user',
      tempoOptions: [
        { value: '10', label: '10 minutos' },
        { value: '60', label: '1 hora' },
        { value: '1440', label: '1 dia' },
        { value: '7200', label: '5 dias' },
        { value: '14400', label: '10 dias' },
      ],
      configuracoes: [],
      listaChatFlow: [],
      NotViewAssignedTickets: null,
      NotViewTicketsChatBot: null,
      DirectTicketsToWallets: null,
      botTicketActive: null,
      ignoreGroupMsg: null,
      rejectCalls: null,
      callRejectMessage: '',
      signed: null,
      chatbotLane: null,
      ticketNulo: null,
      fixarConexao: null,
      forcarAdmin: null,
      tentativas: '',
      limiteTickets: '',
      notificationSilenced: null,
      forbiddenNumbers: [],
      universalCounter: null,
      autoClose: null,
      autoCloseTime: null,
      autoCloseMessage: '',
      ticketLimit: null,
      ticketLimitDaysAgo: '',
      loading: false,
    }
  },
  methods: {
    async checkContact(){
      this.$q.notify({
        color: 'positive',
        position: 'top',
        message: 'Processo iniciado.',
      });
      this.loading = true;
      try{
        await ValidarTodosContatos()
        this.$q.notify({
          color: 'positive',
          position: 'top',
          message: 'Contatos validados.',
        });
        this.loading = false;
    } catch(e){
        this.$q.notify({
          color: 'negative',
          position: 'top',
          message: 'Erro ao validar contatos: ' + e.data.error,
        });
        this.loading = false;
      }
    },
    // recarregarPagina() {
    //   setTimeout(() => {
    //     location.reload(true);
    //   }, 1000);
    // },
    resetarFluxoAtivo() {
      this.botTicketActive = '';
      this.atualizarConfiguracao('botTicketActive');
    },
    async restart(){
      this.$q.dialog({
        title: 'Atenção!! Deseja realmente reiniciar a api?',
        message: `Esse processo irá reiniciar todos os serviços, e só deve ser executado caso você tenha acesso ao Servidor, para corrigir possíveis incosistênicas.`,
        cancel: {
          label: 'Não',
          color: 'primary',
          push: true
        },
        ok: {
          label: 'Sim',
          color: 'negative',
          push: true
        },
        persistent: true
      }).onOk(async () => {
        await Restart() 
      })
    },
    async resolvePending(){
      this.$q.dialog({
        title: 'Atenção!! Deseja realmente resolver todas as mensagens pendentes com erro?',
        message: `Esse processo irá resolver e deletar mensagens pendentes com erro no sistema.`,
        cancel: {
          label: 'Não',
          color: 'primary',
          push: true
        },
        ok: {
          label: 'Sim',
          color: 'negative',
          push: true
        },
        persistent: true
      }).onOk(async () => {
        await ResolvePending() 
      })
    },
    async listarConfiguracoes() {
      const { data } = await ListarConfiguracoes()
      this.configuracoes = data
      this.configuracoes.forEach((el) => {
        let value = el.value
        if (el.key === 'botTicketActive' && el.value) {
          value = +el.value
        }
        this.$data[el.key] = value
      })
    },
    async listarChatFlow() {
      const { data } = await ListarChatFlow()
      this.listaChatFlow = data.chatFlow
    },
    async atualizarConfiguracao(key) {
      if (key === 'autoCloseTime'){
        const params = { key, value: this.$data[key].value }
        try {
          await AlterarConfiguracao(params)
          this.$q.notify({
            type: 'positive',
            message: 'Configuração alterada!',
            progress: true,
            actions: [{ icon: 'close', round: true, color: 'white' }],
          })
        } catch (error) {
          console.error('error - AlterarConfiguracao', error)
          this.$data[key] = this.$data[key] === 'enabled' ? 'disabled' : 'enabled'
          this.$notificarErro('Ocorreu um erro!', error)
        }
      }
      else {
        const params = { key, value: this.$data[key] }
        try {
          await AlterarConfiguracao(params)
          this.$q.notify({
            type: 'positive',
            message: 'Configuração alterada!',
            progress: true,
            actions: [{ icon: 'close', round: true, color: 'white' }],
          })
        } catch (error) {
          console.error('error - AlterarConfiguracao', error)
          this.$data[key] = this.$data[key] === 'enabled' ? 'disabled' : 'enabled'
          this.$notificarErro('Ocorreu um erro!', error)
        }
      }
    },
    async alterarTenantShowChatbot(){
      try {
        await AlterarTenantShowChatbot({
          id: this.usuario.tenantId,
          showChatBot: this.chatbotLane,
        })
        this.$q.notify({
          type: 'positive',
          message: 'Configuração alterada!',
          progress: true,
          actions: [{ icon: 'close', round: true, color: 'white' }],
        })
      } catch (error) {
        console.error('error - AlterarConfiguracao', error)
        this.$notificarErro('Ocorreu um erro!', error)
      } 
    },
    async alterarTenantNullTickets(){
      try {
        await AlterarTenantNullTickets({
          id: this.usuario.tenantId,
          nullTickets: this.ticketNulo,
        })
        this.$q.notify({
          type: 'positive',
          message: 'Configuração alterada!',
          progress: true,
          actions: [{ icon: 'close', round: true, color: 'white' }],
        })
      } catch (error) {
        console.error('error - AlterarConfiguracao', error)
        this.$notificarErro('Ocorreu um erro!', error)
      } 
    },
    async alterarTenantForcarAdmin(){
      try {
        await AlterarTenantForcarAdmin({
          id: this.usuario.tenantId,
          forceAdmin: this.forcarAdmin,
        })
        this.$q.notify({
          type: 'positive',
          message: 'Configuração alterada!',
          progress: true,
          actions: [{ icon: 'close', round: true, color: 'white' }],
        })
      } catch (error) {
        console.error('error - AlterarConfiguracao', error)
        this.$notificarErro('Ocorreu um erro!', error)
      } 
    },
    async alterarTenantFixarConexoes(){
      try {
        await AlterarTenantFixarConexoes({
          id: this.usuario.tenantId,
          fixConnections: this.fixarConexao,
        })
        this.$q.notify({
          type: 'positive',
          message: 'Configuração alterada!',
          progress: true,
          actions: [{ icon: 'close', round: true, color: 'white' }],
        })
      } catch (error) {
        console.error('error - AlterarConfiguracao', error)
        this.$notificarErro('Ocorreu um erro!', error)
      } 
    },
    async alterarTenantTentativas(){
      try {
        await AlterarTenantTentativas({
          id: this.usuario.tenantId,
          maxRetries: this.tentativas,
        })
        this.$q.notify({
          type: 'positive',
          message: 'Configuração alterada!',
          progress: true,
          actions: [{ icon: 'close', round: true, color: 'white' }],
        })
      } catch (error) {
        console.error('error - AlterarConfiguracao', error)
        this.$notificarErro('Ocorreu um erro!', error)
      } 
    },
    async alterarTenantLimiteTickets(){
      try {
        await AlterarTenantLimiteTickets({
          id: this.usuario.tenantId,
          ticketLimit: this.limiteTickets,
        })
        this.$q.notify({
          type: 'positive',
          message: 'Configuração alterada!',
          progress: true,
          actions: [{ icon: 'close', round: true, color: 'white' }],
        })
      } catch (error) {
        console.error('error - AlterarConfiguracao', error)
        this.$notificarErro('Ocorreu um erro!', error)
      } 
    },
    async listarTenantPorId(){
      const { data } = await ListarTenantPorId(this.usuario.tenantId)
      this.chatbotLane = data[0].showChatBot
      this.ticketNulo = data[0].nullTickets
      this.tentativas = data[0].maxRetries
      this.fixarConexao = data[0].fixConnections
      this.forcarAdmin = data[0].forceAdmin
      this.limiteTickets = data[0].ticketLimit
    },
  },
  async mounted() {
    await this.listarConfiguracoes()
    await this.listarChatFlow()
    await this.listarTenantPorId()
    this.userProfile = localStorage.getItem('profile')
  },
})
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