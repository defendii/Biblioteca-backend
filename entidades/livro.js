    class Livro {
        constructor(id_livro, titulo, qtde_disponivel, isbn, edicao, caminho_foto_capa, is_ativo) {
            this.id_livro = id_livro;
            this.titulo = titulo;
            this.qtde_disponivel = qtde_disponivel;
            this.isbn = isbn;
            this.edicao = edicao;
            this.caminho_foto_capa = caminho_foto_capa;
            this.is_ativo = is_ativo
        }
    }

    module.exports = Livro;