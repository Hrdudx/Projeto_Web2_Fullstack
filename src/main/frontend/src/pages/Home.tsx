import { Link } from "react-router-dom";

function Home() {
    return (
        <div>
            <h1>Bem-vindo ao sistema!</h1>
            <Link to="/usuarios">Ir para Usuários</Link>{" | "}
            <Link to="/atribuir-permissoes">Atribuir Permissões</Link>{" | "}
            <Link to="/permissoes">Permissões</Link>{" | "}
            <Link to="/produtos">Produtos</Link>
        </div>
    );
}

export default Home;
