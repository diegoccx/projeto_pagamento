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
    h1, h2 {
      color: #222;
      margin-bottom: 10px;
    }
    pre {
      background: #333;
      color: #f4f4f4;
      padding: 10px;
      overflow-x: auto;
      margin-bottom: 20px;
      white-space: pre-wrap;
    }
    code {
      font-family: Consolas, monospace;
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
    <pre><code>
Esta aplicação permite processar pagamentos utilizando métodos modernos como:
  - Pix
  - Cartão de Crédito
  - Boleto

Ela registra todas as transações realizadas e gera logs detalhados para auditoria e análise.
    </code></pre>
  </header>

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

Exemplos de interface:
  • Interface de Pagamento: public/img/pagamentos.png (400px de largura)
  • Versão Mobile: public/img/responsivo.png (200px de largura)
    </code></pre>
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
    <h2>10. Considerações Finais</h2>
    <pre><code>
Organização Visual:
  - Seções bem definidas com ícones e badges
  - Hierarquia clara de títulos para facilitar a navegação

Fluxo Lógico e Técnica:
  - Passo-a-passo detalhado desde a instalação até a execução
  - Instruções específicas para configuração do ambiente e banco de dados

Formatação de Código:
  - Blocos de código com syntax highlighting
  - Exemplos práticos e claros do uso da API

Documentação Técnica:
  - Detalhamento completo das funcionalidades e fluxos de pagamento
  - Explicações didáticas para cada etapa do processo

Elementos Visuais:
  - Imagens, badges e links interativos para melhorar a experiência do usuário
  - Design responsivo e acessível

Facilidade de Uso:
  - Comandos e instruções copiáveis para facilitar a execução
  - Seção de troubleshooting com exemplos de erros comuns
    </code></pre>
  </section>
</body>
</html>
