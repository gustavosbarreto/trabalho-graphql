# Backend

## Executando

Antes de executar o projeto é preciso instalar os módulos do npm:

```$ npm install```

Para um funcionamento correto da aplicação é necessário executar o projeto
com o comando `npm start` para que as migrações sejam executadas antes
de iniciar o servidor GraphQL.

Quando a aplicação é executada pela primeira vez um usuário administrador inicial
é criado com o email `admin@example.com` e com a senha `admin`.

## Variáveis de ambiente

* `SECRET`: Secret utilizado para assinar o token JWT (default: `secret`)
* `DB_FILE`: Caminho para o arquivo do banco de dados sqlite (default: `./db.sqlite3`)
