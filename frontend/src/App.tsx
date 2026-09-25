import UsuariosPage from "./pages/UsuariosPage";
import PermissoesPage from "./pages/PermissoesPage";
import ProdutosPage from "./pages/ProdutosPage";

function App() {
    return (
        <div>
            <h1>Usuários cadastrados</h1>
            <UsuariosPage />

            <h1>Permissões cadastradas</h1>
            <PermissoesPage />

            <h1>Produtos cadastrados</h1>
            <ProdutosPage />
        </div>
    );
}

export default App;
