import libs.postgresTool as pgt

# Execute the SQL queries
queries = [
    """ INSERT INTO public.paciente(
	nome, endereco, cep, rg, cpf, telefone, email, data_nascimento, responsavel, medico_solicitante, crm, ocupacao, cid, observacao, pagamento, empresa, numero_carteirinha, plano)
	VALUES ('GABRIEL PELUDO', 'MINHA RUA', '23047610', 'RG', '175719', '21XXXXX', 'ROMULO@GMAIL.COM', '2023-01-15', 'EU', 'GABRIEL PELUDO', '', '', '', '', '', '', '', '');
    """,
    """ INSERT INTO public.paciente(
	nome, endereco, cep, rg, cpf, telefone, email, data_nascimento, responsavel, medico_solicitante, crm, ocupacao, cid, observacao, pagamento, empresa, numero_carteirinha, plano)
	VALUES ('Romulo', 'MINHA RUA', '23047610', 'RG', '175719', '21XXXXX', 'ROMULO@GMAIL.COM', '2023-01-15', 'EU', 'GABRIEL PELUDO', '', '', '', '', '', '', '', '');"""
    
]

for query in queries:
    print("Executando query")
    pgt.execute_query_psycopg2(query)

