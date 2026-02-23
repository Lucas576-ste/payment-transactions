# Payment Transaction — Mini Projeto Fullstack

**Status:** Em desenvolvimento

Projeto fullstack de pagamentos com autenticação JWT, consumo de API externa e integração completa entre frontend e backend. O foco é construir uma base sólida de arquitetura e boas práticas, priorizando segurança, organização de código e persistência de dados.

## Objetivo

Entregar uma aplicação que permita:
- Cadastro e login de usuários com JWT
- Consumo de uma API externa de pagamentos no backend
- Persistência de usuários e dados consumidos no PostgreSQL
- Exposição de dados para o frontend com rotas protegidas

## Stack utilizada

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

## Funcionalidades principais

**Autenticação**
- Registro de usuário
- Login com JWT
- Rotas protegidas com JWT Guard

**Pagamentos**
- Consumo de API externa via backend
- Persistência dos dados no PostgreSQL
- Listagem e filtro dos dados

## Telas do frontend

1. **Login** — autenticação e persistência do token
2. **Registro** — criação de conta
3. **Dashboard** — listagem, filtro, loading e erro
4. **Detalhes** — visão completa de um item

## Status atual

- Estrutura inicial do backend configurada
- Conexão com PostgreSQL em andamento
- Entidades base definidas

## Próximas etapas

- Implementar módulo de autenticação
- Integrar consumo da API externa
- Construir o frontend completo
