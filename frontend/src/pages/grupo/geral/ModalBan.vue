<template>
  <q-dialog
    persistent
    :value="modalBan"
    @hide="fecharModal"
    @show="abrirModal"
  >
    <q-card
      style="width: 500px"
      class="q-pa-lg"
    >
      <q-card-section>
        <div class="text-h6">{{ banEdicao.id ? 'Editar': 'Criar' }} Ban</div>
      </q-card-section>
      <q-card-section>
        <q-input
          class="row col"
          square
          outlined
          style="margin-bottom: 15px;margin-right: 5px;"
          v-model="ban.number"
          label="Número de Ban"
        />
        <q-select
          class="row col"
          v-model="whatsappId"
          :options="cSessionsOptions"
          label="WhatsApp ID"
          square
          outlined
          style="margin-bottom: 15px;margin-right: 5px;"
          @input="popularGrupos()"
        />
        <q-select
          class="row col"
          square
          outlined
          style="margin-bottom: 15px;margin-right: 5px;"
          v-model="ban.groupId"
          :options="groupOptions"
          label="Grupo"
          option-value="id"
          option-label="name"
          multiple
          use-chips
        />
      </q-card-section>
      <q-card-actions
        align="right"
        class="q-mt-md"
      >
        <q-btn
          flat
          label="Cancelar"
          color="negative"
          v-close-popup
          class="q-mr-md"
        />
        <q-btn
          flat
          label="Salvar"
          color="primary"
          @click="handleBan"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>

</template>

<script>
import { CriarBan, AlterarBan } from 'src/service/bans'
import { ListarGrupo } from 'src/service/grupo'
import { mapGetters } from 'vuex';

export default {
  name: 'ModalBan',
  props: {
    modalBan: {
      type: Boolean,
      default: false
    },
    banEdicao: {
      type: Object,
      default: () => {
        return { id: null }
      }
    }
  },
  data () {
    return {
      groupOptions: [],
      whatsappId: null,
      ban: {
        id: null,
        whatsappId: null,
        groupId: null,
      }
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
    resetarBan () {
      this.ban = {
        id: null,
        whatsappId  : null,
        groupId: null,
      }
    },
    fecharModal () {
      this.resetarBan()
      this.$emit('update:banEdicao', { id: null })
      this.$emit('update:modalBan', false)
    },
    abrirModal () {
      if (this.banEdicao.id) {
        this.ban = { ...this.banEdicao }
      } else {
        this.resetarBan()
      }
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
    async handleBan () {
      try {
        this.loading = true
        if (this.ban.id) {
          const { data } = await AlterarBan(this.ban)
          this.$emit('modal-ban:editada', data)
          this.$q.notify({
            type: 'info',
            progress: true,
            position: 'top',
            textColor: 'black',
            message: 'Ban editado!',
            actions: [{
              icon: 'close',
              round: true,
              color: 'white'
            }]
          })
        } else {
          const { data } = await CriarBan(this.ban)
          this.$emit('modal-ban:criada', data[0])
          this.$q.notify({
            type: 'positive',
            progress: true,
            position: 'top',
            message: 'Ban criado!',
            actions: [{
              icon: 'close',
              round: true,
              color: 'white'
            }]
          })
        }
        this.loading = false
        this.fecharModal()
        // setTimeout(() => {
        //   window.location.reload();
        // }, 300);
      } catch (error) {
        console.error(error)
        this.$notificarErro('Ocorreu um erro ao criar o ban', error)
      }
    }
  }

}
</script>

<style lang="scss" scoped>
</style>
