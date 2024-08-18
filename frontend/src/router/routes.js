const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    redirect: (to) => {
      const userProfile = localStorage.getItem('profile');
      const isSuperAdmin = userProfile === 'superadmin';
      return isSuperAdmin ? { name: 'tenants' } : { name: 'contatos' };
    },
    children: [
      {
        path: '',
        component: () => import('pages/contatos/Index.vue'),
        beforeEnter: (to, from, next) => {
          const userProfile = localStorage.getItem('profile');
          const isSuperAdmin = userProfile === 'superadmin';
          if (isSuperAdmin) {
            next({ name: 'tenants' });
          } else {
            next();
          }
        }
      },
      {
        path: '/tenants',
        name: 'tenants',
        component: () => import('pages/tenants/Index.vue')
      },
      {
        path: '/tenantsPk',
        name: 'tenantsPk',
        component: () => import('pages/tenantsPk/Index.vue')
      },
      {
        path: '/notificacao',
        name: 'notificacao',
        component: () => import('pages/notificacao/Index.vue')
      },
      {
        path: '/terminal',
        name: 'terminal',
        component: () => import('pages/terminal/Index.vue')
      },
      {
        path: '/customizar',
        name: 'customizar',
        component: () => import('pages/customizar/Index.vue')
      },
      {
        path: '/home',
        name: 'home-dashboard',
        component: () => import('pages/dashboard/Index.vue'),
        beforeEnter: (to, from, next) => {
          const userProfile = localStorage.getItem('profile');
          const isSuperAdmin = userProfile === 'superadmin';
          if (isSuperAdmin) {
            next({ name: 'tenants' });
          } else {
            next();
          }
        }
      },
      {
        path: '/painel-atendimentos',
        name: 'painel-atendimentos',
        component: () => import('pages/dashboard/DashTicketsFilas.vue')
      },
      // { path: '/ConsultarTicketsQueuesService', name: 'dashboard', component: () => import('pages/dashboard/Index.vue') },
      {
        path: '/sessoes',
        name: 'sessoes',
        component: () => import('pages/sessaoWhatsapp/Index.vue')
      },
      {
        path: '/sessoestenants',
        name: 'sessoestenants',
        component: () => import('pages/sessaoTenants/Index.vue')
      },
      {
        path: '/pagamentostenants',
        name: 'pagamentostenants',
        component: () => import('pages/pagamentoTenants/Index.vue')
      },
      {
        path: '/contatos',
        name: 'contatos',
        component: () => import('pages/contatos/Index.vue')
      },
      {
        path: '/usuarios',
        name: 'usuarios',
        component: () => import('pages/usuarios/Index.vue')
      },
      {
        path: '/usuariotenants',
        name: 'usuariotenants',
        component: () => import('pages/usuarioTenants/Index.vue')
      },
      {
        path: '/auto-resposta',
        name: 'auto-resposta',
        component: () => import('pages/fluxoAutoResposta/Index.vue')
      },
      {
        path: '/mensagens-rapidas',
        name: 'mensagens-rapidas',
        component: () => import('pages/mensagensRapidas/Index.vue')
      },
      {
        path: '/filas',
        name: 'filas',
        component: () => import('pages/filas/Index.vue')
      },
      {
        path: '/tenantApi',
        name: 'tenantApi',
        component: () => import('pages/tenantApi/Index.vue')
      },
      {
        path: '/equipes',
        name: 'equipes',
        component: () => import('pages/equipes/Index.vue')
      },
      {
        path: '/kanban',
        name: 'kanban',
        component: () => import('pages/kanban/Index.vue')
      },
      {
        path: '/kanban',
        name: 'kanban',
        redirect: '/kanban/kanbans',
        component: () => import('pages/kanban/Index.vue'),
        children: [
          {
            path: 'kanbans',
            name: 'kanbans',
            component: () =>
              import('pages/kanban/Kanbans.vue')
          },
          {
            path: 'tags',
            name: 'tags',
            component: () =>
              import('pages/kanban/Tags.vue')
          },
        ]
      },
      {
        path: '/tarefas',
        name: 'tarefas',
        component: () => import('pages/tarefas/Index.vue')
      },
      {
        path: '/notas',
        name: 'notas',
        component: () => import('pages/notas/Index.vue')
      },
      {
        path: '/lanes',
        name: 'lanes',
        component: () => import('pages/lanes/Index.vue')
      },
      {
        path: '/configuracoes',
        name: 'configuracoes',
        redirect: '/configuracoes/geral',
        component: () => import('pages/configuracoes/Index.vue'),
        children: [
          {
            path: 'geral',
            name: 'configuracoes-geral',
            component: () =>
              import('pages/configuracoes/ConfiguracoesGerais.vue')
          },
          {
            path: 'webhooks',
            name: 'configuracoes-webhooks',
            component: () =>
              import('pages/configuracoes/ConfiguracoesWebhooks.vue')
          },
          {
            path: 'typebot',
            name: 'configuracoes-typebot',
            component: () =>
              import('pages/configuracoes/ConfiguracoesTypebot.vue')
          },
          {
            path: 'dialogflow',
            name: 'configuracoes-dialogflow',
            component: () =>
              import('pages/configuracoes/ConfiguracoesDialogflow.vue')
          },
          {
            path: 'chat-gpt',
            name: 'configs-chat-gpt',
            component: () =>
              import('pages/configuracoes/ConfiguracoesChatGPT.vue')
          },
          {
            path: 'n8n',
            name: 'configs-n8n',
            component: () =>
              import('pages/configuracoes/ConfiguracoesN8N.vue')
          },
          {
            path: 'dify',
            name: 'configs-dify',
            component: () =>
              import('pages/configuracoes/ConfiguracoesDify.vue')
          },
          {
            path: 'lanes',
            name: 'configs-lanes',
            component: () =>
              import('pages/configuracoes/ConfiguracoesLanes.vue')
          },
          {
            path: 'meta',
            name: 'configs-meta',
            component: () =>
              import('pages/configuracoes/ConfiguracoesMeta.vue')
          },
          {
            path: 'variaveis',
            name: 'configs-variaveis',
            component: () =>
              import('pages/configuracoes/ConfiguracoesVariaveis.vue')
          },
          {
            path: 'sms',
            name: 'configs-sms',
            component: () =>
              import('pages/configuracoes/ConfiguracoesSMS.vue')
          },
          {
            path: 'smtp',
            name: 'configs-smtp',
            component: () =>
              import('pages/configuracoes/ConfiguracoesSMTP.vue')
          },
          {
            path: 'pagamentos',
            name: 'configs-pagamento',
            component: () =>
              import('pages/configuracoes/ConfiguracoesPagamento.vue')
          }
        ]
      },
      {
        path: '/configuracoesTenant',
        name: 'configuracoesTenant',
        redirect: '/configuracoesTenant/smtp',
        component: () => import('pages/configuracoesTenant/Index.vue'),
        children: [
          {
            path: 'smtp',
            name: 'configs-smtp',
            component: () =>
              import('pages/configuracoesTenant/ConfiguracoesSMTP.vue')
          },
        ]
      },
      {
        path: '/massa',
        name: 'massa',
        component: () => import('pages/massa/Index.vue'),
        children: [
          {
            path: 'texto',
            name: 'massa-texto',
            component: () =>
              import('pages/massa/MassaTexto.vue')
          },
          {
            path: 'textovariavel',
            name: 'massa-texto-variavel',
            component: () =>
              import('pages/massa/MassaTextoVariavel.vue')
          },
          {
            path: 'sms',
            name: 'massa-sms',
            component: () =>
              import('pages/massa/MassaSMS.vue')
          },
          {
            path: 'template',
            name: 'massa-template',
            component: () =>
              import('pages/massa/MassaTemplate.vue')
          },
        ]
      },
      {
        path: '/grupo',
        name: 'grupo',
        component: () => import('pages/grupo/Index.vue'),
        children: [
          {
            path: 'banlist',
            name: 'banlist',
            component: () =>
              import('pages/grupo/geral/Banlist.vue')
          },
          {
            path: 'wordlist',
            name: 'wordlist',
            component: () =>
              import('pages/grupo/geral/Wordlist.vue')
          },
          {
            path: 'saudacao',
            name: 'saudacao',
            component: () =>
              import('pages/grupo/geral/Saudacao.vue')
          },
          {
            path: 'despedida',
            name: 'despedida',
            component: () =>
              import('pages/grupo/geral/Despedida.vue')
          },
          {
            path: 'massagrupos',
            name: 'massagrupos',
            component: () =>
              import('pages/grupo/massa/MassaGrupos.vue')
          },
          {
            path: 'massagrupos2',
            name: 'massagrupos2',
            component: () =>
              import('pages/grupo/massa/MassaGrupos2.vue')
          },
          {
            path: 'massausuarios',
            name: 'massausuarios',
            component: () =>
              import('pages/grupo/massa/MassaUsuarios.vue')
          },
        ]
      },
      {
        path: '/etiquetas',
        name: 'etiquetas',
        component: () => import('pages/etiquetas/Index.vue')
      },
      {
        path: '/agendamentos',
        name: 'agendamentos',
        component: () => import('pages/agendamentos/Index.vue')
      },
      {
        path: '/aniversarios',
        name: 'aniversarios',
        component: () => import('pages/aniversarios/Index.vue')
      },
      {
        path: '/fechamento',
        name: 'fechamento',
        component: () => import('pages/fechamento/Index.vue')
      },
      {
        path: '/protocolos',
        name: 'protocolos',
        component: () => import('pages/protocolos/Index.vue')
      },
      {
        path: '/avaliacoes',
        name: 'avaliacoes',
        component: () => import('pages/avaliacoes/Index.vue'),
        children: [
          {
            path: 'listar',
            name: 'listar-avaliacao',
            component: () =>
              import('pages/avaliacoes/ListarAvaliacao.vue')
          },
          {
            path: 'configurar',
            name: 'configurar-avaliacao',
            component: () =>
              import('pages/avaliacoes/ConfigurarAvaliacao.vue')
          }
        ]
      },
      // {
      //   path: '/avaliacoes',
      //   name: 'avaliacoes',
      //   component: () => import('pages/avaliacoes/Index.vue')
      // },
      {
        path: '/campanhas',
        name: 'campanhas',
        component: () => import('pages/campanhas/Index.vue')
      },
      {
        path: '/campanhas/:campanhaId',
        name: 'contatos-campanha',
        component: () => import('pages/campanhas/ContatosCampanha.vue')
      },
      {
        path: '/horario-atendimento',
        name: 'horarioAtendimento',
        component: () => import('pages/horarioAtendimento/Index.vue')
      },
      {
        path: '/api-service',
        name: 'api-service',
        component: () => import('pages/api/Index.vue')
      },
      {
        path: '/chat-flow',
        component: () => import('pages/chatFlow/Index.vue'),
        redirect: 'chat-flow',
        children: [
          {
            path: '',
            name: 'chat-flow',
            component: () => import('pages/chatFlow/ListaChatFlow.vue')
          },
          {
            path: 'builder',
            name: 'chat-flow-builder',
            component: () => import('components/ccFlowBuilder/panel.vue')
          }
        ]
      },
      {
        path: '/configuracoesbloqueio',
        name: 'configuracoesbloqueio',
        component: () => import('pages/configuracoesPagamentoAtrasado/Index.vue'),
      },
    ]
  },
  {
    path: '/chat-privado',
    name: 'chat-privado',
    component: () => import('pages/chatPrivado/index.vue')
  },
  {
    path: '/relatorios',
    redirect: 'relatorios',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'relatorios',
        component: () => import('pages/relatorios/ccListaRelatorios')
      },
      {
        path: 'estatisticas-atendimentos-usuarios',
        name: 'estatisticas-atendimentos-usuarios',
        component: () =>
          import('pages/relatorios/RelatorioResumoAtendimentosUsuarios')
      },
      {
        path: 'lista-contatos',
        name: 'lista-contatos',
        component: () => import('pages/relatorios/RelatorioContatosGeral')
      },
      {
        path: 'contatos-por-etiquetas',
        name: 'contatos-por-etiquetas',
        component: () => import('pages/relatorios/RelatorioContatosEtiquetas')
      },
      {
        path: 'contatos-por-estado',
        name: 'contatos-por-estado',
        component: () => import('pages/relatorios/RelatorioContatosEstado')
      }
    ]
  },
  {
    path: '/atendimento',
    name: 'atendimento',
    // redirect: { name: 'chat-empty' },
    component: () => import('pages/atendimento/Index.vue'),
    children: [
      {
        path: '/chats/',
        name: 'chat-empty',
        component: () => import('pages/atendimento/Chat/Chat.vue'),
        beforeEnter (to, from, next) {
          if (from.name === 'chat-empty') {
            next(false); // Evita a navegação redundante
          } else {
            next(); // Permite a navegação normal
          }
        }
      },      
      {
        path: ':ticketId',
        name: 'chat',
        component: () => import('pages/atendimento/Chat/Chat.vue'),
        beforeEnter(to, from, next) {
          if (from.name === 'chat-empty' && to.name === 'chat-empty') {
            next(false);
          } else {
            next();
          }
        }
        // beforeEnter (to, from, next) {
        //   if (!from.params.ticketId) {
        //     next({ name: 'chat-empty' })
        //   }
        //   next()
        // }
      },
      {
        path: 'contatos',
        name: 'chat-contatos',
        component: () => import('pages/contatos/Index.vue'),
        props: { isChatContact: true }
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('pages/Login.vue')
  },
  {
    path: '/reset/:token',
    name: 'reset',
    component: () => import('pages/ResetPassword.vue')
  }
]

export default routes
