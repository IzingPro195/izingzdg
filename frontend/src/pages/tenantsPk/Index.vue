<template>
  <q-page>
    <div id="app" v-if="userProfile === 'superadmin'">
      <q-card class="q-mt-md">
        <q-card-section>
          <div class="text-h6">Environment Variables</div>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <q-list bordered padding>
            <q-item v-for="(value, key, index) in envData" :key="key" :class="{'light-gray': index % 2 === 0, 'dark-gray': index % 2 !== 0}">
              <q-item-section>{{ key }}</q-item-section>
              <q-item-section>{{ value }}</q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>

      <q-card class="q-mt-md">
        <q-card-section>
          <div class="text-h6">Package JSON Data</div>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <q-list bordered padding>
            <q-item v-for="(value, key, index) in packageData" :key="key" :class="{'light-gray': index % 2 === 0, 'dark-gray': index % 2 !== 0}">
              <q-item-section>{{ key }}</q-item-section>
              <q-item-section>{{ value }}</q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { MostrarCores } from 'src/service/empresas';
import { ListarTenantsEv, ListarTenantsPk } from 'src/service/tenants';

export default {
  name: 'App',
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
      envData: {},
      packageData: {},
      userProfile: 'user'
    };
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
            acc[key] = colorObj[key];
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
    async loadEnvData() {
      try {
        const response = await ListarTenantsEv();
        if (response.status === 200) {
          this.envData = response.data.data || response.data;
        } else {
          console.error('Error loading env data');
        }
      } catch (error) {
        console.error('Error loading env data:', error);
      }
    },
    async loadPackageData() {
      try {
        const response = await ListarTenantsPk();
        if (response.status === 200) {
          this.packageData = response.data;
        } else {
          console.error('Error loading package data');
        }
      } catch (error) {
        console.error('Error loading package data:', error);
      }
    },
  },
  mounted() {
    this.userProfile = localStorage.getItem('profile');
    this.loadColors();
    this.loadEnvData();
    this.loadPackageData();
  }
};
</script>

<style>
.light-gray {
  background-color: #f5f5f5;
}
.dark-gray {
  background-color: #e0e0e0;
}
</style>
