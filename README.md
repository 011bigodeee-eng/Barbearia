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
