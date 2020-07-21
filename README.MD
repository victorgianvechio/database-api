# Database API

node 12.16.1
npm 6.13.4
yarn 1.19.0

## Comandos

Se não tiver **yarn** instalado, uitilizar **npm run**

**yarn env [user pass]** - gera arquivo .env com usuário e senha do banco criptografados

**npm run env [user pass]**

obs: também gera uma **APP_SECRET** de 128 bytes

**yarn token** - gera o token de autenticação na API que deve ser informado no **.env** do **middleware**

**npm run token**

Sempre que o **APP_SECRET** for trocado deve gerar um novo token e alterar no **.env** do **middleware**


**yarn build** - gera o build convertido para es5 utilizado pelo servidor


## Servidor - IIS

### instalar IIS Node
-   instalar nvm
-   nvm install v12.16.3
-   nvm use 12.16.3

**ir na pasta do NVM na versão do node e dar permissão para o IIS acessar.**
