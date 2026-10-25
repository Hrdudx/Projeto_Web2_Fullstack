package br.ueg.trindade.projetoweb2fullstack.service;

import br.ueg.trindade.projetoweb2fullstack.model.Permissao;
import br.ueg.trindade.projetoweb2fullstack.model.Usuario;
import br.ueg.trindade.projetoweb2fullstack.repository.PermissaoRepository;
import br.ueg.trindade.projetoweb2fullstack.repository.UsuarioRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PermissaoRepository permissaoRepository;

    public List<Usuario> listarTodos() {
        return usuarioRepository.findAll();
    }

    public Usuario buscarPorId(Long id) {
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
    }

    public Usuario criar(Usuario usuario) {
        // Regra de negócio: não permitir cadastro com e-mail duplicado
        if (usuarioRepository.existsByEmail(usuario.getEmail())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "E-mail já cadastrado");
        }
        return usuarioRepository.save(usuario);
    }

    public Usuario atualizar(Long id, Usuario usuarioAtualizado) {
        Usuario usuario = buscarPorId(id);

        if (usuarioRepository.existsByEmailAndIdNot(usuarioAtualizado.getEmail(), id)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "E-mail já cadastrado");
        }

        usuario.setNome(usuarioAtualizado.getNome());
        usuario.setUsername(usuarioAtualizado.getUsername());
        usuario.setEmail(usuarioAtualizado.getEmail());

        return usuarioRepository.save(usuario);
    }

    public void excluir(Long id) {
        usuarioRepository.deleteById(id);
    }

    @Transactional
    public Usuario atribuirPermissoes(Long usuarioId, List<Long> idsPermissoes) {
        Usuario usuario = buscarPorId(usuarioId);
        Set<Permissao> permissoes = new HashSet<>(
                permissaoRepository.findAllById(idsPermissoes));
        usuario.setPermissoes(permissoes);
        return usuarioRepository.save(usuario);
    }
}
