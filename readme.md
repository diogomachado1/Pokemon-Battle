# Pokemon-Battle

[![Netlify Status](https://api.netlify.com/api/v1/badges/c277eec1-27b7-4524-b61f-f4a7c4ee015e/deploy-status)](https://app.netlify.com/sites/thirsty-wozniak-76aaff/deploys)

Frontend: [https://thirsty-wozniak-76aaff.netlify.app/](https://thirsty-wozniak-76aaff.netlify.app/)

Backend: [https://diogo-pokemon-battle.herokuapp.com](https://diogo-pokemon-battle.herokuapp.com)

API-DOC: [https://diogo-pokemon-battle.herokuapp.com/doc](https://diogo-pokemon-battle.herokuapp.com/doc)


## Iniciando o banco

```bash
cd db-docker
docker-compose up -d 
```

## Iniciando a aplicação em modo dev

Preencha o arquivo `.env`.

```.env
DB_HOST=localhost           #Url do mssql
DB_USER=user123             #Usuario do mssql
DB_PASSWORD=senha123        #Senha do usuario do mssql
DB_NAME=database1           #Nome do database do mssql
DB_SCHEMA=schame1           #Schema do mssql
```
Utilize esses comandos:

```bash
npm i
npm db:migrate //rodar as migrações do banco
npm run dev
```

## Rodando os testes da aplicação

Os teste de integração irá utilizar o banco sqlite.

Utilize o seguinte comando para os testes:
```bash
npm run test
```

Modo watch:
```bash
npm run test:watch
```

## Build de produção
Para criar o build de produção use o comando:
```bash
npm run build
```

## Rodando em produção
Para rodar em produção use o comando:

`Obs: antes de executar o comando de produção é necessário executar "npm run build"`
```bash
npm start
```
