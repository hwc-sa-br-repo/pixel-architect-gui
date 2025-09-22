# Pixel Architect GUI

Interface construída com React, Vite e Tailwind a partir do projeto publicado pela Lovable.

## Requisitos

- Node.js 18 ou superior (recomendamos gerenciar versões com [nvm](https://github.com/nvm-sh/nvm#installing-and-updating))
- npm 9 ou superior (instalado junto com o Node.js)

> 💡 Use `node -v` e `npm -v` para conferir se as versões instaladas atendem aos requisitos.

## Executando localmente (servidor de desenvolvimento Vite)

Use o servidor integrado do Vite para ter recarregamento automático durante o desenvolvimento:

```sh
git clone <URL_DO_REPOSITORIO>
cd pixel-architect-gui
npm install
npm run dev
```

O terminal exibirá o endereço local (por padrão `http://localhost:5173`). Pressione `Ctrl+C` para encerrar.

> ❗️ Se aparecer a mensagem `sh: 1: vite: not found`, significa que a instalação das dependências não foi concluída.
> Execute novamente `npm install` (mesmo em ambientes que usam `npm install --omit=dev`, os pacotes fundamentais como `vite`, `@vitejs/plugin-react-swc`, `tailwindcss` e `autoprefixer` são instalados como dependências regulares) e depois rode `npm run dev`.

## Servidor Node.js para a versão compilada

Para disponibilizar a interface pronta para produção em um servidor HTTP simples, adicionamos o arquivo `server.js`, que utiliza apenas módulos nativos do Node.js. Ele lê os arquivos da pasta `dist` (gerada após o build) e atende quaisquer rotas caindo em `index.html`, garantindo que o roteamento do React continue funcionando.

Siga os passos abaixo com atenção:

1. **Instale as dependências do projeto (somente na primeira vez):**
   ```sh
   npm install
   ```

2. **Gere os arquivos otimizados na pasta `dist`:**
   ```sh
   npm run build
   ```
   - O build empacota a aplicação para produção.
   - Se você alterar o código, execute novamente este comando antes de iniciar o servidor.

3. **Inicie o servidor HTTP local:**
   ```sh
   npm run start
   ```
   - O script executa `node server.js`.
   - O servidor verifica se a pasta `dist` existe e avisa caso o build ainda não tenha sido executado.
   - Por padrão, a aplicação ficará disponível em `http://localhost:4173`. Para usar outra porta, defina a variável de ambiente `PORT`, por exemplo: `PORT=3000 npm run start`.

4. **Encerrar o servidor:** pressione `Ctrl+C` no terminal onde ele está rodando.

### Como o servidor funciona

- Atende qualquer arquivo estático solicitado dentro da pasta `dist` (JavaScript, CSS, imagens, fontes, etc.).
- Para rotas não encontradas, retorna `index.html`, permitindo o funcionamento do `react-router-dom` em modo histórico.
- Não depende de bibliotecas externas (como Express); somente módulos nativos, garantindo compatibilidade em ambientes sem acesso ao npm registry.

## Dúvidas frequentes

### Posso editar via Lovable?

Sim. Basta abrir o [Projeto Lovable](https://lovable.dev/projects/1fa8663c-fc55-488b-84bd-4127e6aa08cd) e continuar a iteração. Alterações feitas lá serão refletidas neste repositório.

### Posso editar direto no GitHub?

Sim. Abra o arquivo desejado, clique em **Edit**, faça as mudanças e confirme o commit.

### Quais tecnologias compõem o projeto?

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

### Como publicar?

Abra o projeto na Lovable, clique em **Share → Publish** e siga as instruções. Para usar um domínio customizado, vá em **Project → Settings → Domains**.
