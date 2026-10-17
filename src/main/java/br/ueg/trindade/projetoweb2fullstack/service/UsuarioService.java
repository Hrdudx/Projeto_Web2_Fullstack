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
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuário não encontrado"));
    }

    public Usuario criar(Usuario usuario) {
        validarEmailUnico(usuario.getEmail(), null);
        return usuarioRepository.save(usuario);
    }

    public Usuario atualizar(Long id, Usuario usuarioAtualizado) {
        Usuario usuario = buscarPorId(id);
        validarEmailUnico(usuarioAtualizado.getEmail(), id);

        usuario.setNome(usuarioAtualizado.getNome());
        usuario.setUsername(usuarioAtualizado.getUsername());
        usuario.setEmail(usuarioAtualizado.getEmail());

        return usuarioRepository.save(usuario);
    }

    public void excluir(Long id) {
        usuarioRepository.deleteById(id);
    }

    // Aula 07: substitui as permissões do usuário pela nova seleção (ex.: [1, 2]).
    @Transactional
    public Usuario atribuirPermissoes(Long usuarioId, List<Long> idsPermissoes) {
        Usuario usuario = buscarPorId(usuarioId);
        Set<Permissao> permissoes = new HashSet<>(
                permissaoRepository.findAllById(idsPermissoes));
        usuario.setPermissoes(permissoes);
        return usuarioRepository.save(usuario);
    }

    // Regra de negócio (exercício da Aula 06): não pode haver dois usuários com o mesmo e-mail.
    private void validarEmailUnico(String email, Long idAtual) {
        usuarioRepository.findByEmail(email)
                .filter(existente -> !existente.getId().equals(idAtual))
                .ifPresent(existente -> {
                    throw new ResponseStatusException(HttpStatus.CONFLICT, "Já existe um usuário com esse e-mail");
                });
    }
}
