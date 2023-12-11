from flask import Flask, redirect, render_template, request
from flask_jwt_extended import jwt_required
from flask_cors import CORS, cross_origin
import json
from datetime import datetime
from libs.postgresTool import execute_query_df
import base64
from libs.utils import df_to_json

def rotas_relatorio(app):

    @app.route('/relatorio', methods=['POST'])
    @jwt_required()
    @cross_origin()
    def relatorio():
        js = request.get_json()
        module = js['module']
        if len(js['data'])==0:
            file = generate_full(module)
            
            with open(file, "rb") as pdf_file:
                encoded_string = base64.b64encode(pdf_file.read()).decode('utf-8')
                return {'status':'ok', 'data':f'{encoded_string}', 'extensao':f'{file.split(".")[-1]}'}
        else:
            query = generate_query(js)
            file = generate_report(query)
            print(query)
            with open(file, "rb") as pdf_file:
                encoded_string = base64.b64encode(pdf_file.read()).decode('utf-8')
                return {'status':'ok', 'data':f'{encoded_string}', 'extensao':f'{file.split(".")[-1]}'}
        
    @app.route('/dashboard', methods=['POST'])
    @jwt_required()
    @cross_origin()
    def dashboard(): 
        js = request.get_json()
        
        return dashboard_data(js)

    return app


def generate_report(query):
    df = execute_query_df(query)
    file_path = f'storage/report/relatorio_{datetime.now().strftime("%d%m%Y_%H%M%S")}.csv'
    df.to_csv(file_path, sep=';', index=False)
    return file_path

def generate_query(js):
    filters = js['data']
    query_filter = []
    for filter in filters:
        campo = adjust_field(filter[0])
        operador = adjust_operator(filter[1])
        valor = adjust_param(filter[2], operador)
        query_filter.append(f'{campo} {operador} {valor}')
    
    query = f'select * from {js["module"]} where {" and ".join(query_filter)}'
    return query


def generate_full(module):
    query = f'select * from {module}'
    filepath = generate_report(query)
    return filepath    

def adjust_operator(operator):
    if operator == 'Igual a':
        return '='
    elif operator == 'Diferente de':
        return '<>'
    elif operator == 'Maior que':
        return '>'
    elif operator == 'Menor que':
        return '<'
    elif operator == 'Maior ou igual a':
        return '>='
    elif operator == 'Menor ou igual a':
        return '<='
    elif operator == 'Contém':
        return 'like'
    else:
        return '='
    
def adjust_param(parametro, operator):
    if parametro.isnumeric():
        pass
    else:
        parametro = parametro.lower()
        
    if operator == 'like':
        return f"'%{parametro}%'"
    elif operator == '=':
        if parametro.isnumeric():
            return f'{parametro}'
        else:
            return f"'{parametro}'"
    elif operator == '<>':
        if parametro.isnumeric():
            return f'{parametro}'
        else:
            return f"'{parametro}'"
    
    elif operator == '>' or operator == '>=' or operator == '<' or operator == '<=':
        return f'{parametro}'
               
def adjust_field(field):
    if field == 'Forma de Pagamento':
        return 'lower(pagamento)'
    elif field == 'Empresa':
        return 'lower(empresa)'
    elif field == 'Data de Nascimento':
        return 'lower(data_nascimento)'
    # Faça a mesma coisa com os campos Data inicio, Data fim, Formato de Atendimento, Especialidade, Diagnostico, Nome ,CPF, Telefone, Email, Plano, Ano de Nascimento, Mês de Nascimento, Dia de Nascimento
    elif field == 'Data inicio':
        return 'lower(data_inicio)'
    elif field == 'Data fim':
        return 'lower(data_fim)'
    elif field == 'Formato de Atendimento':
        return 'lower(formato_atendimento)'
    elif field == 'Especialidade':
        return 'lower(especialidade)'
    elif field == 'Diagnostico':
        return 'lower(diagnostico)'
    elif field == 'Nome':
        return 'lower(nome)'
    elif field == 'CPF':
        return 'lower(cpf)'
    elif field == 'Telefone':
        return 'lower(telefone)'
    elif field == 'Email':
        return 'lower(email)'
    elif field == 'Plano':
        return 'lower(plano)'
    elif field == 'Ano de Nascimento':
        return "EXTRACT(YEAR FROM AGE(CURRENT_DATE, TO_DATE(data_nascimento, 'DD/MM/YYYY')))"
    elif field == 'Mês de Nascimento':
        return "EXTRACT(MONTH FROM AGE(CURRENT_DATE, TO_DATE(data_nascimento, 'DD/MM/YYYY')))"
    elif field == 'Dia de Nascimento':
        return "EXTRACT(DAY FROM AGE(CURRENT_DATE, TO_DATE(data_nascimento, 'DD/MM/YYYY')))"
    elif field == 'Data':
        return 'lower(data)'
    elif field == 'Valor':
        return 'lower(valor)'
    elif field == 'Tipo de transação':
        return 'lower(tipo)'
    elif field == 'Nome do responsável':
        return 'lower(nome_responsavel)'
    elif field == 'Endereço':
        return 'lower(endereco)'
     
    

def dashboard_data(js):
    dash = js['dashboard']
    if dash == 'paciente':
        query = f'''select 'total_paciente' as info, 'kpi' as indicador,   count(*) as qtd from        paciente where data_exclusao is null
                    union all
                    select pagamento as info, 'kpi' as indicador, count(*) as qtd from paciente  where data_exclusao is null group by pagamento
                    union all
                    select diagnostico as info, 'paciente_diagnostico' as indicador, count(*) as qtd from paciente  where data_exclusao is null group by diagnostico
                    union all
                    select prof.nome as info, 'paciente_profissional' as indicador, count(*) as qtd from paciente  as pac
                    inner join atendimento as atend 
                    on pac.id_paciente = atend.id_paciente
                    inner join profissional as prof
                    on atend.id_profissional= prof.id_profissional
                    where pac.data_exclusao is null group by prof.nome
                    union all
                    select 'ativos' as info, 'paciente_ativos' as indicador, count(*) as qtd from paciente  as pac
                    inner join atendimento as atend 
                    on pac.id_paciente = atend.id_paciente
                    where data_fim is null and pac.data_exclusao is null
                    union all 
                    select 'inativos' as info, 'paciente_ativos' as indicador, count(*) as qtd from paciente  as pac
                    inner join atendimento as atend 
                    on pac.id_paciente = atend.id_paciente
                    where data_fim is not null and pac.data_exclusao is null
                    union all
                    SELECT 
                    FLOOR(EXTRACT(YEAR FROM AGE(CURRENT_DATE, TO_DATE(data_nascimento, 'DD/MM/YYYY')))/5)*5 || '-' || (FLOOR(EXTRACT(YEAR FROM AGE(CURRENT_DATE, TO_DATE(data_nascimento, 'DD/MM/YYYY')))/5)*5 + 4) as info, 'faixa_etaria' as indicador,
                    COUNT(*) as qtd
                    FROM 
                    paciente 
                    WHERE 
                    data_exclusao IS NULL 
                    GROUP BY 
                    info'''
    elif dash == 'profissional':
        query = f'''select 'total_plano' as info, 'profissional_plano' as indicador, count(*) as qtd from profissional where data_exclusao is null and plano <> 'sem_plano'
        union all
        select 'total_particular' as info, 'profissional_plano' as indicador, count(*) as qtd from profissional where data_exclusao is null and plano <> 'sem_plano'
        union all
        select plano as info, 'profissional_empresas' as indicador, count(*)  as qtd from profissional where data_exclusao is null group by plano
        union all 
        select especialidade as info, 'profissional_especialidade' as indicador, count(*)  as qtd from profissional where data_exclusao is null group by especialidade
'''
    elif dash == 'atendimento':
        query = f'''select 'total_ativos' as info, 'ativos' as indicador, count(*) as qtd from atendimento where data_exclusao is null and (data_fim = '' or data_fim is null)
        union all
        select formato_atendimento as info, 'formato_atendimento' as indicador, count(*) as qtd from atendimento where data_exclusao is null group by formato_atendimento
        union all
        select especialidade as info, 'ativos_especialidade' as indicador, count(*) as qtd from atendimento where data_exclusao is null and (data_fim = '' or data_fim is null) group by especialidade
        union all 
        select prof.nome as info, 'ativos_profissional' as indicador, count(*) as qtd from atendimento as atend
        inner join profissional as prof
        on atend.id_profissional = prof.id_profissional
        where atend.data_exclusao is null and (data_fim = '' or data_fim is null) group by prof.nome
'''
    elif dash == 'financeiro':
        query = f'''select 'entrada_soma' as info, 'entrada_soma' as indicador, SUM(CAST(valor AS FLOAT)) as qtd from despesas where tipo = 'Entrada' and data_exclusao is null
            union all
            select 'saida_soma' as info, 'saida_soma' as indicador, SUM(CAST(valor AS FLOAT)) as qtd from despesas where tipo = 'Saida' and data_exclusao is null
            union all
            select 'total_soma' as info, 'total_soma' as indicador, SUM(CAST(valor AS FLOAT)) as qtd from despesas where  data_exclusao is null
            union all
            SELECT 
            concat(EXTRACT(MONTH FROM TO_DATE(data, 'DD/MM/YYYY')) , EXTRACT(YEAR FROM TO_DATE(data, 'DD/MM/YYYY')) ) as info,
            'entrada_periodo' as indicador,
            COUNT(*) as qtd
            FROM 
            despesas 
            where tipo = 'Entrada' and data_exclusao is null
            GROUP BY EXTRACT(MONTH FROM TO_DATE(data, 'DD/MM/YYYY')), EXTRACT(YEAR FROM TO_DATE(data, 'DD/MM/YYYY'))
            union all 
            SELECT 
            concat(EXTRACT(MONTH FROM TO_DATE(data, 'DD/MM/YYYY')) , EXTRACT(YEAR FROM TO_DATE(data, 'DD/MM/YYYY')) ) as info,
            'saida_periodo' as indicador,
            
            COUNT(*) as qtd
            FROM 
            despesas 
            where tipo = 'Saida' and data_exclusao is null
            GROUP BY EXTRACT(MONTH FROM TO_DATE(data, 'DD/MM/YYYY')), EXTRACT(YEAR FROM TO_DATE(data, 'DD/MM/YYYY'))
            union all

            SELECT 
            CONCAT(EXTRACT(MONTH FROM TO_DATE(data, 'DD/MM/YYYY')), '-', EXTRACT(YEAR FROM TO_DATE(data, 'DD/MM/YYYY'))) AS info,
            'balanco_mes' as indicador,
            SUM(CASE WHEN tipo = 'Entrada' THEN CAST(valor AS FLOAT) ELSE -CAST(valor AS FLOAT) END) AS qtd
            FROM 
            despesas 
            WHERE 
            tipo IN ('Entrada', 'Saida') and data_exclusao is null
            GROUP BY 
            info'''
    else:
        return {'status':'error', 'message':'dashboard inválido'}

    df = execute_query_df(query)
    chart_data = {}
    for i, row in df.iterrows():
        if row['indicador'] not in chart_data:
            chart_data[row['indicador']] = {'labels': [], 'data': []}
        chart_data[row['indicador']]['labels'].append(row['info'])
        chart_data[row['indicador']]['data'].append(row['qtd'])
    print(chart_data)    
    
    return {'status':'ok', 'data':chart_data}
