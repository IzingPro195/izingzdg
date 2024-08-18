<template>
  <div v-if="userProfile === 'admin'">
    <q-list class="text-weight-medium">

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Variáveis da Plataforma</q-item-label>
          <q-item-label caption> <div class="col-12">
            <li class="text-weight-medium text-nowrap q-pr-md blur-effect">
              <span class="text-bold">{{'\{\{name\}\}'}}:
              </span>
              nome
            </li>
            <li class="text-weight-medium text-nowrap q-pr-md blur-effect">
              <span class="text-bold">{{'\{\{greeting\}\}'}}:
              </span>
              saudação
            </li>
            <li class="text-weight-medium text-nowrap q-pr-md blur-effect">
              <span class="text-bold">{{'\{\{protocol\}\}'}}:
              </span>
              protocolo de abertura
            </li>
            <li class="text-weight-medium text-nowrap q-pr-md blur-effect">
              <span class="text-bold">{{'\{\{email\}\}'}}:
              </span>
              e-mail (se existir)
            </li>
            <li class="text-weight-medium text-nowrap q-pr-md blur-effect">
              <span class="text-bold">{{'\{\{phoneNumber\}\}'}}:
              </span>
              telefone
            </li>
            <li class="text-weight-medium text-nowrap q-pr-md blur-effect">
              <span class="text-bold">{{'\{\{kanban\}\}'}}:
              </span>
              kanban (se existir)
            </li>
            <li class="text-weight-medium text-nowrap q-pr-md blur-effect">
              <span class="text-bold">{{'\{\{user\}\}'}}:
              </span>
              atendente
            </li>
            <li class="text-weight-medium text-nowrap q-pr-md blur-effect">
              <span class="text-bold">{{'\{\{userEmail\}\}'}}:
              </span>
              e-mail do atendente
            </li>
        </div></q-item-label>
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Variáveis do TypeBot</q-item-label>
          <q-item-label caption> <div class="col-12">
            <li class="text-weight-medium text-nowrap q-pr-md blur-effect">
              <span class="text-bold">{{'\{\{nome\}\}'}}:
              </span>
              nome
            </li>
            <li class="text-weight-medium text-nowrap q-pr-md blur-effect">
              <span class="text-bold">{{'\{\{numero\}\}'}}:
              </span>
              número
            </li>
            <li class="text-weight-medium text-nowrap q-pr-md blur-effect">
              <span class="text-bold">{{'\{\{atendimento\}\}'}}:
              </span>
              número do ticket
            </li>
            <li class="text-weight-medium text-nowrap q-pr-md blur-effect">
              <span class="text-bold">{{'\{\{email\}\}'}}:
              </span>
              e-mail (se existir)
            </li>
            <li class="text-weight-medium text-nowrap q-pr-md blur-effect">
              <span class="text-bold">{{'\{\{status\}\}'}}:
              </span>
              status do ticket
            </li>
            <!-- <li class="text-weight-medium text-nowrap q-pr-md blur-effect">
              <span class="text-bold">{{'\{\{ultimamensagem\}\}'}}:
              </span>
              última mensagem recebida
            </li> -->
            <li class="text-weight-medium text-nowrap q-pr-md blur-effect">
              <span class="text-bold">{{'\{\{canal\}\}'}}:
              </span>
              canal de atendimento
            </li>
            <li class="text-weight-medium text-nowrap q-pr-md blur-effect">
              <span class="text-bold">{{'\{\{grupo\}\}'}}:
              </span>
              atendimento em grupo ou não
            </li>
            <li class="text-weight-medium text-nowrap q-pr-md blur-effect">
              <span class="text-bold">{{'\{\{fullTicket\}\}'}}:
              </span>
              todas as propriedades do atendimento
            </li>
        </div></q-item-label>
        </q-item-section>
      </q-item>
      
      <!-- <div class="row q-px-md" style="margin-top: 20px;">
        <div class="col-12">
            <li class="text-weight-medium text-nowrap q-pr-md blur-effect">
              <span class="text-bold">{{'\{\{name\}\}'}}:
              </span>
              nome
            </li>
            <li class="text-weight-medium text-nowrap q-pr-md blur-effect">
              <span class="text-bold">{{'\{\{greeting\}\}'}}:
              </span>
              saudação
            </li>
            <li class="text-weight-medium text-nowrap q-pr-md blur-effect">
              <span class="text-bold">{{'\{\{protocol\}\}'}}:
              </span>
              protocolo de abertura
            </li>
            <li class="text-weight-medium text-nowrap q-pr-md blur-effect">
              <span class="text-bold">{{'\{\{email\}\}'}}:
              </span>
              e-mail (se existir)
            </li>
            <li class="text-weight-medium text-nowrap q-pr-md blur-effect">
              <span class="text-bold">{{'\{\{phoneNumber\}\}'}}:
              </span>
              telefone
            </li>
            <li class="text-weight-medium text-nowrap q-pr-md blur-effect">
              <span class="text-bold">{{'\{\{kanban\}\}'}}:
              </span>
              kanban (se existir)
            </li>
            <li class="text-weight-medium text-nowrap q-pr-md blur-effect">
              <span class="text-bold">{{'\{\{user\}\}'}}:
              </span>
              atendente
            </li>
            <li class="text-weight-medium text-nowrap q-pr-md blur-effect">
              <span class="text-bold">{{'\{\{userEmail\}\}'}}:
              </span>
              e-mail do atendente
            </li>
        </div>
      </div> -->

    </q-list>
  </div>
</template>

<script>
const usuario = JSON.parse(localStorage.getItem('usuario'))
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IndexConfiguracoes',
  data() {
    return {
      usuario,
      metaToken: '',
      webhookChecked: '',
      loading: false,
      userProfile: 'user'
    }
  },
  async mounted() {
    this.userProfile = localStorage.getItem('profile')
  },
})
</script>
