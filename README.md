### Desafio Backend

## Instruções para Rodar o projeto:

## AMBIENTE COM NODEJS E MYSQL:
 - Criar banco de dados no mysql
 - Colocar as credenciais do seu BD no .env : DATABASE_URL="mysql://USUARIO:SENHA@localhost:3306/NOME_DB"

## PASSO A PASSO:
 - git clone
 - npm install ou yarn install
 - npx prisma migrate dev
 - yarn start:dev

 ## Testes:

- Importar arquivo backend.json no Insomnia para testar endpoints ou Swagger em http://localhost:3000/api/v1


## Requisitos e Extras:

[x] - Endpoint para listar todos emblemas registrados

[x] - Endpoint para resgatar um emblema pelo slug garantindo que o mesmo emblema não seja resgatado duas vezes pelo mesmo usuário.

[x] - Listar todos os emblemas já resgatados por um usuário específico.

[x] - Implementar autenticação

[x] - Documentar todos os endpoints da API, utilizando por exemplo Swagger.

[x] - Implementar paginação no endpoint de listagem de emblemas

[x] - Adicionar a capacidade de filtrar os emblemas pelo nome no endpoint de listagem de emblemas.



