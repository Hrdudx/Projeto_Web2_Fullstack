import { Link } from "react-router-dom";
import type { Usuario } from "../types/Usuario";

interface UsuarioItemProps {
    usuario: Usuario;
}

function UsuarioItem({ usuario }: UsuarioItemProps) {
    return (
        <Link to={`/usuarios/${usuario.id}`}
            className="font-medium text-blue-600 hover:underline">
            {usuario.nome} <span className="text-gray-500">({usuario.username})</span>
        </Link>
    );
}

export default UsuarioItem;
