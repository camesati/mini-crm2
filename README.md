# Mini CRM — Camesa

Aplicação web para cadastro e acompanhamento de contatos comerciais.
Projeto educacional do curso Vibe Coding — foco em praticar Next.js, Supabase, Claude Code e deploy contínuo na Vercel.

---

## Visão geral

CRUD completo de contatos com filtro por status, busca textual e identidade visual CAMESA.
Não há autenticação na v1 — o acesso é aberto via `anon key` do Supabase.

---

## Stack

| Camada | Tecnologia |
|---|---|
| Framework | Next.js 14 (App Router, Server Components, Server Actions) |
| Linguagem | TypeScript 5 (modo estrito) |
| UI | Tailwind CSS 3 |
| Banco de dados | Supabase (Postgres 17) |
| Deploy | Vercel |

---

## Funcionalidades atuais

- Listar contatos com filtro por status (Novo / Em Contato / Fechado) e busca textual
- Criar, editar e excluir contatos
- Avatares com iniciais e cores geradas por hash do ID
- Badge de status colorido em todas as listagens
- Banner de confirmação após criar ou editar (auto-dismiss 4s)
- Confirmação inline de exclusão (sem popup nativo do browser)
- Error boundary global e página 404 customizada

---

## Estrutura do projeto

```
app/
  page.tsx                  # Home — lista todos os contatos
  contatos/
    page.tsx                # /contatos — tabela de contatos
    new/page.tsx            # /contatos/new — formulário de criação
    [id]/edit/page.tsx      # /contatos/:id/edit — formulário de edição
components/
  layout/Sidebar.tsx        # Navegação lateral
  contatos/
    ContatoTable.tsx        # Tabela com ações inline
    ContatoForm.tsx         # Formulário compartilhado (criar/editar)
  ui/                       # Button, Input, ErrorState, SuccessBanner
lib/
  supabase.ts               # Client Supabase (fail-fast em vars ausentes)
  contatos.ts               # Queries de leitura
  contatos-actions.ts       # Server Actions (criar, editar, excluir)
  utils.ts                  # Helpers (formatDate)
types/
  contato.ts                # Interface Contato, status, labels, cores
supabase/
  schema_contatos.sql       # DDL da tabela contatos
  migration_*.sql           # Migrations de status e RLS
```

---

## Como rodar localmente

### Pré-requisitos
- Node.js 18+
- Conta no [Supabase](https://supabase.com) com projeto criado
- Tabela `contatos` criada (ver seção Banco abaixo)

### Setup

```bash
# 1. Clone o repositório
git clone https://github.com/camesati/mini-crm2.git
cd mini-crm2

# 2. Instale as dependências
npm install

# 3. Configure as variáveis de ambiente
cp .env.example .env.local
# Edite .env.local com suas chaves do Supabase

# 4. Inicie o servidor de desenvolvimento
npm run dev
```

Acesse em [http://localhost:3000](http://localhost:3000).

### Variáveis de ambiente necessárias

| Variável | Onde encontrar |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Project Settings → API → Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase → Project Settings → API → anon public |

> `SUPABASE_SERVICE_ROLE_KEY` está no `.env.example` mas não é usado no código atual.

---

## Banco de dados e RLS

### Criando a tabela

Execute os scripts abaixo **em ordem** no SQL Editor do Supabase:

1. `supabase/schema_contatos.sql` — cria a tabela `contatos`
2. `supabase/migration_contatos_add_status.sql` — adiciona coluna `status`
3. `supabase/migration_contatos_status_v2.sql` — simplifica o enum de status
4. `supabase/migration_disable_rls_v1.sql` — desabilita RLS (necessário para v1)

### Schema resultante

| Coluna | Tipo | Notas |
|---|---|---|
| id | uuid | PK, default gen_random_uuid() |
| name | text | NOT NULL |
| email | text | default '' |
| phone | text | default '' |
| company | text | default '' |
| position | text | default '' |
| notes | text | default '' |
| created_at | timestamptz | default now() |
| updated_at | timestamptz | default now(), atualizado por trigger |
| status | text | check: novo / em_contato / fechado |

### RLS

**RLS está desabilitada na v1.** Qualquer pessoa com a `anon key` pode ler e modificar todos os registros. Isso é aceitável para uso educacional sem usuários reais. Para produção, reabilitar com políticas adequadas após implementar autenticação.

---

## Workflow de contribuição

```bash
# Crie uma branch para cada mudança
git checkout -b feat/descricao-curta

# Após as alterações, verifique o build
npm run build

# Abra um Pull Request — não faça merge direto na main
```

Convenção de commits: `feat(escopo): mensagem curta` ([Conventional Commits](https://www.conventionalcommits.org/))

---

## Próximos passos

- [ ] Autenticação via Supabase Auth + reabilitação do RLS
- [x] Feedback visual após exclusão de contato (dialog de confirmação + SuccessBanner)
- [ ] Paginação na listagem (atualmente carrega todos os registros)
- [ ] Testes automatizados (nenhum configurado atualmente)

---

*Projeto desenvolvido como parte do curso Vibe Coding — Camesa.*
