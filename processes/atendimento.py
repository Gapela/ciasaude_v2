from flask import Flask, redirect, render_template,request
from libs.postgresTool import execute_query_df, execute_query_psycopg2
from libs.utils import *
import json
from flask_jwt_extended import jwt_required
from flask_cors import CORS, cross_origin

def rotas_atendimento(app):
    
    @app.route('/atendimento-consulta', methods=['POST'])
    @jwt_required()
    @cross_origin()
    def atendimento_consulta():
        try:
            return {'status':'ok', 'data':get_df_to_json()}
        except Exception as e:
            return {'status':'error', 'data':str(e)}

    @app.route('/atendimento-cadastro', methods=['POST'])
    @jwt_required()
    @cross_origin()
    def atendimento_cadastro():
        
        data = request.get_json()
        
        return insert_atendimento(data=data)

    @app.route('/atendimento-excluir', methods=['POST'])
    @jwt_required()
    @cross_origin()
    def atendimento_excluir():
        
        data = request.get_json()
        return excluir_atendimento(data=data)

    @app.route('/atendimento-consulta-detalhes', methods=['POST'])
    @jwt_required()
    @cross_origin()
    def atendimento_consulta_detalhes():
        try:
            data = request.get_json()
            return {'status':'ok', 'data':get_df_to_json(filter=True, data=data)}
        except Exception as e:
            return {'status':'error', 'data':str(e)}

    @app.route('/atendimento-editar', methods=['POST'])
    @jwt_required()
    @cross_origin()
    def atendimento_editar():
        try:
            data = request.get_json()
            return editar_atendimento(data=data)
        except Exception as e:
            return {'status':'error', 'data':str(e)}

    return app


def get_df_to_json(filter=None, data=''):
    if filter==None:   
        query = """select atend.id_atendimento, atend.cpf, pac.nome as paciente, prof.nome as profissional, prof.especialidade, atend.observacao, atend.data_inicio::text, atend.data_fim::text  from atendimento atend
left join paciente pac
on atend.id_paciente = pac.id_paciente
left join profissional prof
on atend.id_profissional = prof.id_profissional
where atend.data_exclusao is null"""
    else:
        id = data['id']
        query = f"""select atend.id_atendimento, atend.cpf, pac.nome as paciente, prof.nome as profissional, prof.especialidade, atend.observacao, atend.data_inicio::text, atend.data_fim::text  from atendimento atend
left join paciente pac
on atend.id_paciente = pac.id_paciente
left join profissional prof
on atend.id_profissional = prof.id_profissional
where atend.data_exclusao is null and atend.id_atendimento = {id}"""

    df = execute_query_df(query)
    js = df_to_json(df)
    js = json.loads(js)
    return js

def insert_atendimento(data):
        
    df = json_to_df(js=data)
    
    query = df_to_query(df=df, table_name='atendimento')
    res = execute_query_psycopg2(query=query)

    return res    

def excluir_atendimento(data):
    id = data['id_atendimento']
    query = delete_from_database(table='atendimento', id=id)
    res = execute_query_psycopg2(query=query)
    return res    

def editar_atendimento(data):
    id = data['id']
    df = json_to_df(js=data)
    query = df_to_update_query(df=df, table_name='atendimento', id=id)
    res = execute_query_psycopg2(query=query)
    return res 