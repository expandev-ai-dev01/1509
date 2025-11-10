# TODO List - Backend API

Sistema de gerenciamento de tarefas - API REST

## Tecnologias

- Node.js
- TypeScript
- Express.js
- Zod (validação)

## Estrutura do Projeto

```
src/
├── api/              # API controllers
├── routes/           # Route definitions
├── middleware/       # Express middleware
├── services/         # Business logic
├── utils/            # Utility functions
├── constants/        # Application constants
└── server.ts         # Application entry point
```

## Instalação

```bash
npm install
```

## Configuração

1. Copie o arquivo `.env.example` para `.env`
2. Configure as variáveis de ambiente necessárias

## Desenvolvimento

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Produção

```bash
npm start
```

## Testes

```bash
npm test
```

## API Endpoints

### Health Check
- `GET /health` - Verifica o status da API

### API v1
- Base URL: `/api/v1`
- External routes: `/api/v1/external/*`
- Internal routes: `/api/v1/internal/*`

## Padrões de Código

- Indentação: 2 espaços
- Aspas: simples
- Ponto e vírgula: obrigatório
- Comprimento máximo de linha: 120 caracteres

## Estrutura de Resposta

### Sucesso
```json
{
  "success": true,
  "data": {},
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### Erro
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Error message"
  },
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```