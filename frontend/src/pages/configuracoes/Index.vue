<template>
  <div v-if="userProfile === 'admin'">
    <q-tabs class="text-teal" align="left">
      <q-route-tab
        to="/configuracoes/geral"
        name="settings"
        no-caps
        icon="settings"
        label="Config. Gerais"
      />
      <q-route-tab
        v-if="asaas"
        to="/configuracoes/pagamentos"
        name="pagamentos"
        no-caps
        icon="payments"
        label="Config. Pagamento"
      />
      <q-route-tab
        to="/configuracoes/webhooks"
        name="webhooks"
        icon="webhook"
        no-caps
        label="Config. Webhooks"
      />
      <q-route-tab
        to="/configuracoes/smtp"
        name="smtp"
        icon="mdi-email"
        no-caps
        label="Config. SMTP"
      />
      <q-route-tab
        to="/configuracoes/typebot"
        name="typebot"
        icon="smart_toy"
        no-caps
        label="Config. Typebot"
      />
      <q-route-tab
        to="/configuracoes/dialogflow"
        name="dialogflow"
        icon="smart_toy"
        no-caps
        label="Config. Dialogflow"
      />
      <q-route-tab
        to="/configuracoes/chat-gpt"
        name="chat gpt"
        icon="smart_toy"
        no-caps
        label="Config. Chat GPT"
      />
      <q-route-tab
        to="/configuracoes/n8n"
        name="n8n"
        icon="smart_toy"
        no-caps
        label="Config. N8N"
      />
      <q-route-tab
        to="/configuracoes/dify"
        name="dify"
        icon="smart_toy"
        no-caps
        label="Config. Dify (Beta)"
      />
      <q-route-tab
        to="/configuracoes/sms"
        name="sms"
        icon="mdi-cellphone-message"
        no-caps
        label="Config. SMS"
      />
      <q-route-tab
        to="/configuracoes/meta"
        name="meta"
        icon="mdi-whatsapp"
        no-caps
        label="Config. Meta"
      />
      <q-route-tab
        to="/configuracoes/variaveis"
        name="variaveis"
        icon="mdi-iframe-variable-outline"
        no-caps
        label="Config. Variaveis"
      />
      <q-route-tab
        to="/configuracoes/lanes"
        name="lanes"
        icon="mdi-tray-full"
        no-caps
        label="Config. Kanban"
      />
    </q-tabs>
    <router-view />
  </div>
</template>

<script>
const usuario = JSON.parse(localStorage.getItem('usuario'))
import { ListarTenantPorId } from 'src/service/tenants'
import { MostrarCores } from 'src/service/empresas';
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IndexConfiguracoes',
  data() {
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
      usuario,
      asaas: false,
    }
  },
  methods: {
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
    async listarTenantPorId(){
      const { data } = await ListarTenantPorId(this.usuario.tenantId)
      if (data[0].asaas === 'enabled'){
        this.asaas = true
      } else {
        this.asaas = false
      }
    },
  },
  async mounted() {
    await this.listarTenantPorId()
    this.userProfile = localStorage.getItem('profile')
    this.loadColors()
  },
})
</script>