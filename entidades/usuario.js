class Usuario {
    constructor(id_usuario, nome, registro_academico, data_nascimento, email, telefone, tipo, is_ativo) {
        this.id_usuario = id_usuario;
        this.nome = nome;
        this.registro_academico = registro_academico;
        this.data_nascimento = data_nascimento;
        this.email = email;
        this.telefone = telefone;
        this.tipo = tipo;
        this.is_ativo =  is_ativo
    }
}

module.exports = Usuario;