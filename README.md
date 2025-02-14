# 💳 Aplicação de Pagamento 

![License](https://img.shields.io/badge/license-MIT-blue) 
![Test Coverage](https://img.shields.io/badge/coverage-80%25-green)
![Status](https://img.shields.io/badge/status-active-success)

Solução completa para processar pagamentos via **Pix**, **Cartão de Crédito** e **Boleto**, com registro de transações e sistema de logs para auditoria.

![Interface de Pagamento](public/img/pagamentos.png)
![Versão Mobile](public/img/responsivo.png)

## 🚀 Começando
  

  <hr>

  <!-- Seção 1: Visão Geral -->
  <section id="overview">
    <h2>1. Visão Geral</h2>
    <pre><code>
A aplicação foi desenvolvida para oferecer uma solução completa para o processamento de pagamentos.
Principais características:
  • Processamento de diversos métodos de pagamento
  • Registro detalhado de transações e logs para auditoria
  • Interface responsiva e intuitiva


  </section>

  <hr>

  <!-- Seção 2: Pré-requisitos -->
  <section id="requirements">
    <h2>2. Pré-requisitos</h2>
    <pre><code>
Antes de começar, certifique-se de ter instalado:
  • Node.js (v14 ou superior)
  • npm (v6 ou superior)
  • MySQL (ou outro banco de dados compatível)
    </code></pre>
  </section>

  <hr>

  <!-- Seção 3: Instalação e Configuração -->
  <section id="installation">
    <h2>3. Instalação e Configuração</h2>
    <pre><code>
3.1 Clonando o Repositório:
  $ git clone https://github.com/diegoccx/projeto_pagamento.git
  $ cd projeto_pagamento

3.2 Instalando Dependências:
  $ npm install

3.3 Configurando o Banco de Dados:
  • Crie um banco de dados MySQL.
  • Execute os scripts SQL abaixo para criar as tabelas essenciais.

Tabela de Pagamentos:
  CREATE TABLE pagamentos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    valor DECIMAL(10, 2) NOT NULL,
    metodo_pagamento ENUM('pix', 'cartao_credito', 'boleto') NOT NULL,
    status ENUM('pendente', 'concluido', 'falhou') NOT NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_conclusao TIMESTAMP,
    descricao VARCHAR(255)
  );

Tabela de Logs:
  CREATE TABLE logs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    tipo_log ENUM('info', 'erro', 'alerta') NOT NULL,
    mensagem TEXT NOT NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

Visualize a estrutura do banco: public/img/db.png (400px de largura)
    </code></pre>
  </section>

  <hr>

  <!-- Seção 4: Execução da Aplicação -->
  <section id="execution">
    <h2>4. Execução da Aplicação</h2>
    <pre><code>
Para iniciar a aplicação:
  1. Inicie o servidor:
       $ npm start
  2. Acesse a aplicação via navegador em:
       http://localhost:3000
    </code></pre>
  </section>

  <hr>

  <!-- Seção 5: Funcionalidades e Fluxos de Pagamento -->
  <section id="functionalities">
    <h2>5. Funcionalidades e Fluxos de Pagamento</h2>
    <pre><code>
Pix:
  - Gera código Pix/QR Code
  - Registra o pagamento com status "pendente"
  - Atualiza o status para "concluído" após confirmação

Cartão de Crédito:
  - Valida os dados do cartão
  - Processa a cobrança
  - Atualiza o status conforme o resultado da transação
    (Consulte public/img/ERRO_CARTAO.png para exemplo de erro)

Boleto:
  - Gera código de barras
  - Registra o pagamento com status "pendente"
  - Confirma o pagamento após compensação
    </code></pre>
  </section>

  <hr>

  <!-- Seção 6: Exemplo de Uso da API -->
  <section id="api-usage">
    <h2>6. Exemplo de Uso da API</h2>
    <pre><code>
Requisição (HTTP POST):
  URL: /api/pagamentos
  Headers: Content-Type: application/json
  Body:
  {
    "valor": 150.00,
    "metodo_pagamento": "pix",
    "descricao": "Pagamento por produto A"
  }

Resposta:
  {
    "id": 12345,
    "status": "pendente",
    "metodo_pagamento": "pix",
    "valor": 150.00,
    "data_criacao": "2025-02-13T14:00:00Z"
  }
    </code></pre>
  </section>

  <hr>

  <!-- Seção 7: Testes e Cobertura -->
  <section id="testing">
    <h2>7. Testes e Cobertura de Código</h2>
    <pre><code>
Para testar a aplicação, execute:
  $ npm test

Para verificar a cobertura de código (meta de 80% ou mais):
  $ npm run coverage

Visualize a cobertura: public/img/cobertura.png (400px de largura)
    </code></pre>
  </section>

  <hr>

  <!-- Seção 8: Dados Armazenados -->
  <section id="data-storage">
    <h2>8. Dados Armazenados</h2>
    <pre><code>
Exemplo de registros armazenados:

Tabela de Pagamentos:
  [Imagem: Registros de Pagamentos] (public/img/tabela_pagamentos.png)

Tabela de Logs:
  [Imagem: Registros de Logs] (public/img/tabela_logs.png)
    </code></pre>
  </section>

  <hr>

  <!-- Seção 9: Licença -->
  <section id="license">
    <h2>9. Licença</h2>
    <pre><code>
Este projeto está licenciado sob a MIT License.
Desenvolvido com ❤️ por Diego

Links:
  - Reportar Bug
  - Solicitar Feature
    </code></pre>
  </section>

  <hr>

  <!-- Seção 10: Considerações Finais -->
 <section id="improvements">
    <h2>10. Considerações</h2>
    <ol>
      <li>
        <strong>Organização Visual:</strong>
        <ul>
          <li>Seções bem definidas com ícones e badges</li>
          <li>Hierarquia clara de títulos para facilitar a navegação</li>
        </ul>
      </li>
      <li>
        <strong>Fluxo Lógico e Técnica:</strong>
        <ul>
          <li>Passo-a-passo detalhado desde a instalação até a execução</li>
          <li>Instruções específicas para configuração do ambiente e banco de dados</li>
        </ul>
      </li>
      <li>
        <strong>Formatação de Código:</strong>
        <ul>
          <li>Blocos de código com syntax highlighting</li>
          <li>Exemplos práticos e claros do uso da API</li>
        </ul>
      </li>
      <li>
        <strong>Documentação Técnica:</strong>
        <ul>
          <li>Detalhamento completo das funcionalidades e fluxos de pagamento</li>
          <li>Explicações didáticas para cada etapa do processo</li>
        </ul>
      </li>
      <li>
        <strong>Elementos Visuais:</strong>
        <ul>
          <li>Imagens, badges e links interativos para melhorar a experiência do usuário</li>
          <li>Design responsivo e acessível</li>
        </ul>
      </li>
      <li>
        <strong>Facilidade de Uso:</strong>
        <ul>
          <li>Comandos e instruções copiáveis para facilitar a execução</li>
          <li>Seção de troubleshooting com exemplos de erros comuns</li>
        </ul>
      </li>
    </ol>
  </section>

  <hr>

  <!-- Seção 11: Explicações Técnicas Adicionais -->
  <section id="technical-explanations">
    <h2>11. Explicações Técnicas Adicionais</h2>
    

  

11.2 Integração com o Sandbox Asaas:
  - Para testar a integração com a API do Asaas, crie uma conta no Asaas Sandbox:
      • Acesse: https://sandbox.asaas.com/ e registre-se.
      • Após o cadastro, vá até "Configuração de Conta -> Integrações" para obter sua API Key de Sandbox.
  - A API Key é necessária para iniciar a integração e simular transações.
  - Consulte a documentação oficial do Asaas em:
      https://asaasv3.docs.apiary.io/#
    para mais detalhes sobre os endpoints e parâmetros.
   
  </section>

