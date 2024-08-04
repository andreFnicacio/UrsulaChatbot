### Chatbot WhatsApp com Integração ao Microserviço Úrsula

Este repositório contém um chatbot construído utilizando a API oficial do WhatsApp pela Meta. O chatbot é implementado em JavaScript com Node.js e está integrado ao microserviço de NER chamado Úrsula. Ele é capaz de responder perguntas frequentes (FAQ), verificar a existência de clientes no banco de dados e interagir com o microserviço caso o cliente não esteja registrado.

## Requisitos

- Node.js (última versão)
- Redis
- Conta credenciada na API oficial do WhatsApp pela Meta

## Tecnologias Utilizadas

- **Node.js**: Plataforma de execução JavaScript
- **Express**: Framework web para Node.js
- **Axios**: Cliente HTTP para fazer requisições
- **Redis**: Banco de dados em memória para controle de cache
- **UUID**: Biblioteca para geração de identificadores únicos
- **Prisma**: ORM para conexão com banco de dados
- **Meta API**: API oficial do WhatsApp pela Meta

## Instalação

### 1. Configurar o Ambiente

1. **Clone o repositório:**

    ```bash
    git clone https://github.com/seu-usuario/seu-repositorio.git
    cd seu-repositorio
    ```

2. **Instale as dependências:**

    ```bash
    npm install
    ```

3. **Configurar o Redis:**
    - Certifique-se de ter o Redis instalado e em execução na sua máquina ou servidor.

4. **Configurar o arquivo `.env`:**
    - Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis de ambiente:

    ```env
    META_API_KEY=your_meta_api_key
    REDIS_HOST=localhost
    REDIS_PORT=6379
    PRISMA_DATABASE_URL=your_database_url
    ```

### 2. Estrutura do Projeto

A estrutura do projeto segue a arquitetura de microserviços com integração direta à MetaCloud via webhook.

### 3. Executar o Chatbot

1. **Inicie o servidor:**

    ```bash
    npm start
    ```

2. **Webhook e Integração:**
    - O webhook deve estar configurado na MetaCloud para enviar notificações ao seu servidor Node.js. Certifique-se de que a URL do webhook está correta e acessível.

### 4. Dependências

Aqui está um exemplo do arquivo `package.json` com as dependências necessárias:

```json
{
  "name": "chatbot-whatsapp",
  "version": "1.0.0",
  "description": "Chatbot integrado com a API do WhatsApp pela Meta",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  },
  "dependencies": {
    "axios": "^0.21.1",
    "express": "^4.17.1",
    "redis": "^3.1.2",
    "uuid": "^8.3.2",
    "prisma": "^2.26.0",
    "dotenv": "^8.2.0"
  },
  "devDependencies": {
    "nodemon": "^2.0.7"
  },
  "author": "Seu Nome",
  "license": "ISC"
}
```

## Funcionalidades

### 1. Integração com Meta API

- O chatbot está integrado com a API oficial do WhatsApp pela Meta, recebendo mensagens via webhook e enviando respostas de volta ao cliente.

### 2. Integração com Microserviço Úrsula

- O chatbot consulta o microserviço Úrsula para respostas baseadas em NER caso o cliente não esteja registrado no banco de dados.

### 3. Verificação de Cliente

- Verifica se o cliente já está registrado no banco de dados. Se não estiver, consulta o microserviço Úrsula.

### 4. Controle de Cache

- Utiliza Redis para cachear respostas e melhorar a performance.

### 5. Geração de IDs Únicos

- Utiliza UUID para gerar identificadores únicos para as conversas e transações.

### 6. Conexão com Banco de Dados

- Utiliza Prisma como ORM para interagir com o banco de dados.

## Como Contribuir

1. **Fork este repositório**
2. **Crie sua feature branch (`git checkout -b feature/AmazingFeature`)**
3. **Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)**
4. **Push para a branch (`git push origin feature/AmazingFeature`)**
5. **Abra um Pull Request**

Se tiver alguma dúvida ou problema, sinta-se à vontade para abrir uma issue no repositório.

## Licença

Distribuído sob a licença MIT. Veja `LICENSE` para mais informações.
