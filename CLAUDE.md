Mini-CRM — Camesa T1 (Curso Vibe Coding)

Projeto educacional para praticar Claude Code, Next.js, Supabase e Vercel. Toda decisão favorece clareza sobre completude.


Objetivo do projeto
Aplicação web simples para cadastrar e acompanhar leads. Foco em demonstrar:

loop completo: descrever → IA gera → commit → deploy
uso real de Claude Code com memória, skills e MCP
aderência a um padrão de qualidade (PR workflow, README, RLS)

Stack

| Camada | Tecnologia |
|---|---|
| Framework | Next.js 14 (App Router) |
| Linguagem | TypeScript estrito |
| UI | Tailwind CSS |
| Banco | Supabase (Postgres + RLS) |
| Deploy | Vercel |
| Versionamento | Git + GitHub |

Banco de dados
Tabela principal: contatos

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
| updated_at | timestamptz | default now() |
| status | text | default 'novo', check: novo / em_contato / fechado |

RLS desabilitada (v1 sem autenticação). Scripts SQL em supabase/.

Convenções de código
TypeScript
Modo estrito ligado em tsconfig.json
Proibido any — use unknown se realmente necessário
Evitar as quando puder tipar diretamente
Tipos compartilhados em types/ ou colocais ao componente

Naming
Componentes: PascalCase (LeadForm.tsx)
Funções/variáveis: camelCase
Constantes: UPPER_SNAKE_CASE
Arquivos de rotas seguem o exigido pelo App Router (page.tsx, layout.tsx)

Commits e PRs
Conventional Commits: feat(escopo): mensagem (≤72 caracteres)
Branch nova para cada mudança: feat/descricao-curta
Não commitar direto na main — sempre PR
PR sem teste manual documentado é incompleto

Comandos úteis
npm install          # primeira vez
npm run dev          # desenvolvimento local
npm run build        # build de produção
npm run lint         # lint
git status
git diff

Anti-padrões (não faça)
❌ Commitar .env.local ou qualquer chave real
❌ Editar schema do banco sem criar uma migration
❌ Adicionar biblioteca pesada (>200kb gzip) sem justificar
❌ Pular o PR e merge direto na main
❌ Inventar status de contato que não esteja em novo|em_contato|fechado
❌ Usar any em código novo

Não alterar sem perguntar
.env.local
credenciais reais (Supabase anon/service keys, Vercel tokens)
schema do banco em produção
arquivos em .claude/agents/ (são ferramentas do time, não código de feature)

Onde achar contexto extra
Aulas e conceitos: vault Obsidian do curso
Convenções gerais: .claude/rules/
Workflows: .claude/skills/
Auditoria automática: .claude/agents/auditor-mini-crm.md

Notas para o agente
Quando em dúvida sobre design de feature, pergunte antes de implementar.
Prefira criar uma migration explícita a alterar schema "no escuro".
Sempre rode npm run build antes de declarar pronto.
