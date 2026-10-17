# Projeto Web 2 Fullstack

Projeto da disciplina **Programação Web II** (Spring Boot + React), seguindo as Aulas 01 a 08.
Entidades: `Usuario`, `Permissao` e `Produto` (entidade de interesse escolhida na Aula 02).

## Como rodar

**Pré-requisitos:** Java 21 e Node.js 20+.

**Back-end** (na pasta do projeto):

| Sistema | Comando |
|---|---|
| Windows | `.\mvnw.cmd spring-boot:run` |
| Linux / macOS | `./mvnw spring-boot:run` |

API em `http://localhost:8080/api`.

**Front-end** (outro terminal):

```bash
cd src/main/frontend
npm install
npm run dev
```

Abra `http://localhost:5173`.

Para ter permissões disponíveis ao testar (Aula 07), cadastre pela tela **Permissões** ou:

```bash
curl -X POST http://localhost:8080/api/permissoes -H "Content-Type: application/json" -d '{"nome": "ADMIN", "descricao": "Acesso total"}'
curl -X POST http://localhost:8080/api/permissoes -H "Content-Type: application/json" -d '{"nome": "USER", "descricao": "Acesso comum"}'
```

H2 Console: `http://localhost:8080/h2-console` (JDBC URL `jdbc:h2:file:./database.db`, usuário `sa`, sem senha).

## O que cada aula pede e onde está

| Aula | Conteúdo | Onde está |
|---|---|---|
| 01 | Spring Boot (Maven, Java 21, `br.ueg.trindade`) com Security, Web, Rest Repositories, DevTools, JPA, H2 e PostgreSQL; React (Vite + TS) dentro de `src/main` | `pom.xml`, `src/main/frontend/` |
| 02 | API REST, classe `Usuario`, senha oculta com `@JsonIgnore`, `Permissao` e entidade de interesse (`Produto`) | `model/` |
| 03 | `@Entity`, `@Id`, `@GeneratedValue`, `JpaRepository`, H2 no `application.properties` | `model/`, `repository/`, `application.properties` |
| 04 | Axios (`api.ts`), CORS, componentes com props, `useState`/`useEffect`, carregando e erro | `services/api.ts`, `components/*Item.tsx`, `pages/` |
| 05 | CRUD completo (POST, GET, PUT, DELETE com `@PathVariable`) e formulários controlados | `controller/`, `components/*Form.tsx` |
| 06 | Camadas Controller → Service → Repository; `pages/` × `components/`; regra de negócio no Service | `service/`, `pages/` |
| 07 | `@ManyToMany` `Usuario` ↔ `Permissao` (tabela `usuario_permissao`), `GET`/`PUT /api/usuarios/{id}/permissoes`, tela de atribuição | `model/Usuario.java`, `UsuarioService.atribuirPermissoes`, `pages/UsuarioPermissoesPage.tsx` |
| 08 | React Router: `BrowserRouter`, `Layout` com `NavLink` + `Outlet`, `Home`, `/usuarios/:id` com `useParams`/`useNavigate`, `/atribuir-permissoes`, 404 | `main.tsx`, `components/Layout.tsx`, `App.tsx`, `pages/` |

**Exercícios feitos**
- Aula 06: `PermissaoService` + `PermissaoController` + `PermissoesPage`; `Produto` em camadas; regras no Service:
  e-mail único (`UsuarioService`) e preço maior que zero (`ProdutoService`).
- Aula 08: `PermissoesPage` em `/permissoes` no menu, `PermissaoDetailPage` em `/permissoes/:id` e `useNavigate`
  no `UsuarioForm` para ir a `/usuarios` após salvar.

**Observação (Aula 07):** o slide usa `@JsonManagedReference` / `@JsonBackReference`. Com eles o JSON sai certo,
mas o `POST /api/usuarios` dá erro 500, porque o Jackson não aceita `@JsonBackReference` em uma coleção
(`Set<Usuario>`). Por isso `Permissao.usuarios` usa `@JsonIgnore`, que corta a recursão do mesmo jeito.

## Endpoints

| Recurso | GET (todos) | GET por id | POST | PUT | DELETE |
|---|---|---|---|---|---|
| Usuários | `/api/usuarios` | `/api/usuarios/{id}` | `/api/usuarios` | `/api/usuarios/{id}` | `/api/usuarios/{id}` |
| Permissões | `/api/permissoes` | `/api/permissoes/{id}` | `/api/permissoes` | `/api/permissoes/{id}` | `/api/permissoes/{id}` |
| Produtos | `/api/produtos` | `/api/produtos/{id}` | `/api/produtos` | `/api/produtos/{id}` | `/api/produtos/{id}` |

Permissões do usuário: `GET /api/usuarios/{id}/permissoes` e `PUT /api/usuarios/{id}/permissoes` com a lista de ids (ex.: `[1, 2]`).

## Telas (rotas do React Router)

| Rota | Tela |
|---|---|
| `/` | Home |
| `/usuarios` | CRUD de usuários (nome leva ao detalhe) |
| `/usuarios/:id` | Detalhe do usuário |
| `/atribuir-permissoes` | Atribuir permissões a um usuário |
| `/permissoes` | CRUD de permissões |
| `/permissoes/:id` | Detalhe da permissão |
| `/produtos` | CRUD de produtos |
| `*` | Página não encontrada |
