package br.ueg.trindade.projetoweb2fullstack.controller;

import br.ueg.trindade.projetoweb2fullstack.model.Usuario;
import br.ueg.trindade.projetoweb2fullstack.service.UsuarioService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "http://localhost:5173")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping
    public List<Usuario> getAllUsuarios() {
        return usuarioService.listarTodos();
    }

    @GetMapping("/{id}")
    public Usuario getUsuarioById(@PathVariable Long id) {
        return usuarioService.buscarPorId(id);
    }

    @PostMapping
    public Usuario createUsuario(@RequestBody Usuario usuario) {
        return usuarioService.criar(usuario);
    }

    @PutMapping("/{id}")
    public Usuario updateUsuario(@PathVariable Long id, @RequestBody Usuario usuarioAtualizado) {
        return usuarioService.atualizar(id, usuarioAtualizado);
    }

    @DeleteMapping("/{id}")
    public void deleteUsuario(@PathVariable Long id) {
        usuarioService.excluir(id);
    }

    // GET /api/usuarios/{id}/permissoes — permissões atuais do usuário
    @GetMapping("/{id}/permissoes")
    public Usuario getPermissoes(@PathVariable Long id) {
        return usuarioService.buscarPorId(id);
    }

    // PUT /api/usuarios/{id}/permissoes — salvar nova seleção (ex.: [1, 2])
    @PutMapping("/{id}/permissoes")
    public Usuario atualizarPermissoes(
            @PathVariable Long id,
            @RequestBody List<Long> idsPermissoes) {
        return usuarioService.atribuirPermissoes(id, idsPermissoes);
    }
}
