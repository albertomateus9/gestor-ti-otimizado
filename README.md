# Gestor TI Otimizado

Versão limpa e otimizada do Gestor TI para deploy na Vercel, com React, Vite, TypeScript, Tailwind, Supabase, TanStack Query e gráficos carregados sob demanda.

## Configuração

Crie um `.env.local` fora do Git:

```bash
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
```

As mesmas variáveis devem ser cadastradas no projeto da Vercel.

## Scripts

```bash
npm install
npm run dev
npm run test
npm run lint
npm run build
```

## Deploy

O arquivo `vercel.json` inclui rewrite para SPA, permitindo refresh e acesso direto a rotas como `/computadores`, `/chamados`, `/relatorios` e `/configuracoes`.

## Segurança

Nenhuma credencial de usuário, URL privada ou chave Supabase deve ser versionada. A aplicação usa somente variáveis `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`.
