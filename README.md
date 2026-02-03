# Pixel Architect GUI

## Requisitos

- Node.js 18 ou superior
- npm 9 ou superior

## Setup rapido

1. Clone o repositorio e entre na pasta:
   ```sh
   git clone <URL_DO_REPOSITORIO>
   cd pixel-architect-gui
   ```

2. Instale as dependencias:
   ```sh
   npm install
   ```

## Rodar em desenvolvimento

```sh
npm run dev
```

Abra o endereco que o terminal mostrar, normalmente http://localhost:5173.

## Gerar e rodar a versao de producao

1. Gere o build:
   ```sh
   npm run build
   ```

2. Inicie o servidor:
   ```sh
   npm run start
   ```

A aplicacao fica em http://localhost:4173. Para outra porta, use:

```sh
PORT=3000 npm run start
```
