# Payment Transaction — Mini Projeto Fullstack

**Status:** Em desenvolvimento

Projeto fullstack de pagamentos com autenticação JWT, consumo de API externa e integração completa entre frontend e backend. O objetivo é aprender passo a passo, com foco em arquitetura profissional e boas práticas.

## Objetivo

Construir uma aplicação que permita:
- Cadastro e login de usuários com JWT
- Consumo de uma API externa de pagamentos no backend
- Persistência de usuários e dados consumidos no PostgreSQL
- Exposição de dados para o frontend com rotas protegidas

## Stack obrigatória

**Frontend**
- React
- TypeScript
- TailwindCSS
- Axios
- React Router

**Backend**
- NestJS
- TypeScript
- PostgreSQL
- JWT Authentication
- bcrypt

**Arquitetura backend**
- Controller
- Service
- Module
- DTO

## Telas obrigatórias

1. **Login** — autenticação e persistência do token
2. **Registro** — criação de conta
3. **Dashboard** — listagem, filtro, loading e erro
4. **Detalhes** — visão completa de um item

## Concluídos

- Estrutura inicial do backend configurada
- Conexão com PostgreSQL configurada no TypeORM
- Entidade `PaymentTransaction` criada

## Pendentes

**Backend**
- Criar entidade `User` e módulo de usuários
- Implementar registro de usuário com hash de senha (bcrypt)
- Implementar login com JWT
- Configurar JWT Guard para rotas protegidas
- Consumir API externa de pagamentos via Axios
- Persistir dados externos no PostgreSQL
- Expor endpoints para o frontend

**Frontend**
- Setup React + TypeScript + TailwindCSS
- Implementar autenticação (login/registro)
- Armazenar token JWT
- Consumir backend via Axios
- Dashboard com listagem, filtro, loading e erro
- Tela de detalhes

## Guia passo a passo (aprox. 5 horas)

### Hora 1 — Base do backend
1. Confirmar banco `payment_transaction` no PostgreSQL.
2. Garantir TypeORM conectado no NestJS.
3. Criar entidades `User` e `PaymentTransaction`.
4. Criar módulos `Auth`, `Users`, `Transactions`.

### Hora 2 — Autenticação
1. Criar DTOs de registro e login.
2. Implementar `AuthService` e `AuthController`.
3. Hash de senha com bcrypt.
4. Login retorna JWT.
5. Proteger rotas com JWT Guard.

### Hora 3 — API externa
1. Criar serviço para consumo da API externa (Axios).
2. Mapear dados externos para `PaymentTransaction`.
3. Persistir no PostgreSQL.
4. Expor rota protegida para listagem.

### Hora 4 — Frontend base
1. Criar projeto React + TypeScript + TailwindCSS.
2. Configurar Axios com baseURL.
3. Criar páginas de Login e Registro.
4. Configurar rotas com React Router.

### Hora 5 — Dashboard e detalhes
1. Dashboard consumindo o backend.
2. Implementar filtro, loading e erro.
3. Tela de detalhes completa.
4. Guard de rota no frontend.
