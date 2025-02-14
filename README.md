# 💳 Aplicação de Pagamento 

![License](https://img.shields.io/badge/license-MIT-blue) 
![Test Coverage](https://img.shields.io/badge/coverage-80%25-green)
![Status](https://img.shields.io/badge/status-active-success)

Solução completa para processar pagamentos via **Pix**, **Cartão de Crédito** e **Boleto**, com registro de transações e sistema de logs para auditoria.

![Interface de Pagamento](public/img/pagamentos.png)
![Versão Mobile](public/img/responsivo.png)

## 🚀 Começando
  

 

  <!-- Seção 1: Visão Geral -->
  
    #1. Visão Geral#
    
A aplicação foi desenvolvida para oferecer uma solução completa para o processamento de pagamentos.
Principais características:
  • Processamento de diversos métodos de pagamento
  • Registro detalhado de transações e logs para auditoria
  • Interface responsiva e intuitiva
 

  

  

  

   ## 🚀 Começando

### Pré-requisitos
- Node.js v14+
- npm v6+
- MySQL ou compatível

## ⚙️ Instalação

1. Clone o repositório:
```
git clone https://github.com/diegoccx/projeto_pagamento.git

cd projeto_pagamento
```
# 3.2 Instalando Dependências:
  <code><pre> $ npm install
   </code></pre>
   
 
#   3.2.1 Configuração do Arquivo .env

![Cobertura](public/img/env.png)
    
	
- Para testar a integração com a API do Asaas, crie uma conta no Asaas Sandbox:
      • Acesse: https://sandbox.asaas.com/ e registre-se.
      • Após o cadastro, vá até "Configuração de Conta -> Integrações" para obter sua API Key de Sandbox.

Para verificar a cobertura de código (meta de 80% ou mais):
  $ npm run coverage

![Cobertura](public/img/cobertura.png)
   
  

3.3 Configurando o Banco de Dados:
  • Crie um banco de dados MySQL.
  • Execute os scripts SQL abaixo para criar as tabelas essenciais.

![Banco de Dados](public/img/db.png)


Tabela de Pagamentos:
```
  CREATE TABLE pagamentos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    valor DECIMAL(10, 2) NOT NULL,
    metodo_pagamento ENUM('pix', 'cartao_credito', 'boleto') NOT NULL,
    status ENUM('pendente', 'concluido', 'falhou') NOT NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_conclusao TIMESTAMP,
    descricao VARCHAR(255)
  );
  ```
  ![Tabela pagamentos](public/img/tabela_pagamentos.png)

Tabela de Logs:
```
  CREATE TABLE logs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    tipo_log ENUM('info', 'erro', 'alerta') NOT NULL,
    mensagem TEXT NOT NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
  


    ```
	  ![Tabela Logs](public/img/tabela_logs.png)
  

 

  <!-- Seção 4: Execução da Aplicação -->
 
   # 4. Execução da Aplicação
    ```
Para iniciar a aplicação:
  1. Inicie o servidor:
       $ npm start
  2. Acesse a aplicação via navegador em:
       http://localhost:3000
    ```
  

 

  <!-- Seção 5: Funcionalidades e Fluxos de Pagamento -->
 
    # 5. Funcionalidades e Fluxos de Pagamento
  ```
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
    ```
  

 

  <!-- Seção 6: Exemplo de Uso da API -->
  
   # 6. Exemplo de Uso da API
   ```
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
    ```
  

 

  <!-- Seção 7: Testes e Cobertura -->
  
    # 7. Testes e Cobertura de Código
	  ![Cobertura](public/img/cobertura.png)
    ```
Para testar a aplicação, execute:
  $ npm test

Para verificar a cobertura de código (meta de 80% ou mais):
  $ npm run coverage

Visualize a cobertura: public/img/cobertura.png (400px de largura)
    ```
  

  

  <!-- Seção 8: Dados Armazenados -->
 
   #8. Dados Armazenados
   ```
Exemplo de registros armazenados:

Tabela de Pagamentos:
  [Imagem: Registros de Pagamentos] (public/img/tabela_pagamentos.png)

Tabela de Logs:
  [Imagem: Registros de Logs] (public/img/tabela_logs.png)
    ```

 

  
  

  <!-- Seção 10: Considerações Finais -->
 
 #  10. Considerações
•Organização Visual:
•Seções bem definidas com ícones e badges
•Hierarquia clara de títulos para facilitar a navegação
•Fluxo Lógico e Técnica:
•Passo-a-passo detalhado desde a instalação até a execução
•Instruções específicas para configuração do ambiente e banco de dados
•Formatação de Código:
•Blocos de código com syntax highlighting
•Exemplos práticos e claros do uso da API
•Documentação Técnica:
•Detalhamento completo das funcionalidades e fluxos de pagamento
•Explicações didáticas para cada etapa do processo
•Elementos Visuais:
•Imagens, badges e links interativos para melhorar a experiência do usuário
•Design responsivo e acessível
•Facilidade de Uso:
•Comandos e instruções copiáveis para facilitar a execução
•Seção de troubleshooting com exemplos de erros comuns

 
  <!-- Seção 11: Explicações Técnicas Adicionais -->
 
    #11. Explicações Técnicas Adicionais#
    

  

-11.2 Integração com o Sandbox Asaas:
  - Para testar a integração com a API do Asaas, crie uma conta no Asaas Sandbox:
      • Acesse: https://sandbox.asaas.com/ e registre-se.
      • Após o cadastro, vá até "Configuração de Conta -> Integrações" para obter sua API Key de Sandbox.
  - A API Key é necessária para iniciar a integração e simular transações.
  - Consulte a documentação oficial do Asaas em:
      https://asaasv3.docs.apiary.io/#
    para mais detalhes sobre os endpoints e parâmetros.
   
  

