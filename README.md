# SIGA - Sistema Integrado de Gestão Agropecuária (Monorepo)

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

Este é o repositório central (monorepo) para o projeto **SIGA**, uma plataforma open-source de gestão interna para secretarias de desenvolvimento agropecuário.

## 🏛️ Estrutura do Repositório

Este monorepo contém todos os pacotes e aplicações que compõem o ecossistema SIGA. A estrutura de pastas é a seguinte:

```tree
.
├── clients/              # Contém os aplicativos de frontend (clientes)
│   ├── android/          # Cliente nativo para Android (Kotlin + Jetpack Compose)
│   ├── web/              # Cliente web (React/Next.js)
│   └── windows/          # Cliente nativo para Windows (WinUI 3 + C#)
│
├── packages/             # (Opcional) Pacotes compartilhados
│   └── api-types/        # Ex: Tipos TypeScript da API
│
└── services/             # Contém os serviços de backend
    └── backend/          # A API central (NestJS)
```

## 🚀 Como Começar

Cada aplicativo e serviço dentro deste monorepo possui seu próprio `README.md` com instruções detalhadas de configuração e execução.

- Para configurar o **backend**, veja as instruções em [`/services/backend/README.md`](/services/backend/README.md).
- Para configurar o **cliente web**, veja as instruções em [`/clients/web/README.md`](/clients/web/README.md).
- *(... e assim por diante para os outros clientes)*

## 🤝 Contribuição

Este é um projeto open-source e contribuições são muito bem-vindas! Se você deseja contribuir, por favor, leia nosso guia de contribuição (será adicionado em breve) para entender nosso fluxo de trabalho.

## 📄 Licença

Este projeto é distribuído sob a **Licença GNU GPLv3**. Veja o arquivo [LICENSE](./LICENSE) para mais detalhes.
