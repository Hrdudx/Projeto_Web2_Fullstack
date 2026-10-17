import { Link } from "react-router-dom";
import type { Permissao } from "../types/Permissao";

interface PermissaoItemProps {
    permissao: Permissao;
    onEditar?: () => void;
    onExcluir?: () => void;
}

function PermissaoItem({ permissao, onEditar, onExcluir }: PermissaoItemProps) {
    return (
        <li>
            <Link to={`/permissoes/${permissao.id}`}>
                <strong>{permissao.nome}</strong>
            </Link>{" "}
            — {permissao.descricao}
            {onEditar && <button onClick={onEditar}>Editar</button>}
            {onExcluir && <button onClick={onExcluir}>Excluir</button>}
        </li>
    );
}

export default PermissaoItem;
