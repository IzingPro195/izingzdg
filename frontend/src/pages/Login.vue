<template>
  <div class="container">
    <div class="login-section fixed-layout">
      <q-layout class="vertical-center full-width">
        <q-page-container>
          <q-page class="flex justify-center items-center">
            <q-ajax-bar position="top" color="primary" size="5px" />
            <div class="login-content">
              <q-img
                src="/zpro.png"
                spinner-color="white"
                class="logo-image q-mb-lg q-px-md"
                style="max-width: 120%"
              />
              <q-separator spaced />
              <div class="text-primary">
                <div class="text-h6">Bem vindo!</div>
                <div>
                  <q-input
                    :color="$q.dark.isActive ? 'white ' : 'black'"
                    class="q-mb-md"
                    clearable
                    v-model="form.email"
                    placeholder="meu@email.com"
                    @blur="$v.form.email.$touch"
                    :error="$v.form.email.$error"
                    error-message="Deve ser um e-mail válido."
                    outlined
                    @keypress.enter="fazerLogin"
                  >
                    <template v-slot:prepend>
                      <q-icon
                        name="mdi-email-outline"
                        class="cursor-pointer"
                        color='primary'
                      />
                    </template>
                  </q-input>

                  <q-input
                    :color="$q.dark.isActive ? 'white ' : 'black'"
                    outlined
                    v-model="form.password"
                    :type="isPwd ? 'password' : 'text'"
                    @keypress.enter="fazerLogin"
                  >
                    <template v-slot:prepend>
                      <q-icon
                        name="mdi-shield-key-outline"
                        class="cursor-pointer"
                        color='primary'
                      />
                    </template>
                    <template v-slot:append>
                      <q-icon
                        :name="isPwd ? 'visibility_off' : 'visibility'"
                        class="cursor-pointer"
                        @click="isPwd = !isPwd"
                      />
                    </template>
                  </q-input>
                </div>
                <q-btn
                  class="q-mr-sm q-my-lg"
                  color="primary"
                  style="width: 150px"
                  :loading="loading"
                  @click="fazerLogin"
                >
                  Entrar
                  <span slot="loading">
                    <q-spinner-puff class="on-left" />Entrando...
                  </span>
                </q-btn>
                <q-btn
                  
                  @click="openPasswordResetModal"
                  
                  color="negative"
                >
                  Esqueci minha senha
                </q-btn>
              </div>
            </div>
          </q-page>
        </q-page-container>
      </q-layout>
    </div>
    <div class="video-container">
      <video
        autoplay
        muted
        loop
        style="width: 100%; height: auto; object-fit: cover; "
      >
        <source src="../assets/110694.mp4" type="video/mp4" />
      </video>
    </div>
    <q-dialog v-model="modalEsqueciSenha">
      <q-card style="width: 300px;">
        <q-card-section>
          <div class="text-h6">Recuperar Senha</div>
        </q-card-section>

        <q-card-section>
          <q-input
            v-model="emailRedefinicao"
            label="Digite seu e-mail"
            type="email"
            :error="$v.emailRedefinicao.$error"
            error-message="Deve ser um e-mail válido."
            @blur="$v.emailRedefinicao.$touch"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn 
          color="negative"
          label="Cancelar" 
          v-close-popup 
          />
          <q-btn
            label="Enviar"
            color="primary"
            @click="requestPasswordReset"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
import { MostrarCoresPublicas } from 'src/service/empresas';

export default {
  name: 'Login',
  data () {
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
      modalEsqueciSenha: false,
      emailRedefinicao: null,
      form: {
        email: null,
        password: null
      },
      contasCliente: {},
      isPwd: true,
      loading: false
    }
  },
  validations: {
    form: {
      email: { required, email },
      password: { required }
    },
    emailRedefinicao: { required, email }
  },
  methods: {
    async loadColors() {
      try {
        const response = await MostrarCoresPublicas();
        if (response.status === 200) {
          const colorsArray = response.data;

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
    fazerLogin () {
      this.$v.form.$touch()
      if (this.$v.form.$error) {
        this.$q.notify('Informe usuário e senha corretamente.')
        return
      }
      this.loading = true
      this.$store.dispatch('UserLogin', this.form)
        .then(data => {
          this.loading = false
        })
        .catch(err => {
          console.error('exStore', err)
          this.loading = false
        })
    },
    openPasswordResetModal() {
      this.modalEsqueciSenha = true;
    },
    async requestPasswordReset() {
      this.$v.emailRedefinicao.$touch()
      if (this.$v.emailRedefinicao.$error) {
        this.$q.notify('Informe um e-mail válido.')
        return
      }

      try {
        this.loading = true;
        await this.$store.dispatch('requestPasswordReset', { email: this.emailRedefinicao });
        this.$q.notify('E-mail de recuperação de senha enviado.');
        this.modalEsqueciSenha = false;
        this.loading = false;
      } catch (error) {
        this.$q.notify('Erro ao enviar e-mail de recuperação de senha.');
        this.loading = false;
      }
    },
    clear () {
      this.form.email = ''
      this.form.password = ''
      this.$v.form.$reset()
    }
  },
  mounted () {
    this.loadColors()
  }
}
</script>

<style scoped>
.container {
  display: flex;
  height: 100vh;
}

.login-section {
  width: 45%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background-color: white;
}

.full-width {
  width: 100%;
}

.login-content {
  max-width: 350px;
  text-align: center;
}

.video-container {
  display: flex;
  justify-content: flex-end;
  width: 55%;
}

.logo-image {
  height: auto;
  max-width: 100%;
}

.fixed-layout {
  width: 45%;
}

@media (max-width: 600px) {
  .video-container {
    display: none;
  }
  .login-section {
    width: 100%;
  }
}
</style>
