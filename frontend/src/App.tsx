import UsuarioList from "./components/UsuarioList";
import PermissaoList from "./components/PermissaoList";
import ProdutoList from "./components/ProdutoList";

function App() {
    return (
        <div>
            <h1>Usuários cadastrados</h1>
            <UsuarioList />

            <h1>Permissões cadastradas</h1>
            <PermissaoList />

            <h1>Produtos cadastrados</h1>
            <ProdutoList />
        </div>
    );
}

export default App;