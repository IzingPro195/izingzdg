<template>
  <div>
    <q-tabs class="text-teal" align="left">
      <q-route-tab
        to="/massa/template"
        name="bulkTemplate"
        no-caps
        icon="mdi-rocket"
        label="Disparo em Massa Templates"
      />
      <q-route-tab
        to="/massa/texto"
        name="bulktext"
        no-caps
        icon="mdi-rocket"
        label="Disparo em Massa"
      />
      <q-route-tab
        to="/massa/textovariavel"
        name="bulktextVariavel"
        no-caps
        icon="mdi-rocket"
        label="Disparo em Massa + Variavel"
      />
      <q-route-tab
        to="/massa/sms"
        name="bulktextSMS"
        no-caps
        icon="mdi-rocket"
        label="Disparo em Massa SMS"
      />
    </q-tabs>
    <router-view />
  </div>
</template>

<script>
const usuario = JSON.parse(localStorage.getItem('usuario'))
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
      usuario
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
  },
  async mounted() {
    this.userProfile = localStorage.getItem('profile')
    this.loadColors()
  },
})
</script>
