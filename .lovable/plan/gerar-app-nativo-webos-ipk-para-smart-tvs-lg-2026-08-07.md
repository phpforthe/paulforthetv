# Gerar app nativo webOS (.ipk) para Smart TVs LG

## Contexto atual

O projeto já é um web app otimizado para navegador de TV (TanStack Start + React + hls.js). O caminho mais curto para ter um ícone na home da webOS LG é criar um app webOS nativo que "embrulha" esse web app, ao invés de reescrever tudo.

## Abordagem escolhida

Criar um wrapper webOS nativo que carrega a URL publicada do app dentro de um `WebView`/`window` do webOS. Isso mantém todas as telas, navegação DPad, player e API Xtream já desenvolvidos, sem duplicar código.

## Entregáveis do plano

1. **Estrutura de app webOS** na pasta `webos-app/`:
   - `appinfo.json` (id, versão, título, ícone, resolução, recursos necessários).
   - `index.html` inicial que carrega a URL publicada do projeto.
   - `icon.png` (icones no formato exigido pela LG).
   - Script de inicialização que ajusta o viewport para a resolução da TV e faz `location.href` para o app publicado.

2. **Configuração de build**:
   - Adicionar script `build:webos` no `package.json` para copiar a estrutura e gerar o `.ipk`.
   - Garantir que a app seja carregada em tela cheia, sem zoom, e com cursor escondido.

3. **Ajustes de integração webOS no web app** (se necessário):
   - Detectar quando está rodando dentro do webOS wrapper para desabilitar scroll padrão e usar teclas de back/exit corretamente.
   - Adicionar suporte ao botão BACK do controle remoto da LG mapeando a tecla `Backspace`/`Esc` para navegação interna.

4. **Documentação de instalação** (`webos-app/README.md` ou seção no README principal) explicando:
   - Como ativar o Modo Desenvolvedor na TV LG.
   - Como instalar a CLI `ares-cli` do webOS SDK.
   - Como empacotar (`ares-package`) e instalar (`ares-install`) na TV.

## O que o usuário precisa fazer depois

1. Publicar o web app (gerar URL pública).
2. Ativar o Modo Desenvolvedor na webOS TV (passcode de 6 dígitos).
3. Conectar o PC na mesma rede da TV.
4. Instalar o webOS SDK / `ares-cli`.
5. Rodar `ares-package` para gerar o `.ipk` e `ares-install` para enviar para a TV.

## Alternativa mencionada e descartada

- Publicar apenas o web app e abrir pelo navegador da TV: rejeitada pelo usuário, que prefere ícone nativo na home.

## Nota técnica

O webOS usa um motor Chromium (WebKit/Blink) moderno, então o app React + hls.js existente é compatível. O wrapper apenas fornece o shell, ícone e integração com a plataforma.
