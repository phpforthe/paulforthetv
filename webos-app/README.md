# Instalação na Smart TV LG (webOS)

O app gerado é um **web app** otimizado para TV. Para aparecer como ícone na home da LG, ele está embrulhado em um app nativo webOS (`.ipk`).

## Resumo do fluxo

1. Publique o web app para obter uma URL pública.
2. Configure essa URL no wrapper webOS.
3. Empacote o wrapper com `ares-package`.
4. Instale na TV com `ares-install`.

## 1. Publique o web app

No editor Lovable, clique em **Publish** e aguarde a URL pública (ex: `https://seu-app.lovable.app`).

## 2. Configure a URL no wrapper

Edite `webos-app/config.js`:

```js
window.WEBOS_APP_URL = "https://seu-app.lovable.app";
```

## 3. Instale o webOS SDK (CLI)

Baixe e instale a versão para seu sistema:

- https://webostv.developer.lge.com/develop/tools/cli-installation

Confirme que o comando está no PATH:

```sh
ares --version
```

## 4. Empacote o app

```sh
npm run build:webos
```

Ou manualmente:

```sh
cd webos-app
ares-package .
```

Será gerado um arquivo como `com.lg.iptv.terezinhaconceicao_1.0.0_all.ipk`.

## 5. Ative o Modo Desenvolvedor na TV

1. Na TV, abra o app **Configurações** → **Geral** → **Sobre esta TV**.
2. Clique em **Versão do webOS TV** várias vezes até aparecer a tela de desenvolvedor.
3. Ative **Modo de desenvolvedor** e anote o passcode de 6 dígitos.
4. Anote o IP da TV (Configurações → Rede → Conexão de rede → Endereço IP).

## 6. Registre a TV no CLI

```sh
ares-setup-device --add tv-lg
```

Siga as instruções: escolha um nome, digite o IP e o passcode de 6 dígitos.

## 7. Instale na TV

```sh
ares-install --device tv-lg com.lg.iptv.terezinhaconceicao_1.0.0_all.ipk
```

O ícone **LG IPTV Player** aparecerá na home da TV.

## Atualizações

Para atualizar o app:

1. Publique novamente o web app (se a URL mudou, atualize `webos-app/config.js`).
2. Reempacote com `ares-package`.
3. Reinstale com `ares-install`.

## Solução de problemas

- **Tela branca**: verifique se a URL em `config.js` está publicada e acessível.
- **Botão Voltar não funciona**: a TV envia a tecla `Backspace`/`Esc` (código 461). O app já captura esses eventos na navegação espacial.
- **CORS/mixed content**: o web app usa um proxy próprio (`/api/public/stream`) para contornar HTTPS→HTTP. Funciona automaticamente quando publicado.

## Notas

- O wrapper é apenas uma casca: todo conteúdo, player e navegação vêm do web app publicado.
- O webOS usa um motor Chromium moderno, então React, hls.js e a navegação DPad já implementadas são compatíveis.
