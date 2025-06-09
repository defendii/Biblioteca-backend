class Divida {
    constructor(id_divida, id_emprestimo, valor_multa, dia_atual, is_ativo) {
        this.id_divida = id_divida
        this.id_emprestimo = id_emprestimo
        this.valor_multa = valor_multa;
        this.dia_atual = dia_atual
        this.is_ativo = is_ativo
    }
}

module.exports = Divida;