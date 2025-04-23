# 📄 Permissions Module

https://files.fm/u/bvk3vsbfye

Este módulo é responsável pelo gerenciamento de **grupos de usuários (permissões)**, permitindo a visualização, criação, edição, ativação/desativação e filtragem de permissões no sistema.

## 🧩 Componentes e Funcionalidades

### 🛠 Componente Principal: `PermissionPageComponent`
- Interface protegida com verificação de permissão via `userAuth`.
- Exibe uma tabela interativa com todas as permissões cadastradas.
- Permite **filtrar permissões por nome**.
- Suporte à **paginação e seleção de quantidade de itens por página**.
- Suporte a **modais para adicionar, visualizar e editar permissões**.
- Componente de carregamento (`CircularProgress`) enquanto os dados estão sendo carregados.

### 📊 Tabela (CollapsibleTable)
- Mostra todas as permissões recuperadas da API.
- Opções para **editar** ou **visualizar** cada permissão individualmente.
- Alterna o status da permissão entre **ativo/inativo** com atualização automática.

### 🧾 Modais
- `FormPermissionRegisterModal`:
  - Recebe a operação: `insert`, `edit` ou `view`.
  - Usado para criação, edição e leitura de dados de uma permissão.

## 📤 Requisições à API

- **Listagem de permissões**
  ```ts
  POST /permission/list/:limit/:offset
  Body: { filter: { name } }
  ```

- **Atualização do status (ativo/inativo)**
  ```ts
  PUT /permission/update/:refPermission
  Body: { active: boolean }
  ```

## 📂 Estado Global do Componente

```ts
const [permissionList, setPermissionList] = useState<[]>([]);
const [columns, setColumn] = useState<[]>([]);
const [filterPermission, setFilterPermission] = useState<filterPermissionProps>({ name: '' });
const [openRegisterModal, setOpenRegisterModal] = useState<boolean>(false);
const [loading, setLoading] = useState<boolean>(false);
```

## 🧪 Filtros
- Filtro principal: **Nome**
- Botão de limpar filtro.
- Ação de `Filtrar` dispara nova chamada para API com base nos critérios definidos.

## 🔒 Segurança
- Autenticação com `userAuth('permission')` garantindo que apenas usuários com acesso vejam a tela.

## 🖼 Imagens
- Caso o usuário não tenha acesso, é exibida uma imagem de acesso negado (`403.svg`).

## 📌 Requisitos
- Tipagens com `TypeScript`
- Integração com API via `axios`
- Componentes reutilizáveis (`InputComponent`, `DeleteComponentModal`, etc)
- Estilização baseada em Tailwind CSS

---

Desenvolvido por Eric Campos 🚀
