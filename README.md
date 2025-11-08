# API de Tarefas

Uma API RESTful para gerenciamento de tarefas, permitindo criar, listar, atualizar e deletar tarefas de forma simples e eficiente.

# Tecnologias

- Node.js
- Express
- Banco de dados (especifique: MongoDB, PostgreSQL, etc.)

## 📋 Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn
- Banco de dados configurado

# Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/api-tarefas.git
cd api-tarefas
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:
```
PORT=3000
DATABASE_URL=sua_conexao_do_banco
```

4. Inicie o servidor:
```bash
npm start
```

# Endpoints

# Listar todas as tarefas
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
    "concluida": false,
    "criadaEm": "2025-11-08T10:00:00Z"
  }
]
```

# Buscar tarefa por ID
```http
GET /tarefas/:id
```

**Resposta de sucesso (200):**
```json
{
  "id": 1,
  "titulo": "Estudar Node.js",
  "descricao": "Revisar conceitos de API REST",
  "concluida": false,
  "criadaEm": "2025-11-08T10:00:00Z"
}
```

# Criar nova tarefa
```http
POST /tarefas
```

**Body:**
```json
{
  "titulo": "Nova tarefa",
  "descricao": "Descrição da tarefa"
}
```

**Resposta de sucesso (201):**
```json
{
  "id": 2,
  "titulo": "Nova tarefa",
  "descricao": "Descrição da tarefa",
  "concluida": false,
  "criadaEm": "2025-11-08T11:00:00Z"
}
```

# Atualizar tarefa
```http
PUT /tarefas/:id
```

**Body:**
```json
{
  "titulo": "Tarefa atualizada",
  "descricao": "Nova descrição",
  "concluida": true
}
```

**Resposta de sucesso (200):**
```json
{
  "id": 1,
  "titulo": "Tarefa atualizada",
  "descricao": "Nova descrição",
  "concluida": true,
  "atualizadaEm": "2025-11-08T12:00:00Z"
}
```

# Deletar tarefa
```http
DELETE /tarefas/:id
```

**Resposta de sucesso (204):**
Sem conteúdo no corpo da resposta.

# Autenticação

(Se aplicável) Esta API utiliza autenticação via Bearer Token. Inclua o token no header de suas requisições:

```http
Authorization: Bearer seu_token_aqui
```

# Códigos de Status

- `200` - Sucesso
- `201` - Criado com sucesso
- `204` - Sem conteúdo (deleção bem-sucedida)
- `400` - Requisição inválida
- `401` - Não autorizado
- `404` - Não encontrado
- `500` - Erro interno do servidor

# Testes

Execute os testes com:
```bash
npm test
```

# Exemplos de Uso

# Com cURL
```bash
# Listar tarefas
curl http://localhost:3000/tarefas

# Criar tarefa
curl -X POST http://localhost:3000/tarefas \
  -H "Content-Type: application/json" \
  -d '{"titulo":"Minha tarefa","descricao":"Descrição"}'
```

# Com JavaScript (fetch)
```javascript
// Listar tarefas
fetch('http://localhost:3000/tarefas')
  .then(response => response.json())
  .then(data => console.log(data));

// Criar tarefa
fetch('http://localhost:3000/tarefas', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    titulo: 'Minha tarefa',
    descricao: 'Descrição da tarefa'
  })
})
  .then(response => response.json())
  .then(data => console.log(data));
```

# Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

# Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

# Autor

Seu Nome - [@seu-usuario](https://github.com/seu-usuario)

# Suporte

Para suporte, envie um email para seuemail@exemplo.com ou abra uma issue no GitHub.