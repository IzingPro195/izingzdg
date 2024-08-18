<template>
  <div class="q-pa-sm">
    <q-card class="q-my-md">
      <q-card-section class="row justify-between items-center">
        <div class="col-xs-12 col-md-3 text-h4 text-bold text-center text-md-left">
          Painel de Controle
        </div>
        <div class="col-xs-12 col-md-9 justify-end flex q-gutter-sm text-center text-md-right q-my-md rdsPainelDate">
          <div class="q-mb-sm">
            <q-datetime-picker
              style="width: 200px"
              dense
              hide-bottom-space
              outlined
              stack-label
              bottom-slots
              label="Data/Hora Agendamento"
              mode="date"
              color="primary"
              format24h
              v-model="params.startDate"
            />
          </div>
          <div class="q-mb-sm">
            <q-datetime-picker
              style="width: 200px"
              dense
              hide-bottom-space
              outlined
              stack-label
              bottom-slots
              label="Data/Hora Agendamento"
              mode="date"
              color="primary"
              format24h
              v-model="params.endDate"
            />
          </div>
          <!-- <div class="q-mb-sm">
            <q-select
              style="width: 300px"
              dense
              outlined
              hide-bottom-space
              emit-value
              map-options
              multiple
              options-dense
              use-chips
              label="SETORES"
              color="primary"
              v-model="params.queuesIds"
              :options="filas"
              :input-debounce="700"
              option-value="id"
              option-label="queue"
              input-style="width: 280px; max-width: 280px;"
            />
          </div>
          <div class="q-mb-sm">
            <q-select
              style="width: 300px"
              dense
              outlined
              hide-bottom-space
              emit-value
              map-options
              multiple
              options-dense
              use-chips
              label="USUÁRIOS"
              color="primary"
              v-model="params.userIds"
              :options="usuarios"
              :input-debounce="700"
              option-value="id"
              option-label="name"
              input-style="width: 280px; max-width: 280px;"
            />
          </div> -->
          <q-btn
            class="bg-padrao q-mb-sm"
            flat
            color="primary"
            icon="refresh"
            label="Gerar"
            @click="getDashData"
          />
          <q-toggle
            v-if="grupoAtivo === 'disabled'"
            v-model="toggleValue"
            checked-icon="check"
            unchecked-icon="clear"
            @input="handleGroups"
            :color="toggleValue ? 'green' : 'negative'"
            size="md"
            >
            <q-tooltip anchor="bottom middle" self="top middle">
              <span>Filtrar Grupos</span>
            </q-tooltip>
          </q-toggle>
        </div>

      </q-card-section>
    </q-card>
    <div class="row q-col-gutter-md">
      <div class="col-xs-12 col-sm-3">
        <q-card>
          <q-card-section class="q-pa-md">
            <ApexChart
              ref="ChartTicketsChannels"
              type="pie"
              height="300"
              width="100%"
              :options="ticketsChannelsOptions"
              :series="ticketsChannelsOptions.series"
            />
          </q-card-section>
        </q-card>
      </div>
      <div class="col-xs-12 col-sm-3">
        <q-card>
          <q-card-section class="q-pa-md">
            <ApexChart
              ref="ChartTicketsQueue"
              type="pie"
              height="300"
              width="100%"
              :options="ticketsQueueOptions"
              :series="ticketsQueueOptions.series"
            />
          </q-card-section>
        </q-card>
      </div>
      <div class="col-xs-12 col-sm-3">
        <q-card>
          <q-card-section class="q-pa-md">
            <ApexChart
              ref="ChartTicketsUser"
              type="pie"
              height="300"
              width="100%"
              :options="ticketsUserOptions"
              :series="ticketsUserOptions.series"
            />
          </q-card-section>
        </q-card>
      </div>
      <div class="col-xs-12 col-sm-3">
        <q-card>
          <q-card-section class="q-pa-md">
            <ApexChart
              ref="ChartTicketsStatus"
              type="pie"
              height="300"
              width="100%"
              :options="ticketsStatusOptions"
              :series="ticketsStatusOptions.series"
            />
          </q-card-section>
        </q-card>
      </div>
    </div>
    <q-card class="q-my-md">
      <q-card-section>
        <ApexChart
          ref="ChartTicketsEvolutionChannels"
          type="bar"
          height="300"
          width="100%"
          :options="ticketsEvolutionChannelsOptions"
          :series="ticketsEvolutionChannelsOptions.series"
        />
      </q-card-section>
    </q-card>
    <q-card class="q-my-md">
      <q-card-section class="q-pa-md">
        <ApexChart
          ref="ChartTicketsEvolutionByPeriod"
          type="line"
          height="300"
          :options="ticketsEvolutionByPeriodOptions"
          :series="ticketsEvolutionByPeriodOptions.series"
        />
      </q-card-section>
    </q-card>
    <q-card class="q-my-md q-pa-sm" v-if="toggleValue === false">
      <q-card class="q-my-md q-pa-sm">
      <q-card-section class="q-pa-md">
        <div class="row q-gutter-md justify-center">
          <div class="col-xs-12 col-sm-shrink">
            <q-card
              flat
              bordered
              class="my-card full-height"
              style="min-width: 200px; background-color: var(--q-primary); color: white"
            >
              <q-card-section class="text-center">
                <div class="row items-center">
                  <div class="col">
                    <p class="text-h4 text-bold text-center text-branco">
                      {{ ticketsAndTimes.qtd_total_atendimentos }}
                    </p>
                    <p class="text-caption text-branco">Total Atendimentos</p>
                  </div>
                  <div class="col">
                    <q-icon name="mdi-account-multiple" size="lg" color="white" class="text-white" />
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
          <div class="col-xs-12 col-sm-shrink">
            <q-card
              flat
              bordered
              class="my-card full-height"
              style="min-width: 200px; background-color: var(--q-primary); color: white"
            >
              <q-card-section class="text-center">
                <div class="row items-center">
                  <div class="col">
                    <p class="text-h4 text-bold text-center text-branco">
                      {{ ticketsAndTimes.qtd_demanda_ativa }}
                    </p>
                    <p class="text-caption text-branco">Ativo</p>
                  </div>
                  <div class="col">
                    <q-icon name="mdi-account-check" size="lg" color="white" class="text-white" />
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
          <div class="col-xs-12 col-sm-shrink">
            <q-card
              flat
              bordered
              class="my-card full-height"
              style="min-width: 200px; background-color: var(--q-primary); color: white"
            >
              <q-card-section class="text-center">
                <div class="row items-center">
                  <div class="col">
                    <p class="text-h4 text-bold text-center text-branco">
                      {{ ticketsAndTimes.qtd_demanda_receptiva }}
                    </p>
                    <p class="text-caption text-branco">Receptivo</p>
                  </div>
                  <div class="col">
                    <q-icon name="mdi-phone-incoming" size="lg" color="white" class="text-white" />
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
          <div class="col-xs-12 col-sm-shrink">
            <q-card
              flat
              bordered
              class="my-card full-height"
              style="min-width: 200px; background-color: var(--q-primary); color: white"
            >
              <q-card-section class="text-center">
                <div class="row items-center">
                  <div class="col">
                    <p class="text-h4 text-bold text-center text-branco">
                      {{ ticketsAndTimes.new_contacts }}
                    </p>
                    <p class="text-caption text-branco">Novos Contatos</p>
                  </div>
                  <div class="col">
                    <q-icon name="mdi-account-plus" size="lg" color="white" class="text-white" />
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
          <div class="col-xs-12 col-sm-4 col-md-3 col-lg-2">
            <q-card flat bordered class="my-card full-height" style="background-color: var(--q-primary); color: white">
              <q-card-section class="text-center">
                <p class="text-h5 text-bold text-center">
                  <q-icon name="mdi-clock-outline" size="lg" color="white" class="text-white" />
                  {{ cTmaFormat }}
                </p>
                Tempo Médio de Atendimento (TMA)
              </q-card-section>
            </q-card>
          </div>
          <div class="col-xs-12 col-sm-4 col-md-3 col-lg-2">
            <q-card flat bordered class="my-card full-height" style="background-color: var(--q-primary); color: white">
              <q-card-section class="text-center">
                <p class="text-h5 text-bold text-center">
                  <q-icon name="mdi-timer-sand" size="lg" color="white" class="text-white" />
                  {{ cTmeFormat }}
                </p>
                Tempo Médio 1º Resposta
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-card-section>
    </q-card>
      <q-card-section class="q-pa-md">
        <q-table
          title="Desempenho da Equipe"
          :data="ticketsPerUsersDetail"
          :columns="TicketsPerUsersDetailColumn"
          row-key="email"
          :pagination.sync="paginationTableUser"
          :rows-per-page-options="[0]"
          bordered
          flat
          hide-bottom
        >
          <template v-slot:body-cell-name="props">
            <q-td :props="props">
              <div class="row col text-bold"> {{ props.row.name || 'Não informado' }} </div>
              <div class="row col text-caption">{{ props.row.email }} </div>
            </q-td>
          </template>
        </q-table>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { groupBy } from 'lodash'
import { ListarFilas } from 'src/service/filas'
import { ListarUsuarios } from 'src/service/user'
import {
  GetDashTicketsAndTimes,
  GetDashTicketsChannels,
  GetDashTicketsEvolutionChannels,
  GetDashTicketsQueue,
  GetDashTicketsEvolutionByPeriod,
  GetDashTicketsPerUsersDetail,
  GetDashTicketsUser,
  GetDashTicketsStatus
} from 'src/service/estatisticas'
import { ListarConfiguracoes } from 'src/service/configuracoes'
import { subDays, format, formatDuration, differenceInDays } from 'date-fns'
import ApexChart from 'vue-apexcharts'
import { QIcon } from 'quasar'
import { MostrarCores } from 'src/service/empresas';

export default {
  name: 'IndexDashboard',
  components: { ApexChart, QIcon },
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
      confiWidth: {
        horizontal: false,
        width: this.$q.screen.width
      },
      toggleValue: false,
      grupoAtivo: 'disabled',
      params: {
        startDate: format(subDays(new Date(), 6), 'yyyy-MM-dd'),
        endDate: format(new Date(), 'yyyy-MM-dd'),
        queuesIds: [],
        userIds: [],
        isGroup: false
      },
      paginationTableUser: {
        rowsPerPage: 40,
        rowsNumber: 0,
        lastIndex: 0
      },
      filas: [],
      usuarios: [],
      ticketsChannels: [],
      ticketsChannelsOptions: {
        // colors: ['#00E396', '#ff2a00','#FEB019'],
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 1000
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'dark',
            type: 'vertical',
            shadeIntensity: 0.05,
            inverseColors: false,
            opacityFrom: 1,
            opacityTo: 0.9,
            stops: [0, 100]
          }
        },
        chart: {
          toolbar: {
            show: true
          }
        },
        legend: {
          position: 'bottom'
        },
        title: {
          text: 'Atendimento por canal'
        },
        noData: {
          text: 'Sem dados aqui!',
          align: 'center',
          verticalAlign: 'middle',
          offsetX: 0,
          offsetY: 0,
          style: {
            color: undefined,
            fontSize: '14px',
            fontFamily: undefined
          }
        },
        series: [],
        labels: [],
        theme: {
          mode: 'light',
          palette: 'palette1'
        },
        plotOptions: {
          pie: {
            dataLabels: {
              offset: -10
            }
          }
        },
        dataLabels: {
          enabled: true,
          textAnchor: 'middle',
          style: {
            fontSize: '16px',
            offsetY: '150',
            fontFamily: 'Helvetica, Arial, sans-serif'
          },
          offsetX: 0
        }
      },
      ticketsQueue: [],
      ticketsQueueOptions: {
        colors: ['#008FFB', '#00E396', '#FEB019'],
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 1000
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'dark',
            type: 'vertical',
            shadeIntensity: 0.05,
            inverseColors: false,
            opacityFrom: 1,
            opacityTo: 0.9,
            stops: [0, 100]
          }
        },
        chart: {
          toolbar: {
            show: true
          }
        },
        // responsive: [{
        //   breakpoint: 480,
        //   options: {
        //     chart: {
        //       width: 250
        //     },
        //     legend: {
        //       position: 'bottom'
        //     }
        //   }
        // }],
        legend: {
          position: 'bottom'
        },
        title: {
          text: 'Atendimento por fila'
        },
        noData: {
          text: 'Sem dados aqui!',
          align: 'center',
          verticalAlign: 'middle',
          offsetX: 0,
          offsetY: 0,
          style: {
            color: undefined,
            fontSize: '14px',
            fontFamily: undefined
          }
        },
        series: [],
        labels: [],
        theme: {
          mode: 'light',
          palette: 'palette1'
        },
        plotOptions: {
          pie: {
            dataLabels: {
              offset: -10
            }
          }
        },
        dataLabels: {
          enabled: true,
          textAnchor: 'middle',
          style: {
            fontSize: '16px',
            offsetY: '150',
            fontFamily: 'Helvetica, Arial, sans-serif'
          },
          offsetX: 0
        }
      },
      ticketsStatus: [],
      ticketsStatusOptions: {
        colors: ['#008FFB', '#00E396', '#FEB019'],
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 1000
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'dark',
            type: 'vertical',
            shadeIntensity: 0.05,
            inverseColors: false,
            opacityFrom: 1,
            opacityTo: 0.9,
            stops: [0, 100]
          }
        },
        chart: {
          toolbar: {
            show: true
          }
        },
        // responsive: [{
        //   breakpoint: 480,
        //   options: {
        //     chart: {
        //       width: 250
        //     },
        //     legend: {
        //       position: 'bottom'
        //     }
        //   }
        // }],
        legend: {
          position: 'bottom'
        },
        title: {
          text: 'Atendimento por status'
        },
        noData: {
          text: 'Sem dados aqui!',
          align: 'center',
          verticalAlign: 'middle',
          offsetX: 0,
          offsetY: 0,
          style: {
            color: undefined,
            fontSize: '14px',
            fontFamily: undefined
          }
        },
        series: [],
        labels: [],
        theme: {
          mode: 'light',
          palette: 'palette1'
        },
        plotOptions: {
          pie: {
            dataLabels: {
              offset: -10
            }
          }
        },
        dataLabels: {
          enabled: true,
          textAnchor: 'middle',
          style: {
            fontSize: '16px',
            offsetY: '150',
            fontFamily: 'Helvetica, Arial, sans-serif'
          },
          offsetX: 0
        }
      },
      ticketsUser: [],
      ticketsUserOptions: {
        colors: ['#008FFB', '#00E396', '#FEB019'],
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 1000
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'dark',
            type: 'vertical',
            shadeIntensity: 0.05,
            inverseColors: false,
            opacityFrom: 1,
            opacityTo: 0.9,
            stops: [0, 100]
          }
        },
        chart: {
          toolbar: {
            show: true
          }
        },
        // responsive: [{
        //   breakpoint: 480,
        //   options: {
        //     chart: {
        //       width: 250
        //     },
        //     legend: {
        //       position: 'bottom'
        //     }
        //   }
        // }],
        legend: {
          position: 'bottom'
        },
        title: {
          text: 'Atendimento por usuário'
        },
        noData: {
          text: 'Sem dados aqui!',
          align: 'center',
          verticalAlign: 'middle',
          offsetX: 0,
          offsetY: 0,
          style: {
            color: undefined,
            fontSize: '14px',
            fontFamily: undefined
          }
        },
        series: [],
        labels: [],
        theme: {
          mode: 'light',
          palette: 'palette1'
        },
        plotOptions: {
          pie: {
            dataLabels: {
              offset: -10
            }
          }
        },
        dataLabels: {
          enabled: true,
          textAnchor: 'middle',
          style: {
            fontSize: '16px',
            offsetY: '150',
            fontFamily: 'Helvetica, Arial, sans-serif'
          },
          offsetX: 0
        }
      },
      ticketsEvolutionChannels: [],
      ticketsEvolutionChannelsOptions: {
        // colors: ['#008FFB', '#00E396', '#FEB019'],
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 1000
        },
        chart: {
          type: 'bar',
          // height: 300,
          stacked: true,
          stackType: '100%',
          toolbar: {
            tools: {
              download: true,
              selection: false,
              zoom: false,
              zoomin: false,
              zoomout: false,
              pan: false,
              reset: false | '<img src="/static/icons/reset.png" width="20">'
            }

          }
        },
        theme: {
          mode: 'light',
          palette: 'palette1'
        },
        grid: {
          show: true,
          strokeDashArray: 0
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'dark',
            type: 'vertical',
            shadeIntensity: 0.05,
            inverseColors: false,
            opacityFrom: 1,
            opacityTo: 0.9,
            stops: [0, 100]
          }
        },
        dataLabels: {
          enabled: true
        },
        title: {
          text: 'Evolução por canal',
          align: 'left'
        },
        stroke: {
          width: 0
        },
        // responsive: [{
        //   breakpoint: 480,
        //   options: {
        //     chart: {
        //       width: 250
        //     },
        //     legend: {
        //       position: 'bottom'
        //     }
        //   }
        // }],
        xaxis: {
          type: 'category',
          categories: [],
          tickPlacement: 'on'
          // labels: {
          //   formatter: function (value, timestamp, opts) {
          //     return format(new Date(timestamp), 'dd/MM')
          //     // return opts.dateFormatter().format('dd MMM')
          //   }
          // }
          // type: 'datetime'
          // format: 'dd/MM'
          // datetimeFormatter: {
          //   // year: 'yyyy',
          //   month: 'MM',
          //   day: 'DD'
          //   // hour: 'HH:mm',
          // }
        },
        yaxis: {
          title: {
            text: 'Atendimentos',
            style: {
              color: '#FFF'
            }
          }
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return Number(val).toFixed(0)
            }
          }
        }
      },
      ticketsEvolutionByPeriod: [],
      ticketsEvolutionByPeriodOptions: {
        // colors: ['#008FFB', '#00E396', '#FEB019'],
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 1000
        },
        theme: {
          mode: 'light',
          palette: 'palette1'
        },
        chart: {
          toolbar: {
            tools: {
              download: true,
              selection: false,
              zoom: false,
              zoomin: false,
              zoomout: false,
              pan: false,
              reset: false | '<img src="/static/icons/reset.png" width="20">'
            }

          }
        },
        grid: {
          show: true,
          strokeDashArray: 0,
          xaxis: {
            lines: {
              show: true
            }
          }
        },
        stroke: {
          width: [4, 4, 4]
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'dark',
            type: 'vertical',
            shadeIntensity: 0.05,
            inverseColors: false,
            opacityFrom: 1,
            opacityTo: 0.9,
            stops: [0, 100]
          }
        },
        title: {
          text: 'Evolução atendimentos',
          align: 'left'
        },
        dataLabels: {
          enabled: true,
          enabledOnSeries: [1]
        },
        xaxis: {
          categories: []
        },
        yaxis: {
          title: {
            text: 'Atendimentos'
          }
        },
        tooltip: {
          shared: false,
          x: {
            show: false
          },
          y: {
            formatter: function (val) {
              return Number(val).toFixed(0)
            }
          }
        },
        legend: {
          show: false
        }
      },
      ticketsAndTimes: {
        qtd_total_atendimentos: null,
        qtd_demanda_ativa: null,
        qtd_demanda_receptiva: null,
        tma: null,
        tme: null
      },
      ticketsPerUsersDetail: [],
      TicketsPerUsersDetailColumn: [
        {
          name: 'name',
          label: 'Usuário',
          field: 'name',
          align: 'left',
          style: 'width: 300px;',
          format: (v, r) => {
            return v ? `${r.name} | ${r.email}` : 'Não informado'
          }
        },
        {
          name: 'qtd_pendentes',
          label: 'Pendentes',
          field: 'qtd_pendentes'
        },
        {
          name: 'qtd_em_atendimento',
          label: 'Atendendo',
          field: 'qtd_em_atendimento'
        },
        {
          name: 'qtd_resolvidos',
          label: 'Finalizados',
          field: 'qtd_resolvidos'
        },
        {
          name: 'qtd_por_usuario',
          label: 'Total',
          field: 'qtd_por_usuario'
        },
        {
          name: 'media_avaliacao',
          label: 'Média de Avaliações',
          field: 'media_avaliacao'
        },
        {
          name: 'tme',
          label: 'T.M.E',
          field: 'tme',
          align: 'center',
          headerStyle: 'text-align: center !important',
          format: v => {
            return formatDuration(v) || ''
          }
        },
        {
          name: 'tma',
          label: 'T.M.A',
          field: 'tma',
          align: 'center',
          headerStyle: 'text-align: center !important',
          format: v => {
            return formatDuration(v) || ''
          }
        }
      ]
    }
  },
  watch: {
    '$q.dark.isActive' () {
      // necessário para carregar os gráficos com a alterçaão do mode (dark/light)
      this.$router.go()
    },
    '$q.screen.width' () {
      // necessário para carregar os gráficos com a alterçaão do mode (dark/light)
      this.setConfigWidth()
    }
  },
  computed: {
    cTmaFormat () {
      const tma = this.ticketsAndTimes.tma || {}
      return formatDuration(tma) || ''
    },
    cTmeFormat () {
      const tme = this.ticketsAndTimes.tme || {}
      return formatDuration(tme) || ''
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

          this.setupThemes();

        } else {
          console.error('Erro ao carregar as cores');
        }
      } catch (error) {
        console.error('Erro ao carregar as cores:', error);
      }
    },
    setupThemes() {
      const mode = this.$q.dark.isActive ? 'dark' : 'light';
      const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--q-primary').trim();
      
      const theme = {
        mode,
        palette: 'palette1',
        primary: primaryColor, // Utilizar a cor primária carregada
        monochrome: {
          enabled: true,
          color: primaryColor, // Utilizar a mesma cor primária
          shadeTo: mode,
          shadeIntensity: 0.95
        }
      };

      this.ticketsQueueOptions = { ...this.ticketsQueueOptions, theme };
      this.ticketsStatusOptions = { ...this.ticketsStatusOptions, theme };
      this.ticketsUserOptions = { ...this.ticketsUserOptions, theme };
      this.ticketsChannelsOptions = { ...this.ticketsChannelsOptions, theme };
      this.ticketsEvolutionChannelsOptions = { ...this.ticketsEvolutionChannelsOptions, theme };
      this.ticketsEvolutionByPeriodOptions = { ...this.ticketsEvolutionByPeriodOptions, theme };
    },
    async listarFilas () {
      const { data } = await ListarFilas()
      this.filas = data
    },
    async listarUsuarios () {
      const { data } = await ListarUsuarios()
      this.usuarios = data.users.filter(user => user.profile !== 'superadmin');
    },
    async listarConfiguracoes() {
      const { data } = await ListarConfiguracoes()
      localStorage.setItem('configuracoes', JSON.stringify(data))
      const ignoreGroupMsg = data.find(config => config.key === 'ignoreGroupMsg')
      this.grupoAtivo = ignoreGroupMsg.value
    },
    handleGroups() {
      if (this.toggleValue) {
        this.params.isGroup = true
        this.$q.notify({
          type: 'positive',
          message: 'Filtrar estatísticas para grupos!',
          progress: true,
          actions: [{ icon: 'close', round: true, color: 'white' }],
        })
      } else {
        this.params.isGroup = false
        this.$q.notify({
          type: 'positive',
          message: 'Filtrar estatísticas para conversas privadas!',
          progress: true,
          actions: [{ icon: 'close', round: true, color: 'white' }],
        })
      }
    },
    setConfigWidth () {
      const diffDays = differenceInDays(new Date(this.params.endDate), new Date(this.params.startDate))
      if (diffDays > 30) {
        this.configWidth = { horizontal: true, width: 2200 }
      } else {
        const actualWidth = this.$q.screen.width
        this.configWidth = { horizontal: true, width: actualWidth - (actualWidth < 768 ? 40 : 100) }
      }
    },
    getDashTicketsAndTimes () {
      GetDashTicketsAndTimes(this.params).then(res => {
        this.ticketsAndTimes = res.data[0]
      })
        .catch(err => {
          console.error(err)
        })
    },
    getDashTicketsUser () {
      GetDashTicketsUser(this.params).then(res => {
        this.ticketsUser = res.data
        const series = []
        const labels = []
        this.ticketsUser.forEach(e => {
          series.push(+e.qtd)
          labels.push(e.label)
        })
        this.ticketsUserOptions.series = series
        this.ticketsUserOptions.labels = labels
        this.$refs.ChartTicketsUser.updateOptions(this.ticketsUserOptions)
        this.$refs.ChartTicketsUser.updateSeries(series, true)
      })
        .catch(err => {
          console.error(err)
        })
    },
    getDashTicketsQueue () {
      GetDashTicketsQueue(this.params).then(res => {
        this.ticketsQueue = res.data
        const series = []
        const labels = []
        this.ticketsQueue.forEach(e => {
          series.push(+e.qtd)
          labels.push(e.label)
        })
        this.ticketsQueueOptions.series = series
        this.ticketsQueueOptions.labels = labels
        this.$refs.ChartTicketsQueue.updateOptions(this.ticketsQueueOptions)
        this.$refs.ChartTicketsQueue.updateSeries(series, true)
      })
        .catch(err => {
          console.error(err)
        })
    },
    getDashTicketsStatus () {
      const statusMapping = {
        closed: 'Fechado',
        open: 'Aberto',
        pending: 'Pendente',
        schedule: 'Agendada',
        undefined: 'Indefinido'
      };
      GetDashTicketsStatus(this.params).then(res => {
        this.ticketsStatus = res.data
        const series = []
        const labels = []
        this.ticketsStatus.forEach(e => {
          series.push(+e.qtd)
          labels.push(statusMapping[e.status]);
        })
        this.ticketsStatusOptions.series = series
        this.ticketsStatusOptions.labels = labels
        this.$refs.ChartTicketsStatus.updateOptions(this.ticketsStatusOptions)
        this.$refs.ChartTicketsStatus.updateSeries(series, true)
      })
        .catch(err => {
          console.error(err)
        })
    },
    getDashTicketsChannels () {
      const statusMapping = {
        whatsapp: 'WhatsApp Web.Js',
        waba: 'WhatsApp Oficial',
        telegram: 'Telegram',
        instagram: 'Instagram',
        baileys: 'WhatsApp Baileys'
      };
      GetDashTicketsChannels(this.params).then(res => {
        this.ticketsChannels = res.data
        const series = []
        const labels = []
        this.ticketsChannels.forEach(e => {
          series.push(+e.qtd)
          labels.push(statusMapping[e.label]);
        })
        this.ticketsChannelsOptions.series = series
        this.ticketsChannelsOptions.labels = labels
        this.$refs.ChartTicketsChannels.updateOptions(this.ticketsChannelsOptions)
        this.$refs.ChartTicketsChannels.updateSeries(series, true)
      })
        .catch(err => {
          console.error(err)
        })
    },
    getDashTicketsEvolutionChannels () {
      GetDashTicketsEvolutionChannels(this.params)
        .then(res => {
          this.ticketsEvolutionChannels = res.data
          const dataLabel = groupBy({ ...this.ticketsEvolutionChannels }, 'dt_referencia')
          const labels = Object.keys(dataLabel)
          // .map(l => {
          //   return format(new Date(l), 'dd/MM')
          // })
          this.ticketsEvolutionChannelsOptions.labels = labels
          this.ticketsEvolutionChannelsOptions.xaxis.categories = labels
          const series = []
          const dados = groupBy({ ...this.ticketsEvolutionChannels }, 'label')
          for (const item in dados) {
            series.push({
              name: item,
              // type: 'line',
              data: dados[item].map(d => {
                // if (labels.includes(format(new Date(d.dt_ref), 'dd/MM'))) {
                return d.qtd
              })
            })
          }
          this.ticketsEvolutionChannelsOptions.series = series
          this.$refs.ChartTicketsEvolutionChannels.updateOptions(this.ticketsEvolutionChannelsOptions)
          this.$refs.ChartTicketsEvolutionChannels.updateSeries(series, true)
        })
        .catch(error => {
          console.error(error)
        })
    },
    getDashTicketsEvolutionByPeriod () {
      GetDashTicketsEvolutionByPeriod(this.params)
        .then(res => {
          this.ticketsEvolutionByPeriod = res.data
          const series = [{
            name: 'Atendimentos',
            type: 'column',
            data: []
          }, {
            type: 'line',
            data: []
          }
          ]
          const labels = []
          this.ticketsEvolutionByPeriod.forEach(e => {
            series[0].data.push(+e.qtd)
            labels.push(e.label)
          })
          series[1].data = series[0].data
          this.ticketsEvolutionByPeriodOptions.labels = labels
          this.ticketsEvolutionByPeriodOptions.series = series
          this.$refs.ChartTicketsEvolutionByPeriod.updateOptions(this.ticketsEvolutionByPeriodOptions)
          this.$refs.ChartTicketsEvolutionByPeriod.updateSeries(series, true)
        })
        .catch(error => {
          console.error(error)
        })
    },
    getDashTicketsPerUsersDetail () {
      GetDashTicketsPerUsersDetail(this.params)
        .then(res => {
          this.ticketsPerUsersDetail = res.data
        })
        .catch(error => {
          console.error(error)
        })
    },
    getDashData () {
      this.setConfigWidth()
      this.getDashTicketsAndTimes()
      this.getDashTicketsChannels()
      this.getDashTicketsEvolutionChannels()
      this.getDashTicketsQueue()
      this.getDashTicketsStatus()
      this.getDashTicketsUser()
      this.getDashTicketsEvolutionByPeriod()
      this.getDashTicketsPerUsersDetail()
    }

  },
  beforeMount () {
    this.$store.commit('UPDATE_SHOW_MENU', this.showMenu)
    this.listarConfiguracoes()
    const mode = this.$q.dark.isActive ? 'dark' : 'light'
    const theme = {
      mode,
      palette: 'palette1',
      monochrome: {
        enabled: true,
        color: '#5c67f2',
        shadeTo: mode,
        shadeIntensity: 0.95
      }

    }
    this.ticketsQueueOptions = { ...this.ticketsQueueOptions, theme }
    this.ticketsStatusOptions = { ...this.ticketsStatusOptions, theme }
    this.ticketsUserOptions = { ...this.ticketsUserOptions, theme}
    this.ticketsChannelsOptions = { ...this.ticketsChannelsOptions, theme }
    this.ticketsEvolutionChannelsOptions = { ...this.ticketsEvolutionChannelsOptions, theme }
    this.ticketsEvolutionByPeriodOptions = { ...this.ticketsEvolutionByPeriodOptions, theme }
  },
  mounted () {
    if (!localStorage.getItem('reloaded')) {
      localStorage.setItem('reloaded', 'true');
      window.location.reload();
    } else {
      localStorage.removeItem('reloaded');
    }
    this.listarUsuarios()
    this.listarFilas()
    this.getDashData()
    this.loadColors()
  }
}
</script>

<style lang="scss" >
.text-branco{
  color: white;
}
.apexcharts-theme-dark svg {
  background: none !important;
}
.bg-vermelho {
  background-color: #f44336;
}
.bg-amarelo{
  background-color: #fec107;
}
.rdsPainelDate{
  display: flex;
  justify-content: space-around !important;
}
</style>
