# BARBER STUDIO — prévia de design

Prévia interativa em Next.js App Router, TypeScript, Tailwind, Motion e React Three Fiber. Identidade monocromática, Manrope hospedada localmente, galeria editorial, menu mobile e estudo 3D de navalha com fallback leve.

## Executar

Node.js 24: `npm ci`, `npm run dev`. Produção: `npm run build` e `npm start`.

Nenhuma variável de ambiente ou conta de banco de dados é necessária. `NEXT_PUBLIC_SITE_URL` é opcional para o sitemap.

## O que a prévia faz

- Páginas inicial, sobre, serviços, profissionais, galeria, contato e agendamento.
- Agendamento ilustrativo com seleção de serviço, profissional, data e horário e resumo local. Não recebe dados pessoais, não envia requisições de reserva e não cria agendamentos reais.
- `/admin`: painel demonstrativo público, com abas e dados fictícios identificados. Não representa uma área administrativa autenticada.
- O endpoint de reservas recusa gravações. Os arquivos SQL da pasta `supabase/` são apenas material anterior arquivado; não são usados pela prévia.
- Contatos, equipe, preços e fotografias devem ser personalizados antes de uma eventual versão comercial. Fotografias do Unsplash são ilustrativas e não representam trabalhos da equipe.

## Vercel

Importe `011bigodeee-eng/Barbearia` na Vercel, diretório raiz do repositório, framework Next.js. `vercel.json` define instalação e build. Não cadastre variáveis de Supabase. Após a conexão com GitHub, novos commits na branch de produção geram deploys automaticamente. Verifique em Settings → Git qual branch é usada para produção.

As fotografias usam `images.unsplash.com`. A rede deste ambiente bloqueou esse domínio; a liberação foi salva no rascunho de configuração, mas ainda precisa ser aplicada. Isso impediu a validação local das fotos, independentemente do build da aplicação.

## Verificações

`npm test`: validações de entrada preservadas como base para evolução futura. `npm run lint`: checagem TypeScript. `npm run build`: build de produção.

Com Chromium em `/usr/bin/chromium` e o servidor em execução, `npm run test:browser` verifica rotas, menu mobile, galeria e fluxo demonstrativo de agendamento. Não comprova reservas reais, pois elas estão propositalmente desativadas. O teste informa o estado das imagens separadamente.

## Direção white luxury

A identidade atual usa superfícies brancas, Manrope, tipografia preta e fotografias monocromáticas. A intro original usa GSAP e profundidade tipográfica em CSS: feixe de luz, marca metálica, transição branca e alinhamento com a marca na home. Dura aproximadamente 3,3 segundos, tem botão de pular e Escape, e é omitida com `prefers-reduced-motion`. A sessão usa `sessionStorage` com fallback em memória; a intro não se repete ao navegar. Um limite independente de 4 segundos libera o conteúdo se a animação não terminar. Não há som ou recursos da Netflix.

Configure `NEXT_PUBLIC_BRAND_NAME` opcionalmente antes do build para personalizar o nome na intro, navegação, rodapé e metadados. O valor padrão vem de `lib/content.ts`. Os quatro pilares editoriais ficam em `highlights` no mesmo arquivo. Não existe edição administrativa persistente nesta prévia.

Os cards têm profundidade sutil no mouse e são estáticos com movimento reduzido. A navalha 3D carrega apenas perto da seção em desktops compatíveis; usa geometria original, materiais físicos, iluminação de estúdio e fallback CSS em mobile, movimento reduzido ou falha gráfica. Fotografias têm `srcset`, lazy loading e fallback editorial identificado quando a rede falha.

O agendamento mantém a simulação local, agora em quatro etapas com progresso, volta preservando seleção e resumo lateral. Não há etapa de dados pessoais ou chamada de gravação. A integração de banco continua desativada conforme solicitado anteriormente.
