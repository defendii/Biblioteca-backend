class Bibliotecario {
    constructor(id_bibliotecario, login, senha, is_ativo) {
        this.id_bibliotecario = id_bibliotecario;
        this.login = login;
        this.senha = senha
        this.is_ativo = is_ativo
    }
}

module.exports = Bibliotecario;