<template>
  <div>
    <q-dialog v-model="show" persistent>
      <q-card>
        <q-card-section>
          <div class="text-h6">Termos e Condições de Uso | Política de Privacidade</div>
        </q-card-section>
        
        <q-tabs v-model="activeTab" class="text-teal" align="left" narrow-indicator>
          <q-tab name="termos" label="Termos de Uso" :class="{ 'active-tab': activeTab === 'termos', 'inactive-tab': activeTab !== 'termos' }"/>
          <q-tab name="privacidade" label="Política de Privacidade" :class="{ 'active-tab': activeTab === 'privacidade', 'inactive-tab': activeTab !== 'privacidade' }"/>
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="activeTab" animated>
          <q-tab-panel name="termos">
            <div class="contract-content">
              <h2>Termos e Condições de Uso</h2>
              <p><a target="_blank"href="https://drive.google.com/file/d/1CxIQb4dk0eRglDz75exTbtbtNNTxSiH6/view?usp=drive_link">Download aqui</a></p>
              <p><strong>Módulo Z-PRO</strong></p>
              <p><strong>Data de disponibilização: 22/05/2024</strong></p>
              <p><strong>Versão: 3.0.0.x</strong></p>

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
              <p>Outras funcionalidades poderão ser desenvolvidas e implementadas no Z-PRO para melhoramento da experiência dos Clientes e Usuários, de acordo com a agenda e interesse da Comunidade ZDG, não assistindo qualquer expectativa de direito por parte dos Clientes e Usuários sobre essa atividade.</p>

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
              <h2><strong>Aviso de Privacidade</strong></h2>
              <p><a target="_blank"href="https://drive.google.com/file/d/1CxIQb4dk0eRglDz75exTbtbtNNTxSiH6/view?usp=drive_link">Download aqui</a></p>
              <p><strong>Módulo Z-PRO</strong></p>
              <p><strong>Data de disponibilização: 22/05/2024</strong></p>
              <p><strong>Versão: 3.0.0.x</strong></p>
              <p>Oi Titular!</p>
              <p>A Comunidade ZDG tem um compromisso sério com a privacidade e a proteção dos dados pessoais das pessoas impactadas pelas suas atividades. Por isso criamos este Aviso de Privacidade (o “Aviso”) para informar você como coletamos, utilizamos, processamos e compartilhamos, quando estritamente necessário, dados pessoais quando você executa e utiliza o Z-PRO.</p>
              <p>O Z-PRO é um Software as a Service que permite aos seus Usuários a otimização da comunicação com leads e clientes através de uma plataforma de multiatendimento de gestão de atividades e mensagens via Plataforma WhatsApp durante o uso da licença pelo período contratado no Plano de Assinatura adquirido de acordo com os Termos e Condições de Uso do Z-PRO.</p>
              <p>Para que nossa relação seja transparente e adequada à Lei Geral de Proteção de Dados Pessoais (a “LGPD”) criamos este AVISO DE PRIVACIDADE (o “Aviso”) através do qual informaremos a você como coletamos, utilizamos, processamos e divulgamos suas informações e dados pessoais quando do seu acesso e uso do Z-PRO, nosso Site e nossas landing pages.</p>
              <p>Como você vai perceber, nós coletamos o mínimo possível de Dados Pessoais na prestação dos nossos serviços e optamos por não ter acesso a nenhum Dado Pessoal a que não precisamos ter efetivamente acesso para cumprimento de nossas atividades.</p>
              <p>Leia atentamente este documento e na hipótese de ter algum questionamento, querer manifestar alguma inconformidade sobre o tratamento de dados pessoais que realizamos ou desejar exercer seus direitos de titular, não utilize nosso Software as a Service, nosso Site e nossas landing pages e falem imediatamente conosco no nosso Canal de Atendimento <a href="https://comunidadezdg.com.br/fale-com-a-zdg">aqui</a> ou <a href="mailto:comunidadezdg@gmail.com">comunidadezdg@gmail.com</a>.</p>
              <p>Este Aviso de Privacidade integra de forma indissociável os Termos e Condições de Uso que definem as condições da utilização do Site, então não deixe de ler esse documento também.</p>
              <p><strong>QUAIS AS INFORMAÇÕES QUE VOCÊ ENCONTRARÁ NESTE AVISO</strong></p>
              <ol>
                  <li>CONCEITOS IMPORTANTES PARA ESTE AVISO</li>
                  <li>A QUEM SE APLICA ESTE AVISO?</li>
                  <li>PAPÉIS E RESPONSABILIDADES NO TRATAMENTO DE DADOS PESSOAIS</li>
                  <li>COMO SÃO TRATADOS OS DADOS PESSOAIS DE QUEM UTILIZA O MÓDULO Z-PRO E O NOSSO SITE</li>
                  <li>COMPARTILHAMENTO DE DADOS PESSOAIS</li>
                  <li>LINK PARA SITES/PLATAFORMAS DE TERCEIROS</li>
                  <li>COMO PROTEGEMOS SEUS DADOS</li>
                  <li>SAIBA OS SEUS DIREITOS E COMO EXERCÊ-LOS</li>
                  <li>POR QUANTO TEMPO ARMAZENAMOS SEUS DADOS?</li>
                  <li>DISPOSIÇÕES GERAIS</li>
                  <li>CANAL DE COMUNICAÇÃO</li>
              </ol>
              <p><strong>1.   CONCEITOS IMPORTANTES PARA ESTE AVISO</strong></p>
              <p>Alguns conceitos para auxiliar na compreensão deste Aviso.</p>
              <p><strong>Anonimização:</strong> Processo pelo qual os dados pessoais coletados se tornam arquivos armazenados pelo Controlador, tornando impossível a identificação da pessoa a quem tais dados se referem.</p>
              <p><strong>ANPD:</strong> Autoridade Nacional de Proteção de Dados, órgão da administração pública responsável por zelar, implementar e fiscalizar o cumprimento da LGPD em todo o território nacional.</p>
              <p><strong>Cliente:</strong> Pessoa que efetua o pagamento da licença de uso do Z-PRO e determina quem são os Usuários cadastrados no seu dashboard.</p>
              <p><strong>Controlador:</strong> O responsável pelas decisões referentes ao tratamento de dados dos titulares afetados por uma atividade.</p>
              <p><strong>Dados Pessoais:</strong> Informações que identificam uma pessoa natural, como por exemplo: e-mail, CPF, telefone e endereço.</p>
              <p><strong>Dados Pessoais Sensíveis:</strong> Dado pessoal sobre origem racial ou étnica, convicção religiosa, opinião, filiação a sindicato ou a organização de caráter religioso, filosófico ou político, dado referente à saúde ou à vida sexual, dado genético ou biométrico.</p>
              <p><strong>IP:</strong> O endereço IP é o código atribuído a um terminal de uma rede para permitir sua identificação, definido segundo parâmetros internacionais.</p>
              <p><strong>LGPD:</strong> Lei Geral de Proteção de Dados Pessoais, Lei n° 13.709/2018, que dispõe sobre o tratamento e proteção de dados.</p>
              <p><strong>Operador:</strong> Quem realiza o tratamento de dados segundo as orientações do Controlador.</p>
              <p><strong>Passaporte ZDG:</strong> Plataforma que oferece soluções de autoatendimento 24h através de chatbots, gerenciamento de atendimentos e envio de mensagens via Plataforma WhatsApp e Plataforma Telegram para o seu público-alvo.</p>
              <p><strong>Plano de Assinatura:</strong> Plano de contratação aderido por clique pelo Cliente diretamente nas Plataformas de Compras parceiras, de acordo com os seus termos de uso, avisos de privacidade e condições de compra.</p>
              <p><strong>Plataforma WhatsApp:</strong> Plataforma de propriedade da WhatsApp LLC sobre a qual poderá ser executado o Software as a Service Z-PRO, de acordo com o Plano de Assinatura contratado e os termos de uso da plataforma no link <a href="https://www.whatsapp.com/legal/">https://www.whatsapp.com/legal/</a>.</p>
              <p><strong>Plataforma Telegram:</strong> Plataforma de propriedade da Telegram Messenger Inc. sobre a qual poderá ser executado o Software as a Service Z-PRO, de acordo com o Plano de Assinatura contratado e os termos de uso da plataforma no link <a href="https://telegram.org/tos/br">https://telegram.org/tos/br</a>.</p>
              <p><strong>Site:</strong> O site do Z-PRO disponível no link <a href="https://comunidadezdg.com.br/passaporte">https://comunidadezdg.com.br/passaporte</a>.</p>
              <p><strong>Tratamento de Dados:</strong> Toda operação realizada com dados pessoais, como as que se referem à coleta, produção, recepção, classificação, utilização, acesso, reprodução, transmissão, distribuição, processamento, arquivamento, armazenamento, eliminação, avaliação ou controle da informação, modificação, comunicação, transferência, difusão ou extração.</p>
              <p><strong>Titulares:</strong> Pessoa física a quem se referem os dados pessoais objeto de Tratamento por Controladores e Operadores.</p>
              <p><strong>Usuário:</strong> Pessoa indicada pelo Cliente para utilização de licença do Z-PRO, podendo ser:</p>
              <ul>
                  <li><strong>Usuário Administrador (o “Admin”):</strong> Pessoa com visibilidade sobre as funcionalidades de gestão da equipe.</li>
                  <li><strong>Usuário Interno:</strong> Pessoa física cadastrada pelo Admin para acesso e utilização do Z-PRO.</li>
                  <li><strong>Usuário do Site:</strong> Pessoa física que utiliza o Site do Z-PRO, mas não interage com a plataforma.</li>
              </ul>
              <p><strong>Z-PRO:</strong> Módulo do Passaporte ZDG que disponibiliza um Software as a Service (SaaS) acessível no ambiente web, que proporciona a otimização de atendimento de leads e clientes do Cliente e dos Usuários na Plataforma WhatsApp e na Plataforma Telegram através de suas diversas funcionalidades.</p>

              <p><strong>2. A QUEM SE APLICA ESTE AVISO?</strong></p>
              <p>Este Aviso de Privacidade (Aviso) se aplica aos Usuários do Z-PRO e do Site.</p>
              
              <p><strong>3. PAPÉIS E RESPONSABILIDADES NO TRATAMENTO DE DADOS PESSOAIS</strong></p>
              <p>Pessoas responsáveis pelo tratamento de dados pessoais de Titulares.</p>
              <p>A Bianca Sant Ana Pereira 10398514607 ME, pessoa jurídica de direito privado inscrita no CNPJ sob o nº 35.617.749/0001-67, com endereço na Rua Alaor Ferreira da Fonseca n. 295, bairro Jardim América, em Alfenas/MG, CEP: 37.136-132, é a responsável pelo tratamento dos dados pessoais dos Usuários do Z-PRO e do Site, agindo como Controladora desses dados.</p>
              <p>Todavia, quando um Cliente do Z-PRO usa a sua licença, ele também age como Controlador Conjunto sobre esses dados, sendo indispensável que mantenha suas próprias políticas e medidas técnicas e administrativas de controle e proteção de dados pessoais. É fundamental que o Cliente e seus Usuários, por exemplo, assumam integralmente a obrigação de inclusão das operações realizadas pelo Z-PRO nos avisos de privacidade necessários, bem como que obtenha todos os consentimentos aplicáveis, sendo responsabilidade do Cliente e de seus Usuários a manutenção do Tratamento de Dados de acordo com a legislação.</p>
              <p>Para fazer a contratação de Plano de Assinatura, o cliente deverá realizar a compra da licença de uso por tempo determinado na Plataforma de Pagamento Parceira. Essa Plataforma de Pagamento também é Controladora dos dados na medida em que processa os dados pessoais de titulares para suas devidas finalidades.</p>
              <p>A Bianca Sant Ana Pereira 10398514607 ME não é e nem será responsável pelo Tratamento de Dados realizado por terceiros dentro ou fora do seu Software as a Service.</p>

              <p><strong>3.1. COMO SÃO TRATADOS OS DADOS PESSOAIS DE QUEM UTILIZA O MÓDULO Z-PRO E O NOSSO SITE</strong></p>
              <p>3.1.1. Dados coletados para acesso ao Z-PRO</p>
              <p>Para cadastro e criação de Usuário são coletados os seguintes dados:</p>
              <ul>
                  <li>Nome</li>
                  <li>Telefone</li>
                  <li>E-mail</li>
                  <li>IP</li>
                  <li>Senha</li>
                  <li>Aceite de Termos e Condições de Uso</li>
              </ul>
              
              <p>3.1.2. Dados coletados para comunicação com Usuários</p>
              <p>Para comunicação com o Titular são coletados os seguintes dados:</p>
              <ul>
                  <li>Nome</li>
                  <li>Telefone</li>
                  <li>E-mail</li>
              </ul>
              
              <p>3.1.3. Dados coletados quando você interage com as nossas redes sociais</p>
              <p>Coletamos os dados necessários para entrar em contato com você, como nome, e-mail e telefone. Os dados pessoais que podem ser acessados são:</p>
              <ul>
                  <li>Nome</li>
                  <li>Telefone</li>
                  <li>Foto de WhatsApp</li>
              </ul>
              
              <p>3.1.3.1 Dados coletados indiretamente e cookies</p>
              <p>A nossa empresa pode coletar indiretamente, durante a utilização do Z-PRO pelo Usuário, como endereço IP, sessão, registros de data e horário de ações, aceite de Termos e Condições de Uso, atividades no nosso Software as a Service, etc., por meio de webhooks e cookies que serão tratados em um item específico.</p>
              
              <p>3.1.3.2 Logs de aplicação</p>
              <p>São coletados os registros de acesso, conjunto de informações referentes à data e hora de uso de uma determinada aplicação de internet a partir de um determinado endereço IP, nos termos da Lei nº 12.965/2014 (Marco Civil da Internet). Esse registro somente pode ser acessado através de mandado judicial.</p>
              
              <p>3.1.3.3 Cookies</p>
              <p>No nosso Site, temos um banner de cookies que pode ser acessado sempre que você quiser acessar e setar as configurações de privacidade nas nossas atividades e mudar as configurações relacionadas ao seu consentimento sobre o que puder ser alterado.</p>
              <p>Esse banner é dividido em duas telas. Na primeira tela, você pode decidir se quer:</p>
              <ul>
                  <li>Aceitar todos os nossos cookies</li>
                  <li>Rejeitar os cookies não necessários</li>
                  <li>Configurar o seu aceite de acordo com as suas preferências.</li>
              </ul>
              <p>Se você optar por configurar o seu aceite, você consegue ver que nosso Site utiliza diversos tipos de cookies para aprimorar a sua experiência e customizar a sua navegação que podem estar divididos em 5 grandes “famílias”. São elas:</p>
              <ul>
                  <li><strong>Cookies necessários:</strong> Os cookies necessários são essenciais para o funcionamento do site. Sem eles, o site não funcionaria corretamente (por exemplo, acesso a áreas seguras do site, segurança, legislação).</li>
                  <li><strong>Cookies de performance:</strong> Os cookies de desempenho permitem que o site se comporte de acordo com o visitante, ajustando-se à sua localização, idioma preferido, etc.</li>
                  <li><strong>Cookies funcionais:</strong> Os cookies funcionais ajustam o site a serviços de terceiros, como links para seu perfil em redes sociais, comentários, chatbots, etc.</li>
                  <li><strong>Cookies de marketing:</strong> Os cookies de marketing ou publicidade rastreiam a navegação dos visitantes e coletam dados para que a empresa possa fornecer anúncios mais relevantes de acordo com tal comportamento.</li>
                  <li><strong>Cookies de estatísticas:</strong> Os cookies de estatísticas ou análises traduzem as interações dos visitantes em relatórios detalhados de comportamento de maneira anônima.</li>
              </ul>
              <p>Você pode conferir como cada cookie se comporta diretamente no nosso banner.</p>
              <p>Diferentes funcionalidades de cookies trazem diferentes bases legais de tratamento de dados, motivo pelo qual o Titular pode modular a sua aceitação na tela de configurações, optando ativamente por aqueles dados que consente em coletar. Eles vêm desativados por padrão, então se você não aceitou ou rejeitou todos no botão rápido da primeira tela, poderá selecionar os que consente em aceitar nessa segunda tela.</p>
              
              <p>3.2. Da negativa de tratamento de dados de clientes</p>
              <p>O Z-PRO não tem acesso aos dados que os Usuários operam no Z-PRO.</p>
              <p>O Z-PRO não tem acesso aos dados dos contatos telefônicos dos Usuários do Z-PRO.</p>
              <p>O Z-PRO não tem acesso às conversas dos Usuários do Z-PRO.</p>
              
              <p>3.3. Finalidades e bases legais do tratamento de dados pessoais</p>
              <table>
                  <thead>
                      <tr>
                          <th>Dados Coletados</th>
                          <th>Finalidade</th>
                          <th>Base legal</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr>
                          <td>Informações de Cadastro de Cliente</td>
                          <td>Para formação do contrato e identificação do Usuário que adquire o direito de usar a Licença do Z-PRO e suas funcionalidades.</td>
                          <td>Execução de Contrato e procedimentos preliminares (art. 7º V LGPD)</td>
                      </tr>
                      <tr>
                          <td>Informações de Cadastro de Usuário</td>
                          <td>Para identificação do Usuário que adquire o direito de usar a Licença do Z-PRO e suas funcionalidades.</td>
                          <td>Execução de Contrato e procedimentos preliminares (art. 7º V LGPD)</td>
                      </tr>
                      <tr>
                          <td>Interações de Usuários com o Z-PRO em canais de comunicação e/ou atendimento.</td>
                          <td>Tornar o atendimento do Z-PRO mais eficiente e melhorar a experiência do Usuário.</td>
                          <td>Legítimo interesse (art. 7º IX LGPD)</td>
                      </tr>
                      <tr>
                          <td>Endereço IP, sessão do Usuário, registros de data e horário de ações, dispositivo/navegador, as atividades do Usuário no site.</td>
                          <td>Coletar informações para identificar e proteger os Usuários, bem como cumprir com as obrigações legais.</td>
                          <td>Obrigação legal ou regulatória do Controlador (art. 7º II LGPD) - Atender ao Marco Civil da Internet (art. 15). Legítimo interesse do Controlador (art. 7º IX LGPD)</td>
                      </tr>
                      <tr>
                          <td>Cookies necessários</td>
                          <td>Para registrar a ação de aceitação, modulação ou rejeição de cookies pelo Titular durante a navegação no Site.</td>
                          <td>Legítimo interesse do Controlador (art. 10 LGPD)</td>
                      </tr>
                      <tr>
                          <td>Cookies funcionais, estatísticos, de performance e de marketing</td>
                          <td>Para personalização da experiência do Usuário, aprimorar as nossas funcionalidades e direcionar a publicidade para Usuários de acordo com o interesse dele na SAFIE.</td>
                          <td>Consentimento (art. 7º I LGPD)</td>
                      </tr>
                  </tbody>
              </table>
              
              <p>3.4. Veracidade dos dados</p>
              <p>O Usuário é responsável pela veracidade dos seus dados pessoais. A licença de uso do Z-PRO não contempla a responsabilidade pela conferência da autenticidade de dados do Cliente/Usuário e/ou outras ações de confirmação ou validação dos dados durante a utilização do Z-PRO.</p>
              <p>A licença de uso do Z-PRO não inclui a obrigatoriedade de processamento ou Tratamento de Dados fornecidos pelo Cliente ou pelo Usuário se pender suspeita motivada para crer que a realização da atividade possa causar infração de qualquer lei aplicável, bem como sobre a utilização indevida do Z-PRO pelo Cliente/Usuário, como para fins ilegais, ilícitos ou contrários a este Aviso ou aos Termos e Condições de Uso.</p>


              <p><strong>4. COMPARTILHAMENTO DE DADOS PESSOAIS</strong></p>
              <p>O Z-PRO pode compartilhar os dados necessários para que seja possível a manutenção das suas operações de forma eficiente. Ou seja, dados poderão ser compartilhados com empresas contratadas para que as funcionalidades do Z-PRO estejam disponíveis e/ou para que forneçam uma melhor experiência para o Cliente e os Usuários.</p>
              <p>Terão acesso aos dados pessoais coletados para operação do Z-PRO, como Operadores de dados, os agentes terceirizados especializados para prestação de serviços pontuais e específicos para o nosso Software as a Service, tais como:</p>
              <ul>
                  <li>Plataforma Cloud Hetzner - servidores em nuvem - <a href="https://www.hetzner.com/legal/privacy-policy/">https://www.hetzner.com/legal/privacy-policy/</a></li>
                  <li>Plataforma WhatsApp - serviços de mensagens instantâneas - <a href="https://www.whatsapp.com/legal/">https://www.whatsapp.com/legal/</a></li>
                  <li>Plataforma Telegram - serviços de mensagens instantâneas - <a href="https://telegram.org/tos/br">https://telegram.org/tos/br</a></li>
              </ul>
              <p>No entanto, poderá ser que para utilização do Z-PRO o Cliente tenha que compartilhar dados pessoais com outros Controladores de dados, como as nossas parceiras:</p>
              <ul>
                  <li>Plataforma de Pagamento Hotmart - <a href="https://hotmart.com/pt-br/legal/privacidade-de-dados">https://hotmart.com/pt-br/legal/privacidade-de-dados</a></li>
                  <li>Plataforma de Pagamento Greenn - <a href="https://greenn.com.br/politica-de-privacidade-greenn/">https://greenn.com.br/politica-de-privacidade-greenn/</a></li>
              </ul>
              <p>Nesse caso, você precisa entender que essas plataformas poderão solicitar dados pessoais que não são armazenados no Z-PRO para cumprir suas próprias obrigações relacionadas ao Tratamento de Dados. Antes de aceitar qualquer tipo de termo ou política de privacidade, informe-se bem.</p>
              <p>Todas as nossas contratações prezam pelo tratamento seguro das informações do Cliente/Usuário.</p>
              <p>A partir do momento que esses terceiros tiverem acesso aos dados compartilhados, serão responsáveis pelo seu tratamento em segurança, estando limitados às finalidades relacionadas ao serviço contratado e devendo respeitar a Lei aplicável.</p>
              
              <p>4.1. Transferência Internacional de Dados</p>
              <p>Até o limite permitido pela LGPD, poderá haver o compartilhamento de dados fora do Brasil.</p>
              <p>Essa transferência internacional ocorre quando utilizamos serviços em nuvem para processamento ou armazenamento de dados, para que seja possível executar os nossos serviços da melhor forma em um ambiente seguro.</p>
              <p>Para isso, utiliza-se os servidores cloud da Hetzner, que implica em uma transferência internacional dos dados pessoais para o país sede deste servidor, nos Estados Unidos da América. Outros servidores da Z-PRO ficam em São Paulo/SP, no Brasil.</p>
              <p>Ao fazer isso, tomamos todas as medidas cabíveis para assegurar que os seus dados sejam tratados e compartilhados de forma segura e em conformidade com a legislação vigente e este Aviso de Privacidade.</p>
              
              <p><strong>5. LINK PARA SITES/PLATAFORMAS DE TERCEIROS</strong></p>
              <p>Nosso Site pode conter links para sites/plataformas de terceiros, como parceiros, anunciantes e redes sociais. Ao seguir um link, é importante observar que esses sites/plataformas têm seus próprios avisos e políticas de privacidade e que a nossa empresa não é responsável por esses avisos e nem pela coleta de dados realizada. Recomendamos a verificação desses avisos e políticas antes de enviar quaisquer dados pessoais a esses terceiros.</p>
              
              <p><strong>6. COMO PROTEGEMOS SEUS DADOS</strong></p>
              <p>O Z-PRO se compromete com a segurança de todos seus Usuários e por isso adota procedimentos físicos, eletrônicos e administrativos que garantem a privacidade e segurança dos seus dados, com medidas técnicas compatíveis com os padrões esperados e boas práticas de segurança da informação.</p>
              <p>Sempre que possível, não coletamos dados sobre a sua utilização do Z-PRO.</p>
              <p>Em hipótese alguma teremos acesso às suas conversas.</p>
              <p>Todas as tecnologias utilizadas e empregadas no Z-PRO respeitarão sempre a legislação vigente e os termos deste Aviso de Privacidade.</p>
              
              <p><strong>7. SAIBA OS SEUS DIREITOS E COMO EXERCÊ-LOS</strong></p>
              <p><strong>Acesso e confirmação de tratamento:</strong> Você pode solicitar o acesso à relação completa de dados coletados e tratados, bem como a confirmação do tratamento de seus dados pessoais.</p>
              <p><strong>Retirada de consentimento:</strong> Você poderá retirar a sua anuência com o Tratamento de Dados Pessoais a qualquer momento, quando esta for a base legal adequada para realização do tratamento dos seus dados pessoais.</p>
              <p><strong>Correção de dados pessoais:</strong> Você pode solicitar a correção de dados que estão incompletos, inexatos ou desatualizados.</p>
              <p><strong>Anonimização, bloqueio ou eliminação:</strong> Todos os dados coletados e tratados por nós têm como finalidade a prestação de serviços e o bom desempenho do Software as a Service. Caso você acredite que algum dado seu está sendo tratado de forma desnecessária, em excesso ou o tratamento não esteja em conformidade com a LGPD, você poderá solicitar a anonimização, bloqueio ou eliminação, caso prove que houve excesso, desnecessidade ou desconformidade com a LGPD.</p>
              <p><strong>Informação acerca do compartilhamento:</strong> Você pode solicitar informações sobre nossos parceiros e fornecedores com os quais compartilhamos os dados. Todos os nossos parceiros também estão preocupados com a segurança dos Usuários e garantem a adoção de medidas adequadas para a proteção de seus dados.</p>
              <p><strong>Decisões automatizadas:</strong> Você pode solicitar a revisão de decisões tomadas unicamente com base no tratamento automatizado de dados e os critérios utilizados nessas decisões, observados sempre os segredos comerciais e industriais da nossa empresa.</p>
              <p><strong>Portabilidade de dados:</strong> Você poderá solicitar a portabilidade dos seus dados pessoais a outro fornecedor de serviços, em atendimento ao disposto na LGPD.</p>
              <p><strong>Oposição ou objeção a Tratamento de Dados Pessoais:</strong> Se você quiser, pode objetar o tratamento de alguns Dados Pessoais que realizamos ou apresentar oposição ao tratamento por completo. Nesse caso, poderemos parar o tratamento ou explicar que temos uma base legal adequada para realizar os tratamentos questionados.</p>
              <p><strong>Registro de reclamação:</strong> Você poderá procurar a ANPD a qualquer momento, caso sinta que seus direitos foram violados.</p>
              <p>Para exercer qualquer um dos seus direitos como Titular, entre em contato através do Canal de Atendimento | <a href="https://comunidadezdg.com.br/fale-com-a-zdg">https://comunidadezdg.com.br/fale-com-a-zdg</a> ou <a href="mailto:comunidadezdg@gmail.com">comunidadezdg@gmail.com</a>.</p>
              
              <p><strong>8. POR QUANTO TEMPO ARMAZENAMOS SEUS DADOS?</strong></p>
              <p>Os dados fornecidos pelo Cliente/Usuário serão armazenados e processados enquanto seu cadastro estiver ativo.</p>
              <p>Caso o Usuário desejar, pode solicitar a exclusão da sua conta e dos seus dados pessoais através do Canal de Atendimento | <a href="https://comunidadezdg.com.br/fale-com-a-zdg">https://comunidadezdg.com.br/fale-com-a-zdg</a> ou <a href="mailto:comunidadezdg@gmail.com">comunidadezdg@gmail.com</a>.</p>
              <p>Diante da solicitação de exclusão ou término da finalidade de tratamento, o Usuário terá todos os seus dados deletados permanentemente, exceto os dados cuja manutenção seja obrigatória por lei ou regulamentação, ou em relação aos dados necessários para o exercício regular de direitos em processo judicial, administrativo ou arbitral.</p>
              
              <p><strong>9. DISPOSIÇÕES GERAIS</strong></p>
              <p>A qualquer momento, unilateralmente, poderemos modificar/atualizar este Aviso. Caso isso aconteça, o Titular será notificado e a versão atualizada valerá a partir de sua publicação.</p>
              <p>A continuidade de acesso ou utilização do Cliente/Usuário após divulgação da atualização confirmará a ciência e vigência do novo Aviso.</p>
              <p>Além deste Aviso de Privacidade, nós dispomos de Termos e Condições de Uso, os quais definem as condições de uso que irão disciplinar a utilização do Z-PRO. Os Termos abrangem inseparavelmente as disposições deste Aviso de Privacidade.</p>
              
              <p><strong>10. CANAL DE COMUNICAÇÃO</strong></p>
              <p>Nós disponibilizamos um canal de comunicação para oferecer suporte ao titular de dados pessoais e quaisquer questões relacionadas a esse Aviso no Canal de Atendimento | <a href="https://comunidadezdg.com.br/fale-com-a-zdg">https://comunidadezdg.com.br/fale-com-a-zdg</a> ou <a href="mailto:comunidadezdg@gmail.com">comunidadezdg@gmail.com</a>.</p>

              <p>O Z-PRO pode compartilhar os dados necessários para que seja possível a manutenção das suas operações de forma eficiente. Ou seja, dados poderão ser compartilhados com empresas contratadas para que as funcionalidades do Z-PRO estejam disponíveis e/ou para que forneçam uma melhor experiência para o Cliente e os Usuários.</p>
              <p>Terão acesso aos dados pessoais coletados para operação do Z-PRO, como Operadores de dados, os agentes terceirizados especializados para prestação de serviços pontuais e específicos para o nosso Software as a Service, tais como:</p>
              <ul>
                  <li>Plataforma Cloud Hetzner - servidores em nuvem - <a href="https://www.hetzner.com/legal/privacy-policy/">https://www.hetzner.com/legal/privacy-policy/</a></li>
                  <li>Plataforma WhatsApp - serviços de mensagens instantâneas - <a href="https://www.whatsapp.com/legal/">https://www.whatsapp.com/legal/</a></li>
                  <li>Plataforma Telegram - serviços de mensagens instantâneas - <a href="https://telegram.org/tos/br">https://telegram.org/tos/br</a></li>
              </ul>
              <p>No entanto, poderá ser que para utilização do Z-PRO o Cliente tenha que compartilhar dados pessoais com outros Controladores de dados, como as nossas parceiras:</p>
              <ul>
                  <li>Plataforma de Pagamento Hotmart - <a href="https://hotmart.com/pt-br/legal/privacidade-de-dados">https://hotmart.com/pt-br/legal/privacidade-de-dados</a></li>
                  <li>Plataforma de Pagamento Greenn - <a href="https://greenn.com.br/politica-de-privacidade-greenn/">https://greenn.com.br/politica-de-privacidade-greenn/</a></li>
              </ul>
              <p>Nesse caso, você precisa entender que essas plataformas poderão solicitar dados pessoais que não são armazenados no Z-PRO para cumprir suas próprias obrigações relacionadas ao Tratamento de Dados. Antes de aceitar qualquer tipo de termo ou política de privacidade, informe-se bem.</p>
              <p>Todas as nossas contratações prezam pelo tratamento seguro das informações do Cliente/Usuário.</p>
              <p>A partir do momento que esses terceiros tiverem acesso aos dados compartilhados, serão responsáveis pelo seu tratamento em segurança, estando limitados às finalidades relacionadas ao serviço contratado e devendo respeitar a Lei aplicável.</p>
              
              <p>Transferência Internacional de Dados</p>
              <p>Até o limite permitido pela LGPD, poderá haver o compartilhamento de dados fora do Brasil.</p>
              <p>Essa transferência internacional ocorre quando utilizamos serviços em nuvem para processamento ou armazenamento de dados, para que seja possível executar os nossos serviços da melhor forma em um ambiente seguro.</p>
              <p>Para isso, utiliza-se os servidores cloud da Hetzner, que implica em uma transferência internacional dos dados pessoais para o país sede deste servidor, nos Estados Unidos da América. Outros servidores da Z-PRO ficam em São Paulo/SP, no Brasil.</p>
              <p>Ao fazer isso, tomamos todas as medidas cabíveis para assegurar que os seus dados sejam tratados e compartilhados de forma segura e em conformidade com a legislação vigente e este Aviso de Privacidade.</p>
              
              <p>LINK PARA SITES/PLATAFORMAS DE TERCEIROS</p>
              <p>Nosso Site pode conter links para sites/plataformas de terceiros, como parceiros, anunciantes e redes sociais. Ao seguir um link, é importante observar que esses sites/plataformas têm seus próprios avisos e políticas de privacidade e que a nossa empresa não é responsável por esses avisos e nem pela coleta de dados realizada. Recomendamos a verificação desses avisos e políticas antes de enviar quaisquer dados pessoais a esses terceiros.</p>
              
              <p>COMO PROTEGEMOS SEUS DADOS</p>
              <p>O Z-PRO se compromete com a segurança de todos seus Usuários e por isso adota procedimentos físicos, eletrônicos e administrativos que garantem a privacidade e segurança dos seus dados, com medidas técnicas compatíveis com os padrões esperados e boas práticas de segurança da informação.</p>
              <p>Sempre que possível, não coletamos dados sobre a sua utilização do Z-PRO.</p>
              <p>Em hipótese alguma teremos acesso às suas conversas.</p>
              <p>Todas as tecnologias utilizadas e empregadas no Z-PRO respeitarão sempre a legislação vigente e os termos deste Aviso de Privacidade.</p>
              
              <p>SAIBA OS SEUS DIREITOS E COMO EXERCÊ-LOS</p>
              <p><strong>Acesso e confirmação de tratamento:</strong> Você pode solicitar o acesso à relação completa de dados coletados e tratados, bem como a confirmação do tratamento de seus dados pessoais.</p>
              <p><strong>Retirada de consentimento:</strong> Você poderá retirar a sua anuência com o Tratamento de Dados Pessoais a qualquer momento, quando esta for a base legal adequada para realização do tratamento dos seus dados pessoais.</p>
              <p><strong>Correção de dados pessoais:</strong> Você pode solicitar a correção de dados que estão incompletos, inexatos ou desatualizados.</p>
              <p><strong>Anonimização, bloqueio ou eliminação:</strong> Todos os dados coletados e tratados por nós têm como finalidade a prestação de serviços e o bom desempenho do Software as a Service. Caso você acredite que algum dado seu está sendo tratado de forma desnecessária, em excesso ou o tratamento não esteja em conformidade com a LGPD, você poderá solicitar a anonimização, bloqueio ou eliminação, caso prove que houve excesso, desnecessidade ou desconformidade com a LGPD.</p>
              <p><strong>Informação acerca do compartilhamento:</strong> Você pode solicitar informações sobre nossos parceiros e fornecedores com os quais compartilhamos os dados. Todos os nossos parceiros também estão preocupados com a segurança dos Usuários e garantem a adoção de medidas adequadas para a proteção de seus dados.</p>
              <p><strong>Decisões automatizadas:</strong> Você pode solicitar a revisão de decisões tomadas unicamente com base no tratamento automatizado de dados e os critérios utilizados nessas decisões, observados sempre os segredos comerciais e industriais da nossa empresa.</p>
              <p><strong>Portabilidade de dados:</strong> Você poderá solicitar a portabilidade dos seus dados pessoais a outro fornecedor de serviços, em atendimento ao disposto na LGPD.</p>
              <p><strong>Oposição ou objeção a Tratamento de Dados Pessoais:</strong> Se você quiser, pode objetar o tratamento de alguns Dados Pessoais que realizamos ou apresentar oposição ao tratamento por completo. Nesse caso, poderemos parar o tratamento ou explicar que temos uma base legal adequada para realizar os tratamentos questionados.</p>
              <p><strong>Registro de reclamação:</strong> Você poderá procurar a ANPD a qualquer momento, caso sinta que seus direitos foram violados.</p>
              <p>Para exercer qualquer um dos seus direitos como Titular, entre em contato através do Canal de Atendimento | <a href="https://comunidadezdg.com.br/fale-com-a-zdg">https://comunidadezdg.com.br/fale-com-a-zdg</a> ou <a href="mailto:comunidadezdg@gmail.com">comunidadezdg@gmail.com</a>.</p>
              
              <p>POR QUANTO TEMPO ARMAZENAMOS SEUS DADOS?</p>
              <p>Os dados fornecidos pelo Cliente/Usuário serão armazenados e processados enquanto seu cadastro estiver ativo.</p>
              <p>Caso o Usuário desejar, pode solicitar a exclusão da sua conta e dos seus dados pessoais através do Canal de Atendimento | <a href="https://comunidadezdg.com.br/fale-com-a-zdg">https://comunidadezdg.com.br/fale-com-a-zdg</a> ou <a href="mailto:comunidadezdg@gmail.com">comunidadezdg@gmail.com</a>.</p>
              <p>Diante da solicitação de exclusão ou término da finalidade de tratamento, o Usuário terá todos os seus dados deletados permanentemente, exceto os dados cuja manutenção seja obrigatória por lei ou regulamentação, ou em relação aos dados necessários para o exercício regular de direitos em processo judicial, administrativo ou arbitral.</p>
              
              <p>DISPOSIÇÕES GERAIS</p>
              <p>A qualquer momento, unilateralmente, poderemos modificar/atualizar este Aviso. Caso isso aconteça, o Titular será notificado e a versão atualizada valerá a partir de sua publicação.</p>
              <p>A continuidade de acesso ou utilização do Cliente/Usuário após divulgação da atualização confirmará a ciência e vigência do novo Aviso.</p>
              <p>Além deste Aviso de Privacidade, nós dispomos de Termos e Condições de Uso, os quais definem as condições de uso que irão disciplinar a utilização do Z-PRO. Os Termos abrangem inseparavelmente as disposições deste Aviso de Privacidade.</p>
              
              <p>CANAL DE COMUNICAÇÃO</p>
              <p>Nós disponibilizamos um canal de comunicação para oferecer suporte ao titular de dados pessoais e quaisquer questões relacionadas a esse Aviso no Canal de Atendimento | <a href="https://comunidadezdg.com.br/fale-com-a-zdg">https://comunidadezdg.com.br/fale-com-a-zdg</a> ou <a href="mailto:comunidadezdg@gmail.com">comunidadezdg@gmail.com</a>.</p>

              <p>O Z-PRO pode compartilhar os dados necessários para que seja possível a manutenção das suas operações de forma eficiente. Ou seja, dados poderão ser compartilhados com empresas contratadas para que as funcionalidades do Z-PRO estejam disponíveis e/ou para que forneçam uma melhor experiência para o Cliente e os Usuários.</p>
              <p>Terão acesso aos dados pessoais coletados para operação do Z-PRO, como Operadores de dados, os agentes terceirizados especializados para prestação de serviços pontuais e específicos para o nosso Software as a Service, tais como:</p>
              <ul>
                  <li>Plataforma Cloud Hetzner - servidores em nuvem - <a href="https://www.hetzner.com/legal/privacy-policy/">https://www.hetzner.com/legal/privacy-policy/</a></li>
                  <li>Plataforma WhatsApp - serviços de mensagens instantâneas - <a href="https://www.whatsapp.com/legal/">https://www.whatsapp.com/legal/</a></li>
                  <li>Plataforma Telegram - serviços de mensagens instantâneas - <a href="https://telegram.org/tos/br">https://telegram.org/tos/br</a></li>
              </ul>
              <p>No entanto, poderá ser que para utilização do Z-PRO o Cliente tenha que compartilhar dados pessoais com outros Controladores de dados, como as nossas parceiras:</p>
              <ul>
                  <li>Plataforma de Pagamento Hotmart - <a href="https://hotmart.com/pt-br/legal/privacidade-de-dados">https://hotmart.com/pt-br/legal/privacidade-de-dados</a></li>
                  <li>Plataforma de Pagamento Greenn - <a href="https://greenn.com.br/politica-de-privacidade-greenn/">https://greenn.com.br/politica-de-privacidade-greenn/</a></li>
              </ul>
              <p>Nesse caso, você precisa entender que essas plataformas poderão solicitar dados pessoais que não são armazenados no Z-PRO para cumprir suas próprias obrigações relacionadas ao Tratamento de Dados. Antes de aceitar qualquer tipo de termo ou política de privacidade, informe-se bem.</p>
              <p>Todas as nossas contratações prezam pelo tratamento seguro das informações do Cliente/Usuário.</p>
              <p>A partir do momento que esses terceiros tiverem acesso aos dados compartilhados, serão responsáveis pelo seu tratamento em segurança, estando limitados às finalidades relacionadas ao serviço contratado e devendo respeitar a Lei aplicável.</p>
              
              <p>Transferência Internacional de Dados</p>
              <p>Até o limite permitido pela LGPD, poderá haver o compartilhamento de dados fora do Brasil.</p>
              <p>Essa transferência internacional ocorre quando utilizamos serviços em nuvem para processamento ou armazenamento de dados, para que seja possível executar os nossos serviços da melhor forma em um ambiente seguro.</p>
              <p>Para isso, utiliza-se os servidores cloud da Hetzner, que implica em uma transferência internacional dos dados pessoais para o país sede deste servidor, nos Estados Unidos da América. Outros servidores da Z-PRO ficam em São Paulo/SP, no Brasil.</p>
              <p>Ao fazer isso, tomamos todas as medidas cabíveis para assegurar que os seus dados sejam tratados e compartilhados de forma segura e em conformidade com a legislação vigente e este Aviso de Privacidade.</p>
              
              <p>LINK PARA SITES/PLATAFORMAS DE TERCEIROS</p>
              <p>Nosso Site pode conter links para sites/plataformas de terceiros, como parceiros, anunciantes e redes sociais. Ao seguir um link, é importante observar que esses sites/plataformas têm seus próprios avisos e políticas de privacidade e que a nossa empresa não é responsável por esses avisos e nem pela coleta de dados realizada. Recomendamos a verificação desses avisos e políticas antes de enviar quaisquer dados pessoais a esses terceiros.</p>
              
              <p>COMO PROTEGEMOS SEUS DADOS</p>
              <p>O Z-PRO se compromete com a segurança de todos seus Usuários e por isso adota procedimentos físicos, eletrônicos e administrativos que garantem a privacidade e segurança dos seus dados, com medidas técnicas compatíveis com os padrões esperados e boas práticas de segurança da informação.</p>
              <p>Sempre que possível, não coletamos dados sobre a sua utilização do Z-PRO.</p>
              <p>Em hipótese alguma teremos acesso às suas conversas.</p>
              <p>Todas as tecnologias utilizadas e empregadas no Z-PRO respeitarão sempre a legislação vigente e os termos deste Aviso de Privacidade.</p>
              
              <p>SAIBA OS SEUS DIREITOS E COMO EXERCÊ-LOS</p>
              <p><strong>Acesso e confirmação de tratamento:</strong> Você pode solicitar o acesso à relação completa de dados coletados e tratados, bem como a confirmação do tratamento de seus dados pessoais.</p>
              <p><strong>Retirada de consentimento:</strong> Você poderá retirar a sua anuência com o Tratamento de Dados Pessoais a qualquer momento, quando esta for a base legal adequada para realização do tratamento dos seus dados pessoais.</p>
              <p><strong>Correção de dados pessoais:</strong> Você pode solicitar a correção de dados que estão incompletos, inexatos ou desatualizados.</p>
              <p><strong>Anonimização, bloqueio ou eliminação:</strong> Todos os dados coletados e tratados por nós têm como finalidade a prestação de serviços e o bom desempenho do Software as a Service. Caso você acredite que algum dado seu está sendo tratado de forma desnecessária, em excesso ou o tratamento não esteja em conformidade com a LGPD, você poderá solicitar a anonimização, bloqueio ou eliminação, caso prove que houve excesso, desnecessidade ou desconformidade com a LGPD.</p>
              <p><strong>Informação acerca do compartilhamento:</strong> Você pode solicitar informações sobre nossos parceiros e fornecedores com os quais compartilhamos os dados. Todos os nossos parceiros também estão preocupados com a segurança dos Usuários e garantem a adoção de medidas adequadas para a proteção de seus dados.</p>
              <p><strong>Decisões automatizadas:</strong> Você pode solicitar a revisão de decisões tomadas unicamente com base no tratamento automatizado de dados e os critérios utilizados nessas decisões, observados sempre os segredos comerciais e industriais da nossa empresa.</p>
              <p><strong>Portabilidade de dados:</strong> Você poderá solicitar a portabilidade dos seus dados pessoais a outro fornecedor de serviços, em atendimento ao disposto na LGPD.</p>
              <p><strong>Oposição ou objeção a Tratamento de Dados Pessoais:</strong> Se você quiser, pode objetar o tratamento de alguns Dados Pessoais que realizamos ou apresentar oposição ao tratamento por completo. Nesse caso, poderemos parar o tratamento ou explicar que temos uma base legal adequada para realizar os tratamentos questionados.</p>
              <p><strong>Registro de reclamação:</strong> Você poderá procurar a ANPD a qualquer momento, caso sinta que seus direitos foram violados.</p>
              <p>Para exercer qualquer um dos seus direitos como Titular, entre em contato através do Canal de Atendimento | <a href="https://comunidadezdg.com.br/fale-com-a-zdg">https://comunidadezdg.com.br/fale-com-a-zdg</a> ou <a href="mailto:comunidadezdg@gmail.com">comunidadezdg@gmail.com</a>.</p>
              
              <p>POR QUANTO TEMPO ARMAZENAMOS SEUS DADOS?</p>
              <p>Os dados fornecidos pelo Cliente/Usuário serão armazenados e processados enquanto seu cadastro estiver ativo.</p>
              <p>Caso o Usuário desejar, pode solicitar a exclusão da sua conta e dos seus dados pessoais através do Canal de Atendimento | <a href="https://comunidadezdg.com.br/fale-com-a-zdg">https://comunidadezdg.com.br/fale-com-a-zdg</a> ou <a href="mailto:comunidadezdg@gmail.com">comunidadezdg@gmail.com</a>.</p>
              <p>Diante da solicitação de exclusão ou término da finalidade de tratamento, o Usuário terá todos os seus dados deletados permanentemente, exceto os dados cuja manutenção seja obrigatória por lei ou regulamentação, ou em relação aos dados necessários para o exercício regular de direitos em processo judicial, administrativo ou arbitral.</p>
              
              <p>DISPOSIÇÕES GERAIS</p>
              <p>A qualquer momento, unilateralmente, poderemos modificar/atualizar este Aviso. Caso isso aconteça, o Titular será notificado e a versão atualizada valerá a partir de sua publicação.</p>
              <p>A continuidade de acesso ou utilização do Cliente/Usuário após divulgação da atualização confirmará a ciência e vigência do novo Aviso.</p>
              <p>Além deste Aviso de Privacidade, nós dispomos de Termos e Condições de Uso, os quais definem as condições de uso que irão disciplinar a utilização do Z-PRO. Os Termos abrangem inseparavelmente as disposições deste Aviso de Privacidade.</p>
              
              <p>CANAL DE COMUNICAÇÃO</p>
              <p>Nós disponibilizamos um canal de comunicação para oferecer suporte ao titular de dados pessoais e quaisquer questões relacionadas a esse Aviso no Canal de Atendimento | <a href="https://comunidadezdg.com.br/fale-com-a-zdg">https://comunidadezdg.com.br/fale-com-a-zdg</a> ou <a href="mailto:comunidadezdg@gmail.com">comunidadezdg@gmail.com</a>.</p>

            </div>
          </q-tab-panel>
        </q-tab-panels>

        <q-card-actions align="center">
          <q-btn label="Eu li e concordo com os termos de uso e política de privacidade" @click="aceitar" color="primary" />
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
    data() {
      return {
        activeTab: 'termos'
      };
    },
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

.active-tab {
  background-color: var(--q-primary) !important;
  color: white !important;
}

.inactive-tab {
  background-color: #f0f0f0 !important;
  color: #333 !important;
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
