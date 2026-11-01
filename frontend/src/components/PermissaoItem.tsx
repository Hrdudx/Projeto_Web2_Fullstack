import { Link } from "react-router-dom";
import type { Permissao } from "../types/Permissao";

interface PermissaoItemProps {
    permissao: Permissao;
}

function PermissaoItem({ permissao }: PermissaoItemProps) {
    return (
        <Link to={`/permissoes/${permissao.id}`}
            className="font-medium text-blue-600 hover:underline">
            {permissao.nome} <span className="text-gray-500">— {permissao.descricao}</span>
        </Link>
    );
}

export default PermissaoItem;
