# API de Tarefas - To-Do List

Uma API RESTful desenvolvida em Node.js para gerenciamento de tarefas, seguindo o padrão MVC (Model-View-Controller) e implementando todas as operações CRUD (Create, Read, Update, Delete).

## 🚀 Tecnologias

- **Node.js** - Ambiente de execução JavaScript
- **Express** - Framework web para criação de APIs
- **Sequelize** - ORM (Object-Relational Mapper) para manipulação do banco de dados
- **SQLite** - Banco de dados relacional leve e embutido
- **dotenv** - Gerenciamento de variáveis de ambiente
- **Nodemon** - Reinicialização automática do servidor durante o desenvolvimento

## 📁 Estrutura do Projeto

```
api-tarefas/
├── src/
│   ├── config/
│   │   └── database.js       # Configuração do Sequelize
│   ├── controllers/
│   │   └── tarefaController.js  # Lógica de negócio
│   ├── middlewares/
│   │   └── logger.js         # Middleware de logs
│   ├── models/
│   │   └── tarefa.js         # Model da tarefa (Sequelize)
│   ├── routes/
│   │   └── tarefas.js        # Definição das rotas
│   └── server.js             # Arquivo principal
├── .env                      # Variáveis de ambiente
├── .gitignore
├── package.json
└── README.md
```

## 📋 Pré-requisitos

- **Node.js** (versão 14 ou superior)
- **npm** ou **yarn**

## 🔧 Instalação

1. **Clone o repositório:**
```bash
git clone https://github.com/Devezaa7/api-tarefas.git
cd api-tarefas
```

2. **Instale as dependências:**
```bash
npm install
```

3. **Configure as variáveis de ambiente:**

Crie um arquivo `.env` na raiz do projeto:
```env
PORT=3000
DB_STORAGE=./tarefas.db
```

4. **Inicie o servidor:**

**Modo desenvolvimento (com nodemon):**
```bash
npm run dev
```

**Modo produção:**
```bash
npm start
```

O servidor estará rodando em `http://localhost:3000`

## 📡 Endpoints da API

### 📌 Rota Principal
```http
GET /
```
Retorna informações básicas da API.

**Resposta (200):**
```json
{
  "mensagem": "API de Tarefas",
  "versao": "1.0.0"
}
```

### ✅ Criar uma Tarefa
```http
POST /tarefas
```

**Body:**
```json
{
  "titulo": "Estudar Node.js",
  "descricao": "Revisar conceitos de API REST e Sequelize",
  "status": "a fazer"
}
```

**Resposta de sucesso (201):**
```json
{
  "id": 1,
  "titulo": "Estudar Node.js",
  "descricao": "Revisar conceitos de API REST e Sequelize",
  "status": "a fazer",
  "criadoEm": "2025-11-08T10:00:00.000Z",
  "atualizadoEm": "2025-11-08T10:00:00.000Z"
}
```

**Validações:**
- `titulo` é obrigatório e não pode ser vazio
- `status` deve ser um dos valores: `"a fazer"`, `"em andamento"`, `"concluída"`
- Se `status` não for informado, o valor padrão será `"a fazer"`

---

### 📋 Listar Todas as Tarefas
```http
GET /tarefas
```

**Resposta de sucesso (200):**
```json
[
  {
    "id": 1,
    "titulo": "Estudar Node.js",
    "descricao": "Revisar conceitos de API REST",
    "status": "em andamento",
    "criadoEm": "2025-11-08T10:00:00.000Z",
    "atualizadoEm": "2025-11-08T11:00:00.000Z"
  },
  {
    "id": 2,
    "titulo": "Fazer compras",
    "descricao": "Comprar itens do mercado",
    "status": "a fazer",
    "criadoEm": "2025-11-08T09:00:00.000Z",
    "atualizadoEm": "2025-11-08T09:00:00.000Z"
  }
]
```

*As tarefas são ordenadas da mais recente para a mais antiga.*

---

### 🔍 Buscar Tarefa por ID
```http
GET /tarefas/:id
```

**Exemplo:**
```http
GET /tarefas/1
```

**Resposta de sucesso (200):**
```json
{
  "id": 1,
  "titulo": "Estudar Node.js",
  "descricao": "Revisar conceitos de API REST",
  "status": "em andamento",
  "criadoEm": "2025-11-08T10:00:00.000Z",
  "atualizadoEm": "2025-11-08T11:00:00.000Z"
}
```

**Resposta de erro (404):**
```json
{
  "erro": "Tarefa não encontrada"
}
```

---

### ✏️ Atualizar uma Tarefa (Completa)
```http
PUT /tarefas/:id
```

**Body:**
```json
{
  "titulo": "Estudar Node.js - Atualizado",
  "descricao": "Revisar conceitos avançados de API REST",
  "status": "concluída"
}
```

**Resposta de sucesso (200):**
```json
{
  "mensagem": "Tarefa atualizada com sucesso",
  "tarefa": {
    "id": 1,
    "titulo": "Estudar Node.js - Atualizado",
    "descricao": "Revisar conceitos avançados de API REST",
    "status": "concluída",
    "criadoEm": "2025-11-08T10:00:00.000Z",
    "atualizadoEm": "2025-11-08T12:00:00.000Z"
  }
}
```

**Validações:**
- `titulo` é obrigatório e não pode ser vazio

---

### 🔄 Atualizar Status de uma Tarefa (Parcial)
```http
PATCH /tarefas/:id/status
```

**Body:**
```json
{
  "status": "concluída"
}
```

**Resposta de sucesso (200):**
```json
{
  "mensagem": "Status atualizado com sucesso",
  "tarefa": {
    "id": 1,
    "titulo": "Estudar Node.js",
    "descricao": "Revisar conceitos de API REST",
    "status": "concluída",
    "criadoEm": "2025-11-08T10:00:00.000Z",
    "atualizadoEm": "2025-11-08T13:00:00.000Z"
  }
}
```

**Validações:**
- `status` é obrigatório
- `status` deve ser um dos valores: `"a fazer"`, `"em andamento"`, `"concluída"`

---

### 🗑️ Deletar uma Tarefa
```http
DELETE /tarefas/:id
```

**Exemplo:**
```http
DELETE /tarefas/1
```

**Resposta de sucesso (200):**
```json
{
  "mensagem": "Tarefa deletada com sucesso"
}
```

**Resposta de erro (404):**
```json
{
  "erro": "Tarefa não encontrada"
}
```

---

## ⚠️ Códigos de Status HTTP

| Código | Descrição |
|--------|-----------|
| `200` | Requisição bem-sucedida |
| `201` | Recurso criado com sucesso |
| `400` | Requisição inválida (erro de validação) |
| `404` | Recurso não encontrado |
| `500` | Erro interno do servidor |

## 🏗️ Arquitetura MVC

O projeto segue o padrão **MVC (Model-View-Controller)** com clara separação de responsabilidades:

- **Models** (`src/models/`): Define a estrutura dos dados usando Sequelize ORM
- **Controllers** (`src/controllers/`): Contém a lógica de negócio da aplicação
- **Routes** (`src/routes/`): Define os endpoints e mapeia para os controllers
- **Middlewares** (`src/middlewares/`): Funções intermediárias (ex: logger)
- **Config** (`src/config/`): Configurações da aplicação (banco de dados, etc.)

## 🧪 Testando a API

### Com cURL

**Criar uma tarefa:**
```bash
curl -X POST http://localhost:3000/tarefas \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Minha primeira tarefa",
    "descricao": "Descrição da tarefa",
    "status": "a fazer"
  }'
```

**Listar tarefas:**
```bash
curl http://localhost:3000/tarefas
```

**Atualizar status:**
```bash
curl -X PATCH http://localhost:3000/tarefas/1/status \
  -H "Content-Type: application/json" \
  -d '{"status": "concluída"}'
```

**Deletar tarefa:**
```bash
curl -X DELETE http://localhost:3000/tarefas/1
```

### Com JavaScript (fetch)

```javascript
// Criar tarefa
fetch('http://localhost:3000/tarefas', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    titulo: 'Minha tarefa',
    descricao: 'Descrição da tarefa',
    status: 'a fazer'
  })
})
  .then(response => response.json())
  .then(data => console.log(data));

// Listar tarefas
fetch('http://localhost:3000/tarefas')
  .then(response => response.json())
  .then(data => console.log(data));
```

## 📝 Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
# Porta do servidor
PORT=3000

# Caminho do banco de dados SQLite
DB_STORAGE=./tarefas.db
```

## 🔒 Boas Práticas Implementadas

- ✅ Separação de responsabilidades (MVC)
- ✅ Validação de dados de entrada
- ✅ Tratamento de erros
- ✅ Uso de variáveis de ambiente (.env)
- ✅ Middleware customizado (logger)
- ✅ Códigos de status HTTP apropriados
- ✅ ORM (Sequelize) para manipulação do banco de dados
- ✅ Nomenclatura clara e consistente

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fazer um fork do projeto
2. Criar uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abrir um Pull Request

## 📄 Licença

Este projeto está sob a licença ISC.

## 👤 Autor

**Deveza** - [GitHub](https://github.com/Devezaa7)

## 🔗 Links Úteis

- [Repositório no GitHub](https://github.com/Devezaa7/api-tarefas)
- [Documentação do Express](https://expressjs.com/)
- [Documentação do Sequelize](https://sequelize.org/)
- [Documentação do Node.js](https://nodejs.org/)

---

⭐ Se este projeto te ajudou, considere dar uma estrela no repositório!