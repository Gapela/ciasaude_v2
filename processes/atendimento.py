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
        
        data = request.form.to_dict()
        
        print(data)
        res = insert_atendimento(data=data)
        print(res)
        return res

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

    @app.route('/atendimento-paciente-profissional', methods=['POST'])
    @jwt_required()
    @cross_origin()
    def atendimento_paciente_profissional():
        try:
            data = request.get_json()
            return {'status':'ok', 'data':get_df_to_json(filter='atendimento_list', data=data)}
        except Exception as e:
            return {'status':'error', 'data':str(e)}

    @app.route('/atendimento-editar', methods=['POST'])
    @jwt_required()
    @cross_origin()
    def atendimento_editar():
        try:
            
            data = request.form.to_dict()
            print(data)
            return editar_atendimento(data=data)
        except Exception as e:
            return {'status':'error', 'data':str(e)}

    return app


def get_df_to_json(filter=None, data=''):
    if filter==None:   
        query = """select atend.id_atendimento, pac.nome as paciente, prof.nome as profissional, prof.especialidade, atend.observacao, atend.data_inicio::text, atend.data_fim::text  from atendimento atend
        left join paciente pac
        on atend.id_paciente = pac.id_paciente
        left join profissional prof
        on atend.id_profissional = prof.id_profissional
        where atend.data_exclusao is null"""
    elif filter=='atendimento_list':
        query_1 = "select id_paciente, concat(nome,' - ', cpf) as paciente from paciente where data_exclusao is null"
        query_2 = "select id_profissional,concat(nome,' - ', crm) as profissional from profissional where data_exclusao is null"
        df_1 = execute_query_df(query_1)
        df_2 = execute_query_df(query_2)
        js_1 = df_to_json(df_1)
        js_2 = df_to_json(df_2)
        js = {'paciente':json.loads(js_1), 'profissional':json.loads(js_2)}
        
        return js
    else:
        id = data['id_atendimento']
        query = f"""select atend.id_atendimento, pac.id_paciente, prof.id_profissional,  pac.nome as paciente, prof.nome as profissional, prof.especialidade, atend.observacao, atend.data_inicio::text, atend.data_fim::text  from atendimento atend
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
    id = data['id_atendimento']
    df = json_to_df(js=data)
    query = df_to_update_query(df=df, table_name='atendimento', id=id)
    res = execute_query_psycopg2(query=query)
    return res 