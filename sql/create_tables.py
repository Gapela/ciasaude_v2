import libs.postgresTool as pgt

# Execute the SQL queries
queries = [
    """ DROP TABLE IF EXISTS paciente;
        CREATE TABLE paciente (
        id_paciente SERIAL PRIMARY KEY,
        nome TEXT,
        endereco TEXT,
        cep TEXT,
        rg TEXT,
        cpf TEXT,
        telefone TEXT,
        email TEXT,
        data_nascimento TEXT,
        responsavel TEXT,
        medico_solicitante TEXT,
        crm TEXT,
        ocupacao TEXT,
        cid TEXT,
        observacao TEXT,
        pagamento TEXT,
        empresa TEXT,
        numero_carteirinha TEXT,
        plano TEXT,
        data_exclusao TEXT,
        arquivo TEXT
    );
    """,
    """ DROP TABLE IF EXISTS atendimento;
        CREATE TABLE atendimento (
        id_atendimento SERIAL PRIMARY KEY,
        nome TEXT,
        cpf TEXT,
        especialidade TEXT,
        profissional_responsavel TEXT,
        observacao TEXT,
        data_inicio TEXT,
        data_fim TEXT,
        id_paciente INT,
        id_profissional INT,
        data_exclusao TEXT
    );
    """,
    """DROP TABLE IF EXISTS profissional;
        CREATE TABLE profissional (
        id_profissional SERIAL PRIMARY KEY,
        nome TEXT,
        endereco TEXT,
        rg TEXT,
        cpf TEXT,
        telefone TEXT,
        especialidade TEXT,
        obs_especializacao TEXT,
        crm TEXT,
        pagamento TEXT,
        empresa TEXT,
        plano TEXT,
        pix TEXT,
        banco TEXT,
        agencia TEXT,
        conta TEXT,
        data_exclusao TEXT,
        arquivo TEXT
    );
    """,
    """DROP TABLE IF EXISTS usuario;
    CREATE TABLE usuario (
        id_usuario SERIAL PRIMARY KEY,
        usuario TEXT,
        senha TEXT,
        email TEXT,
        exclusao TEXT,
        redefinir TEXT,
        ultima_modificacao TEXT,
        data_exclusao TEXT
    );
    """
]

for query in queries:
    print("Executando query")
    pgt.execute_query_psycopg2(query)
    