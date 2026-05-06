# Mini CRM — Camesa

Aplicação web para cadastro e acompanhamento de contatos comerciais.
Projeto educacional do curso **Vibe Coding** — foco em praticar Next.js, Supabase, Claude Code e deploy contínuo na Vercel.

---

## O que o projeto faz

CRUD completo de contatos com:

- Listagem com filtro por status e busca textual em tempo real
- Criação, edição e exclusão de contatos
- Avatares com iniciais e cores determinísticas por ID
- Badges de status coloridos (Novo / Em Contato / Fechado)
- Confirmação inline antes de excluir (dialog + tecla Escape para fechar)
- Feedback visual após cada operação (banner auto-dismiss 4s)
- Error boundary global e página 404 customizada

---

## Stack

| Camada | Tecnologia | Versão |
| --- | --- | --- |
| Framework | Next.js — App Router, Server Components, Server Actions | 14 |
| Linguagem | TypeScript (modo estrito, `any` proibido) | 5 |
| UI | Tailwind CSS | 3 |
| Banco de dados | Supabase (Postgres + RLS) | 17 |
| Deploy | Vercel (auto-deploy no push para `main`) | — |

---

## Como rodar localmente

### Pré-requisitos

- Node.js 18+
- Projeto criado no [Supabase](https://supabase.com)
- Tabela `contatos` criada (ver seção **Banco de dados** abaixo)

### Setup

```bash
# 1. Clone o repositório
git clone https://github.com/camesati/mini-crm2.git
cd mini-crm2

# 2. Instale as dependências
npm install

# 3. Configure as variáveis de ambiente
cp .env.example .env.local
# Edite .env.local com suas três chaves do Supabase

# 4. Inicie o servidor de desenvolvimento
npm run dev
```

Acesse em [http://localhost:3000](http://localhost:3000).

### Variáveis de ambiente

| Variável | Onde encontrar | Exposta ao browser? |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Project Settings → API → Project URL | Sim |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase → Project Settings → API → anon public | Sim |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Project Settings → API → service_role | **Não** |

> As três variáveis também devem ser adicionadas nas **Environment Variables** do projeto na Vercel antes do deploy de produção.

---

## Banco de dados

### Tabela `contatos` — ativa

Tabela principal e única usada pelo app.

| Coluna | Tipo | Notas |
| --- | --- | --- |
| id | uuid | PK, `gen_random_uuid()` |
| name | text | NOT NULL |
| email | text | default `''` |
| phone | text | default `''` |
| company | text | default `''` |
| position | text | default `''` |
| notes | text | default `''` |
| status | text | check: `novo` / `em_contato` / `fechado` |
| created_at | timestamptz | default `now()` |
| updated_at | timestamptz | default `now()`, atualizado por trigger |

### Tabela `leads` — inativa

Existe no banco como artefato do estado inicial do projeto (`supabase/schema.sql`). **Não é lida nem escrita pelo app.** Pode ser removida com `DROP TABLE leads;` sem impacto algum na aplicação.

### Criando as tabelas do zero

Execute os scripts abaixo **em ordem** no SQL Editor do Supabase:

```text
1. supabase/schema_contatos.sql              — cria a tabela contatos e o trigger updated_at
2. supabase/migration_contatos_add_status.sql — adiciona coluna status
3. supabase/migration_contatos_status_v2.sql  — simplifica o enum para novo/em_contato/fechado
4. supabase/migration_disable_rls_v1.sql      — desabilita RLS (só necessário se RLS veio ativa)
5. supabase/migration_enable_rls_v2.sql       — habilita RLS com política de leitura pública
```

---

## Segurança e RLS

**Estado atual: RLS habilitada** com separação de responsabilidades entre as duas chaves Supabase.

| Chave | Permissão no banco | Onde é usada no código |
| --- | --- | --- |
| `anon key` (pública) | `SELECT` apenas | Server Components — leitura da listagem |
| `service_role key` (privada) | Sem restrição | Server Actions — criar, editar, excluir |

A `service_role key` não tem prefixo `NEXT_PUBLIC_` e nunca é enviada ao browser. Qualquer tentativa de escrita direta via `anon key` (ex.: via Postman ou script externo) é bloqueada pelo Postgres.

**Limitação conhecida:** não há autenticação de usuário. Qualquer pessoa com a `anon key` pode ler todos os contatos. Para produção com dados sensíveis, implementar Supabase Auth e trocar a política de `SELECT` para `auth.uid() = user_id`.

---

## Deploy

O projeto está hospedado na **Vercel** com deploy automático.

| Evento | Resultado |
| --- | --- |
| Push para `main` | Deploy de produção automático |
| Push para qualquer outra branch | Preview URL gerado pela Vercel |

Para forçar um redeploy sem novo commit: Vercel → Deployments → três pontos no último deploy → **Redeploy**.

---

## Estrutura do projeto

```text
app/
  page.tsx                   # Home — lista com filtro, busca e avatares
  contatos/
    page.tsx                 # /contatos — tabela alternativa de contatos
    new/page.tsx             # /contatos/new — formulário de criação
    [id]/edit/page.tsx       # /contatos/:id/edit — formulário de edição
  error.tsx                  # Error boundary de rota
  global-error.tsx           # Error boundary global
  not-found.tsx              # Página 404

components/
  layout/Sidebar.tsx         # Navegação lateral
  contatos/
    ContatoForm.tsx          # Formulário compartilhado (criar e editar)
    ContatoRowActions.tsx    # Botões inline de editar/excluir com dialog
    ContatoTable.tsx         # Tabela com toast e optimistic delete
  ui/
    Button.tsx               # Botão reutilizável
    Input.tsx                # Input reutilizável
    ErrorState.tsx           # Componente de estado de erro
    SuccessBanner.tsx        # Banner de sucesso (auto-dismiss 4s)

lib/
  supabase.ts                # Cliente público (anon key) — leituras
  supabase-server.ts         # Cliente privado (service_role) — lazy init, escritas
  contatos.ts                # Queries de leitura (getContatos, getContatoById)
  contatos-actions.ts        # Server Actions (criar, editar, excluir)
  utils.ts                   # Helpers (formatDate)

types/
  contato.ts                 # Interface Contato, ContatoStatus, labels, cores

supabase/
  schema.sql                 # DDL da tabela leads (inativa — ver seção acima)
  schema_contatos.sql        # DDL da tabela contatos
  migration_*.sql            # Migrations de status e RLS (executar em ordem)
```

---

## Limitações conhecidas

| Limitação | Impacto | Quando resolver |
| --- | --- | --- |
| Sem autenticação | Qualquer pessoa com a anon key pode ler todos os contatos | v3 — Supabase Auth |
| Sem paginação | Carrega todos os registros em uma única query | Quando a lista passar de ~200 itens |
| Sem testes automatizados | Regressões só são detectadas manualmente | Próximo ciclo de qualidade |
| Tabela `leads` órfã | Ocupa espaço no banco, pode causar confusão | `DROP TABLE leads;` a qualquer momento |

---

## Workflow de contribuição

```bash
# 1. Crie uma branch descritiva
git checkout -b feat/descricao-curta

# 2. Faça as alterações e verifique o build
npm run build

# 3. Abra um Pull Request — nunca faça merge direto na main
```

Convenção de commits: `tipo(escopo): mensagem curta` — [Conventional Commits](https://www.conventionalcommits.org/)

Tipos comuns: `feat`, `fix`, `refactor`, `docs`, `chore`

---

*Projeto desenvolvido como parte do curso Vibe Coding — Camesa.*
