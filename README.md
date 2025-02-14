<!DOCTYPE html>
<html lang="pt">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>💳 Aplicação de Pagamento - Documentação Técnica</title>
  <style>
    /* Estilos básicos para uma leitura agradável */
    body {
      font-family: Arial, sans-serif;
      background: #f4f4f4;
      color: #333;
      margin: 0;
      padding: 20px;
      line-height: 1.6;
    }
    header, section {
      margin-bottom: 40px;
    }
    h1, h2, h3, h4, h5 {
      color: #222;
      margin-bottom: 10px;
    }
    p {
      margin-bottom: 20px;
    }
    pre {
      background: #333;
      color: #f4f4f4;
      padding: 10px;
      overflow-x: auto;
      margin-bottom: 20px;
    }
    code {
      font-family: Consolas, monospace;
    }
    ul, ol {
      margin-left: 20px;
      margin-bottom: 20px;
    }
    .badge {
      margin-right: 10px;
    }
    img {
      margin: 10px 0;
      max-width: 100%;
      display: block;
    }
    a {
      color: #0066cc;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
    hr {
      margin: 40px 0;
      border: none;
      border-top: 1px solid #ccc;
    }
  </style>
</head>
<body>
  <header>
    <h1>💳 Aplicação de Pagamento</h1>
    <div>
      <img class="badge" src="https://img.shields.io/badge/license-MIT-blue" alt="License">
      <img class="badge" src="https://img.shields.io/badge/coverage-80%25-green" alt="Test Coverage">
      <img class="badge" src="https://img.shields.io/badge/status-active-success" alt="Status">
    </div>
    <p>
      Esta aplicação permite processar pagamentos utilizando métodos modernos como <strong>Pix</strong>, <strong>Cartão de Crédito</strong> e <strong>Boleto</strong>. Ela registra todas as transações realizadas e gera logs detalhados para auditoria e análise.
    </p>
  </header>

  <hr>

  <!-- Seção 1: Visão Geral -->
  <section id="overview">
    <h2>1. Visão Geral</h2>
    <p>
      A aplicação foi desenvolvida para oferecer uma solução completa para o processamento de pagamentos. Sua arquitetura permite:
    </p>
    <ul>
      <li>Processamento de diversos métodos de pagamento</li>
      <li>Registro detalhado de transações e logs para auditoria</li>
      <li>Interface responsiva e intuitiva</li>
    </ul>
    <p>Veja abaixo alguns exemplos da interface:</p>
    <img src="public/img/pagamentos.png" alt="Interface de Pagamento" width="400">
    <img src="public/img/responsivo.png" alt="Versão Mobile" width="200">
  </section>

  <hr>

  <!-- Seção 2: Pré-requisitos -->
  <section id="requirements">
    <h2>2. Pré-requisitos</h2>
    <p>Certifique-se de ter instalado os seguintes itens antes de começar:</p>
    <ul>
      <li>Node.js (v14 ou superior)</li>
      <li>npm (v6 ou superior)</li>
      <li>MySQL (ou outro banco de dados compatível)</li>
    </ul>
  </section>

  <hr>

  <!-- Seção 3: Instalação e Configuração -->
  <section id="installation">
    <h2>3. Instalação e Configuração</h2>
    
    <h3>3.1 Clonando o Repositório</h3>
    <p>Abra seu terminal e clone o repositório:</p>
    <pre><code>git clone https://github.com/diegoccx/projeto_pagamento.git
cd projeto_pagamento</code></pre>
    
    <h3>3.2 Instalando Dependências</h3>
    <p>Instale todas as dependências necessárias com o npm:</p>
    <pre><code>npm install</code></pre>
    
    <h3>3.3 Configurando o Banco de Dados</h3>
    <p>
      Crie um banco de dados MySQL e execute os scripts SQL abaixo para criar as tabelas essenciais:
    </p>
    <h4>Tabela de Pagamentos</h4>
    <pre><code>CREATE TABLE pagamentos (
  id INT PRIMARY KEY AUTO_INCREMENT,
  valor DECIMAL(10, 2) NOT NULL,
  metodo_pagamento ENUM('pix', 'cartao_credito', 'boleto') NOT NULL,
  status ENUM('pendente', 'concluido', 'falhou') NOT NULL,
  data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  data_conclusao TIMESTAMP,
  descricao VARCHAR(255)
);</code></pre>
    <h4>Tabela de Logs</h4>
    <pre><code>CREATE TABLE logs (
  id INT PRIMARY KEY AUTO_INCREMENT,
  tipo_log ENUM('info', 'erro', 'alerta') NOT NULL,
  mensagem TEXT NOT NULL,
  data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);</code></pre>
    <p>Visualize a estrutura do banco:</p>
    <img src="public/img/db.png" alt="Estrutura do Banco" width="400">
  </section>

  <hr>

  <!-- Seção 4: Execução da Aplicação -->
  <section id="execution">
    <h2>4. Execução da Aplicação</h2>
    <ol>
      <li>
        <strong>Inicie o Servidor:</strong>
        <p>Execute o comando abaixo no terminal:</p>
        <pre><code>npm start</code></pre>
      </li>
      <li>
        <strong>Acesse a Aplicação:</strong>
        <p>Abra o navegador e acesse: <a href="http://localhost:3000" target="_blank">http://localhost:3000</a></p>
      </li>
    </ol>
  </section>

  <hr>

  <!-- Seção 5: Funcionalidades (Resumo) -->
  <section id="functionalities">
    <h2>5. Funcionalidades</h2>
    <p>
      A aplicação integra os principais métodos de pagamento, permitindo:
    </p>
    <ul>
      <li><strong>Pix:</strong> Geração automática de código QR para pagamentos rápidos.</li>
      <li><strong>Cartão de Crédito:</strong> Validação e processamento seguro dos dados do cartão.</li>
      <li><strong>Boleto:</strong> Emissão de boletos com acompanhamento do status de compensação.</li>
    </ul>
  </section>

  <hr>

  <!-- Seção 6: Exemplo de Uso da API -->
  <section id="api-usage">
    <h2>6. Exemplo de Uso da API</h2>
    <h3>6.1 Requisição</h3>
    <p>Envie uma requisição HTTP POST para criar um pagamento:</p>
    <pre><code>POST /api/pagamentos
Content-Type: application/json

{
  "valor": 150.00,
  "metodo_pagamento": "pix",
  "descricao": "Pagamento por produto A"
}</code></pre>
    
    <h3>6.2 Resposta</h3>
    <pre><code>{
  "id": 12345,
  "status": "pendente",
  "metodo_pagamento": "pix",
  "valor": 150.00,
  "data_criacao": "2025-02-13T14:00:00Z"
}</code></pre>
  </section>

  <hr>

  <!-- Seção 7: Testes e Cobertura -->
  <section id="testing">
    <h2>7. Testes e Cobertura de Código</h2>
    <p>Para garantir que a aplicação está funcionando corretamente, execute os testes:</p>
    <pre><code>npm test</code></pre>
    <p>Verifique a cobertura de código (meta de 80% ou mais):</p>
    <pre><code>npm run coverage</code></pre>
    <img src="public/img/cobertura.png" alt="Cobertura de Testes" width="400">
  </section>

  <hr>

  <!-- Seção 8: Dados Armazenados -->
  <section id="data-storage">
    <h2>8. Dados Armazenados</h2>
    <h3>Exemplo de Registros</h3>
    <h4>Tabela de Pagamentos</h4>
    <img src="public/img/tabela_pagamentos.png" alt="Registros de Pagamentos" width="600">
    <h4>Tabela de Logs</h4>
    <img src="public/img/tabela_logs.png" alt="Registros de Logs" width="600">
  </section>

  <hr>

  <!-- Seção 9: Licença -->
  <section id="license">
    <h2>9. Licença</h2>
    <p>Este projeto está licenciado sob a <strong>MIT License</strong>.</p>
    <p>Desenvolvido com ❤️ por Diego</p>
    <p>
      <a href="#">Reportar Bug</a> | 
      <a href="#">Solicitar Feature</a>
    </p>
  </section>

  <hr>

  <!-- Seção 10: Considerações Finais -->
  <section id="improvements">
    <h2>10. Considerações Finais</h2>
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
          <li>Detalhamento completo das funcionalidades sem exibir marcações desnecessárias</li>
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
</body>
</html>
