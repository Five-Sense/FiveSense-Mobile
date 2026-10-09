# Project Overview

## Problema

Organizações que praticam 5S precisam controlar equipes, materiais e ocorrências de forma centralizada, com acesso restrito por função. O app entrega essa operação em dispositivos móveis e tablets.

## Perfis

- **Administrador:** CRUD de usuários (Administrador, Gestor, Visualizador).
- **Gestor:** CRUD de Problemas, Equipes e Materiais; acompanha o status de 5S das equipes; recebe ocorrências por e-mail.
- **Visualizador:** consulta Equipes e Materiais, registra Ocorrências, altera o status da própria equipe e consulta o calendário de 5S.
- **Todos:** login, logout, recuperação e alteração de senha.

## Objetivo

Implementar a apresentação mobile do sistema conforme o Documento de Requisitos 5S v1.0, o briefing de design e o Figma, consumindo a API do projeto.

## Escopo

- Login e logout (RF001, RF002). Recuperação e alteração de senha (RF003, RF004) dependem de endpoints que a API ainda não tem.
- Usuários (RF005 a RF008), Problemas (RF009 a RF013), Ocorrências (RF014 a RF016).
- Equipes (RF017 a RF026), Materiais (RF027 a RF033).
- Controle de acesso por perfil na interface (NF002).
- Pull to refresh, skeleton e tratamento de erro em todas as listas e chamadas de API.

## Plataformas

- Android e iOS (celular, referência 390x844) e tablet Android (1280x800, paisagem).
- Desktop (1920x1080) via Expo web. Tema claro apenas.

## Fora do escopo

- Relatórios e dashboards analíticos.
- Integrações com outras APIs externas.
- Backend, envio de e-mails e geração de token (responsabilidade da API).
- Modo escuro.

## Simplicidade

O app faz apenas o que o escopo pede. Sem camadas, bibliotecas ou abstrações sem uso real.
