import { NavLink, Outlet } from "react-router-dom";

function Layout() {
    return (
        <div>
            <nav className="menu">
                <NavLink to="/" end>Home</NavLink>
                <NavLink to="/usuarios">Usuários</NavLink>
                <NavLink to="/atribuir-permissoes">Atribuir Permissões</NavLink>
                <NavLink to="/permissoes">Permissões</NavLink>
                <NavLink to="/produtos">Produtos</NavLink>
            </nav>
            <main className="conteudo">
                <Outlet />
            </main>
        </div>
    );
}

export default Layout;
