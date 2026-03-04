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

**Backend — base**
- [x] Estrutura inicial do backend configurada
- [x] Conexão com PostgreSQL configurada no TypeORM
- [x] Entidade `PaymentTransaction` criada
- [x] Módulo `Transactions` (entidade `Transaction`, service, controller)

**Backend — usuários e registro**
- [x] Entidade `User` criada (id, name, email, password)
- [x] Módulo de usuários (`UsersModule`, `UsersService`, `UsersController`)
- [x] Registro de usuário com hash de senha (bcrypt)
- [x] DTO `CreateUserDto` com validação (class-validator)
- [x] Rota POST `/users` para criação de conta

**Backend — autenticação e JWT**
- [x] Módulo `Auth` (`AuthModule`, `AuthService`, `AuthController`)
- [x] DTO `LoginDto` e POST `/auth/login` retornando `{ access_token }`
- [x] Login com JWT (validação de senha com bcrypt, emissão de token)
- [x] JWT Guard (`JwtStrategy`, `JwtAuthGuard`) e Passport
- [x] Rotas `/transactions` (GET e POST) protegidas com JWT

## Pendentes

**Backend**
- [ ] Consumir API externa de pagamentos via Axios
- [ ] Mapear dados externos para `PaymentTransaction` e persistir no PostgreSQL
- [ ] Expor rota protegida para listagem de payment transactions (ex.: GET `/payment-transactions`)

**Próxima etapa ao retomar:** Hora 3 — API externa (instalar axios, criar serviço que chama a API, mapear para `PaymentTransaction`, persistir no PostgreSQL, expor GET protegido).

**Frontend**
- [ ] Setup React + TypeScript + TailwindCSS
- [ ] Implementar autenticação (login/registro)
- [ ] Armazenar token JWT
- [ ] Consumir backend via Axios
- [ ] Dashboard com listagem, filtro, loading e erro
- [ ] Tela de detalhes

## Guia passo a passo (aprox. 5 horas)

### Hora 1 — Base do backend
- [x] 1. Confirmar banco `payment_transaction` no PostgreSQL.
- [x] 2. Garantir TypeORM conectado no NestJS.
- [x] 3. Criar entidades `User` e `PaymentTransaction`.
- [x] 4. Criar módulos `Auth`, `Users`, `Transactions`.

### Hora 2 — Autenticação
- [x] 1. Criar DTOs de registro e login.
- [x] 2. Implementar `AuthService` e `AuthController`.
- [x] 3. Hash de senha com bcrypt.
- [x] 4. Login retorna JWT.
- [x] 5. Proteger rotas com JWT Guard.

### Hora 3 — API externa
- [ ] 1. Criar serviço para consumo da API externa (Axios).
- [ ] 2. Mapear dados externos para `PaymentTransaction`.
- [ ] 3. Persistir no PostgreSQL.
- [ ] 4. Expor rota protegida para listagem.

### Hora 4 — Frontend base
- [ ] 1. Criar projeto React + TypeScript + TailwindCSS.
- [ ] 2. Configurar Axios com baseURL.
- [ ] 3. Criar páginas de Login e Registro.
- [ ] 4. Configurar rotas com React Router.

### Hora 5 — Dashboard e detalhes
- [ ] 1. Dashboard consumindo o backend.
- [ ] 2. Implementar filtro, loading e erro.
- [ ] 3. Tela de detalhes completa.
- [ ] 4. Guard de rota no frontend.

---

## Análise do projeto

**Faz sentido?** Sim. O projeto está coerente como mini fullstack de aprendizado: autenticação JWT, consumo de API externa, PostgreSQL e frontend com React. A divisão em módulos (Users, Transactions) e o uso de DTOs seguem boas práticas.

### Pontos de atenção

| Item | Situação | Recomendação |
|------|----------|--------------|
| **Duas entidades de transação** | Existem `PaymentTransaction` (payment_transactions) e `Transaction` (transactions). O módulo atual usa só `Transaction`. O objetivo é persistir dados da API externa em `PaymentTransaction`. | Ao implementar a API externa (Hora 3), usar `PaymentTransaction` no fluxo (mapear e persistir). Decidir se `Transaction` vira histórico genérico ou se tudo unifica em uma entidade. |
| **Validação de DTO** | `CreateUserDto` usa `class-validator`, mas não há `ValidationPipe` global no `main.ts`. | Ativar no bootstrap: `app.useGlobalPipes(new ValidationPipe());` para que as validações do DTO rodem. |
| **Email único** | A entidade `User` não define `email` como único. | Usar `@Column({ unique: true })` em `email` e tratar conflito no `UsersService` (ex.: `BadRequestException` se email já existir). |
| **Credenciais no código** | Senha do banco está fixa em `app.module.ts`. | Usar variáveis de ambiente (ex.: `process.env.DATABASE_PASSWORD`, `DATABASE_URL`) e um `.env` (e manter `.env` no `.gitignore`). |
| **Dependências do backend** | O código usa `bcrypt` e `class-validator`; conferir se estão em `backend/package.json`. | Garantir no `backend`: `bcrypt`, `class-validator`, `@types/bcrypt` (dev). Assim o backend roda com `npm install` só na pasta backend. |

### Melhorias sugeridas para acrescentar

- [x] **ValidationPipe** global em `main.ts` para validação dos DTOs.
- [x] **Email único** na entidade `User` e tratamento de duplicata no registro (ConflictException).
- [x] **Dependências** `bcrypt`, `class-validator` e `@types/bcrypt` no `backend/package.json`.
- [ ] **Variáveis de ambiente** para banco (e depois para JWT secret).
- [x] **AuthModule** com `AuthService` e `AuthController` (login retornando JWT).
- [x] **Proteger** `GET/POST /transactions` com JWT Guard.
- [ ] (Opcional) **DTO de resposta** sem expor `password` (ex.: `UserResponseDto` ou `@Exclude()` no campo).
