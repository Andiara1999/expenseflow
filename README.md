# ExpenseFlow

API REST para gestão de despesas corporativas.

## Tecnologias
- Laravel
- PostgreSQL
- Docker
- Sanctum

## Funcionalidades
- Autenticação com token
- CRUD de categorias
- CRUD de despesas
- Aprovação e recusa
- Pagamento de despesas

## Regras de negócio
- Usuário cria despesas
- Gestor aprova ou recusa
- Financeiro marca como paga

## Como rodar

```bash
docker compose up -d
cd backend/expenseflow-api
php artisan serve
