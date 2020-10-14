# Database API

Verificar as versões abaixo. Tanto para ambiente de desenvolvimento quanto produção:

-   **node -v** - 12.16.3
-   **npm -v** - 6.14.4
-   **yarn -v** - 1.22.5

Recomendado instalar e utilizar o **Yarn**.

# Comandos

Abaixo lista de comandos disponíveis na aplicação

## Dev

**yarn dev**

starta a aplicação em modo de desenvolvimento com live reload (códigos da pasta **src**)

## Start

**yarn start**

starta a aplicação a partir da pasta **build**, permitindo testar a aplicação como se estivesse em produção.

## Env

**yarn env [user pass]**

gera arquivo .env com usuário e senha do banco criptografados.

obs: também gera uma **APP_SECRET** de 128 bytes que é utilizado para descriptografar o token. Sempre que o **APP_SECRET** for trocado deve gerar um novo token.

Ex: **yarn env usuario_banco senha_banco**

## Token

**yarn token [days]**

gera o **Bearer Token** que deve ser passado no header das requisições feitas para a API. É utilizado o **APP_SECRET** do arquivo .env para criar o token.

Pode passar como parametro o número de dias. Se nenhum parâmetro for passado o token não vai ira ter validade.

Ex:
-    **yarn token 7d** - gera um token que expira em 7 dias.
-    **yarn token 30d** - gera um token que expira em 30 dias.
-    **yarn token** - gera um token sem data de validade.

## Build

**yarn build**

gera o build convertido para es5 utilizado pelo servidor.

**ATENÇÃO**

Apenas a pasta **src** é gerada no build. Abaixo a lista de arquivos e pastas obrigatório na raiz da aplicação do **IIS**:

-    **build** - aplicação
-    **node_modules** - dependências
-    **public/temp** - diretório de arquivos temporários
-    **public/static** - diretório de arquivos estaticos
-    **.env** - arquivo de configuração da aplicação
-    **package.json** - arquivo de configuração do projeto
-    **README.MD** - Arquivo explicativo
-    **web.config** - arquivo de configuração do aplicativo no IIS
-    **yarn.lock** - arquivo de segurança das dependências

# Servidor - IIS

Necessário instalar o **IIS Node** e também o **NVM** (Node Version Manager)

## Commandos NVM

-   **nvm list** - lista as versões do node instaladas
-   **nvm install v12.16.3** - instala a versão do node utilizada na API
-   **nvm use 12.16.3** - seta a versão a ser utilizada

**ir na pasta do NVM na versão 12.16.3 e dar permissão para o IIS acessar**

# Logs

Existem dois tipos de log na aplicação:
-    **development** - log mais completo. Geralmente utilizados para as rotas **Database** pois mostra o SQL e os parâmetros recebidos
-    **production** - log mais simples com algumas informações das requisições feitas na API

Para alterar o tipo de log basta alterar o valor da variável **NODE_ENV** no arquivo **.env**

Os logs são gerados dentro da pasta **build/iinode**
