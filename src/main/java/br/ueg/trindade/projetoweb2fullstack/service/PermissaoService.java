package br.ueg.trindade.projetoweb2fullstack.service;

import br.ueg.trindade.projetoweb2fullstack.model.Permissao;
import br.ueg.trindade.projetoweb2fullstack.model.Usuario;
import br.ueg.trindade.projetoweb2fullstack.repository.PermissaoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class PermissaoService {

    @Autowired
    private PermissaoRepository permissaoRepository;

    @Transactional(readOnly = true)
    public List<Permissao> listar() {
        return permissaoRepository.findAll();
    }

    public Permissao buscarPorId(Long id) {
        return permissaoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Permissão não encontrada"));
    }

    public Permissao criar(Permissao permissao) {
        return permissaoRepository.save(permissao);
    }

    public Permissao atualizar(Long id, Permissao permissaoAtualizada) {
        Permissao permissao = buscarPorId(id);

        permissao.setNome(permissaoAtualizada.getNome());
        permissao.setDescricao(permissaoAtualizada.getDescricao());

        return permissaoRepository.save(permissao);
    }

    @Transactional
    public void excluir(Long id) {
        Permissao permissao = buscarPorId(id);

        // Usuario é o dono do relacionamento: removemos a permissão dos usuários
        // antes de excluí-la, para não violar a chave estrangeira em usuario_permissao
        for (Usuario usuario : permissao.getUsuarios()) {
            usuario.getPermissoes().remove(permissao);
        }

        permissaoRepository.delete(permissao);
    }
}
