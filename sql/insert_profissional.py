import libs.postgresTool as pgt

# Execute the SQL queries
queries = [
"""
INSERT INTO profissional (nome, endereco, rg, cpf, telefone, especialidade, obs_especializacao, crm, pagamento, empresa, plano, pix, banco, agencia, conta)
VALUES ('Dr. João Silva', 'Rua dos Médicos, 123', '1234567', '123.456.789-00', '(11) 1234-5678', 'Cardiologia', 'Especialização em cirurgia cardíaca', 'CRM12345', 'Cheque', 'Hospital Central', 'Plano de Saúde A', 'joao.silva@exemplo.com', 'Banco do Saúde', '001', '12345678');
""",
"""
INSERT INTO profissional (nome, endereco, rg, cpf, telefone, especialidade, obs_especializacao, crm, pagamento, empresa, plano, pix, banco, agencia, conta)
VALUES ('Dra. Maria Santos', 'Avenida das Clínicas, 456', '9876543', '987.654.321-00', '(22) 9876-5432', 'Dermatologia', 'Especialização em dermatologia estética', 'CRM54321', 'Transferência Bancária', 'Clínica Dermacare', 'Plano de Saúde B', 'maria.santos@exemplo.com', 'Banco do Bem-Estar', '002', '98765432');
"""
]

for query in queries:
    print("Executando query")
    pgt.execute_query_psycopg2(query)
