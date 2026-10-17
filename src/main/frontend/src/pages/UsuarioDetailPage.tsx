import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import type { Usuario } from "../types/Usuario";

function UsuarioDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const [erro, setErro] = useState<string | null>(null);

    useEffect(() => {
        api.get<Usuario>(`/usuarios/${id}`)
            .then((resposta) => {
                setUsuario(resposta.data);
            })
            .catch(() => {
                setErro("Usuário não encontrado.");
            });
    }, [id]);

    if (erro) {
        return <p className="erro">{erro}</p>;
    }

    if (!usuario) {
        return <p>Carregando...</p>;
    }

    return (
        <div>
            <h1>{usuario.nome}</h1>
            <p><strong>Username:</strong> {usuario.username}</p>
            <p><strong>E-mail:</strong> {usuario.email}</p>
            <p>
                <strong>Permissões:</strong>{" "}
                {usuario.permissoes && usuario.permissoes.length > 0
                    ? usuario.permissoes.map((p, i) => (
                          <span key={p.id}>
                              {i > 0 && ", "}
                              <Link to={`/permissoes/${p.id}`}>{p.nome}</Link>
                          </span>
                      ))
                    : "nenhuma"}
            </p>
            <button onClick={() => navigate("/usuarios")}>Voltar</button>
        </div>
    );
}

export default UsuarioDetailPage;
