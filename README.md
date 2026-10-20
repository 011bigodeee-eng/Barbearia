# BARBER STUDIO — prévia de design

Prévia interativa em Next.js App Router, TypeScript, Tailwind, Motion e React Three Fiber. Identidade monocromática, Manrope hospedada localmente, galeria editorial, menu mobile e estudo 3D de máquina cromada com fallback leve.

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

Os cards têm profundidade sutil no mouse e são estáticos com movimento reduzido. A máquina 3D carrega apenas perto da seção em desktops compatíveis; usa geometria original, materiais físicos, iluminação de estúdio e fallback CSS em mobile, movimento reduzido ou falha gráfica. Fotografias têm `srcset`, lazy loading e fallback editorial identificado quando a rede falha.

O agendamento mantém a simulação local, agora em quatro etapas com progresso, volta preservando seleção e resumo lateral. Não há etapa de dados pessoais ou chamada de gravação. A integração de banco continua desativada conforme solicitado anteriormente.

A cobertura inicial é instalada por um script no HTML, antes da primeira pintura, para evitar que o site apareça antes da intro. Sessões que já viram a intro e movimento reduzido abrem diretamente. Se os bundles demorarem mais de cinco segundos, a cobertura é removida e a intro tardia é descartada. Sem JavaScript, a cobertura não é instalada.

## The Art of Grooming — experiência editorial

A home agora é uma narrativa em cinco capítulos: identidade, precisão, artistas, experiência e próximo corte. A marca responde ao mouse com inércia e a fotografia principal expande na rolagem nativa. A intro mantém a cobertura anterior à primeira pintura e acrescenta montagem tipográfica por fragmentos, sem repetir durante a sessão.

Os serviços são apresentados em linhas numeradas, com fotografia que segue o cursor no desktop. Em touch, telas menores e movimento reduzido, as imagens ficam visíveis sem depender de hover. O cursor complementar não substitui o cursor nativo nem captura cliques.

A máquina é um modelo procedural original com corpo extrudado e biselado, textura de metal escovado gerada localmente, dentes, parafusos, chave e acabamento de empunhadura. O scroll move a apresentação, o mouse altera o ângulo e o arraste permite girar. Botões de detalhe mudam o enquadramento e têm uma opção de restaurar. Em mobile, movimento reduzido ou ausência de WebGL, uma ilustração CSS mantém a seção e os detalhes acessíveis. Nenhum modelo externo foi baixado.

A galeria suporta filtros, tela cheia, zoom, botões anterior/próximo, teclas de seta, Escape e gesto lateral no celular. O menu editorial pode ser aberto também no desktop. Fotos de equipe, contatos e avaliações não são inventados como dados reais.

Com o servidor ativo, `npm run test:graphics` usa Chromium/SwiftShader para exercitar WebGL, detalhes, arraste, restauração e troca para o fallback de movimento reduzido. `npm run test:browser` mantém os testes de entrada anterior à hidratação e acrescenta as novas interações. Não são benchmarks de desempenho nem validação de fotos externas.
