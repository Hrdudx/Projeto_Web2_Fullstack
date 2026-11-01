import type { Produto } from "../types/Produto";

interface ProdutoItemProps {
    produto: Produto;
}

function ProdutoItem({ produto }: ProdutoItemProps) {
    return (
        <span>
            <strong className="text-gray-800">{produto.nome}</strong>{" "}
            <span className="text-gray-500">— {produto.descricao}</span>{" "}
            <span className="font-medium text-green-700">R$ {produto.preco.toFixed(2)}</span>
        </span>
    );
}

export default ProdutoItem;
