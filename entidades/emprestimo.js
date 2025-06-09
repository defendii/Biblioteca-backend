class Emprestimo {
    constructor(id_emprestimo, id_usuario, id_livro, data_emprestimo, data_devolucao, is_ativo) {
        this.id_emprestimo = id_emprestimo;
        this.id_usuario = id_usuario;
        this.id_livro = id_livro;
        this.data_emprestimo = data_emprestimo;
        this.data_devolucao = data_devolucao;
        this.is_ativo = is_ativo;
    }
}

module.exports = Emprestimo;