# Database API

node 12.16.1
npm 6.13.4
yarn 1.19.0

## Comandos

Se não tiver yarn instalado, uitilizar npm run

yarn env [user pass] - gera arquivo .env com usuário e senha do banco criptografados
npm run env [user pass]

obs: também gera uma AUTH_SECRET de 128 bytes

yarn token - gera o token de autenticação na API que deve ser informado no .env do middleware
npm run token

Sempre que o AUTH_SECRET for trocado deve gerar um novo token e alterar no .env do middleware


yarn build - gera o build convertido para es5 utilizado pelo servidor
