<template>
  <div>
    <q-dialog v-model="show" persistent>
      <q-card>
        <q-card-section>
          <div class="text-h6">Termos e Condições de Uso</div>
        </q-card-section>
        
        <q-tabs v-model="activeTab" class="text-teal" align="left" narrow-indicator>
          <q-tab name="termos" label="Termos de Uso" />
          <q-tab name="privacidade" label="Política de Privacidade" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="activeTab" animated>
          <q-tab-panel name="termos">
            <div class="contract-content">
              <h2>Termos e Condições de Uso</h2>
              <p><strong>Módulo Z-PRO</strong></p>
              <p><strong>Data de disponibilização: 22/05/2024</strong></p>
              <p><strong>Versão: 3.0.0.0 (Download aqui)</strong></p>

              <p>Olá!</p>
              <p>O Z-PRO é um módulo do Passaporte ZDG que disponibiliza um software de otimização e facilidade de atendimento de leads e clientes do Usuário de forma completa através da integração e gerenciamento da Plataforma WhatsApp com os dispositivos escolhidos pelo Usuário. Tudo isso com ferramentas intuitivas para realizar a gestão de atividades de prospecção, cards de contato, e muitas funcionalidades.</p>
              <p>Estes Termos e Condições de Uso são de leitura obrigatória pelos Usuários e seu aceite é condição para contratação, cadastro e utilização do Z-PRO.</p>
              <p>CASO O USUÁRIO TENHA ALGUMA DÚVIDA OU NÃO CONCORDE COM ALGUMA DAS DISPOSIÇÕES DESTES TERMOS, NÃO DEVE CONTRATAR OU UTILIZAR O Z-PRO, MAS SIM ENTRAR EM CONTATO COM O NOSSO CANAL DE ATENDIMENTO <a href="https://comunidadezdg.com.br/fale-com-a-zdg">aqui</a> ou <a href="mailto:comunidadezdg@gmail.com">comunidadezdg@gmail.com</a> PARA QUE POSSAMOS AVALIAR A SUA SOLICITAÇÃO, ESCLARECER O QUE FOR POSSÍVEL E REGISTRAR A DEMANDA.</p>

              <p><strong>QUAIS AS INFORMAÇÕES QUE VOCÊ ENCONTRARÁ NESTES TERMOS</strong></p>
              <ol>
                <li>CONCEITOS IMPORTANTES NESTES TERMOS</li>
                <li>O Z-PRO: SISTEMA INTEGRADO DE MULTIATENDIMENTO</li>
                <li>COMO ACESSAR O MÓDULO Z-PRO</li>
                <li>CONDIÇÕES PARA USAR O Z-PRO</li>
                <li>EXIGÊNCIA DE PLANO DE ASSINATURA ATIVO</li>
                <li>OBRIGAÇÕES DO Z-PRO</li>
                <li>LIMITAÇÃO DE RESPONSABILIDADE</li>
                <li>OBRIGAÇÕES DO USUÁRIO</li>
                <li>CONDUTAS PROIBIDAS</li>
                <li>POLÍTICA DE CHARGEBACK</li>
                <li>EXCLUSÃO DO Z-PRO</li>
                <li>CANCELAMENTO DO PLANO DE ASSINATURA</li>
                <li>PROPRIEDADE INTELECTUAL</li>
                <li>AVISO DE PRIVACIDADE</li>
                <li>LINKS PARA OUTROS SITES</li>
                <li>DISPOSIÇÕES GERAIS</li>
                <li>SUPORTE TÉCNICO DO Z-PRO</li>
                <li>ENTRE EM CONTATO COM A GENTE!</li>
              </ol>
              <p><strong>1. CONCEITOS IMPORTANTES NESTES TERMOS</strong></p>
              <ul>
                <li><strong>Cliente:</strong> Pessoa que efetua o pagamento da licença de uso do Z-PRO e determina quem são os Usuários cadastrados no seu dashboard.</li>
                <li><strong>Passaporte ZDG:</strong> Plataforma que oferece soluções de autoatendimento 24h através de chatbots, gerenciamento de atendimentos e envio de mensagens via Plataforma WhatsApp e Plataforma Telegram para o seu público-alvo.</li>
                <li><strong>Plano de Assinatura:</strong> Plano de contratação aderido por clique pelo Usuário diretamente na Plataforma de Compras parceiras, de acordo com os seus Termos de Uso, Aviso de Privacidade e condições de compra.</li>
                <li><strong>Plataforma WhatsApp:</strong> Plataforma de propriedade da WhatsApp LLC sobre a qual poderá ser executado o Software as a Service Z-PRO de acordo com o Plano de Assinatura contratado e os termos de uso da plataforma no link <a href="https://www.whatsapp.com/legal/">https://www.whatsapp.com/legal/</a>.</li>
                <li><strong>Plataforma Telegram:</strong> Plataforma de propriedade da Telegram Messenger Inc. sobre a qual poderá ser executado o Software as a Service Z-PRO de acordo com o Plano de Assinatura contratado e os termos de uso da plataforma no link <a href="https://telegram.org/tos/br">https://telegram.org/tos/br</a>.</li>
                <li><strong>Usuário:</strong> Pessoa indicada pelo Cliente para utilização de licença do Z-PRO, podendo ser:
                  <ul>
                    <li><strong>Usuário Administrador (Admin):</strong> Pessoa com visibilidade sobre as funcionalidades de gestão da equipe.</li>
                    <li><strong>Usuário Interno:</strong> Pessoa física cadastrada pelo Admin para acesso e utilização do Z-PRO.</li>
                  </ul>
                </li>
                <li><strong>Z-PRO:</strong> Módulo do Passaporte ZDG que disponibiliza um Software as a Service (SaaS) acessível no ambiente web que proporciona a otimização de atendimento de leads e clientes do Cliente na Plataforma WhatsApp e na Plataforma Telegram através de suas diversas funcionalidades.</li>
              </ul>

              <p><strong>2. O Z-PRO: SISTEMA INTEGRADO DE MULTIATENDIMENTO</strong></p>
              <p>O Z-PRO é um Software as a Service cuja licença de uso permite ao Cliente a sua utilização para configuração e gestão de atendimentos de leads e clientes dentro da Plataforma WhatsApp de forma facilitada e com um dashboard simples e intuitivo. Com o Z-PRO é possível organizar e implementar processos de multiatendimento eficientes na Plataforma WhatsApp e Telegram conforme indicado abaixo:</p>

              <p><strong>Na Plataforma WhatsApp</strong></p>
              <ul>
                <li>Fila de atendimento com tickets</li>
                <li>Protocolo de atendimento</li>
                <li>Avaliação de atendimento</li>
                <li>Controle e sistema de taggeamento de contato</li>
                <li>Gestão de grupos e contatos</li>
                <li>Gestão de envio de mensagens no WhatsApp e SMS</li>
                <li>Gestão de grupos</li>
                <li>Configuração de palavras proibidas, saudações e despedidas</li>
                <li>Chat interno para Usuários internos da sua empresa</li>
                <li>CRM com Kanban de atendimento</li>
                <li>Organização de tarefas para Usuários internos da sua empresa</li>
                <li>Gestão de canais oficiais de comunicação</li>
                <li>Configuração de mensagens rápidas automatizadas</li>
                <li>Configuração de chatbot para construção de fluxos de atendimento</li>
                <li>Agendamento de mensagens</li>
                <li>Protocolo de taggeamento de atendimentos</li>
                <li>Avaliação de atendimentos</li>
                <li>Definição de horário de atendimento</li>
                <li>Registros internos para transferência de chamados</li>
                <li>Configurações de uso do Z-PRO de forma customizada integrando com webhooks externos, com e-mail, Typebot, DialogFlow, Chat GPT, SMS, Meta, etc.</li>
                <li>Geração de relatórios de atendimento, inclusive por região, para avaliação dos atendimentos realizados na Plataforma WhatsApp.</li>
              </ul>

              <p><strong>Na Plataforma Telegram:</strong></p>
              <ul>
                <li>Gestão de canais</li>
              </ul>

              <p><strong>2.1. Visão administrativa</strong></p>
              <p>O Admin do Z-PRO terá acesso ainda:</p>
              <ul>
                <li>Relatório de atendimentos, inclusive por estado, através da análise do DDD do lead/cliente</li>
                <li>Painel de atendimento</li>
                <li>Administração de Usuários (criação, exclusão)</li>
                <li>Cadastro de filas de atendimento</li>
                <li>Chat interno com a equipe de Usuários Internos</li>
                <li>Mensagens rápidas pré-definidas</li>
                <li>Criação de protocolos de atendimento</li>
                <li>Criação de API para integração com sistemas externos</li>
              </ul>

              <p><strong>2.2. Desenvolvimento de novas funcionalidades</strong></p>
              <p>Outras funcionalidades poderão ser desenvolvidas e implementadas no Z-PRO para melhoramento da experiência dos Clientes e Usuários, de acordo com a agenda e interesse da [Empresa], não assistindo qualquer expectativa de direito por parte dos Clientes e Usuários sobre essa atividade.</p>

              <p><strong>2.3. Política de Uso Aceitável do Z-PRO</strong></p>
              <p>A licença de uso do Z-PRO contempla a revenda de licenças para prestação de serviços para outras empresas.</p>
              <p>A licença de uso do Z-PRO não contempla:</p>
              <ul>
                <li>A utilização para venda de cursos sobre o Z-PRO</li>
                <li>O fornecimento do Z-PRO para fornecimento em cursos ou comunidades</li>
                <li>O compartilhamento por pessoas que não fazem parte de uma mesma empresa</li>
              </ul>
              <p>A [BIANCA SANT ANA PEREIRA 10398514607 - CNPJ: 35.617.749/0001-67] reserva o direito de conduzir investigações internas quando suspeitar de ocorrência de uso em desconformidade com estes Termos e, no limite, revogar a licença de utilização do Cliente e seus Usuários, ainda que os Usuários sejam terceiros pagantes de licença de uso contratada pelo Cliente.</p>

              <p><strong>2.4. Suporte técnico</strong></p>
              <p>O Z-PRO conta com um time de suporte de segunda-feira à sexta-feira com prazo de primeiro atendimento de até 24 (vinte e quatro) horas úteis a contar da hora de início do chamado, com atendimentos via ticket na Plataforma TomTicket e através do Canal de Atendimento <a href="mailto:comunidadezdg@gmail.com">comunidadezdg@gmail.com</a>.</p>

              <p><strong>3. COMO ACESSAR O MÓDULO Z-PRO</strong></p>
              <p>O Cliente deverá realizar a contratação de um Plano de Assinatura através do redirecionamento do Site do Z-PRO diretamente para as Plataformas de Pagamento parceiras. O Cliente é o responsável financeiro pelo Plano de Assinatura escolhido e poderá cadastrar o nome, e-mail, senha de acesso e número de telefone dos Usuários integrantes da sua empresa para utilização do Z-PRO.</p>
              <p><strong>ATENÇÃO!</strong> Não há limitação de Usuários. Quando um Cliente efetua a contratação do Plano de Assinatura, ele passa a ter acesso ao Z-PRO enquanto o seu contrato estiver vigente e ativo.</p>
              <p>A partir do pagamento da assinatura, o Cliente poderá acessar o Z-PRO e utilizar as nossas funcionalidades. O Cliente é responsável pela designação do Admin, que poderá designar os demais Usuários Internos através dos mesmos dados utilizados para o seu cadastro.</p>
              <p>O time de Suporte do Z-PRO fará a validação dos subdomínios que acessam o Software as a Service como condição de utilização do módulo e controle, bem como coletará subdomínio, IP e data de aceite destes Termos, com o competente armazenamento no banco de dados.</p>
              <p>O Cliente é exclusivamente responsável por todas as ações realizadas dentro do seu ambiente Z-PRO pelos Usuários cadastrados em nome da sua empresa.</p>

              <p><strong>4. CONDIÇÕES PARA USAR O Z-PRO</strong></p>
              <p>Para realizar o cadastro e utilizar as funcionalidades do Z-PRO, o Usuário deve aceitar, concordar, bem como se comprometer a respeitar estes Termos e Condições de Uso, bem como as legislações aplicáveis.</p>
              <p>São requisitos obrigatórios para a utilização do Z-PRO que o Usuário cumulativamente:</p>
              <ul>
                <li>Utilize a Plataforma WhatsApp e a Plataforma Telegram de acordo com os Termos e Condições de Uso próprios dessas plataformas; e</li>
                <li>Tenha idade igual ou superior a 13 (treze) anos.</li>
              </ul>
              <p>Recomendamos que o sistema operacional e o navegador do Usuário estejam atualizados para aproveitar as otimizações de desempenho e segurança do Z-PRO, bem como que satisfaçam pelo menos os seguintes requisitos:</p>
              <ul>
                <li>Memória (RAM) de 8GB ou mais</li>
                <li>Conexão de internet rápida e estável</li>
              </ul>
              <p>A VPS onde o sistema será instalado deverá satisfazer os seguintes requisitos mínimos:</p>
              <ul>
                <li>Memória (RAM) de 16GB ou mais</li>
                <li>4vcpus ou mais</li>
                <li>Latência de 50ms ou menos</li>
              </ul>
              <p>Além disso, é crucial manter o sistema operacional e o navegador atualizados para evitar riscos de segurança da informação e privacidade, bem como para garantir uma melhor eficácia e funcionamento do Z-PRO. As versões suportadas da Plataforma WhatsApp são as seguintes:</p>
              <ul>
                <li>API WhatsApp Business Account v19.0</li>
                <li>Whatsapp Web v2.24xx.x</li>
              </ul>
              <p>O Usuário deve fornecer informações verdadeiras, exatas, atuais e completas.</p>
              <p>O Usuário concorda que é de sua exclusiva responsabilidade manter seus dados cadastrais atualizados, bem como zelar pela proteção e privacidade dos seus ambientes de trabalho.</p>
              <p>A proprietária do Z-PRO reserva o direito de recusar o cadastro e até mesmo cancelar contas que considere inapropriadas e/ou cujos Usuários adotem condutas contrárias a estes Termos, assim como pode recusar a prestação de quaisquer serviços que não correspondam às suas normas e valores, sem necessidade de notificação prévia ao Usuário e sem que lhe seja devida qualquer tipo de indenização ou compensação.</p>
            
              <p><strong>5. EXIGÊNCIA DE PLANO DE ASSINATURA ATIVO</strong></p>
              <p>Os Planos de Assinatura serão disponibilizados para compra no Site do Z-PRO que direciona o Cliente para um link externo pertencente à Plataforma de Pagamento parceira. A utilização do Z-PRO pelos Usuários depende da manutenção de um Plano de Assinatura ativo pelo Cliente.</p>
              <p>Os Planos disponíveis para contratação são disponibilizados nos links: <a href="https://comunidadezdg.com.br/passaporte">https://comunidadezdg.com.br/passaporte</a>.</p>
              <p>Os Planos de Assinatura não são renováveis automaticamente e ficarão ativos e disponíveis para utilização durante todo o período de contratação. Em caso de alteração e cobrança de valores para a utilização do Z-PRO, os Usuários poderão ser notificados e estes Termos serão atualizados.</p>
              <p>A cada ano o Cliente deverá contratar novo Plano de Assinatura, sendo recomendável que a cada contratação realize a leitura atenta destes Termos.</p>

              <p><strong>6. OBRIGAÇÕES DO Z-PRO</strong></p>
              <p>O Z-PRO será mantido como um Software as a Service de acordo com as condições descritas nestes Termos e o Usuário será mantido informado quanto a quaisquer alterações sobre suas funcionalidades tanto através dos canais de comunicação oficiais do Z-PRO quanto através deste documento.</p>
              <p>As obrigações do Z-PRO se limitam a assegurar as funcionalidades e segurança do Z-PRO conforme o que previsto neste documento, bem como realizar as correções e/ou alterações eventualmente necessárias para manutenção da experiência adequada e legitimamente esperada pelo Cliente durante a vigência do seu Plano de Assinatura.</p>
              <p>O Z-PRO utilizará como meio de conexão primário a API Oficial da Plataforma WhatsApp – WhatsApp Business Account (WABA) nas condições descritas nestes Termos. A utilização de APIs não oficiais para conexão à Plataforma WhatsApp é opcional e está sujeita a instabilidades e riscos associados ao seu uso de acordo com os avisos informados ostensivamente durante o uso do Z-PRO.</p>

              <p><strong>7. LIMITAÇÃO DE RESPONSABILIDADE</strong></p>
              <p>O Z-PRO não é responsável por quaisquer danos indiretos, incidentais, consequenciais ou punitivos decorrentes do uso do Software as a Service. Isso inclui, mas não se limita a, perda de lucros, interrupção de negócios, danos à reputação ou qualquer outra perda financeira ou não financeira.</p>
              <p>O Z-PRO não é responsável por danos diretos que sejam causados por:</p>
              <ul>
                <li>Garantias de resultados ou de vendas pela utilização do Z-PRO que não tiverem sido realizadas expressamente pelo Z-PRO no domínio de sua propriedade.</li>
                <li>Problemas no computador dos Usuários.</li>
                <li>Problemas na adaptação do Z-PRO durante a sua utilização pelos Usuários.</li>
                <li>Problemas com a utilização de extensões na Plataforma WhatsApp que podem se mostrar incompatíveis com o Z-PRO e/ou que tornem o Z-PRO inutilizável.</li>
                <li>Problemas na utilização de API não Oficial (Plataforma WhatsApp – WhatsApp Web).</li>
                <li>Conduta atribuível aos Usuários, inclusive criminosas e/ou moralmente condenáveis, seja durante a utilização ou não do Z-PRO, visto que o Z-PRO não tem qualquer tipo de controle sobre o conteúdo disponibilizado pelos Usuários nem possui qualquer tipo de acesso, gestão ou gerenciamento dos dados incluídos na Plataforma WhatsApp ou na Plataforma Telegram e nem tampouco tem conhecimento dos números de telefone contatados pelos Usuários utilizando o Z-PRO.</li>
                <li>Conduta do Usuário perante o Cliente.</li>
                <li>Descumprimento do Usuário de suas obrigações em desconformidade com estes Termos e legislações aplicáveis.</li>
                <li>Mau uso do Z-PRO.</li>
                <li>Acesso irregular de terceiros ao ambiente Z-PRO no dispositivo ou máquina do Usuário.</li>
                <li>Ações exclusivas de terceiros, bem como falhas na conexão de rede, conexão e interações maliciosas como ransomwares e vírus.</li>
                <li>Panes elétricas, falhas elétricas, etc.</li>
                <li>Casos fortuitos ou de força maior.</li>
                <li>Eventuais instabilidades e problemas de continuidade de serviços em razão de suspensões e/ou interrupções e/ou cancelamento de funcionamento e/ou modificação das condições da Plataforma WhatsApp ou da Plataforma Telegram, ainda que prejudiquem a utilização do Z-PRO pelos Usuários e que a paralisação, ainda que integral e por tempo indeterminado ou de forma terminativa, prejudique o andamento do contrato existente com o Cliente.</li>
                <li>Eventuais falhas técnicas ou operacionais que prejudiquem ou inviabilizam o uso do Z-PRO por determinado período de tempo, uma vez que tais falhas podem ocorrer e são esperadas pelo uso da tecnologia.</li>
              </ul>
              <p>O Usuário é exclusivamente responsável pelos dados e informações inseridos em sua conta, portanto não é obrigação do Z-PRO verificar e atestar a veracidade ou adequação dos dados fornecidos e nem tampouco a legitimidade e adequação das relações estabelecidas e mantidas durante o uso do Z-PRO.</p>
            

              <p><strong>8. OBRIGAÇÕES DO USUÁRIO</strong></p>
              <p>É obrigação do Usuário utilizar o Z-PRO de acordo com as condições descritas nestes Termos, as legislações aplicáveis e, caso haja, contratos firmados entre as partes e entre o Cliente e o Z-PRO.</p>
              <p>O Usuário deve usar o Z-PRO sempre de maneira honesta e ética, bem como se abster de qualquer tipo de conduta abusiva, ilegal ou ofensiva.</p>
              <p>É de responsabilidade exclusiva do Usuário para todos os efeitos, inclusive jurídicos, o teor das informações que insere nas Plataformas WhatsApp e Telegram e pelos compromissos que assume, sendo certo que o Z-PRO não tem acesso a essas informações.</p>
              <p>O Cliente é responsável por se certificar de que as configurações, atualizações e manutenções dos equipamentos dos Usuários atendam às necessidades e especificações para o correto funcionamento do Z-PRO de acordo com estes Termos.</p>
              <p>Os Usuários são responsáveis por seguir os procedimentos indicados para funcionamento do Z-PRO de acordo com as recomendações publicadas nas Plataformas Oficiais da Comunidade ZDG e do Passaporte ZDG.</p>

              <p><strong>9. CONDUTAS PROIBIDAS AO USUÁRIO</strong></p>
              <p>O Usuário declara e concorda em não:</p>
              <ul>
                <li>Praticar qualquer tipo de ato ilícito, imoral e que eventualmente viole a legislação brasileira ou internacional vigente.</li>
                <li>Violar direitos de terceiro ou direitos do Z-PRO.</li>
                <li>Disponibilizar ou permitir o acesso a conteúdo ilegal ou qualquer outro ato contrário à lei e à ordem pública.</li>
                <li>Utilizar o Z-PRO para realizar conduta não permitida nos Termos de Uso das Plataforma WhatsApp e Telegram.</li>
                <li>Qualquer tentativa de acesso não autorizado, modificação ou extração de dados do banco de dados Z-PRO.</li>
                <li>Qualquer tipo de tentativa de fraude ou manipulação, seja do Z-PRO ou de outras pessoas.</li>
                <li>Induzir ou praticar qualquer ato de discriminação ou incitar o ódio contra pessoas e/ou grupos de pessoas em razão de nacionalidade, raça, religião, orientação sexual, gênero, condição física, nacionalidade, dentre outros atos que contrariem a ordem pública e a legislação brasileira vigente.</li>
                <li>Utilizar scripts automatizados para recolher informações ou interagir com o ambiente do Z-PRO ou com qualquer meio eletrônico, a exemplo de sítios eletrônicos de propriedade do Z-PRO.</li>
                <li>Efetuar ações de engenharia reversa, descompilação, desmontagem, tradução, adaptação e/ou modificação do Z-PRO ou qualquer outra conduta que possibilite o acesso ao seu código-fonte.</li>
                <li>Rateio de licenças com pessoas de diferentes empresas.</li>
                <li>Violar direito de propriedade intelectual do Z-PRO ou de terceiro.</li>
                <li>Utilizar o Z-PRO para qualquer outro fim que não seja o disposto nestes Termos e Condições de uso.</li>
              </ul>

              <p><strong>10. POLÍTICA DE CHARGEBACK</strong></p>
              <p>Quando o portador do cartão pagador pede o cancelamento da transação realizada na plataforma de pagamento diretamente para o emissor do seu cartão, chamamos isso de chargeback. Isso pode acontecer por muitos motivos, como quando o portador do cartão não reconhece uma compra, quando não recebe o produto pelo qual pagou ou quando comete uma fraude.</p>
              <p>Quando alguém contesta a fatura de forma indevida, tendo efetivamente efetuado a compra do Plano de Assinatura e utilizado o serviço para receber injustamente o estorno do valor integral do Plano de Assinatura após o prazo de arrependimento, isso prejudica a nossa operação. Por isso, se avaliarmos que um único Cliente solicitou um número excepcional de chargebacks, reservamos o direito de banir o Cliente permanentemente.</p>

              <p><strong>11. EXCLUSÃO DO Z-PRO</strong></p>
              <p>O Usuário poderá excluir o programa e cancelar a execução do Z-PRO a qualquer momento, bastando que exclua o Software as a Service do seu ambiente de trabalho.</p>
              <p>Essa ação não implica o cancelamento do Plano de Assinatura e das cobranças sobre o valor contratado pelo Cliente.</p>
            
              <p><strong>12. CANCELAMENTO DO PLANO DE ASSINATURA</strong></p>
              <p><strong>12.1. Por decisão do Cliente</strong></p>
              <p>O Cliente poderá solicitar o cancelamento do Plano de Assinatura diretamente para o Z-PRO através do Canal de Atendimento <a href="mailto:comunidadezdg@gmail.com">comunidadezdg@gmail.com</a> a qualquer momento.</p>
              <p>Não suspenderemos a licença imediatamente! O Cliente tem direito à utilização do Plano de Assinatura comprado pelo prazo contratado, motivo pelo qual a licença permanecerá disponível para uso mesmo após o pedido de cancelamento até o fim do período adquirido no Plano de Assinatura.</p>
              
              <p><strong>12.1.1. Direito de Arrependimento</strong></p>
              <p>Na hipótese de o Cliente solicitar o cancelamento do Plano de Assinatura em até 7 (sete) dias a contar da data da compra, será integralmente ressarcido sobre o valor pago, de acordo com a política de reembolso da Plataforma de Pagamento escolhida para compra - e nos seus prazos e condições específicos.</p>
              
              <p><strong>12.1.2. Cancelamento</strong></p>
              <p>O Z-PRO não realizará o reembolso de valores cujo cancelamento for solicitado fora do período informado no item 12.1.1, motivo pelo qual serão devidas as parcelas vencidas e vincendas pelo Cliente de acordo com a disponibilidade do Software as a Service para seu uso.</p>
              
              <p><strong>12.2. Por decisão do Z-PRO</strong></p>
              <p>Além disso, o Z-PRO poderá cancelar o domínio do Usuário nas hipóteses previstas nestes Termos, como por descumprimento de obrigações de pagamento pelo Cliente, de leis e regulamentos, inadequação de condutas do Usuário, suspeita e/ou certeza de fraudes, golpes ou outro tipo de violação de obrigações de qualquer natureza, a critério do Z-PRO. Nesse caso, não deve existir qualquer tipo de expectativa ou direito a ressarcimento, compensação ou indenização para o Usuário que tiver a sua conta cancelada.</p>
              
              <p><strong>13. PROPRIEDADE INTELECTUAL</strong></p>
              <p>A titularidade e os direitos relativos ao Z-PRO pertencem exclusivamente à [BIANCA SANT ANA PEREIRA 10398514607 - CNPJ: 35.617.749/0001-67].</p>
              <p>O Usuário não adquire em razão do acesso e utilização regular do Z-PRO ou por meio destes Termos ou outro documento elaborado e/ou divulgado pela [BIANCA SANT ANA PEREIRA 10398514607 - CNPJ: 35.617.749/0001-67] nenhum direito de propriedade intelectual ou outros direitos exclusivos, incluindo patentes, desenhos, marcas, direitos autorais ou direitos sobre informações confidenciais ou segredos de negócio sobre ou relacionados ao Z-PRO, os quais são de propriedade exclusiva da [BIANCA SANT ANA PEREIRA 10398514607 - CNPJ: 35.617.749/0001-67].</p>
              <p>Dessa forma, não é permitido fazer nenhum tipo de utilização do conteúdo sem autorização prévia e expressa do Z-PRO, seja reprodução, alteração parcial, otimização, cópia ou outros meios de qualquer um dos elementos protegidos pela propriedade intelectual da [BIANCA SANT ANA PEREIRA 10398514607 - CNPJ: 35.617.749/0001-67], única e exclusiva licenciadora do Software as a Service Z-PRO na forma prevista no seu Plano de Assinatura e nestes Termos.</p>
              <p>Em caso de violação das proibições contidas nestes Termos ou nas legislações aplicáveis, incluindo, mas não se limitando à Lei de Propriedade Intelectual, a parte causadora poderá ser responsabilizada administrativamente, civil e criminalmente pelas infrações cometidas.</p>
              
              <p><strong>13.1. Licenciamento de Software</strong></p>
              <p>Para a prestação dos serviços, é necessário o licenciamento do software desenvolvido pela [BIANCA SANT ANA PEREIRA 10398514607 - CNPJ: 35.617.749/0001-67] para a utilização pelo Cliente.</p>
              <p>A [BIANCA SANT ANA PEREIRA 10398514607 - CNPJ: 35.617.749/0001-67] permanece detentora de toda a propriedade intelectual ou direito autoral desenvolvidos por ela dentro do escopo do Software as a Service Z-PRO, uma vez que somente confere os direitos de uso do software produzido de forma revogável e retratável para seus fins de direito.</p>
              <p>O licenciamento não abrange o código-fonte do projeto, que permanecerá como propriedade intelectual da [BIANCA SANT ANA PEREIRA 10398514607 - CNPJ: 35.617.749/0001-67].</p>
              <p>A [BIANCA SANT ANA PEREIRA 10398514607 - CNPJ: 35.617.749/0001-67] não será responsável pelo uso indevido ou inapropriado do software, bem como por quaisquer perdas e danos sofridos pelo Usuário ou por qualquer terceiro em decorrência de uso indevido ou inapropriado ou contrário à previsão destes Termos ou de leis, regras e regulamentos.</p>
          
              <p><strong>14. AVISO DE PRIVACIDADE</strong></p>
              <p>É disponibilizado por meio de um Aviso de Privacidade todas as informações sobre a coleta, utilização, processamento e divulgação das informações e dados pessoais dos Usuários tratados no Z-PRO, em conformidade com a Lei Geral de Proteção de Dados Pessoais (LGPD).</p>
              <p>Nós não temos acesso aos números de telefone dos seus contatos nas Plataformas WhatsApp e Telegram, nem às mensagens que você configura no Z-PRO, e nem ao script de conversação que você utiliza, a não ser que os Usuários voluntariamente compartilhem as informações com o Suporte do Z-PRO.</p>
              <p>O Aviso de Privacidade é parte integrante destes Termos e Condições de Uso e deve ser lido de forma atenta para utilização do Z-PRO.</p>

              <p><strong>15. LINKS PARA OUTROS SITES</strong></p>
              <p>O Cliente poderá ter que acessar links para sites externos que não estão sob responsabilidade da [BIANCA SANT ANA PEREIRA 10398514607 - CNPJ: 35.617.749/0001-67]. A [BIANCA SANT ANA PEREIRA 10398514607 - CNPJ: 35.617.749/0001-67] não pode confirmar o conteúdo de nenhum site que não seja de sua propriedade e nem o seu conteúdo, incluindo quaisquer informações ou materiais contidos neles. Avalie de forma atenta os termos e condições de uso e a política de privacidade de todos os sites que você visitar antes de clicar em qualquer ícone e compartilhar quaisquer dados.</p>

              <p><strong>16. DISPOSIÇÕES GERAIS</strong></p>
              <p>A [BIANCA SANT ANA PEREIRA 10398514607 - CNPJ: 35.617.749/0001-67] informa que poderá a qualquer momento unilateralmente modificar/atualizar estes Termos e Condições de Uso. Caso isso aconteça, o Usuário com Plano de Assinatura vigente será notificado e a versão atualizada valerá a partir de sua publicação. A continuidade de acesso ou utilização do Z-PRO pelos Usuários depois da divulgação confirmará a aceitação e vigência dos novos Termos e Condições de Uso.</p>
              <p>Qualquer cláusula ou condição destes Termos e Condições de Uso que eventualmente venha a ser considerada nula ou ineficaz por juízo, lei ou tribunal não afetará a validade das demais cláusulas e condições.</p>
              <p>A [BIANCA SANT ANA PEREIRA 10398514607 - CNPJ: 35.617.749/0001-67] poderá unilateralmente realizar modificações no Z-PRO, incluindo mas não se limitando a sua configuração, apresentação, desenho, conteúdo, funcionalidades, ferramentas, inclusive o seu desativamento. Nesta última hipótese, será respeitado o tempo de vigência da contratação do Cliente.</p>
              <p>Estes Termos são regidos e interpretados de acordo com as leis da República Federativa do Brasil. Fica eleito o foro da comarca de Alfenas - MG para serem dirimidos eventuais conflitos que estes Termos e Condições de Uso possam suscitar, renunciando as partes a qualquer outro foro por mais privilegiado que seja ou possa parecer.</p>

              <p><strong>17. SUPORTE TÉCNICO DO Z-PRO</strong></p>
              <p>Oferecemos Suporte Técnico nos Canais de Suporte indicados no nosso Site de segunda-feira a sexta-feira das 9h às 13h e das 14h às 18h.</p>
              <p>No entanto, a qualquer momento você pode enviar um comunicado para Canal de Atendimento <a href="mailto:comunidadezdg@gmail.com">comunidadezdg@gmail.com</a>.</p>

              <p><strong>18. ENTRE EM CONTATO COM A GENTE!</strong></p>
              <p>Ficamos à disposição para esclarecer suas dúvidas, receber feedbacks ou reclamações através do seguinte Canal de Atendimento: <a href="mailto:comunidadezdg@gmail.com">comunidadezdg@gmail.com</a>.</p>
              
            </div>
          </q-tab-panel>
          <q-tab-panel name="privacidade">
            <div class="contract-content">
              <!-- Conteúdo da Política de Privacidade -->
              <p><strong>AVISO DE PRIVACIDADE</strong></p>
              <p>É disponibilizado por meio de um Aviso de Privacidade todas as informações sobre a coleta, utilização, processamento e divulgação das informações e dados pessoais dos Usuários tratados no Z-PRO, em conformidade com a Lei Geral de Proteção de Dados Pessoais (LGPD).</p>
              <p>Nós não temos acesso aos números de telefone dos seus contatos nas Plataformas WhatsApp e Telegram, nem às mensagens que você configura no Z-PRO, e nem ao script de conversação que você utiliza, a não ser que os Usuários voluntariamente compartilhem as informações com o Suporte do Z-PRO.</p>
              <p>O Aviso de Privacidade é parte integrante destes Termos e Condições de Uso e deve ser lido de forma atenta para utilização do Z-PRO.</p>
              <!-- Continue o restante do conteúdo da Política de Privacidade aqui -->
            </div>
          </q-tab-panel>
        </q-tab-panels>

        <q-card-actions align="right">
          <q-btn flat label="Eu li e concordo com os termos de uso" @click="aceitar" color="primary" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>


<script>
import { QDialog, QCard, QCardSection, QTabs, QTab, QTabPanels, QTabPanel, QSeparator, QCardActions, QBtn } from 'quasar';
import packageEnv from 'src/../package.json'
export default {
    props: ['show'],
    methods: {
        close() {
            this.$emit('close');
        },
        aceitar() {
            this.$emit('aceitar');
        }
    },
    computed: {
        cVersion () {
            return packageEnv.version
        }
    }
}
</script>
  
<style scoped>
.contract-content {
  text-align: justify;
  padding: 16px;
}

.modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-right: 20px; 
}

.modal-content {
    background: white;
    padding: 20px;
    border-radius: 5px;
    width: 67%; 
    max-height: 90%; 
    position: relative;
    display: flex;
    flex-direction: column;
    margin-right: 20px; 
}

.contract-content {
    overflow-y: scroll;
    height: 300px; 
    margin-bottom: 20px;
    border: 1px solid #ccc; 
    padding: 10px;
    text-align: left;
}

button {
    margin-top: auto; 
}
</style>
