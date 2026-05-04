# Overview do Projeto — mini-crm2

**Aluno:** JEFFERSON  
**Data da sessão:** 2026-05-04  
**Repositório:** https://github.com/camesati/mini-crm2

---

## 1. Resumo executivo

- **O que é:** Aplicação web de CRM simplificado para cadastro e acompanhamento de leads/contatos, desenvolvida como projeto educacional do curso Vibe Coding para praticar Claude Code, Next.js, Supabase e Vercel.
- **Estágio atual:** Produto funcional com CRUD completo de contatos e leads, autenticação ausente (acesso aberto), sem testes automatizados. Interface polida com identidade visual CAMESA aplicada.
- **Foco da sessão:** Uso real do Claude Code com MCP Supabase (sincronização de documentação com banco de dados), auditoria e otimização da configuração Claude Code do projeto, e implementação de 3 quickwins de UX.

---

## 2. Stack identificada

| Camada | Tecnologia |
|---|---|
| Framework | Next.js 14.2.29 (App Router, Server Components, Server Actions) |
| Linguagem | TypeScript 5 (modo estrito) |
| UI/CSS | Tailwind CSS 3.3 |
| Banco de dados | Supabase (Postgres 17.6 + `@supabase/supabase-js` 2.105) |
| Deploy | Vercel (`vercel.json` com `framework: nextjs`) |
| Versionamento | Git + GitHub (`camesati/mini-crm2`) |
| Ferramentas Claude | Claude Code CLI, MCP Supabase (autenticado e usado na sessão) |

---

## 3. Estado atual do produto

### O que já funciona
- CRUD completo de **contatos** (criar, listar, editar, excluir) via rota `/` e `/contatos`
- CRUD completo de **leads** (criar, listar, editar, excluir) via rota `/leads`
- Filtro por status com StatusPills e busca textual na home (`/`)
- Filtro por status (select) e busca textual em `/leads`
- Badges de status coloridos (Novo/Em Contato/Fechado) em ambas as tabelas
- Avatares com iniciais e cores hash na home
- Email e telefone como links clicáveis (`mailto:`, `tel:`)
- Error boundary global + página 404 customizada
- Sidebar com navegação ativa e identidade visual CAMESA
- Empty states com CTA em todas as tabelas
- Banner de sucesso após criar/editar (auto-dismiss 4s)
- Confirmação inline de exclusão (sem `window.confirm`)

### O que está parcial
- **Duas entidades paralelas** (`leads` e `contatos`) com schemas, status e validações diferentes — sem uma estratégia clara de qual usar como principal. A home page lista contatos mas se chama "Leads" no `<h1>`.
- A página `/contatos` usa `ContatoTable` (design mais simples) enquanto a home usa um layout próprio mais elaborado — mesma entidade, duas experiências de listagem.

### O que ainda não existe
- Autenticação de usuário (nenhum sistema de login)
- Testes automatizados (nenhum framework configurado)
- README.md no repositório
- Paginação (tabelas carregam todos os registros)
- Feedback visual após exclusão (delete não redireciona, apenas revalida)
- Deploy automático confirmado na Vercel (npx vercel requer login interativo)

### Fluxo principal do usuário hoje
Home (`/`) → visualiza lista de contatos com filtro por status → clica "Novo Contato" → preenche formulário → salva → banner verde de confirmação → volta à lista com novo item.

---

## 4. O que foi implementado nesta sessão

### Uso do MCP Supabase
- Autenticação OAuth com Supabase MCP e consulta da estrutura real das tabelas `contatos`, `leads` e `tarefas` no projeto `camesa-vibe`
- `CLAUDE.md` atualizado com o schema real da tabela `contatos` (colunas em inglês, RLS desabilitada, campos corretos)

### Auditoria e otimização da configuração Claude Code
- `CLAUDE.md`: seções "Stack" e "Banco de dados" convertidas de formato espaçado (~90 linhas em branco) para tabelas Markdown padrão; nota stale sobre RLS removida
- `.claude/rules/mini-crm-frontend.md`: adicionado frontmatter com `globs` e `alwaysApply: false`; campos do domínio atualizados de português para inglês (`name, company, email, phone, position, notes`); "lead" → "contato"
- `.claude/agents/auditor-mini-crm.md`: adicionado frontmatter `tools: [Read, Bash, Grep, Glob]`; referência `supabase/migrations/` corrigida para `supabase/`; nota de RLS atualizada
- `.claude/settings.json`: `defaultMode: "plan"` → `"default"`
- `.gitignore`: adicionado `.mcp.json`; entrada duplicada de `CLAUDE.local.md` removida

### Quickwins de UX (3 implementadas, build verificado, push feito)
1. **[QW1]** Coluna `status` na tabela `/contatos` — `ContatoTable.tsx` passa a exibir badge colorido de status entre Telefone e Criado em (commit `c08f7be`)
2. **[QW2]** Banner de feedback pós-ação — `SuccessBanner.tsx` (novo componente client, auto-dismiss 4s, botão fechar); actions redirecionam com `?success=<código>`; home e `/leads` lêem o param e exibem o banner (commit `2d5690d`)
3. **[QW3]** Confirmação inline de delete — `window.confirm()` substituído por toggle "Excluir? Sim / Não" na mesma célula em `LeadTable.tsx` e `ContatoTable.tsx` (commit `1018add`)

---

## 5. Estrutura Claude Code no projeto

| Item | Estado |
|---|---|
| `CLAUDE.md` | ✅ Atualizado — schema real via MCP, tabelas Markdown, anti-padrões, comandos úteis, seção "não alterar sem perguntar" |
| `settings.json` | ✅ `defaultMode: "default"`, `includeCoAuthoredBy: false` |
| `rules/mini-crm-frontend.md` | ✅ Com `globs`, domínio correto em inglês, anti-padrões Next.js |
| `agents/auditor-mini-crm.md` | ✅ Com `tools: [Read, Bash, Grep, Glob]`, formato de severidade definido |
| `skills/preparar-pr/SKILL.md` | ✅ Passos numerados, saída exemplificada, restrições claras |
| `.mcp.json` | ⚠️ Arquivo existe mas está **vazio** — adicionado ao `.gitignore` nesta sessão |
| Qualidade geral | **Boa** — configuração modular, cada peça no seu papel, sem ruído excessivo no contexto |

---

## 6. Banco, migrations e RLS

### Tabelas identificadas (via MCP Supabase — projeto `camesa-vibe`)

| Tabela | RLS | Linhas | Observação |
|---|---|---|---|
| `contatos` | ❌ Desabilitada | 2 | Tabela principal ativa; schema completo com `position`, `updated_at` |
| `leads` | ✅ Habilitada | 3 | Status diverge do CLAUDE.md: usa `contatado/qualificado/perdido` |
| `tarefas` | ✅ Habilitada | 5 | Tabela extra; não usada no app atual |

### Arquivos SQL encontrados em `supabase/`
- `schema.sql` — criação da tabela `leads`
- `schema_contatos.sql` — criação da tabela `contatos` (sem status original)
- `migration_contatos_add_status.sql` — adiciona coluna `status` com 5 valores
- `migration_contatos_status_v2.sql` — simplifica para 3 valores (`novo`, `em_contato`, `fechado`)
- `migration_disable_rls_v1.sql` — desabilita RLS em `contatos`

> Não há pasta `supabase/migrations/` — os arquivos SQL ficam diretamente em `supabase/`. Não há uso de `supabase db push` ou CLI Supabase configurado.

### Riscos
- **RLS desabilitada em `contatos`**: qualquer pessoa com a `anon key` pode ler, inserir, atualizar e deletar todos os registros. Aceitável para v1 educacional sem autenticação, mas deve ser endereçado antes de expor para usuários reais.
- **`leads` tem RLS habilitada sem políticas explícitas visíveis** — pode bloquear acesso em alguns contextos (não consegui confirmar as policies no repositório).
- **Duas tabelas com propósitos sobrepostos** (`leads` e `contatos`) sem documentação da intenção de convergência.

---

## 7. Qualidade e riscos

### Pontos fortes
- Código TypeScript estrito sem uso de `any` identificado
- Server Components usados por padrão; Client Components apenas onde necessário (`"use client"` nos componentes de tabela e formulário)
- Server Actions para mutações (sem API routes desnecessárias)
- Validação server-side em todas as actions (nome obrigatório, email com regex em leads)
- Error boundary global + por rota implementados
- Identidade visual consistente (paleta CAMESA, Tailwind puro, sem CSS-in-JS)

### Problemas técnicos encontrados
- `window.confirm()` nas tabelas (corrigido nesta sessão)
- `CLAUDE.md` não estava sendo trackeado pelo Git (corrigido nesta sessão)
- Duplicidade de entidades (`leads` vs `contatos`) com schemas e status diferentes — risco de manutenção

### Problemas de UX/UI
- A home (`/`) exibe `<h1>Leads</h1>` mas lista contatos — inconsistência de nomenclatura
- Exclusão não gera feedback visual (item some da lista, mas sem banner de confirmação)
- `/leads` usa design de tabela mais simples que a home page (sem avatares, sem hover-reveal)
- Nenhum indicador de loading durante submissão de formulários

### Riscos para continuidade
- Sem autenticação, o deploy em produção expõe operações de escrita para qualquer pessoa
- Sem README, novos colaboradores (ou o instrutor) precisam ler o `CLAUDE.md` para entender o projeto
- Sem testes, refatorações futuras não têm rede de segurança

---

## 8. Próximos passos recomendados

### Imediatos
1. **Resolver a dualidade `leads`/`contatos`** — decidir qual tabela é a principal e deprecar a outra, ou documentar explicitamente o papel de cada uma
2. **Corrigir o `<h1>Leads</h1>` na home** (`app/page.tsx` linha 214) para "Contatos" ou "Dashboard"
3. **Adicionar README.md** mínimo (descrição, como rodar localmente, link do deploy)

### Curto prazo
1. **Feedback visual após exclusão** — após `deleteContato`/`deleteLead`, redirecionar com `?success=excluido` (mesma abordagem do QW2)
2. **Loading state nos formulários** — desabilitar botão de submit e mostrar indicador durante Server Action em andamento
3. **Habilitar RLS em `contatos`** com policy permissiva para `anon` (`using (true)`) como placeholder, eliminando o risco de exposição aberta

### Se fosse continuar agora (próximos 30 min)
Resolver a dualidade: padronizar em `contatos` (que é a tabela com schema mais completo e RLS off), redirecionar `/leads` para usar os mesmos dados ou remover a rota, e atualizar o `<h1>` da home. Isso elimina a confusão estrutural principal do projeto e deixa o app coerente de ponta a ponta.

---

## 9. Checklist de validação manual

### O que testar hoje
- [ ] `npm run dev` sobe sem erro
- [ ] `/` lista contatos com badges de status coloridos
- [ ] Criar novo contato em `/contatos/new` → redireciona com banner verde "Contato criado com sucesso."
- [ ] Editar contato existente → banner "Contato atualizado com sucesso."
- [ ] Clicar "Excluir" → aparece "Excluir? Sim / Não" inline (sem popup nativo)
- [ ] Clicar "Não" → confirmação some, item permanece
- [ ] Clicar "Sim" → item removido da lista
- [ ] `/leads` repete o mesmo fluxo com "Lead criado/atualizado"
- [ ] Filtro por status na home funciona sem quebrar a URL de busca
- [ ] `npm run build` passa sem erros de tipos

### O que o instrutor deve verificar rapidamente
- Estado do banco no Supabase dashboard (projeto `camesa-vibe`): tabelas `contatos`, `leads`, `tarefas` e se há dados de teste reais
- Deploy atual na Vercel: checar se o último commit (`1018add`) foi deployado automaticamente
- `app/page.tsx` linha 214: `<h1>Leads</h1>` listando contatos — inconsistência proposital ou esquecimento?

---

## 10. Status final

| Item | Status |
|---|---|
| Pronto para continuar aula? | ✅ Sim |
| Pronto para commit/push? | ✅ Sim — todos os commits desta sessão já estão em `origin/main` |
| Principal bloqueador atual | Dualidade `leads`/`contatos` sem definição clara de responsabilidade — gera confusão de navegação e manutenção |

---

*Documento gerado automaticamente pelo Claude Code ao final da sessão em 2026-05-04.*
