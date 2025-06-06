class Curso {
    constructor(id_curso, nome, codigo, is_ativo) {
        this.id_curso = id_curso;
        this.nome = nome;
        this.codigo = codigo;
        this.is_ativo = is_ativo;
    }
}

module.exports = Curso;