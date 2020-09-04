# Database API

-   node 12.16.1
-   npm 6.13.4
-   yarn 1.19.0

## Comandos

Se não tiver **yarn** instalado, uitilizar **npm run**

### Env

gera arquivo .env com usuário e senha do banco criptografados

obs: também gera uma **APP_SECRET** de 128 bytes que é utilizado para descriptografar o token. Sempre que o **APP_SECRET** for trocado deve gerar um novo token

**yarn env [user pass]**

### Token

gera o Bearer Token que deve ser passado no header das requisições feitas para a API

**yarn token**

### Build

gera o build convertido para es5 utilizado pelo servidor

**yarn build**

## Servidor - IIS

Necessário instalar o IIS Node e também o NVM (Node Version Manager)

### instalar IIS Node
-   instalar nvm
-   nvm install v12.16.3
-   nvm use 12.16.3

**ir na pasta do NVM na versão do node e dar permissão para o IIS acessar.**
