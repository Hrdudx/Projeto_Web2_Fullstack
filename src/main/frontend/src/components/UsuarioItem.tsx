import { Link } from "react-router-dom";
import type { Usuario } from "../types/Usuario";

interface UsuarioItemProps {
    usuario: Usuario;
    onEditar?: () => void;
    onExcluir?: () => void;
}

function UsuarioItem({ usuario, onEditar, onExcluir }: UsuarioItemProps) {
    return (
        <li>
            <Link to={`/usuarios/${usuario.id}`}>
                {usuario.nome} ({usuario.username})
            </Link>{" "}
            — {usuario.email}
            {onEditar && <button onClick={onEditar}>Editar</button>}
            {onExcluir && <button onClick={onExcluir}>Excluir</button>}
        </li>
    );
}

export default UsuarioItem;
