<template>
  <div class="container">
    <div class="reset-section fixed-layout">
      <q-layout class="vertical-center full-width">
        <q-page-container>
          <q-page class="flex justify-center items-center">
            <q-ajax-bar position="top" color="primary" size="5px" />
            <div class="reset-content">
              <q-img
                src="/zpro.png"
                spinner-color="white"
                class="logo-image q-mb-lg q-px-md"
                style="max-width: 120%"
              />
              <q-separator spaced />
              <div class="text-primary">
                <div class="text-h6">Redefinir Senha</div>
                <div>
                  <q-input
                    :color="$q.dark.isActive ? 'white ' : 'black'"
                    outlined
                    v-model="password"
                    :type="isPwd ? 'password' : 'text'"
                    placeholder="Nova Senha"
                    @keypress.enter="resetPassword"
                    class="q-mb-md"
                  >
                    <template v-slot:prepend>
                      <q-icon
                        name="mdi-lock-reset"
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

                  <q-input
                    :color="$q.dark.isActive ? 'white ' : 'black'"
                    outlined
                    v-model="confirmPassword"
                    :type="isConfirmPwd ? 'password' : 'text'"
                    placeholder="Confirmar Senha"
                    @keypress.enter="resetPassword"
                  >
                    <template v-slot:prepend>
                      <q-icon
                        name="mdi-lock-check-outline"
                        class="cursor-pointer"
                        color='primary'
                      />
                    </template>
                    <template v-slot:append>
                      <q-icon
                        :name="isConfirmPwd ? 'visibility_off' : 'visibility'"
                        class="cursor-pointer"
                        @click="isConfirmPwd = !isConfirmPwd"
                      />
                    </template>
                  </q-input>
                </div>
                <q-btn
                  class="q-mr-sm q-my-lg"
                  color="primary"
                  style="width: 150px"
                  :loading="loading"
                  @click="resetPassword"
                >
                  Redefinir
                  <span slot="loading">
                    <q-spinner-puff class="on-left" />Redefinindo...
                  </span>
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
  </div>
</template>

<script>
import { RedefinirSenha } from 'src/service/login'

export default {
  data() {
    return {
      password: '',
      confirmPassword: '',
      isPwd: true,
      isConfirmPwd: true,
      loading: false
    }
  },
  methods: {
    async resetPassword() {
      if (this.password !== this.confirmPassword) {
        this.$q.notify({
          type: 'negative',
          message: 'As senhas não coincidem.'
        })
        return
      }
      try {
        this.loading = true;
        const token = this.$route.params.token;
        await RedefinirSenha({ token, password: this.password });
        this.$q.notify({
          type: 'positive',
          message: 'Senha redefinida com sucesso!'
        });
        this.$router.push('/login');
        this.loading = false;
      } catch (error) {
        this.$q.notify({
          type: 'negative',
          message: 'Erro ao redefinir a senha.'
        });
        this.loading = false;
      }
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  height: 100vh;
}

.reset-section {
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

.reset-content {
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
  .reset-section {
    width: 100%;
  }
}
</style>
