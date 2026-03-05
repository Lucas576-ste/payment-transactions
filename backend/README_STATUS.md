# Payment Transaction — Mini Projeto Fullstack

**Status:** Em desenvolvimento

Projeto fullstack de **cobranças**: usuário se registra, faz login, cria cobranças para enviar (ex.: link por WhatsApp). Quem recebe vê pendente; ao pagar ou passar do prazo, o status é atualizado. Upload de arquivos (comprovante/anexo) via MinIO (S3).

---

## Visão do produto

1. Usuário **registra** e **loga**.
2. No **Dashboard** cria **cobrança**: valor, descrição, destinatário, vencimento → gera **link** (e "Compartilhar no WhatsApp").
3. Quem recebe o link vê status **pendente**.
4. Pagamento feito → **pago**; passou do vencimento → **vencido**.
5. **Upload** (MinIO/S3): comprovante ou anexo da cobrança.

**Status da cobrança:** `pending` | `paid` | `expired`

---

## Stack

| Camada | Tecnologias |
|--------|-------------|
| Frontend | React, TypeScript, TailwindCSS, Axios, React Router |
| Backend | NestJS, TypeScript, PostgreSQL, JWT, bcrypt |
| Arquivos | MinIO (S3), Docker Compose |
| Arquitetura | Controller, Service, Module, DTO |

---

## Telas

| Feito | Tela | Descrição |
|:----:|------|-----------|
| [x] | **Login** | Autenticação, token. |
| [x] | **Registro** | Criação de conta. |
| [ ] | **Dashboard** | Lista minhas cobranças, filtro (pendente/pago/vencido), botão "Nova cobrança". |
| [ ] | **Detalhes** | Cobrança completa; criador vê anexos; link público: ver + upload comprovante / "Marcar como pago". |
| [ ] | **Criar cobrança** | Formulário (valor, descrição, destinatário, vencimento, anexo). Link + WhatsApp. |
| [ ] | **Perfil** (opcional) | Nome, senha, foto. |

---

## Concluído

### Backend

| Feito | Item |
|:----:|------|
| [x] | NestJS + TypeORM + PostgreSQL |
| [x] | Entidades: User, PaymentTransaction (sync API), Transaction |
| [x] | Módulos: Auth, Users, Transactions, Payment |
| [x] | Registro e login com JWT |
| [x] | Rotas protegidas (JwtAuthGuard) |
| [x] | GET `/payment-transactions`, POST `/payment-transactions/sync` |

### Frontend

| Feito | Item |
|:----:|------|
| [x] | Vite + React + TypeScript + TailwindCSS |
| [x] | Axios (baseURL + interceptor token) |
| [x] | Páginas Login e Registro |
| [x] | React Router (/, /login, /register) |

---

## Pendente por prioridade

**Legenda:** P1 = Alta (essencial) · P2 = Média · P3 = Baixa

---

### P1 — Backend: Cobranças (fluxo principal)

| Feito | Item |
|:----:|------|
| [ ] | Entidade **Cobrança**: id, userId, amount, description, recipient, dueDate, status (pending/paid/expired), publicSlug ou publicId, createdAt, updatedAt |
| [ ] | Módulo **Cobranças**: Controller, Service, DTOs |
| [ ] | POST criar cobrança (protegido) |
| [ ] | GET listar minhas cobranças (protegido) |
| [ ] | GET por id (protegido) |
| [ ] | GET por slug/id público (rota sem JWT) |
| [ ] | Regra vencimento: se pending e dueDate < hoje → expired |
| [ ] | PATCH/POST marcar como pago (público ou com token no link) |

### P1 — Frontend: Dashboard e cobranças

| Feito | Item |
|:----:|------|
| [ ] | **Guard de rota**: redirecionar não logado para /login |
| [ ] | Página **Dashboard**: GET cobranças, lista, filtro por status, loading/erro |
| [ ] | Botão "Nova cobrança" → rota de criação |
| [ ] | Página **Criar cobrança**: formulário, POST, exibir link + botão WhatsApp |
| [ ] | Página **Detalhes**: visão criador (autenticado) e visão pública (por link) |
| [ ] | Na página pública: upload comprovante e/ou "Marcar como pago" |

### P2 — Backend: Docker e MinIO (upload)

| Feito | Item |
|:----:|------|
| [ ] | `docker-compose.yml` com **postgres** e **minio** (5432, 9000, 9001) |
| [ ] | Bucket `uploads` no MinIO (Console :9001 ou via código) |
| [ ] | Client S3 no NestJS (`@aws-sdk/client-s3` ou `minio`) |
| [ ] | Config endpoint MinIO (env: endpoint, port, access key, secret, bucket) |
| [ ] | Serviço upload: multipart → key (ex. receipts/{id}/{file}) → PutObject MinIO |
| [ ] | Referência no banco: attachmentKey/receiptKey na Cobrança ou entidade Anexo/Comprovante |
| [ ] | Rota POST upload (anexo: protegida; comprovante: pública ou token) |

### P2 — Frontend: Upload

| Feito | Item |
|:----:|------|
| [ ] | Input file em **Criar cobrança** (anexo opcional) |
| [ ] | Input file na **página pública** do link (comprovante) |
| [ ] | Envio multipart para o backend |

### P3 — Melhorias e opcionais

| Feito | Item |
|:----:|------|
| [ ] | Variáveis de ambiente para banco e JWT (e MinIO) |
| [ ] | (Opcional) DTO de resposta sem campo `password` |
| [ ] | (Opcional) Página **Perfil**: editar nome/senha, upload avatar |

---

## Referência: Docker Compose

`docker-compose.yml` na raiz — exemplo com Postgres e MinIO:

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: payment_transaction
    ports: ["5432:5432"]
    volumes: [postgres_data:/var/lib/postgresql/data]

  minio:
    image: minio/minio:latest
    command: server /data
    environment:
      MINIO_ROOT_USER: minioadmin
      MINIO_ROOT_PASSWORD: minioadmin
    ports: ["9000:9000", "9001:9001"]
    volumes: [minio_data:/data]

volumes:
  postgres_data:
  minio_data:
```

Backend: TypeORM em `localhost:5432`; MinIO via env (endpoint, port, keys, bucket).

---

## Próxima etapa

**P1 Backend:** criar entidade Cobrança e módulo Cobranças (CRUD + rota pública + marcar pago/vencido).  
Depois **P1 Frontend:** guard, Dashboard, Criar cobrança, Detalhes.  
Em seguida **P2:** Docker Compose + MinIO + upload (backend e front).

---

## Pontos de atenção

| Item | Recomendação |
|------|--------------|
| Cobrança vs PaymentTransaction | Nova entidade Cobrança para fluxo “cobrança criada por mim”; manter PaymentTransaction para sync externo se quiser. |
| Validação | Manter ValidationPipe; validar DTOs de cobrança e tipo/tamanho de arquivo no upload. |
| Credenciais | Usar variáveis de ambiente em produção (banco, JWT, MinIO). |
