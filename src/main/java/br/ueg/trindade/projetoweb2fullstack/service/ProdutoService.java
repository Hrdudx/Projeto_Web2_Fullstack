package br.ueg.trindade.projetoweb2fullstack.service;

import br.ueg.trindade.projetoweb2fullstack.model.Produto;
import br.ueg.trindade.projetoweb2fullstack.repository.ProdutoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class ProdutoService {

    @Autowired
    private ProdutoRepository produtoRepository;

    public List<Produto> listarTodos() {
        return produtoRepository.findAll();
    }

    public Produto buscarPorId(Long id) {
        return produtoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Produto não encontrado"));
    }

    public Produto criar(Produto produto) {
        validarPreco(produto);
        return produtoRepository.save(produto);
    }

    public Produto atualizar(Long id, Produto produtoAtualizado) {
        Produto produto = buscarPorId(id);
        validarPreco(produtoAtualizado);

        produto.setNome(produtoAtualizado.getNome());
        produto.setDescricao(produtoAtualizado.getDescricao());
        produto.setPreco(produtoAtualizado.getPreco());

        return produtoRepository.save(produto);
    }

    public void excluir(Long id) {
        produtoRepository.deleteById(id);
    }

    // Regra de negócio da entidade escolhida: o preço precisa ser maior que zero.
    private void validarPreco(Produto produto) {
        if (produto.getPreco() == null || produto.getPreco() <= 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "O preço precisa ser maior que zero");
        }
    }
}
