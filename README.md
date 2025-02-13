# Aplicação de Pagamento

## Descrição da Aplicação

Esta aplicação permite realizar pagamentos utilizando os métodos Pix, cartão de crédito e boleto. Ela gera registros de pagamento e logs de todas as transações realizadas, com o objetivo de facilitar a gestão e auditoria dos pagamentos.

## Instalação e Execução

### Clonando o Repositório

Para começar, clone o repositório para a sua máquina local.

```bash
git clone https://github.com/diegoccx/projeto_pagamento.git
```

Instalação das Dependências
Navegue até o diretório do projeto clonado e instale as dependências necessárias utilizando o npm:
```
bash
Copiar
Editar
cd projeto_pagamento
npm install
```
Isso irá instalar todas as dependências do Node.js listadas no arquivo package.json.

Iniciando o Servidor
Após a instalação das dependências, você pode iniciar o servidor local para rodar a aplicação:

```
bash
Copiar
Editar
npm start
```
A aplicação estará disponível em http://localhost:3000.

Tabelas de Banco de Dados
Tabela de Pagamentos
Esta tabela armazena todas as transações de pagamento realizadas. A tabela é crucial para registrar os detalhes de cada pagamento, como o valor, método de pagamento e status.
```
sql
Copiar
Editar
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
Campos:

id: Identificador único do pagamento.
valor: O valor do pagamento.
metodo_pagamento: O método utilizado (Pix, Cartão de Crédito ou Boleto).
status: O status do pagamento (pendente, concluído ou falhou).
data_criacao: Data e hora em que o pagamento foi criado.
data_conclusao: Data e hora em que o pagamento foi concluído (se aplicável).
descricao: Descrição opcional para o pagamento.
Tabela de Log de Transações
A tabela de logs é essencial para registrar todos os eventos e ações realizadas na aplicação. Isso facilita a auditoria e o rastreamento de erros.

```
sql
Copiar
Editar
CREATE TABLE logs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    tipo_log ENUM('info', 'erro', 'alerta') NOT NULL,
    mensagem TEXT NOT NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```
Campos:

id: Identificador único do log.
tipo_log: Tipo do log (informação, erro, alerta).
mensagem: A mensagem registrada no log, descrevendo o evento.
data_criacao: Data e hora em que o log foi criado.
Fluxo de Pagamento
Pix
O usuário escolhe Pix como método de pagamento.
A aplicação gera um código de pagamento Pix (chave ou QR Code).
O pagamento é registrado na tabela de pagamentos com o status pendente.
Após a confirmação do pagamento, o status é atualizado para concluído.
Cartão de Crédito
O usuário fornece os dados do cartão de crédito.
A aplicação valida os dados e realiza a cobrança.
O pagamento é registrado na tabela de pagamentos com o status pendente.
Após a confirmação da transação, o status é atualizado para concluído.
Boleto
O usuário escolhe boleto como método de pagamento.
A aplicação gera um código de barras ou link para o boleto.
O pagamento é registrado na tabela de pagamentos com o status pendente.
Após o pagamento ser identificado, o status é atualizado para concluído.
Exemplo de Uso da API de Pagamento
Aqui está um exemplo de como você pode fazer um pagamento via API:

```
bash
Copiar
Editar
POST /api/pagamentos
{
    "valor": 150.00,
    "metodo_pagamento": "pix",
    "descricao": "Pagamento por produto A"
}

Resposta:
json
Copiar
Editar
{
    "id": 12345,
    "status": "pendente",
    "metodo_pagamento": "pix",
    "valor": 150.00,
    "data_criacao": "2025-02-13T14:00:00Z"
}
```
Conclusão
Esse roteiro oferece uma visão completa de como instalar, configurar e usar a aplicação de pagamento, além de incluir a estrutura das tabelas de banco de dados necessárias. O sistema está pronto para processar pagamentos via Pix, cartão de crédito e boleto, com rastreamento detalhado de transações e logs.

Adicione essas instruções no arquivo README.md do seu projeto para que os outros desenvolvedores ou usuários possam seguir facilmente a instalação e o uso da aplicação.