import json
import libs.postgresTool as pgt

#variaveis
json_path = 'pacientes100.json'

def read_json(json_path):
    with open(json_path, 'r') as f:
        data = json.load(f)
    return data

def maker_query_lista(pacientes_lista):

    lista_query = []

    for paciente in pacientes_lista:
        
        nome = paciente['nome']
        endereco = paciente['endereco']
        cep = paciente['cep']
        rg = paciente['rg']
        cpf = paciente['cpf']
        telefone = paciente['telefone']
        email = paciente['email']
        data_nascimento = paciente['data_nascimento']
        responsavel = paciente['responsavel']
        medico_solicitante = paciente['medico_solicitante']
        crm = paciente['crm']
        ocupacao = paciente['ocupacao']
        cid = paciente['cid']
        diagnostico = paciente['diagnostico']
        observacao = paciente['observacao']
        pagamento = paciente['pagamento']
        empresa = paciente['empresa']
        numero_carteirinha = paciente['numero_carteirinha']
        plano = paciente['plano']

        query = f""" INSERT INTO public.paciente(diagnostico, nome, endereco, cep, rg, cpf, telefone, email, data_nascimento, responsavel, medico_solicitante, crm, ocupacao, cid, observacao, pagamento, empresa, numero_carteirinha, plano) 
        VALUES ('{diagnostico}', '{nome}', '{endereco}', '{cep}', '{rg}', '{cpf}', '{telefone}', '{email}', '{data_nascimento}', '{responsavel}', '{medico_solicitante}', '{crm}', '{ocupacao}', '{cid}', '{observacao}', '{pagamento}', '{empresa}', '{numero_carteirinha}', '{plano}');"""

        lista_query.append(query)

    return lista_query

def executar_querys(lista_querys):
    max_querys = len(lista_querys)

    contador = 1

    for query in lista_querys:
        pgt.execute_query_psycopg2(query)
        print(f"Query executada | {contador}/{max_querys}")
        contador += 1
    
    print("Todas as querys foram executadas com sucesso!")




def runner():
    dados_pacientes = read_json(json_path)
    lista_querys = maker_query_lista(dados_pacientes)
    executar_querys(lista_querys)


if __name__ == "__main__":
    runner()
