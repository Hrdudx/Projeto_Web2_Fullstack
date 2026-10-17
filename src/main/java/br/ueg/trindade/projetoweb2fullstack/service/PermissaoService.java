package br.ueg.trindade.projetoweb2fullstack.service;

import br.ueg.trindade.projetoweb2fullstack.model.Permissao;
import br.ueg.trindade.projetoweb2fullstack.repository.PermissaoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

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
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Permissão não encontrada"));
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

    // Uma permissão atribuída a usuários não pode ser excluída (a tabela usuario_permissao aponta para ela).
    @Transactional
    public void excluir(Long id) {
        Permissao permissao = buscarPorId(id);
        if (!permissao.getUsuarios().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT,
                    "Esta permissão está atribuída a usuários e não pode ser excluída");
        }
        permissaoRepository.deleteById(id);
    }
}
