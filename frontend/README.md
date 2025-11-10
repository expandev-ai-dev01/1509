# TODO List - Sistema de Gerenciamento de Tarefas

## Descrição

Sistema completo de gerenciamento de tarefas com funcionalidades avançadas de organização, priorização e sincronização.

## Tecnologias

- **React 18.3.1** - Framework frontend
- **TypeScript 5.6.3** - Tipagem estática
- **Vite 5.4.11** - Build tool e dev server
- **React Router 6.26.2** - Roteamento
- **TanStack Query 5.59.20** - Gerenciamento de estado do servidor
- **Tailwind CSS 3.4.14** - Framework CSS
- **Axios 1.7.7** - Cliente HTTP
- **React Hook Form 7.53.1** - Gerenciamento de formulários
- **Zod 3.23.8** - Validação de schemas

## Estrutura do Projeto

```
src/
├── app/                    # Configuração da aplicação
│   ├── App.tsx            # Componente raiz
│   └── router.tsx         # Configuração de rotas
├── assets/                # Recursos estáticos
│   └── styles/           # Estilos globais
├── core/                  # Componentes e lógica compartilhada
│   ├── components/       # Componentes genéricos
│   ├── contexts/         # Contextos globais
│   └── lib/              # Configurações de bibliotecas
├── domain/               # Domínios de negócio
└── pages/                # Páginas da aplicação
    └── layouts/          # Layouts compartilhados
```

## Instalação

```bash
# Instalar dependências
npm install

# Copiar arquivo de ambiente
cp .env.example .env

# Configurar variáveis de ambiente
# Edite o arquivo .env com as configurações do backend
```

## Desenvolvimento

```bash
# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build de produção
npm run preview

# Lint do código
npm run lint
```

## Funcionalidades

### Implementadas
- ✅ Estrutura base da aplicação
- ✅ Configuração de roteamento
- ✅ Sistema de autenticação
- ✅ Componentes UI base
- ✅ Integração com API

### Planejadas
- 📋 Criação de Tarefas
- 📋 Categorização de Tarefas
- 📋 Definição de Prioridades
- 📋 Estabelecimento de Prazos
- 📋 Marcação de Conclusão
- 📋 Busca de Tarefas
- 📋 Notificações e Lembretes
- 📋 Compartilhamento de Tarefas
- 📋 Visualização em Calendário
- 📋 Sincronização Multiplataforma

## Configuração da API

O frontend se conecta ao backend através das seguintes URLs:

- **Endpoints Públicos**: `/api/v1/external/`
- **Endpoints Autenticados**: `/api/v1/internal/`

Configure a URL base da API no arquivo `.env`:

```env
VITE_API_URL=http://localhost:3000
VITE_API_VERSION=v1
VITE_API_TIMEOUT=30000
```

## Padrões de Código

### Componentes
- Use TypeScript para todos os componentes
- Separe tipos em arquivos `types.ts`
- Use Tailwind CSS para estilização
- Documente com JSDoc

### Hooks
- Prefixe com `use`
- Separe lógica de negócio em hooks customizados
- Use TanStack Query para operações assíncronas

### Rotas
- Use lazy loading para páginas
- Implemente loading states
- Configure error boundaries

## Licença

Proprietary - Todos os direitos reservados