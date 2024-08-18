<template>
  <div>
    <q-dialog
      persistent
      :value="modalTarefa"
      @hide="fecharModal"
      @show="abrirModal"
    >
      <q-card
        style="width: 500px"
        class="q-pa-lg"
      >
        <q-card-section>
          <div class="text-h6">{{ tarefaEdicao.id ? 'Editar': 'Criar' }} Tarefa</div>
        </q-card-section>

        <q-form ref="taskForm">
        <q-card-section>
          <q-input
            class="row col"
            square
            outlined
            v-model="tarefa.name"
            label="Nome"
            :rules="[val => !!val || 'O campo Nome é obrigatório']"
          />
          <q-input
            class="row col"
            square
            outlined
            v-model="tarefa.description"
            label="Descrição"
            type="textarea"
            autogrow
            :rules="[val => !!val || 'O campo Descrição é obrigatório']"
          />
          <q-input
            class="row col"
            square
            outlined
            v-model="tarefa.limitDate"
            label="Data Limite"
            readonly
            @click="openCalendar = true"
            :rules="[val => !!val || 'O campo Data Limite é obrigatório']"
          />
          <!-- <q-input
            class="row col"
            square
            outlined
            v-model="tarefa.owner"
            label="Responsável"
          /> -->
          <q-select
            class="row col"
            square
            outlined
            v-model="tarefa.owner"
            label="Responsável"
            :options="userOptions"
            @input="updateUser"
            :rules="[val => !!val || 'O campo Responsável é obrigatório']"
          />
          <q-select
            class="row col"
            square
            outlined
            v-model="tarefa.status"
            label="Status"
            :options="statusOptions"
            @input="updateStatus"
            :rules="[val => !!val || 'O campo Status é obrigatório']"
          />
          <q-select
            class="row col"
            square
            outlined
            v-model="tarefa.priority"
            label="Prioridade"
            :options="priorityOptions"
            @input="updatePrioridade"
            :rules="[val => !!val || 'O campo Prioridade é obrigatório']"
          />
          <q-input
            class="row col"
            square
            outlined
            v-model="tarefa.comments"
            label="Comentários"
            type="textarea"
            autogrow
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
            @click="validateForm"
          />
        </q-card-actions>
        </q-form>

      </q-card>
    </q-dialog>

    <q-dialog v-model="openCalendar">
      <q-date
        v-model="tarefa.limitDate"
        mask="YYYY-MM-DD"
        @input="openCalendar = false"
      />
    </q-dialog>
  </div>

</template>

<script>
import { CriarTarefa, AlterarTarefa } from 'src/service/tarefas'
import { ListarUsuarios } from 'src/service/user'
export default {
  name: 'ModalTarefa',
  props: {
    modalTarefa: {
      type: Boolean,
      default: false
    },
    tarefaEdicao: {
      type: Object,
      default: () => {
        return { id: null }
      }
    }
  },
  data () {
    return {
      openCalendar: false,
      tarefa: {
        id: null,
        name: null,
        description: null,
        limitDate: null,
        owner: null,
        status: null,
        priority: null,
        comments: null
      },
      statusOptions: [
        { label: '🚩 Atrasada', value: 'delayed' },
        { label: '🔄 Pendente', value: 'pending' },
        { label: '✅ Finalizada', value: 'finished' },
      ],
      priorityOptions: [
        { label: '⚡⚡⚡ Alta', value: 'high' },
        { label: '⚡⚡ Média', value: 'medium' },
        { label: '⚡ Baixa', value: 'low' },
        { label: '😉 Nenhuma', value: 'none' }
      ],
      userOptions: []
    }
  },
  methods: {
    async validateForm() {
      const valid = await this.$refs.taskForm.validate();
      if (valid) {
        this.handleTarefa();
      } else {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: 'Por favor, preencha todos os campos obrigatórios'
        });
      }
    },
    async listarUsuarios() {
      try {
        const { data } = await ListarUsuarios()
        this.userOptions = data.users
        .filter(user => user.profile !== 'superadmin')
        .map(user => ({
          label: user.name,
          value: user.name
        }));
      } catch (error) {
        console.error(error)
        this.$notificarErro('Problema ao carregar usuários', error)
      }
    },
    formatStatus(value) {
      const statusMap = {
        'delayed': '🚩 Atrasada',
        'pending': '🔄 Pendente',
        'finished': '✅ Finalizada'
      };
      return statusMap[value] || value;
    },
    formatPriority(value) {
      const priorityMap = {
        'high': '⚡⚡⚡ Alta',
        'medium': '⚡⚡ Média',
        'low': '⚡ Baixa',
        'none': '😉 Nenhuma'
      };
      return priorityMap[value] || value;
    },
    // formatDate(dateString) {
    //   const date = new Date(dateString);
    //   date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
    //   const day = date.getDate().toString().padStart(2, '0');
    //   const month = (date.getMonth() + 1).toString().padStart(2, '0');
    //   const year = date.getFullYear();
    //   return `${day}-${month}-${year}`;
    // },
    updateUser(selectedOption) {
      this.tarefa.owner = selectedOption.value;
    },
    updateStatus(selectedOption) {
      this.tarefa.status = selectedOption.value;
    },
    updatePrioridade(selectedOption) {
      this.tarefa.priority = selectedOption.value;
    },
    resetarTarefa () {
      this.tarefa = {
        id: null,
        name: null,
        description: null,
        limitDate: null,
        owner: null,
        status: null,
        priority: null,
        comments: null
      }
    },
    fecharModal () {
      this.resetarTarefa()
      this.$emit('update:tarefaEdicao', { id: null })
      this.$emit('update:modalTarefa', false)
    },
    abrirModal () {
      if (this.tarefaEdicao.id) {
        if(this.tarefaEdicao.status !== null){
          this.tarefaEdicao.status = this.formatStatus(this.tarefaEdicao.status)
        }
        if(this.tarefaEdicao.priority !== null){
          this.tarefaEdicao.priority = this.formatPriority(this.tarefaEdicao.priority)
        }
        // if(this.tarefaEdicao.limitDate !== null){
        //   this.tarefaEdicao.limitDate = this.formatDate(this.tarefaEdicao.limitDate)
        // }
        this.tarefa = { ...this.tarefaEdicao }
      } else {
        this.resetarTarefa()
      }
    },
    async handleTarefa () {
      try {
        this.loading = true
        if (this.tarefa.id) {
          const { data } = await AlterarTarefa(this.tarefa)
          this.$emit('modal-tarefa:editada', data)
          this.$q.notify({
            type: 'info',
            progress: true,
            position: 'top',
            textColor: 'black',
            message: 'Tarefa editada!',
            actions: [{
              icon: 'close',
              round: true,
              color: 'white'
            }]
          })
        } else {
          const { data } = await CriarTarefa(this.tarefa)
          this.$emit('modal-tarefa:criada', data)
          this.$q.notify({
            type: 'positive',
            progress: true,
            position: 'top',
            message: 'Tarefa criada!',
            actions: [{
              icon: 'close',
              round: true,
              color: 'white'
            }]
          })
        }
        this.loading = false
        this.fecharModal()
      } catch (error) {
        console.error(error)
        this.$notificarErro('Ocorreu um erro ao criar a tarefa', error)
      }
    }
  },
  async mounted() {
    await this.listarUsuarios()
  }
}
</script>

<style lang="scss" scoped>
</style>
