<template>
  <div class="cc-card">
    <div class="card-content">
      <div class="card-image">
        <img v-if="data.profilePicUrl" :src="data.profilePicUrl" alt="Profile Image" class="profile-pic">
        <div class="tags-icons-container" style="display: flex; flex-wrap: wrap; justify-content: start; align-items: center; margin-top: 8px;">
          <q-icon
            v-for="tag in data.tags"
            :key="tag.tag"
            :style="{ color: tag.color }"
            name="mdi-tag"
            size="1.4em"
            class="q-mb-sm">
            <q-tooltip>{{ tag.tag }}</q-tooltip>
          </q-icon>
          <q-icon
            v-if="data.wallet"
            name="mdi-wallet"
            size="1.4em"
            class="q-mb-sm">
            <q-tooltip>{{ data.wallet }}</q-tooltip>
          </q-icon>
        </div>
      </div>
      <div class="card-info">
        <p class="card-title">{{ data.title }}</p>
        <a :href="getPhoneNumberLink(data.description)" class="card-description blur-effect">
          {{ data.description }}
        </a>
        <p class="card-id">{{ "#" + data.id }}</p>
        <div class="card-actions">
          <q-btn v-if="cSessionsWpp.length > 0" style="font-size: 8px;" flat round icon="mdi-whatsapp" class="text-whatsapp" @click="abrirTicket()">
            <q-tooltip>Atendimento WWebJs</q-tooltip>
          </q-btn>
          <q-btn v-if="cSessionsBaileys.length > 0" style="font-size: 8px;" flat round icon="mdi-whatsapp" class="text-whatsapp" @click="abrirTicketBaileys()">
            <q-tooltip>Atendimento Baileys</q-tooltip>
          </q-btn>
          <q-btn v-if="cSessionsWaba.length > 0" style="font-size: 8px;" flat round icon="mdi-whatsapp" class="text-whatsapp" @click="abrirTicketWaba()">
            <q-tooltip>Atendimento Waba</q-tooltip>
          </q-btn>
          <!-- <q-btn style="font-size: 8px;" flat round icon="mdi-cancel" class="text-red" @click="markDone()">
            <q-tooltip>Remover</q-tooltip>
          </q-btn> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      mostrarMensagem: false
    }
  },
  name: 'Cards',
  props: ['data'],
  computed: {
    ...mapGetters(['whatsapps']),
    cSessionsWpp() {
      return this.whatsapps.filter(w => ["whatsapp"].includes(w.type) && !w.isDeleted && w.status === 'CONNECTED');
    },
    cSessionsWaba() {
      return this.whatsapps.filter(w => ["waba"].includes(w.type) && !w.isDeleted && w.status === 'CONNECTED');
    },
    cSessionsBaileys() {
      return this.whatsapps.filter(w => ["baileys"].includes(w.type) && !w.isDeleted && w.status === 'CONNECTED');
    },
  },
  methods: {
    getPhoneNumberLink(number) {
      if ((number.startsWith("55")) && (number.charAt(4) > 5)) {
        return `tel:${number.slice(0, 4)}9${number.slice(-8)}`;
      } else {
        return `tel:${number}`;
      }
    },
    abrirTicket() {
      this.$emit('abrirTicket', this.data);
    },
    abrirTicketWaba() {
      this.$emit('abrirTicketWaba', this.data);
    },
    abrirTicketBaileys() {
      this.$emit('abrirTicketBaileys', this.data);
    },
    markDone() {
      this.$emit('done', this.data);
    }
  }
};
</script>

<style lang="sass">
.cc-card
  display: flex
  flex-direction: column
  background-color: #fff
  border-radius: 8px
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1)
  padding: 20px
  margin: 10px
  width: 280px
  text-align: center
  &:hover
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2)

.card-content
  display: flex
  flex-direction: row
  align-items: center

.card-image
  display: flex
  flex-direction: column
  align-items: center

.profile-pic
  max-width: 80px
  border-radius: 50%
  margin-right: 20px
  height: auto

.card-info
  flex: 1
  display: flex
  flex-direction: column
  align-items: flex-start

.card-title
  font-size: 1.2em
  color: #333
  margin-bottom: 4px

.card-description
  font-size: 1em
  color: #555
  margin-bottom: 4px

.card-id
  font-size: 0.9em
  color: #777
  margin-bottom: 16px

.card-actions
  display: flex
  align-items: center
  justify-content: flex-start

.q-btn
  margin-right: 10px

.text-whatsapp
  color: #25d366

.text-red
  color: #ff0000

.blur-effect 
  filter: blur(0px)
</style>
