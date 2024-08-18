<template>
  <div>
    <q-table
      class="my-sticky-dynamic"
      title="Contatos"
      :id="`tabela-contatos-${isChatContact ? 'atendimento' : ''}`"
      :data="contacts"
      :columns="columns"
      :loading="loading"
      row-key="id"
      virtual-scroll
      :virtual-scroll-item-size="48"
      :virtual-scroll-sticky-size-start="48"
      :pagination.sync="pagination"
      :rows-per-page-options="[0]"
      @virtual-scroll="onScroll"
      :bordered="isChatContact"
      :square="isChatContact"
      :flat="isChatContact"
      :separator="isChatContact ? 'vertical' : 'horizontal'"
      :class="{
        'q-ma-lg': !isChatContact,
        'q-ml-md heightChat': isChatContact
      }"
    >
      <template v-slot:top>
        <div class="row col-2 q-table__title items-center ">
          <q-btn
            v-if="isChatContact"
            class="q-mr-sm"
            color="black"
            round
            flat
            icon="mdi-close"
            @click="$router.push({ name: 'chat-empty' })"
          />
          Contatos
        </div>
        <q-space />
        <q-input
          :class="{
          'order-last q-mt-md': $q.screen.width < 500
        }"
          style="width: 300px"
          filled
          dense
          debounce="500"
          v-model="filter"
          clearable
          placeholder="Localize"
          @input="filtrarContato"
        >
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-btn
          class="q-ml-md"
          color="warning"
          label="Sincronizar Contatos"
          @click="confirmarSincronizarContatos"
        />
        <q-btn
          class="q-ml-md"
          color="warning"
          label="Sincronizar Grupos"
          @click="confirmarSincronizarGrupos"
        />
        <q-btn
          class="q-ml-md"
          color="black"
          label="Importar"
          v-if="!isChatContact"
          @click="modalImportarContatos = true"
          >
          <q-tooltip :offset="[5, 5]">
            Nome;User<br>
            Número;5551900000
          </q-tooltip>
        </q-btn>
        <q-btn
          class="q-ml-md"
          color="grey-8"
          v-if="!isChatContact"
          label="Exportar"
          @click="handleExportContacts"
        />
        <q-btn
          class="q-ml-md"
          color="primary"
          label="Adicionar"
          @click="selectedContactId = null; modalContato = true"
        />
      </template>
      <template v-slot:body-cell-profilePicUrl="props">
        <q-td>
          <q-avatar style="border: 1px solid #9e9e9ea1 !important">
            <q-icon
              name="mdi-account"
              size="1.5em"
              color="grey-5"
              v-if="!props.value"
            />
            <q-img
              :src="props.value"
              style="max-width: 150px"
            >
              <template v-slot:error>
                <q-icon
                  name="mdi-account"
                  size="1.5em"
                  color="grey-5"
                />
              </template>
            </q-img>
          </q-avatar>
        </q-td>
      </template>
      <template v-slot:body-cell-acoes="props">
        <q-td class="text-center">
          <q-btn
            flat
            round
            icon="img:whatsapp-logo.png"
            @click="handleSaveTicket(props.row, 'whatsapp')"
            v-if="props.row.number && cSessionsWpp.length > 0"
          />
          <q-btn
            flat
            round
            icon="img:baileys-logo.png"
            @click="handleSaveTicket(props.row, 'baileys')"
            v-if="props.row.number && cSessionsBaileys.length > 0"
          />
          <q-btn
            flat
            round
            icon="img:waba-logo.png"
            @click="handleSaveTicket(props.row, 'waba')"
            v-if="props.row.number && cSessionsWaba.length > 0"
          />
          <q-btn
            flat
            round
            icon="img:instagram-logo.png"
            @click="handleSaveTicket(props.row, 'instagram')"
            v-if="props.row.instagramPK"
          />
          <!-- <q-btn
            flat
            round
            icon="img:telegram-logo.png"
            @click="handleSaveTicket(props.row, 'telegram')"
            v-if="props.row.number"
          /> -->
          <q-btn
            flat
            round
            icon="edit"
            @click="editContact(props.row.id)"
          />
          <q-btn
            flat
            round
            icon="mdi-delete"
            @click="deleteContact(props.row.id)"
          />
        </q-td>
      </template>
      <template v-slot:body-cell-number="props" >
        <q-td>
          <span v-if="props.row.number" class="blur-effect">
            <a :href="getPhoneNumberLink(props.row.number)">
              {{ props.row.number }}
            </a>
          </span>
        </q-td>
      </template>
      <template v-slot:body-cell-email="props">
        <q-td>
          <span v-if="props.row.email">
            <a :href="'mailto:' + props.row.email">{{ props.row.email }}</a>
          </span>
        </q-td>
      </template>
      <template v-slot:body-cell-name="props">
        <q-td>
          <span v-if="props.row.name">
            {{ props.row.name }}
          </span>
        </q-td>
      </template>
      <template v-slot:body-cell-tags="props">
      <q-td :props="props">
        <span v-html="formatTags(props.row.tags)"></span>
      </q-td>
    </template>
      <template v-slot:pagination="{ pagination }">
        {{ contacts.length }}/{{ pagination.rowsNumber }}
      </template>
    </q-table>
    <ContatoModal
      :contactId="selectedContactId"
      :modalContato.sync="modalContato"
      @contatoModal:contato-editado="UPDATE_CONTACTS"
      @contatoModal:contato-criado="UPDATE_CONTACTS"
    />

    <q-dialog
      v-model="modalImportarContatos"
      persistent
      @show="abrirEnvioArquivo"
    >
      <q-card style="width: 400px;">
        <q-card-section class="row items-center">
          <div class="text-h6">Importar Contatos</div>
        </q-card-section>
        <q-card-section>
          <q-file
            ref="PickerFileMessage"
            id="PickerFileMessage"
            bg-color="blue-grey-1"
            outlined
            dense
            use-chips
            accept=".csv"
            v-model="file"
            label="Importar contatos"
            hint="O arquivo deve conter as colunas Nome e Numero"
          >
            <template v-slot:prepend>
              <q-icon name="cloud_upload" />
            </template>
          </q-file>

        </q-card-section>
        <q-card-section>
          <q-card
            class="bg-white q-mt-sm btn-rounded"
            style="width: 100%"
            bordered
            flat
          >
            <q-card-section class="text-bold q-pb-none">
              Etiquetas
              <q-separator />
            </q-card-section>
            <q-card-section class="q-pa-none">
              <q-select
                square
                borderless
                v-model="tags"
                multiple
                :options="etiquetas"
                use-chips
                option-value="id"
                option-label="tag"
                emit-value
                map-options
                dropdown-icon="add"
              >
                <template v-slot:option="{ itemProps, itemEvents, opt, selected, toggleOption }">
                  <q-item
                    v-bind="itemProps"
                    v-on="itemEvents"
                  >
                    <q-item-section>
                      <q-item-label v-html="opt.tag"></q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <q-checkbox
                        :value="selected"
                        @input="toggleOption(opt)"
                      />
                    </q-item-section>
                  </q-item>
                </template>
                <template v-slot:selected-item="{ opt }">
                  <q-chip
                    dense
                    square
                    color="white"
                    text-color="primary"
                    class="q-ma-xs row col-12 text-body1"
                  >
                    <q-icon
                      :style="`color: ${opt.color}`"
                      name="mdi-pound-box-outline"
                      size="28px"
                      class="q-mr-sm"
                    />
                    {{ opt.tag }}
                  </q-chip>
                </template>
                <template v-slot:no-option="{ itemProps, itemEvents }">
                  <q-item
                    v-bind="itemProps"
                    v-on="itemEvents"
                  >
                    <q-item-section>
                      <q-item-label class="text-negative text-bold">
                        Ops... Sem etiquetas criadas!
                      </q-item-label>
                      <q-item-label caption>
                        Cadastre novas etiquetas na administração de sistemas.
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </template>

              </q-select>
            </q-card-section>
          </q-card>
        </q-card-section>
        <q-card-section>
          <q-card
            class="bg-white q-mt-sm btn-rounded"
            style="width: 100%"
            bordered
            flat
          >
            <q-card-section class="text-bold q-pb-none">
              Carteira
              <q-separator />
            </q-card-section>
            <q-card-section class="q-pa-none">
              <q-select
                square
                borderless
                v-model="wallets"
                multiple
                :max-values="1"
                :options="usuarios"
                use-chips
                option-value="id"
                option-label="name"
                emit-value
                map-options
                dropdown-icon="add"
              >
              </q-select>
            </q-card-section>
          </q-card>
        </q-card-section>
        <q-card-section>

        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            class="q-ml-md"
            color="negative"
            label="Cancelar"
            v-close-popup
            @click="isImportCSV = false; modalImportarContatos = false"
          />

          <q-btn
            class="q-ml-md"
            color="positive"
            label="Confirmar"
            @click="handleImportCSV"
          />
          <q-btn
            class="q-ml-md"
            color="primary"
            label="Baixar Modelo"
            @click="downloadModelCsv"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="modalTransferirTicket"
      @hide="modalTransferirTicket = false"
      persistent>
      <q-card class="q-pa-md"
        style="width: 500px">
        <q-card-section>
          <div class="text-h6">Selecione o destino:</div>
        </q-card-section>
        <q-card-section>
          <q-select square
            outlined
            v-model="filaSelecionada"
            :options="filas"
            emit-value
            map-options
            option-value="id"
            option-label="queue"
            label="Fila de destino" />
        </q-card-section>
        <q-card-section>
          <q-select square
            outlined
            v-model="usuarioSelecionado"
            :options="usuariosTransferencia.filter(filterUsers)"
            emit-value
            map-options
            option-value="id"
            option-label="name"
            label="Usuário destino" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat
            label="Sair"
            color="negative"
            v-close-popup
            class="q-mr-lg" />
          <q-btn flat
            label="Salvar"
            color="primary"
            @click="confirmarTransferenciaTicket" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
const userId = +localStorage.getItem('userId')
import { CriarTicket, AtualizarTicket } from 'src/service/tickets'
import { ListarContatos, ImportarArquivoContato, DeletarContato, SyncronizarContatos, SyncronizarGrupos, ExportarArquivoContato } from 'src/service/contatos'
import ContatoModal from './ContatoModal'
import { ListarUsuarios, DadosUsuario } from 'src/service/user'
import { ListarEtiquetas } from 'src/service/etiquetas'
import { mapGetters } from 'vuex'
import { ListarFilas } from 'src/service/filas'
import { MostrarCores } from 'src/service/empresas';

export default {
  name: 'IndexContatos',
  components: { ContatoModal },
  userProfile: 'user',
  usuario: {},
  props: {
    isChatContact: {
      type: Boolean,
      default: false
    }
  },
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
      modalTransferirTicket: false,
      usuarioSelecionado: null,
      filaSelecionada: null,
      filas: [],
      usuariosTransferencia: [],
      contacts: [],
      ticketFocado: '',
      modalImportarContatos: false,
      modalContato: false,
      file: [],
      isImportCSV: false,
      filter: null,
      selectedContactId: null,
      params: {
        pageNumber: 1,
        searchParam: null,
        hasMore: true
      },
      wallets: [],
      tags: [],
      etiquetas: [],
      usuarios: [],
      pagination: {
        rowsPerPage: 100,
        rowsNumber: 0,
        lastIndex: 0
      },
      loading: false,
      columns: [
        { name: 'profilePicUrl', label: '', field: 'profilePicUrl', style: 'width: 50px', align: 'center' },
        {
          name: 'name',
          label: 'Nome',
          field: 'name',
          align: 'left',
          style: 'width: 300px',
          format: (v, r) => {
            if (r.number && r.name == r.number && r.pushname) {
              return r.pushname
            }
            return r.name
          }
        },
        { 
          name: 'number', 
          label: 'WhatsApp', 
          field: 'number', 
          align: 'center', 
          style: 'width: 300px' ,
        },
        {
          name: 'wallet',
          label: 'Carteira',
          field: 'wallet',
          align: 'center',
          style: 'width: 300px'
          // format: v => v ? v.map(n => n.name)?.join(', ') : ''
        },
        {
          name: 'tags',
          label: 'Etiquetas',
          field: 'tags',
          align: 'center',
          style: 'width: 300px'
        },
        // {
        //   name: 'instagramPK',
        //   label: 'Instagram',
        //   field: 'instagramPK',
        //   align: 'center',
        //   style: 'width: 300px',
        // //   format: (v, r) => {
        // //     return r.instagramPK ? r.pushname : ''
        // //   }
        // },
        { name: 'email', label: 'Email', field: 'email', style: 'width: 500px', align: 'left' },
        { name: 'cpf', label: 'CPF', field: 'cpf', style: 'width: 500px', align: 'left' },
        { name: 'birthdayDate', label: 'Aniversário', field: 'birthdayDate', style: 'width: 500px', align: 'left' },
        {
          name: 'telegramId',
          label: 'Id Telegram',
          field: 'telegramId',
          align: 'center',
          style: 'width: 300px',
          format: (v, r) => {
            return r.telegramId ? r.pushname : ''
          }
        },
        { name: 'acoes', label: 'Ações', field: 'acoes', align: 'center' }
      ]
    }
  },
  methods: {
    // async loadColors() {
    //   try {
    //     const response = await MostrarCores();
    //     if (response.status === 200) {
    //       const companyData = response.data[0];
    //       const colorsArray = companyData.systemColors;

    //       this.colors = colorsArray.reduce((acc, colorObj) => {
    //         const key = colorObj.label.toLowerCase();
    //         acc[key] = colorObj.systemColors;
    //         return acc;
    //       }, {});

    //       const root = document.documentElement;
    //       root.style.setProperty("--q-neutral", this.colors.neutral);
    //       root.style.setProperty("--q-primary", this.colors.primary);
    //       root.style.setProperty("--q-secondary", this.colors.secondary);
    //       root.style.setProperty("--q-accent", this.colors.accent);
    //       root.style.setProperty("--q-warning", this.colors.warning);
    //       root.style.setProperty("--q-negative", this.colors.negative);
    //       root.style.setProperty("--q-positive", this.colors.positive);
    //       root.style.setProperty("--q-light", this.colors.light);
    //     } else {
    //       console.error('Erro ao carregar as cores');
    //     }
    //   } catch (error) {
    //     console.error('Erro ao carregar as cores:', error);
    //   }
    // },
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
    formatTags(tags) {
      if (!Array.isArray(tags)) return '';

      return tags.map(tag => {
        return `<span style="background-color: ${tag.color}; padding: 2px 8px; border-radius: 4px; color: white; margin-right: 4px;">${tag.tag}</span>`;
      }).join('');
    },
    downloadModelCsv() {
      const csvContent = 'nome;numero;email;cpf;dataNascimento\nUser;5551900000;email@gmail.com;000.000.000-00;15/06/1987';
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.setAttribute('download', 'model.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    getPhoneNumberLink(number) {
      if ((number.startsWith("55")) && (number.charAt(4) > 5)) {
        return `tel:${number.slice(0, 4)}9${number.slice(-8)}`;
      } else {
        return `tel:${number}`;
      }
    },
    abrirEnvioArquivo (event) {
      this.isImportCSV = true
      this.$refs.PickerFileMessage.pickFiles(event)
    },
    async handleImportCSV () {
      try {
        this.$q.notify({
          type: 'warning',
          message: 'Isso pode demorar um pouco.',
          caption: 'Após finalizar, a página será atualizada.',
          position: 'top'
        })
        const formData = new FormData()
        formData.append('file', this.file)
        if (this.tags.length > 0) {
          formData.append('tags', this.tags)
        }
        if (this.wallets.length > 0) {
          formData.append('wallets', this.wallets)
        }
        await ImportarArquivoContato(formData)
        this.$notificarSucesso('Contatos importados com sucesso!')
        this.$router.go(0)
      } catch (err) {
        this.$notificarErro(err)
      }
    },
    async listarFilas() {
      const { data: userData } = await DadosUsuario(this.usuario.userId);

      return new Promise(async (resolve, reject) => {
          try {
              const { data: filasData } = await ListarFilas();

              // Extrai os IDs das filas do usuário
              const userQueueIds = userData.queues.map(queue => queue.id);

              // Filtra as filas ativas e que fazem parte das filas do usuário
              this.filas = filasData.filter(fila => fila.isActive && userQueueIds.includes(fila.id));

              this.modalTransferirTicket = true;
              this.listarUsuariosTransferencia();
              this.$once('modalClosed', () => {
                  resolve();
              });
          } catch (error) {
              console.error(error);
              this.$notificarErro('Problema ao carregar filas', error);
              reject(error);
          }
      });
    },
    // async listarFilas() {
    //   console.log(this.usuario.userId)
    //   const { data } = await DadosUsuario(this.usuario.userId)
    //   console.log('user', data)
    //   return new Promise(async (resolve, reject) => {
    //     try {
    //       const { data } = await ListarFilas();
    //       console.log('fila', data)
    //       this.filas = data.filter(fila => fila.isActive);
    //       this.modalTransferirTicket = true;
    //       this.listarUsuariosTransferencia();
    //       this.$once('modalClosed', () => {
    //         resolve();
    //       });
    //     } catch (error) {
    //       console.error(error);
    //       this.$notificarErro('Problema ao carregar filas', error);
    //       reject(error);
    //     }
    //   });
    // },
    async listarUsuariosTransferencia () {
      try {
        const { data } = await ListarUsuarios()
        this.usuariosTransferencia = data.users
        this.modalTransferirTicket = true
      } catch (error) {
        console.error(error)
        this.$notificarErro('Problema ao carregar usuários', error)
      }
    },
    async listarUsuarios () {
      try {
        const { data } = await ListarUsuarios()
        this.usuarios = data.users
      } catch (error) {
        console.error(error)
        this.$notificarErro('Problema ao carregar usuários', error)
      }
    },
    async listarEtiquetas () {
      const { data } = await ListarEtiquetas(true)
      this.etiquetas = data
    },
    filterUsers (element, index, array) {
      const fila = this.filaSelecionada
      if (fila == null) return true
      const queues_valid = element.queues.filter(function (element, index, array) {
        return (element.id == fila)
      })
      return (queues_valid.length > 0)
    },
    async confirmarTransferenciaTicket () {
      // if (!this.filaSelecionada) return
      // if(!this.usuarioSelecionado){
      //   this.$q.notify({
      //     type: 'negative',
      //     message: 'Selecione um usuário.',
      //     progress: true,
      //     actions: [{
      //       icon: 'close',
      //       round: true,
      //       color: 'white'
      //     }]
      //   })
      //   return
      // }
      await AtualizarTicket(this.ticketFocado.id, {
        userId: this.usuarioSelecionado || userId,
        queueId: this.filaSelecionada || null,
        status: 'open',
        isTransference: 1
      })
      this.$q.notify({
        type: 'positive',
        message: 'Ticket transferido.',
        progress: true,
        actions: [{
          icon: 'close',
          round: true,
          color: 'white'
        }]
      })
      this.modalTransferirTicket = false
      this.$emit('modalClosed');
      this.$store.commit('TICKET_FOCADO', {})
    },
    downloadFile (downloadLink) {
      const link = document.createElement('a')
      link.href = downloadLink
      link.setAttribute('download', 'contatos.xlsx')
      link.style.display = 'none'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    },
    handleExportContacts () {
      ExportarArquivoContato()
        .then(res => {
          const downloadLink = res.data.downloadLink
          this.downloadFile(downloadLink)
        })
        .catch(error => {
          console.error('Erro ao exportar contatos:', error)
        })
    },
    LOAD_CONTACTS (contacts) {
      const newContacts = []
      contacts.forEach(contact => {
        const contactIndex = this.contacts.findIndex(c => c.id === contact.id)
        if (contactIndex !== -1) {
          this.contacts[contactIndex] = contact
        } else {
          newContacts.push(contact)
        }
      })
      const contactsObj = [...this.contacts, ...newContacts]
      this.contacts = contactsObj
    },
    UPDATE_CONTACTS (contact) {
      const newContacts = [...this.contacts]
      const contactIndex = newContacts.findIndex(c => c.id === contact.id)
      if (contactIndex !== -1) {
        newContacts[contactIndex] = contact
      } else {
        newContacts.unshift(contact)
      }
      this.contacts = [...newContacts]
    },
    DELETE_CONTACT (contactId) {
      const newContacts = [...this.contacts]
      const contactIndex = newContacts.findIndex(c => c.id === contactId)
      if (contactIndex !== -1) {
        newContacts.splice(contactIndex, 1)
      }
      this.contacts = [...newContacts]
    },
    filtrarContato (data) {
      this.contacts = []
      this.params.pageNumber = 1
      this.params.searchParam = data
      this.loading = true
      this.listarContatos()
    },
    async listarContatos () {
      this.loading = true
      const { data } = await ListarContatos(this.params)
      // const user = this.usuario
      // console.log(data)
      // data.contacts = data.contacts.filter(function (element) {
      //   return (user.profile == 'admin' || element.tickets[0].userId == user.userId)
      // })
      this.params.hasMore = data.hasMore
      this.LOAD_CONTACTS(data.contacts)
      this.loading = false
      this.pagination.lastIndex = this.contacts.length - 1
      this.pagination.rowsNumber = data.count
    },
    onScroll ({ to, ref, ...all }) {
      if (this.loading !== true && this.params.hasMore === true && to === this.pagination.lastIndex) {
        this.loading = true
        this.params.pageNumber++
        this.listarContatos()
      }
    },
    async handleSaveTicket (contact, channel) {
      if (!contact.id) return
      const itens = []
      const channelId = null
      this.whatsapps.forEach(w => {
        if (w.type === channel) {
          itens.push({ label: w.name, value: w.id })
        }
      })
      this.$q.dialog({
        title: `Contato: ${contact.name}`,
        message: 'Selecione o canal para iniciar o atendimento.',
        options: {
          type: 'radio',
          model: channelId,
          // inline: true
          isValid: v => !!v,
          items: itens
        },
        ok: {
          push: true,
          color: 'positive',
          label: 'Iniciar'
        },
        cancel: {
          push: true,
          label: 'Cancelar',
          color: 'negative'
        },
        persistent: true
      }).onOk(async channelId => {
        if (!channelId) return
        this.loading = true
        try {
          const { data: ticket } = await CriarTicket({
            contactId: contact.id,
            isActiveDemand: true,
            userId: userId,
            channel,
            channelId,
            status: 'open'
          })
          this.ticketFocado = ticket
          await this.listarFilas(); 
          await this.$store.commit('SET_HAS_MORE', true)
          await this.$store.dispatch('AbrirChatMensagens', ticket)
          this.$q.notify({
            message: `Atendimento Iniciado || ${ticket.contact.name} - Ticket: ${ticket.id}`,
            type: 'positive',
            position: 'top',
            progress: true,
            actions: [{
              icon: 'close',
              round: true,
              color: 'white'
            }]
          })
          this.$router.push({ name: 'chat', params: { ticketId: ticket.id } })
        } catch (error) {
          if (error.status === 409) {
            console.log(error)
            const ticketAtual = JSON.parse(error.data.error)
            if(ticketAtual.whatsappId === null) {
              await AtualizarTicket(ticketAtual.id, {
                whatsapp: channelId
              })
              this.abrirAtendimentoExistente(contact, ticketAtual)
              return
            }
            else{
              this.abrirAtendimentoExistente(contact, ticketAtual)
              return
            }
          }
          this.$notificarErro('Ocorreu um erro!', error)
        }
        this.loading = false
      })
    },
    editContact (contactId) {
      this.selectedContactId = contactId
      this.modalContato = true
    },
    deleteContact (contactId) {
      this.$q.dialog({
        title: 'Atenção!! Deseja realmente deletar o contato? ',
        // message: 'Mensagens antigas não serão apagadas no whatsapp.',
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
      }).onOk(() => {
        this.loading = true
        DeletarContato(contactId)
          .then(res => {
            this.DELETE_CONTACT(contactId)
            this.$q.notify({
              type: 'positive',
              progress: true,
              position: 'top',
              message: 'Contato deletado!',
              actions: [{
                icon: 'close',
                round: true,
                color: 'white'
              }]
            })
          })
          .catch(error => {
            console.error(error)
            this.$notificarErro('Não é possível deletar o contato', error)
          })
        this.loading = false
      })
    },
    abrirChatContato (ticket) {
      // caso esteja em um tamanho mobile, fechar a drawer dos contatos
      if (this.$q.screen.lt.md && ticket.status !== 'pending') {
        this.$root.$emit('infor-cabecalo-chat:acao-menu')
      }
      if (!(ticket.status !== 'pending' && (ticket.id !== this.$store.getters.ticketFocado.id || this.$route.name !== 'chat'))) return
      this.$store.commit('SET_HAS_MORE', true)
      this.$store.dispatch('AbrirChatMensagens', ticket)
    },
    abrirAtendimentoExistente (contato, ticket) {
      this.$q.dialog({
        title: 'Atenção!!',
        message: `${contato.name} possui um atendimento em curso (Atendimento: ${ticket.id}). Deseja abrir o atendimento?`,
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
        try {
          this.abrirChatContato(ticket)
        } catch (error) {
          this.$notificarErro(
            'Não foi possível atualizar o token',
            error
          )
        }
      })
    },
    confirmarSincronizarContatos () {
      this.$q.dialog({
        title: 'Atenção!! Deseja realmente sincronizar os contatos? ',
        message: 'Todos os contatos com os quais você já conversou pelo Whatsapp serão criados. Isso pode demorar um pouco...',
        cancel: {
          label: 'Não',
          color: 'primary',
          push: true
        },
        ok: {
          label: 'Sim',
          color: 'warning',
          push: true
        },
        persistent: true
      }).onOk(async () => {
        this.loading = true
        await this.sincronizarContatos()
        this.loading = false
      })
    },
    confirmarSincronizarGrupos () {
      this.$q.dialog({
        title: 'Atenção!! Deseja realmente sincronizar os grupos? ',
        message: 'Todos os grupos com os quais você já conversou pelo Whatsapp serão criados. Isso pode demorar um pouco...',
        cancel: {
          label: 'Não',
          color: 'primary',
          push: true
        },
        ok: {
          label: 'Sim',
          color: 'warning',
          push: true
        },
        persistent: true
      }).onOk(async () => {
        this.loading = true
        await this.sincronizarGrupos()
        this.loading = false
      })
    },
    async sincronizarContatos () {
      try {
        this.loading = true
        await SyncronizarContatos()
        this.$q.notify({
          type: 'info',
          progress: true,
          position: 'top',
          textColor: 'black',
          message: 'Contatos estão sendo atualizados. Isso pode levar um tempo...',
          actions: [{
            icon: 'close',
            round: true,
            color: 'white'
          }]
        })
      } catch (error) {
        console.error(error)
        this.$notificarErro('Ocorreu um erro ao sincronizar os contatos', error)
        this.loading = true
      }
      this.loading = true
    },
    async sincronizarGrupos () {
      try {
        this.loading = true
        await SyncronizarGrupos()
        this.$q.notify({
          type: 'info',
          progress: true,
          position: 'top',
          textColor: 'black',
          message: 'Grupos estão sendo atualizados. Isso pode levar um tempo...',
          actions: [{
            icon: 'close',
            round: true,
            color: 'white'
          }]
        })
      } catch (error) {
        console.error(error)
        this.$notificarErro('Ocorreu um erro ao sincronizar os contatos', error)
        this.loading = true
      }
      this.loading = true
    }
  },
  mounted () {
    this.usuario = JSON.parse(localStorage.getItem('usuario'))
    this.userProfile = localStorage.getItem('profile')
    this.listarContatos()
    this.listarUsuarios()
    this.listarEtiquetas()
    this.loadColors()
  }
}
</script>

<style lang="sass" >
.my-sticky-dynamic
  /* height or max-height is important */
  height: 85vh

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th /* bg color is important for th; just specify one */
    background-color: #fff

  thead tr th
    position: sticky
    z-index: 1
  /* this will be the loading indicator */
  thead tr:last-child th
    /* height of all previous header rows */
    top: 63px
  thead tr:first-child th
    top: 0

.heightChat
  height: calc(100vh - 0px)
  .q-table__top
    padding: 8px

#tabela-contatos-atendimento
  thead
    th
      height: 55px

.blur-effect 
  filter: blur(0px)
</style>
